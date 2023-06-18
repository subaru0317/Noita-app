import { Input } from "@chakra-ui/react";

const VideoTitleInput = ({setVideoTitle, videoTitle}) => {
  return (
    <Input
      value={videoTitle}
      onChange={(e) => setVideoTitle(e.target.value)}
      placeholder="Enter video title"
      mb={2} 
      mt={4}
    />
  );
}

export default VideoTitleInput;