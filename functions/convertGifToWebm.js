'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const path = require('path');
const os = require('os');
const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');
const ffmpeg_static = require('ffmpeg-static');

const bucket = admin.storage().bucket();

exports.convertGifToWebm = functions.runWith({timeoutSeconds: 540}).https.onCall(async (data, context) => {
  const filePath = data.filePath;
  const fileName = path.basename(filePath);
  const userId = context.auth.uid; // Here you get the userId from the authenticated user

  const tempFilePath = path.join(os.tmpdir(), fileName);
  const targetTempFileName = fileName.replace(/\.[^/.]+$/, '') + '.webm';
  const targetTempFilePath = path.join(os.tmpdir(), targetTempFileName);
  const targetStorageFilePath = path.join(path.dirname(filePath), targetTempFileName);

  try {
    await bucket.file(filePath).download({destination: tempFilePath});
    console.log('Gif file downloaded locally to', tempFilePath);

    await new Promise((resolve, reject) => {
      ffmpeg(tempFilePath)
        .setFfmpegPath(ffmpeg_static)
        .outputFormat('webm')
        .output(targetTempFilePath)
        .on('end', resolve)
        .on('error', reject)
        .run();
    });
    console.log('Output file created at', targetTempFilePath);

    const fileMetadata = {
      metadata: {
        'owner': userId,
      }
    };

    console.log('fileMetadata to be uploaded:', fileMetadata); // Debug: Log metadata

    await bucket.upload(targetTempFilePath, {
      destination: targetStorageFilePath,
      metadata: fileMetadata, // Set metadata at the time of upload
    }).then(async () => {
      console.log('Output file uploaded to', targetStorageFilePath);

      // Check metadata after upload
      const file = bucket.file(targetStorageFilePath);
      const [metadata] = await file.getMetadata();
      console.log('Uploaded file metadata:', metadata);

      fs.unlinkSync(tempFilePath);
      fs.unlinkSync(targetTempFilePath);

    }).catch((error) => {
      console.error('Error in uploading the file: ', error);
      throw new functions.https.HttpsError('internal', 'Error in uploading the file');
    });

    return { filePath: targetStorageFilePath }; // Return the storage path of the converted file
  } catch (error) {
    console.error('Error in converting gif to webm: ', error);
    throw new functions.https.HttpsError('internal', 'Error in converting gif to webm');
  }
});
