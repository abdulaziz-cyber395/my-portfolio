Add-Type -AssemblyName System.Drawing
$files = @('abdul profile2.png','symbols-screenshot.png','revastech-screenshot.png')
foreach ($f in $files) {
    $path = Join-Path 'C:\Users\Abdul Aziz\Desktop\portfolio\assets\images' $f
    if (Test-Path $path) {
        $img = [System.Drawing.Image]::FromFile($path)
        Write-Host "$f`: $($img.Width)x$($img.Height) pixels"
        $img.Dispose()
    } else {
        Write-Host "$f not found"
    }
}
