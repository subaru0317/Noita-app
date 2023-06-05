import { Button } from "@chakra-ui/react";
import React, { useState, memo } from "react";
import "./ImageUpload.css";
import { storage, db, auth } from "../firebase"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, setDoc, serverTimestamp, doc, addDoc } from "firebase/firestore";

const ImageUploader = memo(({fileSelected, wandSpellsInfo, videoDescription}) => {
  const [loading, setLoading] = useState(false);
  const [isUploaded, setUploaded] = useState(false);
  // const convertGifToMp4 = functions.httpsCallable("convertGifToMp4");
  const OnFileUploadToFirebase = async (e) => {
    if (!fileSelected) {
      alert("Oops! It looks like the video is not selected...")
      return ;
    }
    console.log("ImageUploader, wandSpellsInfo", wandSpellsInfo);
    if (wandSpellsInfo.length === 0) {
      alert("Oops! It looks like the wand edit has not been done...")
      return ;
    }
    // const file = e.target.files[0];
    const file = fileSelected;
    // ファイル名を一意にするためにタイムスタンプを追加 いるんかこれ？ dbの方は問題ないけど，storageの方でないと問題が発生する．はず．
    const fileName = Date.now() + "_" + file.name;
    const storageRef = ref(storage, "images/" + fileName);
    const uploadImage = uploadBytesResumable(storageRef, file);

    const userId = auth.currentUser.uid
    const userDocRef = doc(db, "users", userId);
    const imagesCollectionRef = collection(userDocRef, "images");
    const newImageDocRef = doc(imagesCollectionRef);

    uploadImage.on("state_changed", (snapshot) => {
      setLoading(true);
    },
    (error) => {
      console.log(error);
    },
    async () => {
        setLoading(false);
        setUploaded(true);
        // Firestoreにファイルに関連する情報を保存
        // const filteredAdditionalInfo = wandSpellsInfo.map(({ name, path }) => {
        //   return { name, path };
        // });
        // nameの情報は不要だと判断
        // pathだけにすることでFilterの効率改善
        const filteredWandSpellsInfo = wandSpellsInfo.map(({ path }) =>  path );
        const userInfo = {
          userId: userId,
          userName: auth.currentUser.displayName,
        }
        const filePath = await getDownloadURL(storageRef);
        const fileInfo = {
          fileId: newImageDocRef.id,
          fileName: fileName,
          filePath: filePath,
          wandSpellsInfo: filteredWandSpellsInfo,
          description: videoDescription,
          likeCount: 0,
          timestamp: serverTimestamp(),
        };
        try {
          await setDoc(userDocRef, userInfo);
          await setDoc(newImageDocRef, fileInfo);
          // Add the generated doc id to `fileInfo`
        } catch (error) {
          console.error("Error adding document: ", error);
        }
        // const result = await convertGifToMp4(storageRef.fullPath);
      }
    );
    console.log("Upload File!");
  };
  return (
    <div className="outerBox">
      <Button colorScheme='teal' variant='solid' onClick={OnFileUploadToFirebase}>
        Upload Video!
      </Button>
    </div>
  );
});

export default ImageUploader;
