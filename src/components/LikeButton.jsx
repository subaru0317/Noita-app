import { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { FaHeart } from "react-icons/fa";
import { Flex, Box, Button, Tooltip } from "@chakra-ui/react";
import { increment, updateDoc, doc, setDoc, getDoc, deleteDoc, serverTimestamp, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

// isLoggedInは再レンダリングするためだけに呼び出し
const LikeButton = ({imageDocData, isLoggedIn}) => {
  const [likeCount, setLikeCount] = useState(imageDocData.likeCount);
  const [liked, setLiked] = useState(false);
  const [processing, setProcessing] = useState(false);

  const checkLiked = async (uid) => {
    const likedByRef = doc(db, "users", imageDocData.userId, "images", imageDocData.fileId, "likedBy", uid);
    const docSnap = await getDoc(likedByRef);
    setLiked(docSnap.exists());
  };

  useEffect(() => {
    const imageRef = doc(db, "users", imageDocData.userId, "images", imageDocData.fileId);
    const unsubscribe = onSnapshot(imageRef, (doc) => {
      if (doc.exists()) {
        setLikeCount(doc.data().likeCount);
      }
    });

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
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

const handleLikeButtonClick = async (e) => {
  e.preventDefault();

  if (!auth.currentUser) {
    return ;
  }
  
  setProcessing(true);
  
  const loginUserId = auth.currentUser.uid;
  const likedByRef = doc(db, "users", imageDocData.userId, "images", imageDocData.fileId, "likedBy", loginUserId);
  const userLikedImagesRef = doc(db, "users", loginUserId, "userLikedImages", imageDocData.fileId);  // ユーザーが「いいね」した画像を追跡するためのリファレンス
  const imageRef = doc(db, "users", imageDocData.userId, "images", imageDocData.fileId);

  const docSnap = await getDoc(likedByRef);
  
  if (docSnap.exists()) {
    setLiked(false);
    setLikeCount(likeCount - 1);
    await deleteDoc(likedByRef);
    await deleteDoc(userLikedImagesRef);  // ユーザーが「いいね」を取り消したときに、userLikedImagesコレクションから該当のドキュメントを削除します
    await updateDoc(imageRef, { likeCount: increment(-1) });
  } else {
    setLiked(true);
    setLikeCount(likeCount + 1);
    await setDoc(likedByRef, { likedAt: serverTimestamp() }, { merge: true });
    await setDoc(userLikedImagesRef, { likedAt: serverTimestamp() }, { merge: true });  // ユーザーが画像を「いいね」したときに、userLikedImagesコレクションに新しいドキュメントを追加します
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
            onClick={(e) => handleLikeButtonClick(e)}
            mt={2}
            isDisabled={processing || !auth.currentUser}
          >
            <Box mt={-1} fontSize="19px" color="black">
              {likeCount}
            </Box>
          </Button>
        </Box>
      </Tooltip>
    </Flex>
  )
}

export default LikeButton;
