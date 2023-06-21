import VideoCardList from '../components/VideoCardList';
import FilterModal from '../components/FilterModal';
import SpacingDivider from "../components/SpacingDivider";
import { useState } from "react";
const VideoListPage = () => {
  const [selectedSpells, setSelectedSpells] = useState([]);
  const [filterMode, setFilterMode] = useState("OR");
  return (
    <>
      <FilterModal setSelectedSpells={setSelectedSpells} setFilterMode={setFilterMode}/>
      <SpacingDivider />
      <VideoCardList selectedSpells={selectedSpells} filterMode={filterMode}/>
    </>
  );
}

export default VideoListPage;