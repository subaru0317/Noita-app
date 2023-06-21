import { useState } from "react";
import { Text, Heading } from "@chakra-ui/react";
import ImageUploader from '../components/ImageUploader';
import EditWand from '../components/EditWand';
import SelectedFilePreview from "../components/SelectedFilePreview";
import VideoDescriptionInput from "../components/VideoDescriptionInput";
import VideoTitleInput from "../components/VideoTitleInput";
import SpacingDivider from "../components/SpacingDivider";

const UploadVideoPage = () => {
  const [fileSelected, setFileSelected] = useState(null);
  const [videoTitle, setVideoTitle] = useState('');
  const [videoDescription, setVideoDescription] = useState('');
  const [wandSpells, setWandSpells] = useState([]);
  const [previewSrc, setPreviewSrc] = useState(null);
  console.log("wandSpells: ", wandSpells);
  return (
    <>
      <Heading as='h2' size='xl'>
        Upload Video
      </Heading>
      <SpacingDivider />
      <Text>
        The screenshot is under <strong>UserProfile%\AppData\LocalLow\Nolla_Games_Noita\save_rec\screenshots_animated</strong>. <br />
        (In Windows, %UserProfile% would be "<strong>C:\Users\username</strong>"etc.)
      </Text>
      <SelectedFilePreview setFileSelected={setFileSelected} setPreviewSrc={setPreviewSrc} previewSrc={previewSrc} />
      <VideoTitleInput
        setVideoTitle={setVideoTitle}
        videoTitle={videoTitle}
      />
      <VideoDescriptionInput
        setVideoDescription={setVideoDescription}
        videoDescription={videoDescription}
      />
      <Text>
        1. Click on a spell to add it to the box below. <br />
        2. Change the order of added spells by dragging them around. <br />
        3. Press the "X" button in the top right to remove a spell. <br />
      </Text>
      <EditWand wandSpells={wandSpells} setWandSpells={setWandSpells}/>
      <ImageUploader
        fileSelected={fileSelected}
        wandSpells={wandSpells}
        videoDescription={videoDescription}
        videoTitle={videoTitle}
        setFileSelected={setFileSelected}
        setWandSpells={setWandSpells}
        setVideoDescription={setVideoDescription}
        setVideoTitle={setVideoTitle}
        setPreviewSrc={setPreviewSrc}
      />
    </>
  );
}

export default UploadVideoPage;
