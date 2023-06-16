import { ButtonGroup, IconButton, Input, Tooltip, Box, Kbd, Spacer, useDisclosure, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, Button } from "@chakra-ui/react";
import { auth, db } from "../firebase";
import { BiEditAlt, BiTrash } from "react-icons/bi";
import { useState, useEffect, useRef } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";

const CommentActions = ({userId, commentId}) => {
  console.log("CommentActions");
  const [currentUser, setCurrentUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [comment, setComment] = useState('');
  const [originalComment, setOriginalComment] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    // Fetch comment from Firestore
    const fetchComment = async () => {
      const commentsRef = collection(db, "comments");
      const commentDoc = doc(commentsRef, commentId);
      const commentSnapshot = await getDoc(commentDoc);
      if (commentSnapshot.exists()) {
        setComment(commentSnapshot.data().text);
        setOriginalComment(commentSnapshot.data().text);
      } else {
        console.log('No such document!');
      }
    }

    fetchComment();

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [commentId]);

  const handleEdit = () => {
    setEditing(!editing);
  };

  const handleDelete = async () => {
    const commentsRef = collection(db, "comments");
    const commentDoc = doc(commentsRef, commentId);
    await deleteDoc(commentDoc);
    onClose();
  };

  const handleInputChange = (event) => {
    setComment(event.target.value);
  };

  const handleInputKeyDown = async (event) => {
    if(event.key === 'Enter' && event.shiftKey) {
      event.preventDefault();
      setEditing(false);
      const commentsRef = collection(db, "comments");
      const commentDoc = doc(commentsRef, commentId);
      await updateDoc(commentDoc, { text: comment });
    }
    if(event.key === 'Escape') {
      event.preventDefault();
      setEditing(false);
      setComment(originalComment);
    }
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
      {editing ? (
          <>
            <Input
              value={comment}
              onChange={handleInputChange}
              onKeyDown={handleInputKeyDown}
            />
            <span>
              <Kbd color='black' fontSize='xs'>Shift</Kbd> + <Kbd color='black' fontSize='xs'>Enter</Kbd> : Save 
              <Spacer />
              <Kbd color='black' fontSize='xs'>Esc</Kbd> : Cancel
            </span>
          </>
        ) : (
          <></>
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
              <Box mt={3} p={2} bg="gray.100" borderRadius="md">
                {comment}
              </Box>
              This action cannot be undone.
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
