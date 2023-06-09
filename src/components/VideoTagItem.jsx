import { memo } from "react";
import { Tag, TagLabel, TagLeftIcon, Tooltip, Box } from "@chakra-ui/react";

const VideoTagItem = memo(({ tag, isSelected = false, onClick = () => {}, withTooltip = true }) => {
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
