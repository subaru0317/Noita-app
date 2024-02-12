import CommentActions from './CommentActions';
import {
  Avatar,
  Box,
  Flex,
  Text,
  Spacer,
  HStack,
  Kbd,
  Textarea
} from "@chakra-ui/react";
import { useState, memo } from 'react';
import { formatDistanceToNow } from 'date-fns';

const CommentItem = memo(({comment: originalComment}) => {
  const [editing, setEditing] = useState(false);
  const [comment, setComment] = useState(originalComment);

  const handleInputChange = (event) => {
    setComment({...comment, text: event.target.value});
  };

  const handleInputKeyDown = (event) => {
    if(event.key === 'Enter' && event.shiftKey) {
      event.preventDefault();
      setEditing(false);
      // here put code to save comment.text into database
    }
    if(event.key === 'Escape') {
      event.preventDefault();
      setEditing(false);
      // here put code to reload comment.text from database
    }
  };

  return (
    <Flex mb={3} position="relative">
      <Avatar src={comment.userIcon} size="sm" mt={1}/>
      <Box ml={3} flexGrow={1}>
        <Flex>
          <Box>
            <HStack>
              <Text fontWeight="bold">{comment.userName}</Text>
              <Text color="gray.400" fontSize="sm">
                {formatDistanceToNow(comment.timestamp?.toDate() ?? new Date(), { addSuffix: true })}
              </Text>
            </HStack>
            {editing ? (
              <>
                <Textarea
                  value={comment.text}
                  onChange={handleInputChange}
                  onKeyDown={handleInputKeyDown}
                  width="720px"
                />
                <span>
                  <Kbd color='black' fontSize='xs'>Shift</Kbd> + <Kbd color='black' fontSize='xs'>Enter</Kbd> : Save 
                  <Spacer />
                  <Kbd color='black' fontSize='xs'>Esc</Kbd> : Cancel
                </span>
              </>
            ) : (
              <>
                <Text mt={1} wordBreak="break-word">{comment.text}</Text>
              </>
            )}
          </Box>
          <Spacer />
            {comment.commentId && 
            !editing && 
            <CommentActions
              userId={comment.userId}
              commentId={comment.commentId}
              commentText={comment.text}
              setEditing={setEditing}
            />}
        </Flex>
      </Box>
    </Flex>
  );
}, (prevProps, nextProps) => prevProps.comment.id === nextProps.comment.id && prevProps.comment.text === nextProps.comment.text);

const CommentList = ({comments}) => {
  return (
    <>
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </>
  );
}

export default CommentList;
