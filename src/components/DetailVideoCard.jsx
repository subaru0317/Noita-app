import { memo } from "react";
import { Flex, Box, Heading } from "@chakra-ui/react";
import VideoCard from '../components/VideoCard';

const DetailVideoCard = memo(({imageDocData}) => {
  return (
    <Flex direction={{ base: "column", md: "row" }} align="start" justify="space-between" maxW="800px">
      {imageDocData && <VideoCard imageDocData={imageDocData} isLinkActive={false} />}
      <Box ml={{ md: 6 }}>
        <Heading as="h3" size="md" mb={4}>
          Author's Comment
        </Heading>
        {imageDocData?.description}
      </Box>
    </Flex>
  );
});

export default DetailVideoCard;