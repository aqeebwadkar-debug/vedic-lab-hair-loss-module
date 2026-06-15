import React, { useState } from 'react';
import { EDUCATIONAL_ARTICLES } from '../data/hairData';
import { EducationalArticle } from '../types';
import { BookOpen, Sparkles, X, Clock, HelpCircle, ChevronRight, ArrowRight } from 'lucide-react';

export default function EducationFlow() {
  const [selectedArticle, setSelectedArticle] = useState<EducationalArticle | null>(null);

  return (
    <div className="flex-1 flex flex-col h-full bg-[#FAF8F5] overflow-y-auto px-5 py-5 space-y-5">
      {/* Title */}
      <div>
        <span className="text-[10px] font-bold text-[#0F5A29] bg-[#E8F3EA] px-2.5 py-1 rounded-full uppercase tracking-wider">
          Ayur-Vedic Shastra & Trivia
        </span>
        <h3 className="text-xl font-serif text-[#1C2321] mt-2.5 leading-tight">
          Hair Wellness Library
        </h3>
        <p className="text-xs text-neutral-500 mt-1.5 leading-relaxed">
          Deepen your alignment. Discover trichological chemistry, herb profiles, and physical lifestyle balances compiled by Swiss Vedic Sages.
        </p>
      </div>

      {/* Articles Grid / list */}
      <div className="space-y-4">
        {EDUCATIONAL_ARTICLES.map((art) => (
          <button
            key={art.id}
            onClick={() => setSelectedArticle(art)}
            className="w-full text-left bg-white rounded-3xl overflow-hidden border border-[#EDE9E0] shadow-sm flex flex-col group hover:border-neutral-400 focus:outline-none transition-all active:scale-[0.99]"
          >
            <div className="h-36 w-full relative overflow-hidden">
              <img 
                src={art.image} 
                alt={art.title} 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300" 
              />
              <span className="absolute top-3 left-3 bg-[#0F5A29]/90 text-white font-serif text-[9px] uppercase tracking-wide px-2.5 py-1 rounded-md backdrop-blur-sm shadow-sm">
                {art.category}
              </span>
            </div>

            <div className="p-4 space-y-2">
              <div className="flex justify-between items-center text-[10px] text-neutral-400 font-bold uppercase tracking-wider select-none">
                <span>{art.readTime}</span>
                {art.doshaTopic && <span className="text-[#8C7A5B]">Dosha: {art.doshaTopic}</span>}
              </div>
              <h4 className="font-serif text-sm font-semibold text-[#1C2321] group-hover:text-[#0F5A29] transition-all line-clamp-2 leading-snug">
                {art.title}
              </h4>
              <p className="text-[11px] text-neutral-500 line-clamp-2 leading-relaxed">
                {art.snippet}
              </p>
              <div className="pt-2 flex items-center justify-end text-xs font-semibold text-[#0F5A29] gap-1 select-none">
                <span>Read Full Article</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* ======================================= */}
      {/* DETAILED ARTICLE EXPANSION SCREEN        */}
      {/* ======================================= */}
      {selectedArticle && (
        <div className="absolute inset-0 bg-white z-50 flex flex-col">
          {/* Header */}
          <div className="h-16 px-4 flex items-center justify-between border-b border-[#F2EDE4] bg-white sticky top-0 z-10 shrink-0">
            <button 
              onClick={() => setSelectedArticle(null)}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-[#F7F4F0] text-[#1E2422]"
            >
              <X className="w-5 h-5" />
            </button>
            <span className="font-serif text-sm tracking-widest uppercase font-semibold text-[#1C2321]">
              Vedic Treatise
            </span>
            <div className="w-10" />
          </div>

          {/* Reading body */}
          <div className="flex-1 overflow-y-auto pb-8">
            <div className="h-52 w-full relative">
              <img src={selectedArticle.image} alt={selectedArticle.title} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-5">
                <span className="bg-[#FAF3E5] text-[#8C7A5B] text-[10px] font-bold uppercase px-3 py-1 rounded-md">
                  {selectedArticle.category}
                </span>
              </div>
            </div>

            <div className="px-5 py-6 space-y-4">
              <div className="flex items-center gap-3.5 text-xs text-neutral-400 select-none">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {selectedArticle.readTime}
                </span>
                {selectedArticle.doshaTopic && (
                  <span className="text-[#0F5A29] font-semibold bg-[#E8F3EA] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    {selectedArticle.doshaTopic} Topic
                  </span>
                )}
              </div>

              <h2 className="text-2xl font-serif text-[#1C2321] leading-snug">
                {selectedArticle.title}
              </h2>

              <div className="border-t border-[#F2EDE4] pt-4 text-xs text-neutral-600 space-y-4 leading-relaxed font-sans first-letter:text-3xl first-letter:font-serif first-letter:text-[#0F5A29] first-letter:float-left first-letter:mr-2">
                {/* Parse newline paragraphs elegantly */}
                {selectedArticle.content.split('\n\n').map((para, pIdx) => {
                  if (para.startsWith('- ') || para.startsWith('* ')) {
                    return (
                      <ul key={pIdx} className="list-disc pl-5 space-y-1.5 py-1">
                        {para.split('\n').map((line, lIdx) => (
                          <li key={lIdx}>{line.replace(/^- |^\* /, '')}</li>
                        ))}
                      </ul>
                    );
                  }
                  
                  return (
                    <p key={pIdx}>
                      {/* Sub-formatting nested bold labels */}
                      {para.includes('**') ? (
                        para.split('**').map((chunk, cIdx) => (
                          cIdx % 2 === 1 ? <strong key={cIdx} className="text-[#1C2321]">{chunk}</strong> : chunk
                        ))
                      ) : para}
                    </p>
                  );
                })}
              </div>

              {/* Back button at end */}
              <div className="pt-8 text-center select-none">
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="px-6 py-3 bg-[#0F5A29] text-white font-semibold rounded-xl text-xs uppercase tracking-wider hover:bg-[#0c4a21]"
                >
                  Clear Reading Page
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
