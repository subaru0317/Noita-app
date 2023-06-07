import { storage, db } from '../firebase';
import { ref, getDownloadURL, listAll } from 'firebase/storage';
import { collectionGroup, getDocs, query, orderBy } from "firebase/firestore";
import { Grid, GridItem, Spinner, Box, Image, Flex, Text, Wrap, WrapItem, useBreakpointValue } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import LikeButton from "./LikeButton";


const VideoCard = ({ imageDocData }) => {
  console.log("VideoCard");
  const MAX_ICON_DISPLAY = 26;
  const displayIcons = imageDocData.wandSpellsInfo.slice(0, MAX_ICON_DISPLAY); // 上限26までのアイコンを取得

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

  const pageUrl = `/page/${imageDocData.id}`;
  return (
    // <Link to={pageUrl}>
      <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" mb={6}>
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
              { imageDocData && <LikeButton imageDocData={imageDocData} /> }
            </Flex>
          </Box>
        </Box>
    // </Link>
  );
};

const VideoList = ({selectedSpells, filterMode}) => {
  // console.log("selectedSpells", selectedSpells);
  console.log("filterMode: ", filterMode);
  const [imageDocDatas, setImageDocDatas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      const imageDocDatas = [];
      const imagesCollectionGroup = collectionGroup(db, "images");
      const imagesQuery = query(imagesCollectionGroup, orderBy('timestamp', 'desc'));
    
      const querySnapshot = await getDocs(imagesQuery);
      
      const downloadPromises = querySnapshot.docs.map(async (doc) => {
        try {
          console.log("doc.data(): ", doc.data());
          const filePath = doc.data().filePath;
          const wandSpellInfo = doc.data().wandSpellsInfo;
          const checkFilterMode = (spellList, spellInfo) => {
            if (filterMode === "OR") {
              return spellList.some(spell => spellInfo.includes(spell));
            } else if (filterMode === "AND") {
              return spellList.every(spell => spellInfo.includes(spell));
            }
            return false;
          }
          // Check if all of the selectedSpells are part of the wandSpellInfo URL
          if (selectedSpells.length === 0 || checkFilterMode(selectedSpells, wandSpellInfo)) {
            const storageRef = ref(storage, filePath); // use the full file path stored in the document
            const url = await getDownloadURL(storageRef);
            return {
              url: url,
              ...doc.data()
            };
          }
        } catch (error) {
          console.log(error);
        }
      });
    
      const allImageUrls = await Promise.all(downloadPromises);
      setImageDocDatas(allImageUrls.filter(url => url));
      setLoading(false);
    };
    
  
    fetchImages();
  }, [selectedSpells]);

  // 要素の幅を調整するためのブレークポイント値を定義します。
  const videoCardWidth = useBreakpointValue({
    base: "100%",  // 480px以下の場合
    sm: "50%",  // 481px以上の場合
    md: "382px",  // 768px以上の場合
  });
  const gridTemplateColumns = useBreakpointValue({
    base: "repeat(1, 1fr)",  // 480px以下の場合
    sm: "repeat(2, 1fr)",  // 481px以上の場合
    md: "repeat(3, 1fr)",  // 768px以上の場合
    lg: "repeat(4, 1fr)",  // 1024px以上の場合
  });
  
  return (
    <>
      {loading && <Spinner size="lg" color="blue.500" />}
      <Grid templateColumns={gridTemplateColumns} gap={6}>
        {imageDocDatas.map((imageDocData, index) => (
          <GridItem key={index} w={videoCardWidth}>
            <VideoCard imageDocData={imageDocData} />
          </GridItem>
        ))}
      </Grid>
    </>
  );
}

export default VideoList;
