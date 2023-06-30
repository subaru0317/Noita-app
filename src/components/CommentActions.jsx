import { Text, ButtonGroup, IconButton, Input, Tooltip, Box, Kbd, Spacer, useDisclosure, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, Button } from "@chakra-ui/react";
import { auth, db } from "../firebase";
import { BiEditAlt, BiTrash } from "react-icons/bi";
import { useState, useEffect, useRef } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";

const CommentActions = ({userId, commentId, commentText, setEditing}) => {
  console.log("CommentActions");
  const [currentUser, setCurrentUser] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleDelete = async () => {
    const commentsRef = collection(db, "comments");
    const commentDoc = doc(commentsRef, commentId);
    await deleteDoc(commentDoc);
    onClose();
  };

  return (
    <Box>
      {userId === currentUser?.uid && (
        <ButtonGroup isAttached>
          <Tooltip label="Edit" openDelay={100} placement="top">
            <IconButton
              icon={<BiEditAlt size='16px'/>}
              colorScheme='ghost'
              aria-label='Edit comment'
              size='xs'
              onClick={handleEdit}
            />
          </Tooltip>
          <Tooltip label="Delete" openDelay={100} placement="top">
            <IconButton
              icon={<BiTrash size='16px' />}
              colorScheme='ghost'
              aria-label='Delete comment'
              size='xs'
              onClick={onOpen}
            />
          </Tooltip>
        </ButtonGroup>
      )}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Comment
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to delete this comment?
              This action cannot be undone.
              <Box 
                bg="gray.100" 
                borderRadius="md" 
                p={2} 
                mt={2}
              >
                {commentText}
              </Box>
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
}

export default CommentActions;
