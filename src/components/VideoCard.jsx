import { useEffect, useState, useMemo, memo } from 'react';
import { Link } from "react-router-dom";
import { Box, Flex, Text, Wrap, WrapItem } from "@chakra-ui/react";
import { auth, storage } from '../firebase';
import { ref } from 'firebase/storage';
import { onAuthStateChanged } from "firebase/auth";
import LikeButton from "./LikeButton";
import SpellIcon from './SpellIcon';
import VideoTagItem from "./VideoTagItem";

const VideoCard = memo(({ imageDocData, isLinkActive = true }) => {
  const date = new Date(imageDocData.timestamp);

  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2); // JavaScriptの月は0から始まるため1を追加します
  const day = ("0" + date.getDate()).slice(-2);

  const dateString = `${year}/${month}/${day}`;

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });

    // Unsubscribe the listener when the component is unmounted
    return () => unsubscribe();
  }, []);

  const hoverAndClickStyles = isLinkActive ? {
    transition: "transform 0.3s, box-shadow 0.3s", 
    _hover: { 
      transform: "scale(1.05)",
      boxShadow: "0 0 10px #00BFFF",
    }
  } : {};

  const videoDetailUrl = useMemo(() => `/list/${imageDocData.fileId}`, [imageDocData.fileId]);
  console.log("imageDocData: ", imageDocData);
  console.log("imageDocData.wandSpells: ", imageDocData.wandSpells);
  const cardContent = (
    <Box minW="382px" maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" mb={6} {...hoverAndClickStyles}>
      <video src={imageDocData.url} alt="Video description" controls loop autoPlay muted/>
      <Box p="6">
        <Wrap spacing={0} justify="start">
          <Text ab='b'>
            {imageDocData.videoTitle}
          </Text>
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
          <Text color="#747474">
            {`${dateString}`}
          </Text>
          <LikeButton imageDocData={imageDocData} isLoggedIn={isLoggedIn}/>
        </Flex>
      </Box>
    </Box>
  );

  return isLinkActive ? (
    <Link to={videoDetailUrl}>
      {cardContent}
    </Link>
  ) : (
    <div>{cardContent}</div>
  );
});

export default VideoCard;
