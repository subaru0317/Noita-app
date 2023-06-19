import { useCallback, useState } from 'react';
import { Textarea, Box, IconButton, Tooltip, Kbd, Flex, Center } from '@chakra-ui/react';
import { db, auth } from "../firebase";
import { addDoc, updateDoc, collection, serverTimestamp } from "firebase/firestore";
import { AiOutlineSend } from "react-icons/ai";
import { useAuthState } from 'react-firebase-hooks/auth'

const CommentInputField = ({ imageId }) => {
  const [newComment, setNewComment] = useState('');
  const [showTooltip, setShowTooltip] = useState(false);
  const [user] = useAuthState(auth);

  const handleCommentSubmit = useCallback(async (e) => {
    e.preventDefault();

    if (newComment.trim() !== '') {
      const newCommentCopy = newComment;
      setNewComment('');
      const docRef = await addDoc(collection(db, 'comments'), {
        text: newCommentCopy,
        imageId,
        username: auth.currentUser.displayName,
        userPhoto: auth.currentUser?.photoURL,
        userid: auth.currentUser.uid,
        timestamp: serverTimestamp()
        
      });

      await updateDoc(docRef, {
        commentId: docRef.id
      });

      setShowTooltip(false);
    }
  }, [newComment, imageId]);

  const handleNewCommentChange = useCallback((e) => {
    setNewComment(e.target.value);
    setShowTooltip(e.target.value.trim() !== '');
  }, []);

  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter' && e.shiftKey) {
      handleCommentSubmit(e);
    }
  }, [handleCommentSubmit]);

  const ToolTipMessage = useCallback(() => {
    return (
      <>
        <Flex direction="column" align="center">
          <Kbd fontSize='10px'>Shift</Kbd>
          <Center>+</Center>
          <Kbd fontSize='10px'>Enter</Kbd>
        </Flex>
      </>
    );
  }, []);

  return (
    <Box as="form" onSubmit={handleCommentSubmit} pos="relative" width="100%">
      <Flex direction="row" alignItems="flex-end" spacing="10px">
        <Textarea
          value={newComment}
          onChange={handleNewCommentChange}
          onKeyPress={handleKeyPress}
          placeholder={user ? "Enter comment! Your submitted comments are editable and deletable at any time :)" : "Log in to comment..."}
          mb={2}
          resize="vertical"
          flexGrow={1}
          isDisabled={!user}
          _placeholder={{ color: "white" }}
        />
        <Tooltip 
          hasArrow
          label={<ToolTipMessage />}
          isOpen={showTooltip} 
          bgColor="gray.300"
          color="black"
          placement="top"
          openDelay={500}
          width="43px"
          border="3px solid"
          borderColor="gray.300"
        >
          <IconButton
            icon={<AiOutlineSend />}
            onClick={handleCommentSubmit}
            variant="outline"
            left="7px"
            bottom="8px"
            bgColor={newComment.trim() !== '' ? 'green.500' : undefined}
            isDisabled={!user}
          />
        </Tooltip>
      </Flex>
    </Box>
  );
};

export default CommentInputField;
