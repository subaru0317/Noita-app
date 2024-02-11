// import { Image } from "@chakra-ui/react";

// const SelectedFilePreview = ({ setFileSelected, setPreviewSrc, previewSrc }) => {
//   const previewFile = (e) => {
//     const file = e.target.files[0];
//     setFileSelected(file);
//     const reader = new FileReader();

//     reader.addEventListener("load", () => {
//       setPreviewSrc(reader.result);
//     }, false);

//     if (file) {
//       reader.readAsDataURL(file);
//     }
//   }

//   return (
//     <>
//       <input type="file" onChange={previewFile} accept=".gif" />
//       <Image src={previewSrc} width="480px" height="270px"/>
      
//     </>
//   )
// };

// export default SelectedFilePreview;


import { Image } from "@chakra-ui/react";

// const SelectedFilePreview = ({ setFileSelected, setPreviewSrc, previewSrc }) => {
const SelectedFilePreview = ({ setFormData, formData }) => {
  const previewFile = (e) => {
    const file = e.target.files[0];
    setFormData((state) => ({...state, fileSelected: file}))
    // setFileSelected(file);
    const reader = new FileReader();

    reader.addEventListener("load", () => {
      // setPreviewSrc(reader.result);
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
      {/* <Image src={previewSrc} width="480px" height="270px"/> */}
      <Image src={formData.previewSrc} width="480px" height="270px"/>
    </>
  )
};

export default SelectedFilePreview;