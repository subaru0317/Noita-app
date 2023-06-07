import { storage, db } from '../firebase';
import { ref, getDownloadURL, listAll } from 'firebase/storage';
import { collectionGroup, query, orderBy, startAfter, getDocs, limit, where, count, getCountFromServer } from "firebase/firestore";
import { Grid, GridItem, Spinner, Box, Image, Flex, Text, Wrap, WrapItem, Container, useMediaQuery, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import LikeButton from "./LikeButton";


const VideoCard = ({ imageDocData }) => {
  // console.log("VideoCard");
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
  // console.log("filterMode: ", filterMode);
  const ITEMS_PER_PAGE = 24;
  const [imageDocDatas, setImageDocDatas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      const imageDocDatas = [];
      const imagesCollectionGroup = collectionGroup(db, "images");
      const imagesQuery = query(imagesCollectionGroup, orderBy('timestamp', 'desc'));

      const countSnapshot = await getCountFromServer(imagesCollectionGroup);
      console.log('Total number of filtered documents: ', countSnapshot.data().count);
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
      setImageDocDatas(allImageUrls.filter(url => url).slice(0, currentPage * ITEMS_PER_PAGE));
      setLoading(false);
    };
    
  
    fetchImages();
  }, [selectedSpells, currentPage]);

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

  const handleClickNext = () => {
    setCurrentPage(currentPage + 1);
  }


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
      <Button onClick={handleClickNext}>次へ</Button>
      </Container>
    </>
  );
}

// const VideoList = ({filterMode, selectedSpells}) => {
//   const PAGE_SIZE = 24;
//   const [selectedPage, setSelectedPage] = useState(1); // Starts from 1
//   const [pagesFirstDocs, setPagesFirstDocs] = useState([]); // An array to store the first document of each page
//   const [imageDocDatas, setVideoDocs] = useState([]); // An array to store the documents of the selected page
//   const [loading, setLoading] = useState(false);
//   const [totalDocs, setTotalDocs] = useState(0);

//   useEffect(() => {
//     const fetchTotalDocs = async () => {
//       const imagesCollectionGroup = collectionGroup(db, "images");
//       const querySnapshot = await getDocs(imagesCollectionGroup);
//       setTotalDocs(querySnapshot.size);
//     };
  
//     fetchTotalDocs();
//   }, []);

//   const fetchVideos = async () => {
//     setLoading(true);

//     let videoQuery;
//     const imagesCollectionGroup = collectionGroup(db, "images");

//     // Add filtering here
//     if (selectedSpells.length > 0 && filterMode === "OR") {
//       videoQuery = query(imagesCollectionGroup, orderBy('timestamp', 'desc'), where('wandSpellsInfo', 'array-contains-any', selectedSpells));
//     } else if (selectedSpells.length > 0 && filterMode === "AND") {
//       selectedSpells.forEach(spell => {
//         videoQuery = query(imagesCollectionGroup, orderBy('timestamp', 'desc'), where('wandSpellsInfo', 'array-contains', spell));
//       });
//     } else {
//       videoQuery = query(imagesCollectionGroup, orderBy('timestamp', 'desc'));
//     }

//     // Add pagination here
//     videoQuery = query(videoQuery, limit(PAGE_SIZE));
//     if (selectedPage > 1 && pagesFirstDocs[selectedPage - 2]) {
//       videoQuery = query(videoQuery, startAfter(pagesFirstDocs[selectedPage - 2]));
//     }

//     const imageDocDatas = [];
//     const querySnapshot = await getDocs(videoQuery);
//     querySnapshot.docs.forEach((doc) => {
//       imageDocDatas.push({
//         id: doc.id,
//         ...doc.data()
//       });
//     });

//     setVideoDocs(imageDocDatas);

//     if (selectedPage === pagesFirstDocs.length + 1 && imageDocDatas.length > 0) {
//       setPagesFirstDocs([...pagesFirstDocs, imageDocDatas[0]]);
//     }

//     setLoading(false);
//   };

//   useEffect(() => {
//     setPagesFirstDocs([]); // Reset the first documents of all pages
//     setSelectedPage(1); // Reset the selected page
//     fetchVideos(); // Fetch the first page
//   }, [filterMode, selectedSpells]); // Re-run whenever filterMode or selectedSpells changes

//   useEffect(() => {
//     if (selectedPage > 1 || selectedPage <= pagesFirstDocs.length) { // Avoid fetching if the page doesn't exist
//       fetchVideos(); // Fetch the selected page
//     }
//   }, [selectedPage]); // Re-run whenever selectedPage changes

//   const useCustomBreakpointsValue = () => {
//     const [isLargerThan800] = useMediaQuery("(min-width: 800px)");
//     const [isLargerThan1200] = useMediaQuery("(min-width: 1200px)");
//     const [isLargerThan1600] = useMediaQuery("(min-width: 1600px)");
  
//     if (isLargerThan1600) {
//       return "repeat(4, 1fr)";
//     } else if (isLargerThan1200) {
//       return "repeat(3, 1fr)";
//     } else if (isLargerThan800) {
//       return "repeat(2, 1fr)";
//     } else {
//       return "repeat(1, 1fr)";
//     }
//   }
  
//   const gridTemplateColumns = useCustomBreakpointsValue();

//   const totalPages = Math.ceil(totalDocs / PAGE_SIZE);

//   return (
//     <div>
//       {loading && <Spinner size="lg" color="blue.500" />}
//       <Container centerContent>
//       <Grid templateColumns={gridTemplateColumns} gap={6}>
//         {imageDocDatas.map((imageDocData, index) => (
//           <GridItem key={index} minW="382px">
//             <VideoCard imageDocData={imageDocData} />
//           </GridItem>
//         ))}
//       </Grid>
//       </Container>
//       <Box display="flex" justifyContent="center" mt={4}>
//         {[...Array(totalPages)].map((_, i) => (
//           <Button 
//             key={i} 
//             colorScheme={i + 1 === selectedPage ? 'blue' : 'gray'}
//             onClick={() => setSelectedPage(i + 1)}
//             m={1}
//           >
//             {i + 1}
//           </Button>
//         ))}
//       </Box>
//     </div>
//   );
// };




export default VideoList;
