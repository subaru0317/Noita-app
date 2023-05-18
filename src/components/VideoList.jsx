import { storage } from '../firebase';
import { ref, getDownloadURL, listAll } from 'firebase/storage';
import { Grid, GridItem, Spinner } from "@chakra-ui/react";
import React, { useEffect, useState } from 'react';

function VideoList() {
  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storageRef = ref(storage);
    const imagesRef = ref(storageRef, 'images/');

    listAll(imagesRef)
      .then(async (res) => {
        const urls = [];
        for (const itemRef of res.items) {
          try {
            const url = await getDownloadURL(itemRef);
            urls.push(url);
          } catch (error) {
            console.log(error);
          }
        }
        setImageUrls(urls);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      {loading && <Spinner size="lg" color="blue.500" />}
      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        {imageUrls.map((url, index) => (
          <GridItem key={index}>
            <img src={url} alt={`Image ${index}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
          </GridItem>
        ))}
      </Grid>
    </>
  )
}

export default VideoList;