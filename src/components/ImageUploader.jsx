import { Button, Image } from "@chakra-ui/react";
import React, { useState } from "react";
import "./ImageUpload.css";
// import { storage, functions } from "./firebase"
import { storage, db } from "../firebase"
import { ref, uploadBytesResumable } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";


const SelectedFilePreview = ({ onFileSelected }) => {
  const [previewSrc, setPreviewSrc] = useState(null);
  const previewFile = (e) => {
    const file = e.target.files[0];
    onFileSelected(file);
    const reader = new FileReader();

    reader.addEventListener("load", function () {
      // Convert image file to a base64 string
      setPreviewSrc(reader.result);
    }, false);

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  return (
    <>
      <input type="file" onChange={previewFile} />
      <Image src={previewSrc} width="480px" height="270px"/>
    </>
  )
}



const ImageUploader = () => {
  // const [selectedVideo, setSelectedImage] = useState(null);
  const [fileSelected, onFileSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isUploaded, setUploaded] = useState(false);


  // const convertGifToMp4 = functions.httpsCallable("convertGifToMp4");
  const OnFileUploadToFirebase = async (e) => {
    // const file = e.target.files[0];
    const file = fileSelected;
    // ファイル名を一意にするためにタイムスタンプを追加
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
        const fileInfo = {
          filename: fileName,
          // 他の関連するデータも必要に応じて追加できます
        };
        try {
          await addDoc(collection(db, "images"), fileInfo);
          // Firestoreのコレクション "files" に fileInfo を追加
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
      <SelectedFilePreview onFileSelected={onFileSelected} />
      <Button colorScheme='teal' variant='solid' onClick={OnFileUploadToFirebase}>
        Upload Video!
      </Button>
    </div>
  );
};

export default ImageUploader;
