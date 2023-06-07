import VideoList from '../components/VideoList';
import FilterModal from '../components/FilterModal';
import { useState } from "react";
const VideoPage = () => {
  const [selectedSpells, setSelectedSpells] = useState([]);
  const [filterMode, setFilterMode] = useState("OR");
  return (
    <>
      <FilterModal setSelectedSpells={setSelectedSpells} setFilterMode={setFilterMode}/>
      <VideoList selectedSpells={selectedSpells} filterMode={filterMode}/>
    </>
  );
}

export default VideoPage;