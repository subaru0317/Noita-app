import { Textarea } from "@chakra-ui/react";

export default function VideoDescriptionInput({setVideoDescription, videoDescription}) {
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
}