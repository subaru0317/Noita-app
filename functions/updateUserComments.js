const functions = require('firebase-functions');
const admin = require('firebase-admin');

exports.updateUserComments = functions.https.onCall(async (data, context) => {
  const userId = data.userId;
  const newDisplayName = data.newDisplayName;
  const newPhotoURL = data.newPhotoURL;
  
  const batch = admin.firestore().batch();
  
  const userCommentsSnapshot = await admin
    .firestore()
    .collection("comments")
    .where("userId", "==", userId)
    .get();
    
  userCommentsSnapshot.docs.forEach((doc) => {
    const commentRef = admin.firestore().collection("comments").doc(doc.id);

    let updateObject = {};
    if (newDisplayName) {
      updateObject.userName = newDisplayName;
    }
    if (newPhotoURL) {
      updateObject.userIcon = newPhotoURL;
    }

    if (Object.keys(updateObject).length > 0) {
      batch.update(commentRef, updateObject);
    }
  });
  
  await batch.commit();
  return { result: "User comments updated successfully" };
});
