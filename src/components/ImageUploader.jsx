import { Button, useToast, CircularProgress, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure } from "@chakra-ui/react";
import { useState, memo } from "react";
import "./ImageUpload.css";
import { storage, db, auth, functions } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { collection, setDoc, serverTimestamp, doc } from "firebase/firestore";
import { httpsCallable } from 'firebase/functions';

const ImageUploader = memo(({fileSelected, wandSpells, videoDescription, videoTitle, videoTag, setFileSelected, setWandSpells, setVideoDescription, setVideoTitle, setVideoTag, setPreviewSrc}) => {
  const [isUploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const OnFileUploadToFirebase = async (e) => {
    if (!fileSelected) {
      toast({
        title: "An error occurred.",
        description: "It looks like the video is not selected.",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "bottom-right",
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
    const uploadImage = uploadBytesResumable(storageRef, file);

    uploadImage.on("state_changed", (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
        setUploading(true);
      },
      (error) => {
        console.log(error);
        setUploading(false);
        toast({
          title: "An error occurred.",
          description: "There was a problem with the upload. Please try again later.",
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "bottom-right",
        });
      },
      async () => {
        try {
          setUploading(false);
          setUploadProgress(0); // Reset upload progress after upload is complete
          onOpen(); // Open the modal
          const filePath = 'images/' + fileName;
          console.log("Modal Open!");
          // Cloud Functionの呼び出し
          const convertGifToWebm = httpsCallable(functions, 'convertGifToWebm');
          const response = await convertGifToWebm({ filePath: filePath });

          console.log("Gif to Webm!");
          const webmFilePath = response.data.filePath;
          
          // const webmFileRef = ref(storage, webmFilePath);
          // const webmFileURL = await getDownloadURL(webmFileRef);
          
          const videoTagNames = videoTag.map(tag => tag.name);
          const wandSpellNames = wandSpells.map(spell => spell.name);
          const fileInfo = {
            userId: userId,
            fileId: newImageDocRef.id,
            // fileName: webmFilePath,
            // filePath: webmFileURL,
            filePath: webmFilePath,
            wandSpells: wandSpellNames,
            description: videoDescription,
            videoTitle: videoTitle,
            videoTag: videoTagNames,
            likeCount: 0,
            timestamp: serverTimestamp(),
          };
          
          console.log('Adding document to Firestore...');
          await setDoc(newImageDocRef, fileInfo);

          // Delete the original gif file
          await deleteObject(storageRef); 
          setUploadProgress(0);
          console.log("Upload File!");
        } catch (error) {
          setUploading(false);
          setUploadProgress(0);
          toast({
            title: "An error occurred.",
            description: "There was a problem with the upload. Please try again later.",
            status: "error",
            duration: 9000,
            isClosable: true,
            position: "bottom-right",
          });
          console.error("Error: ", error);
        }
      }
    );
  };

  const handleReset = () => {
    setFileSelected(null);
    setPreviewSrc(null);
    setVideoTitle('');
    setVideoDescription('');
    setWandSpells([]);
    setVideoTag([]);
    onClose();
  }
  
  return (
    <div className="outerBox">
      <Button colorScheme='teal' variant='solid' onClick={OnFileUploadToFirebase} isLoading={isUploading}>
        {isUploading ? <CircularProgress isIndeterminate color="green.300" /> : "Upload Video!"}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Thank you for your upload:)</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            It may take up to 10 minutes for the actual reflection of the data <br /><br />
            Keep : remain your input data <br />
            Reset : reset your input data
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="gray" mr={3} onClick={onClose}>
              Keep
            </Button>
            <Button colorScheme="blue" onClick={handleReset}>
              Reset
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
});

export default ImageUploader;