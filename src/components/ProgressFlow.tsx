import React, { useState } from 'react';
import { Camera, Calendar, Award, Check, Sparkles, Sliders, ChevronRight, TrendingUp, Droplets, Activity } from 'lucide-react';
// @ts-ignore
import scalpBefore from '../assets/images/female_scalp_before_1781542595597.jpg';
// @ts-ignore
import scalpAfter from '../assets/images/female_scalp_after_1781542612380.jpg';

interface ProgressFlowProps {
  onAddPoints: (pts: number) => void;
}

export default function ProgressFlow({ onAddPoints }: ProgressFlowProps) {
  const [sliderPos, setSliderPos] = useState<number>(50);
  const [photosList, setPhotosList] = useState([
    { date: 'Initial (15 Mar)', label: 'Baseline', image: scalpBefore },
    { date: 'Month 1 (15 Apr)', label: 'Pitta Stabilized', image: scalpBefore },
    { date: 'Month 2 (15 May)', label: 'Root Sprouting', image: scalpAfter }
  ]);
  const [uploadState, setUploadState] = useState<'idle' | 'uploading' | 'suc'>('idle');

  const triggerUpload = () => {
    setUploadState('uploading');
    setTimeout(() => {
      setUploadState('suc');
      onAddPoints(100); // Reward 100 points for keeping track!
      setPhotosList([...photosList, {
        date: 'Today (15 Jun)',
        label: 'Active density sprout',
        image: scalpAfter
      }]);
      setTimeout(() => {
        setUploadState('idle');
      }, 3000);
    }, 2200);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#FAF8F5] overflow-y-auto px-5 py-5 space-y-6">
      
      {/* 1. PROGRESS TRACKING DASHBOARD */}
      <div>
        <span className="text-[10px] font-bold text-[#0F5A29] bg-[#E8F3EA] px-2.5 py-1 rounded-full uppercase tracking-wider font-mono">
          Trichological Validation
        </span>
        <h3 className="text-xl font-serif text-[#1C2321] mt-2 leading-tight">
          Progress Tracking Hub
        </h3>
        <p className="text-xs text-neutral-500 mt-1 leading-relaxed font-sans">
          Consistent daily routines trigger clinical rejuvenation. Upload a photo every 30 days to obtain validation and expert check-ins.
        </p>
      </div>

      {/* 2. EXQUISITE BEFORE/AFTER SLIDER SCREEN */}
      <div className="bg-white rounded-3xl p-5 border border-[#E9E4DB] space-y-4 shadow-sm">
        <div className="flex justify-between items-center select-none">
          <div>
            <h4 className="font-serif text-sm text-[#1C2321]">Interactive 90-Day Comparison</h4>
            <p className="text-[10px] text-neutral-400">Drag center slider control to compare</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-[#FAF7F2] text-[#0F5A29] flex items-center justify-center border border-[#ECE6DB]">
            <Sliders className="w-4 h-4" />
          </div>
        </div>

        {/* The slider visual container */}
        <div className="relative w-full h-[260px] rounded-2xl overflow-hidden select-none shadow-inner border border-neutral-100">
          {/* AFTER IMAGE (Fully visible in background) */}
          <img 
            src={scalpAfter} 
            alt="After" 
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          />
          <div className="absolute right-4 bottom-4 bg-[#0F5A29]/95 text-white text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-md z-10 backdrop-blur-sm">
            After 90 Days
          </div>

          {/* BEFORE IMAGE (Clipped overlay) */}
          <div 
            className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
          >
            <img 
              src={scalpBefore} 
              alt="Before" 
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-[260px] object-cover" 
            />
          </div>
          <div 
            className="absolute left-4 bottom-4 bg-orange-600/95 text-white text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-md z-10 backdrop-blur-sm pointer-events-none transition-opacity duration-200"
            style={{ opacity: sliderPos > 20 ? 1 : 0 }}
          >
            Baseline Sparse
          </div>

          {/* Center drag handle line bar */}
          <div 
            className="absolute top-0 bottom-0 w-[4px] bg-[#FAF8F5] cursor-col-resize z-20 flex items-center justify-center shadow-lg"
            style={{ left: `${sliderPos}%` }}
          >
            <div className="w-8 h-8 rounded-full bg-white text-[#0F5A29] border-2 border-[#0F5A29] shadow-md flex items-center justify-center font-bold text-xs">
              ↔
            </div>
          </div>
        </div>

        {/* Input slider control */}
        <input 
          type="range" 
          min="0" 
          max="100" 
          value={sliderPos} 
          onChange={(e) => setSliderPos(Number(e.target.value))}
          className="w-full accent-[#0F5A29] h-1.5 bg-[#EEECE5] rounded-lg appearance-none cursor-pointer"
        />
      </div>

      {/* 2.5 SCALP CLINICAL BIOMETRICS (NEW ADDITION) */}
      <div className="bg-white rounded-3xl p-5 border border-[#E9E4DB] space-y-4 shadow-sm">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-[#0F5A29]" />
          <h4 className="font-serif text-sm text-[#1C2321]">Clinical Scalp Biometrics</h4>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center select-none pt-1">
          <div className="bg-[#FAF8F5] p-3 rounded-2xl border border-[#EDE7DB] space-y-1">
            <TrendingUp className="w-4 h-4 text-[#0F5A29] mx-auto mb-1.5" />
            <span className="text-[9px] uppercase tracking-wider text-neutral-400 font-bold block">Follicle Density</span>
            <span className="text-sm font-serif font-bold text-[#0F5A29] block">+18.4%</span>
            <span className="text-[8px] text-neutral-400 block font-semibold">Active Sprouts</span>
          </div>

          <div className="bg-[#FAF8F5] p-3 rounded-2xl border border-[#EDE7DB] space-y-1">
            <Droplets className="w-4 h-4 text-[#0F5A29] mx-auto mb-1.5" />
            <span className="text-[9px] uppercase tracking-wider text-neutral-400 font-bold block">Sebum Status</span>
            <span className="text-sm font-serif font-bold text-[#8C7A5B] block">Healthy Pitta</span>
            <span className="text-[8px] text-green-600 block font-semibold">Normalized</span>
          </div>

          <div className="bg-[#FAF8F5] p-3 rounded-2xl border border-[#EDE7DB] space-y-1">
            <Sparkles className="w-4 h-4 text-[#0F5A29] mx-auto mb-1.5" />
            <span className="text-[9px] uppercase tracking-wider text-neutral-400 font-bold block">Anagen Stage</span>
            <span className="text-sm font-serif font-bold text-[#0F5A29] block">Prolonged</span>
            <span className="text-[8px] text-neutral-400 block font-semibold">4.2 Year Cycle</span>
          </div>
        </div>

        {/* Accountability telemetry summary */}
        <div className="text-[10px] text-neutral-500 font-semibold leading-relaxed border-t border-[#F0EAE0] pt-3 flex items-center gap-1.5">
          <Check className="w-4 h-4 text-green-600" />
          <span>Biometric validation status: <strong className="text-neutral-700">Clinically Verified</strong>. Follicle degradation successfully halted.</span>
        </div>
      </div>

      {/* 3. SIMULATING MONTHLY PROGRESS UPLOAD */}
      <div className="bg-[#FAF7F2] rounded-3xl p-5 border border-[#ECE6DB] space-y-4">
        <div className="flex justify-between items-start gap-4">
          <div className="space-y-1.5">
            <h4 className="font-serif text-sm text-[#1C2321]">Monthly Scan Log</h4>
            <p className="text-[11px] text-neutral-600 leading-normal">
              Need to add today's snapshot? Submit another photo to keep your streak healthy and win <strong>+100 VP</strong> points!
            </p>
          </div>
          
          <button 
            onClick={triggerUpload}
            disabled={uploadState !== 'idle'}
            className="w-12 h-12 rounded-2xl bg-white border border-[#E0D9CC] text-[#0F5A29] flex items-center justify-center hover:bg-[#E8F3EA] active:scale-95 shrink-0 transition-all shadow-sm"
          >
            <Camera className="w-5 h-5" />
          </button>
        </div>

        {/* Upload feedback line */}
        {uploadState === 'uploading' && (
          <div className="bg-white/60 p-3 rounded-xl text-center text-xs text-neutral-500 font-medium border border-neutral-200 animate-pulse">
            🔍 Scanning patterns and follicles...
          </div>
        )}
        {uploadState === 'suc' && (
          <div className="bg-[#E8F3EA] p-3 rounded-xl text-center text-xs text-[#0F5A29] font-bold border border-[#A4D5AF] flex items-center justify-center gap-1.5">
            <Check className="w-4 h-4 stroke-[3px]" /> Scalp scan added to history! +100 VP points awarded.
          </div>
        )}
      </div>

      {/* 4. MILESTONE TRACKING */}
      <div>
        <h4 className="text-xs uppercase font-bold text-neutral-400 tracking-wider mb-3">
          History & Timeline Milestones:
        </h4>
        <div className="space-y-3">
          {photosList.map((ph, idx) => (
            <div key={idx} className="bg-white rounded-2.5xl p-3.5 border border-[#F0EAE0] flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-3">
                <img src={ph.image} alt={ph.date} referrerPolicy="no-referrer" className="w-12 h-12 rounded-xl object-cover border border-neutral-100" />
                <div>
                  <h5 className="font-bold text-xs text-[#1C2321]">{ph.date}</h5>
                  <span className="text-[10px] text-neutral-400 font-semibold">{ph.label}</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-[#0F5A29] font-bold bg-[#E8F3EA] px-2.5 py-1 rounded-full uppercase">
                <Check className="w-3 h-3 stroke-[3px]" /> Verified
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
