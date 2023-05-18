import Header from '../components/Header';
import Footer from '../components/Footer';
import VideoList from '../components/VideoList';
import SortModal from '../components/SortModal';

export default function Root() {
  return (
    <>
      <Header />
      <SortModal />
      <VideoList />
      <Footer />
    </>
  );
}