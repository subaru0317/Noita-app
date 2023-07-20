const admin = require('firebase-admin');

// Initialize Firebase only once
if (admin.apps.length === 0) {
  admin.initializeApp();
}

const { convertGifToWebm } = require('./convertGifToWebm');
const { updateUserComments } = require('./updateUserComments');
const { saveImage } = require('./saveImage');
const { deleteUserIcon } = require('./deleteUserIcon');
const { deleteWebmVideo } = require('./deleteWebmVideo');

exports.convertGifToWebm = convertGifToWebm;
exports.updateUserComments = updateUserComments;
exports.saveImage = saveImage;
exports.deleteUserIcon = deleteUserIcon;
exports.deleteWebmVideo = deleteWebmVideo;
