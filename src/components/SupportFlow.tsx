import React, { useState, useRef, useEffect } from 'react';
import { INITIAL_CHAT } from '../data/hairData';
import { ChatMessage } from '../types';
import { Send, Check, Video, Clock } from 'lucide-react';

export default function SupportFlow() {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_CHAT);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    const normalizedInput = inputText.toLowerCase();
    setInputText('');

    // Trigger typing simulation
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      let doctorText = '';

      if (normalizedInput.includes('pitta') || normalizedInput.includes('heat') || normalizedInput.includes('oil')) {
        doctorText = 'Excellent observation. For high Pitta heat in the scalp, overnight soaking with Keshya Oil works wonderfully. Warm it slightly before massaging templates—this drives active ingredients deeper.';
      } else if (normalizedInput.includes('shampoo') || normalizedInput.includes('wash') || normalizedInput.includes('clean')) {
        doctorText = 'Our Bhringraj shampoo is natural and soapnut-based. Wash 2-3 times a week with lukewarm air-temperature water. Avoid steaming-hot water, as hot water inflames hair root shafts!';
      } else if (normalizedInput.includes('stress') || normalizedInput.includes('anxiety') || normalizedInput.includes('sleep')) {
        doctorText = 'Stress is a major factor. The Sheetali Pranayama routine in your Today’s Plan helps lower high cortisol. Try performing it 5 minutes before bed—it triggers deep regenerative delta-wave sleep.';
      } else {
        doctorText = 'Consistency is the primary key. In our clinical observations, 88% of people see stabilization in daily shedding within 4 weeks of executing daily Shiro Abhyanga massage. Please carry on tracking!';
      }

      const replyMsg: ChatMessage = {
        id: `dr-${Date.now()}`,
        sender: 'coach',
        text: doctorText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, replyMsg]);
    }, 1800);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#FAF8F5]">
      {/* Active Coach header */}
      <div className="bg-white px-4 py-3 border-b border-[#F0EAE0] flex items-center justify-between shrink-0 shadow-sm z-10 select-none">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=300&auto=format&fit=crop" 
              alt="Dr. Devendra" 
              referrerPolicy="no-referrer"
              className="w-10 h-10 rounded-full object-cover object-top border border-[#0F5A29]/20"
            />
            {/* Green active dot */}
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h4 className="font-serif text-xs font-bold text-[#1C2321]">Dr. Devendra Sharma</h4>
              <span className="text-[7px] text-[#0F5A29] bg-[#E8F3EA] font-extrabold px-1.5 py-0.5 rounded uppercase">Verified</span>
            </div>
            <span className="text-[9px] text-[#8C7A5B] font-bold block leading-none mt-0.5">
              Reg. License: SWS-10492-CH / BAMS
            </span>
            <span className="text-[9px] text-[#0F5A29] font-semibold block uppercase tracking-wider mt-1 scale-95 origin-left">
              Expert Ayur-Trichologist & Coach • Replies &lt; 2 hrs
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1 bg-[#E8F3EA] px-2 py-1 rounded-full text-[10px] text-[#0F5A29] font-bold">
            <Video className="w-3 h-3" /> Live
          </div>
        </div>
      </div>

      {/* Messages Scroll Region */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4"
      >
        <div className="text-center">
          <span className="text-[9px] uppercase tracking-wider text-neutral-400 font-bold bg-[#FAF3E5] px-2.5 py-1 rounded-full border border-[#EDE7DB]">
            Secure Consult Channel
          </span>
        </div>

        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex flex-col max-w-[80%] ${isUser ? 'ml-auto items-end' : 'mr-auto items-start'}`}
            >
              <div className={`p-3.5 rounded-2.5xl text-xs leading-relaxed ${
                isUser 
                  ? 'bg-[#0F5A29] text-white rounded-tr-sm' 
                  : 'bg-white border border-[#E9E4DB] text-neutral-800 rounded-tl-sm shadow-sm'
              }`}>
                {msg.text}
              </div>
              <span className="text-[9px] text-neutral-400 mt-1 font-semibold block px-1.5 flex items-center gap-1 select-none">
                {msg.timestamp}
                {isUser && <Check className="w-3 h-3 text-[#0F5A29]" />}
              </span>
            </div>
          );
        })}

        {/* Doctor typing placeholder */}
        {isTyping && (
          <div className="flex flex-col items-start mr-auto max-w-[80%]">
            <div className="bg-white border border-[#E9E4DB] p-3 rounded-2.5xl rounded-tl-sm shadow-sm flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
            <span className="text-[9px] text-neutral-400 mt-1 pl-1">Dr. Devendra of Vedic Lab is writing...</span>
          </div>
        )}
      </div>

      {/* Message input bar */}
      <form 
        onSubmit={handleSendMessage}
        className="p-3 bg-white border-t border-[#F0EAE0] flex items-center gap-2"
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask about oils, shampoos, stress, or dandruff..."
          className="flex-1 h-12 px-4 bg-[#FAF8F5] rounded-xl border border-[#E9E4DB] text-xs focus:outline-none focus:border-[#0F5A29]"
        />
        <button
          type="submit"
          className="w-12 h-12 rounded-xl bg-[#0F5A29] text-white flex items-center justify-center hover:bg-[#0c4a21] active:scale-95 transition-all"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
