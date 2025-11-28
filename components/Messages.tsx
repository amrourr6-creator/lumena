import React, { useState, useEffect, useRef } from 'react';
import { Search, MoreVertical, Phone, Video, Send, Loader2, Cloud } from 'lucide-react';
import { generatePersonaResponse } from '../services/geminiService';

interface Contact {
  id: string;
  name: string;
  role: string; // Description for AI persona
  avatar: string;
  online: boolean;
  typing?: boolean;
}

interface Message {
  id: string;
  contactId: string;
  text: string;
  sender: 'me' | 'other';
  time: string;
  timestamp: number;
}

const INITIAL_CONTACTS: Contact[] = [
  { 
    id: '1', 
    name: 'Dr. Sarah Smith', 
    role: 'Strict but helpful University Calculus Professor',
    avatar: 'https://i.pravatar.cc/150?u=1', 
    online: true 
  },
  { 
    id: '2', 
    name: 'Ahmed (Study Group)', 
    role: 'Friendly student classmate who is good at taking notes but sometimes procrastinates',
    avatar: 'https://i.pravatar.cc/150?u=2', 
    online: false 
  },
  { 
    id: '3', 
    name: 'Lumina Support', 
    role: 'Helpful customer support agent for the Lumina App',
    avatar: 'https://ui-avatars.com/api/?name=Lumina+Support&background=6366f1&color=fff', 
    online: true 
  },
];

const INITIAL_MESSAGES: Message[] = [
  { id: '1', contactId: '1', text: 'Please review chapter 4 for the exam.', sender: 'other', time: '10:30 AM', timestamp: Date.now() - 100000 },
];

