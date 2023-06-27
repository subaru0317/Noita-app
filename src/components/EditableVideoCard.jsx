import VideoCard from "./VideoCard";
import { Box, IconButton, VStack } from "@chakra-ui/react";
import { BiEditAlt, BiTrash } from "react-icons/bi";


const EditableVideoCard = ({imageDocData, onDelete}) => {
  return (
    <Box position="relative" marginBottom="6">
      <VStack spacing={4}>
        <VideoCard imageDocData={imageDocData} />
      </VStack>
      <Box position="absolute" right="0" bottom="-5" marginBottom="5px">
        <IconButton aria-label="Edit video" icon={<BiEditAlt size="1.5em" />} />
        <IconButton aria-label="Delete video" icon={<BiTrash size="1.5em" />} onClick={() => onDelete(imageDocData)}/>
      </Box>
    </Box>
  );
}

export default EditableVideoCard;
