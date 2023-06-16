import { useState } from 'react';
import { Input, Button, Box } from '@chakra-ui/react';
import { db, auth } from "../firebase";
import { addDoc, updateDoc, collection, serverTimestamp} from "firebase/firestore";

const CommentInputField = ({ imageId }) => {
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

    await updateDoc(docRef, {
      commentId: docRef.id
    });

    setNewComment('');
  };


  const handleNewCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  return (
    <Box as="form" onSubmit={handleCommentSubmit}>
      <Input
        value={newComment}
        onChange={handleNewCommentChange}
        placeholder="コメントを入力..."
        mb={2}
      />
      <Button type="submit" colorScheme="blue">
        コメントを送信
      </Button>
    </Box>
  );
};

export default CommentInputField;
