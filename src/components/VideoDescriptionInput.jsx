import { Textarea } from "@chakra-ui/react";

const VideoDescriptionInput = ({ handleVideoDescriptionInput }) => {
  const handleChange = (e) => {
    handleVideoDescriptionInput(e.target.value)
  }
  return (
    <>
      <Textarea
        onChange={handleChange}
        placeholder="Please describe your video!  You are free to write or not to write. 
(e.g. I have succeeded in making the Omega disk completely harmless and effective by the spell of Nolla...)"
        size="sm"
      />
    </>
  )
};

export default VideoDescriptionInput;