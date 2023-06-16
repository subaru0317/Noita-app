import { useState } from 'react';
import { Textarea, Box, IconButton, Tooltip, Kbd, Flex, Center } from '@chakra-ui/react';
import { db, auth } from "../firebase";
import { addDoc, updateDoc, collection, serverTimestamp } from "firebase/firestore";
import { AiOutlineSend } from "react-icons/ai";

const CommentInputField = ({ imageId }) => {
  const [newComment, setNewComment] = useState('');
  const [showTooltip, setShowTooltip] = useState(false);

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
    setShowTooltip(e.target.value !== '');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.shiftKey) {
      handleCommentSubmit(e);
    }
  };

  const ToolTipMessage = () => {
    return (
      <>
        <Flex direction="column" align="center">
          <Kbd fontSize='10px'>Shift</Kbd>
          <Center>+</Center>
          <Kbd fontSize='10px'>Enter</Kbd>
        </Flex>
      </>
    );
  };

  return (
    <Box as="form" onSubmit={handleCommentSubmit} pos="relative">
      <Textarea
        value={newComment}
        onChange={handleNewCommentChange}
        onKeyPress={handleKeyPress}
        placeholder="Enter comment..."
        mb={2}
        resize="vertical"
        width="730px"  // Set the width of the Textarea
      />
      <Box pos="absolute" right="-45px" bottom="8px">
        <Tooltip 
          hasArrow
          label={<ToolTipMessage />}
          isOpen={showTooltip} 
          bgColor="white"
          color="black"
          placement="top"
          openDelay={500}
          width="43px"
          border="3px solid"
          borderColor="white"
        >
          <IconButton
            icon={<AiOutlineSend />}
            onClick={handleCommentSubmit}
            variant="outline"
            left="2px"
          />
        </Tooltip>
      </Box>
    </Box>
  );
};

export default CommentInputField;
