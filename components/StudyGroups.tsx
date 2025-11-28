import React, { useState } from 'react';
import { Users, Search, Plus, UserPlus, Check, MessageSquare, Tag, Video } from 'lucide-react';

interface Props {
  lang: 'en' | 'ar';
}

interface Group {
  id: string;
  name: string;
  description: string;
  members: number;
  subject: string;
  image: string;
  isJoined: boolean;
  activeNow?: boolean;
}

const StudyGroups: React.FC<Props> = ({ lang }) => {
  const [groups, setGroups] = useState<Group[]>([
    {
      id: '1',
      name: lang === 'ar' ? 'أبطال التفاضل' : 'Calculus Heroes',
      description: lang === 'ar' ? 'نذاكر للامتحانات النصفية معاً. تركيز على الفصل 4 و 5.' : 'Studying for midterms together. Focus on Ch 4 & 5.',
      members: 124,
      subject: lang === 'ar' ? 'رياضيات' : 'Math',
      image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=400&auto=format&fit=crop',
      isJoined: false,
      activeNow: true
    },
    {
      id: '2',
      name: lang === 'ar' ? 'مجموعة الفيزياء الكمية' : 'Quantum Physics Squad',
      description: lang === 'ar' ? 'مناقشات متقدمة وحل مسائل أسبوعي.' : 'Advanced discussions and weekly problem solving.',
      members: 56,
      subject: lang === 'ar' ? 'فيزياء' : 'Physics',
      image: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?q=80&w=400&auto=format&fit=crop',
      isJoined: true,
      activeNow: false
    },
    {
      id: '3',
      name: lang === 'ar' ? 'عشاق التاريخ' : 'History Buffs',
      description: lang === 'ar' ? 'مشاركة الملاحظات حول الحرب العالمية الثانية.' : 'Sharing notes on WWII and Cold War eras.',
      members: 89,
      subject: lang === 'ar' ? 'تاريخ' : 'History',
      image: 'https://images.unsplash.com/photo-1447069387593-a5de0862481e?q=80&w=400&auto=format&fit=crop',
      isJoined: false,
      activeNow: true
    },
    {
      id: '4',
      name: lang === 'ar' ? 'مطورين جافا سكريبت' : 'JS Developers',
      description: lang === 'ar' ? 'نتعلم React و Node.js من الصفر.' : 'Learning React and Node.js from scratch.',
      members: 230,
      subject: lang === 'ar' ? 'برمجة' : 'Coding',
      image: 'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?q=80&w=400&auto=format&fit=crop',
      isJoined: false,
      activeNow: false
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const toggleJoin = (id: string) => {
    setGroups(groups.map(g => g.id === id ? { ...g, isJoined: !g.isJoined } : g));
  };

  const filteredGroups = groups.filter(g => 
    g.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    g.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const t = {
    title: lang === 'ar' ? 'مجموعات الدراسة' : 'Study Groups',
    subtitle: lang === 'ar' ? 'انضم إلى مجتمع من الطلاب وتذاكروا معاً' : 'Join a community of students and learn together',
    create: lang === 'ar' ? 'إنشاء مجموعة' : 'Create Group',
    search: lang === 'ar' ? 'ابحث عن مجموعة...' : 'Find a group...',
    members: lang === 'ar' ? 'عضو' : 'members',
    join: lang === 'ar' ? 'انضمام' : 'Join',
    joined: lang === 'ar' ? 'منضم' : 'Joined',
    active: lang === 'ar' ? 'جلسة مباشرة الآن' : 'Live Session Now',
    video: lang === 'ar' ? 'انضم للفيديو' : 'Join Video',
  };

  return (
    <div className="space-y-6 animate-fade-in pb-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{t.title}</h2>
          <p className="text-slate-500 dark:text-slate-400">{t.subtitle}</p>
        </div>
        <button className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-md active:scale-95">
          <Plus size={20} />
          <span>{t.create}</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className={`absolute ${lang === 'ar' ? 'right-4' : 'left-4'} top-3.5 text-slate-400`} size={20} />
        <input 
          type="text" 
          placeholder={t.search}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`w-full bg-white dark:bg-dark-900 border border-slate-200 dark:border-dark-700 ${lang === 'ar' ? 'pr-12' : 'pl-12'} py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/50 dark:text-white transition-all shadow-sm`}
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGroups.map(group => (
          <div key={group.id} className="bg-white dark:bg-dark-900 rounded-xl border border-slate-200 dark:border-dark-700 overflow-hidden hover:shadow-lg transition-all duration-300 group">
            <div className="h-32 relative">
              <img src={group.image} alt={group.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors"></div>
              <div className="absolute top-3 right-3">
                 <span className="bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-md border border-white/20">
                    {group.subject}
                 </span>
              </div>
              {group.activeNow && (
                 <div className="absolute bottom-3 left-3 flex items-center space-x-1.5 bg-red-500/90 text-white text-xs font-bold px-2 py-1 rounded-md animate-pulse">
                    <Video size={12} />
                    <span>{t.active}</span>
                 </div>
              )}
            </div>

            <div className="p-5">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{group.name}</h3>
              <div className="flex items-center text-xs text-slate-500 dark:text-slate-400 mb-3">
                <Users size={14} className="mr-1" />
                <span>{group.members} {t.members}</span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 mb-6 line-clamp-2 h-10">
                {group.description}
              </p>

              <div className="flex gap-3">
                {group.isJoined ? (
                    <>
                    <button className="flex-1 py-2 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-300 rounded-lg text-sm font-semibold flex items-center justify-center space-x-2 cursor-default">
                        <Check size={18} />
                        <span>{t.joined}</span>
                    </button>
                    <button className="px-3 py-2 bg-slate-100 dark:bg-dark-800 text-slate-600 dark:text-slate-400 rounded-lg hover:bg-slate-200 dark:hover:bg-dark-700 transition-colors">
                        <MessageSquare size={18} />
                    </button>
                    </>
                ) : (
                    <button 
                        onClick={() => toggleJoin(group.id)}
                        className="flex-1 py-2 bg-white dark:bg-dark-800 border border-slate-200 dark:border-dark-700 text-slate-700 dark:text-slate-200 rounded-lg text-sm font-semibold flex items-center justify-center space-x-2 hover:bg-slate-50 dark:hover:bg-dark-700 hover:border-slate-300 dark:hover:border-dark-600 transition-all"
                    >
                        <UserPlus size={18} />
                        <span>{t.join}</span>
                    </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudyGroups;