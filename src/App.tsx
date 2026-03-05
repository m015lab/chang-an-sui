import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { Layout } from './components/Layout';
import { AppHeader } from './components/AppHeader';
import { BottomTabBar, Tab } from './components/BottomTabBar';
import { TodayCalendar } from './components/TodayCalendar';
import { CalendarConverter } from './components/CalendarConverter';
import { SettingsMenu } from './components/SettingsMenu';
import { LanguageProvider } from './context/LanguageContext';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('today');

  return (
    <LanguageProvider>
      <Layout>
        <AppHeader />
        
        <div className="flex-1 relative overflow-hidden flex flex-col">
          <AnimatePresence mode="wait">
            {activeTab === 'today' && <TodayCalendar key="today" />}
            {activeTab === 'convert' && <CalendarConverter key="convert" />}
            {activeTab === 'settings' && <SettingsMenu key="settings" />}
          </AnimatePresence>
        </div>

        <BottomTabBar activeTab={activeTab} onTabChange={setActiveTab} />
      </Layout>
    </LanguageProvider>
  );
}
