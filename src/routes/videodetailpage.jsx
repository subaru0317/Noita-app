import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import DetailVideoCard from '../components/DetailVideoCard';
import UserCommentSection from "../components/UserCommetSection";
import { collectionGroup, getDocs, onSnapshot, query, where, addDoc, orderBy, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { Box, Center } from "@chakra-ui/react";

const VideoDetailPage = () => {
  const { imageId } = useParams();
  const [imageDocData, setImageDocData] = useState(null);
  const [comments, setComments] = useState([]);

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

  return (
    <Box mt="10px">
      <Center>
        <DetailVideoCard imageDocData={imageDocData} />
      </Center>
      <UserCommentSection comments={comments} imageId={imageId}/>
    </Box>
  );
};

export default VideoDetailPage;
