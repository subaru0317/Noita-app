import Header from '../components/Header';
import Footer from '../components/Footer';
import VideoList from '../components/VideoList';
import FilterModal from '../components/FilterModal';
import ImageUploader from '../components/ImageUploader';
import SetWand from "../components/SetWand";

export default function Root() {
  return (
    <>
      <Header />
      <ImageUploader />
      <SetWand />
      <FilterModal />
      <VideoList />
      <Footer />
    </>
  );
}