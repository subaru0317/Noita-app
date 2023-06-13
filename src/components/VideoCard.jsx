import React, { useEffect, useState, useMemo } from 'react';
import { auth } from '../firebase';
import { Box, Image, Flex, Text, Wrap, WrapItem } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import LikeButton from "./LikeButton";

const VideoCard = ({ imageDocData, hoverEffect = true }) => {
  console.log("imageDocData", imageDocData);
  // console.log("VideoCard");
  // ここの処理元々26個までにしてるから要らないかも
  // 2重にチェックしていることになる．どうなんだ？これは
  const MAX_ICON_DISPLAY = 26;
  const displayIcons = imageDocData.wandSpells.slice(0, MAX_ICON_DISPLAY); // 上限26までのアイコンを取得

  ///
  /// 日付順に並んでいるかの確認用
  ///
  const timestampSeconds = imageDocData.timestamp.seconds;
  const date = new Date(timestampSeconds * 1000); // Convert seconds to milliseconds
  const dateString = date.toLocaleDateString(); // Convert to date string in local format
  const timeString = date.toLocaleTimeString();
  ///
  ///
  ///

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setIsLoggedIn(!!user);
    });

    // コンポーネントがアンマウントされたときにリスナーを削除する
    return () => unsubscribe();
  }, []);

  const hoverAndClickStyles = hoverEffect ? {
    transition: "transform 0.3s, box-shadow 0.3s", 
    _hover: { 
      transform: "scale(1.05)",
      boxShadow: "0 0 10px #00BFFF", // ボーダーの代わりにボックスシャドウを使用
    }
  } : {};
  
  const videoDetailUrl = useMemo(() => `/list/${imageDocData.fileId}`, [imageDocData.fileId]);
  return (
    <Link to={videoDetailUrl}>
      <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" mb={6} {...hoverAndClickStyles}>
        <Image src={imageDocData.url} alt="Image description" />
        <Box p="6">
          <Wrap spacing={0} justify="start">
            {displayIcons.map((icon, index) => (
              <WrapItem key={index} mb="3px">
                <Image 
                  bg="#4f4f4f"
                  border="1px solid #931527"
                  boxSize="25px"
                  src={icon}
                  alt={`Icon ${index}`}
                />
              </WrapItem>
            ))}
          </Wrap>
          <Flex justifyContent="space-between" alignItems="center" mt="2">
            <Text color="#747474">
              {/* {imageDocData.username} // Assuming `username` is present in imageDocData */}
              {`${dateString} ${timeString}`}
            </Text>
              <LikeButton imageDocData={imageDocData} isLoggedIn={isLoggedIn}/>
          </Flex>
        </Box>
      </Box>
    </Link>
  );
};

export default VideoCard;