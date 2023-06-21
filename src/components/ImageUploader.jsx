import { Button, useToast } from "@chakra-ui/react";
import React, { useState, memo } from "react";
import "./ImageUpload.css";
import { storage, db, auth, functionsURL, bucket } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { collection, setDoc, serverTimestamp, doc } from "firebase/firestore";
import axios from 'axios'; // import axios for making HTTP requests

const ImageUploader = memo(({fileSelected, wandSpells, videoDescription, videoTitle}) => {
  console.log("Clicked!");
  const [loading, setLoading] = useState(false);
  const [isUploaded, setUploaded] = useState(false);

  const toast = useToast();

  const OnFileUploadToFirebase = async (e) => {
    if (!fileSelected) {
      toast({
        title: "An error occurred.",
        description: "It looks like the video is not selected.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }

    const file = fileSelected;
    const fileName = Date.now() + "_" + file.name;
    const storageRef = ref(storage, "images/" + fileName);
    const userId = auth.currentUser.uid;
    const userDocRef = doc(db, "users", userId);
    const imagesCollectionRef = collection(userDocRef, "images");
    const newImageDocRef = doc(imagesCollectionRef);

    const uploadImage = uploadBytesResumable(storageRef, file, {
      metadata: {
        customMetadata: {
          'userId': userId,
          'fileId': newImageDocRef.id,
        },
      },
    });

    uploadImage.on("state_changed", (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setLoading(true);
      },
      (error) => {
        console.log(error);
      },
      async () => {
        try {
          setLoading(false);
          
          const filePath = 'images/' + fileName;
          
          // make HTTP request to your Cloud Function
          const response = await axios.post(functionsURL, {
            filePath: filePath,
            bucket: bucket
          });
          const webmFilePath = response.data.filePath;
          
          const webmFileRef = ref(storage, webmFilePath);
          const webmFileURL = await getDownloadURL(webmFileRef);
          
          const userInfo = {
            userId: userId,
            userName: auth.currentUser.displayName,
          }
          const fileInfo = {
            userId: userId,
            fileId: newImageDocRef.id,
            fileName: webmFilePath,
            filePath: webmFileURL,
            wandSpells: wandSpells,
            description: videoDescription,
            videoTitle: videoTitle,
            likeCount: 0,
            timestamp: serverTimestamp(),
          };
          
          console.log('Adding document to Firestore...');
          await setDoc(userDocRef, userInfo);
          await setDoc(newImageDocRef, fileInfo);

          // Delete the original gif file
          await deleteObject(storageRef);

          setUploaded(true);
          console.log("Upload File!");
        } catch (error) {
          console.error("Error: ", error);
        }
      }
    );
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
