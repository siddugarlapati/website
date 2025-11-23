import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';
import { Button } from './Button';
import { api } from '../utils/api';

export const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'bot'|'user', text: string}[]>([
    { role: 'bot', text: "Hi! 👋 I'm Aryantra's AI assistant. How can I help you automate your business today?" }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, isOpen]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;
    
    const userMessage = inputValue;
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setInputValue("");
    setIsTyping(true);

    try {
      // Call backend API for AI response
      const history = messages.map(msg => ({
        role: msg.role === 'bot' ? 'assistant' : 'user',
        content: msg.text
      }));

      const response = await api.chat(userMessage, history);
      
      setIsTyping(false);
      
      if (response.data?.response) {
        setMessages(prev => [...prev, { 
          role: 'bot', 
          text: response.data.response 
        }]);
      } else {
        setMessages(prev => [...prev, { 
          role: 'bot', 
          text: "I'm having trouble connecting right now. Please try again or contact us directly." 
        }]);
      }
    } catch (error) {
      setIsTyping(false);
      setMessages(prev => [...prev, { 
        role: 'bot', 
        text: "Sorry, I encountered an error. Please try again later." 
      }]);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end pointer-events-none">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-[350px] h-[500px] bg-white rounded-2xl shadow-2xl border border-slate-100 flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300 pointer-events-auto">
          {/* Header */}
          <div className="bg-[#0B0F19] p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                 <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
                    <Bot size={20} />
                 </div>
                 <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#0B0F19] rounded-full"></span>
              </div>
              <div>
                <h3 className="text-white font-bold text-sm">Aryantra AI</h3>
                <p className="text-slate-400 text-xs">Online</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-slate-50 space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'bot' && (
                   <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-2 shrink-0">
                     <Bot size={14} />
                   </div>
                )}
                <div className={`max-w-[80%] p-3 rounded-xl text-sm ${
                  msg.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-br-none' 
                    : 'bg-white border border-slate-200 text-slate-700 rounded-bl-none shadow-sm'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start items-center gap-2">
                 <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-2 shrink-0">
                   <Bot size={14} />
                 </div>
                 <div className="bg-white border border-slate-200 px-4 py-3 rounded-xl rounded-bl-none shadow-sm flex gap-1">
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-100"></span>
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-200"></span>
                 </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-slate-100">
            <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-2">
              <input 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
              <button 
                type="submit" 
                disabled={!inputValue.trim()}
                className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-[#0B0F19] text-white shadow-lg shadow-blue-900/20 flex items-center justify-center hover:scale-110 transition-all duration-300 group pointer-events-auto"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} className="group-hover:animate-pulse" />}
      </button>
    </div>
  );
};