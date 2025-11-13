import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

export function LanguageToggle() {
  const { i18n, t } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleLanguage}
      aria-label={t('aria.languageToggle')}
      data-testid="button-language-toggle"
      className="hover-elevate active-elevate-2"
    >
      <Globe className="h-5 w-5" />
      <span className="sr-only">{i18n.language === 'en' ? 'AR' : 'EN'}</span>
    </Button>
  );
}
