import { memo } from "react";
import { Tag, TagLabel, TagLeftIcon, Tooltip } from "@chakra-ui/react";


const TagItem = memo(({ tag, isSelected, onClick }) => (
  <Tooltip label={tag.description} fontSize="md">
    <Tag
      size="sm"
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
      <TagLabel>{tag.name}</TagLabel>
    </Tag>
  </Tooltip>
));

export default TagItem;