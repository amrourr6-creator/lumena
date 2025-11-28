import React from 'react';
import { Course, Task } from '../types';
import { Clock, CheckCircle2, AlertCircle, Calendar } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface DashboardProps {
  courses: Course[];
  tasks: Task[];
  userName: string;
  lang: 'en' | 'ar';
}

const Dashboard: React.FC<DashboardProps> = ({ courses, tasks, userName, lang }) => {
  const pendingTasks = tasks.filter(t => !t.completed).length;
  const completedTasks = tasks.filter(t => t.completed).length;
  
  const labels = {
    welcome: lang === 'ar' ? `أهلاً بك، ${userName}! 👋` : `Welcome back, ${userName}! 👋`,
    pendingMsg: lang === 'ar' ? `لديك ${pendingTasks} مهام قادمة اليوم.` : `You have ${pendingTasks} upcoming tasks today.`,
    studyTime: lang === 'ar' ? 'وقت الدراسة' : 'Study Time',
    completed: lang === 'ar' ? 'مكتملة' : 'Completed',
    pending: lang === 'ar' ? 'قيد الانتظار' : 'Pending',
    streak: lang === 'ar' ? 'التتابع' : 'Exam Streak',
    activity: lang === 'ar' ? 'نشاط الدراسة' : 'Study Activity',
    upNext: lang === 'ar' ? 'التالي' : 'Up Next',
    viewCal: lang === 'ar' ? 'عرض التقويم' : 'View Calendar',
    exam: lang === 'ar' ? 'امتحان' : 'Exam',
    hw: lang === 'ar' ? 'واجب' : 'Hw'
  };

  const activityData = [
    { day: 'Mon', hours: 2.5 },
    { day: 'Tue', hours: 4.0 },
    { day: 'Wed', hours: 1.5 },
    { day: 'Thu', hours: 5.0 },
    { day: 'Fri', hours: 3.5 },
    { day: 'Sat', hours: 6.0 },
    { day: 'Sun', hours: 2.0 },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{labels.welcome}</h1>
        <p className="text-slate-500 dark:text-slate-400">{labels.pendingMsg}</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-dark-900 p-6 rounded-xl border border-slate-100 dark:border-dark-700 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">{labels.studyTime}</span>
            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-lg">
              <Clock size={20} />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white">24.5h</div>
          <span className="text-xs text-green-600 dark:text-green-400 font-medium">+12%</span>
        </div>

        <div className="bg-white dark:bg-dark-900 p-6 rounded-xl border border-slate-100 dark:border-dark-700 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">{labels.completed}</span>
            <div className="p-2 bg-green-50 dark:bg-green-900/20 text-green-600 rounded-lg">
              <CheckCircle2 size={20} />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white">{completedTasks}</div>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Tasks</span>
        </div>

        <div className="bg-white dark:bg-dark-900 p-6 rounded-xl border border-slate-100 dark:border-dark-700 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">{labels.pending}</span>
            <div className="p-2 bg-orange-50 dark:bg-orange-900/20 text-orange-600 rounded-lg">
              <AlertCircle size={20} />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white">{pendingTasks}</div>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Remaining</span>
        </div>

        <div className="bg-white dark:bg-dark-900 p-6 rounded-xl border border-slate-100 dark:border-dark-700 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">{labels.streak}</span>
            <div className="p-2 bg-purple-50 dark:bg-purple-900/20 text-purple-600 rounded-lg">
              <Calendar size={20} />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white">12 Days</div>
          <span className="text-xs text-purple-600 dark:text-purple-400 font-medium">Keep it up!</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Section */}
        <div className="lg:col-span-2 bg-white dark:bg-dark-900 p-6 rounded-xl border border-slate-100 dark:border-dark-700 shadow-sm">
          <h3 className="font-bold text-slate-900 dark:text-white mb-6">{labels.activity}</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activityData}>
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: 'rgba(255,255,255,0.1)'}} 
                  contentStyle={{borderRadius: '8px', border: 'none', backgroundColor: '#1e293b', color: '#fff'}}
                />
                <Bar dataKey="hours" radius={[4, 4, 0, 0]}>
                  {activityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 3 ? '#4f46e5' : '#cbd5e1'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Up Next List */}
        <div className="bg-white dark:bg-dark-900 p-6 rounded-xl border border-slate-100 dark:border-dark-700 shadow-sm">
          <h3 className="font-bold text-slate-900 dark:text-white mb-4">{labels.upNext}</h3>
          <div className="space-y-4">
            {tasks.filter(t => !t.completed).slice(0, 4).map(task => {
              const course = courses.find(c => c.id === task.courseId);
              return (
                <div key={task.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-dark-800 transition-colors border border-transparent hover:border-slate-100 dark:hover:border-dark-700 cursor-pointer">
                  <div className={`w-2 h-2 mt-2 rounded-full ${course?.color || 'bg-slate-400'}`} />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white line-clamp-1">{task.title}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{course?.title} • {new Date(task.dueDate).toLocaleDateString()}</p>
                  </div>
                  <div className={`px-2 py-1 rounded text-xs font-medium 
                    ${task.type === 'EXAM' ? 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400' : 'bg-slate-100 dark:bg-dark-800 text-slate-600 dark:text-slate-400'}`}>
                    {task.type === 'EXAM' ? labels.exam : labels.hw}
                  </div>
                </div>
              );
            })}
          </div>
          <button className="w-full mt-4 py-2 text-sm text-primary-600 dark:text-primary-400 font-medium hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors">
            {labels.viewCal}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
