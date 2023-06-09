import VideoList from '../components/VideoList';
import FilterModal from '../components/FilterModal';
import { useState } from "react";
import { Divider } from "@chakra-ui/react";
const VideoPage = () => {
  const [selectedSpells, setSelectedSpells] = useState([]);
  const [filterMode, setFilterMode] = useState("OR");
  return (
    <>
      <FilterModal setSelectedSpells={setSelectedSpells} setFilterMode={setFilterMode}/>
      <Divider orientation='horizontal'/>
      <VideoList selectedSpells={selectedSpells} filterMode={filterMode}/>
    </>
  );
}

export default VideoPage;