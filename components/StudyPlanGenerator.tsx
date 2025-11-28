import React, { useState } from 'react';
import { generateStudyPlan } from '../services/geminiService';
import { StudyPlanResponse, StudyTask } from '../types';
import { CalendarClock, Loader2, BookOpen, Clock, ArrowRight, Save, RotateCcw, List, Table, Layout, CheckCircle2, Circle, Clock as ClockIcon } from 'lucide-react';

interface Props {
  lang: 'en' | 'ar';
}

const StudyPlanGenerator: React.FC<Props> = ({ lang }) => {
  const [subject, setSubject] = useState('');
  const [hours, setHours] = useState<number>(2);
  const [planData, setPlanData] = useState<StudyPlanResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState<'table' | 'kanban'>('kanban');

  const handleGenerate = async () => {
    if (!subject.trim()) return;
    setLoading(true);
    setPlanData(null);
    try {
      const result = await generateStudyPlan(subject, hours, lang);
      setPlanData(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Done': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'In Progress': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      default: return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300';
    }
  };

  const KanbanColumn = ({ title, tasks, status }: { title: string, tasks: StudyTask[], status: string }) => (
    <div className="flex-1 min-w-[250px] bg-slate-50 dark:bg-dark-800 rounded-xl p-4 border border-slate-200 dark:border-dark-700">
      <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center justify-between">
        {title}
        <span className="bg-slate-200 dark:bg-dark-700 text-slate-600 dark:text-slate-400 text-xs px-2 py-1 rounded-full">{tasks.length}</span>
      </h4>
      <div className="space-y-3">
        {tasks.map((task, idx) => (
          <div key={idx} className="bg-white dark:bg-dark-900 p-3 rounded-lg shadow-sm border border-slate-100 dark:border-dark-700 cursor-move hover:shadow-md transition-shadow">
            <p className="text-sm font-medium text-slate-800 dark:text-slate-200 mb-2">{task.task}</p>
            <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
              <ClockIcon size={12} className="mr-1" />
              {task.duration}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-fade-in pb-10">
      <div className="bg-white dark:bg-dark-900 p-8 rounded-xl border border-slate-200 dark:border-dark-700 shadow-sm">
        <div className="flex items-center space-x-4 mb-8">
          <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-xl">
            <CalendarClock size={28} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{lang === 'ar' ? 'مخطط الدراسة الذكي' : 'AI Study Planner'}</h2>
            <p className="text-slate-500 dark:text-slate-400">{lang === 'ar' ? 'أنشئ خطة دراسية مخصصة لأي موضوع في ثوانٍ' : 'Create a personalized, structured schedule for any topic in seconds.'}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">{lang === 'ar' ? 'الموضوع' : 'Subject or Topic'}</label>
            <div className="relative group">
              <BookOpen className={`absolute ${lang === 'ar' ? 'right-3' : 'left-3'} top-3.5 text-slate-400 group-focus-within:text-primary-500 transition-colors`} size={18} />
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder={lang === 'ar' ? 'مثال: التاريخ الإسلامي، الرياضيات' : "e.g. Organic Chemistry, WWII History"}
                className={`w-full ${lang === 'ar' ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-3 bg-slate-50 dark:bg-dark-800 border border-slate-200 dark:border-dark-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all placeholder:text-slate-400 font-medium text-slate-800 dark:text-white`}
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">{lang === 'ar' ? 'المدة (ساعات)' : 'Study Duration (Hours)'}</label>
            <div className="relative group">
              <Clock className={`absolute ${lang === 'ar' ? 'right-3' : 'left-3'} top-3.5 text-slate-400 group-focus-within:text-primary-500 transition-colors`} size={18} />
              <input
                type="number"
                min="0.5"
                max="24"
                step="0.5"
                value={hours}
                onChange={(e) => setHours(Number(e.target.value))}
                className={`w-full ${lang === 'ar' ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-3 bg-slate-50 dark:bg-dark-800 border border-slate-200 dark:border-dark-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all font-medium text-slate-800 dark:text-white`}
              />
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={handleGenerate}
            disabled={loading || !subject}
            className={`
              flex items-center space-x-2 px-8 py-3 rounded-xl font-semibold text-white transition-all transform
              ${loading || !subject 
                ? 'bg-slate-300 dark:bg-dark-700 cursor-not-allowed' 
                : 'bg-primary-600 hover:bg-primary-700 shadow-md hover:shadow-lg active:scale-95'}
            `}
          >
            {loading ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                <span>{lang === 'ar' ? 'جاري التخطيط...' : 'Designing Plan...'}</span>
              </>
            ) : (
              <>
                <span>{lang === 'ar' ? 'إنشاء الجدول' : 'Generate Schedule'}</span>
                <ArrowRight size={20} className={lang === 'ar' ? 'rotate-180' : ''} />
              </>
            )}
          </button>
        </div>
      </div>

      {planData && (
        <div className="bg-white dark:bg-dark-900 rounded-xl border border-slate-200 dark:border-dark-700 shadow-lg overflow-hidden animate-fade-in">
          <div className="bg-gradient-to-r from-indigo-50 to-white dark:from-dark-800 dark:to-dark-900 px-8 py-4 border-b border-indigo-100 dark:border-dark-700 flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
               <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                 <span className="w-2 h-2 rounded-full bg-primary-500"></span>
                 {planData.title}
               </h3>
               <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{planData.overview}</p>
            </div>
            
            <div className="flex bg-slate-100 dark:bg-dark-800 p-1 rounded-lg">
                <button 
                  onClick={() => setViewMode('kanban')}
                  className={`p-2 rounded-md flex items-center text-sm font-medium transition-colors ${viewMode === 'kanban' ? 'bg-white dark:bg-dark-700 text-primary-600 dark:text-primary-400 shadow-sm' : 'text-slate-500 dark:text-slate-400'}`}
                >
                    <Layout size={16} className="mx-2" />
                    {lang === 'ar' ? 'كانبان' : 'Kanban'}
                </button>
                <button 
                  onClick={() => setViewMode('table')}
                  className={`p-2 rounded-md flex items-center text-sm font-medium transition-colors ${viewMode === 'table' ? 'bg-white dark:bg-dark-700 text-primary-600 dark:text-primary-400 shadow-sm' : 'text-slate-500 dark:text-slate-400'}`}
                >
                    <Table size={16} className="mx-2" />
                    {lang === 'ar' ? 'جدول' : 'Table'}
                </button>
            </div>
          </div>
          
          <div className="p-8 bg-slate-50/50 dark:bg-dark-900/50">
            {viewMode === 'kanban' ? (
              <div className="flex flex-col md:flex-row gap-6 overflow-x-auto pb-4">
                <KanbanColumn 
                  title={lang === 'ar' ? 'للقيام به' : 'To Do'} 
                  status="To Do" 
                  tasks={planData.tasks.filter(t => t.status === 'To Do' || !t.status)} 
                />
                <KanbanColumn 
                  title={lang === 'ar' ? 'قيد التنفيذ' : 'In Progress'} 
                  status="In Progress" 
                  tasks={planData.tasks.filter(t => t.status === 'In Progress')} 
                />
                <KanbanColumn 
                  title={lang === 'ar' ? 'تم' : 'Done'} 
                  status="Done" 
                  tasks={planData.tasks.filter(t => t.status === 'Done')} 
                />
              </div>
            ) : (
              <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-dark-700">
                <table className="w-full text-sm text-left dark:text-right">
                  <thead className="bg-slate-50 dark:bg-dark-800 text-slate-500 dark:text-slate-400 font-medium">
                    <tr>
                      <th className="px-6 py-4">{lang === 'ar' ? 'المهمة' : 'Task'}</th>
                      <th className="px-6 py-4">{lang === 'ar' ? 'المدة' : 'Duration'}</th>
                      <th className="px-6 py-4">{lang === 'ar' ? 'الحالة' : 'Status'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-dark-700 bg-white dark:bg-dark-900">
                    {planData.tasks.map((task, i) => (
                      <tr key={i} className="hover:bg-slate-50 dark:hover:bg-dark-800/50 transition-colors">
                        <td className="px-6 py-4 font-medium text-slate-800 dark:text-slate-200">{task.task}</td>
                        <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{task.duration}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                            {task.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="bg-white dark:bg-dark-900 px-8 py-4 border-t border-slate-100 dark:border-dark-700 flex justify-end space-x-3">
             <button onClick={() => setPlanData(null)} className="px-5 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-dark-800 rounded-lg text-sm font-medium transition-colors">
               {lang === 'ar' ? 'تجاهل' : 'Discard'}
             </button>
             <button className="flex items-center space-x-2 px-5 py-2 bg-slate-900 dark:bg-primary-600 text-white hover:bg-slate-800 dark:hover:bg-primary-700 rounded-lg text-sm font-medium shadow-sm transition-colors">
               <Save size={16} />
               <span>{lang === 'ar' ? 'حفظ' : 'Save Plan'}</span>
             </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudyPlanGenerator;
