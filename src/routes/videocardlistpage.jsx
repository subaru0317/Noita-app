import { useState } from "react";
import VideoCardList from '../components/VideoCardList';
import FilterModal from '../components/FilterModal';
import SpacingDivider from "../components/SpacingDivider";
import SelectedVideoTag from "../components/SelectedVideoTag";
import SearchButton from "../components/SearchButton";
import FilterModeSelector from "../components/FilterModeSelector";
import DisplaySpellIcons from "../components/DisplaySpellIcons";

const VideoListPage = () => {
  const [selectedSpells, setSelectedSpells] = useState([]);
  const [filterMode, setFilterMode] = useState("OR");
  const [videoTag, setVideoTag] = useState([]);
  const [search, setSearch] = useState(true);

  console.log("selectedSpells", selectedSpells);

  return (
    <>
      <FilterModal setSelectedSpells={setSelectedSpells}/>
      <DisplaySpellIcons spells={selectedSpells} />
      <FilterModeSelector mode={filterMode} setMode={setFilterMode} />
      <SelectedVideoTag videoTag={videoTag} setVideoTag={setVideoTag} />
      <SearchButton setSearch={setSearch} />
      <SpacingDivider />
      <VideoCardList selectedSpells={selectedSpells} filterMode={filterMode} search={search} setSearch={setSearch}/>
    </>
  );
}

export default VideoListPage;