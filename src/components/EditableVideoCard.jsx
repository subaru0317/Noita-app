import React, { useState } from 'react';
import VideoCard from "./VideoCard";
import { Box, IconButton, VStack, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button } from "@chakra-ui/react";
import { BiEditAlt, BiTrash } from "react-icons/bi";
// import { auth } from "../firebase"

const EditableVideoCard = ({imageDocData, onDelete}) => {
  const [isOpen, setIsOpen] = useState(false)

  const onClose = () => setIsOpen(false)
  const handleDelete = () => {
    onDelete(imageDocData);
    setIsOpen(false);
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
