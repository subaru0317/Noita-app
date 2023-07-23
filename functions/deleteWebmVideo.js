const functions = require('firebase-functions');
const admin = require('firebase-admin');
const bucket = admin.storage().bucket();
const firestore = admin.firestore();

exports.deleteWebmVideo = functions.https.onCall(async (data, context) => {
  const userId = context.auth.uid;
  const imageDocData = data.imageDocData;

  if (!imageDocData || !imageDocData.filePath) {
    console.error("Error: Invalid image document data");
    return { result: 'error', error: 'Invalid image document data' };
  }

  try {
    await deleteWebmVideoFile(userId, imageDocData.filePath);

    // After deleting the webmVideoFile, proceed to delete associated Firestore documents
    await deleteLikedByAndImageDocs(imageDocData);
    
    return { result: 'success' };
  } catch (error) {
    console.error("Error removing documents: ", error);
    return { result: 'error', error: error.message };
  }
});

async function deleteWebmVideoFile(userId, filePath) {
  const webmVideoFileRef = bucket.file(filePath);
  
  // webm video delete
  const webmMetadata = await webmVideoFileRef.getMetadata();
  const owner = webmMetadata[0].metadata.owner;

  if (owner !== userId) {
    console.error("Error: User ID mismatch");
    throw new Error('User ID mismatch');
  }

  await webmVideoFileRef.delete();
}

async function deleteLikedByAndImageDocs(imageDocData) {
  const likedByQuery = firestore.collection('users').doc(imageDocData.userId).collection('images').doc(imageDocData.fileId).collection('likedBy');
  const likedBySnapshot = await likedByQuery.get();

  const batch = firestore.batch(); // Use batch to perform multiple operations

  // For each user that liked the image, delete the image from their 'userLikedImages' collection
  likedBySnapshot.docs.forEach((docSnapshot) => {
    const userLikedImageRef = firestore.collection('users').doc(docSnapshot.id).collection('userLikedImages').doc(imageDocData.fileId);
    batch.delete(userLikedImageRef);
  });

  // Finally, delete the documents from the 'likedBy' subcollection
  likedBySnapshot.docs.forEach((docSnapshot) => {
    batch.delete(docSnapshot.ref);
  });

  // Commit the batch
  await batch.commit();

  const docRef = firestore.collection('users').doc(imageDocData.userId).collection('images').doc(imageDocData.fileId);
  await docRef.delete();

  console.log("Documents successfully deleted!");
}
