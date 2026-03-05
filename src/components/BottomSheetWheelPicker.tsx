import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lunar, Solar } from 'lunar-javascript';
import { useLanguage } from '../context/LanguageContext';

interface BottomSheetWheelPickerProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'solarToLunar' | 'lunarToSolar';
  selectedSolar: Date;
  selectedLunar: Lunar;
  onChange: (date: Date | Lunar) => void;
}

const ITEM_HEIGHT = 44;

function WheelColumn({ items, selectedIndex, onChange, label }: { items: string[], selectedIndex: number, onChange: (index: number) => void, label?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    if (containerRef.current && !isScrolling) {
      containerRef.current.scrollTop = selectedIndex * ITEM_HEIGHT;
    }
  }, [selectedIndex, isScrolling]);

  const handleScroll = () => {
    if (!containerRef.current) return;
    setIsScrolling(true);
    
    // Debounce scroll end
    clearTimeout(containerRef.current.dataset.scrollTimeout as any);
    containerRef.current.dataset.scrollTimeout = setTimeout(() => {
      setIsScrolling(false);
      const index = Math.round(containerRef.current!.scrollTop / ITEM_HEIGHT);
      onChange(Math.max(0, Math.min(index, items.length - 1)));
    }, 150) as any;
  };

  return (
    <div className="relative flex-1 h-[220px] overflow-hidden flex items-center justify-center">
      {/* Selection Highlight */}
      <div className="absolute top-1/2 -translate-y-1/2 w-full h-[44px] bg-stone/10 rounded-lg pointer-events-none" />
      
      <div 
        ref={containerRef}
        className="w-full h-full overflow-y-auto no-scrollbar snap-y snap-mandatory"
        onScroll={handleScroll}
        style={{ scrollBehavior: isScrolling ? 'auto' : 'smooth' }}
      >
        <div style={{ height: 220 / 2 - ITEM_HEIGHT / 2 }} />
        {items.map((item, i) => (
          <div 
            key={i} 
            className={`h-[44px] flex items-center justify-center snap-center transition-colors duration-200 ${i === selectedIndex ? 'text-ink font-bold text-base sm:text-lg' : 'text-stone/60 text-sm sm:text-base'}`}
          >
            {item}{label && <span className="text-xs ml-1 opacity-60">{label}</span>}
          </div>
        ))}
        <div style={{ height: 220 / 2 - ITEM_HEIGHT / 2 }} />
      </div>
    </div>
  );
}

export function BottomSheetWheelPicker({ isOpen, onClose, mode, selectedSolar, selectedLunar, onChange }: BottomSheetWheelPickerProps) {
  const { t } = useLanguage();
  // Generate data arrays
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - 50 + i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const lunarMonths = ['正月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '冬月', '腊月'];
  const lunarDays = ['初一', '初二', '初三', '初四', '初五', '初六', '初七', '初八', '初九', '初十', '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十', '廿一', '廿二', '廿三', '廿四', '廿五', '廿六', '廿七', '廿八', '廿九', '三十'];

  const handleSolarChange = (type: 'year' | 'month' | 'day', value: number) => {
    const newDate = new Date(selectedSolar);
    if (type === 'year') newDate.setFullYear(value);
    if (type === 'month') newDate.setMonth(value - 1);
    if (type === 'day') newDate.setDate(value);
    onChange(newDate);
  };

  const handleLunarChange = (type: 'year' | 'month' | 'day', value: number | string) => {
    // This is a simplified lunar change handler.
    // In a real app, you'd need to handle leap months and varying days in month.
    let y = selectedLunar.getYear();
    let m = selectedLunar.getMonth();
    let d = selectedLunar.getDay();

    if (type === 'year') y = value as number;
    if (type === 'month') m = value as number;
    if (type === 'day') d = value as number;

    const newLunar = Lunar.fromYmd(y, m, d);
    onChange(newLunar);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 bg-paper rounded-t-3xl z-50 pb-8 pt-4 px-6 shadow-2xl max-w-md mx-auto"
          >
            <div className="w-12 h-1.5 bg-stone/20 rounded-full mx-auto mb-6" />
            
            <div className="flex justify-between items-center mb-6">
              <button onClick={onClose} className="text-stone font-medium px-2 py-1">{t('cancel')}</button>
              <h3 className="font-serif font-bold text-lg text-ink">{t('selectDate')}</h3>
              <button onClick={onClose} className="text-vermillion font-medium px-2 py-1">{t('confirm')}</button>
            </div>

            <div className="flex gap-2 bg-[#EAE8E4]/50 rounded-2xl p-2 font-serif border border-white/50 shadow-inner-soft">
              {mode === 'solarToLunar' ? (
                <>
                  <WheelColumn 
                    items={years.map(String)} 
                    selectedIndex={years.indexOf(selectedSolar.getFullYear())} 
                    onChange={(i) => handleSolarChange('year', years[i])}
                    label={t('year')}
                  />
                  <WheelColumn 
                    items={months.map(m => m.toString().padStart(2, '0'))} 
                    selectedIndex={selectedSolar.getMonth()} 
                    onChange={(i) => handleSolarChange('month', months[i])}
                    label={t('month')}
                  />
                  <WheelColumn 
                    items={days.map(d => d.toString().padStart(2, '0'))} 
                    selectedIndex={selectedSolar.getDate() - 1} 
                    onChange={(i) => handleSolarChange('day', days[i])}
                    label={t('day')}
                  />
                </>
              ) : (
                <>
                  <WheelColumn 
                    items={years.map(y => Lunar.fromYmd(y, 1, 1).getYearInGanZhi() + t('year'))} 
                    selectedIndex={years.indexOf(selectedLunar.getYear())} 
                    onChange={(i) => handleLunarChange('year', years[i])}
                  />
                  <WheelColumn 
                    items={lunarMonths} 
                    selectedIndex={Math.abs(selectedLunar.getMonth()) - 1} 
                    onChange={(i) => handleLunarChange('month', i + 1)}
                  />
                  <WheelColumn 
                    items={lunarDays} 
                    selectedIndex={selectedLunar.getDay() - 1} 
                    onChange={(i) => handleLunarChange('day', i + 1)}
                  />
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
