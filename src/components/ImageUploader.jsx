import { Button } from "@chakra-ui/react";
import React, { useState, memo } from "react";
import "./ImageUpload.css";
import { storage, db, auth } from "../firebase"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, setDoc, serverTimestamp, doc } from "firebase/firestore";

const ImageUploader = memo(({fileSelected, additionalInfo, videoDescription}) => {
  const [loading, setLoading] = useState(false);
  const [isUploaded, setUploaded] = useState(false);
  // const convertGifToMp4 = functions.httpsCallable("convertGifToMp4");
  const OnFileUploadToFirebase = async (e) => {
    if (!fileSelected) {
      alert("Oops! It looks like the video is not selected...")
      return ;
    }
    if (additionalInfo.length === 0) {
      alert("Oops! It looks like the wand edit has not been done...")
      return ;
    }
    // const file = e.target.files[0];
    const file = fileSelected;
    // ファイル名を一意にするためにタイムスタンプを追加 いるんかこれ？ dbの方は問題ないけど，storageの方でないと問題が発生する．はず．
    const fileName = Date.now() + "_" + file.name;
    const storageRef = ref(storage, "images/" + fileName);
    const uploadImage = uploadBytesResumable(storageRef, file);

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
        // const filteredAdditionalInfo = additionalInfo.map(({ name, path }) => {
        //   return { name, path };
        // });
        // nameの情報は不要だと判断
        const filteredAdditionalInfo = additionalInfo.map(({ path }) => {
          return { path };
        });
        const userId = auth.currentUser.uid
        const userInfo = {
          userId: userId,
          userName: auth.currentUser.displayName,
        }
        const filePath = await getDownloadURL(storageRef);
        const fileInfo = {
          fileName: fileName,
          filePath: filePath,
          additionalInfo: filteredAdditionalInfo,
          description: videoDescription,
          likeCount: 0,
          timestamp: serverTimestamp(),
        };
        try {
          const userDocRef = doc(db, "users", userId);
          await setDoc(userDocRef, userInfo);
          const imagesDocRef = doc(collection(userDocRef, "images"));
          await setDoc(imagesDocRef, fileInfo);
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
