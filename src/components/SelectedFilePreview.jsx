import { Image } from "@chakra-ui/react";
import { useState } from "react";

export default function SelectedFilePreview({ onFileSelected }) {
  const [previewSrc, setPreviewSrc] = useState(null);
  const previewFile = (e) => {
    const file = e.target.files[0];
    onFileSelected(file);
    const reader = new FileReader();

    reader.addEventListener("load", function () {
      // Convert image file to a base64 string
      setPreviewSrc(reader.result);
    }, false);

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  return (
    <>
      <input type="file" onChange={previewFile} />
      <Image src={previewSrc} width="480px" height="270px"/>
    </>
  )
}