import { memo } from "react";
import { Textarea } from "@chakra-ui/react";

const VideoDescriptionInput = memo(({setVideoDescription, videoDescription}) => {
  const handleInputChange = (e) => {
    setVideoDescription(e.target.value);
  }
  return (
    <>
      <Textarea
        value={videoDescription}
        onChange={handleInputChange}
        placeholder="Please describe your video!"
        size="sm"
      />
    </>
  )
});

export default VideoDescriptionInput;