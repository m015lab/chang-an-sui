import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ArrowDown, ArrowRight, Loader2 } from 'lucide-react';
import { Lunar, Solar } from 'lunar-javascript';
import { BottomSheetWheelPicker } from './BottomSheetWheelPicker';
import { useLanguage } from '../context/LanguageContext';

type ConversionMode = 'solarToLunar' | 'lunarToSolar';

export function CalendarConverter() {
  const { t } = useLanguage();
  const [mode, setMode] = useState<ConversionMode>('solarToLunar');
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [isConverting, setIsConverting] = useState(false);
  const [showResult, setShowResult] = useState(false);

  // State for selected date
  const [selectedSolar, setSelectedSolar] = useState(new Date());
  const [selectedLunar, setSelectedLunar] = useState(Lunar.fromDate(new Date()));

  const handleConvert = () => {
    setIsConverting(true);
    setShowResult(false);
    
    // Simulate a brief calculation delay for UX
    setTimeout(() => {
      setIsConverting(false);
      setShowResult(true);
    }, 600);
  };

  const handleDateChange = (date: Date | Lunar) => {
    if (mode === 'solarToLunar') {
      const d = date as Date;
      setSelectedSolar(d);
      setSelectedLunar(Lunar.fromDate(d));
    } else {
      const l = date as Lunar;
      setSelectedLunar(l);
      const solar = l.getSolar();
      setSelectedSolar(new Date(solar.getYear(), solar.getMonth() - 1, solar.getDay()));
    }
  };

  return (
    <motion.main
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex-1 flex flex-col px-6 pb-32 w-full max-w-md mx-auto justify-center"
    >
      <div className="bg-[#EAE8E4] p-1 rounded-full flex w-full mb-8 shadow-inner-soft shrink-0">
        <button
          onClick={() => { setMode('solarToLunar'); setShowResult(false); }}
          className={`flex-1 py-2.5 px-4 rounded-full font-medium text-sm transition-all duration-300 tracking-wide ${
            mode === 'solarToLunar'
              ? 'bg-ink text-paper shadow-sm'
              : 'text-stone hover:text-ink'
          }`}
        >
          {t('solarToLunar')}
        </button>
        <button
          onClick={() => { setMode('lunarToSolar'); setShowResult(false); }}
          className={`flex-1 py-2.5 px-4 rounded-full font-medium text-sm transition-all duration-300 tracking-wide ${
            mode === 'lunarToSolar'
              ? 'bg-ink text-paper shadow-sm'
              : 'text-stone hover:text-ink'
          }`}
        >
          {t('lunarToSolar')}
        </button>
      </div>

      <div className="w-full bg-paper rounded-[2rem] p-8 shadow-diffuse relative overflow-hidden border border-white/50 flex flex-col justify-center h-full min-h-[480px]">
        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#EAE8E4] to-transparent opacity-30 rounded-bl-[2rem]"></div>
        
        <div className="flex flex-col flex-1 justify-center gap-10">
          <div className="flex flex-col gap-3">
            <label className="text-xs font-semibold tracking-wider text-ink uppercase ml-1 opacity-70 text-center">
              {t('selectDate')}
            </label>
            <button
              onClick={() => setIsPickerOpen(true)}
              className="bg-[#F0EEEA] rounded-2xl h-24 shadow-inner-soft flex items-center justify-center px-4 cursor-pointer hover:bg-[#ebe9e5] transition-colors border border-black/5 group relative w-full"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                {mode === 'solarToLunar' ? (
                  <div className="flex items-baseline gap-1 font-serif">
                    <div className="flex items-baseline gap-0.5">
                      <span className="text-2xl sm:text-3xl font-bold text-ink tracking-tight">{selectedSolar.getFullYear()}</span>
                      <span className="text-xs sm:text-sm text-stone/80 font-normal ml-0.5">{t('year')}</span>
                    </div>
                    <div className="flex items-baseline gap-0.5 ml-1 sm:ml-2">
                      <span className="text-2xl sm:text-3xl font-bold text-ink tracking-tight">{(selectedSolar.getMonth() + 1).toString().padStart(2, '0')}</span>
                      <span className="text-xs sm:text-sm text-stone/80 font-normal ml-0.5">{t('month')}</span>
                    </div>
                    <div className="flex items-baseline gap-0.5 ml-1 sm:ml-2">
                      <span className="text-2xl sm:text-3xl font-bold text-ink tracking-tight">{selectedSolar.getDate().toString().padStart(2, '0')}</span>
                      <span className="text-xs sm:text-sm text-stone/80 font-normal ml-0.5">{t('day')}</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-baseline gap-1 font-serif text-vermillion">
                    <span className="text-2xl sm:text-3xl font-bold tracking-tight">{selectedLunar.getYearInGanZhi()}{t('year')}</span>
                    <span className="text-2xl sm:text-3xl font-bold tracking-tight ml-1 sm:ml-2">{selectedLunar.getMonthInChinese()}{t('month')}</span>
                    <span className="text-2xl sm:text-3xl font-bold tracking-tight ml-1 sm:ml-2">{selectedLunar.getDayInChinese()}</span>
                  </div>
                )}
              </div>
              <ChevronRight className="text-stone/60 group-hover:text-vermillion transition-colors absolute right-4 top-1/2 -translate-y-1/2" />
            </button>
          </div>

          <div className="flex justify-center py-2 relative">
            <div className="absolute inset-x-0 top-1/2 h-px bg-[#EAE8E4] w-2/3 mx-auto"></div>
            <div className="relative bg-paper px-4 text-vermillion">
              <ArrowDown className="rotate-0 text-2xl" />
            </div>
          </div>

          <div className="text-center space-y-4 min-h-[100px] flex flex-col justify-center">
            <label className="text-xs font-semibold tracking-wider text-ink uppercase opacity-80">
              {mode === 'solarToLunar' ? '农历' : '公历'}日期
            </label>
            
            <AnimatePresence mode="wait">
              {showResult ? (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="py-2 flex justify-center items-center flex-col"
                >
                  {mode === 'solarToLunar' ? (
                    <>
                      <h2 className="text-4xl sm:text-5xl font-serif font-bold text-vermillion leading-tight tracking-wide">
                        {selectedLunar.getMonthInChinese()}{t('month')} {selectedLunar.getDayInChinese()}
                      </h2>
                      <p className="text-base sm:text-lg text-vermillion/80 font-serif mt-2 sm:mt-3">
                        {selectedLunar.getYearInGanZhi()}{t('year')} · {selectedLunar.getYearShengXiao()}
                      </p>
                    </>
                  ) : (
                    <div className="flex items-baseline gap-1 font-serif">
                      <div className="flex items-baseline gap-0.5">
                        <span className="text-3xl sm:text-4xl font-bold text-ink tracking-tight">{selectedSolar.getFullYear()}</span>
                        <span className="text-base sm:text-lg text-stone/80 font-normal ml-0.5">{t('year')}</span>
                      </div>
                      <div className="flex items-baseline gap-0.5 ml-1 sm:ml-2">
                        <span className="text-3xl sm:text-4xl font-bold text-ink tracking-tight">{(selectedSolar.getMonth() + 1).toString().padStart(2, '0')}</span>
                        <span className="text-base sm:text-lg text-stone/80 font-normal ml-0.5">{t('month')}</span>
                      </div>
                      <div className="flex items-baseline gap-0.5 ml-1 sm:ml-2">
                        <span className="text-3xl sm:text-4xl font-bold text-ink tracking-tight">{selectedSolar.getDate().toString().padStart(2, '0')}</span>
                        <span className="text-base sm:text-lg text-stone/80 font-normal ml-0.5">{t('day')}</span>
                      </div>
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-2 text-stone/40 font-serif text-xl sm:text-2xl"
                >
                  {t('waiting')}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="pt-8">
          <button
            onClick={handleConvert}
            disabled={isConverting}
            className="w-full bg-ink text-paper font-bold text-base sm:text-lg py-3.5 sm:py-4 rounded-xl shadow-tactile active:shadow-none active:translate-y-[4px] transition-all flex items-center justify-center gap-2 group shrink-0 disabled:opacity-80 disabled:active:translate-y-0 disabled:active:shadow-tactile"
          >
            {isConverting ? (
              <Loader2 className="animate-spin" />
            ) : (
              <>
                <span className="tracking-widest">{t('confirm')}</span>
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </div>
      </div>

      <BottomSheetWheelPicker
        isOpen={isPickerOpen}
        onClose={() => setIsPickerOpen(false)}
        mode={mode}
        selectedSolar={selectedSolar}
        selectedLunar={selectedLunar}
        onChange={handleDateChange}
      />
    </motion.main>
  );
}
