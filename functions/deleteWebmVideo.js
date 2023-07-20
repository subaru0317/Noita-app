const functions = require('firebase-functions');
const admin = require('firebase-admin');

// 削除可能条件
// ・webmVideoのメタ情報のユーザIDと削除しようとしているユーザIDが一致している
// ・権限
// ・Videoが存在している
// ・依存関係の確認(FirebaseStore)

const bucket = admin.storage().bucket();

exports.deleteWebmVideo = functions.https.onCall(async (data, context) => {
  const userId = context.auth.uid;
  const imageDocData = data.imageDocData;

  if (!imageDocData || !imageDocData.fileName) {
    console.error("Error: Invalid image document data");
    return { result: 'error', error: 'Invalid image document data' };
  }

  const webmVideoFileRef = bucket.file(imageDocData.fileName);
  
  try {
    const webmMetadata = await webmVideoFileRef.getMetadata();
    const owner = webmMetadata[0].metadata.owner;

    if (owner !== userId) {
      console.error("Error: User ID mismatch");
      return { result: 'erorr', error: 'User ID mismatch' };
    }

    await webmVideoFileRef.delete();
    return { result: 'success' };
  } catch (error) {
    console.error("Error removing document: ", error);
    return { result: 'error', error: error.message };
  }
});
