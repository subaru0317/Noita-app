import VideoCard from "./VideoCard";
import { Box, IconButton, VStack } from "@chakra-ui/react";
import { BiEditAlt, BiTrash } from "react-icons/bi";

const EditableVideoCard = ({imageDocData}) => {
  console.log("BBB");
  return (
    <Box position="relative" marginBottom="8">
      <VStack spacing={4}>
        <VideoCard imageDocData={imageDocData} isLinkActive={false} />
      </VStack>
      <Box position="absolute" right="0" bottom="-5" marginBottom="5px">
        <IconButton aria-label="Edit video" icon={<BiEditAlt size="1.5em" />} />
        <IconButton aria-label="Delete video" icon={<BiTrash size="1.5em" />} />
      </Box>
    </Box>
  );
}

export default EditableVideoCard;
