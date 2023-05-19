// 1. FilterModalでSpellの選択を行い，それに従ってFilterをかけたい
// 2. いいね・お気に入り機能の実装
// 3. Uploadしたタイミングで各ファイルに情報をセットする

// collection --- いわゆるtable

import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

// sample
const addDocument = async () => {
  console.log("addDocument called");
  try {
    const docRef = await addDoc(collection(db, "users"), {
      first: "Ada",
      last: "Lovelace",
      born: 1815
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

// 3
// const setVideoDoc(doc(db, ))

export { addDocument };

// try {
//   const docRef = await addDoc(collection(db, "users"), {
//     first: "Alan",
//     middle: "Mathison",
//     last: "Turing",
//     born: 1912
//   });

//   console.log("Document written with ID: ", docRef.id);
// } catch (e) {
//   console.error("Error adding document: ", e);
// }

// window.onload = async () => {
//   const value = {
//     task: "hogehoge",
//     status: 1,
//     createdAt: new Data(),
//   };
//   await db.collection("todos").add(value);
// };
// import "firebase/firestore";


// // コレクション名とドキュメントID
// const collectionName = 'files';
// const documentId = 'file1';

// // コレクションの参照
// const collectionRef = db.collection(collectionName);

// // ドキュメントの参照
// const documentRef = collectionRef.doc(documentId);

// // ドキュメントにいいねの数を追加
// const initialLikes = 0;
// documentRef.set({ likes: initialLikes })
//   .then(() => {
//     console.log('いいねの数が初期化されました');
//   })
//   .catch((error) => {
//     console.error('ドキュメントの追加エラー:', error);
//   });

//   // ドキュメントの参照
// const documentRef = collectionRef.doc(documentId);

// // いいねの数のトラック
// documentRef.onSnapshot((snapshot) => {
//   const data = snapshot.data();
//   const likes = data?.likes || 0;
//   console.log('現在のいいねの数:', likes);
// });

// // いいねの数の更新
// function incrementLikes() {
//   documentRef.update({ likes: firebase.firestore.FieldValue.increment(1) })
//     .then(() => {
//       console.log('いいねの数が更新されました');
//     })
//     .catch((error) => {
//       console.error('いいねの数の更新エラー:', error);
//     });
// }

// // いいねの数の増加を実行
// incrementLikes();
