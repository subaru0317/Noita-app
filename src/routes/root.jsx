import Header from '../components/Header';
import Footer from '../components/Footer';
import VideoList from '../components/VideoList';
import FilterModal from '../components/FilterModal';
import ImageUploader from '../components/ImageUploader';

export default function Root() {
  return (
    <>
      <Header />
      <ImageUploader />
      <FilterModal />
      <VideoList />
      <Footer />
    </>
  );
}