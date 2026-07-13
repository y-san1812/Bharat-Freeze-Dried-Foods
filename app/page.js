import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhyBFF from './components/WhyBFF';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import HomeFeatureStrip from './components/HomeFeatureStrip';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <HomeFeatureStrip />
      <WhyBFF />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
