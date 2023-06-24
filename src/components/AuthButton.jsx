import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
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
import { Link } from 'react-router-dom';
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
          text="My Account"
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
  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserMenu(result)
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
    });
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
