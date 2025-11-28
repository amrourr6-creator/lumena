import React, { useState } from 'react';
import { Course } from '../types';
import { BookOpen, MoreVertical, Clock, PlayCircle, Plus, X, Image as ImageIcon, User, Type, FileText } from 'lucide-react';

interface CourseListProps {
  courses: Course[];
  lang: 'en' | 'ar';
  onAddCourse: (course: Course) => void;
}

const CourseList: React.FC<CourseListProps> = ({ courses, lang, onAddCourse }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    instructor: '',
    description: '',
    image: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.instructor) return;

    const newCourse: Course = {
      id: `user-c-${Date.now()}`,
      title: formData.title,
      instructor: formData.instructor,
      description: formData.description,
      image: formData.image || 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=600&auto=format&fit=crop',
      progress: 0,
      nextDeadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      color: 'bg-indigo-600'
    };
    
    onAddCourse(newCourse);
    setFormData({ title: '', instructor: '', description: '', image: '' });
    setIsModalOpen(false);
  };

  const t = {
    myCourses: lang === 'ar' ? 'دوراتي' : 'My Courses',
    addCourse: lang === 'ar' ? '+ أضف دورة' : '+ Add Course',
    createTitle: lang === 'ar' ? 'إنشاء دورة جديدة' : 'Create New Course',
    titleLabel: lang === 'ar' ? 'عنوان الدورة' : 'Course Title',
    instructorLabel: lang === 'ar' ? 'المدرس' : 'Instructor',
    descLabel: lang === 'ar' ? 'الوصف' : 'Description',
    imageLabel: lang === 'ar' ? 'رابط الصورة (اختياري)' : 'Image URL (Optional)',
    cancel: lang === 'ar' ? 'إلغاء' : 'Cancel',
    create: lang === 'ar' ? 'إنشاء' : 'Create Course',
    instructor: lang === 'ar' ? 'مدرس' : 'Instructor',
    completed: lang === 'ar' ? 'مكتمل' : 'Completed',
    due: lang === 'ar' ? 'الاستحقاق:' : 'Due:',
    syllabus: lang === 'ar' ? 'المنهج' : 'Syllabus',
    resume: lang === 'ar' ? 'تابع' : 'Resume'
  };

  return (
    <div className="space-y-6 animate-fade-in relative">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{t.myCourses}</h2>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="text-white text-sm font-medium bg-primary-600 hover:bg-primary-700 shadow-md px-4 py-2 rounded-lg transition-all flex items-center gap-2"
        >
          <Plus size={16} />
          {t.addCourse}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="group bg-white dark:bg-dark-900 rounded-xl border border-slate-200 dark:border-dark-700 overflow-hidden hover:shadow-lg hover:border-primary-200 dark:hover:border-primary-900 transition-all duration-300">
            {/* Real Image Header */}
            <div className="h-40 relative overflow-hidden">
               <img src={course.image} alt={course.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
               <div className="absolute top-4 right-4 bg-black/30 backdrop-blur-sm p-1 rounded-full text-white cursor-pointer hover:bg-black/50">
                 <MoreVertical size={16} />
               </div>
               <div className="absolute bottom-4 left-4 right-4">
                  <span className={`text-xs font-bold px-2 py-1 rounded-md mb-2 inline-block ${course.color} text-white`}>
                    {course.title.split(' ')[0]}
                  </span>
                  <h3 className="text-white font-bold text-lg leading-tight shadow-sm truncate">{course.title}</h3>
               </div>
            </div>
            
            <div className="p-5">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-dark-700 overflow-hidden">
                    <img src={`https://ui-avatars.com/api/?name=${course.instructor}&background=random`} alt={course.instructor} />
                </div>
                <div className="text-sm">
                    <p className="text-slate-900 dark:text-white font-medium">{course.instructor}</p>
                    <p className="text-slate-500 dark:text-slate-400 text-xs">{t.instructor}</p>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between items-center text-xs mb-2">
                    <span className="text-slate-500 dark:text-slate-400">{t.completed}</span>
                    <span className="font-bold text-slate-700 dark:text-slate-300">{course.progress}%</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-dark-800 rounded-full h-1.5">
                    <div 
                    className="bg-primary-600 h-1.5 rounded-full transition-all duration-500" 
                    style={{ width: `${course.progress}%` }}
                    />
                </div>
              </div>

              <div className="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-dark-800 p-2.5 rounded-lg mb-4 border border-slate-100 dark:border-dark-700">
                 <Clock size={14} className="text-orange-500" />
                 <span>{t.due} <span className="font-medium text-slate-700 dark:text-slate-300">{new Date(course.nextDeadline).toLocaleDateString()}</span></span>
              </div>
              
              <div className="flex gap-2">
                <button className="flex-1 py-2 border border-slate-200 dark:border-dark-700 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-dark-800 transition-colors">
                    {t.syllabus}
                </button>
                <button className="flex-1 py-2 bg-primary-600 rounded-lg text-sm font-medium text-white hover:bg-primary-700 transition-colors flex items-center justify-center gap-2">
                    <PlayCircle size={16} />
                    {t.resume}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Course Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative bg-white dark:bg-dark-900 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-fade-in border border-slate-200 dark:border-dark-700">
            <div className="px-6 py-4 border-b border-slate-100 dark:border-dark-700 flex justify-between items-center bg-slate-50/50 dark:bg-dark-800/50">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">{t.createTitle}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 block">{t.titleLabel}</label>
                <div className="relative">
                  <Type className={`absolute ${lang === 'ar' ? 'right-3' : 'left-3'} top-3 text-slate-400`} size={18} />
                  <input 
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className={`w-full bg-slate-50 dark:bg-dark-800 border border-slate-200 dark:border-dark-700 rounded-lg py-2.5 ${lang === 'ar' ? 'pr-10 pl-4' : 'pl-10 pr-4'} text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all`}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 block">{t.instructorLabel}</label>
                <div className="relative">
                  <User className={`absolute ${lang === 'ar' ? 'right-3' : 'left-3'} top-3 text-slate-400`} size={18} />
                  <input 
                    type="text"
                    required
                    value={formData.instructor}
                    onChange={(e) => setFormData({...formData, instructor: e.target.value})}
                    className={`w-full bg-slate-50 dark:bg-dark-800 border border-slate-200 dark:border-dark-700 rounded-lg py-2.5 ${lang === 'ar' ? 'pr-10 pl-4' : 'pl-10 pr-4'} text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all`}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 block">{t.descLabel}</label>
                <div className="relative">
                  <FileText className={`absolute ${lang === 'ar' ? 'right-3' : 'left-3'} top-3 text-slate-400`} size={18} />
                  <textarea 
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className={`w-full bg-slate-50 dark:bg-dark-800 border border-slate-200 dark:border-dark-700 rounded-lg py-2.5 ${lang === 'ar' ? 'pr-10 pl-4' : 'pl-10 pr-4'} text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all resize-none`}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 block">{t.imageLabel}</label>
                <div className="relative">
                  <ImageIcon className={`absolute ${lang === 'ar' ? 'right-3' : 'left-3'} top-3 text-slate-400`} size={18} />
                  <input 
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                    className={`w-full bg-slate-50 dark:bg-dark-800 border border-slate-200 dark:border-dark-700 rounded-lg py-2.5 ${lang === 'ar' ? 'pr-10 pl-4' : 'pl-10 pr-4'} text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all`}
                  />
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-2.5 bg-slate-100 dark:bg-dark-700 text-slate-700 dark:text-slate-300 rounded-lg font-medium hover:bg-slate-200 dark:hover:bg-dark-600 transition-colors"
                >
                  {t.cancel}
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-2.5 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 shadow-lg shadow-primary-600/20 transition-all active:scale-95"
                >
                  {t.create}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseList;