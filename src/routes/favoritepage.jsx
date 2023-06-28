import { useState, useEffect } from "react";
import VideoCardList from '../components/VideoCardList';
import FilterModal from '../components/FilterModal';
import SpacingDivider from "../components/SpacingDivider";
import SelectedVideoTag from "../components/SelectedVideoTag";
import SearchButton from "../components/SearchButton";
import ModeSelector from "../components/ModeSelector";
import DisplaySpellIcons from "../components/DisplaySpellIcons";
import { Box, VStack, HStack, Text, Heading } from '@chakra-ui/react';

const VideoListPage = () => {
  const [selectedSpells, setSelectedSpells] = useState([]);
  const [selectedSpellsMode, setSelectedSpellsMode] = useState("OR");
  const [videoTag, setVideoTag] = useState([]);
  const [videoTagMode, setVideoTagMode] = useState("OR");
  const [search, setSearch] = useState(false);
  const [firstRender, setFirstRender] = useState(true);

  useEffect(() => {
    if (firstRender) {
      setSearch(true);
      setFirstRender(false);
    }
  }, [firstRender]);

  return (
    <>
      <Box mt={5} ml={5}>
        <Heading as='h2' size='xl'> Favorite </Heading>
      </Box>
      <SpacingDivider />
      <VStack mt={5} ml={5} align="start" spacing={4}>
        <HStack>
          <Box flexShrink={0}>
            <FilterModal setSelectedSpells={setSelectedSpells} />
          </Box>
          <VStack align="left" flexGrow={1}>
            <DisplaySpellIcons spells={selectedSpells} />
            <ModeSelector mode={selectedSpellsMode} setMode={setSelectedSpellsMode} description={"spells"}/>
          </VStack>
        </HStack>
        <HStack>
          <Box ml="114px">
            <Text>Tags: </Text>
          </Box>
          <VStack align="left" flexGrow={1}>
            <SelectedVideoTag videoTag={videoTag} setVideoTag={setVideoTag} />
            <ModeSelector mode={videoTagMode} setMode={setVideoTagMode} description={"tags"}/>
          </VStack>
        </HStack>
        <Box display="flex" justifyContent="flex-end" width="95%">
          <SearchButton setSearch={setSearch} />
        </Box>
      </VStack>
      <SpacingDivider />
      <VideoCardList
        videoCardMode={"normal"}
        fetchMode={"userLiked"}
        selectedSpells={selectedSpells}
        selectedSpellsMode={selectedSpellsMode}
        videoTag={videoTag}
        videoTagMode={videoTagMode}
        search={search}
        setSearch={setSearch}
      />
    </>
  );
}

export default VideoListPage;