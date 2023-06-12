import { Button } from "@chakra-ui/react";
import React, { useState, memo } from "react";
import "./ImageUpload.css";
import { storage, db, auth } from "../firebase"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, setDoc, serverTimestamp, doc, addDoc } from "firebase/firestore";
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

// Initialize FFmpeg
const ffmpeg = createFFmpeg({ log: true });

const convertToWebm = async (file) => {
  // Wait for FFmpeg to be ready
  await ffmpeg.load();

  // Convert the file to a Uint8Array
  const fileData = await fetchFile(file);

  // Write the file data to FFmpeg's memory
  ffmpeg.FS('writeFile', 'input.gif', fileData);

  // Run the FFmpeg command
  await ffmpeg.run('-i', 'input.gif', 'output.webm');

  // Read the result
  const output = ffmpeg.FS('readFile', 'output.webm');

  // Create a new Blob from the output file
  const webmBlob = new Blob([output.buffer], { type: 'video/webm' });

  return webmBlob;
}

const ImageUploader = memo(({fileSelected, wandSpells, videoDescription}) => {
  const [loading, setLoading] = useState(false);
  const [isUploaded, setUploaded] = useState(false);
  const OnFileUploadToFirebase = async (e) => {
    if (!fileSelected) {
      alert("Oops! It looks like the video is not selected...")
      return ;
    }
    console.log("ImageUploader, wandSpells", wandSpells);
    if (wandSpells.length === 0) {
      alert("Oops! It looks like the wand edit has not been done...")
      return ;
    }
    // const file = e.target.files[0];
    const file = fileSelected;
    const convertedFile = await convertToWebm(file);
    // ファイル名を一意にするためにタイムスタンプを追加 いるんかこれ？ dbの方は問題ないけど，storageの方でないと問題が発生する．はず．
    const fileName = Date.now() + "_" + file.name;
    const storageRef = ref(storage, "images/" + fileName);
    const uploadImage = uploadBytesResumable(storageRef, convertedFile);

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
        // const filteredAdditionalInfo = wandSpells.map(({ name, path }) => {
        //   return { name, path };
        // });
        // nameの情報は不要だと判断
        // pathだけにすることでFilterの効率改善
        const filteredWandSpells = wandSpells.map(({ path }) =>  path );
        const userInfo = {
          userId: userId,
          userName: auth.currentUser.displayName,
        }
        const filePath = await getDownloadURL(storageRef);
        const fileInfo = {
          userId: userId,
          fileId: newImageDocRef.id,
          fileName: fileName,
          filePath: filePath,
          wandSpells: filteredWandSpells,
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
