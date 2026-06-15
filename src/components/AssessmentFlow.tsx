import React, { useState } from 'react';
import { QUESTIONS } from '../data/hairData';
import { ArrowLeft, Camera, ShieldAlert, Sparkles, AlertCircle} from 'lucide-react';

// @ts-ignore
import scalpBefore from '../assets/images/female_scalp_before_1781542595597.jpg';
// @ts-ignore
import scalpAfter from '../assets/images/female_scalp_after_1781542612380.jpg';

interface AssessmentFlowProps {
  onBack: () => void;
  onAssessmentCompleted: (answers: Record<string, string>, photoUrl: string) => void;
}

export default function AssessmentFlow({ onBack, onAssessmentCompleted }: AssessmentFlowProps) {
  const [step, setStep] = useState<'intro' | 'questions' | 'photo' | 'generating'>('intro');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [viewfinderActive, setViewfinderActive] = useState(false);

  const currentQuestion = QUESTIONS[currentQuestionIndex];

  const handleSelectOption = (value: string) => {
    setAnswers({ ...answers, [currentQuestion.id]: value });
    
    // Auto advance or advance on button click
    setTimeout(() => {
      if (currentQuestionIndex < QUESTIONS.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setStep('photo');
      }
    }, 250);
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else {
      setStep('intro');
    }
  };

  const handleUseMockPhoto = (url: string) => {
    setSelectedPhoto(url);
    setViewfinderActive(false);
  };

  const triggerGenerateProfile = () => {
    if (!selectedPhoto) return;
    setStep('generating');
    setTimeout(() => {
      onAssessmentCompleted(answers, selectedPhoto);
    }, 3200);
  };

  const mockScalpPhotos = [
    { label: 'Normal / Healthy Follicles', url: scalpAfter },
    { label: 'Sparse crown area / Diffuse thinning', url: scalpBefore }
  ];

  return (
    <div className="flex-1 flex flex-col h-full bg-[#FAF8F5] overflow-y-auto">
      {/* HEADER */}
      <div className="h-16 px-4 flex items-center justify-between border-b border-[#F2EDE4] bg-white sticky top-0 z-30 shrink-0">
        <button 
          onClick={() => {
            if (step === 'questions') handlePrevQuestion();
            else if (step === 'photo') setStep('questions');
            else if (step === 'intro') onBack();
          }}
          className="w-10 h-10 rounded-full flex items-center justify-center bg-[#F7F4F0] text-[#1E2422]"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <span className="font-serif text-lg tracking-wide uppercase font-semibold text-[#1C2321]">
          {step === 'generating' ? 'Analyzing' : 'Hair Assessment'}
        </span>
        <div className="w-10" />
      </div>

      {/* INTRO SCREEN */}
      {step === 'intro' && (
        <div className="flex-1 px-5 py-6 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="bg-[#FAF8F5] rounded-3xl overflow-hidden shadow-sm border border-[#EFEAE2]">
              <img 
                src="https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?q=80&w=600&auto=format&fit=crop" 
                alt="Hair Assessment" 
                referrerPolicy="no-referrer"
                className="w-full h-48 object-cover object-center"
              />
              <div className="p-5 text-center">
                <span className="text-[11px] font-bold text-[#0F5A29] bg-[#E8F3EA] px-3 py-1 rounded-full uppercase tracking-wider">
                  Ayur-Clinical Trichology
                </span>
                <h2 className="text-2xl font-serif mt-3 text-[#1C2321]">
                  Discover Your Scalp's Prakriti
                </h2>
                <p className="text-sm mt-3 text-neutral-600 leading-relaxed">
                  In Ayurveda, hair thinning (Khalitya) is an indicator of deep elemental imbalance. Our medical-trichological survey reveals your root-causes, dominant Dosha blockages, and forms your clinical-grade wellness plan.
                </p>
              </div>
            </div>

            <div className="bg-[#E8F3EA]/60 rounded-2xl p-4 border border-[#D5EAD8]">
              <h4 className="font-semibold text-[#0F5A29] text-xs flex items-center gap-1.5 uppercase tracking-wider">
                <Sparkles className="w-4 h-4 shrink-0 text-[#0F5A29]" />
                What's included in your analysis:
              </h4>
              <ul className="text-xs text-neutral-600 space-y-2 mt-2.5">
                <li className="flex items-start gap-1.5">
                  <span className="text-[#0F5A29] font-bold">•</span>
                  <span><strong>Root cause classification</strong> matching follicular health indicators.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-[#0F5A29] font-bold">•</span>
                  <span><strong>Personalized scalp profile</strong> (Vata, Pitta, or Kapha-dominant).</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-[#0F5A29] font-bold">•</span>
                  <span><strong>Custom routines</strong> & exclusive doctor-recommended Keshya compounds.</span>
                </li>
              </ul>
            </div>
          </div>

          <button 
            onClick={() => setStep('questions')}
            className="w-full h-14 bg-[#0F5A29] text-white rounded-2xl font-semibold tracking-wide uppercase shadow-sm hover:bg-[#0c4a21] transition-all flex items-center justify-center gap-2 mt-6 active:scale-[0.98]"
          >
            Start Hair Assessment
          </button>
        </div>
      )}

      {/* QUESTIONS SCREEN */}
      {step === 'questions' && currentQuestion && (
        <div className="flex-1 px-5 py-6 flex flex-col justify-between">
          <div>
            {/* Progress indicator bar */}
            <div className="mb-6">
              <div className="flex justify-between items-center text-xs text-neutral-500 mb-2">
                <span>Diagnostic Progress</span>
                <span className="font-semibold text-[#0F5A29]">
                  {currentQuestionIndex + 1} of {QUESTIONS.length}
                </span>
              </div>
              <div className="w-full h-1.5 bg-[#EEECE5] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#0F5A29] transition-all duration-300 rounded-full"
                  style={{ width: `${((currentQuestionIndex + 1) / QUESTIONS.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Title & Description */}
            <div className="mb-6">
              <h3 className="text-xl font-serif text-[#1C2321] leading-snug">
                {currentQuestion.text}
              </h3>
              {currentQuestion.description && (
                <p className="text-xs text-neutral-500 mt-2 leading-relaxed">
                  {currentQuestion.description}
                </p>
              )}
            </div>

            {/* Options */}
            <div className="space-y-3.5">
              {currentQuestion.options.map((option) => {
                const isSelected = answers[currentQuestion.id] === option.value;
                return (
                  <button
                    key={option.value}
                    onClick={() => handleSelectOption(option.value)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all flex flex-col gap-0.5 active:scale-[0.99] group ${
                      isSelected 
                        ? 'bg-[#E8F3EA] border-[#0F5A29] shadow-sm' 
                        : 'bg-white border-[#E9E4DB] hover:border-neutral-300 hover:bg-[#FAF8F5]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`font-medium text-[14px] ${isSelected ? 'text-[#0F5A29]' : 'text-neutral-800'}`}>
                        {option.label}
                      </span>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                        isSelected ? 'border-[#0F5A29] bg-[#0F5A29]' : 'border-neutral-300 bg-white'
                      }`}>
                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                    </div>
                    {option.sublabel && (
                      <span className="text-[11px] text-neutral-500 mt-0.5 leading-snug">
                        {option.sublabel}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-6 flex justify-between gap-3 text-xs text-neutral-400 items-center justify-center">
            <span className="flex items-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5 text-neutral-400" />
              100% HIPAA and private data protection.
            </span>
          </div>
        </div>
      )}

      {/* PHOTO UPLOAD SCREEN */}
      {step === 'photo' && (
        <div className="flex-1 px-5 py-6 flex flex-col justify-between">
          <div className="space-y-5">
            {/* Step header */}
            <div>
              <span className="text-[10px] font-bold text-[#0F5A29] bg-[#E8F3EA] px-2.5 py-1 rounded-full uppercase tracking-wider">
                Deep Scalp AI Analysis
              </span>
              <h3 className="text-xl font-serif text-[#1C2321] mt-2.5 leading-snug">
                Submit a Scalp / Hair Photo
              </h3>
              <p className="text-xs text-neutral-500 mt-1.5 leading-relaxed">
                By uploading a clear photograph of your current hair parting or thinning zone (receding temple or crown spot), our trichology engine maps follicle spacing and follicle density.
              </p>
            </div>

            {/* Camera Viewfinder Emulator */}
            {viewfinderActive ? (
              <div className="border-2 border-[#0F5A29] rounded-[24px] overflow-hidden bg-black aspect-video relative h-56 flex flex-col items-center justify-center shadow-lg">
                <div className="absolute inset-4 border border-dashed border-white/40 rounded-xl flex items-center justify-center">
                  <div className="w-14 h-14 border border-white/60 rounded-full flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full border border-dashed border-white/50 animate-spin" />
                  </div>
                </div>
                
                {/* Blinking record indicator */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/60 px-2 py-0.5 rounded-full text-[10px] text-red-500 font-bold tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
                  SCALPSCAN_LIVE
                </div>

                <div className="absolute bottom-3 text-center text-[10px] text-white/80 bg-black/50 px-3 py-1 rounded-full">
                  Align camera 4 inches above the thinning area
                </div>

                {/* Instant select demo controls inside view finder */}
                <div className="absolute bottom-11 flex gap-2">
                   <button 
                    onClick={() => handleUseMockPhoto(scalpBefore)}
                    className="text-[9px] font-semibold bg-white/20 text-white rounded-md px-2 py-1 select-none backdrop-blur-sm"
                  >
                    Load Parting Line
                  </button>
                  <button 
                    onClick={() => handleUseMockPhoto(scalpBefore)}
                    className="text-[9px] font-semibold bg-white/20 text-white rounded-md px-2 py-1 select-none backdrop-blur-sm"
                  >
                    Load Crown Thinning
                  </button>
                </div>
              </div>
            ) : selectedPhoto ? (
              <div className="rounded-[24px] overflow-hidden border border-[#DCD3C5] bg-[#FAF8F5] relative h-56 group shadow-sm">
                <img 
                  src={selectedPhoto} 
                  alt="My scalp analysis sample" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-3 text-white flex justify-between items-center">
                  <span className="text-[11px] font-medium">Scalp Photo Selected</span>
                  <button 
                    onClick={() => {
                      setSelectedPhoto(null);
                      setViewfinderActive(true);
                    }}
                    className="text-[10px] font-bold underline text-white/90 hover:text-white"
                  >
                    Retake Photo
                  </button>
                </div>
              </div>
            ) : (
              <div className="border border-dashed border-[#D1C9BA] bg-white rounded-[24px] p-6 text-center h-56 flex flex-col justify-center items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-[#FAF7F2] flex items-center justify-center text-[#0F5A29] border border-[#ECE6DB]">
                  <Camera className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-[#1E2422]">Launch Live Scalp Scanner</h4>
                  <p className="text-[11px] text-neutral-400 mt-1 max-w-[240px] mx-auto text-center leading-normal">
                    Secure diagnostic camera mapping. Or pick a sample model image below for quick prototyping.
                  </p>
                </div>
                <button 
                  onClick={() => setViewfinderActive(true)}
                  className="px-5 py-2.5 bg-[#FAF7F2] border border-[#0F5A29] text-[#0F5A29] rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-[#E8F3EA] active:scale-[0.98]"
                >
                  Start Scan Viewfinder
                </button>
              </div>
            )}

            {/* Choose Sample Photos Section */}
            {!selectedPhoto && (
              <div className="space-y-2">
                <span className="text-[10px] uppercase text-neutral-400 font-bold tracking-wide">
                  Or select a demo sample:
                </span>
                <div className="grid grid-cols-2 gap-2.5">
                  {mockScalpPhotos.map((sc) => (
                    <button
                      key={sc.url}
                      onClick={() => handleUseMockPhoto(sc.url)}
                      className="border border-[#E9E4DB] rounded-xl overflow-hidden text-left bg-white shadow-sm flex items-center p-2 gap-2 hover:border-[#0F5A29]"
                    >
                      <img src={sc.url} alt={sc.label} referrerPolicy="no-referrer" className="w-10 h-10 object-cover rounded-lg shrink-0" />
                      <span className="text-[9px] text-neutral-600 font-semibold leading-tight line-clamp-2">
                        {sc.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Guidelines Card */}
            <div className="bg-[#FAF7F2] rounded-1.5xl p-3 border border-[#EBE4D5] flex gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 text-[#8C7A5B]" />
              <div className="text-[10px] text-neutral-600 leading-snug">
                <strong>Correct capture instructions:</strong> Ensure good overhead bathroom light, part your hair cleanly, and hold camera parallel to your forehead line.
              </div>
            </div>
          </div>

          <button
            onClick={triggerGenerateProfile}
            disabled={!selectedPhoto}
            className={`w-full h-14 rounded-2xl font-semibold tracking-wide uppercase shadow-sm transition-all flex items-center justify-center gap-2 active:scale-[0.98] ${
              selectedPhoto 
                ? 'bg-[#0F5A29] text-white hover:bg-[#0c4a21]' 
                : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
            }`}
          >
            Generate My Hair Profile
          </button>
        </div>
      )}

      {/* GENERATING ANALYSIS LOADING TRANSITION */}
      {step === 'generating' && (
        <div className="flex-1 px-6 flex flex-col items-center justify-center text-center bg-[#FAF8F5]">
          <div className="relative w-32 h-32 flex items-center justify-center">
            {/* Circular Pulse */}
            <div className="absolute inset-0 rounded-full border-4 border-[#0F5A29]/10 animate-ping duration-[3s]" />
            <div className="absolute inset-2 rounded-full border-2 border-dashed border-[#0F5A29]/30 animate-spin" style={{ animationDuration: '8s' }} />
            
            <div className="w-20 h-20 rounded-full bg-[#E8F3EA] text-[#0F5A29] border border-[#A4D5AF] flex items-center justify-center shadow-md">
              <Camera className="w-8 h-8 animate-pulse" />
            </div>
          </div>

          <div className="mt-8 space-y-3 max-w-[280px]">
            <span className="text-xs uppercase tracking-wide font-bold text-[#0F5A29]">
              Ayurvedic Trichology AI
            </span>
            <h4 className="text-2xl font-serif text-[#1C2321]">
              Analyzing Follicles...
            </h4>
            <div className="text-xs text-neutral-500 leading-relaxed text-center space-y-1">
              <p className="animate-pulse">Evaluating scalp moisture ratios...</p>
              <p className="text-[10px] text-neutral-400 font-mono">Loading Keshya-Prakriti index</p>
            </div>
          </div>

          {/* Artificial steps logging */}
          <div className="mt-12 bg-white rounded-2xl p-4 border border-[#E9E4DB] w-full max-w-[280px] text-left text-[10px] font-mono text-neutral-400 space-y-1">
            <div className="text-[#0F5A29] flex items-center gap-1.5">
              <span>●</span> Question profile processed... OK
            </div>
            <div className="text-[#0F5A29] flex items-center gap-1.5 animate-pulse">
              <span>●</span> Scalp photo pattern mapped... OK
            </div>
            <div className="flex items-center gap-1.5">
              <span>○</span> Synthesizing Dosha prescription... ACTIVE
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
