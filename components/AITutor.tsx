import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { sendChatMessage } from '../services/geminiService';
import { Send, Bot, User as UserIcon, Loader2, Sparkles } from 'lucide-react';

interface AITutorProps {
  lang: 'en' | 'ar';
}

const AITutor: React.FC<AITutorProps> = ({ lang }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'model',
      text: lang === 'ar' 
        ? "أهلاً! أنا لومينا، مساعدك الدراسي الذكي. يمكنني مساعدتك في فهم المواضيع المعقدة، أو إنشاء خطط دراسية. ماذا نتعلم اليوم؟"
        : "Hi! I'm Lumina, your AI study assistant. I can help you understand complex topics, create study plans, or quiz you on your subjects. What are we learning today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Reset initial message when language changes
  useEffect(() => {
    if (messages.length === 1 && messages[0].role === 'model') {
       setMessages([{
        id: '1',
        role: 'model',
        text: lang === 'ar' 
          ? "أهلاً! أنا لومينا، مساعدك الدراسي الذكي. يمكنني مساعدتك في فهم المواضيع المعقدة، أو إنشاء خطط دراسية. ماذا نتعلم اليوم؟"
          : "Hi! I'm Lumina, your AI study assistant. I can help you understand complex topics, create study plans, or quiz you on your subjects. What are we learning today?",
        timestamp: new Date()
      }]);
    }
  }, [lang]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await sendChatMessage(messages, input, lang);
      
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="h-[calc(100vh-2rem)] flex flex-col bg-white dark:bg-dark-900 rounded-xl border border-slate-200 dark:border-dark-700 shadow-sm overflow-hidden animate-fade-in">
      {/* Chat Header */}
      <div className="p-4 border-b border-slate-100 dark:border-dark-700 flex justify-between items-center bg-white dark:bg-dark-900">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-lg">
            <Sparkles size={20} />
          </div>
          <div className="mx-2">
            <h2 className="font-bold text-slate-900 dark:text-white">{lang === 'ar' ? 'معلم لومينا الذكي' : 'Lumina AI Tutor'}</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Powered by Gemini 2.5</p>
          </div>
        </div>
        <div className="px-3 py-1 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-xs font-medium rounded-full border border-green-100 dark:border-green-900/30">
          Online
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-slate-50/50 dark:bg-dark-800/50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start space-x-3 ${msg.role === 'user' ? (lang === 'ar' ? 'flex-row space-x-reverse' : 'flex-row-reverse space-x-reverse') : (lang === 'ar' ? 'flex-row-reverse space-x-reverse' : 'flex-row')}`}
          >
            <div className={`
              flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mx-2
              ${msg.role === 'model' ? 'bg-primary-600 text-white' : 'bg-slate-200 dark:bg-dark-700 text-slate-600 dark:text-slate-300'}
            `}>
              {msg.role === 'model' ? <Bot size={16} /> : <UserIcon size={16} />}
            </div>
            
            <div className={`
              max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm
              ${msg.role === 'user' 
                ? 'bg-primary-600 text-white rounded-tr-none' 
                : 'bg-white dark:bg-dark-900 text-slate-800 dark:text-slate-200 border border-slate-100 dark:border-dark-700 rounded-tl-none'}
            `}>
              {msg.text.split('\n').map((line, i) => (
                <p key={i} className={i > 0 ? 'mt-2' : ''}>{line}</p>
              ))}
              <span className={`text-[10px] block mt-2 opacity-70 ${msg.role === 'user' ? 'text-primary-100' : 'text-slate-400'}`}>
                {msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
              </span>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className={`flex items-center space-x-3 ${lang === 'ar' ? 'flex-row-reverse space-x-reverse' : ''}`}>
             <div className="w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center mx-2">
              <Bot size={16} />
            </div>
            <div className="bg-white dark:bg-dark-900 border border-slate-100 dark:border-dark-700 px-4 py-3 rounded-2xl rounded-tl-none shadow-sm flex items-center space-x-2">
              <Loader2 size={16} className="animate-spin text-primary-600" />
              <span className="text-sm text-slate-500 dark:text-slate-400">{lang === 'ar' ? 'لومينا يفكر...' : 'Lumina is thinking...'}</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white dark:bg-dark-900 border-t border-slate-100 dark:border-dark-700">
        <div className="flex items-center space-x-3 max-w-4xl mx-auto">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={lang === 'ar' ? "اسأل سؤالاً أو اطلب خطة دراسية..." : "Ask a question or request a study plan..."}
            className="flex-1 bg-slate-50 dark:bg-dark-800 border border-slate-200 dark:border-dark-700 text-slate-900 dark:text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all placeholder:text-slate-400"
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className={`
              p-3 rounded-xl flex items-center justify-center transition-all
              ${isLoading || !input.trim() 
                ? 'bg-slate-100 dark:bg-dark-800 text-slate-400 cursor-not-allowed' 
                : 'bg-primary-600 text-white hover:bg-primary-700 shadow-md hover:shadow-lg'}
            `}
          >
            <Send size={20} className={lang === 'ar' ? 'rotate-180' : ''} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AITutor;
