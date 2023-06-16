import { ButtonGroup, IconButton, Input, Tooltip, Box, Text, Kbd, Spacer } from "@chakra-ui/react";
import { auth, db } from "../firebase";
import { BiEditAlt } from "react-icons/bi";
import { BiTrash } from "react-icons/bi";
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";

const CommentActions = ({userId, commentId}) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [comment, setComment] = useState('');
  const [originalComment, setOriginalComment] = useState('');

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
              onClick={handleDelete}
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
    </Box>
  );
}

export default CommentActions;
