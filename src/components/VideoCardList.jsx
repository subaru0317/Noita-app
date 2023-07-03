import { storage, db, auth } from '../firebase';
import { ref, getDownloadURL, deleteObject } from 'firebase/storage';
import { collectionGroup, collection, query, orderBy, where, getDocs, doc, deleteDoc, writeBatch } from "firebase/firestore";
import { Grid, GridItem, Spinner, Container, useMediaQuery, useToast, Box } from "@chakra-ui/react";
import React, { useEffect, useState } from 'react';
import ReactPaginate from "react-paginate";
import VideoCard from "./VideoCard";
import EditableVideoCard from "./EditableVideoCard";
import "./Pagination.css";

// imageDocData = {
//   description: string
//   title: string
//   fileId: string
//   fileName: string
//   filePath: string
//   likeCount: int
//   timestamp: Object { seconds: int, nanoseconds: int }
//   userId: string
//   wandSpells: Array() Object {id, name, path, type}
// }

const DisplayCard = ({imageDocData, videoCardMode, onDelete}) => {
  console.log("DisplayCard");

  switch (videoCardMode) {
    case "editable":
      return (<EditableVideoCard imageDocData={imageDocData} onDelete={onDelete}/>);
    case "normal":
    default:
      return (<VideoCard imageDocData={imageDocData} />);
  }
}

const VideoCardList = ({videoCardMode, fetchMode, selectedSpells, selectedSpellsMode, videoTag, videoTagMode, search, setSearch}) => {
  // console.log("VideoCardList");
  const ITEMS_PER_PAGE = 24;
  const [allImageDocDatas, setAllImageDocDatas] = useState([]);
  const [imageDocDatas, setImageDocDatas] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [firstRender, setFirstRender] = useState(true);


  const toast = useToast();

  useEffect(() => {
    if (search) {
      const fetchImages = async () => {
        const userId = auth.currentUser?.uid;
        let imageCollectionRef;
        
        switch (fetchMode) {
          case "userLiked":
            imageCollectionRef = collection(db, `users/${userId}/userLikedImages`);
            break;
          case "userUploads":
            imageCollectionRef = collection(db, `users/${userId}/images`);
            break;
          case "allImages":
          default:
            imageCollectionRef = collectionGroup(db, "images");
        }
        let imageDocs;
        if (fetchMode === "userLiked") {
          const likedImagesQuery = query(imageCollectionRef, orderBy('likedAt', 'desc'));
          let querySnapshot = await getDocs(likedImagesQuery);
          let imageIds = querySnapshot.docs.map(doc => doc.id);

          imageDocs = [];
          for (let imageId of imageIds) {
            const imagesQuery = query(collectionGroup(db, "images"), where('fileId', '==', imageId));
            let imageQuerySnapshot = await getDocs(imagesQuery);

            if (!imageQuerySnapshot.empty) {
              imageDocs.push(imageQuerySnapshot.docs[0]);
            }
          }
        } else {
          const imagesQuery = query(imageCollectionRef, orderBy('timestamp', 'desc'));
          const querySnapshot = await getDocs(imagesQuery);
          imageDocs = querySnapshot.docs;
        }
        
        const downloadPromises = imageDocs.map(async (doc) => {
          try {
            const filePath = doc.data().filePath;
            const userDefinedWandSpellPaths = doc.data().wandSpells.map(spell => spell.path);
            const userDefinedTagPaths = doc.data().videoTag.map(tag => tag.path);
            const checkSelectedSpells = (selectedSpells, userDefinedWandSpellPaths) => {
              const selectedSpellPathArray = selectedSpells.map(spell => spell.path);
              if (selectedSpellsMode === "OR") {
                return selectedSpellPathArray.some(spell => userDefinedWandSpellPaths.includes(spell));
              } else if (selectedSpellsMode === "AND") {
                return selectedSpellPathArray.every(spell => userDefinedWandSpellPaths.includes(spell));
              }
              return false;
            }
            const checkVideoTag = (videoTag, userDefinedTagPaths) => {
              const videoTagPathArray = videoTag.map(tag => tag.path);
              if (videoTagMode === "OR") {
                return videoTagPathArray.some(tag => userDefinedTagPaths.includes(tag));
              } else if (videoTagMode === "AND") {
                return videoTagPathArray.every(tag => userDefinedTagPaths.includes(tag));
              }
              return false;
            }
            // Check if all of the selectedSpells are part of the userDefinedWandSpellPaths URL
            if ((selectedSpells.length === 0 || checkSelectedSpells(selectedSpells, userDefinedWandSpellPaths)) &&
                (videoTag.length === 0 || checkVideoTag(videoTag, userDefinedTagPaths))) {
              const storageRef = ref(storage, filePath); // use the full file path stored in the document
              const url = await getDownloadURL(storageRef);
              return {
                url: url,
                ...doc.data()
              };
            }
          } catch (error) {
            console.log("Error: ", error);
          }
        });

        const allImageUrls = await Promise.all(downloadPromises);
        const filteredImageUrls = allImageUrls.filter(url => url);
        setAllImageDocDatas(filteredImageUrls);
        setPageCount(Math.ceil(filteredImageUrls.length / ITEMS_PER_PAGE));
        setLoading(false);


        if (!firstRender) {
          // ここで Toast を表示します
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

  

  const handleDelete = async (imageDocData) => {
    const userId = auth.currentUser.uid;
    try {
      const fileRef = ref(storage, imageDocData.filePath);
      await deleteObject(fileRef);
      console.log("File successfully deleted from Firebase Storage!");


      const likedByQuery = query(collection(db, 'users', userId, 'images', imageDocData.fileId, 'likedBy'));
      const likedBySnapshot = await getDocs(likedByQuery);

      const batch = writeBatch(db); // Use batch to perform multiple operations

      // For each user that liked the image, delete the image from their 'userLikedImages' collection
      likedBySnapshot.docs.forEach((docSnapshot) => {
        const userLikedImageRef = doc(db, 'users', docSnapshot.id, 'userLikedImages', imageDocData.fileId);
        batch.delete(userLikedImageRef);
      });

      // Finally, delete the documents from the 'likedBy' subcollection
      likedBySnapshot.docs.forEach((docSnapshot) => {
        batch.delete(docSnapshot.ref);
      });

      // Commit the batch
      await batch.commit();

      const docRef = doc(db, 'users', userId, 'images', imageDocData.fileId);
      await deleteDoc(docRef);
      console.log("Document successfully deleted!");

      // Update the state to remove the deleted card
      const newImageDocDatas = imageDocDatas.filter(docData => docData.fileId !== imageDocData.fileId);
      setImageDocDatas(newImageDocDatas);

      // Show a success toast
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

      // Optionally, you could show an error toast if the deletion failed
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

export default VideoCardList;
