import VideoList from '../components/VideoList';
import FilterModal from '../components/FilterModal';
import { useState } from "react";
const VideoPage = () => {
  const [selectedSpells, setSelectedSpells] = useState([]);
  return (
    <>
      <FilterModal setSelectedSpells={setSelectedSpells} />
      <VideoList selectedSpells={selectedSpells} />
    </>
  );
}

export default VideoPage;