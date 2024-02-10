import { memo } from 'react';
import { Box } from "@chakra-ui/react";
import VideoTagItem from "./VideoTagItem";
import TagList from "./TagList";

const SelectedVideoTag = memo(({ videoTag, setVideoTag }) => {
  const handleTagClick = (clickedTag) => {
    let newVideoTag = [];

    for (let tag of TagList) {
      if ((videoTag.find(item => item.id === tag.id) && tag.id !== clickedTag.id) || (!videoTag.find(item => item.id === tag.id) && tag.id === clickedTag.id)) {
        newVideoTag.push(tag);
      }
    }

    setVideoTag(newVideoTag);
  };

  return (
    <>
      <Box display="flex" flexDirection="row" flexWrap="wrap">
        {TagList.map((tag, index) => (
          <VideoTagItem
            key={index}
            tagName={tag.name}
            isSelected={!!videoTag.find(item => item.id === tag.id)}
            onClick={handleTagClick}
          />
        ))}
      </Box>
    </>
  );
});

export default SelectedVideoTag;