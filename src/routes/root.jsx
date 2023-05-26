import VideoList from '../components/VideoList';
import FilterModal from '../components/FilterModal';
export default function Root() {
  return (
    <>
      <FilterModal />
      <VideoList />
    </>
  );
}