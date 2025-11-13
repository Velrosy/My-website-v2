import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';
import { Code, Palette, Sparkles, Zap } from 'lucide-react';
import aboutSprite from '@assets/generated_images/About_section_typing_sprite_18a9e48f.png';

export function About() {
  const { t } = useTranslation();

  const skills = [
    { name: 'React & TypeScript', icon: Code, color: 'bg-chart-1/20 text-chart-1 border-chart-1/30' },
    { name: 'Pixel Art', icon: Palette, color: 'bg-chart-2/20 text-chart-2 border-chart-2/30' },
    { name: 'UI/UX Design', icon: Sparkles, color: 'bg-chart-3/20 text-chart-3 border-chart-3/30' },
    { name: 'Web Animation', icon: Zap, color: 'bg-chart-4/20 text-chart-4 border-chart-4/30' },
  ];

  const timeline = [
    { year: '2020', event: 'Started Web Development' },
    { year: '2021', event: 'Discovered Pixel Art' },
    { year: '2022', event: 'Combined Passions' },
    { year: '2023', event: 'Building Dream Projects' },
  ];

  return (
    <section id="about" className="py-20 md:py-32 bg-card/30">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold font-heading text-center mb-16">
          {t('about.title')}
        </h2>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Typing Character */}
          <div className="flex items-center justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <img
                src={aboutSprite}
                alt={t('about.altTypingCharacter')}
                className="pixelated w-full h-full object-contain"
                style={{
                  animation: 'typing-animation 1.5s steps(3) infinite',
                }}
              />
            </div>
          </div>

          {/* Right: Bio, Skills, Timeline */}
          <div className="space-y-8">
            {/* Bio */}
            <p className="text-lg text-foreground leading-relaxed">
              {t('about.bio')}
            </p>

            {/* Skills */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold font-heading flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                {t('about.skillsTitle')}
              </h3>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill) => (
                  <Badge
                    key={skill.name}
                    variant="outline"
                    className={`px-4 py-2 text-sm font-medium hover-elevate transition-all duration-300 hover:scale-105 ${skill.color}`}
                    data-testid={`badge-skill-${skill.name.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <skill.icon className="w-4 h-4 mr-2" />
                    {skill.name}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold font-heading">
                {t('about.timelineTitle')}
              </h3>
              <div className="space-y-3">
                {timeline.map((item, index) => (
                  <div
                    key={item.year}
                    className="flex items-center gap-4 hover-elevate rounded-md p-3 transition-all"
                    data-testid={`timeline-item-${index}`}
                  >
                    <div className="w-16 h-16 rounded-md bg-primary/10 flex items-center justify-center pixelated border-2 border-primary/20">
                      <span className="text-xs font-pixel text-primary">{item.year}</span>
                    </div>
                    <p className="text-foreground font-medium">{item.event}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes typing-animation {
          0% { background-position: 0 0; }
          100% { background-position: -480px 0; }
        }
      `}</style>
    </section>
  );
}
