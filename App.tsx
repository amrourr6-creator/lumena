import React, { useState, useEffect } from 'react';
import { HashRouter } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import AITutor from './components/AITutor';
import CourseList from './components/CourseList';
import StudyPlanGenerator from './components/StudyPlanGenerator';
import Messages from './components/Messages';
import Analytics from './components/Analytics';
import StudyGroups from './components/StudyGroups';
import { User, Course, Task, UserRole, Language } from './types';
import { Menu, Bell, Search } from 'lucide-react';

const App: React.FC = () => {
  // Global State
  const [lang, setLang] = useState<Language>('en');
  const [darkMode, setDarkMode] = useState(false);
  
  // Effect for Dark Mode and Direction
  useEffect(() => {
    // Handle Dark Mode
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Handle Language Direction & Font
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    if (lang === 'ar') {
      document.body.classList.add('font-cairo');
    } else {
      document.body.classList.remove('font-cairo');
    }
  }, [darkMode, lang]);

  // Translations
  const translations = {
    en: {
      dashboard: 'Dashboard',
      courses: 'My Courses',
      planner: 'Study Planner',
      tutor: 'AI Tutor',
      analytics: 'Analytics',
      community: 'Study Groups',
      messages: 'Messages',
      premium: 'Go Premium',
      premiumDesc: 'Get advanced analytics & priority AI support.',
      upgrade: 'Upgrade $9.99/mo',
      settings: 'Settings',
      logout: 'Sign Out',
      searchPlaceholder: 'Search for courses, assignments, or notes...',
      underConstruction: 'Under Construction',
      comingSoon: 'This feature is coming in the next sprint!'
    },
    ar: {
      dashboard: 'لوحة التحكم',
      courses: 'دوراتي',
      planner: 'مخطط الدراسة',
      tutor: 'المعلم الذكي',
      analytics: 'التحليلات',
      community: 'مجموعات الدراسة',
      messages: 'الرسائل',
      premium: 'الترقية للمميزة',
      premiumDesc: 'احصل على تحليلات متقدمة ودعم ذكي.',
      upgrade: 'ترقية 9.99$/شهر',
      settings: 'الإعدادات',
      logout: 'تسجيل الخروج',
      searchPlaceholder: 'ابحث عن الدورات، الواجبات، أو الملاحظات...',
      underConstruction: 'قيد التطوير',
      comingSoon: 'ستتوفر هذه الميزة قريباً!'
    }
  };

  const t = translations[lang];

  // Mock Data
  const user: User = {
    id: 'u1',
    name: lang === 'ar' ? 'أحمد محمد' : 'Ahmed Mohamed',
    role: UserRole.STUDENT,
    avatar: 'https://i.pravatar.cc/300',
    isPremium: false
  };

  // Default courses that support translation
  const defaultCourses: Course[] = [
    { 
      id: 'c1', 
      title: lang === 'ar' ? 'التفاضل والتكامل المتقدم' : 'Advanced Calculus II', 
      instructor: 'Dr. Sarah Smith', 
      progress: 75, 
      nextDeadline: '2023-11-15', 
      color: 'bg-blue-600',
      image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=600&auto=format&fit=crop'
    },
    { 
      id: 'c2', 
      title: lang === 'ar' ? 'تاريخ الحضارات العالمية' : 'World History: Civilizations', 
      instructor: 'Prof. David Miller', 
      progress: 45, 
      nextDeadline: '2023-11-12', 
      color: 'bg-amber-600',
      image: 'https://images.unsplash.com/photo-1447069387593-a5de0862481e?q=80&w=600&auto=format&fit=crop'
    },
    { 
      id: 'c3', 
      title: lang === 'ar' ? 'الفيزياء التطبيقية 101' : 'Applied Physics 101', 
      instructor: 'Dr. James Brown', 
      progress: 90, 
      nextDeadline: '2023-11-18', 
      color: 'bg-emerald-600',
      image: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?q=80&w=600&auto=format&fit=crop'
    },
    { 
      id: 'c4', 
      title: lang === 'ar' ? 'مقدمة في علوم الحاسب' : 'Intro to Computer Science', 
      instructor: 'Prof. Emily Wilson', 
      progress: 30, 
      nextDeadline: '2023-11-20', 
      color: 'bg-indigo-600',
      image: 'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?q=80&w=600&auto=format&fit=crop'
    },
  ];

  // User created courses state
  const [userCourses, setUserCourses] = useState<Course[]>([]);

  // Combine default and user courses
  const allCourses = [...defaultCourses, ...userCourses];

  const handleAddCourse = (newCourse: Course) => {
    setUserCourses([...userCourses, newCourse]);
  };

  const tasks: Task[] = [
    { id: 't1', title: lang === 'ar' ? 'التحضير لاختبار التفاضل' : 'Calculus Midterm Prep', courseId: 'c1', dueDate: new Date('2023-11-15'), completed: false, type: 'EXAM' },
    { id: 't2', title: lang === 'ar' ? 'مسودة مقال التاريخ' : 'History Essay Draft', courseId: 'c2', dueDate: new Date('2023-11-12'), completed: false, type: 'ASSIGNMENT' },
    { id: 't3', title: lang === 'ar' ? 'تقرير معمل الفيزياء' : 'Physics Lab Report', courseId: 'c3', dueDate: new Date('2023-11-10'), completed: true, type: 'ASSIGNMENT' },
    { id: 't4', title: lang === 'ar' ? 'دراسة خوارزميات' : 'CS Algorithm Study', courseId: 'c4', dueDate: new Date('2023-11-20'), completed: false, type: 'STUDY_SESSION' },
  ];

  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard courses={allCourses} tasks={tasks} userName={user.name} lang={lang} />;
      case 'ai-tutor':
        return <AITutor lang={lang} />;
      case 'study-planner':
        return <StudyPlanGenerator lang={lang} />;
      case 'courses':
        return <CourseList courses={allCourses} lang={lang} onAddCourse={handleAddCourse} />;
      case 'messages':
        return <Messages lang={lang} />;
      case 'analytics':
        return <Analytics lang={lang} />;
      case 'community':
        return <StudyGroups lang={lang} />;
      default:
        return (
            <div className="flex flex-col items-center justify-center h-96 text-center animate-fade-in">
                <div className="bg-slate-100 dark:bg-dark-800 p-6 rounded-full mb-4">
                    <span className="text-4xl">🚧</span>
                </div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white">{t.underConstruction}</h3>
                <p className="text-slate-500 dark:text-slate-400 mt-2">{t.comingSoon}</p>
            </div>
        );
    }
  };

  return (
    <HashRouter>
      <div className={`flex min-h-screen bg-slate-50 dark:bg-black font-sans text-slate-900 dark:text-slate-100 ${lang === 'ar' ? 'font-cairo' : ''}`}>
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          isMobileOpen={isMobileMenuOpen}
          setIsMobileOpen={setIsMobileMenuOpen}
          lang={lang}
          setLang={setLang}
          darkMode={darkMode}
          toggleDarkMode={() => setDarkMode(!darkMode)}
          labels={t}
        />

        <main className="flex-1 flex flex-col h-screen overflow-hidden">
          {/* Top Header */}
          <header className="h-16 bg-white dark:bg-dark-900 border-b border-slate-200 dark:border-dark-700 flex items-center justify-between px-6 flex-shrink-0 z-10 transition-colors">
            <div className="flex items-center md:hidden">
              <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-dark-800 rounded-lg">
                <Menu size={24} />
              </button>
            </div>
            
            <div className="hidden md:flex items-center bg-slate-100 dark:bg-dark-800 rounded-lg px-3 py-2 w-96 transition-colors">
              <Search size={18} className="text-slate-400 mr-2" />
              <input 
                type="text" 
                placeholder={t.searchPlaceholder}
                className="bg-transparent border-none focus:outline-none text-sm w-full text-slate-700 dark:text-slate-200 placeholder:text-slate-400"
              />
            </div>

            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-dark-800 rounded-full transition-colors">
                <Bell size={20} />
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-dark-900"></span>
              </button>
              <div className={`flex items-center space-x-3 px-4 ${lang === 'ar' ? 'border-r' : 'border-l'} border-slate-200 dark:border-dark-700`}>
                <div className="hidden sm:block">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white text-right">{user.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 text-right">{user.role}</p>
                </div>
                <img 
                  src={user.avatar} 
                  alt="Profile" 
                  className="w-9 h-9 rounded-full bg-slate-200 dark:bg-dark-700 object-cover border border-slate-200 dark:border-dark-700 mx-2"
                />
              </div>
            </div>
          </header>

          {/* Main Content Area */}
          <div className="flex-1 overflow-auto p-6 relative bg-slate-50 dark:bg-black transition-colors">
            <div className="max-w-7xl mx-auto">
               {renderContent()}
            </div>
          </div>
        </main>
      </div>
    </HashRouter>
  );
};

export default App;