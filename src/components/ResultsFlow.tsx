import React, { useState } from 'react';
import { ArrowLeft, Check, Sparkles, Calendar, Clock, Video, Info, ArrowRight, ShieldCheck, Heart, Award, FileText, Download, ShieldAlert } from 'lucide-react';

// @ts-ignore
import scalpBefore from '../assets/images/female_scalp_before_1781542595597.jpg';

interface ResultsFlowProps {
  answers: Record<string, string>;
  photoUrl: string;
  onExploreApp: () => void;
}

export default function ResultsFlow({ answers, photoUrl, onExploreApp }: ResultsFlowProps) {
  const [screen, setScreen] = useState<'results' | 'booking' | 'confirmed'>('results');
  const [selectedDate, setSelectedDate] = useState<string>('Tomorrow, 16 Jun');
  const [selectedTime, setSelectedTime] = useState<string>('10:30 AM');
  const [prescriptionDownloaded, setPrescriptionDownloaded] = useState<boolean>(false);

  const dates = [
    'Tomorrow, 16 Jun',
    'Wednesday, 17 Jun',
    'Thursday, 18 Jun',
    'Friday, 19 Jun'
  ];

  const timeSlots = [
    '09:00 AM',
    '10:30 AM',
    '11:45 AM',
    '02:30 PM',
    '04:00 PM',
    '05:15 PM'
  ];

  const handleBookConsultation = () => {
    setScreen('confirmed');
  };

  const [showToast, setShowToast] = useState<boolean>(false);

  const downloadPrescription = () => {
    setPrescriptionDownloaded(true);
    setTimeout(() => {
      setPrescriptionDownloaded(false);
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3500);
    }, 800);
  };

  const getThinningLabel = () => {
    const concern = answers['hair_concern'];
    if (concern === 'receding') return 'Frontal Temple Sparse (Grade II)';
    if (concern === 'crown') return 'Vertex Crown Sparse (Grade III-A)';
    if (concern === 'shedding') return 'Reactive Telogen Effluvium';
    if (concern === 'dryness') return 'Strained Cuticle Dehydration';
    return 'Moderate Hair Fall (Grade I)';
  };

  const getAgniImbalance = () => {
    const agni = answers['absorption_agni'];
    if (agni === 'sluggish') return 'Mandagni (Sluggish Metabolism)';
    if (agni === 'excessive_acid') return 'Tikshnagni (Hyper-acidic Overheating)';
    if (agni === 'sluggish_greasy') return 'Mandangni with Kapha block';
    return 'Samagni (Balanced Metabolic Fire)';
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#FAF8F5] overflow-y-auto">
      {/* HEADER */}
      <div className="h-16 px-4 flex items-center justify-between border-b border-[#F2EDE4] bg-white sticky top-0 z-30 shrink-0">
        {screen !== 'confirmed' && (
          <button 
            onClick={() => {
              if (screen === 'booking') setScreen('results');
            }}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-[#F7F4F0] text-[#1E2422]"
            disabled={screen === 'results'}
            style={{ opacity: screen === 'results' ? 0.3 : 1 }}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        )}
        <span className="font-serif text-lg tracking-wide uppercase font-semibold text-[#1C2321]">
          {screen === 'results' && 'Your Hair Profile'}
          {screen === 'booking' && 'Schedule Consult'}
          {screen === 'confirmed' && 'Booking Complete'}
        </span>
        <div className="w-10" />
      </div>

      {/* 1. ANALYSIS RESULTS SCREEN */}
      {screen === 'results' && (
        <div className="flex-1 px-5 py-6 space-y-6">
          {/* Medical Trust Badging */}
          <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl border border-[#0F5A29]/20 shadow-sm">
            <Award className="w-5 h-5 text-[#0F5A29] shrink-0" />
            <div className="text-[10px] text-neutral-600 leading-snug">
              <span className="font-bold text-[#0F5A29]">M.D. Board Certified Analysis:</span> Formulated in Switzerland under strict trichological safety specifications and Ayurvedic pharmacopoeia guidelines.
            </div>
          </div>

          {/* Main profile score card */}
          <div className="bg-[#FAF7F2] rounded-3xl p-5 border border-[#E9E4DB] relative overflow-hidden shadow-sm">
            {/* Visual background leaf circle */}
            <div className="absolute -right-8 -top-8 w-24 h-24 rounded-full bg-[#0F5A29]/5" />
            
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full border border-[#D5CAA8] p-1 shrink-0 relative">
                <img src={photoUrl || scalpBefore} alt="Scalp" referrerPolicy="no-referrer" className="w-full h-full object-cover rounded-full" />
                <div className="absolute -bottom-1 -right-1 bg-[#0F5A29] text-white p-0.5 rounded-full text-[9px] font-bold">
                  92%
                </div>
              </div>
              <div className="flex-1">
                <span className="text-[9px] uppercase tracking-wider font-extrabold text-[#0F5A29] bg-[#E8F3EA] px-2 py-0.5 rounded-full">
                  Pitta-Vata imbalance
                </span>
                <h3 className="text-lg font-serif text-[#1C2321] mt-1 leading-tight">
                  Kalitya Diagnostic
                </h3>
                <p className="text-xs text-neutral-500 mt-1 flex flex-wrap gap-x-2 items-center">
                  <span>Pattern:</span> <strong className="text-neutral-700">{getThinningLabel()}</strong>
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2.5 mt-5 border-t border-[#EDE9E0] pt-4 text-center">
              <div>
                <span className="text-[10px] text-neutral-400 block uppercase font-bold">Follicle Vitality</span>
                <span className="text-xl font-serif text-red-600 block mt-0.5">58%</span>
              </div>
              <div className="border-x border-[#EDE9E0]">
                <span className="text-[10px] text-neutral-400 block uppercase font-bold">Root Anchorage</span>
                <span className="text-xl font-serif text-[#D4AF37] block mt-0.5">Medium</span>
              </div>
              <div>
                <span className="text-[10px] text-neutral-400 block uppercase font-bold">Sebum Index</span>
                <span className="text-xl font-serif text-[#0F5A29] block mt-0.5">High Pitta</span>
              </div>
            </div>

            {/* Metabolic/Agni status display */}
            <div className="mt-4 pt-3 border-t border-[#EDE9E0] flex justify-between items-center text-[11px]">
              <span className="text-neutral-400 font-bold uppercase">Agni (Metabolic) Rate:</span>
              <span className="font-semibold text-[#8C7A5B]">{getAgniImbalance()}</span>
            </div>
          </div>

          {/* Root cause analysis */}
          <div>
            <h4 className="text-xs uppercase font-bold text-neutral-400 tracking-wider mb-3">
              Core Root Cause Mapping:
            </h4>
            <div className="space-y-3">
              <div className="bg-white rounded-2xl p-4 border border-[#E9E4DB] flex gap-3.5 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-[#FAF0E6] flex items-center justify-center text-[#D2691E] font-bold text-sm shrink-0">
                  🔥
                </span>
                <div>
                  <h5 className="font-semibold text-xs text-[#1C2321]">Follicular Heat Aggravation (Pitta)</h5>
                  <p className="text-[11px] text-neutral-500 leading-normal mt-1">
                    Your stress index combined with constitutional factors causes high vascular heat, speeding up the hair growth cycle and shortening the growth (Anagen) window.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-4 border border-[#E9E4DB] flex gap-3.5 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-[#E6F3FA] flex items-center justify-center text-[#1E90FF] font-bold text-sm shrink-0">
                  🌬️
                </span>
                <div>
                  <h5 className="font-semibold text-xs text-[#1C2321]">Prana Vata Circulation Block</h5>
                  <p className="text-[11px] text-neutral-500 leading-normal mt-1">
                    Micro-circulation is compromised around the crown aperture, causing follicles to receive fewer active blood nutrients (Ahara).
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Ayurvedic Dietary Prescription Sheet (Traya style) */}
          <div className="bg-white rounded-3xl p-5 border border-[#EDE9E0] space-y-3 shadow-sm">
            <span className="text-[9px] uppercase tracking-wider font-extrabold text-[#8C7A5B] bg-[#FAF3E5] px-2.5 py-0.5 rounded-full inline-block">
              Dietary Restrictions (Ahara Rules)
            </span>
            <h4 className="font-serif text-sm text-[#1C2321]">Pitta-Vata Cooling Diet Sheet</h4>
            <p className="text-[11px] text-neutral-500 leading-relaxed">
              Follicle health is directly governed by digestive biometrics. Avoid these triggers to prevent further vascular root heat:
            </p>
            <div className="grid grid-cols-2 gap-3.5 text-xs pt-1.5">
              <div className="bg-[#FAF3E5]/50 border border-[#FAF3E5] rounded-xl p-2.5">
                <span className="font-bold text-red-700 uppercase block text-[9px] mb-1">❌ Strict Avoidance</span>
                <ul className="space-y-1 text-neutral-600 text-[10px]">
                  <li>• Chilies & spicy curries</li>
                  <li>• Fermented food & curd at night</li>
                  <li>• Carbonated/caffeinated drinks</li>
                </ul>
              </div>
              <div className="bg-[#E8F3EA]/70 border border-[#A4D5AF]/50 rounded-xl p-2.5">
                <span className="font-bold text-[#0F5A29] uppercase block text-[9px] mb-1">✅ Favour / Rebuild</span>
                <ul className="space-y-1 text-neutral-600 text-[10px]">
                  <li>• Clarified butter (Ghee)</li>
                  <li>• Soaked almonds & pumpkin seeds</li>
                  <li>• Sweet juicy fruits (Melon/Amla)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Clinical doctor recommended solutions */}
          <div className="bg-[#E8F3EA] rounded-3xl p-5 border border-[#CDE5D2]">
            <span className="text-[9px] uppercase tracking-wider font-extrabold text-[#0F5A29] bg-white px-2.5 py-0.5 rounded-full">
              Recommended Protocol
            </span>
            <h4 className="text-base font-serif mt-2.5 text-[#1C2321]">
              Clinically Prescribed Treatment Route
            </h4>
            <p className="text-xs text-neutral-600 leading-relaxed mt-1.5">
              To successfully slow hair shedding and reactivate follicular growth, our council recommends the <strong>3-Step Keshya Routine</strong>: Shiro Abhyanga massage with cold-pressed Bhringraj oil, daily Pitta-cooling nutrients, and a weekly live validation follow-up.
            </p>

            <div className="bg-white/60 p-3.5 rounded-2xl mt-4 border border-white/40 grid grid-cols-2 gap-2">
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#0F5A29]" />
                <span className="text-[10px] text-neutral-700 font-semibold">90-Day Hair Care Kit</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#0F5A29]" />
                <span className="text-[10px] text-neutral-700 font-semibold">Ayurvedic consultation</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#0F5A29]" />
                <span className="text-[10px] text-neutral-700 font-semibold">Daily breath timers</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#0F5A29]" />
                <span className="text-[10px] text-neutral-700 font-semibold">1:1 Coach support</span>
              </div>
            </div>
          </div>

          {/* Prompt to book consultation */}
          <div className="pt-2">
            <button 
              onClick={() => setScreen('booking')}
              className="w-full h-14 bg-[#0F5A29] text-white rounded-2xl font-semibold tracking-wide uppercase shadow-md hover:bg-[#0c4a21] transition-all flex items-center justify-center gap-2"
            >
              Book Specialist Consult <ArrowRight className="w-5 h-5" />
            </button>
            <p className="text-[10px] text-neutral-400 text-center mt-2.5">
              First consultation is 100% free with any treatment regimen subscription.
            </p>
          </div>
        </div>
      )}

      {/* 2. CHOOSE CONSULTATION DATE & SLOT SCREEN */}
      {screen === 'booking' && (
        <div className="flex-1 px-5 py-6 flex flex-col justify-between">
          <div className="space-y-5">
            {/* Doctor Profile Card */}
            <div className="bg-white rounded-2xl p-4 border border-[#E9E4DB] flex gap-3.5 shadow-sm">
              <img 
                src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=300&auto=format&fit=crop" 
                alt="Ayurvedic Doctor" 
                referrerPolicy="no-referrer"
                className="w-16 h-16 rounded-xl object-cover object-top shrink-0 border border-[#FAF7F2]"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-bold text-[#1C2321] text-sm">Dr. Devendra Sharma</h4>
                  <span className="text-[8px] bg-[#E8F3EA] text-[#0F5A29] font-bold px-1.5 py-0.5 rounded-full uppercase">Verified</span>
                </div>
                <p className="text-[10px] font-semibold text-[#0F5A29] uppercase tracking-wider mt-0.5">
                  B.A.M.S, Trichologist Specialist
                </p>
                <p className="text-[9px] font-semibold text-[#8C7A5B] block mt-0.5">
                  Reg. License No: SWS-10492-CH / BAMS
                </p>
                <p className="text-[11px] text-neutral-400 mt-1 leading-snug">
                  14+ years of clinical hair & skin experience. Ayurvedic herbal formulary gold medalist. Standard response time: &lt; 2 hours.
                </p>
              </div>
            </div>

            {/* Selector: Choose Date */}
            <div>
              <span className="text-[10px] uppercase text-neutral-400 font-bold tracking-wider block mb-2.5">
                Select appointment date:
              </span>
              <div className="grid grid-cols-2 gap-2">
                {dates.map((d) => {
                  const isSelected = selectedDate === d;
                  return (
                    <button
                      key={d}
                      onClick={() => setSelectedDate(d)}
                      className={`py-3.5 px-2.5 rounded-xl border text-center transition-all text-xs font-semibold ${
                        isSelected 
                          ? 'bg-[#E8F3EA] border-[#0F5A29] text-[#0F5A29] shadow-sm' 
                          : 'bg-white border-[#E9E4DB] text-neutral-700 hover:border-neutral-300'
                      }`}
                    >
                      {d}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selector: Choose Time Slot */}
            <div>
              <span className="text-[10px] uppercase text-neutral-400 font-bold tracking-wider block mb-2.5">
                Select slot: (PST time zone)
              </span>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((ts) => {
                  const isSelected = selectedTime === ts;
                  return (
                    <button
                      key={ts}
                      onClick={() => setSelectedTime(ts)}
                      className={`py-2 rounded-lg border text-center transition-all text-[11px] ${
                        isSelected 
                          ? 'bg-[#0F5A29] border-[#0F5A29] text-white font-semibold' 
                          : 'bg-white border-[#E9E4DB] text-neutral-600 hover:border-neutral-300'
                      }`}
                    >
                      {ts}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick trust metrics */}
            <div className="bg-[#FAF7F2] rounded-1.5xl p-3 border border-[#EBE4D5] space-y-2">
              <div className="flex items-start gap-2 text-[10px] text-neutral-600 leading-normal">
                <Video className="w-3.5 h-3.5 text-[#0F5A29] shrink-0 mt-0.5" />
                <span>
                  <strong>Private Video Consult:</strong> Hosted inside the secure Vedic Lab app. Link becomes active 10 mins prior.
                </span>
              </div>
              <div className="flex items-start gap-2 text-[10px] text-neutral-600 leading-normal">
                <ShieldCheck className="w-3.5 h-3.5 text-[#0F5A29] shrink-0 mt-0.5" />
                <span>
                  <strong>Full Report Validation:</strong> Your diagnostics, scalp scan, and custom herbal prescription verified and authorized.
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={handleBookConsultation}
            className="w-full h-14 bg-[#0F5A29] text-white rounded-2xl font-semibold tracking-wide uppercase shadow-md hover:bg-[#0c4a21] transition-all flex items-center justify-center gap-2"
          >
            Confirm Reservation
          </button>
        </div>
      )}

      {/* 3. CONFIRMATION COMPLETE SCREEN */}
      {screen === 'confirmed' && (
        <div className="flex-1 px-5 py-6 flex flex-col justify-between bg-white">
          <div className="text-center py-5 space-y-5">
            {/* Success check ring */}
            <div className="w-20 h-20 rounded-full bg-[#E8F3EA] text-[#0F5A29] border border-[#A4D5AF] flex items-center justify-center mx-auto shadow-md animate-bounce">
              <Check className="w-10 h-10 stroke-[3px]" />
            </div>

            <div className="space-y-2 max-w-[280px] mx-auto">
              <span className="text-[10px] font-bold text-[#0F5A29] bg-[#E8F3EA] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Confirmed Appointment
              </span>
              <h3 className="text-2xl font-serif text-[#1C2321] pt-1">
                You're Scheduled!
              </h3>
              <p className="text-xs text-neutral-500 leading-relaxed font-sans">
                Your scalp diagnostics have been successfully delivered to Dr. Devendra Sharma's dashboard. A private secure consultation link is set.
              </p>
            </div>

            {/* Scheduled slip details */}
            <div className="bg-[#FAF8F5] rounded-2.5xl p-4 border border-[#EAE4D7] text-left max-w-[300px] mx-auto space-y-3 shadow-sm relative">
              <div className="absolute top-3 right-3 bg-[#E8F3EA] text-[#0F5A29] text-[8px] font-bold px-2 py-0.5 rounded-full uppercase flex items-center gap-1 border border-[#0F5A29]/20">
                <ShieldCheck className="w-2.5 h-2.5" /> Prescription Verified
              </div>

              <div className="flex items-center gap-3">
                <img 
                  src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=300&auto=format&fit=crop" 
                  alt="Doctor" 
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-lg object-cover object-top shrink-0"
                />
                <div>
                  <h4 className="font-bold text-xs text-[#1C2321]">Dr. Devendra Sharma</h4>
                  <span className="text-[9px] text-neutral-400 block">Reg. License: SWS-10492-CH / BAMS</span>
                </div>
              </div>

              <div className="border-t border-[#EDE7DB] pt-3 grid grid-cols-2 gap-2">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#0F5A29]" />
                  <span className="text-[10px] text-neutral-600 font-semibold">{selectedDate}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#0F5A29]" />
                  <span className="text-[10px] text-neutral-600 font-semibold">{selectedTime}</span>
                </div>
              </div>
            </div>

            {/* Digital Prescription Download Asset (Traya utility) */}
            <div className="bg-white border border-[#E9E4DB] rounded-2xl p-3.5 text-left max-w-[300px] mx-auto flex items-center justify-between gap-3 shadow-sm">
              <div className="flex items-center gap-2.5">
                <FileText className="w-7 h-7 text-[#0F5A29] shrink-0" />
                <div>
                  <span className="text-[10px] font-bold text-neutral-700 block uppercase">Diagnostics Sheet</span>
                  <p className="text-[9px] text-neutral-400">PDF • Sign-certified • 3.2 MB</p>
                </div>
              </div>
              <button 
                onClick={downloadPrescription}
                className="p-2 rounded-xl bg-[#E8F3EA] text-[#0F5A29] hover:bg-[#0F5A29] hover:text-white transition-all shadow-sm flex items-center justify-center border border-[#0F5A29]/20"
                title="Download PDF"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>

            {/* Instruction on how to join */}
            <div className="flex justify-center items-center gap-1.5 text-[11px] text-[#0F5A29] font-semibold pt-1">
              <Video className="w-4 h-4 animate-pulse" />
              <span>Video session hosted inside Vedic Lab app</span>
            </div>
          </div>

          <button
            onClick={onExploreApp}
            className="w-full h-14 bg-[#0F5A29] text-white rounded-2xl font-semibold tracking-wide uppercase shadow-md hover:bg-[#0c4a21] transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
          >
            Access Hair Dashboard <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
      {/* Premium Toast Notification Overlay */}
      {showToast && (
        <div className="absolute bottom-20 inset-x-4 bg-[#1C2321]/95 backdrop-blur-md border border-[#0F5A29]/50 text-white p-4 rounded-2xl shadow-[0_12px_30px_rgba(12,24,18,0.3)] flex items-center gap-3 z-50 transition-all duration-300">
          <div className="w-8 h-8 rounded-full bg-[#E8F3EA] text-[#0F5A29] flex items-center justify-center shrink-0">
            <ShieldCheck className="w-4 h-4 stroke-[2.5]" />
          </div>
          <div className="flex-1 text-left">
            <span className="text-[9px] font-extrabold text-[#A4D5AF] uppercase tracking-widest block leading-none">Download Complete</span>
            <p className="text-[11px] text-neutral-200 mt-1 leading-snug">Vedic Lab clinical prescription PDF has been saved successfully.</p>
          </div>
        </div>
      )}
    </div>
  );
}
