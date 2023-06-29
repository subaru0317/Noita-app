import React, { useState, useEffect } from "react";
import { Avatar, Box, Button, Input, VStack, Stack, Text, Flex, Heading, IconButton, useColorModeValue, Center, HStack, Tooltip, FormControl, FormErrorMessage } from "@chakra-ui/react";
import { BiLink, BiUser, BiEditAlt, BiTrash } from "react-icons/bi";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import SpacingDivider from "../components/SpacingDivider";

const MyPage = () => {
  const { userId } = useParams();
  const [userName, setUserName] = useState("");
  const [userIcon, setUserIcon] = useState("");
  const [previousUserName, setPreviousUserName] = useState("");
  const [previousUserIcon, setPreviousUserIcon] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isValidUrl, setIsValidUrl] = useState(true);
  const [urlErrorMessage, setUrlErrorMessage] = useState("");
  const [isValidName, setIsValidName] = useState(true);
  const [nameErrorMessage, setNameErrorMessage] = useState("");

  useEffect(() => {
    const db = getFirestore();
    const fetchData = async () => {
      const docRef = doc(db, "users", userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUserName(docSnap.data().userName);
        setUserIcon(docSnap.data().userIcon);
      }
    };

    fetchData();
  }, [userId]);

  const validateUrl = (url) => {
    const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
    const isValid = urlPattern.test(url);
    setIsValidUrl(isValid);

    if (!isValid) {
      setUrlErrorMessage("Invalid URL");
    } else {
      setUrlErrorMessage("");
    }
  }

  const validateName = (name) => {
    if (name.trim() === '' || name.includes('\n')) {
      setIsValidName(false);
      setNameErrorMessage('Name cannot be empty, consist only of white spaces or contain newline');
    } else {
      setIsValidName(true);
      setNameErrorMessage('');
    }
  };

  const handleEdit = () => {
    setPreviousUserName(userName);
    setPreviousUserIcon(userIcon);
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

  const updateUserInfo = async () => {
    validateUrl(userIcon);
    validateName(userName);
    if (isValidUrl && isValidName) {
      const db = getFirestore();
      const docRef = doc(db, "users", getAuth().currentUser.uid);
      await updateDoc(docRef, { "userName": userName, "userIcon": userIcon });
      setIsEditing(false);
    }
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
        <Box p={6}>
          {isEditing ? (
            <HStack spacing={3} justify='flex-end'>
              <Button size="sm" onClick={cancelEdit}>
                Cancel
              </Button>
              <Button size="sm" colorScheme="blue" onClick={updateUserInfo}>
                Save changes
              </Button>
            </HStack>
          ) : (
            <HStack spacing={3} justify='flex-end'>
              <IconButton icon={<BiEditAlt />} onClick={handleEdit} />
              <IconButton icon={<BiTrash />} />
            </HStack>
          )}
        </Box>
      </Box>
    </Center>
    </>
  );
};

export default MyPage;
