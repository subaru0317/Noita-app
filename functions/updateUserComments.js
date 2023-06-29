const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

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
    batch.update(commentRef, {
      userName: newDisplayName,
      userIcon: newPhotoURL,
    });
  });
  
  await batch.commit();
  return { result: "User comments updated successfully" };
});
