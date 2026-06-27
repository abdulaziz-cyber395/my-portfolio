const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, '..', 'assets', 'images');
const maxWidth = 1200;
const maxHeight = 1200;
const quality = 85;

async function optimizeImages() {
  const files = fs.readdirSync(imagesDir);
  const imageFiles = files.filter(f => /\.(jpe?g|png|webp)$/i.test(f));

  console.log(`Optimizing ${imageFiles.length} images...\n`);

  for (const file of imageFiles) {
    const filePath = path.join(imagesDir, file);
    const stats = fs.statSync(filePath);
    const originalSize = stats.size;

    // Skip files smaller than 50KB or profile images
    if (originalSize < 50000 || /profile|avatar/i.test(file)) {
      console.log(`SKIP: ${file} (${(originalSize / 1024).toFixed(1)} KB - profile or small file)`);
      continue;
    }

    try {
      console.log(`Processing: ${file} (${(originalSize / 1024).toFixed(1)} KB)`);

      const ext = path.extname(file).toLowerCase();

      let buffer;

      if (ext === '.png') {
        buffer = await sharp(filePath)
          .resize({ width: maxWidth, height: maxHeight, fit: 'inside', withoutEnlargement: true })
          .png({ compressionLevel: 9, palette: false, effort: 10 })
          .toBuffer();
      } else {
        buffer = await sharp(filePath)
          .resize({ width: maxWidth, height: maxHeight, fit: 'inside', withoutEnlargement: true })
          .jpeg({ quality, mozjpeg: true })
          .toBuffer();
      }

      fs.writeFileSync(filePath, buffer);

      const newSize = buffer.length;
      const reduction = ((1 - newSize / originalSize) * 100).toFixed(1);
      console.log(`  SUCCESS: ${(originalSize / 1024).toFixed(1)} KB -> ${(newSize / 1024).toFixed(1)} KB (${reduction}% reduction)\n`);
    } catch (err) {
      console.log(`  ERROR: ${err.message}\n`);
    }
  }

  console.log('Image optimization complete!');
}

optimizeImages();