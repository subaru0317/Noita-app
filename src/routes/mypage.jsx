import React, { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Button,
  Input,
  VStack,
  Stack,
  Text,
  Flex,
  Heading,
  IconButton,
  useColorModeValue,
  Center,
  HStack,
  Tooltip,
  FormControl,
  FormErrorMessage,
  CircularProgress,
  useToast,
} from "@chakra-ui/react";
import { BiUser, BiEditAlt, BiTrash } from "react-icons/bi";
import { useParams } from "react-router-dom";
import { onAuthStateChanged, updateProfile, deleteUser } from "firebase/auth";
import { httpsCallable } from "firebase/functions";
import SpacingDivider from "../components/SpacingDivider";
import { auth, db, functions } from "../firebase";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";

const EditUserName = ({ newUserName, setNewUserName }) => (
  <VStack spacing={2}>
    <HStack>
      <Tooltip hasArrow label="Enter a display name for use on this website." fontSize="md" placement="top">
        <span>
          <BiUser size="24px" />
        </span>
      </Tooltip>
      <FormControl>
        <Input
          value={newUserName}
          onChange={(e) => {
            setNewUserName(e.target.value);
          }}
        />
      </FormControl>
    </HStack>
  </VStack>
);

const EditProfile = ({ handleCancelClick, handleSaveClick }) => {
  const { userId } = useParams();
  const toast = useToast();
  const [newUserName, setNewUserName] = useState("")

  const updateUserInfo = async () => {
    try {
      let updateData = {};
      if (newUserName.trim() !== "") {
        updateData["displayName"] = newUserName;
        updateData["userName"] = newUserName;
      }
      if (Object.keys(updateData).length > 0) {
        await updateProfile(auth.currentUser, updateData);

        const userRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(userRef, updateData);

        // Call Firebase Function to update comments
        const updateUserComments = httpsCallable(functions, "updateUserComments");
        updateUserComments({
          userId: auth.currentUser.uid,
          newDisplayName: newUserName,
        }).then((result) => {
          console.log(result.data.result); // "User comments updated successfully"
        });
      }

      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user info:", error);
      toast({
        title: "Error updating user info.",
        description: error.message, // This displays the error message from Firebase
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
      });
    } finally {
      handleCancelClick(); // Call handleCancelClick to reset to the previous state
    }
  };
  return (
    <>
      <Flex direction="column" align="center" p={6}>
        <Box align="center">
          <Avatar size="md" src={auth.currentUser.photoURL} />
        </Box>
        <Box mt={5}>
          <EditUserName
            newUserName={newUserName}
            setNewUserName={setNewUserName}
          />
        </Box>
      </Flex>
      <Box p={6}>
        <HStack spacing={3} justify="flex-end">
          <Button size="sm" onClick={handleCancelClick}>Cancel</Button>
          <Button size="sm" colorScheme="blue" onClick={updateUserInfo}>Save changes</Button>
        </HStack>
      </Box>
    </>
  );
}

const DisplayProfile = ({ currentUserName, handleEditClick }) => (
  <>
    <Flex direction="column" align="center" p={6}>
      <Box align="center">
        <Avatar size="md" src={auth.currentUser.photoURL} />
      </Box>
      <Box mt={5}>
        <Stack spacing={1}>
          <Text fontSize="2xl">{currentUserName}</Text>
        </Stack>
      </Box>
    </Flex>
    <Box p={6}>
      <HStack spacing={3} justify="flex-end">
        <IconButton icon={<BiEditAlt />} onClick={handleEditClick} />
        {/* <IconButton icon={<BiTrash />} onClick={deleteUserClick} /> */}
      </HStack>
    </Box>
  </>
);

const UserCard = ({ currentUserName, setCurrentUserName }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleSaveClick = () => {

  }

  return (
    <Box w="400px" bg={useColorModeValue("white", "gray.900")} boxShadow={"2xl"} rounded={"md"} overflow={"hidden"} m={5}>
      {isEditing ? (
        <EditProfile
          handleCancelClick={handleCancelClick}
          handleSaveClick={handleSaveClick}
        />
      ) : (
        <DisplayProfile currentUserName={currentUserName} handleEditClick={handleEditClick} />
      )}
    </Box>
  );
};

const MyPage = () => {
  const [currentUserName, setCurrentUserName] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUserName(user.displayName);
      }
    });
  }, []);

  return (
    <>
      <Box mt={5} ml={5}>
        <Heading as="h2" size="xl">
          My Page
        </Heading>
      </Box>
      <SpacingDivider />
      <Center>
        <UserCard
          currentUserName={currentUserName}
          setCurrentUserName={setCurrentUserName}
        />
      </Center>
    </>
  );
};

export default MyPage;
