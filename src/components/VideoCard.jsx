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
  let dateString;
  // ここがわけわからん
  // 動画が，
  // 一覧表示の画面のとき(isLinkActive = true)ではtoDate()するとError．new DateならOK
  // 詳細表示の画面のとき(isLinkActive = false)ではnew DateするとError．toDate()ならOK
  // isLinkActiveで分岐させたが，根本的な原因が不明．なんやこれ
  // memoでDateオブジェクトが残ってたりするのか？わからーーーん
  // こうすればとりあえず正しく日付が表示されるようになってのでヨシ！
  if (isLinkActive) {
    const date = new Date(imageDocData.timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    dateString = `${year}/${month}/${day}`;
  } else {
    const timestamp = imageDocData.timestamp;
    const year = timestamp.toDate().getFullYear();
    const month = String(timestamp.toDate().getMonth() + 1).padStart(2, '0');
    const day = String(timestamp.toDate().getDate()).padStart(2, '0');

    dateString = `${year}/${month}/${day}`;
  }
    
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });

    return () => unsubscribe();
  }, []);

  const hoverAndClickStyles = isLinkActive
    ? {
      transition: 'transform 0.3s, box-shadow 0.3s',
      _hover: {
        transform: 'scale(1.05)',
        boxShadow: '0 0 10px #00BFFF',
      },
    }
    : {};

  const [videoUrl, setVideoUrl] = useState(null);

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
          <Text color="#747474">{dateString}</Text>
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
