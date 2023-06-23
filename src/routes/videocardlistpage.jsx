import { useState } from "react";
import VideoCardList from '../components/VideoCardList';
import FilterModal from '../components/FilterModal';
import SpacingDivider from "../components/SpacingDivider";
import SelectedVideoTag from "../components/SelectedVideoTag";
import SearchButton from "../components/SearchButton";
import ModeSelector from "../components/ModeSelector";
import DisplaySpellIcons from "../components/DisplaySpellIcons";

const VideoListPage = () => {
  const [selectedSpells, setSelectedSpells] = useState([]);
  const [selectedSpellsMode, setSelectedSpellsMode] = useState("OR");
  const [videoTag, setVideoTag] = useState([]);
  const [videoTagMode, setVideoTagMode] = useState("OR");
  const [search, setSearch] = useState(true);

  console.log("videoTag: ", videoTag);

  return (
    <>
      <FilterModal setSelectedSpells={setSelectedSpells}/>
      <DisplaySpellIcons spells={selectedSpells} />
      <ModeSelector mode={selectedSpellsMode} setMode={setSelectedSpellsMode} />
      <SelectedVideoTag videoTag={videoTag} setVideoTag={setVideoTag} />
      <ModeSelector mode={videoTagMode} setMode={setVideoTagMode} />
      <SearchButton setSearch={setSearch} />
      <SpacingDivider />
      <VideoCardList
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