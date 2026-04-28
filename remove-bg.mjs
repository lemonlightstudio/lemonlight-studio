import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const input  = path.join(__dirname, 'public/Christoph/Christoph_vorne.png');
const output = path.join(__dirname, 'public/Christoph/christoph_edit.png');

// Get image metadata
const meta = await sharp(input).metadata();
const { width, height } = meta;

// 1. Process base image: boost contrast + slight darken
const base = await sharp(input)
  .ensureAlpha()
  .linear(1.15, -(128 * 0.15))
  .modulate({ brightness: 0.88 })
  .toBuffer();

// 2. Build grain as a PNG via sharp (avoids raw-channel mismatch)
//    Create a small gray tile and tile it across the image
const tileSize = 64;
const tileChannels = 4; // RGBA
const tilePixels = Buffer.alloc(tileSize * tileSize * tileChannels);
for (let i = 0; i < tileSize * tileSize; i++) {
  const noise = Math.round((Math.random() - 0.5) * 24) + 128;
  tilePixels[i * 4 + 0] = noise; // R
  tilePixels[i * 4 + 1] = noise; // G
  tilePixels[i * 4 + 2] = noise; // B
  tilePixels[i * 4 + 3] = 30;   // A — very low opacity grain
}

const grainTile = await sharp(tilePixels, {
  raw: { width: tileSize, height: tileSize, channels: tileChannels },
}).png().toBuffer();

// Tile the grain to full image size
const grainFull = await sharp({
  create: {
    width,
    height,
    channels: 4,
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  },
})
  .composite(
    // Tile manually by repeating the grain at offsets
    Array.from({ length: Math.ceil(height / tileSize) }, (_, row) =>
      Array.from({ length: Math.ceil(width / tileSize) }, (_, col) => ({
        input: grainTile,
        top: row * tileSize,
        left: col * tileSize,
      }))
    ).flat()
  )
  .png()
  .toBuffer();

// 3. Composite grain over processed base
await sharp(base)
  .composite([{ input: grainFull, blend: 'overlay' }])
  .png({ compressionLevel: 8 })
  .toFile(output);

console.log(`Done → ${output}`);
