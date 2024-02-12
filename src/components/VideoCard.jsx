import { useEffect, useState, useMemo, memo } from 'react';
import { Link } from 'react-router-dom';
import { Box, Flex, Text, Wrap, WrapItem } from '@chakra-ui/react';
import { auth, storage } from '../firebase';
import { ref, getDownloadURL } from 'firebase/storage';
import { onAuthStateChanged } from 'firebase/auth';
import LikeButton from './LikeButton';
import SpellIcon from './SpellIcon';
import VideoTagItem from './VideoTagItem';

const VideoCard = memo(({ imageDocData, isLinkActive = true }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);
  const hoverAndClickStyles = isLinkActive
    ? {
      transition: 'transform 0.3s, box-shadow 0.3s',
      _hover: {
        transform: 'scale(1.05)',
        boxShadow: '0 0 10px #00BFFF',
      },
    }
    : {};
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const videoRef = ref(storage, imageDocData.filePath);

    getDownloadURL(videoRef)
      .then((url) => {
        setVideoUrl(url);
      })
      .catch((error) => {
        console.error('動画のダウンロードに失敗しました．', error);
      });
  }, [imageDocData.filePath]);

  const videoDetailUrl = useMemo(() => `/list/${imageDocData.fileId}`, [imageDocData.fileId]);
  const createDate = imageDocData.created_at.toDate().toLocaleDateString();
  const cardContent = (
    <Box minW="382px" maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" mb={6} {...hoverAndClickStyles}>
      {videoUrl ? (
        <video src={videoUrl} alt="Video description" controls loop autoPlay muted />
      ) : (
        <p>Loading video...</p>
      )}
      <Box p="6">
        <Wrap spacing={0} justify="start">
          <Text as="b">{imageDocData.videoTitle}</Text>
        </Wrap>
        <Wrap spacing={0} justify="start">
          {imageDocData.wandSpells.map((spellName, index) => (
            <WrapItem key={index} mb="3px">
              <SpellIcon spellName={spellName} size="25px" />
            </WrapItem>
          ))}
        </Wrap>
        <Wrap spacing={0} justify="start">
          {imageDocData.videoTag.map((tagName, index) => (
            <WrapItem key={index} mb="3px">
              <VideoTagItem tagName={tagName} withTooltip={false} />
            </WrapItem>
          ))}
        </Wrap>
        <Flex justifyContent="space-between" alignItems="center" mt="2">
          <time dateTime={createDate}>
            {createDate}
          </time>
          <LikeButton imageDocData={imageDocData} isLoggedIn={isLoggedIn} />
        </Flex>
      </Box>
    </Box>
  );

  return isLinkActive ? (
    <Link to={videoDetailUrl}>{cardContent}</Link>
  ) : (
    <div>{cardContent}</div>
  );
});

export default VideoCard;