import { Flex, Heading } from "@chakra-ui/react";
import CommentInputField from "./CommetInputField";
import CommentLists from "./CommentLists";

const UserCommentSection = ({comments, imageId}) => {
  return (
    <Flex direction="column" align="start" bg="gray.700" p={4} borderRadius="md" color="white" maxW="800px" mx="auto" mt={4}>
      <Heading as="h3" size="md" mb={4} color="white">
        Comments
      </Heading>
      <CommentLists comments={comments}/>
      <CommentInputField imageId={imageId}/>
    </Flex>
  );
}

export default UserCommentSection;