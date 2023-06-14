import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import VideoCard from '../components/VideoCard';
import { collection, collectionGroup, getDocs, onSnapshot, query, where, addDoc, orderBy, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { Flex, Box, Heading, Center, Input, Button, VStack } from '@chakra-ui/react';

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
    setNewComment('');
    await addDoc(collection(db, 'comments'), {
      text: newComment,
      imageId,
      timestamp: serverTimestamp(),
    });
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
          <Box key={comment.id} bg="gray.200" p={4} rounded="md">
            {comment.text}
          </Box>
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
