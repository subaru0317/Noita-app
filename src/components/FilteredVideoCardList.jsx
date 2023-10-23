import { storage, functions } from '../firebase';
import { ref, getDownloadURL } from 'firebase/storage';
import { Grid, GridItem, Spinner, Container, useMediaQuery, useToast, Box } from "@chakra-ui/react";
import { useEffect, useState } from 'react';
import ReactPaginate from "react-paginate";
import VideoCard from "./VideoCard";
import EditableVideoCard from "./EditableVideoCard";
import "./Pagination.css";
import { httpsCallable } from 'firebase/functions';
import algoliasearch from 'algoliasearch';
import { Timestamp } from 'firebase/firestore'

// imageDocData = {
//   description: string
//   title: string
//   fileId: string
//   filePath: string
//   likeCount: int
//   created_at: Object { seconds: int, nanoseconds: int }
//   userId: string
//   wandSpells: Array() Object {id, name, path, type}
// }

const DisplayCard = ({imageDocData, videoCardMode, onDelete}) => {
  switch (videoCardMode) {
    case "editable":
      return (<EditableVideoCard imageDocData={imageDocData} onDelete={onDelete}/>);
    case "normal":
    default:
      return (<VideoCard imageDocData={imageDocData} />);
  }
}

const FilteredVideoCardList = ({videoCardMode, fetchMode, selectedSpells, selectedSpellsMode, videoTag, videoTagMode, search, setSearch}) => {
  const ITEMS_PER_PAGE = 24;
  const [imageDocDatas, setImageDocDatas] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [pageChange, setPageChange] = useState(false);
  const [loading, setLoading] = useState(true);
  const [firstRender, setFirstRender] = useState(true);
  
  const client = algoliasearch('RTARA2D6OV', '9d33e041c943d00c8ec1028ac2dc79b2');
  const index = client.initIndex('user_videos');
  const toast = useToast();

  useEffect(() => {
    if (search || pageChange) {
      const selectedVideoTagNames = videoTag.map(tag => tag.name);
      const videoTagFilter = selectedVideoTagNames.map(tagName => `videoTag:"${tagName}"`).join(` ${videoTagMode} `);
      const selectedSpellNames = selectedSpells.map(spell => spell.name);
      const spellFilter = selectedSpellNames.map(spellName => `wandSpells:"${spellName}"`).join(` ${selectedSpellsMode} `);

      let combinedFilter = "";

      if (videoTagFilter && spellFilter) {
        combinedFilter = `${videoTagFilter} AND ${spellFilter}`;
      } else if (videoTagFilter) {
        combinedFilter = videoTagFilter;
      } else if (spellFilter) {
        combinedFilter = spellFilter;
      }

      index.search('', {
        filters: combinedFilter,
        hitsPerPage: ITEMS_PER_PAGE,
        page: currentPage
      })
      .then(async ({ hits, nbPages }) => {
        console.log("hits: ", hits);

        const downloadPromises = hits.map(async (hit) => {
          const filePath = hit.filePath;
          const storageRef = ref(storage, filePath); // use the full file path stored in the document
          const url = await getDownloadURL(storageRef);
          console.log("hit.created_at: ", hit.created_at);
          console.log("Timestamp.fromDate(new Date(hit.created_at)): ", Timestamp.fromDate(new Date(hit.created_at)));
          return {
            url: url,
            // created_at: Timestamp.fromDate(new Date(hit.created_at)),
            ...hit
          };
        });

        const allImageUrls = await Promise.all(downloadPromises);
        
        allImageUrls.forEach(url => {
          url.created_at = Timestamp.fromDate(new Date(url.created_at))
        })
        const filteredImageUrls = allImageUrls.filter(url => url);
        setImageDocDatas(filteredImageUrls);
        setPageCount(nbPages);
        setLoading(false);

        if (!firstRender && search) {
          toast({
            title: "Search Complete",
            description: "The image search has been completed.",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "bottom-right",
          });
        }
        setFirstRender(false);
      });
      setSearch(false);
      setPageChange(false);
    }
  }, [search, pageChange, currentPage]);

  // useEffect(() => {
  //   setImageDocDatas(allImageDocDatas.slice(currentPage * ITEMS_PER_PAGE, (currentPage + 1) * ITEMS_PER_PAGE));
  // }, [allImageDocDatas, currentPage]);

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
    setPageChange(true);
  };

  const handleDelete = async (imageDocData) => {
    const deleteWebmVideo = httpsCallable(functions, 'deleteWebmVideo');
    try {
      const response = await deleteWebmVideo({imageDocData: imageDocData});
      if (response.data.result === 'success') {
        console.log("File successfully deleted from Firebase Storage!");
      } else {
        const errorMessage = response.data.error.message || "Unknown error occurred";
        console.error("Error removing document: ", response.data.error);
        throw new Error(errorMessage);
      }
      toast({
        title: "Success",
        description: "Deleted!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom-right"
      });
    } catch (error) {
      console.error("Error removing document: ", error);
      toast({
        title: "Error",
        description: "Failed to delete.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-right"
      });
    }
  }
  return (
    <>
      {loading ? (
        <Spinner size="lg" color="blue.500" />
      ) : (
        <Container centerContent>
          <Grid templateColumns={gridTemplateColumns} gap={6}>
            {imageDocDatas.length > 0 ? (
              imageDocDatas.map((imageDocData, index) => 
                imageDocData && (
                  <GridItem key={index}>
                    <DisplayCard videoCardMode={videoCardMode} imageDocData={imageDocData} onDelete={handleDelete}/>
                  </GridItem>
                )
              )
            ) : (
              <Box>No items matched your criteria</Box>
            )}
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
      )}
    </>
  );
}

export default FilteredVideoCardList;
