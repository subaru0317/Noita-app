import { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { FaHeart } from "react-icons/fa";
import { IconButton, Flex, Text } from "@chakra-ui/react";
import { increment, updateDoc, doc, setDoc, getDoc, deleteDoc, serverTimestamp, onSnapshot } from "firebase/firestore";

const LikeButton = ({imageDocData}) => {
  const [likeCount, setLikeCount] = useState(imageDocData.likeCount);

  useEffect(() => {
    const imageRef = doc(db, "users", imageDocData.userId, "images", imageDocData.fileId);
    const unsubscribe = onSnapshot(imageRef, (doc) => {
      setLikeCount(doc.data().likeCount);
    });

    // Clean up function
    return () => unsubscribe();
  }, [imageDocData]);

  const handleLikeButtonClick = async () => {
    const loginUserId = auth.currentUser.uid;
    const likesRef = doc(db, "users", imageDocData.userId, "images", imageDocData.fileId, "likes", loginUserId);
    const imageRef = doc(db, "users", imageDocData.userId, "images", imageDocData.fileId);

    const docSnap = await getDoc(likesRef);

    if (docSnap.exists()) {
      // if the user has already liked the image, we delete the like and decrement the likeCount
      await deleteDoc(likesRef);
      await updateDoc(imageRef, { likeCount: increment(-1) });
    } else {
      // if the user has not liked the image yet, we add the like and increment the likeCount
      await setDoc(likesRef, { likedAt: serverTimestamp() }, { merge: true });
      await updateDoc(imageRef, { likeCount: increment(1) });
    }
  };
  
  return (
    <Flex alignItems="center">
      <IconButton
        icon={<FaHeart />}
        aria-label="Like"
        onClick={handleLikeButtonClick}
        mt={2}
      />
      <Text ml="2" color="#747474">
        {likeCount}
      </Text>
    </Flex>
  )
}

export default LikeButton;
