import { useState } from "react";
import { Text, Heading, Box, Alert, AlertIcon, List, ListItem, ListIcon } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import ImageUploader from '../components/ImageUploader';
import EditWand from '../components/EditWand';
import SelectedFilePreview from "../components/SelectedFilePreview";
import VideoDescriptionInput from "../components/VideoDescriptionInput";
import VideoTitleInput from "../components/VideoTitleInput";
import SpacingDivider from "../components/SpacingDivider";
import SelectedVideoTag from "../components/SelectedVideoTag";

const UploadVideoPage = () => {
  const [formData, setFormData] = useState({
    fileSelected: null,
    previewSrc: null,
    videoTitle: '',
    videoDescription: '',
    wandSpells: null,
    // perks: null,
    videoTag: null,
  });
  const [wandSpells, setWandSpells] = useState([]);
  const [videoTag, setVideoTag] = useState([]);

  const LimitMessage = () => (
    <Box my="4">
      <Alert status="info" borderRadius="md">
        <AlertIcon />
        <Text>
          Only <strong>.gif</strong> files are allowed for upload.
          The maximum file size is <strong>20MB</strong>.
        </Text>
      </Alert>
    </Box>
  );

  const HowToEditWand = () => (
    <Box my="4">
      <Heading as='h4' size='md'> Edit Wand </Heading>
      <List spacing={3} my={2}>
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="green.500" />
          Spell Add: Click on a spell to add it to the box below.
        </ListItem>
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="green.500" />
          Spell Order: Change the order of added spells by dragging them around.
        </ListItem>
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="green.500" />
          Spell Delete: Press the "X" button in the top right to remove a spell.
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <Heading as='h2' size='xl'> Upload Video </Heading>
      <SpacingDivider />
      <Heading as='h4' size='md'> Your ScreenShot </Heading>
      <Text>
        The screenshot is under <strong>UserProfile%\AppData\LocalLow\Nolla_Games_Noita\save_rec\screenshots_animated</strong>. <br />
        (In Windows, %UserProfile% would be "<strong>C:\Users\username</strong>"etc.)
      </Text>
      <LimitMessage />
      <SelectedFilePreview setFormData={setFormData} formData={formData} />
      <Heading as='h4' size='md'> Title & Description </Heading>
      <VideoTitleInput setFormData={setFormData} formData={formData} />
      <VideoDescriptionInput setFormData={setFormData} formData={formData} />
      <Heading as='h4' size='md'> Tags </Heading>
      <SelectedVideoTag videoTag={videoTag} setVideoTag={setVideoTag} />
      <HowToEditWand />
      <EditWand wandSpells={wandSpells} setWandSpells={setWandSpells}/>
      {/* <EditWand perks={perks} setPerks={setPerks} /> */}
      <ImageUploader
        formData={formData}
        setFormData={setFormData}
        wandSpells={wandSpells}
        videoTag={videoTag}
        setWandSpells={setWandSpells}
        setVideoTag={setVideoTag}
      />
    </>
  );
}

export default UploadVideoPage;
