import { Box } from "@chakra-ui/react";
import VideoTagItem from "./VideoTagItem";
import TagList from "./TagList";

const SelectedVideoTag = ({ videoTag, handleVideoTagSelect }) => {
  const handleTagClick = (clickedTag) => {
    let newVideoTag = [];

    for (let tag of TagList) {
      if ((videoTag.find(item => item.id === tag.id) && tag.id !== clickedTag.id) || (!videoTag.find(item => item.id === tag.id) && tag.id === clickedTag.id)) {
        newVideoTag.push(tag);
      }
    }

    handleVideoTagSelect(newVideoTag);
  };

  return (
    <>
      <Box display="flex" flexDirection="row" flexWrap="wrap">
        {TagList.map((tag, index) => (
          <VideoTagItem
            key={index}
            tagName={tag.name}
            isSelected={!!videoTag.find(item => item.id === tag.id)}
            onClick={() => handleTagClick(tag)}
          />
        ))}
      </Box>
    </>
  );
};

export default SelectedVideoTag;