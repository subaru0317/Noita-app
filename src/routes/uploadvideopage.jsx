import { useState } from "react";
import ImageUploader from '../components/ImageUploader';
import DragDrop from '../components/DragDrop';
import SelectedFilePreview from "../components/SelectedFilePreview";
import VideoDescriptionInput from "../components/VideoDescriptionInput";

const UploadVideoPage = () => {
  const [fileSelected, setFileSelected] = useState(null);
  const [additionalInfo, setAdditionalInfo] = useState([]);
  const [videoDescription, setVideoDescription] = useState('');
  return (
    <>
      <SelectedFilePreview setFileSelected={setFileSelected} />
      <VideoDescriptionInput setVideoDescription={setVideoDescription} videoDescription={videoDescription}/>
      <DragDrop setAdditionalInfo={setAdditionalInfo}/>
      <ImageUploader
        fileSelected={fileSelected}
        additionalInfo={additionalInfo}
        videoDescription={videoDescription}
      />
    </>
  );
}

export default UploadVideoPage;