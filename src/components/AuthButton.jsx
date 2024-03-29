import { useState, useEffect } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { ChevronDownIcon } from '@chakra-ui/icons';
import { useAuthState } from "react-firebase-hooks/auth";
import { Menu, MenuButton, MenuList, MenuItem, MenuDivider, Button, Icon, Text, Flex, Box } from "@chakra-ui/react";
import { GiFairyWand } from "react-icons/gi";
import { MdFavorite } from "react-icons/md";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { RiAccountCircleLine } from "react-icons/ri";
import { MdFolderSpecial } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
const provider = new GoogleAuthProvider();

const UserMenu = () => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const userRef = doc(db, 'users', auth.currentUser.uid);
      onSnapshot(userRef, (docSnapshot) => {
        setUserData(docSnapshot.data());
      },
      (error) => {
        // console.log("UserMenu error: ", error);
      });
    };

    fetchUser();
  }, []);

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
        as={Button} 
        rightIcon={<ChevronDownIcon boxSize="24px"/>} 
        variant="outline"
        borderColor="transparent"
        borderRadius="full"
        p="24px 2px" // 上下に2px、左右に5pxのパディング
        _hover={{ bg: 'gray.200' }} 
        _focus={{ boxShadow: 'none' }}
        _active={{ boxShadow: 'none' }}
      >
        <Flex alignItems="center">
          <Box width="4px" />
          <Text>{userData.userName}</Text>
        </Flex>
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
  );
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
        await setDoc(userRef, {
          userId: user.uid,
          userName: user.displayName,
        });
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
  const [user, loading, error] = useAuthState(auth);
  return (
    <div style={{ minHeight: '40px' }}>
      {user ? <UserMenu /> : <SignInButton />}
    </div>
  )
}

export default AuthButton;
