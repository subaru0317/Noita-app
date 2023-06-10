import { storage, db, auth } from '../firebase';
import { ref, getDownloadURL, listAll } from 'firebase/storage';
import { collectionGroup, query, orderBy, startAfter, getDocs, limit, where, count, getCountFromServer } from "firebase/firestore";
import { Grid, GridItem, Spinner, Box, Image, Flex, Text, Wrap, WrapItem, Container, useMediaQuery, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import LikeButton from "./LikeButton";
// import PaginatedItems from "./PaginatedItems";
import ReactPaginate from "react-paginate";
import "./Pagination.css";


const VideoCard = ({ imageDocData }) => {
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
                <LikeButton imageDocData={imageDocData} isLoggedIn={isLoggedIn}/>
            </Flex>
          </Box>
        </Box>
    // </Link>
  );
};

const VideoList = ({selectedSpells, filterMode}) => {
  console.log("selectedSpells", selectedSpells);
  // console.log("filterMode: ", filterMode);
  const ITEMS_PER_PAGE = 24;
  const [allImageDocDatas, setAllImageDocDatas] = useState([]);
  const [imageDocDatas, setImageDocDatas] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchImages = async () => {
      const imageDocDatas = [];
      const imagesCollectionGroup = collectionGroup(db, "images");
      const imagesQuery = query(imagesCollectionGroup, orderBy('timestamp', 'desc'));


      const querySnapshot = await getDocs(imagesQuery);
      
      const downloadPromises = querySnapshot.docs.map(async (doc) => {
        try {
          // console.log("doc.data(): ", doc.data());
          const filePath = doc.data().filePath;
          const wandSpellInfo = doc.data().wandSpells;
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
            // const countSnapshot = await getCountFromServer(imagesCollectionGroup);
            // console.log('Total number of filtered documents: ', countSnapshot.data().count);
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
      const filteredImageUrls = allImageUrls.filter(url => url);
      // setImageDocDatas(filteredImageUrls.slice(0, currentPage * ITEMS_PER_PAGE));
      setAllImageDocDatas(filteredImageUrls);
      setPageCount(Math.ceil(filteredImageUrls.length / ITEMS_PER_PAGE));
      setLoading(false);
    };
  
    fetchImages();
  }, [selectedSpells]);

  useEffect(() => {
    setImageDocDatas(allImageDocDatas.slice(currentPage * ITEMS_PER_PAGE, (currentPage + 1) * ITEMS_PER_PAGE));
  }, [allImageDocDatas, currentPage]);

  const useCustomBreakpointsValue = () => {
    const [isLargerThan800] = useMediaQuery("(min-width: 800px)");
    const [isLargerThan1200] = useMediaQuery("(min-width: 1200px)");
    const [isLargerThan1600] = useMediaQuery("(min-width: 1600px)");
  
    if (isLargerThan1600) {
      return "repeat(4, 1fr)";
    } else if (isLargerThan1200) {
      return "repeat(3, 1fr)";
    } else if (isLargerThan800) {
      return "repeat(2, 1fr)";
    } else {
      return "repeat(1, 1fr)";
    }
  }
  
  const gridTemplateColumns = useCustomBreakpointsValue();

  console.log("imageDocDatas: ", imageDocDatas);
  console.log("imageDocDatas: ", imageDocDatas.length);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected); // react-paginate counts pages from 0, but we count from 1
  };

  return (
    <>
      {loading && <Spinner size="lg" color="blue.500" />}
      <Container centerContent>
      <Grid templateColumns={gridTemplateColumns} gap={6}>
        {imageDocDatas.map((imageDocData, index) => (
          <GridItem key={index} minW="382px">
            <VideoCard imageDocData={imageDocData} />
          </GridItem>
        ))}
      </Grid>

      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
      </Container>
    </>
  );
}

export default VideoList;
