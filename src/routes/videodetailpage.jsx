import { useParams } from "react-router-dom";

const VideoDetailPage = () => {
  const { videoId } = useParams();
  return (
    <h1>VideoID: {videoId}</h1>
  );
}

export default VideoDetailPage;