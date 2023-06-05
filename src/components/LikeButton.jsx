import { FaHeart } from "react-icons/fa";
import { IconButton } from "@chakra-ui/react";

const LikeButton = ({handleLikeButtonClick}) => {
  return (
    <IconButton
      icon={<FaHeart />}
      aria-label="Like"
      onClick={handleLikeButtonClick}
      mt={2}
    />
  )
}

export default LikeButton;