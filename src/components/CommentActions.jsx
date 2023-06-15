import { ButtonGroup, IconButton } from "@chakra-ui/react";
import { auth } from "../firebase";
import { BiEditAlt } from "react-icons/bi";
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";

const CommentActions = ({userId}) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <ButtonGroup>
      {userId === currentUser?.uid && (
        <IconButton
          icon={<BiEditAlt size='16px'/>}
          colorScheme='ghost'
          aria-label='Edit comment'
          size='xs'
        />
      )}
    </ButtonGroup>
  );
}

export default CommentActions;
