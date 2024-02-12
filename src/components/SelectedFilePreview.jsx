// SelectedFilePreview.jsx
import { Image } from "@chakra-ui/react";

const SelectedFilePreview = ({ setFormData, formData }) => {
  const previewFile = (e) => {
    const file = e.target.files[0];
    setFormData((state) => ({ ...state, fileSelected: file }))
    const reader = new FileReader();

    reader.addEventListener("load", () => {
      setFormData(prevFormData => ({
        ...prevFormData,
        previewSrc: reader.result
      }))
    }, false);

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  return (
    <>
      <input type="file" onChange={previewFile} accept=".gif" />
      <Image src={formData.previewSrc} width="480px" height="270px" />
    </>
  )
};

export default SelectedFilePreview;