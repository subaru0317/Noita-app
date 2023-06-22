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
//   title: string
//   fileId: string
//   fileName: string
//   filePath: string
//   likeCount: int
//   timestamp: Object { seconds: int, nanoseconds: int }
//   url: string
//   userId: string
//   wandSpells: Array() Object {id, name, path, type}
// }

const VideoCardList = ({selectedSpells, filterMode, search, setSearch}) => {
  const ITEMS_PER_PAGE = 24;
  const [allImageDocDatas, setAllImageDocDatas] = useState([]);
  const [imageDocDatas, setImageDocDatas] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (search) {
      const fetchImages = async () => {
        const imagesCollectionGroup = collectionGroup(db, "images");
        const imagesQuery = query(imagesCollectionGroup, orderBy('timestamp', 'desc'));

        const querySnapshot = await getDocs(imagesQuery);
        
        const downloadPromises = querySnapshot.docs.map(async (doc) => {
          try {
            const filePath = doc.data().filePath;
            const wandSpellPaths = doc.data().wandSpells.map(spell => spell.path);
            const checkFilterMode = (selectedSpells, wandSpellPaths) => {
              const selectedSpellPathArray = selectedSpells.map(spell => spell.path);
              if (filterMode === "OR") {
                return selectedSpellPathArray.some(spell => wandSpellPaths.includes(spell));
              } else if (filterMode === "AND") {
                return selectedSpellPathArray.every(spell => wandSpellPaths.includes(spell));
              }
              return false;
            }
            // Check if all of the selectedSpells are part of the wandSpellPaths URL
            if (selectedSpells.length === 0 || checkFilterMode(selectedSpells, wandSpellPaths)) {
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
        setAllImageDocDatas(filteredImageUrls);
        setPageCount(Math.ceil(filteredImageUrls.length / ITEMS_PER_PAGE));
        setLoading(false);
      };
    
      fetchImages();
      setSearch(false);
    }
  }, [search]); // dependency on search

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

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <>
      {loading && <Spinner size="lg" color="blue.500" />}
      <Container centerContent>
        <Grid templateColumns={gridTemplateColumns} gap={6}>
          {imageDocDatas.map((imageDocData, index) => (
            <GridItem key={index}>
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

export default VideoCardList;
