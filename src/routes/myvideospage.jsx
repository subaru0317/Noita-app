import { Box, Heading } from '@chakra-ui/react';
import MyVideoCardList from '../components/MyVideoCardList';
import SpacingDivider from '../components/SpacingDivider';

const VideoListPage = () => {
  return (
    <>
      <Box mt={5} ml={5}>
        <Heading as='h2' size='xl'> MyVideos </Heading>
      </Box>
      <SpacingDivider />
      <MyVideoCardList />
    </>
  );
}
export default VideoListPage;
