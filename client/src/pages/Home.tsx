import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Projects } from '@/components/Projects';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { SpotifyPlayer, MobileSpotifyPlayer } from '@/components/SpotifyPlayer';
import { LanguageToggle } from '@/components/LanguageToggle';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-pixel text-primary">Pixel Dreams</h1>
            <div className="flex items-center gap-2">
              <LanguageToggle />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main id="main" className="pt-16">
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>

      <Footer />

      {/* Spotify Players */}
      <SpotifyPlayer />
      <MobileSpotifyPlayer />
    </div>
  );
}
