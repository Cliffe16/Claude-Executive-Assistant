param([string]$Path, [string]$OutDir)
# Dumps every worksheet of an .xlsx as tab-separated text (values only; formulas show cached values).
Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem
New-Item -ItemType Directory -Force -Path $OutDir | Out-Null
$zip = [System.IO.Compression.ZipFile]::OpenRead($Path)
try {
  function ReadEntry($name) {
    $e = $zip.GetEntry($name); if (-not $e) { return $null }
    $r = New-Object System.IO.StreamReader($e.Open()); $t = $r.ReadToEnd(); $r.Close(); return [xml]$t
  }
  $shared = @()
  $ss = ReadEntry 'xl/sharedStrings.xml'
  if ($ss) { foreach ($si in $ss.sst.si) { $shared += ($si.InnerText) } }
  $wb = ReadEntry 'xl/workbook.xml'
  $rels = ReadEntry 'xl/_rels/workbook.xml.rels'
  $relMap = @{}; foreach ($r in $rels.Relationships.Relationship) { $relMap[$r.Id] = $r.Target }
  $i = 0
  foreach ($s in $wb.workbook.sheets.sheet) {
    $i++
    $rid = $s.GetAttribute('id', 'http://schemas.openxmlformats.org/officeDocument/2006/relationships')
    $target = $relMap[$rid] -replace '^/xl/', '' -replace '^/', ''
    if ($target -notlike 'xl/*') { $target = 'xl/' + $target }
    $sx = ReadEntry $target
    if (-not $sx) { continue }
    $lines = New-Object System.Collections.Generic.List[string]
    foreach ($row in $sx.worksheet.sheetData.row) {
      $cells = @()
      foreach ($c in $row.c) {
        $v = $c.v
        if ($c.t -eq 's' -and $v -ne $null) { $v = $shared[[int]$v] }
        elseif ($c.t -eq 'inlineStr') { $v = $c.is.InnerText }
        if ($v -ne $null -and $v -ne '') { $cells += ($c.r + '=' + ($v -replace "[`r`n`t]+", ' ')) }
      }
      if ($cells.Count) { $lines.Add(($cells -join "`t")) }
    }
    $safe = ($s.name -replace '[^\w\- ]', '_')
    $out = Join-Path $OutDir ("{0:D2}_{1}.txt" -f $i, $safe)
    [System.IO.File]::WriteAllLines($out, $lines)
    "{0}`t{1} rows`t{2}" -f $s.name, $lines.Count, $out
  }
} finally { $zip.Dispose() }
