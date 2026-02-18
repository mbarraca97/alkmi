import IntroSection from './components/IntroSection';
import VideoScrollSection from './components/VideoScrollSection';
import HorizontalScrollSection from './components/HorizontalScrollSection';
import FinalSection from './components/FinalSection';

export default function Home() {
  return (
    <main className="relative">
      <IntroSection />
      <VideoScrollSection />
      <HorizontalScrollSection />
      <FinalSection />
    </main>
  );
}
