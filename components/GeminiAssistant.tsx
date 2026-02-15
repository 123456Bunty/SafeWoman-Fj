
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { SafetyReport } from '../types';
import { MessageCircle, Send, Loader2, User, Bot, Sparkles } from 'lucide-react';

interface GeminiAssistantProps {
  reports: SafetyReport[];
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const GeminiAssistant: React.FC<GeminiAssistantProps> = ({ reports }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Bula! I'm your SafeWomen Fiji AI assistant. I'm trained to help you navigate Suva safely at night. How can I assist you?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const model = 'gemini-3-flash-preview';
      
      const reportsSummary = reports.map(r => `${r.type}: ${r.description}`).join(' | ');
      
      const prompt = `
        You are a professional safety assistant for women in Fiji (SafeWomen Fiji).
        The context is safety in Suva at night.
        Recent community reports: ${reportsSummary}
        
        User question: "${userMsg}"
        
        Provide empathetic, highly practical, and culturally aware safety advice. Use a helpful, professional tone. If the user is in immediate danger, prioritize telling them to use the SOS button. Mention Suva landmarks when relevant. Keep it under 100 words.
      `;

      const response = await ai.models.generateContent({
        model,
        contents: prompt,
      });

      const text = response.text || "I'm having trouble connecting. Please stay in well-lit areas and keep your location sharing ON.";
      setMessages(prev => [...prev, { role: 'assistant', content: text }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'assistant', content: "Network error. Please stay alert and head to the nearest Safe Zone (Police or major malls)." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-rose-100 bg-white/40 backdrop-blur-md flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-rose-600 rounded-xl flex items-center justify-center shadow-lg shadow-rose-200">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-black text-rose-950">Safety AI</h3>
            <p className="text-[10px] text-green-600 font-black flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> ONLINE
            </p>
          </div>
        </div>
        <div className="px-3 py-1 bg-rose-50 rounded-full border border-rose-100 flex items-center gap-1.5">
           <Sparkles className="w-3 h-3 text-rose-500" />
           <span className="text-[8px] font-black text-rose-700 tracking-wider">PREMIUM</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[90%] p-4 rounded-3xl text-sm shadow-sm leading-relaxed ${
              m.role === 'user' 
                ? 'bg-rose-600 text-white rounded-tr-none' 
                : 'bg-white/80 text-rose-950 rounded-tl-none border border-white'
            }`}>
              <div className={`flex items-center gap-1.5 mb-2 opacity-60 text-[8px] font-black uppercase tracking-widest ${m.role === 'user' ? 'text-rose-100' : 'text-rose-400'}`}>
                {m.role === 'user' ? <User className="w-2.5 h-2.5" /> : <Bot className="w-2.5 h-2.5" />}
                {m.role}
              </div>
              <p className="font-medium">{m.content}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white/60 p-4 rounded-3xl rounded-tl-none border border-white shadow-sm">
              <Loader2 className="w-5 h-5 text-rose-600 animate-spin" />
            </div>
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      <div className="p-4 bg-white/60 backdrop-blur-xl border-t border-rose-100">
        <div className="flex items-center gap-2 bg-white rounded-[2rem] p-1.5 pl-5 shadow-inner border border-rose-50">
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Search safe routes or tips..."
            className="flex-1 bg-transparent py-3 text-sm outline-none font-medium text-rose-950"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="w-11 h-11 bg-rose-600 rounded-full text-white shadow-lg flex items-center justify-center disabled:opacity-50 transition-all active:scale-90"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <p className="text-[9px] text-center text-rose-300 mt-3 font-black uppercase tracking-widest">
          Secured by SafeWomen AI Protocol
        </p>
      </div>
    </div>
  );
};

export default GeminiAssistant;
