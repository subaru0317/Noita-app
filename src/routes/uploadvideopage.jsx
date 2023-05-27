import { useState } from "react";
import ImageUploader from '../components/ImageUploader';
import DragDrop from '../components/DragDrop';
import SelectedFilePreview from "../components/SelectedFilePreview";

export default function myPage() {
  const [fileSelected, setFileSelected] = useState(null);

  return (
    <>
      <SelectedFilePreview onFileSelected={setFileSelected} />
      <ImageUploader fileSelected={fileSelected}/>
      <DragDrop />
    </>
  );
}