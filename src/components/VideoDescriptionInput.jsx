import { Textarea } from "@chakra-ui/react";
import { memo } from 'react';

const VideoDescriptionInput = memo(({setFormData, formData}) => {
  const handleVideoDescriptionChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      videoDescription: e.target.value
    }))
  }
  return (
    <>
      <Textarea
        value={formData.videoDescription}
        onChange={handleVideoDescriptionChange}
        placeholder="Please describe your video!  You are free to write or not to write. 
(e.g. I have succeeded in making the Omega disk completely harmless and effective by the spell of Nolla...)"
        size="sm"
      />
    </>
  )
});

export default VideoDescriptionInput;