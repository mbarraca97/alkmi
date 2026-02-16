import VideoScrollSection from './components/VideoScrollSection';
import HorizontalScrollSection from './components/HorizontalScrollSection';
import FinalSection from './components/FinalSection';

export default function Home() {
  return (
    <main className="relative">
      <VideoScrollSection />
      <HorizontalScrollSection />
      <FinalSection />
    </main>
  );
}
