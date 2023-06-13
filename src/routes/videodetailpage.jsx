import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import VideoCard from "../components/VideoCard";
import { collectionGroup, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const VideoDetailPage = () => {
  const { videoId } = useParams();
  const [imageDocData, setImageDocData] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      const imagesCollectionGroup = collectionGroup(db, "images");
      const querySnapshot = await getDocs(imagesCollectionGroup);
      const matchingImageDoc = querySnapshot.docs.find((doc) => doc.id === videoId);
      if (matchingImageDoc) {
        setImageDocData(matchingImageDoc.data());
      }
    };
    fetchImage();
  }, [videoId]);


  return (
    <div>
      {videoId}
      { imageDocData && <VideoCard imageDocData={imageDocData} isLinkActive={false}/> }
    </div>
  );
};

export default VideoDetailPage;
