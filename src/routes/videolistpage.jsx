import VideoCardList from '../components/VideoCardList';
import FilterModal from '../components/FilterModal';
import SpacingDivider from "../components/SpacingDivider";
import SelectedVideoTag from "../components/SelectedVideoTag";
import { useState } from "react";
const VideoListPage = () => {
  const [selectedSpells, setSelectedSpells] = useState([]);
  const [filterMode, setFilterMode] = useState("OR");
  const [videoTag, setVideoTag] = useState([]);
  return (
    <>
      <FilterModal setSelectedSpells={setSelectedSpells} setFilterMode={setFilterMode}/>
      <SelectedVideoTag videoTag={videoTag} setVideoTag={setVideoTag} />
      <SpacingDivider />
      <VideoCardList selectedSpells={selectedSpells} filterMode={filterMode}/>
    </>
  );
}

export default VideoListPage;