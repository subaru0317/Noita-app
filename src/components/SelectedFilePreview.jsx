import { useState } from "react";
import { Image } from "@chakra-ui/react";

const SelectedFilePreview = ({ handleFileSelected }) => {
  const [previewSrc, setPreviewSrc] = useState("");

  const previewFile = (e) => {
    const file = e.target.files[0];
    handleFileSelected(file);
    const reader = new FileReader();

    reader.addEventListener("load", () => {
      setPreviewSrc(reader.result);
    }, false);

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  return (
    <>
      <input type="file" onChange={previewFile} accept=".gif" />
      <Image src={previewSrc} width="480px" height="270px" />
    </>
  )
}

export default SelectedFilePreview;