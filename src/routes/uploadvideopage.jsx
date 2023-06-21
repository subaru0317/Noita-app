import { useState } from "react";
import { Text, Heading } from "@chakra-ui/react";
import ImageUploader from '../components/ImageUploader';
import EditWand from '../components/EditWand';
import SelectedFilePreview from "../components/SelectedFilePreview";
import VideoDescriptionInput from "../components/VideoDescriptionInput";
import VideoTitleInput from "../components/VideoTitleInput";
import SpacingDivider from "../components/SpacingDivider";
import SelectedVideoTag from "../components/SelectedVideoTag";

const UploadVideoPage = () => {
  const [fileSelected, setFileSelected] = useState(null);
  const [previewSrc, setPreviewSrc] = useState(null);
  const [videoTitle, setVideoTitle] = useState('');
  const [videoDescription, setVideoDescription] = useState('');
  const [wandSpells, setWandSpells] = useState([]);
  // const [perks, setPerks] = useState([]);
  const [videoTag, setVideoTag] = useState([]);
  console.log("videoTag: ", videoTag);
  return (
    <>
      <Heading as='h2' size='xl'> Upload Video </Heading>
      <SpacingDivider />
      <Heading as='h4' size='md'> Your ScreenShot </Heading>
      <Text>
        The screenshot is under <strong>UserProfile%\AppData\LocalLow\Nolla_Games_Noita\save_rec\screenshots_animated</strong>. <br />
        (In Windows, %UserProfile% would be "<strong>C:\Users\username</strong>"etc.)
      </Text>
      <SelectedFilePreview setFileSelected={setFileSelected} setPreviewSrc={setPreviewSrc} previewSrc={previewSrc} />
      <Heading as='h4' size='md'> Title & Description </Heading>
      <VideoTitleInput
        setVideoTitle={setVideoTitle}
        videoTitle={videoTitle}
      />
      <VideoDescriptionInput
        setVideoDescription={setVideoDescription}
        videoDescription={videoDescription}
      />
      <Heading as='h4' size='md'> Tags </Heading>
      <SelectedVideoTag videoTag={videoTag} setVideoTag={setVideoTag} />
      <Heading as='h4' size='md'> Edit Wand </Heading>
      <Text>
        1. Click on a spell to add it to the box below. <br />
        2. Change the order of added spells by dragging them around. <br />
        3. Press the "X" button in the top right to remove a spell. <br />
      </Text>
      <EditWand wandSpells={wandSpells} setWandSpells={setWandSpells}/>
      {/* <EditWand perks={perks} setPerks={setPerks} /> */}
      <ImageUploader
        fileSelected={fileSelected}
        wandSpells={wandSpells}
        videoDescription={videoDescription}
        videoTitle={videoTitle}
        videoTag={videoTag}
        setFileSelected={setFileSelected}
        setWandSpells={setWandSpells}
        setVideoDescription={setVideoDescription}
        setVideoTitle={setVideoTitle}
        setVideoTag={setVideoTag}
        setPreviewSrc={setPreviewSrc}
      />
    </>
  );
}

export default UploadVideoPage;
