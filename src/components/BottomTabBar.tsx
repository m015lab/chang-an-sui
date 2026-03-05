import { Calendar, Repeat, Settings } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useLanguage } from '../context/LanguageContext';

export type Tab = 'today' | 'convert' | 'settings';

interface BottomTabBarProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export function BottomTabBar({ activeTab, onTabChange }: BottomTabBarProps) {
  const { t } = useLanguage();
  const tabs = [
    { id: 'today', label: t('today'), icon: Calendar },
    { id: 'convert', label: t('convert'), icon: Repeat },
    { id: 'settings', label: t('settings'), icon: Settings },
  ] as const;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-nav-bg text-paper pb-8 pt-4 px-12 rounded-t-3xl shadow-[0_-4px_20px_rgba(0,0,0,0.15)] flex justify-between items-end z-50 border-t border-white/10 max-w-md mx-auto">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={twMerge(
              'flex flex-col items-center justify-center gap-1.5 w-16 group transition-colors',
              isActive ? 'text-nav-active' : 'text-nav-inactive hover:text-white'
            )}
          >
            <Icon
              size={26}
              className={twMerge(
                'group-hover:scale-110 transition-transform',
                isActive && 'fill-current'
              )}
            />
            <span className="text-[11px] font-medium tracking-wide">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
