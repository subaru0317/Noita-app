// 選択したパスからVideoCardをFetchする関数を作成する．
// userLikedImages -> images 情報を取得
import { storage, db } from '../firebase';
import { ref, getDownloadURL } from 'firebase/storage';
import { Grid, GridItem, Spinner, Container, useMediaQuery, Box } from "@chakra-ui/react";
import { collection, collectionGroup, getDocs, where, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactPaginate from "react-paginate";
import VideoCard from "./VideoCard";
import "./Pagination.css";

// imageDocData = {
//   description: string
//   title: string
//   fileId: string
//   filePath: string
//   likeCount: int
//   timestamp: Object { seconds: int, nanoseconds: int }
//   userId: string
//   wandSpells: Array() Object {id, name, path, type}
// }

const FavoriteVideoCardList = () => {
  const { userId } = useParams();
  const ITEMS_PER_PAGE = 24;
  const [imageDocDatas, setImageDocDatas] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [pageChange, setPageChange] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "users", userId, "userLikedImages"));
      const videoPaths = [];
      for (const doc of querySnapshot.docs) {
        const q = query(collectionGroup(db, 'images'), where('fileId', '==', doc.id));
        const result = await getDocs(q);
        result.forEach((doc) => {
          videoPaths.push(doc.data().filePath);
          setImageDocDatas([...imageDocDatas, doc.data()]);
        });
      }
      await downloadVideos(videoPaths);
    }
    const downloadVideo = async (videoPath) => {
      const videoRef = ref(storage, videoPath)
      try {
        const url = await getDownloadURL(videoRef);
        return url;
      } catch (error) {
        console.error("Error downloading image", videoPath, ":", error);
        return null;
      }
    }
    const downloadVideos = async (videoPaths) => {
      try {
        const urls = await Promise.all(videoPaths.map(downloadVideo));
        setLoading(false);
        return urls;
      } catch (error) {
        console.error("Error downloading videos:", error);
        setLoading(false);
        return null;
      }
    }
    fetchData();
  }, [])

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
                    <VideoCard imageDocData={imageDocData} />
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

export default FavoriteVideoCardList;
