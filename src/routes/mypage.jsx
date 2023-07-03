import React, { useState, useEffect } from "react";
import { Avatar, Box, Button, Input, VStack, Stack, Text, Flex, Heading, IconButton, useColorModeValue, Center, HStack, Tooltip, FormControl, FormErrorMessage, CircularProgress, useToast } from "@chakra-ui/react";
import { BiLink, BiUser, BiEditAlt, BiTrash } from "react-icons/bi";
import { useParams } from "react-router-dom";
import { onAuthStateChanged, updateProfile, deleteUser } from "firebase/auth";
import { httpsCallable } from 'firebase/functions';
import SpacingDivider from "../components/SpacingDivider";
import { auth, db, functions } from "../firebase";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";

const ProfileControls = ({isEditing, handleEdit, cancelEdit, updateUserInfo, deleteUserInfo, isLoading}) => {
  return (
    isEditing ? (
      <Box p={6}>
        <HStack spacing={3} justify='flex-end'>
          {isLoading ? (
            <>
              <Button size="sm" isDisabled>
                Cancel
              </Button>
              <Button size="sm" colorScheme="blue" isLoading>
                <CircularProgress isIndeterminate color="green.300" />
                Save changes
              </Button>
            </>
          ) : (
            <>
              <Button size="sm" onClick={cancelEdit}>
                Cancel
              </Button>
              <Button size="sm" colorScheme="blue" onClick={updateUserInfo}>
                Save changes
              </Button>
            </>
          )}
        </HStack>
      </Box>
    ) : (
      <Box p={6}>
        <HStack spacing={3} justify='flex-end'>
          <IconButton icon={<BiEditAlt />} onClick={handleEdit} />
          <IconButton icon={<BiTrash />} onClick={deleteUserInfo}/>
        </HStack>
      </Box>
    )
  );
}



