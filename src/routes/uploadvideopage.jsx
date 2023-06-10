import { useState } from "react";
import ImageUploader from '../components/ImageUploader';
import EditWand from '../components/EditWand';
import SelectedFilePreview from "../components/SelectedFilePreview";
import VideoDescriptionInput from "../components/VideoDescriptionInput";

const UploadVideoPage = () => {
  const [fileSelected, setFileSelected] = useState(null);
  const [wandSpellsInfo, setWandSpellsInfo] = useState([]);
  const [videoDescription, setVideoDescription] = useState('');
  console.log("wandSpellsInfo: ", wandSpellsInfo);
  return (
    <>
      <SelectedFilePreview setFileSelected={setFileSelected} />
      <VideoDescriptionInput
        setVideoDescription={setVideoDescription}
        videoDescription={videoDescription}
      />
      <EditWand setWandSpellsInfo={setWandSpellsInfo}/>
      <ImageUploader
        fileSelected={fileSelected}
        wandSpellsInfo={wandSpellsInfo}
        videoDescription={videoDescription}
      />
    </>
  );
}

export default UploadVideoPage;