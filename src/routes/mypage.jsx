import React, { useState, useEffect } from "react";
import { Box, Button, Image, Input, VStack, Stack, Text, Flex, Heading } from "@chakra-ui/react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import SpacingDivider from "../components/SpacingDivider";

const MyPage = () => {
  const { userId } = useParams();
  const [userName, setUserName] = useState("");
  const [userIcon, setUserIcon] = useState("");
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingIcon, setIsEditingIcon] = useState(false);

  useEffect(() => {
    const db = getFirestore();
    const fetchData = async () => {
      const docRef = doc(db, "users", userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUserName(docSnap.data().name);
        setUserIcon(docSnap.data().icon);
      }
    };

    fetchData();
  }, [userId]);

  const updateUserInfo = async (field, value) => {
    const db = getFirestore();
    const docRef = doc(db, "users", getAuth().currentUser.uid);
    await updateDoc(docRef, { [field]: value });

    if (field === "name") {
      setUserName(value);
      setIsEditingName(false);
    } else if (field === "icon") {
      setUserIcon(value);
      setIsEditingIcon(false);
    }
  };

  return (
    <>
    <Box mt={5} ml={5}>
      <Heading as='h2' size='xl'> My Page </Heading>
    </Box>
    <SpacingDivider />
    <Flex direction="column" align="center" justify="center" m={5}>
      <Box mb={5}>
        <Image borderRadius="full" boxSize="150px" src={userIcon} alt={userName} />
        {isEditingIcon && (
          <Input
            value={userIcon}
            onChange={(e) => setUserIcon(e.target.value)}
            onBlur={() => updateUserInfo("icon", userIcon)}
          />
        )}
        <Button onClick={() => setIsEditingIcon(!isEditingIcon)}>
          Edit Icon
        </Button>
      </Box>
      <Box>
        {!isEditingName ? (
          <Stack spacing={1} align="center">
            <Text fontSize="2xl">{userName}</Text>
            <Button size="sm" onClick={() => setIsEditingName(true)}>
              Edit Name
            </Button>
          </Stack>
        ) : (
          <VStack spacing={2}>
            <Input
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              onBlur={() => updateUserInfo("name", userName)}
            />
            <Button size="sm" onClick={() => setIsEditingName(false)}>
              Done
            </Button>
          </VStack>
        )}
      </Box>
    </Flex>
    </>
  );
};

export default MyPage;
