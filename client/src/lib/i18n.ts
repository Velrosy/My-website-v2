import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Initialize i18n with empty resources first
i18n
  .use(initReactI18next)
  .init({
    resources: {},
    lng: localStorage.getItem('language') || 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

// Load translations asynchronously
const loadTranslations = async () => {
  try {
    const [enResponse, arResponse] = await Promise.all([
      fetch('/locales/en/translation.json'),
      fetch('/locales/ar/translation.json'),
    ]);
    
    const [enData, arData] = await Promise.all([
      enResponse.json(),
      arResponse.json(),
    ]);
    
    i18n.addResourceBundle('en', 'translation', enData, true, true);
    i18n.addResourceBundle('ar', 'translation', arData, true, true);
    
    // Re-render with loaded translations
    i18n.changeLanguage(i18n.language);
  } catch (error) {
    console.error('Failed to load translations:', error);
  }
};

// Load translations immediately
loadTranslations();

// Update document direction when language changes
i18n.on('languageChanged', (lng) => {
  document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.lang = lng;
  localStorage.setItem('language', lng);
});

// Set initial direction
document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
document.documentElement.lang = i18n.language;

export default i18n;