const MyPage = () => {
  const { userId } = useParams();
  const [userName, setUserName] = useState("");
  const [userIcon, setUserIcon] = useState("");
  const [previousUserName, setPreviousUserName] = useState("");
  const [previousUserIcon, setPreviousUserIcon] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isValidUrl, setIsValidUrl] = useState(true);
  const [urlErrorMessage, setUrlErrorMessage] = useState("");
  const [isValidName, setIsValidName] = useState(true);
  const [nameErrorMessage, setNameErrorMessage] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserName(user.displayName);
        setUserIcon(user.photoURL);
      }
    });
  }, []);

  const validateUrl = (url) => {
    if (url.trim() === '') { 
      return true; // Allow empty URLs
    }
    const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
    const isValid = urlPattern.test(url);
    if (isValid) {
      setIsValidUrl(true);
      setUrlErrorMessage('');
      return true;
    } else {
      setIsValidUrl(false);
      setUrlErrorMessage('Invalid URL');
      return false;
    }
  }

  const validateName = (name) => {
    if (name.trim() === '' || name.includes('\n')) {
      setIsValidName(false);
      setNameErrorMessage('Name cannot be empty, consist only of white spaces or contain newline');
      return false;
    } else {
      setIsValidName(true);
      setNameErrorMessage('');
      return true;
    }
  };

  const handleEdit = () => {
    setPreviousUserName(userName);
    setPreviousUserIcon(userIcon);
    setUserIcon("");
    setIsValidName(true);
    setNameErrorMessage('');
    setIsValidUrl(true);
    setUrlErrorMessage('');
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setUserName(previousUserName);
    setUserIcon(previousUserIcon);
    setIsValidName(true);
    setNameErrorMessage('');
    setIsValidUrl(true);
    setUrlErrorMessage('');
    setIsEditing(false);
  };

  const toast = useToast();
  const saveImage = async (url) => {
    const saveImageFunction = httpsCallable(functions, 'saveImage');

    try {
      const result = await saveImageFunction({ url: userIcon });
      const imageUrl = result.data;  // This is the URL of the image stored in Firebase Storage

      // Now you can use imageUrl as the user's icon URL
      setUserIcon(imageUrl);
      return imageUrl; // Return the imageUrl so it can be used in updateUserInfo function
    } catch (error) {
      console.error('Error saving image:', error);
      toast({
        title: "Error saving image.",
        description: error.message,  // This displays the error message from Firebase
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
      });
    }
  };

  const updateUserInfo = async () => {
    setIsLoading(true);
    try {
      const isValidUrl = validateUrl(userIcon);
      const isValidName = validateName(userName);
      if (isValidUrl && isValidName) {
        let newIconUrl = '';
        let iconFilename = '';
        if (userIcon.trim() !== '') {
          newIconUrl = await saveImage(userIcon);
          iconFilename = newIconUrl.split('/').pop();
        }
        let updateData = {};
        if (userName.trim() !== '') {
          updateData['displayName'] = userName;
          updateData['userName'] = userName;
        }
        if (newIconUrl !== '') {
          updateData['photoURL'] = newIconUrl;
          updateData['userIcon'] = newIconUrl;
          updateData['iconFilename'] = iconFilename;
        }
        
        if (Object.keys(updateData).length > 0) {
          await updateProfile(auth.currentUser, updateData);

          const userRef = doc(db, 'users', auth.currentUser.uid);
          await updateDoc(userRef, updateData)

          // Call Firebase Function to update comments
          const updateUserComments = httpsCallable(functions, 'updateUserComments');
          updateUserComments({
            userId: auth.currentUser.uid,
            newDisplayName: userName,
            newPhotoURL: newIconUrl
          }).then((result) => {
            console.log(result.data.result); // "User comments updated successfully"
          });
        }
        
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error updating user info:', error);
      toast({
        title: "Error updating user info.",
        description: error.message,  // This displays the error message from Firebase
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
      });
    } finally {
      setIsLoading(false);
      cancelEdit();  // Call cancelEdit to reset to previous state
    }
  };

const deleteUserInfo = async () => {
  const user = auth.currentUser;

  // 3. ユーザーが投稿した動画、コメント等のデータを削除または更新
  // ユーザーが投稿した全ての動画、コメント等のデータを削除するか、
  // "削除されたユーザー"という匿名ユーザーに更新するためのFirebase Functionが必要
  // この部分はアプリケーションの要件によります。
  // const deleteUserPosts = httpsCallable(functions, 'deleteUserPosts');
  // deleteUserPosts({ userId: user.uid });

  // 1. Firestoreのユーザーデータを削除
  const userRef = doc(db, 'users', user.uid);
  await deleteDoc(userRef);

  // 2. Firebase Storageからユーザーのアイコンを削除（オプション）
  // saveImage関数でFirebase Storageに保存した画像を削除する
  // userId削除でdeleteUserIconをトリガー


  // 4. Firebase Authenticationからユーザーを削除
  await deleteUser(user).then(() => {
    console.log("user deleted");
    auth.signOut();
    window.location.reload();
  }).catch((error) => {
    console.log("Error deleting user:", error);
  });

  // 5. Stateを初期化
  setUserName("");
  setUserIcon("");
  setPreviousUserName("");
  setPreviousUserIcon("");
  setIsEditing(false);
};


  return (
    <>
    <Box mt={5} ml={5}>
      <Heading as='h2' size='xl'> My Page </Heading>
    </Box>
    <SpacingDivider />
    <Center>
      <Box
        w={['90%', '60%', '40%']}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'md'}
        overflow={'hidden'}
        m={5}>
        <Flex direction='column' align='center' p={6}>
          <Box align="center">
            <Avatar size="md" src={userIcon} />
            {isEditing && (
              <HStack mt={3}>
                <Tooltip hasArrow label="Paste the image URL" fontSize="md" placement="top">
                  <span>
                    <BiLink size="24px"/>
                  </span>
                </Tooltip>
                <FormControl isInvalid={!isValidUrl}>
                  <Input
                    value={userIcon}
                    onChange={(e) => {
                      setUserIcon(e.target.value);
                      validateUrl(e.target.value);
                    }}
                  />
                  <FormErrorMessage>{urlErrorMessage}</FormErrorMessage>
                </FormControl>
              </HStack>
            )}
          </Box>
          <Box mt={5}>
            {isEditing ? (
              <VStack spacing={2}>
                <HStack>
                  <Tooltip hasArrow label="Enter a display name for use on this website." fontSize="md" placement="top">
                    <span>
                      <BiUser size="24px"/>
                    </span>
                  </Tooltip>
                  <FormControl isInvalid={!isValidName}>
                    <Input
                      value={userName}
                      onChange={(e) => {
                        setUserName(e.target.value);
                        validateName(e.target.value);
                      }}
                    />
                    <FormErrorMessage>{nameErrorMessage}</FormErrorMessage>
                  </FormControl>
                </HStack>
              </VStack>
            ) : (
              <Stack spacing={1}>
                <Text fontSize="2xl">{userName}</Text>
              </Stack>
            )}
          </Box>
        </Flex>
        <ProfileControls 
          isEditing={isEditing} 
          handleEdit={handleEdit} 
          cancelEdit={cancelEdit}
          updateUserInfo={updateUserInfo}
          deleteUserInfo={deleteUserInfo}
          isLoading={isLoading}
        />
      </Box>
    </Center>
    </>
  );
};

export default MyPage;