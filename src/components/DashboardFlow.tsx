import React, { useState } from 'react';
import { MOCK_ROUTINE, PRODUCTS, PROGRESS_MILESTONES } from '../data/hairData';
import { Product, RoutineTask } from '../types';
import { 
  CheckCircle2, Clock, Sparkles, ShoppingBag, 
  ChevronRight, Calendar, Info, Star, RefreshCw, Hand, Droplet, Wind, Zap, FlameKindling, Check, X
} from 'lucide-react';

interface DashboardFlowProps {
  points: number;
  onAddPoints: (pts: number) => void;
}

export default function DashboardFlow({ points, onAddPoints }: DashboardFlowProps) {
  const [subTab, setSubTab] = useState<'routine' | 'shop' | 'timeline'>('routine');
  const [routines, setRoutines] = useState<RoutineTask[]>(MOCK_ROUTINE);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isSubscribed, setIsSubscribed] = useState(true);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);

  // Compute metrics
  const completedCount = routines.filter(r => r.completed).length;
  const totalCount = routines.length;
  const completionPercentage = totalCount ? Math.round((completedCount / totalCount) * 100) : 0;

  const toggleRoutine = (id: string, alreadyCompleted: boolean, pts: number) => {
    setRoutines(prev => prev.map(r => {
      if (r.id === id) {
        return { ...r, completed: !r.completed };
      }
      return r;
    }));

    if (!alreadyCompleted) {
      onAddPoints(pts);
    } else {
      onAddPoints(-pts);
    }
  };

  const handleBuyProduct = () => {
    setPurchaseSuccess(true);
    onAddPoints(50); // Reward 50 pts on buying!
    setTimeout(() => {
      setPurchaseSuccess(false);
      setSelectedProduct(null);
    }, 2800);
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Droplet': return <Droplet className="w-5 h-5 text-[#0F5A29]" />;
      case 'Wind': return <Wind className="w-5 h-5 text-[#0F5A29]" />;
      case 'FlameKindling': return <FlameKindling className="w-5 h-5 text-[#0F5A29]" />;
      default: return <Sparkles className="w-5 h-5 text-[#0F5A29]" />;
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#FAF8F5]">
      {/* 3-WAY SUB-TABS SELECTOR */}
      <div className="bg-white shrink-0 shadow-sm border-b border-[#F0EAE0] px-4 py-2 flex justify-between select-none z-10 sticky top-0">
        <button
          onClick={() => setSubTab('routine')}
          className={`flex-1 py-2.5 text-center text-xs font-bold uppercase transition-all tracking-wider ${
            subTab === 'routine'
              ? 'text-[#0F5A29] border-b-2 border-[#0F5A29]'
              : 'text-neutral-400'
          }`}
        >
          My Routine
        </button>
        <button
          onClick={() => setSubTab('shop')}
          className={`flex-1 py-2.5 text-center text-xs font-bold uppercase transition-all tracking-wider ${
            subTab === 'shop'
              ? 'text-[#0F5A29] border-b-2 border-[#0F5A29]'
              : 'text-neutral-400'
          }`}
        >
          Wellness Shop
        </button>
        <button
          onClick={() => setSubTab('timeline')}
          className={`flex-1 py-2.5 text-center text-xs font-bold uppercase transition-all tracking-wider ${
            subTab === 'timeline'
              ? 'text-[#0F5A29] border-b-2 border-[#0F5A29]'
              : 'text-neutral-400'
          }`}
        >
          Timeline
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4">
        {/* ======================================= */}
        {/* TAB 1: DAILY ROUTINE                    */}
        {/* ======================================= */}
        {subTab === 'routine' && (
          <div className="space-y-5">
            {/* Health ring and percentage card with habit streaks */}
            <div className="bg-[#0F5A29] text-white rounded-3xl p-5 shadow-sm relative overflow-hidden">
              <div className="absolute right-[-40px] bottom-[-40px] w-40 h-40 rounded-full bg-white/5" />
              
              <div className="flex justify-between items-center relative z-10">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#A4D5AF]">
                      Daily Progress
                    </span>
                    <span className="text-[9px] bg-amber-500 font-bold px-2 py-0.5 rounded-full text-black flex items-center gap-1">
                      🔥 5-Day Streak
                    </span>
                  </div>
                  <h3 className="text-2xl font-serif mt-1">
                    {completionPercentage}% Complete
                  </h3>
                  <div className="flex text-[10px] text-[#A4D5AF] mt-1 gap-3">
                    <span>{completedCount} of {totalCount} tasks completed</span>
                    <span>•</span>
                    <span className="font-semibold text-white">Adherence Index: {88 + Math.round((completedCount/totalCount)*12)}%</span>
                  </div>
                </div>
                
                {/* Circular ring style progress */}
                <div className="relative w-16 h-16 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="32" cy="32" r="28" className="stroke-white/10" strokeWidth="5" fill="none" />
                    <circle cx="32" cy="32" r="28" className="stroke-[#A4D5AF] transition-all duration-500" strokeWidth="5" fill="none"
                      strokeDasharray="175" strokeDashoffset={175 - (175 * completionPercentage) / 100} />
                  </svg>
                  <span className="absolute text-[12px] font-bold text-white">
                    {completedCount}
                  </span>
                </div>
              </div>

              {/* Tips line */}
              <div className="mt-4 pt-3.5 border-t border-white/10 flex gap-2.5 items-start text-xs text-[#E8F3EA] relative z-10">
                <Info className="w-4 h-4 shrink-0 mt-0.5" />
                <p>
                  Completing tasks consecutively preserves your <strong>2x VP points multiplier</strong>. Continuous routine adherence reduces scalp sebum and restores root vitality.
                </p>
              </div>
            </div>

            {/* Daily tasks list header */}
            <div className="flex justify-between items-center select-none pt-1">
              <h4 className="text-xs uppercase font-bold text-neutral-400 tracking-wider">
                Today's Prescribed Rituals
              </h4>
              <span className="text-xs font-semibold text-[#0F5A29]">
                Pitta-Vata Aligned
              </span>
            </div>

            {/* STATEFUL TASKS LIST */}
            <div className="space-y-3.5">
              {routines.map((task) => {
                const isDone = task.completed;
                return (
                  <div
                    key={task.id}
                    className={`p-4 rounded-2.5xl border transition-all flex justify-between gap-3 shadow-sm ${
                      isDone 
                        ? 'bg-[#E8F3EA]/50 border-[#D5EAD8] opacity-85' 
                        : 'bg-white border-[#E9E4DB]'
                    }`}
                  >
                    <div className="flex items-start gap-3.5">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border transition-all ${
                        isDone ? 'bg-[#D5EAD8]/40 border-[#A4D5AF]' : 'bg-[#FAF8F5] border-[#ECE6DB]'
                      }`}>
                        {getIcon(task.icon)}
                      </div>
                      
                      <div>
                        <div className="flex items-center gap-2">
                          <h5 className={`font-bold text-xs ${isDone ? 'text-[#0F5A29] line-through' : 'text-[#1C2321]'}`}>
                            {task.title}
                          </h5>
                          <span className="text-[9px] font-bold text-[#8C7A5B] bg-[#FAF3E5] px-1.5 py-0.5 rounded-full">
                            +{task.points} VP
                          </span>
                        </div>
                        <p className="text-[11px] text-neutral-500 mt-1.5 leading-relaxed">
                          {task.description}
                        </p>
                        <div className="flex items-center gap-3.5 mt-2 text-[10px] text-neutral-400">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {task.time} ({task.duration})
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Interactive Checkbox toggle button */}
                    <button
                      onClick={() => toggleRoutine(task.id, isDone, task.points)}
                      className={`w-7 h-7 rounded-full flex items-center justify-center border shrink-0 transition-all active:scale-90 ${
                        isDone 
                          ? 'bg-[#0F5A29] border-[#0F5A29] text-white' 
                          : 'border-neutral-300 bg-white hover:border-neutral-400 text-transparent'
                      }`}
                    >
                      <Check className="w-4 h-4 stroke-[3px]" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ======================================= */}
        {/* TAB 2: WELLNESS SHOP (COMMERCE)          */}
        {/* ======================================= */}
        {subTab === 'shop' && (
          <div className="space-y-6">
            {/* Promo Banner Hair Kit */}
            <div className="bg-[#FAF7F2] rounded-3xl p-5 border border-[#EAE4D7] relative overflow-hidden shadow-sm flex flex-col md:flex-row justify-between items-start gap-4">
              <div className="space-y-2 max-w-[200px]">
                <span className="bg-[#0F5A29] text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                  SAVE 25% ON SUBSCRIPTION
                </span>
                <h4 className="font-serif text-lg text-[#1C2321]">
                  Complete 90-Day Hair Care Kit
                </h4>
                <p className="text-[11px] text-neutral-500 leading-normal">
                  The absolute recommended oil, wash, and botanical mineral capsule set customized for your scalp profile.
                </p>
                <div className="pt-2 font-serif text-base text-[#1C2321]">
                  $89.00 <span className="font-sans text-xs text-neutral-400 line-through">$119.00</span>
                </div>
              </div>
              <img 
                src="https://images.unsplash.com/photo-1526947425960-945c6e72858f?q=80&w=300&auto=format&fit=crop" 
                alt="Hair Kit" 
                referrerPolicy="no-referrer"
                className="w-24 h-24 rounded-2xl object-cover shrink-0 select-none border border-[#E2DBCE]"
              />
            </div>

            {/* Product Grid */}
            <div>
              <h4 className="text-xs uppercase font-bold text-neutral-400 tracking-wider mb-3.5">
                Individual Prescribed Formulations
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {PRODUCTS.map((prod) => (
                  <button
                    key={prod.id}
                    onClick={() => setSelectedProduct(prod)}
                    className="bg-white rounded-2.5xl p-3 border border-[#EBE6DC] text-left hover:border-neutral-400 hover:shadow-sm"
                  >
                    <img 
                      src={prod.image} 
                      alt={prod.title} 
                      referrerPolicy="no-referrer"
                      className="w-full h-28 object-cover rounded-xl border border-neutral-100" 
                    />
                    <div className="mt-2.5 space-y-1">
                      <div className="flex justify-between items-center select-none gap-1">
                        <span className="text-[9px] font-bold text-[#8C7A5B] bg-[#FAF3E5] px-1.5 py-0.5 rounded-full uppercase">
                          {prod.category}
                        </span>
                        <span className="text-[8px] font-bold text-[#0F5A29] bg-[#E8F3EA] px-1 py-0.5 rounded-md">
                          92% Match
                        </span>
                      </div>
                      <h5 className="font-bold text-xs text-[#1C2321] line-clamp-1">
                        {prod.title}
                      </h5>
                      <p className="text-[9px] text-[#0F5A29] font-semibold line-clamp-1">Prescribed for your Pitta profile</p>
                      <div className="flex justify-between items-center pt-2 select-none">
                        <span className="font-serif text-xs font-semibold text-[#1C2321]">${prod.price}</span>
                        <div className="flex items-center gap-0.5 text-[#0F5A29]">
                          <Star className="w-3 h-3 fill-[#0F5A29]" />
                          <span className="text-[10px] font-bold">{prod.rating}</span>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ======================================= */}
        {/* TAB 3: TREATMENT TIMELINE (16 WEEKS)    */}
        {/* ======================================= */}
        {subTab === 'timeline' && (
          <div className="space-y-5">
            <div>
              <h3 className="text-xl font-serif text-[#1C2321]">
                Your 16-Week Re-Growth Wave
              </h3>
              <p className="text-xs text-neutral-500 mt-1 lines-relaxed">
                Hair cell regeneration operates in slow biological rhythm. Follow this roadmap carefully as we unlock structural layers.
              </p>
            </div>

            {/* Vertical timeline stepper */}
            <div className="space-y-4 relative pl-7 before:content-[''] before:absolute before:left-3 before:top-2.5 before:bottom-2 before:w-[2px] before:bg-[#EAE4D7]">
              {PROGRESS_MILESTONES.map((milestone) => (
                <div key={milestone.id} className="relative">
                  {/* Stepper node circle */}
                  <div className={`absolute left-[-23px] top-1.5 w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${
                    milestone.completed 
                      ? 'bg-[#0F5A29] border-[#0F5A29]' 
                      : milestone.active 
                      ? 'bg-amber-500 border-amber-500 animate-pulse' 
                      : 'bg-white border-[#E9E4DB]'
                  }`}>
                    {milestone.completed && <Check className="w-2.5 h-2.5 text-white stroke-[3px]" />}
                  </div>

                  {/* Milestone Card */}
                  <div className={`p-4 rounded-2.5xl border ${
                    milestone.active 
                      ? 'bg-[#FAF3E5] border-amber-300 shadow-sm' 
                      : 'bg-white border-[#E9E4DB]'
                  }`}>
                    <div className="flex justify-between items-start gap-1">
                      <div>
                        <span className={`text-[10px] font-bold uppercase tracking-wider block ${
                          milestone.completed 
                            ? 'text-neutral-400' 
                            : milestone.active 
                            ? 'text-amber-700' 
                            : 'text-neutral-400'
                        }`}>
                          Week {milestone.week} Goal
                        </span>
                        <h4 className="font-bold text-xs text-[#1C2321] mt-0.5">
                          {milestone.title}
                        </h4>
                      </div>

                      {milestone.active && (
                        <span className="text-[9px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full uppercase">
                          ACTIVE PHASE
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-neutral-500 mt-2 leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ======================================= */}
      {/* PRODUCT ENTIRE DETAIL MODAL / SHEET      */}
      {/* ======================================= */}
      {selectedProduct && (
        <div className="absolute inset-0 bg-black/50 z-50 flex flex-col justify-end">
          {/* Modal Overlay clicking backdrop closes */}
          <div className="absolute inset-0 -z-10" onClick={() => setSelectedProduct(null)} />
          
          <div className="bg-white rounded-t-[32px] max-h-[85%] overflow-y-auto w-full px-5 py-6 space-y-5 animate-slide-up relative">
            
            {/* Close button */}
            <button 
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 w-9 h-9 bg-[#F7F4F0] text-black rounded-full flex items-center justify-center hover:bg-neutral-200"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header Image */}
            <div className="h-52 w-full rounded-2xl overflow-hidden border border-neutral-100">
              <img src={selectedProduct.image} alt={selectedProduct.title} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
            </div>

             {/* Info details */}
            <div className="space-y-1">
              <div className="flex justify-between items-center select-none">
                <span className="text-[10px] font-bold text-[#8C7A5B] bg-[#FAF3E5] px-2 py-0.5 rounded-full uppercase font-mono">
                  {selectedProduct.category}
                </span>
                <span className="text-[10px] font-bold text-[#0F5A29] bg-[#E8F3EA] px-2.5 py-0.5 rounded-full uppercase flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> Prescribed Target
                </span>
              </div>
              <h3 className="text-xl font-serif text-[#1C2321] mt-1">
                {selectedProduct.title}
              </h3>
              <p className="text-xs text-neutral-400 font-semibold">{selectedProduct.subtitle}</p>
              
              <div className="flex gap-4 pt-2 text-xs">
                <div className="flex items-center gap-1 text-[#0F5A29]">
                  <Star className="w-4 h-4 fill-[#0F5A29]" />
                  <span className="font-bold">{selectedProduct.rating}</span>
                </div>
                <div className="text-neutral-400">({selectedProduct.reviewsCount} verified reviews)</div>
              </div>
            </div>

            {/* Diagnostic Match Explanation (Traya Connection) */}
            <div className="bg-[#FAF7F2] border border-[#0F5A29]/20 p-4 rounded-2xl space-y-2">
              <span className="text-[9px] uppercase tracking-wider font-extrabold text-[#0F5A29] bg-[#E8F3EA] px-2.5 py-0.5 rounded-full inline-block">
                Personalized Tricho-Diagnostic Match
              </span>
              <p className="text-[11px] text-[#1C2321] font-semibold leading-snug">
                Why this is prescribed for your Pitta-Vata Profile:
              </p>
              <p className="text-[10.5px] text-neutral-500 leading-normal">
                Based on your logged symptoms of <strong>{selectedProduct.title.includes('Oil') ? 'scalp dry-itch sensitivity' : 'high daily stress and hair thinning duration'}</strong>, the active bio-actives in this formula help cool high metabolic heat (Pitta) and clear Asthi Dhatu blockage to nourish shrinking hair roots.
              </p>
            </div>

            <div className="border-t border-[#F2ECE4] pt-4">
              <h4 className="text-xs uppercase font-bold text-[#1C2321] tracking-wider">Product Summary:</h4>
              <p className="text-xs text-neutral-600 mt-1.5 leading-relaxed">
                {selectedProduct.description}
              </p>
            </div>

            {/* Active Ingredients */}
            <div>
              <h4 className="text-xs uppercase font-bold text-neutral-400 tracking-wider">Active Ingredients:</h4>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {selectedProduct.ingredients.map((ing) => (
                  <span key={ing} className="text-[10px] font-semibold text-[#0F5A29] bg-[#E8F3EA] px-2.5 py-1 rounded-lg">
                    {ing}
                  </span>
                ))}
              </div>
            </div>

            {/* Benefits list */}
            <div>
              <h4 className="text-xs uppercase font-bold text-neutral-400 tracking-wider">Clinical Ayurvedic Benefits:</h4>
              <ul className="text-xs text-neutral-600 space-y-2 mt-2">
                {selectedProduct.benefits.map((ben, idx) => (
                  <li key={idx} className="flex gap-2 items-start">
                    <CheckCircle2 className="w-4 h-4 text-[#0F5A29] shrink-0 mt-0.5" />
                    <span>{ben}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Subscriptive Program Option (Replenish Program) */}
            <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#EAE4D7] space-y-3">
              <label className="flex items-start gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isSubscribed}
                  onChange={() => setIsSubscribed(!isSubscribed)}
                  className="mt-1 w-4 h-4 accent-[#0F5A29] shrink-0"
                />
                <div>
                  <h5 className="font-bold text-xs text-[#1C2321]">
                    Join Care Subscription Program (Save 25%)
                  </h5>
                  <p className="text-[11px] text-neutral-500 leading-normal mt-0.5">
                    We deliver replacement fresh supplies every 90 days. Ongoing 1:1 specialist access, progress review logs, and priority delivery included free. Redo scanner any time. Cancel or pause with 1-click.
                  </p>
                </div>
              </label>
            </div>

            {/* Place Order row */}
            <div className="pt-2 border-t border-[#F2ECE5] flex justify-between items-center gap-5">
              <div>
                <span className="text-[10px] text-neutral-400 block uppercase font-bold">Total price:</span>
                <span className="font-serif text-lg font-bold text-neutral-800">
                  ${isSubscribed ? (selectedProduct.price * 0.75).toFixed(2) : selectedProduct.price.toFixed(2)}
                </span>
                {isSubscribed && (
                  <span className="text-[9px] text-red-600 font-bold block">Save 25% applied</span>
                )}
              </div>

              <button
                onClick={handleBuyProduct}
                disabled={purchaseSuccess}
                className="flex-1 h-14 bg-[#0F5A29] text-white font-semibold rounded-xl uppercase tracking-wide text-xs hover:bg-[#0c4a21] flex items-center justify-center gap-2"
              >
                {purchaseSuccess ? (
                  <>
                    <Check className="w-4 h-4 stroke-[3px]" /> Processing...
                  </>
                ) : (
                  <>
                    Add to Routine (Get +50 VP)
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
