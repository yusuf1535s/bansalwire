import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

const dirs = [
  path.resolve('./public/images/bansal'),
  path.resolve('./public/images')
]

async function optimizeFile(filePath) {
  const ext = path.extname(filePath).toLowerCase()
  if (!['.png', '.jpg', '.jpeg', '.webp'].includes(ext)) return

  const statBefore = fs.statSync(filePath)
  const sizeBefore = statBefore.size

  try {
    const buffer = fs.readFileSync(filePath)
    const image = sharp(buffer)
    const metadata = await image.metadata()

    // Determine max dimension
    const maxDim = 1400
    let pipeline = image

    if (metadata.width && metadata.height) {
      if (metadata.width > maxDim || metadata.height > maxDim) {
        pipeline = pipeline.resize({
          width: metadata.width > metadata.height ? maxDim : undefined,
          height: metadata.height >= metadata.width ? maxDim : undefined,
          fit: 'inside',
          withoutEnlargement: true
        })
      }
    }

    let outputBuffer
    if (ext === '.png') {
      outputBuffer = await pipeline
        .png({ compressionLevel: 9, quality: 80, effort: 7 })
        .toBuffer()
    } else if (ext === '.jpg' || ext === '.jpeg') {
      outputBuffer = await pipeline
        .jpeg({ quality: 80, mozjpeg: true })
        .toBuffer()
    } else if (ext === '.webp') {
      outputBuffer = await pipeline
        .webp({ quality: 80, effort: 6 })
        .toBuffer()
    }

    if (outputBuffer && outputBuffer.length < sizeBefore) {
      fs.writeFileSync(filePath, outputBuffer)
      const savedPercent = (((sizeBefore - outputBuffer.length) / sizeBefore) * 100).toFixed(1)
      console.log(`✓ ${path.basename(filePath)}: ${(sizeBefore / 1024).toFixed(0)}KB -> ${(outputBuffer.length / 1024).toFixed(0)}KB (${savedPercent}% smaller)`)
    } else {
      console.log(`- ${path.basename(filePath)}: Already optimal (${(sizeBefore / 1024).toFixed(0)}KB)`)
    }
  } catch (err) {
    console.error(`✗ Error optimizing ${path.basename(filePath)}:`, err.message)
  }
}

async function run() {
  console.log('--- Starting Image Optimization ---')
  for (const dir of dirs) {
    if (!fs.existsSync(dir)) continue
    const files = fs.readdirSync(dir)
    for (const file of files) {
      const fullPath = path.join(dir, file)
      if (fs.statSync(fullPath).isFile()) {
        await optimizeFile(fullPath)
      }
    }
  }
  console.log('--- Finished Image Optimization ---')
}

run()
