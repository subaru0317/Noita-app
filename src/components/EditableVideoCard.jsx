import React, { useState } from 'react';
import VideoCard from "./VideoCard";
import { Box, IconButton, VStack, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button } from "@chakra-ui/react";
import { BiEditAlt, BiTrash } from "react-icons/bi";


const EditableVideoCard = ({imageDocData, onDelete}) => {
  const [isOpen, setIsOpen] = useState(false)

  const onClose = () => setIsOpen(false)
  // const handleDelete = () => {
  //   onDelete(imageDocData);
  //   setIsOpen(false);
  // }

    const handleDelete = async (imageDocData) => {
    const userId = auth.currentUser.uid;
    try {
      const fileRef = ref(storage, imageDocData.filePath);
      await deleteObject(fileRef);
      console.log("File successfully deleted from Firebase Storage!");


      const likedByQuery = query(collection(db, 'users', userId, 'images', imageDocData.fileId, 'likedBy'));
      const likedBySnapshot = await getDocs(likedByQuery);

      const batch = writeBatch(db); // Use batch to perform multiple operations

      // For each user that liked the image, delete the image from their 'userLikedImages' collection
      likedBySnapshot.docs.forEach((docSnapshot) => {
        const userLikedImageRef = doc(db, 'users', docSnapshot.id, 'userLikedImages', imageDocData.fileId);
        batch.delete(userLikedImageRef);
      });

      // Finally, delete the documents from the 'likedBy' subcollection
      likedBySnapshot.docs.forEach((docSnapshot) => {
        batch.delete(docSnapshot.ref);
      });

      // Commit the batch
      await batch.commit();

      const docRef = doc(db, 'users', userId, 'images', imageDocData.fileId);
      await deleteDoc(docRef);
      console.log("Document successfully deleted!");

      // Update the state to remove the deleted card
      const newImageDocDatas = imageDocDatas.filter(docData => docData.fileId !== imageDocData.fileId);
      setImageDocDatas(newImageDocDatas);

      // Show a success toast
      toast({
        title: "Success",
        description: "Deleted!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom-right"
      });
    } catch (error) {
      console.error("Error removing document: ", error);

      // Optionally, you could show an error toast if the deletion failed
      toast({
        title: "Error",
        description: "Failed to delete.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-right"
      });
    }
  }

  return (
    <Box position="relative" marginBottom="6">
      <VStack spacing={4}>
        <VideoCard imageDocData={imageDocData} />
      </VStack>
      <Box position="absolute" right="0" bottom="-5" marginBottom="5px">
        <IconButton aria-label="Edit video" icon={<BiEditAlt size="1.5em" />} />
        <IconButton aria-label="Delete video" icon={<BiTrash size="1.5em" />} onClick={() => setIsOpen(true)}/>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete video?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            This operation cannot be undone. Do you really want to delete this?
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button variant="ghost" colorScheme="red" onClick={handleDelete}>Delete</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default EditableVideoCard;
