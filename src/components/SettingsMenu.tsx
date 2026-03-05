import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export function SettingsMenu() {
  const { language, setLanguage, t } = useLanguage();
  const [showLanguages, setShowLanguages] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  const settings = [
    { id: 'language', label: t('language') },
    { id: 'about', label: t('about') },
  ];

  const languages = [
    { id: 'zh', label: '中文' },
    { id: 'ja', label: '日语' },
    { id: 'ko', label: '韩语' },
    { id: 'vi', label: '越南语' },
  ];

  return (
    <motion.main
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex-1 flex flex-col items-center justify-center px-6 pb-32 w-full max-w-md mx-auto"
    >
      <div className="w-full bg-paper rounded-[2rem] shadow-diffuse relative overflow-hidden border border-white/60 flex flex-col justify-center">
        <div className="absolute top-0 right-0 bg-gradient-to-bl from-[#EAE8E4] to-transparent opacity-30 rounded-bl-[4rem] w-24 h-24"></div>
        <div className="px-8 pt-10 pb-6">
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-ink tracking-tight">{t('settings')}</h2>
          <p className="text-xs sm:text-sm text-stone mt-1">个性化您的时空体验</p>
        </div>
        <div className="flex-1 px-8 py-2">
          <ul className="flex flex-col">
            <li className="group">
              <button 
                onClick={() => {
                  setShowLanguages(!showLanguages);
                  if (showAbout) setShowAbout(false);
                }}
                className="w-full flex items-center justify-between py-5 sm:py-6 group-active:bg-stone/5 transition-colors rounded-lg -mx-2 px-2"
              >
                <span className="text-ink font-serif font-medium text-base sm:text-lg tracking-wide">{t('language')}</span>
                <ChevronRight className={`text-stone/50 transition-transform ${showLanguages ? 'rotate-90' : ''}`} />
              </button>
              <AnimatePresence>
                {showLanguages && (
                  <motion.ul
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden bg-stone/5 rounded-lg mb-2"
                  >
                    {languages.map((lang) => (
                      <li key={lang.id}>
                        <button
                          onClick={() => setLanguage(lang.id as any)}
                          className="w-full flex items-center justify-between py-3 px-4 text-sm sm:text-base text-ink font-serif"
                        >
                          {lang.label}
                          {language === lang.id && <Check className="w-4 h-4 text-vermillion" />}
                        </button>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
              <div className="h-px w-full bg-hairline"></div>
            </li>
            <li className="group">
              <button 
                onClick={() => {
                  setShowAbout(!showAbout);
                  if (showLanguages) setShowLanguages(false);
                }}
                className="w-full flex items-center justify-between py-5 sm:py-6 group-active:bg-stone/5 transition-colors rounded-lg -mx-2 px-2"
              >
                <span className="text-ink font-serif font-medium text-base sm:text-lg tracking-wide">{t('about')}</span>
                <ChevronRight className={`text-stone/50 transition-transform ${showAbout ? 'rotate-90' : ''}`} />
              </button>
              <AnimatePresence>
                {showAbout && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden bg-stone/5 rounded-lg mb-4 p-4"
                  >
                    <p className="text-sm sm:text-base text-stone font-serif leading-relaxed text-justify">
                      {t('aboutContent')}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          </ul>
        </div>
        <div className="p-8 mt-auto">
          <div className="flex flex-col items-center justify-center gap-2 opacity-60">
            <span className="text-xs text-stone tracking-widest uppercase">Version 1.0.2</span>
            <div className="w-8 h-1 bg-stone/20 rounded-full"></div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}
