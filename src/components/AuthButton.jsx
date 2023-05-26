import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import { Button, Icon } from '@chakra-ui/react';
import { useAuthState } from "react-firebase-hooks/auth";
import { Menu, MenuButton, MenuList, MenuGroup, MenuItem, MenuDivider, Image } from "@chakra-ui/react";
import { GiFairyWand } from "react-icons/gi";
import { MdFavorite } from "react-icons/md";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { RiAccountCircleLine } from "react-icons/ri";
import { MdFolderSpecial } from "react-icons/md";
import { Link } from 'react-router-dom';
const provider = new GoogleAuthProvider();

function UserMenu() {
  const IconText = ({icon, color, text, path}) => {
    return (
      <Link to={path}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Icon as={icon} boxSize={5} color={color} style={{ verticalAlign: 'middle' }}/>
          <span style={{ marginLeft: '0.4rem', verticalAlign: 'middle', marginTop: '-3px' }}>{text}</span>
        </div>
      </Link>
    );
  }
  return (
    <Menu>
      <MenuButton
        _hover={{ borderRadius: 'full', transition: "border-radiuo 10.3s"}}
        _focus={{ outline: "none" }}
      >
        <Image
          borderRadius='full'
          boxSize='40px'
          src={auth.currentUser.photoURL}
          alt='UserIcon'
          />
        {/* <p>{auth.currentUser.displayName}</p> */}
      </MenuButton>
      <MenuList>
          <MenuItem>
            <IconText
              icon={RiAccountCircleLine}
              color="black"
              text="My Account"
              path="/mypage"
            />
          </MenuItem>
          <MenuDivider />
          <MenuItem>
            <IconText
              icon={GiFairyWand}
              color="blue.500"
              text="Upload Video"
              path="/uploadvideo"
            />
          </MenuItem>
          <MenuItem>
            <IconText
              icon={MdFolderSpecial}
              color="green"
              text="My Videos"
              path="/myvideos"
            />
          </MenuItem>
          <MenuItem>
            <IconText
              icon={MdFavorite}
              color="red"
              text="Favorite"
              path="/favorite"
            />
          </MenuItem>
          <MenuDivider />
          <MenuItem onClick={() => auth.signOut()}>
            <IconText
              icon={RiLogoutBoxRLine}
              color="black"
              text="Log out"
            />
          </MenuItem>
      </MenuList>
    </Menu>
  )
}

function SignInButton() {
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
  >
    Sign In
  </Button>
  )
}

export default function AuthButton() {
  const [userSignedIn] = useAuthState(auth);
  return (
    <div>
      {userSignedIn ? <UserMenu /> : <SignInButton />}
    </div>
  )
}

