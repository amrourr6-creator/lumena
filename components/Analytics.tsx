import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, Legend } from 'recharts';
import { TrendingUp, Clock, Target, Zap, Award } from 'lucide-react';

interface Props {
  lang: 'en' | 'ar';
}

const Analytics: React.FC<Props> = ({ lang }) => {
  // Mock Data
  const weeklyData = [
    { name: lang === 'ar' ? 'السبت' : 'Sat', hours: 4, efficiency: 65 },
    { name: lang === 'ar' ? 'الأحد' : 'Sun', hours: 6, efficiency: 75 },
    { name: lang === 'ar' ? 'الاثنين' : 'Mon', hours: 3, efficiency: 85 },
    { name: lang === 'ar' ? 'الثلاثاء' : 'Tue', hours: 5, efficiency: 60 },
    { name: lang === 'ar' ? 'الأربعاء' : 'Wed', hours: 7, efficiency: 90 },
    { name: lang === 'ar' ? 'الخميس' : 'Thu', hours: 4, efficiency: 70 },
    { name: lang === 'ar' ? 'الجمعة' : 'Fri', hours: 2, efficiency: 50 },
  ];

  const subjectData = [
    { name: lang === 'ar' ? 'الرياضيات' : 'Math', value: 35 },
    { name: lang === 'ar' ? 'العلوم' : 'Science', value: 25 },
    { name: lang === 'ar' ? 'التاريخ' : 'History', value: 20 },
    { name: lang === 'ar' ? 'اللغات' : 'Languages', value: 20 },
  ];

  const COLORS = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444'];

  const t = {
    title: lang === 'ar' ? 'تحليلات الأداء' : 'Performance Analytics',
    subtitle: lang === 'ar' ? 'تتبع تقدمك وعاداتك الدراسية' : 'Track your progress and study habits',
    weeklyActivity: lang === 'ar' ? 'النشاط الأسبوعي' : 'Weekly Activity',
    subjectDist: lang === 'ar' ? 'توزيع المواد' : 'Subject Distribution',
    focusScore: lang === 'ar' ? 'درجة التركيز' : 'Focus Score',
    totalHours: lang === 'ar' ? 'إجمالي الساعات' : 'Total Hours',
    tasksDone: lang === 'ar' ? 'المهام المنجزة' : 'Tasks Done',
    streak: lang === 'ar' ? 'أيام متتالية' : 'Day Streak',
    goals: lang === 'ar' ? 'الأهداف مقابل الواقع' : 'Goals vs Reality'
  };

  return (
    <div className="space-y-6 animate-fade-in pb-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{t.title}</h2>
          <p className="text-slate-500 dark:text-slate-400">{t.subtitle}</p>
        </div>
        <div className="flex space-x-2 bg-white dark:bg-dark-800 p-1 rounded-lg border border-slate-200 dark:border-dark-700">
           <button className="px-3 py-1 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 text-sm font-medium rounded-md shadow-sm">
             {lang === 'ar' ? 'أسبوعي' : 'Weekly'}
           </button>
           <button className="px-3 py-1 text-slate-500 dark:text-slate-400 text-sm font-medium hover:bg-slate-50 dark:hover:bg-dark-700 rounded-md transition-colors">
             {lang === 'ar' ? 'شهري' : 'Monthly'}
           </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-dark-900 p-6 rounded-xl border border-slate-200 dark:border-dark-700 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50 dark:bg-indigo-900/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
          <div className="relative z-10">
            <div className="flex items-center space-x-2 mb-2">
              <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg">
                <Clock size={18} />
              </div>
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400">{t.totalHours}</span>
            </div>
            <div className="text-3xl font-bold text-slate-900 dark:text-white">32.5h</div>
            <span className="text-xs text-green-500 font-medium">↑ 12% {lang === 'ar' ? 'من الأسبوع الماضي' : 'vs last week'}</span>
          </div>
        </div>

        <div className="bg-white dark:bg-dark-900 p-6 rounded-xl border border-slate-200 dark:border-dark-700 shadow-sm relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 dark:bg-emerald-900/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
           <div className="relative z-10">
            <div className="flex items-center space-x-2 mb-2">
              <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-lg">
                <Target size={18} />
              </div>
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400">{t.tasksDone}</span>
            </div>
            <div className="text-3xl font-bold text-slate-900 dark:text-white">142</div>
            <span className="text-xs text-green-500 font-medium">↑ 5% {lang === 'ar' ? 'من الأسبوع الماضي' : 'vs last week'}</span>
          </div>
        </div>

        <div className="bg-white dark:bg-dark-900 p-6 rounded-xl border border-slate-200 dark:border-dark-700 shadow-sm relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-24 h-24 bg-amber-50 dark:bg-amber-900/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
           <div className="relative z-10">
            <div className="flex items-center space-x-2 mb-2">
              <div className="p-2 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-lg">
                <Zap size={18} />
              </div>
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400">{t.focusScore}</span>
            </div>
            <div className="text-3xl font-bold text-slate-900 dark:text-white">88%</div>
            <span className="text-xs text-slate-500 font-medium">{lang === 'ar' ? 'مستوى ممتاز!' : 'Excellent level!'}</span>
          </div>
        </div>

        <div className="bg-white dark:bg-dark-900 p-6 rounded-xl border border-slate-200 dark:border-dark-700 shadow-sm relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-24 h-24 bg-rose-50 dark:bg-rose-900/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
           <div className="relative z-10">
            <div className="flex items-center space-x-2 mb-2">
              <div className="p-2 bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-lg">
                <Award size={18} />
              </div>
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400">{t.streak}</span>
            </div>
            <div className="text-3xl font-bold text-slate-900 dark:text-white">12</div>
            <span className="text-xs text-rose-500 font-medium">{lang === 'ar' ? 'أيام متتالية' : 'Days in a row'} 🔥</span>
          </div>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-dark-900 p-6 rounded-xl border border-slate-200 dark:border-dark-700 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <TrendingUp size={20} className="text-primary-600" />
              {t.weeklyActivity}
            </h3>
          </div>
          <div className="h-80 w-full" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <Tooltip 
                  contentStyle={{borderRadius: '8px', border: 'none', backgroundColor: '#1e293b', color: '#fff'}}
                />
                <Area type="monotone" dataKey="hours" stroke="#4f46e5" fillOpacity={1} fill="url(#colorHours)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-dark-900 p-6 rounded-xl border border-slate-200 dark:border-dark-700 shadow-sm">
          <h3 className="font-bold text-slate-900 dark:text-white mb-6">{t.subjectDist}</h3>
          <div className="h-64 w-full relative" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={subjectData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {subjectData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{borderRadius: '8px', border: 'none', backgroundColor: '#1e293b', color: '#fff'}} />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                 <span className="block text-2xl font-bold text-slate-800 dark:text-white">4</span>
                 <span className="text-xs text-slate-500">{lang === 'ar' ? 'مواد' : 'Subjects'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;