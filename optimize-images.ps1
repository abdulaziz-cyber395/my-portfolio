# Image Optimization Script for Portfolio
# Compresses large images to improve website performance
#
# NOTE: `npm run optimize-images` (scripts/optimize-images.js, uses sharp) is
# now the primary/recommended tool and also covers assets/figma img. This
# PowerShell version is kept for Windows users without Node, and has been
# fixed to point at the correct project path below.

Add-Type -AssemblyName System.Drawing

$imagesFolders = @(
    "C:\Users\Abdul Aziz\Desktop\my-portfolio\assets\images",
    "C:\Users\Abdul Aziz\Desktop\my-portfolio\assets\figma img"
)
$maxDimension = 1200
$jpegQuality = 85
$pngCompressionLevel = 9

function Optimize-Image {
    param([string]$FilePath)

    try {
        $originalSize = (Get-Item $FilePath).Length
        $ext = [System.IO.Path]::GetExtension($FilePath).ToLower()

        if ($originalSize -lt 100KB) {
            Write-Host "SKIP (small): $FilePath" -ForegroundColor Gray
            return
        }

        Write-Host ("Processing: {0} ({1:N2} KB)" -f $FilePath, ($originalSize/1KB))

        $img = [System.Drawing.Image]::FromFile($FilePath)
        $width = $img.Width
        $height = $img.Height

        $shouldResize = $false
        if ($width -gt $maxDimension -or $height -gt $maxDimension) {
            $shouldResize = $true
            if ($width -gt $height) {
                $newWidth = $maxDimension
                $newHeight = [int](($height / $width) * $maxDimension)
            } else {
                $newHeight = $maxDimension
                $newWidth = [int](($width / $height) * $maxDimension)
            }
        }

        $tempPath = [System.IO.Path]::Combine([System.IO.Path]::GetDirectoryName($FilePath), "temp" + $ext)

        if ($ext -in ".jpg", ".jpeg", ".jpe") {
            $jpegEncoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.FormatID -eq [System.Drawing.Imaging.ImageFormat]::Jpeg.Guid }
            $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
            $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, $jpegQuality)

            if ($shouldResize) {
                $resized = New-Object System.Drawing.Bitmap($newWidth, $newHeight)
                $graphics = [System.Drawing.Graphics]::FromImage($resized)
                $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
                $graphics.DrawImage($img, 0, 0, $newWidth, $newHeight)
                $resized.Save($tempPath, $jpegEncoder, $encoderParams)
                $resized.Dispose()
                $graphics.Dispose()
            } else {
                $img.Save($tempPath, $jpegEncoder, $encoderParams)
            }
        }
        elseif ($ext -eq ".png") {
            $pngEncoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.FormatID -eq [System.Drawing.Imaging.ImageFormat]::Png.Guid }
            $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
            $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Compression, $pngCompressionLevel)

            if ($shouldResize) {
                $resized = New-Object System.Drawing.Bitmap($newWidth, $newHeight)
                $graphics = [System.Drawing.Graphics]::FromImage($resized)
                $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
                $graphics.DrawImage($img, 0, 0, $newWidth, $newHeight)
                $resized.Save($tempPath, $pngEncoder, $encoderParams)
                $resized.Dispose()
                $graphics.Dispose()
            } else {
                $img.Save($tempPath, $pngEncoder, $encoderParams)
            }
        }
        else {
            Write-Host "  Skipping unsupported format: $ext"
            $img.Dispose()
            return
        }

        $img.Dispose()

        $newSize = (Get-Item $tempPath).Length
        if ($newSize -lt $originalSize) {
            Move-Item -Path $tempPath -Destination $FilePath -Force
            $reduction = [math]::Round((1 - ($newSize/$originalSize)) * 100, 1)
            Write-Host ("  SUCCESS: {0:N2} KB -> {1:N2} KB ({2}% reduction)" -f ($originalSize/1KB), ($newSize/1KB), $reduction) -ForegroundColor Green
        } else {
            Remove-Item $tempPath -Force
            Write-Host "  No improvement (keeping original)" -ForegroundColor Yellow
        }

    } catch {
        Write-Host "  ERROR: $_" -ForegroundColor Red
    }
}

foreach ($folder in $imagesFolders) {
    if (-not (Test-Path $folder)) {
        Write-Host "SKIP (not found): $folder" -ForegroundColor Gray
        continue
    }

    $imageFiles = Get-ChildItem -Path $folder -Include *.jpg, *.jpeg, *.png, *.webp -Recurse
    Write-Host "`nOptimizing images in $folder`n"
    foreach ($file in $imageFiles) {
        Optimize-Image -FilePath $file.FullName
    }
}

Write-Host "`nImage optimization complete!"
