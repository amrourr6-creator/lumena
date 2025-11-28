import React from 'react';
import { LayoutDashboard, BookOpen, MessageSquare, PieChart, Users, Settings, Crown, LogOut, CalendarClock, Moon, Sun, Languages } from 'lucide-react';
import { Language } from '../types';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
  lang: Language;
  setLang: (l: Language) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
  labels: any;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  activeTab, 
  setActiveTab, 
  isMobileOpen, 
  setIsMobileOpen,
  lang,
  setLang,
  darkMode,
  toggleDarkMode,
  labels
}) => {
  
  const menuItems = [
    { id: 'dashboard', label: labels.dashboard, icon: LayoutDashboard },
    { id: 'courses', label: labels.courses, icon: BookOpen },
    { id: 'study-planner', label: labels.planner, icon: CalendarClock },
    { id: 'ai-tutor', label: labels.tutor, icon: MessageSquare },
    { id: 'messages', label: labels.messages, icon: MessageSquare },
    { id: 'analytics', label: labels.analytics, icon: PieChart },
    { id: 'community', label: labels.community, icon: Users },
  ];

  const handleNav = (id: string) => {
    setActiveTab(id);
    setIsMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside className={`
        fixed top-0 ${lang === 'ar' ? 'right-0 border-l' : 'left-0 border-r'} z-30 h-screen w-64 
        bg-white dark:bg-dark-900 border-slate-200 dark:border-dark-700 transition-transform duration-300 ease-in-out
        ${isMobileOpen ? 'translate-x-0' : (lang === 'ar' ? 'translate-x-full' : '-translate-x-full')} md:translate-x-0 md:static
      `}>
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="h-16 flex items-center px-6 border-b border-slate-100 dark:border-dark-700">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center mx-2">
              <span className="text-white font-bold text-lg">L</span>
            </div>
            <span className="text-xl font-bold text-slate-800 dark:text-white">Lumina</span>
          </div>

          {/* Controls */}
          <div className="px-4 py-4 flex gap-2">
             <button 
               onClick={toggleDarkMode}
               className="flex-1 flex items-center justify-center p-2 rounded-lg bg-slate-100 dark:bg-dark-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-dark-700 transition-colors"
             >
               {darkMode ? <Sun size={18} /> : <Moon size={18} />}
             </button>
             <button 
               onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
               className="flex-1 flex items-center justify-center p-2 rounded-lg bg-slate-100 dark:bg-dark-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-dark-700 transition-colors font-bold"
             >
               <Languages size={18} className="mr-2" />
               {lang === 'en' ? 'AR' : 'EN'}
             </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors
                    ${isActive 
                      ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400' 
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-dark-800 hover:text-slate-900 dark:hover:text-slate-200'
                    }`}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Premium Banner */}
          <div className="p-4">
            <div className="bg-gradient-to-r from-primary-600 to-primary-500 rounded-xl p-4 text-white shadow-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Crown size={20} className="text-yellow-300" />
                <span className="font-bold text-sm">{labels.premium}</span>
              </div>
              <p className="text-xs text-primary-100 mb-3">{labels.premiumDesc}</p>
              <button className="w-full py-2 bg-white text-primary-600 text-xs font-bold rounded-lg hover:bg-primary-50 transition-colors">
                {labels.upgrade}
              </button>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="p-4 border-t border-slate-100 dark:border-dark-700 space-y-1">
            <button className="w-full flex items-center space-x-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-sm font-medium rounded-lg hover:bg-slate-50 dark:hover:bg-dark-800">
              <Settings size={20} />
              <span>{labels.settings}</span>
            </button>
            <button className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:text-red-700 text-sm font-medium rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20">
              <LogOut size={20} />
              <span>{labels.logout}</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
