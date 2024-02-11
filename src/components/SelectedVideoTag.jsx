import { Box } from "@chakra-ui/react";
import VideoTagItem from "./VideoTagItem";
import TagList from "./TagList";

const SelectedVideoTag = ({ setFormData, formData }) => {
  const handleTagClick = (clickedTag) => {
    let newVideoTag = [];

    for (let tag of TagList) {
      if ((formData.videoTag.find(item => item.id === tag.id) && tag.id !== clickedTag.id) || (!formData.videoTag.find(item => item.id === tag.id) && tag.id === clickedTag.id)) {
        newVideoTag.push(tag);
      }
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      videoTag: newVideoTag,
    }))
  };

  return (
    <>
      <Box display="flex" flexDirection="row" flexWrap="wrap">
        {TagList.map((tag, index) => (
          <VideoTagItem
            key={index}
            tagName={tag.name}
            isSelected={!!formData.videoTag.find(item => item.id === tag.id)}
            onClick={handleTagClick}
          />
        ))}
      </Box>
    </>
  );
};

export default SelectedVideoTag;