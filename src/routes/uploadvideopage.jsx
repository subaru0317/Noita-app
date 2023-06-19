import { useState } from "react";
import { Text } from "@chakra-ui/react";
import ImageUploader from '../components/ImageUploader';
import EditWand from '../components/EditWand';
import SelectedFilePreview from "../components/SelectedFilePreview";
import VideoDescriptionInput from "../components/VideoDescriptionInput";
import VideoTitleInput from "../components/VideoTitleInput";

const UploadVideoPage = () => {
  const [fileSelected, setFileSelected] = useState(null);
  const [videoTitle, setVideoTitle] = useState('');
  const [videoDescription, setVideoDescription] = useState('');
  const [wandSpells, setWandSpells] = useState([]);
  console.log("wandSpells: ", wandSpells);
  return (
    <>
      <Text>
        The screenshot is under <strong>UserProfile%\AppData\LocalLow\Nolla_Games_Noita\save_rec\screenshots_animated</strong>. <br />
        (In Windows, %UserProfile% would be "<strong>C:\Users\username</strong>"etc.)
      </Text>
      <SelectedFilePreview setFileSelected={setFileSelected} />
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
      />
    </>
  );
}

export default UploadVideoPage;
