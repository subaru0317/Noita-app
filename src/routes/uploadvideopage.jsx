import { useState } from "react";
import ImageUploader from '../components/ImageUploader';
import EditWand from '../components/EditWand';
import SelectedFilePreview from "../components/SelectedFilePreview";
import VideoDescriptionInput from "../components/VideoDescriptionInput";

const UploadVideoPage = () => {
  const [fileSelected, setFileSelected] = useState(null);
  const [wandSpells, setWandSpells] = useState([]);
  const [videoDescription, setVideoDescription] = useState('');
  console.log("wandSpells: ", wandSpells);
  return (
    <>
      <SelectedFilePreview setFileSelected={setFileSelected} />
      <VideoDescriptionInput
        setVideoDescription={setVideoDescription}
        videoDescription={videoDescription}
      />
      <EditWand wandSpells={wandSpells} setWandSpells={setWandSpells}/>
      <ImageUploader
        fileSelected={fileSelected}
        wandSpells={wandSpells}
        videoDescription={videoDescription}
      />
    </>
  );
}

export default UploadVideoPage;