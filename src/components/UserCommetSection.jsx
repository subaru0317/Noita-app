import { useState, useEffect } from "react";
import { collectionGroup, onSnapshot, query, where, orderBy } from 'firebase/firestore';
import { db } from "../firebase";
import { Flex, Heading } from "@chakra-ui/react";
import CommentInputField from "./CommetInputField";
import CommentList from "./CommentList";

const UserCommentSection = ({imageId}) => {
  console.log("UserCommentSection");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const commentsCollectionGroup = collectionGroup(db, 'comments');
    const q = query(
      commentsCollectionGroup,
      where('imageId', '==', imageId),
      orderBy('timestamp', 'asc')
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const fetchedComments = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setComments(fetchedComments);
    });

    return () => unsubscribe();
  }, [imageId]);

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