import VideoList from '../components/VideoList';
import FilterModal from '../components/FilterModal';
import { useState } from "react";
const VideoPage = () => {
  const [selectedSpells, setSelectedSpells] = useState([]);
  const [filterApplied, setFilterApplied] = useState(false);
  return (
    <>
      <FilterModal setSelectedSpells={setSelectedSpells} setFilterApplied={setFilterApplied}/>
      <VideoList selectedSpells={selectedSpells} filterApplied={filterApplied}/>
    </>
  );
}

export default VideoPage;