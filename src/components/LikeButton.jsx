import { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { FaHeart } from "react-icons/fa";
import { IconButton, Flex, Text } from "@chakra-ui/react";
import { increment, updateDoc, doc, setDoc, getDoc, deleteDoc, serverTimestamp, onSnapshot } from "firebase/firestore";

const LikeButton = ({imageDocData}) => {
  const [likeCount, setLikeCount] = useState(imageDocData.likeCount);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const imageRef = doc(db, "users", imageDocData.userId, "images", imageDocData.fileId);
    const unsubscribe = onSnapshot(imageRef, (doc) => {
      setLikeCount(doc.data().likeCount);
    });

    const checkLiked = async () => {
      const loginUserId = auth.currentUser.uid;
      const likesRef = doc(db, "users", imageDocData.userId, "images", imageDocData.fileId, "likes", loginUserId);
      const docSnap = await getDoc(likesRef);
      setLiked(docSnap.exists());
    };

    checkLiked();

    return () => unsubscribe();
  }, [imageDocData]);

  const handleLikeButtonClick = async () => {
    const loginUserId = auth.currentUser.uid;
    const likesRef = doc(db, "users", imageDocData.userId, "images", imageDocData.fileId, "likes", loginUserId);
    const imageRef = doc(db, "users", imageDocData.userId, "images", imageDocData.fileId);

    const docSnap = await getDoc(likesRef);

    if (docSnap.exists()) {
      setLiked(false);
      setLikeCount(likeCount - 1);
      deleteDoc(likesRef).then(() => updateDoc(imageRef, { likeCount: increment(-1) }));
    } else {
      setLiked(true);
      setLikeCount(likeCount + 1);
      setDoc(likesRef, { likedAt: serverTimestamp() }, { merge: true }).then(() => updateDoc(imageRef, { likeCount: increment(1) }));
    }
  };
  
  return (
    <Flex alignItems="center">
      <IconButton
        icon={<FaHeart color={liked ? "red" : "black"} />}
        aria-label="Like"
        onClick={handleLikeButtonClick}
        mt={2}
      />
      <Text ml="2" fontSize="xl">
        {likeCount}
      </Text>
    </Flex>
  )
}

export default LikeButton;
