import { useTranslation } from 'react-i18next';
import { LanguageToggle } from './LanguageToggle';
import { ThemeToggle } from './ThemeToggle';

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="py-8 bg-card/50 border-t">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground text-center sm:text-left">
            {t('footer.credits')}
          </p>
          
          <div className="flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </footer>
  );
}
