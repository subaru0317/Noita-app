import { storage, db } from '../firebase';
import { ref, getDownloadURL, listAll } from 'firebase/storage';
import { collectionGroup, doc, getDocs, query, getDoc, where } from "firebase/firestore";
import { Grid, GridItem, Spinner } from "@chakra-ui/react";
import React, { useEffect, useState } from 'react';
import LikeButton from "./LikeButton";

const VideoList = ({selectedSpells}) => {
  console.log("selectedSpells", selectedSpells);
  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(true);

    //
    //
    //
    useEffect(() => {
      if (selectedSpells.length === 0)
        return ;
      // const fetchDocData = async () => {
      //   // const docRef = doc(db, "users", "0Ef8j7ihA1PH5YAJhjjsjNHaqhV2", "images", "8Sl1ZLr8iP7OPo5Ua94q");
      //   // const docSnap = await getDoc(docRef);
      //   // if (docSnap.exists()) {
      //   //   //console.log("Document data:", docSnap.data());
      //   //   console.log("Document data:", docSnap.data().additionalInfo);

      //   // } else {
      //   //   // docSnap.data() will be undefined in this case
      //   //   console.log("No such document!");
      //   // }
      //   // console.log("selectedSpells:", selectedSpells);
      //   const images = query(collectionGroup(db, "images"), where("additionalInfo", "array-contains", selectedSpells));
      //   const querySnapshot = await getDocs(images);
      //   querySnapshot.forEach((doc) => {
      //       console.log(doc.data());
      //   });
      // }
      // fetchDocData();
      const fetchDocData = async () => {
        const imagesCollection = collectionGroup(db, "images");
        let filteredImages = [];
      
        for (let i = 0; i < selectedSpells.length; i++) {
          const imagesQuery = query(imagesCollection, where("additionalInfo.path", "array-contains", selectedSpells[i]));
          const querySnapshot = await getDocs(imagesQuery);
          querySnapshot.forEach((doc) => {
              filteredImages.push(doc.data());
          });
        }
      
        // 画像がすべての選択された呪文を持っていることを確認
        filteredImages = filteredImages.filter(image => 
          selectedSpells.every(spell => 
            image.additionalInfo.some(info => info.path === spell)
          )
        );
      
        console.log("filterdImages", filteredImages);
      }
      
      fetchDocData();

    }, [selectedSpells]);



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
            <img src={url} alt={`Image ${index}`} style={{ width: '80%', height: '80%', objectFit: 'cover' }}/>
            <LikeButton />
          </GridItem>
        ))}
      </Grid>
    </>
  )
}

export default VideoList;