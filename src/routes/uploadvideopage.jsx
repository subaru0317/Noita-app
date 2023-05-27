import { useState } from "react";
import ImageUploader from '../components/ImageUploader';
import DragDrop from '../components/DragDrop';
import SelectedFilePreview from "../components/SelectedFilePreview";

export default function myPage() {
  const [fileSelected, setFileSelected] = useState(null);
  const [additionalInfo, setAdditionalInfo] = useState([]);
  return (
    <>
      <SelectedFilePreview setFileSelected={setFileSelected} />
      <DragDrop setAdditionalInfo={setAdditionalInfo}/>
      <ImageUploader fileSelected={fileSelected} additionalInfo={additionalInfo}/>
    </>
  );
}