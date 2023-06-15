import { useState } from "react";
import { Input, Button } from "@chakra-ui/react";
import { auth, db } from "../firebase";
import { addDoc, serverTimestamp, collection, updateDoc } from 'firebase/firestore';

const CommentInputField = ({imageId}) => {
  const [newComment, setNewComment] = useState('');

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const docRef = await addDoc(collection(db, 'comments'), {
      text: newComment,
      imageId,
      username: auth.currentUser.displayName,
      userPhoto: auth.currentUser?.photoURL,
      userid: auth.currentUser.uid,
      timestamp: serverTimestamp()
    });
    setNewComment('');
    await updateDoc(docRef, {
      commentId: docRef.id
    });
  };

  const handleNewCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  return (
    <form onSubmit={handleCommentSubmit}>
      <Input
        placeholder="Write a comment"
        value={newComment}
        onChange={handleNewCommentChange}
        borderRadius="lg" 
        bg="gray.800" 
        color="white"
        mb={2}
      />
      <Button mt={2} type="submit" colorScheme="teal">
        Submit
      </Button>
    </form>
  );
}

export default CommentInputField;