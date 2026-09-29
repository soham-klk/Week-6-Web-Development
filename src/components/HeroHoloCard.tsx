import React, { useRef, useState } from 'react';

interface HeroHoloCardProps {
  onInspect?: () => void;
}

export const HeroHoloCard: React.FC<HeroHoloCardProps> = ({ onInspect }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setRotate({
      x: -y * 0.04,
      y: x * 0.04
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div
      className="relative flex items-center justify-center min-h-[460px] w-full"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* Volumetric background glow circles */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-80 h-80 rounded-full bg-gradient-to-tr from-primary/15 via-secondary/15 to-transparent animate-spin blur-2xl opacity-60"
          style={{ animationDuration: '30s' }}
        />
      </div>
      <div className="absolute w-96 h-96 rounded-full bg-surface-container-low/40 blur-2xl pointer-events-none" />

      {/* Central Holographic Resume Blueprint Card */}
      <div
        ref={cardRef}
        onClick={onInspect}
        style={{
          transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) translateY(${isHovered ? '-6px' : '0px'})`,
          transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
        }}
        className="relative z-20 w-full max-w-sm rounded-2xl bg-surface-container-low/90 backdrop-blur-xl p-6 shadow-2xl border border-white/10 transition-shadow duration-300 hover:shadow-[0_20px_50px_rgba(6,182,212,0.2)] cursor-pointer group"
      >
        {/* Card Header Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-error" />
            <span className="w-3 h-3 rounded-full bg-primary-fixed-dim" />
            <span className="w-3 h-3 rounded-full bg-primary" />
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-primary-container text-on-primary font-['Inter',sans-serif] text-[11px] font-bold tracking-wider">
            AI EVALUATED
          </span>
        </div>

        {/* Holographic Avatar & Title */}
        <div className="flex items-center gap-3.5 pt-4">
          <div className="w-13 h-13 rounded-xl bg-surface-container-highest flex items-center justify-center text-primary shadow-inner border border-primary/20 shrink-0">
            <span className="material-symbols-outlined text-[30px]">account_box</span>
          </div>
          <div>
            <p className="font-['Plus_Jakarta_Sans',sans-serif] text-lg font-bold text-on-surface">
              Alex Mercer
            </p>
            <p className="font-['Inter',sans-serif] text-xs text-on-surface-variant">
              Senior Frontend Engineer
            </p>
          </div>
        </div>

        {/* Radial ATS Metric Box */}
        <div className="mt-4 p-3.5 rounded-xl bg-surface-container flex items-center justify-between border border-white/[0.04]">
          <div>
            <p className="font-['Inter',sans-serif] text-xs text-on-surface-variant font-medium">
              ATS Trajectory Score
            </p>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="font-['Plus_Jakarta_Sans',sans-serif] text-3xl font-extrabold text-primary">
                94
              </span>
              <span className="font-['Inter',sans-serif] text-sm text-on-surface-variant font-semibold">
                / 100
              </span>
            </div>
          </div>

          {/* SVG Progress Ring Graphic */}
          <div className="w-14 h-14 relative flex items-center justify-center">
            <svg className="w-14 h-14 -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-surface-variant stroke-current"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                strokeWidth="3.5"
              />
              <path
                className="text-primary stroke-current"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                strokeDasharray="94, 100"
                strokeLinecap="round"
                strokeWidth="3.5"
              />
            </svg>
            <span className="absolute material-symbols-outlined text-primary text-[18px]">
              verified
            </span>
          </div>
        </div>

        {/* Skill Telemetry Nodes */}
        <div className="mt-4 space-y-2.5">
          <div>
            <div className="flex justify-between font-['Inter',sans-serif] text-xs text-on-surface-variant pb-1">
              <span>TypeScript / React Architecture</span>
              <span className="text-primary font-bold">98% Fit</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-surface-container-highest overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary-container to-primary rounded-full transition-all duration-1000"
                style={{ width: '98%' }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between font-['Inter',sans-serif] text-xs text-on-surface-variant pb-1">
              <span>Cloud Infrastructure (AWS/CDK)</span>
              <span className="text-secondary font-bold">82% Fit</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-surface-container-highest overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-secondary-container to-secondary rounded-full transition-all duration-1000"
                style={{ width: '82%' }}
              />
            </div>
          </div>
        </div>

        {/* Live Floating Feature Badges */}
        <div className="pt-4 flex flex-wrap gap-2 border-t border-white/[0.04] mt-4">
          <span className="px-2.5 py-1 rounded-lg bg-surface-container text-primary font-['Inter',sans-serif] text-[11px] font-semibold flex items-center gap-1 border border-primary/20">
            <span className="material-symbols-outlined text-[14px]">bolt</span>
            Keywords Optimized
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-surface-container text-secondary font-['Inter',sans-serif] text-[11px] font-semibold flex items-center gap-1 border border-secondary/20">
            <span className="material-symbols-outlined text-[14px]">psychology</span>
            AI Tailored
          </span>
        </div>
      </div>

      {/* Orbiting Particle Badges with Parallax */}
      <div
        className="absolute -top-3 -right-2 z-30 bg-surface-container-high/95 backdrop-blur-xl px-3.5 py-2 rounded-xl shadow-xl flex items-center gap-2 border border-primary/30 animate-bounce pointer-events-none"
        style={{ animationDuration: '4s' }}
      >
        <span className="w-2.5 h-2.5 rounded-full bg-primary animate-ping" />
        <span className="font-['Inter',sans-serif] text-xs text-on-surface font-semibold">
          +24% Interview Callbacks
        </span>
      </div>

      <div className="absolute -bottom-4 -left-4 z-30 bg-surface-container-high/95 backdrop-blur-xl px-3.5 py-2 rounded-xl shadow-xl flex items-center gap-2 border border-secondary/30 pointer-events-none">
        <span className="material-symbols-outlined text-secondary text-[18px]">
          auto_awesome
        </span>
        <span className="font-['Inter',sans-serif] text-xs text-on-surface font-semibold">
          ATS Match: 94%
        </span>
      </div>
    </div>
  );
};
