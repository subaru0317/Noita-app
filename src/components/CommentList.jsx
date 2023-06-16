import CommentActions from '../components/CommentActions';
import {
  Avatar,
  Box,
  Flex,
  Text,
  Spacer,
  HStack,
} from "@chakra-ui/react";
import { formatDistanceToNow } from 'date-fns';

const CommentList = ({comments}) => {
  return (
    <>
      {comments.map((comment) => (
        <Flex key={comment.id} mb={3} position="relative">
          <Avatar src={comment.userPhoto} size="sm" mt={1}/>
          <Box ml={3} flexGrow={1}>
            <Flex>
              <Box>
                <HStack>
                  <Text fontWeight="bold">{comment.username}</Text>
                  <Text color="gray.400" fontSize="sm">
                    {formatDistanceToNow(comment.timestamp?.toDate() ?? new Date(), { addSuffix: true })}
                  </Text>
                </HStack>
                <Text mt={1} wordBreak="break-word">{comment.text}</Text>
              </Box>
              <Spacer />
              { comment.commentId && <CommentActions userId={comment.userid} commentId={comment.commentId}/> }
            </Flex>
          </Box>
        </Flex>
      ))}
    </>
  );
}


export default CommentList;