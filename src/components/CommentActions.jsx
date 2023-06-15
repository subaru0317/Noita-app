import { ButtonGroup, IconButton, Input, Tooltip, Box, Text } from "@chakra-ui/react";
import { auth, db } from "../firebase";
import { BiEditAlt } from "react-icons/bi";
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";

const CommentActions = ({userId, commentId}) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [comment, setComment] = useState('');

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
  };

  return (
    <Box>
      {userId === currentUser?.uid && (
        <ButtonGroup>
          <Tooltip label="Edit" openDelay={100} placement="top">
            <IconButton
              icon={<BiEditAlt size='16px'/>}
              colorScheme='ghost'
              aria-label='Edit comment'
              size='xs'
              onClick={handleEdit}
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
          <Text fontSize="xs" mt={2}>Shift + Enter to finish editing</Text>
        </>
      ) : (
        <p>{comment}</p>
      )}
    </Box>
  );
}

export default CommentActions;
