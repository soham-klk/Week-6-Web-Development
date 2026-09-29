import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export const CareerPilotLogo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11'
  };

  const textSizes = {
    sm: 'text-[18px]',
    md: 'text-[22px]',
    lg: 'text-[26px]'
  };

  return (
    <div className={`flex items-center gap-2.5 shrink-0 select-none ${className}`}>
      {/* Precision Vector Icon matching user image */}
      <div
        className={`${iconSizes[size]} relative rounded-xl p-[1.5px] bg-gradient-to-tr from-primary via-tertiary to-secondary shadow-[0_0_15px_rgba(76,215,246,0.35)] shrink-0`}
      >
        <div className="w-full h-full rounded-[10px] bg-[#0c1220] flex items-center justify-center relative overflow-hidden">
          {/* Inner ambient glow */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary/15 via-transparent to-secondary/20 pointer-events-none" />

          {/* Compass Arrowhead Navigation Icon */}
          <svg
            className="w-5 h-5 text-primary drop-shadow-[0_0_8px_rgba(76,215,246,0.8)] relative z-10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon
              points="12 2 19 21 12 17 5 21 12 2"
              fill="url(#arrow-grad)"
              stroke="none"
            />
            <circle cx="12" cy="11" r="2" fill="#acedff" />
            <defs>
              <linearGradient id="arrow-grad" x1="5" y1="2" x2="19" y2="21">
                <stop offset="0%" stopColor="#4cd7f6" />
                <stop offset="100%" stopColor="#818cf8" />
              </linearGradient>
            </defs>
          </svg>

          {/* Orbiting Satellite Dot */}
          <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-secondary shadow-[0_0_6px_#d0bcff]" />
        </div>
      </div>

      {showText && (
        <span
          className={`font-['Plus_Jakarta_Sans',sans-serif] font-extrabold tracking-tight ${textSizes[size]}`}
        >
          <span className="text-on-surface">Career</span>
          <span className="text-primary bg-gradient-to-r from-primary to-tertiary bg-clip-text text-transparent">
            Pilot
          </span>
        </span>
      )}
    </div>
  );
};
