import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { Button, Icon, IconButton } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { useAuthState } from "react-firebase-hooks/auth";
import { Menu, MenuButton, MenuList, MenuItem, MenuDivider, Avatar } from "@chakra-ui/react";
import { GiFairyWand } from "react-icons/gi";
import { MdFavorite } from "react-icons/md";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { RiAccountCircleLine } from "react-icons/ri";
import { MdFolderSpecial } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
const provider = new GoogleAuthProvider();

const UserMenu = () => {
  const IconText = ({icon, color, text, path}) => {
    return (
      <Link to={path}>
        <MenuItem>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Icon as={icon} boxSize={5} color={color} style={{ verticalAlign: 'middle' }}/>
            <span style={{ marginLeft: '0.4rem', verticalAlign: 'middle', marginTop: '-3px' }}>{text}</span>
          </div>
        </MenuItem>
      </Link>
    );
  }
  
  return (
    <Menu>
      <MenuButton
        _hover={{ borderRadius: 'full', transition: "border-radius 0.3s"}}
        _focus={{ outline: "none" }}
        minHeight='40px'
        p={2}
        display='flex'
        alignItems='center'
      >
        <Avatar
          name={auth.currentUser.displayName}
          src={auth.currentUser.photoURL}
          referrerPolicy="no-referrer"
          size='md'
        />
        <ChevronDownIcon boxSize={10} style={{marginTop: '6px'}} />
      </MenuButton>
      <MenuList>
        <IconText
          icon={RiAccountCircleLine}
          color="black"
          text="My Page"
          path={`/mypage/${auth.currentUser.uid}`}
        />
        <MenuDivider />
        <IconText
          icon={GiFairyWand}
          color="blue.500"
          text="Upload Video"
          path="/uploadvideo"
        />
        <IconText
          icon={MdFolderSpecial}
          color="green"
          text="My Videos"
          path={`/myvideos/${auth.currentUser.uid}`}
        />
        <IconText
          icon={MdFavorite}
          color="red"
          text="Favorite"
          path={`/favorite/${auth.currentUser.uid}`}
        />
        <MenuDivider />
        <MenuItem onClick={() => auth.signOut()}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Icon as={RiLogoutBoxRLine} boxSize={5} color="black" style={{ verticalAlign: 'middle' }}/>
            <span style={{ marginLeft: '0.4rem', verticalAlign: 'middle', marginTop: '-3px' }}>Log out</span>
          </div>
        </MenuItem>
      </MenuList>
    </Menu>
  )
}

const SignInButton = () => {
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(userRef);
      if (!docSnap.exists()) {
        // User is signing in for the first time. 
        // Let's set their name and icon to the values from the provider
        await setDoc(userRef, {
          userName: user.displayName,
          userId: user.uid,
          userIcon: user.photoURL
        });
        // Navigate to the user's user page
        navigate(`/mypage/${user.uid}`);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Button 
      onClick={handleLogin}
      fontSize='lg'
      color='gray'
      mr={3}
      borderWidth='2px'
      borderRadius='md'
      minHeight='40px'
    >
      Sign In
    </Button>
  )
}

const AuthButton = () => {
  const [userSignedIn] = useAuthState(auth);
  return (
    <div style={{ minHeight: '40px' }}>
      {userSignedIn ? <UserMenu /> : <SignInButton />}
    </div>
  )
}

export default AuthButton;
