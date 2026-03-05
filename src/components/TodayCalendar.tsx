import { useEffect, useState } from 'react';
import { Lunar } from 'lunar-javascript';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

export function TodayCalendar() {
  const { t } = useLanguage();
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000 * 60);
    return () => clearInterval(timer);
  }, []);

  const lunar = Lunar.fromDate(date);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const lunarMonth = lunar.getMonthInChinese();
  const lunarDay = lunar.getDayInChinese();
  const lunarYear = lunar.getYearInGanZhi();
  const lunarZodiac = lunar.getYearShengXiao();

  return (
    <motion.main
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex-1 flex flex-col items-center justify-center px-6 pb-6 w-full max-w-md mx-auto"
    >
      <div className="w-full bg-paper rounded-[2rem] shadow-diffuse relative overflow-hidden border border-white/50 flex flex-col h-auto min-h-[480px]">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#EAE8E4] to-transparent opacity-30 rounded-bl-[4rem] pointer-events-none"></div>
        <div className="flex-1 flex flex-col items-center justify-center relative py-12">
          <div className="flex flex-col items-center gap-2 mb-12">
            <div className="font-serif font-bold text-ink tracking-tight text-4xl sm:text-5xl flex items-baseline gap-1">
              <span>{year}</span>
              <span className="text-lg sm:text-xl font-bold ml-1 mr-2 text-stone/80">{t('year')}</span>
              <span>{month.toString().padStart(2, '0')}</span>
              <span className="text-lg sm:text-xl font-bold ml-1 mr-2 text-stone/80">{t('month')}</span>
              <span>{day.toString().padStart(2, '0')}</span>
              <span className="text-lg sm:text-xl font-bold ml-1 text-stone/80">{t('day')}</span>
            </div>
            <div className="w-12 h-1 bg-stone/20 rounded-full mt-4"></div>
          </div>
          <div className="flex flex-col items-center gap-6">
            <div className="writing-vertical-rl font-serif leading-none font-bold text-vermillion tracking-widest py-4 select-none text-4xl sm:text-5xl">
              {lunarMonth}月{lunarDay}
            </div>
            <div className="text-base sm:text-lg text-vermillion/80 font-serif tracking-[0.2em] mt-2 border border-vermillion/20 px-5 py-1.5 rounded-full">
              {lunarYear}{lunarZodiac}年
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}
