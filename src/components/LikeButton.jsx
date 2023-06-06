import { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { FaHeart } from "react-icons/fa";
import { Flex, Box, Button, Tooltip } from "@chakra-ui/react";
import { increment, updateDoc, doc, setDoc, getDoc, deleteDoc, serverTimestamp, onSnapshot } from "firebase/firestore";

const LikeButton = ({imageDocData}) => {
  const [likeCount, setLikeCount] = useState(imageDocData.likeCount);
  const [liked, setLiked] = useState(false);
  const [processing, setProcessing] = useState(false);

  const checkLiked = async (uid) => {
    const likesRef = doc(db, "users", imageDocData.userId, "images", imageDocData.fileId, "likes", uid);
    const docSnap = await getDoc(likesRef);
    setLiked(docSnap.exists());
  };

  useEffect(() => {
    const imageRef = doc(db, "users", imageDocData.userId, "images", imageDocData.fileId);
    const unsubscribe = onSnapshot(imageRef, (doc) => {
      setLikeCount(doc.data().likeCount);
    });

    const unsubscribeAuth = auth.onAuthStateChanged(user => {
      if (!user) {
        setLiked(false);
      } else {
        checkLiked(user.uid);
      }
    });

    return () => {
      unsubscribe();
      unsubscribeAuth();
    };
  }, [imageDocData]);

  const handleLikeButtonClick = async () => {
    if (!auth.currentUser) {
      return ;
    }
    
    setProcessing(true);
    
    const loginUserId = auth.currentUser.uid;
    const likesRef = doc(db, "users", imageDocData.userId, "images", imageDocData.fileId, "likes", loginUserId);
    const imageRef = doc(db, "users", imageDocData.userId, "images", imageDocData.fileId);
  
    const docSnap = await getDoc(likesRef);
  
    if (docSnap.exists()) {
      setLiked(false);
      setLikeCount(likeCount - 1);
      await deleteDoc(likesRef);
      await updateDoc(imageRef, { likeCount: increment(-1) });
    } else {
      setLiked(true);
      setLikeCount(likeCount + 1);
      await setDoc(likesRef, { likedAt: serverTimestamp() }, { merge: true });
      await updateDoc(imageRef, { likeCount: increment(1) });
    }
  
    setProcessing(false);
  };
  
  return (
    <Flex alignItems="center">
      <Tooltip label={!auth.currentUser ? "Please log in to like" : ""} >
        <Box>
          <Button
            leftIcon={<FaHeart color={auth.currentUser && liked ? "red" : "black"} />}
            aria-label='Like'
            onClick={handleLikeButtonClick}
            mt={2}
            isDisabled={processing || !auth.currentUser}
          >
            <Box mt={-1} fontSize="19px">
              {likeCount}
            </Box>
          </Button>
        </Box>
      </Tooltip>
    </Flex>
  )
}

export default LikeButton;
