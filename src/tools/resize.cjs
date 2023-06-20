const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const Jimp = require('jimp');

const inputDirectoryPath = path.join(__dirname, '..', '..', 'public', 'spells');
const outputDirectoryPath = path.join(__dirname, '..', '..', 'public', 'spells', 'resized');

let totalOriginalSize = 0;
let totalCompressedSize = 0;

fs.readdir(inputDirectoryPath, (err, files) => {
  if (err) {
    return console.log('Unable to scan directory: ' + err);
  } 

  files.forEach((file, index) => {
    if (path.extname(file).toLowerCase() === '.webp') {
      const inputFilePath = path.join(inputDirectoryPath, file);
      const outputFilePath = path.join(outputDirectoryPath, file);

      fs.stat(inputFilePath, (err, stats) => {
        if (err) {
          return console.log(`Unable to get stats of file ${file}: ` + err);
        }

        totalOriginalSize += stats.size;

        sharp(inputFilePath)
          .resize(35, 35)
          .toBuffer()
          .then(buffer => {
            Jimp.read(buffer, (err, image) => {
              if (err) {
                return console.log(`Unable to read file ${file}: ` + err);
              }

              image
                .quality(60) // set JPEG quality
                .quantize() // reduce colors
                .write(outputFilePath); // save

              fs.stat(outputFilePath, (err, stats) => {
                if (err) {
                  return console.log(`Unable to get stats of file ${file}: ` + err);
                }

                totalCompressedSize += stats.size;
                console.log(`Image ${file} resized and compressed from ${totalOriginalSize} to ${totalCompressedSize}`);

                // if all files have been processed, print total compression
                if (index === files.length - 1) {
                  console.log(`Total size went from ${totalOriginalSize} to ${totalCompressedSize}`);
                }
              });
            });
          })
          .catch(err => {
            return console.log(`Unable to resize file ${file}: ` + err);
          });
      });
    }
  });
});
