const functions = require('firebase-functions');
const admin = require('firebase-admin');
const url = require('url');

exports.deleteUserIcon = functions.firestore
    .document('users/{userId}')
    .onDelete(async (snap, context) => {
        const deletedValue = snap.data();

        // userIconのURLを取得します。
        const fileUrl = deletedValue.userIcon;

        if (fileUrl) {
            // URLからパスを抽出します。
            const filePath = url.parse(fileUrl).pathname;
            // パスがURLエンコードされているため、デコードします。
            const decodedFilePath = decodeURIComponent(filePath);

            // FirebaseのURL形式からバケット名とオブジェクト名を抽出します。
            const regex = /\/b\/([^\/]+)\/o\/(.*)/;
            const match = decodedFilePath.match(regex);

            // マッチしない場合はエラーとします。
            if (!match || match.length !== 3) {
                console.error(`Failed to parse file path from URL: ${fileUrl}`);
                return;
            }

            // 抽出したバケット名とオブジェクト名を使用します。
            const bucketName = match[1];
            const objectName = match[2];

            const bucket = admin.storage().bucket(bucketName);
            // Cloud Storageからファイルを削除します。
            return bucket.file(objectName).delete()
                .then(() => {
                    console.log(`File ${objectName} has been deleted from bucket ${bucketName}.`);
                })
                .catch(err => {
                    console.error(`Failed to remove file ${objectName} from bucket ${bucketName}:`, err);
                });
        }
    });