const Messages: React.FC<{ lang: 'en' | 'ar' }> = ({ lang }) => {
  const [contacts, setContacts] = useState<Contact[]>(INITIAL_CONTACTS);
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedContactId, setSelectedContactId] = useState<string>('1');
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load from "Cloud" (LocalStorage)
  useEffect(() => {
    const savedMessages = localStorage.getItem('lumina_messages');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      setMessages(INITIAL_MESSAGES);
    }
    setIsLoading(false);
  }, []);

  // Sync to "Cloud" (LocalStorage)
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('lumina_messages', JSON.stringify(messages));
    }
  }, [messages, isLoading]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, selectedContactId]);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const currentContact = contacts.find(c => c.id === selectedContactId);
    if (!currentContact) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      contactId: selectedContactId,
      text: inputText,
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      timestamp: Date.now()
    };

    // 1. Add User Message
    setMessages(prev => [...prev, newMessage]);
    setInputText('');
    
    // 2. Simulate Cloud/Network Delay & Typing
    setContacts(prev => prev.map(c => c.id === selectedContactId ? { ...c, typing: true } : c));

    try {
      // 3. Get AI Response from "Cloud"
      // Get recent history for context (last 5 messages)
      const history = messages
        .filter(m => m.contactId === selectedContactId)
        .slice(-5)
        .map(m => ({ sender: m.sender, text: m.text }));

      const responseText = await generatePersonaResponse(
        currentContact.name,
        currentContact.role,
        history,
        newMessage.text,
        lang
      );

      // 4. Add Friend Response
      const friendMessage: Message = {
        id: (Date.now() + 1).toString(),
        contactId: selectedContactId,
        text: responseText,
        sender: 'other',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        timestamp: Date.now()
      };

      setMessages(prev => [...prev, friendMessage]);
    } catch (error) {
      console.error("Failed to get response", error);
    } finally {
      setContacts(prev => prev.map(c => c.id === selectedContactId ? { ...c, typing: false } : c));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const currentContact = contacts.find(c => c.id === selectedContactId);
  const currentMessages = messages.filter(m => m.contactId === selectedContactId);

  // Helper to get last message for sidebar
  const getLastMessage = (contactId: string) => {
    const contactMsgs = messages.filter(m => m.contactId === contactId);
    return contactMsgs.length > 0 ? contactMsgs[contactMsgs.length - 1] : null;
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] bg-white dark:bg-dark-900 rounded-xl border border-slate-200 dark:border-dark-700 overflow-hidden animate-fade-in shadow-xl">
      {/* Sidebar List */}
      <div className={`w-80 border-r border-slate-200 dark:border-dark-700 flex flex-col ${lang === 'ar' ? 'border-l-0' : ''}`}>
        <div className="p-4 border-b border-slate-200 dark:border-dark-700 bg-slate-50 dark:bg-dark-900">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-slate-800 dark:text-white">{lang === 'ar' ? 'الرسائل' : 'Messages'}</h2>
            <div className="flex items-center text-xs text-green-600 dark:text-green-400 font-medium px-2 py-1 bg-green-50 dark:bg-green-900/20 rounded-full">
              <Cloud size={12} className="mr-1" />
              {lang === 'ar' ? 'متصل بالسحابة' : 'Cloud Sync'}
            </div>
          </div>
          <div className="relative">
            <Search className={`absolute ${lang === 'ar' ? 'right-3' : 'left-3'} top-2.5 text-slate-400`} size={18} />
            <input 
              type="text" 
              placeholder={lang === 'ar' ? 'بحث...' : "Search friends..."}
              className={`w-full bg-white dark:bg-dark-800 border border-slate-200 dark:border-dark-700 ${lang === 'ar' ? 'pr-10' : 'pl-10'} py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50 dark:text-white transition-all`} 
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {contacts.map(contact => {
            const lastMsg = getLastMessage(contact.id);
            return (
              <div 
                key={contact.id}
                onClick={() => setSelectedContactId(contact.id)}
                className={`p-4 flex items-center space-x-3 cursor-pointer hover:bg-slate-50 dark:hover:bg-dark-800 transition-colors border-l-4 ${selectedContactId === contact.id ? 'bg-indigo-50 dark:bg-dark-800 border-primary-600' : 'border-transparent'}`}
              >
                <div className="relative">
                  <img src={contact.avatar} alt={contact.name} className="w-12 h-12 rounded-full object-cover border border-slate-200 dark:border-dark-600" />
                  {contact.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-dark-900"></div>}
                </div>
                <div className="flex-1 min-w-0 mx-3">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white truncate">{contact.name}</h3>
                    {lastMsg && <span className="text-xs text-slate-500 dark:text-slate-400">{lastMsg.time}</span>}
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
                    {contact.typing ? (
                      <span className="text-primary-600 italic animate-pulse">{lang === 'ar' ? 'يكتب...' : 'typing...'}</span>
                    ) : (
                      lastMsg?.text || (lang === 'ar' ? 'لا رسائل' : 'No messages yet')
                    )}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-slate-50 dark:bg-dark-800/50">
        {/* Header */}
        <div className="p-4 bg-white dark:bg-dark-900 border-b border-slate-200 dark:border-dark-700 flex justify-between items-center shadow-sm z-10">
           <div className="flex items-center space-x-3">
             <img src={currentContact?.avatar} alt="" className="w-10 h-10 rounded-full border border-slate-200 dark:border-dark-600" />
             <div className="mx-3">
               <h3 className="font-bold text-slate-900 dark:text-white">{currentContact?.name}</h3>
               <div className="flex items-center space-x-2">
                 <span className={`w-2 h-2 rounded-full ${currentContact?.online ? 'bg-green-500' : 'bg-slate-400'}`}></span>
                 <span className="text-xs text-slate-500 dark:text-slate-400">{currentContact?.online ? (lang === 'ar' ? 'متصل' : 'Online') : (lang === 'ar' ? 'غير متصل' : 'Offline')}</span>
               </div>
             </div>
           </div>
           <div className="flex space-x-2 text-slate-600 dark:text-slate-400">
             <button className="p-2 hover:bg-slate-100 dark:hover:bg-dark-800 rounded-full transition-colors"><Phone size={20} /></button>
             <button className="p-2 hover:bg-slate-100 dark:hover:bg-dark-800 rounded-full transition-colors"><Video size={20} /></button>
             <button className="p-2 hover:bg-slate-100 dark:hover:bg-dark-800 rounded-full transition-colors"><MoreVertical size={20} /></button>
           </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {currentMessages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'me' ? (lang === 'ar' ? 'justify-start' : 'justify-end') : (lang === 'ar' ? 'justify-end' : 'justify-start')}`}>
              <div className={`max-w-[75%] px-5 py-3 rounded-2xl text-sm shadow-sm ${
                msg.sender === 'me' 
                  ? 'bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-tr-none' 
                  : 'bg-white dark:bg-dark-900 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-dark-700 rounded-tl-none'
              }`}>
                <p className="leading-relaxed">{msg.text}</p>
                <p className={`text-[10px] mt-1 text-right ${msg.sender === 'me' ? 'text-primary-100' : 'text-slate-400'}`}>{msg.time}</p>
              </div>
            </div>
          ))}
          {currentContact?.typing && (
             <div className={`flex ${lang === 'ar' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
               <div className="bg-white dark:bg-dark-900 border border-slate-200 dark:border-dark-700 px-4 py-3 rounded-2xl rounded-tl-none shadow-sm flex items-center space-x-1">
                 <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                 <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                 <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
               </div>
             </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 bg-white dark:bg-dark-900 border-t border-slate-200 dark:border-dark-700">
          <div className="flex items-center space-x-2">
            <input 
              type="text" 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={lang === 'ar' ? 'اكتب رسالة...' : "Type a message..."}
              className="flex-1 bg-slate-100 dark:bg-dark-800 border-none rounded-full px-5 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500/50 dark:text-white transition-all"
            />
            <button 
              onClick={handleSendMessage}
              disabled={!inputText.trim() || currentContact?.typing}
              className={`p-3 rounded-full transition-all shadow-md flex items-center justify-center
                ${!inputText.trim() || currentContact?.typing
                  ? 'bg-slate-200 dark:bg-dark-700 text-slate-400 cursor-not-allowed' 
                  : 'bg-primary-600 text-white hover:bg-primary-700 hover:shadow-lg transform hover:-translate-y-0.5'
                }`}
            >
              {currentContact?.typing ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} className={lang === 'ar' ? 'rotate-180' : ''} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
