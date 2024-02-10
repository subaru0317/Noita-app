const functions = require('firebase-functions');
const admin = require('firebase-admin');
const axios = require('axios');
const stream = require('stream');

const db = admin.firestore();
const bucket = admin.storage().bucket();

const MAX_SIZE = 1 * 1024 * 1024;  // 1MB

exports.saveImage = functions.https.onCall(async (data, context) => {
  const url = data.url;
  const response = await axios.get(url, { responseType: 'arraybuffer' });

  if (!response.headers['content-type'].startsWith('image/')) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'URL does not point to an image.',
    );
  }

  const buffer = Buffer.from(response.data, 'binary');

  if (buffer.length > MAX_SIZE) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'Image file size exceeds limit.',
    );
  }

  // Delete the user's existing icon
  const userRef = db.collection('users').doc(context.auth.uid);
  const user = await userRef.get();
  if (user.exists && user.data().iconFilename) {
    const oldFilename = decodeURIComponent(user.data().iconFilename).split('?')[0];
    const oldFile = bucket.file(oldFilename);
    await oldFile.delete();
  }

  const filename = `userIcons/${context.auth.uid}_${Date.now()}`;
  const file = bucket.file(filename);

  await file.save(buffer);

  // Update the user's iconFilename in Firestore
  await userRef.update({ iconFilename: filename });

  // Return the URL of the image stored in Firebase Storage
  return `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(filename)}?alt=media`;
});
