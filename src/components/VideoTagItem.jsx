import { memo } from "react";
import { Tag, TagLabel, TagLeftIcon, Tooltip, Box } from "@chakra-ui/react";
import TagList from "./TagList";

const VideoTagItem = memo(({ tagName, isSelected = false, onClick = () => {}, withTooltip = true }) => {
  const findTagbyName = (name) => {
    return TagList.find(tag => tag.name === name);
  }
  const tag = findTagbyName(tagName);
  const tagItem = (
    <Tag
      size="md"
      borderRadius="full"
      bg={isSelected ? "#595959" : "gray.800"}
      borderColor={isSelected ? "blue.500" : "gray.800"}
      borderWidth="3px"
      color="white"
      m={1}
      cursor="pointer"
      onClick={() => onClick(tag)}
    >
      <TagLeftIcon boxSize="12px" as="img" src={tag.path} />
      <Box as="span" lineHeight="tall" paddingY="1px">
        <TagLabel>{tag.name}</TagLabel>
      </Box>
    </Tag>
  );

  return withTooltip ? (
    <Tooltip label={tag.description} fontSize="sm">
      {tagItem}
    </Tooltip>
  ) : (
    tagItem
  );
});

export default VideoTagItem;
