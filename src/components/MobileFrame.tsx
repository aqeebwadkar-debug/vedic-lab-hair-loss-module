import React, { useState, useEffect } from 'react';
import { Wifi, Battery, Signal } from 'lucide-react';

const PHONE_W = 430;
const PHONE_H = 880;
const MOBILE_BREAKPOINT = 768;

interface MobileFrameProps {
  children: React.ReactNode;
  points: number;
}

export default function MobileFrame({ children, points }: MobileFrameProps) {
  const [time, setTime] = useState('');
  const [scale, setScale] = useState(1);
  // Initialise synchronously so there is no flash-of-wrong-layout on real devices.
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.innerWidth < MOBILE_BREAKPOINT
  );

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12 || 12;
      setTime(`${hours}:${minutes} ${ampm}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const update = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
      const s = Math.min(
        1,
        (window.innerHeight * 0.95) / PHONE_H,
        (window.innerWidth * 0.92) / PHONE_W
      );
      setScale(parseFloat(s.toFixed(4)));
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // ─── Mobile (real device): strip the frame, go full-screen ───────────────
  if (isMobile) {
    return (
      <div className="relative w-screen h-screen overflow-hidden flex flex-col bg-[#FAF8F5] font-sans antialiased text-[#1E2422]">
        {children}
      </div>
    );
  }

  // ─── Desktop / tablet: existing scaled phone-mockup experience ───────────
  return (
    <div className="flex justify-center items-center bg-[#EFECE6] h-screen overflow-hidden font-sans antialiased text-[#1E2422]">
      {/* Sizer matches the visual footprint so flexbox centering works without clipping */}
      <div style={{ width: PHONE_W * scale, height: PHONE_H * scale, position: 'relative', flexShrink: 0 }}>
        {/* Phone frame stays at natural 430×880 px; CSS scale shrinks it uniformly */}
        <div
          style={{
            width: PHONE_W,
            height: PHONE_H,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            position: 'absolute',
            top: 0,
            left: 0,
          }}
          className="bg-[#FAF8F5] rounded-[52px] shadow-[0_25px_60px_-15px_rgba(12,24,18,0.25)] border-[10px] border-[#2C3330] overflow-hidden flex flex-col"
        >
          {/* Notch & Camera element */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[160px] h-[30px] bg-[#2C3330] rounded-b-[20px] z-50 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-[#1A1F1D]" />
            <div className="w-12 h-1 bg-[#151918] rounded-full ml-3" />
          </div>

          {/* Status Bar */}
          <div className="h-[44px] bg-[#FAF8F5] px-6 pt-3 flex items-center justify-between text-[11px] font-bold text-[#1C2321] select-none z-40 font-sans tracking-tight">
            <div>{time || '09:41 AM'}</div>
            <div className="flex items-center gap-1.5 pt-0.5">
              <Signal className="w-3.5 h-3.5 shrink-0" />
              <span className="text-[9px] tracking-wide font-extrabold pr-0.5">5G</span>
              <Wifi className="w-3.5 h-3.5 shrink-0" />
              <div className="flex items-center gap-1 ml-1">
                <span className="text-[9px] leading-none shrink-0 font-bold">98%</span>
                <Battery className="w-[18px] h-[18px] shrink-0" />
              </div>
            </div>
          </div>

          {/* Content Region */}
          <div className="flex-1 overflow-hidden relative flex flex-col bg-[#FAF8F5]">
            {children}
          </div>

          {/* Home Indicator */}
          <div className="h-[24px] bg-[#FAF8F5] flex items-center justify-center pb-2 z-40 select-none">
            <div className="w-[120px] h-[4px] bg-[#2C3330]/30 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
