import React, { useState } from 'react';
import MobileFrame from './components/MobileFrame';
import AssessmentFlow from './components/AssessmentFlow';
import ResultsFlow from './components/ResultsFlow';
import DashboardFlow from './components/DashboardFlow';
import ProgressFlow from './components/ProgressFlow';
import SupportFlow from './components/SupportFlow';
import EducationFlow from './components/EducationFlow';
import { 
  Calendar, Award, Sparkles, MessageSquare, BookOpen, 
  ChevronRight, Lock, User, Plus, Info, X, Check, Heart, HelpCircle, Gift, Menu
} from 'lucide-react';

export default function App() {
  // Navigation: 'routine' | 'treatments' | 'progress' | 'coach' | 'rewards' | 'education'
  const [activeTab, setActiveTab] = useState<'routine' | 'treatments' | 'progress' | 'coach' | 'rewards' | 'education'>('treatments');
  
  // Hair Loss Module state machine:
  // 'none' (Treatments list view)
  // 'landing' (Hair Loss Module Hub Introduction)
  // 'assessment' (Quiz + Photo scan)
  // 'results' (Analysis output + Doctor booking)
  // 'active' (Unlocked fully integrated dashboard)
  const [hairLossState, setHairLossState] = useState<'none' | 'landing' | 'assessment' | 'results' | 'active'>('none');
  
  const [points, setPoints] = useState<number>(320); // Baseline loyalty points
  const [isAssessed, setIsAssessed] = useState<boolean>(false);
  const [assessmentAnswers, setAssessmentAnswers] = useState<Record<string, string>>({});
  const [scalpPhoto, setScalpPhoto] = useState<string>('');
  
  // Educational reading modal helper
  const [showVedicTips, setShowVedicTips] = useState<boolean>(false);
  const [activeTreatModal, setActiveTreatModal] = useState<'skin' | 'yoga' | null>(null);

  const handleAddPoints = (pts: number) => {
    setPoints(prev => Math.max(0, prev + pts));
  };

  const handleCompleteAssessment = (answers: Record<string, string>, photoUrl: string) => {
    setAssessmentAnswers(answers);
    setScalpPhoto(photoUrl);
    setHairLossState('results');
  };

  const handleExploreCoreApp = () => {
    setIsAssessed(true);
    setHairLossState('active');
    setActiveTab('routine'); // Automatically jump to their new personalized routine!
  };

  return (
    <MobileFrame points={points}>
      {/* ------------------------------------------------------------- */}
      {/* SCREEN ROUTING & LOCKS BY TAB                                  */}
      {/* ------------------------------------------------------------- */}
      <div className="flex-1 flex flex-col overflow-hidden pb-[68px]">
        
        {/* ========================================================= */}
        {/* TAB 1: ROUTINE (Daily wellness routine)                    */}
        {/* ========================================================= */}
        {activeTab === 'routine' && (
          <DashboardFlow points={points} onAddPoints={handleAddPoints} />
        )}

        {/* ========================================================= */}
        {/* TAB 2: TREATMENTS (Main Hub)                              */}
        {/* ========================================================= */}
        {activeTab === 'treatments' && (
          <>
            {/* SUB-FLOW: LIST TARGETS (ORIGINAL DESIGN APPSCREEN) */}
            {hairLossState === 'none' && (
              <div className="flex-1 overflow-y-auto">
                {/* Menu / Header decoration */}
                <div className="px-5 pt-3 pb-2 flex justify-between items-center select-none bg-white border-b border-[#FAF6F0]">
                  <div className="w-9 h-9 rounded-full bg-[#FAF7F2] flex items-center justify-center cursor-pointer border border-[#F2ECE4] hover:bg-neutral-100/50 transition-all">
                    <Menu className="w-4 h-4 text-neutral-500" />
                  </div>
                  <div className="text-center">
                    <h1 className="text-sm font-bold tracking-[0.2em] text-[#1C2321] uppercase">
                      Vedic Lab
                    </h1>
                    <span className="text-[7.5px] font-bold tracking-[0.3em] text-[#8C7A5B] uppercase block">
                      Switzerland
                    </span>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-[#FAF7F2] flex items-center justify-center border border-[#F2ECE4]">
                    <User className="w-4 h-4 text-neutral-500" />
                  </div>
                </div>

                <div className="p-5 space-y-5">
                  {/* Doctor Consultation Row */}
                  <div className="bg-gradient-to-r from-[#0F5A29] to-[#176F36] rounded-[28px] p-5 text-white relative overflow-hidden shadow-md">
                    {/* Background botanical leaf illustration */}
                    <div className="absolute right-[-44px] bottom-[-44px] w-40 h-40 rounded-full bg-white/5" />
                    
                    <div className="flex justify-between items-start">
                      <div className="space-y-1 max-w-[180px]">
                        <h4 className="text-base font-serif font-semibold leading-snug">
                          Consult with an Ayurvedic doctor
                        </h4>
                        <p className="text-[10px] text-[#A4D5AF] leading-relaxed">
                          Speak with our Switzerland-certified specialists regarding hair density anomalies or skin distress.
                        </p>
                      </div>
                      <img 
                        src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=200&auto=format&fit=crop" 
                        alt="Doctor" 
                        referrerPolicy="no-referrer"
                        className="w-16 h-16 rounded-full object-cover shrink-0 border border-white/20"
                      />
                    </div>
                    <button 
                      onClick={() => {
                        setHairLossState('landing');
                      }}
                      className="mt-4 px-5 py-2.5 bg-white text-[#0F5A29] rounded-full text-[10px] font-bold uppercase tracking-wider hover:bg-neutral-100 transition-all shadow-sm"
                    >
                      Book Now
                    </button>
                  </div>

                  {/* Title Label */}
                  <div className="pt-2">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-[#8C7A5B]">
                      Your Personalized Wellness Treatments
                    </h3>
                  </div>

                  {/* Hair Health Category - ENTERS HAIR LOSS WORKFLOW! */}
                  <button 
                    onClick={() => {
                      setHairLossState('landing');
                    }}
                    className="w-full text-left bg-white rounded-3xl p-5 border-2 border-[#0F5A29] shadow-md flex items-center justify-between hover:bg-[#E8F3EA]/20 relative overflow-hidden group"
                  >
                    {/* Tiny green active tag */}
                    <span className="absolute top-4 right-5 bg-[#0F5A29] text-white text-[8px] font-bold uppercase px-2.5 py-1 rounded-full select-none">
                      Enhanced
                    </span>
                    
                    <div className="flex items-center gap-4">
                      <img 
                        src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=200&auto=format&fit=crop" 
                        alt="Hair Health" 
                        referrerPolicy="no-referrer"
                        className="w-14 h-14 rounded-xl object-cover object-top"
                      />
                      <div>
                        <h4 className="font-bold text-sm text-[#1C2321] group-hover:text-[#0F5A29] transition-all">
                          Hair Loss Management
                        </h4>
                        <span className="text-[10px] text-neutral-400 block mt-1">Khalitya, Density recheck, Regrowth kit</span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-[#0F5A29]" />
                  </button>
                </div>
              </div>
            )}

            {/* SUB-FLOW: 1. HAIR HEALTH LANDING SCREEN */}
            {hairLossState === 'landing' && (
              <div className="flex-1 overflow-y-auto px-5 py-6 space-y-6">
                <div>
                  <button 
                    onClick={() => setHairLossState('none')}
                    className="text-xs font-bold text-neutral-400 hover:text-neutral-600 flex items-center gap-1 uppercase select-none"
                  >
                    &larr; Back to Treatments
                  </button>
                  <h2 className="text-2xl font-serif text-[#1C2321] mt-3">
                    Hair Loss Management program
                  </h2>
                  <p className="text-xs text-neutral-500 leading-relaxed mt-1">
                    An extension of our traditional diagnostics system. Fully designed for treating structural thinning, shedding, and scalp heat.
                  </p>
                </div>

                {/* Hero Illustration Card */}
                <div className="rounded-[28px] overflow-hidden bg-white border border-[#E9E4DB] shadow-sm relative">
                  <img 
                    src="https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?q=80&w=600&auto=format&fit=crop" 
                    alt="Clinical Hair Care" 
                    referrerPolicy="no-referrer"
                    className="w-full h-44 object-cover object-center" 
                  />
                  <div className="p-4 space-y-2">
                    <span className="text-[9px] uppercase font-extrabold tracking-wider bg-[#E8F3EA] text-[#0F5A29] px-2.5 py-0.5 rounded-full inline-block">
                      90-Day Clinical System
                    </span>
                    <h3 className="font-serif text-[15px] font-semibold text-[#1C2321]">
                      Prakriti Scalp Balancing & Follicle Re-Growth
                    </h3>
                    <p className="text-xs text-neutral-500 leading-normal">
                      By tracing your biological constitutional heat, we customize overnight botanical formulas, stress rhythms, and offer full-cycle expert doctor validation.
                    </p>
                  </div>
                </div>

                {/* Scope features bullet points */}
                <div className="space-y-3.5 bg-[#FAF7F2] p-4 rounded-2.5xl border border-[#ECE6DB]">
                  <h4 className="text-[11px] font-bold text-[#8C7A5B] uppercase tracking-wider select-none">
                    Included in your module:
                  </h4>
                  <div className="grid grid-cols-2 gap-3 text-xs text-neutral-600 font-semibold">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[#0F5A29] text-base leading-none">•</span> Scalp photo scan
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[#0F5A29] text-base leading-none">•</span> Re-growth kit
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[#0F5A29] text-base leading-none">•</span> Daily routines
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[#0F5A29] text-base leading-none">•</span> Live consultations
                    </div>
                  </div>
                </div>

                <div className="pt-2 select-none">
                  <button
                    onClick={() => setHairLossState('assessment')}
                    className="w-full h-14 bg-[#0F5A29] text-white rounded-2xl font-semibold tracking-wide uppercase shadow-md hover:bg-[#0c4a21] transition-all"
                  >
                    Start Free Scalp Scan
                  </button>
                  <p className="text-[10px] text-neutral-400 text-center mt-2.5">
                    Takes only 3 minutes • 100% HIPAA protected data.
                  </p>
                </div>
              </div>
            )}

            {/* SUB-FLOW: 2 / 3 / 4 / 5. ASSESSMENT WORKFLOW */}
            {hairLossState === 'assessment' && (
              <AssessmentFlow 
                onBack={() => setHairLossState('landing')} 
                onAssessmentCompleted={handleCompleteAssessment} 
              />
            )}

            {/* SUB-FLOW: 6 / 7 / 8 / 9. RESULTS & BOOKING & CONFIRMED WORKFLOW */}
            {hairLossState === 'results' && (
              <ResultsFlow 
                answers={assessmentAnswers} 
                photoUrl={scalpPhoto} 
                onExploreApp={handleExploreCoreApp} 
              />
            )}

            {/* SUB-FLOW: 10+. DETAILED ACTIVE TREATMENT PORTAL */}
            {hairLossState === 'active' && (
              <div className="flex-1 flex flex-col h-full bg-[#FAF8F5]">
                <div className="h-16 px-4 bg-white border-b border-[#F0EAE0] flex items-center justify-between shrink-0 select-none z-10">
                  <div className="flex items-center gap-2">
                    <img src={scalpPhoto} alt="Profile Scan" referrerPolicy="no-referrer" className="w-9 h-9 rounded-full object-cover border border-[#0F5A29]" />
                    <div>
                      <h4 className="font-serif text-xs font-bold text-[#1C2321]">Kalitya Recovery Plan</h4>
                      <span className="text-[9px] text-[#0F5A29] font-bold">Grade I Thinning Aligned</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => {
                      if (window.confirm('Would you like to repeat your scalp scan and assessment questionnaire?')) {
                        setHairLossState('landing');
                      }
                    }}
                    className="text-[10px] font-bold uppercase text-[#8C7A5B] hover:text-neutral-600"
                  >
                    Re-scan Scalp
                  </button>
                </div>

                <DashboardFlow points={points} onAddPoints={handleAddPoints} />
              </div>
            )}
          </>
        )}

        {/* ========================================================= */}
        {/* TAB 3: PROGRESS (Durable Progress Dashboard)               */}
        {/* ========================================================= */}
        {activeTab === 'progress' && (
          <ProgressFlow onAddPoints={handleAddPoints} />
        )}

        {/* ========================================================= */}
        {/* TAB 4: COACH (Doctor conversational chat)                  */}
        {/* ========================================================= */}
        {activeTab === 'coach' && (
          <SupportFlow />
        )}

        {/* ========================================================= */}
        {/* TAB 5: REWARDS (Green Tier, Silver Tier, Coupon Slips)    */}
        {/* ========================================================= */}
        {activeTab === 'rewards' && (
          <div className="flex-1 overflow-y-auto px-5 py-5 space-y-6">
            <div className="text-center space-y-1">
              <h1 className="text-base font-bold tracking-[0.2em] text-[#1C2321] uppercase">
                Vedic Rewards
              </h1>
              <span className="text-[9px] font-bold tracking-[0.3em] text-[#8C7A5B] uppercase block">
                Switzerland Club
              </span>
            </div>

            {/* Total Vedic Points Card */}
            <div className="bg-[#E8F3EA]/60 rounded-3xl p-5 border border-[#D5EAD8] text-center shadow-sm relative overflow-hidden">
              <div className="absolute top-[-20px] left-[-20px] w-20 h-20 rounded-full bg-[#0F5A29]/5" />
              
              <span className="text-3xl font-serif text-[#0F5A29] font-bold block select-none">
                {points}
              </span>
              <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-widest mt-1 block">
                Total Lifetime Vedic Points Earned
              </span>

              {/* Progress bar to next tier */}
              <div className="mt-5 space-y-1 text-left">
                <div className="flex justify-between text-[10px] text-neutral-400 font-bold uppercase tracking-wider select-none">
                  <span>Green Tier</span>
                  <span className="text-[#0F5A29]">{Math.max(0, 1000 - points)} Points to SILVER TIER</span>
                </div>
                <div className="w-full h-2 bg-[#EEECE5] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#0F5A29] rounded-full transition-all duration-500" 
                    style={{ width: `${Math.min(100, (points / 1000) * 100)}%` }} 
                  />
                </div>
              </div>
            </div>

            {/* Tier Benefits */}
            <div className="bg-white rounded-3xl p-5 border border-[#EDE9E0] space-y-4 shadow-sm">
              <span className="text-xs font-bold uppercase tracking-widest text-[#8C7A5B] block select-none">
                Benefits of Next Tier
              </span>
              
              <div className="border-t border-[#F2ECE4] pt-4 flex gap-4 items-center">
                <div className="w-12 h-12 rounded-2xl bg-[#E8F3EA] text-[#0F5A29] flex items-center justify-center font-serif text-lg font-bold shrink-0 border border-[#CDE5D2]">
                  Ag
                </div>
                <div>
                  <h4 className="font-serif text-sm font-semibold text-[#1C2321]">Silver Tier Access</h4>
                  <p className="text-xs text-neutral-500 mt-0.5 leading-normal">
                    Unlocks flat 12% off all individual custom formulated Vedic Lab hair, skin, and wellness products on standard orders.
                  </p>
                </div>
              </div>
            </div>

            {/* Active Coupon Slip (Coupon 10VL25) */}
            <div className="bg-[#FAF7F2] rounded-3xl p-5 border border-[#ECE6DB] text-center shadow-sm relative overflow-hidden space-y-3">
              {/* Circular cuts on edge to style as paper coupon */}
              <div className="absolute left-[-8px] top-1/2 transform -translate-y-1/2 w-4 h-4 bg-[#FAF8F5] rounded-full border-r border-[#ECE6DB]" />
              <div className="absolute right-[-8px] top-1/2 transform -translate-y-1/2 w-4 h-4 bg-[#FAF8F5] rounded-full border-l border-[#ECE6DB]" />

              <h4 className="font-serif text-sm text-[#1C2321] leading-relaxed">
                Your discount voucher for 10.00% off on our webshop
              </h4>
              <div className="text-2xl font-serif font-bold text-[#0F5A29] bg-white border border-dashed border-[#0F5A29]/40 py-2.5 rounded-xl block max-w-[180px] mx-auto select-all">
                10VL25
              </div>
              <span className="text-[9px] text-neutral-400 font-bold uppercase tracking-wider block">
                Copy coupon code & apply during checkout
              </span>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 6: EDUCATION (Treatises Library)                       */}
        {/* ========================================================= */}
        {activeTab === 'education' && (
          <EducationFlow />
        )}

      </div>

      {/* ------------------------------------------------------------- */}
      {/* STATIC MULTI-TAB BOTTOM MENU NAVIGATION INDICATORS (5 TABS)     */}
      {/* ------------------------------------------------------------- */}
      <div className="absolute bottom-0 inset-x-0 bg-white/95 border-t border-[#F2ECE0] h-[68px] px-1.5 flex justify-between items-center select-none z-30 backdrop-blur-md">
        
        {/* TAB: ROUTINE */}
        <button
          onClick={() => setActiveTab('routine')}
          className={`flex-1 flex flex-col items-center justify-center h-full gap-1 transition-all ${
            activeTab === 'routine' ? 'text-[#0F5A29]' : 'text-neutral-400 hover:text-neutral-600'
          }`}
        >
          <Calendar className="w-4.5 h-4.5 shrink-0" />
          <span className="text-[8.5px] font-bold uppercase tracking-wide text-center">Routine</span>
        </button>

        {/* TAB: TREATMENTS */}
        <button
          onClick={() => setActiveTab('treatments')}
          className={`flex-1 flex flex-col items-center justify-center h-full gap-1 transition-all ${
            activeTab === 'treatments' ? 'text-[#0F5A29]' : 'text-neutral-400 hover:text-neutral-600'
          }`}
        >
          {/* Overlapping leaf emblem style - uses standard layers */}
          <div className="relative">
            <Sparkles className="w-4.5 h-4.5 shrink-0" />
            {!isAssessed && (
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-amber-500 rounded-full border border-white" />
            )}
          </div>
          <span className="text-[8.5px] font-bold uppercase tracking-wide text-center">Treatments</span>
        </button>

        {/* TAB: PROGRESS */}
        <button
          onClick={() => setActiveTab('progress')}
          className={`flex-1 flex flex-col items-center justify-center h-full gap-1 transition-all ${
            activeTab === 'progress' ? 'text-[#0F5A29]' : 'text-neutral-400 hover:text-neutral-600'
          }`}
        >
          <Award className="w-4.5 h-4.5 shrink-0" />
          <span className="text-[8.5px] font-bold uppercase tracking-wide text-center">Progress</span>
        </button>

        {/* TAB: COACH */}
        <button
          onClick={() => setActiveTab('coach')}
          className={`flex-1 flex flex-col items-center justify-center h-full gap-1 transition-all relative ${
            activeTab === 'coach' ? 'text-[#0F5A29]' : 'text-neutral-400 hover:text-neutral-600'
          }`}
        >
          <MessageSquare className="w-4.5 h-4.5 shrink-0" />
          <span className="text-[8.5px] font-bold uppercase tracking-wide text-center">Coach</span>
        </button>

        {/* TAB: SHASTRA / LIBRARY */}
        <button
          onClick={() => setActiveTab('education')}
          className={`flex-1 flex flex-col items-center justify-center h-full gap-1 transition-all relative ${
            activeTab === 'education' ? 'text-[#0F5A29]' : 'text-neutral-400 hover:text-neutral-600'
          }`}
        >
          <BookOpen className="w-4.5 h-4.5 shrink-0" />
          <span className="text-[8.5px] font-bold uppercase tracking-wide text-center">Library</span>
        </button>

        {/* TAB: REWARDS */}
        <button
          onClick={() => setActiveTab('rewards')}
          className={`flex-1 flex flex-col items-center justify-center h-full gap-1 transition-all ${
            activeTab === 'rewards' ? 'text-[#0F5A29]' : 'text-neutral-400 hover:text-neutral-600'
          }`}
        >
          <Gift className="w-4.5 h-4.5 shrink-0" />
          <span className="text-[8.5px] font-bold uppercase tracking-wide text-center">Rewards</span>
        </button>
      </div>

      {/* ========================================================= */}
      {/* SIDE CLIENT HEALTH-MODALS (SKIN & MINDFUL CODES)           */}
      {/* ========================================================= */}
      {activeTreatModal && (
        <div className="absolute inset-0 bg-black/50 z-50 flex items-center justify-center p-6 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-5 border border-[#EDE9E0] text-center w-full max-w-[280px] space-y-4 animate-slide-up">
            <div className="w-12 h-12 rounded-full bg-[#E8F3EA] text-[#0F5A29] flex items-center justify-center mx-auto border border-[#CDE5D2]">
              <Sparkles className="w-5 h-5" />
            </div>
            
            <div>
              <h4 className="font-serif text-base text-[#1C2321]">
                {activeTreatModal === 'skin' ? 'Skin Glow Protocol' : 'Face Yoga Circulation'}
              </h4>
              <p className="text-xs text-neutral-500 leading-relaxed mt-1.5">
                {activeTreatModal === 'skin' 
                  ? 'Our primary dermatology diagnostics mapped using Swiss dermal-capsule systems. Join over 42,000 satisfied glow-recipients.' 
                  : 'Stretching minor facial nodes triggers nutrient flow in facial epidermal zones. Unlock daily 5-minute posing routines.'}
              </p>
            </div>

            <button
              onClick={() => setActiveTreatModal(null)}
              className="w-full py-3.5 bg-[#0F5A29] text-white font-semibold rounded-xl text-xs uppercase tracking-wider"
            >
              Clear screen
            </button>
          </div>
        </div>
      )}
    </MobileFrame>
  );
}
