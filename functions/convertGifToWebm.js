'use strict';

const functions = require('firebase-functions');
const { Storage } = require('@google-cloud/storage');
const path = require('path');
const os = require('os');
const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');
const ffmpeg_static = require('ffmpeg-static');
const cors = require('cors')({origin: true});

const gcs = new Storage();

exports.convertGifToWebm = functions.runWith({timeoutSeconds: 540}).https.onRequest((req, res) => {
  // Enable CORS using the `cors` express middleware.
  cors(req, res, async () => {
    if (req.method !== "POST") {
      res.status(400).send('Please send a POST request');
      return;
    }

    const filePath = req.body.filePath; // Expected to receive the filePath in the request body
    const fileName = path.basename(filePath);
    const fileBucket = req.body.bucket; // Expected to receive the bucket name in the request body

    const bucket = gcs.bucket(fileBucket);
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
    
      // Upload converted file
      await bucket.upload(targetTempFilePath, {destination: targetStorageFilePath}).then(() => {
        console.log('Output file uploaded to', targetStorageFilePath);
        fs.unlinkSync(tempFilePath);
        fs.unlinkSync(targetTempFilePath);
      });
    
      res.status(200).send({ filePath: targetStorageFilePath }); // send back the storage path of the converted file
    } catch (error) {
      console.error('Error in converting gif to webm: ', error);
      res.status(500).send('Error in converting gif to webm');
    }
  });
});