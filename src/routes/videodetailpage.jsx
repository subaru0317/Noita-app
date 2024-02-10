import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import DetailVideoCard from '../components/DetailVideoCard';
import UserCommentSection from "../components/UserCommetSection";
import { collectionGroup, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { Box, Center, Spinner, Text } from "@chakra-ui/react";

const VideoDetailPage = () => {
  const { imageId } = useParams();
  const [imageDocData, setImageDocData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchImage = async () => {
    const imageQuery = query(collectionGroup(db, 'images'), where('fileId', '==', imageId));

    try {
      const querySnapshot = await getDocs(imageQuery);
      if (!querySnapshot.empty) {
        const matchingImageDoc = querySnapshot.docs[0];
        setImageDocData(matchingImageDoc.data());
      } else {
        setError("No matching image was found.");
      }
    } catch (error) {
      console.error("Failed to retrieve the image.", error);
      setError("Failed to retrieve the image. Please retry.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImage();
  }, [imageId]);

  return (
    <Box m="10px">
      {loading ? (
        <Center>
          <Spinner size="lg" />
        </Center>
      ) : error ? (
        <Center>
          <Text color="red">{error}</Text>
        </Center>
      ) : (
        <>
          <Center>
            <DetailVideoCard imageDocData={imageDocData} />
          </Center>
          <UserCommentSection imageId={imageId} />
        </>
      )}
    </Box>
  );
};

export default VideoDetailPage;
