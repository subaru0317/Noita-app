import { Box, Heading } from '@chakra-ui/react';
import FavoriteVideoCardList from '../components/FavoriteVideoCardList';
import SpacingDivider from '../components/SpacingDivider';

const VideoListPage = () => {
  return (
    <>
      <Box mt={5} ml={5}>
        <Heading as='h2' size='xl'> Favorite </Heading>
      </Box>
      <SpacingDivider />
      <FavoriteVideoCardList />
    </>
  );
}
export default VideoListPage;
