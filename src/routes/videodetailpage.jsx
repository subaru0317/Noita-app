import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import VideoCard from '../components/VideoCard';
import { collection, collectionGroup, getDocs, onSnapshot, query, where, addDoc, orderBy, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../firebase';
import {
  Avatar,
  Box,
  Flex,
  Text,
  VStack,
  Heading,
  Input,
  Button,
  Spacer,
  HStack,
  Center
} from "@chakra-ui/react";
import { formatDistanceToNow } from 'date-fns';

const VideoDetailPage = () => {
  const { imageId } = useParams();
  const [imageDocData, setImageDocData] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const fetchImage = async () => {
      const imagesCollectionGroup = collectionGroup(db, 'images');
      const querySnapshot = await getDocs(imagesCollectionGroup);
      const matchingImageDoc = querySnapshot.docs.find((doc) => doc.id === imageId);
      if (matchingImageDoc) {
        setImageDocData(matchingImageDoc.data());
      }
    };
    fetchImage();
  }, [imageId]);

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

  const handleNewCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, 'comments'), {
      text: newComment,
      imageId,
      username: auth.currentUser.displayName,
      userPhoto: auth.currentUser?.photoURL,
      timestamp: serverTimestamp()
    });
    setNewComment('');
  };

  return (
    <Box mt="10px">
      <Center>
        <Flex direction={{ base: "column", md: "row" }} align="start" justify="space-between" maxW="800px">
          {imageDocData && <VideoCard imageDocData={imageDocData} isLinkActive={false} />}
          <Box ml={{ md: 6 }}>
            <Heading as="h3" size="md" mb={4}>
              Author's Comment
            </Heading>
            {imageDocData?.description}
          </Box>
        </Flex>
      </Center>
      <VStack spacing={4} maxW="800px" mx="auto" mt={4}>
        <Heading as="h3" size="md">
          Comments
        </Heading>
        {comments.map((comment) => (
          <HStack key={comment.id} spacing={4} w="full">
            <Avatar src={comment.userPhoto} /> 
            <VStack align="start" spacing={1} w="full">
              <Flex w="full">
                <Text fontWeight="bold">{comment.username}</Text> 
                <Spacer />
                <Text fontSize="sm" color="gray.500">
                  {comment.timestamp && formatDistanceToNow(comment.timestamp?.toDate(), { addSuffix: true })}
                </Text>
              </Flex>
              <Box bg="gray.100" p={2} borderRadius="md" w="full">
                {comment.text}
              </Box>
            </VStack>
          </HStack>
        ))}
        <form onSubmit={handleCommentSubmit}>
          <Input
            placeholder="Write a comment"
            value={newComment}
            onChange={handleNewCommentChange}
          />
          <Button mt={2} type="submit">
            Submit
          </Button>
        </form>
      </VStack>
    </Box>
  );
};

export default VideoDetailPage;
