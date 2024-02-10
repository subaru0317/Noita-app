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
        placeholder="Please describe your video!  You are free to write or not to write. 
(e.g. I have succeeded in making the Omega disk completely harmless and effective by the spell of Nolla...)"
        size="sm"
      />
    </>
  )
});

export default VideoDescriptionInput;