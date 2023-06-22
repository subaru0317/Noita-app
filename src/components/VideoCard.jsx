import React, { useEffect, useState, useMemo, memo } from 'react';
import { auth } from '../firebase';
import { Box, Image, Flex, Text, Wrap, WrapItem } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import LikeButton from "./LikeButton";
import SpellIcon from './SpellIcon';
import { onAuthStateChanged } from "firebase/auth";

const VideoCard = memo(({ imageDocData, isLinkActive = true }) => {
  const timestampSeconds = imageDocData.timestamp.seconds;
  const date = new Date(timestampSeconds * 1000); 
  const dateString = date.toLocaleDateString();
  const timeString = date.toLocaleTimeString();

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

  const cardContent = (
    <Box minW="382px" maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" mb={6} {...hoverAndClickStyles}>
      <video src={imageDocData.filePath} alt="Video description" controls loop autoPlay muted/>
      <Box p="6">
        <Wrap spacing={0} justify="start">
          {imageDocData.wandSpells.map((spell, index) => (
            <WrapItem key={index} mb="3px">
              <SpellIcon spell={spell} size="25px" />
            </WrapItem>
          ))}
        </Wrap>
        <Flex justifyContent="space-between" alignItems="center" mt="2">
          <Text color="#747474">
            {`${dateString} ${timeString}`}
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
