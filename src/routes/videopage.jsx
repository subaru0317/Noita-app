import VideoList from '../components/VideoList';
import FilterModal from '../components/FilterModal';
import { useState } from "react";
import { Divider, Box } from "@chakra-ui/react";
const VideoPage = () => {
  const [selectedSpells, setSelectedSpells] = useState([]);
  const [filterMode, setFilterMode] = useState("OR");
  return (
    <>
      <FilterModal setSelectedSpells={setSelectedSpells} setFilterMode={setFilterMode}/>
      <Box mt={4} mb={8} px={12}>
        <Divider orientation='horizontal'/>
      </Box>
      <VideoList selectedSpells={selectedSpells} filterMode={filterMode}/>
    </>
  );
}

export default VideoPage;