import { Input } from "@chakra-ui/react";

const VideoTitleInput = ({ handleVideoTitleInput }) => {
  const handleChange = (e) => {
    handleVideoTitleInput(e.target.value);
  }

  return (
    <Input
      onChange={handleChange}
      placeholder="Enter video title"
      mb={2}
      mt={4}
    />
  );
};

export default VideoTitleInput;