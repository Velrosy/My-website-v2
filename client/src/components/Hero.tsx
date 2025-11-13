import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { FloatingParticles } from './FloatingParticles';
import heroSprite from '@assets/generated_images/Hero_character_sprite_sheet_3f1b18f1.png';
import hero1x from '@assets/generated_images/Hero_character_1x_static_7aef0bdd.png';

export function Hero() {
  const { t } = useTranslation();

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-primary/5 to-accent/10"
    >
      <FloatingParticles count={15} />
      
      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          {/* Left: Text Content (60%) */}
          <div className="lg:col-span-3 space-y-6 text-center lg:text-left">
            <div className="space-y-4">
              <p className="text-lg md:text-xl text-muted-foreground font-heading">
                {t('hero.greeting')}
              </p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent" style={{ fontFamily: 'Poppins, Inter, sans-serif' }}>
                {t('hero.name')}
              </h1>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground" style={{ fontFamily: 'Poppins, Inter, sans-serif' }}>
                {t('hero.title')}
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0">
                {t('hero.subtitle')}
              </p>
            </div>

            <div className="flex gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                onClick={scrollToContact}
                data-testid="button-hero-cta"
                className="animate-pulse-gentle text-lg px-8 py-6 hover-elevate active-elevate-2"
              >
                {t('hero.cta')}
              </Button>
            </div>
          </div>

          {/* Right: Animated Character (40%) */}
          <div className="lg:col-span-2 flex items-center justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              {/* Character with float animation */}
              <img
                src={hero1x}
                alt={t('hero.altHeroCharacter')}
                className="pixelated w-full h-full object-contain animate-float drop-shadow-2xl"
                loading="eager"
              />
              {/* Pixel shadow */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-4 bg-foreground/10 rounded-full blur-sm" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full" />
        </div>
      </div>
    </section>
  );
}
