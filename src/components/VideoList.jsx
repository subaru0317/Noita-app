import { storage, db } from '../firebase';
import { ref, getDownloadURL } from 'firebase/storage';
import { collectionGroup, query, orderBy, getDocs } from "firebase/firestore";
import { Grid, GridItem, Spinner, Container, useMediaQuery } from "@chakra-ui/react";
import React, { useEffect, useState } from 'react';
import ReactPaginate from "react-paginate";
import VideoCard from "./VideoCard";
import "./Pagination.css";

// imageDocData = {
//   description: string
//   fileId: string
//   fileName: string
//   filePath: string
//   likeCount: int
//   timestamp: Object { seconds: int, nanoseconds: int }
//   url: string
//   userId: string
//   wandSpells: Array(5) [ "/spells/Spell_bomb.webp", "/spells/Spell_light_bullet.webp", "/spells/Spell_light_bullet_trigger.webp", … ]
// }

const VideoList = ({selectedSpells, filterMode}) => {
  const ITEMS_PER_PAGE = 24;
  const [allImageDocDatas, setAllImageDocDatas] = useState([]);
  const [imageDocDatas, setImageDocDatas] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      // const imageDocDatas = [];
      const imagesCollectionGroup = collectionGroup(db, "images");
      const imagesQuery = query(imagesCollectionGroup, orderBy('timestamp', 'desc'));

      const querySnapshot = await getDocs(imagesQuery);
      
      const downloadPromises = querySnapshot.docs.map(async (doc) => {
        try {
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
          previousLabel="< prev"
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
