import { FaHeart } from "react-icons/fa";
import { IconButton } from "@chakra-ui/react";

export default function LikeButton({index}) {
  const handleLike = (index) => {
    const imageRef = firestore.collection('images').doc(`image${index}`);
    imageRef.update({ likes: firebase.firestore.FieldValue.increment(1) })
      .then(() => {
        console.log('Like incremented successfully!');
      })
      .catch((error) => {
        console.log('Error incrementing like:', error);
      });
  };
  return (
    <IconButton
      icon={<FaHeart />}
      aria-label="Like"
      onClick={() => handleLike(index)}
      mt={2}
    />

  )
}