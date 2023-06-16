import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import DetailVideoCard from '../components/DetailVideoCard';
import UserCommentSection from "../components/UserCommetSection";
import { collectionGroup, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { Box, Center } from "@chakra-ui/react";

const VideoDetailPage = () => {
  const { imageId } = useParams();
  const [imageDocData, setImageDocData] = useState(null);

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

  return (
    <Box m="10px">
      <Center>
        <DetailVideoCard imageDocData={imageDocData} />
      </Center>
      <UserCommentSection imageId={imageId}/>
    </Box>
  );
};

export default VideoDetailPage;
