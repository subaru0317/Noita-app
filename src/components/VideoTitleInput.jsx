import { Input } from "@chakra-ui/react";
import { memo } from 'react';

const VideoTitleInput = memo(({setFormData, formData}) => {
  const handleVideoTitleChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      videoTitle: e.target.value,
    }));
  };

  return (
    <Input
      value={formData.videoTitle}
      onChange={handleVideoTitleChange}
      placeholder="Enter video title"
      mb={2}
      mt={4}
    />
  );
});

export default VideoTitleInput;