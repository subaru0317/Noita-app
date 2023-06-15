import { useState } from "react";
import { Flex, Heading } from "@chakra-ui/react";
import CommentInputField from "./CommetInputField";
import CommentList from "./CommentList";

const UserCommentSection = ({comments, imageId}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState('');

  const handleCommentEdit = (comment) => {
    setIsEditing(true);
    setEditedComment(comment.text);
  };

  const handleEditChange = (e) => {
    setEditedComment(e.target.value);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const commentRef = doc(db, 'comments', commentId); // commentIdを適切に提供する
    await updateDoc(commentRef, {
      text: editedComment,
      isEdited: true,
      timestamp: serverTimestamp()
    });
    setEditedComment('');

    setIsEditing(false);
  };

  return (
    <Flex direction="column" align="start" bg="gray.700" p={4} borderRadius="md" color="white" maxW="800px" mx="auto" mt={4}>
      <Heading as="h3" size="md" mb={4} color="white">
        Comments
      </Heading>
      <CommentList comments={comments}/>
      <CommentInputField imageId={imageId}/>
    </Flex>
  );
}

export default UserCommentSection;