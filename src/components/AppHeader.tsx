import { useLanguage } from '../context/LanguageContext';

export function AppHeader() {
  const { t } = useLanguage();
  return (
    <header className="flex items-center justify-center px-6 pt-14 pb-4 max-w-md mx-auto w-full relative shrink-0">
      <h1 className="font-serif text-xl font-bold tracking-wide text-ink">{t('title')}</h1>
    </header>
  );
}
