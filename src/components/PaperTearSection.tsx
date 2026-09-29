import React, { useState, useEffect, useRef } from 'react';

interface PaperTearSectionProps {
  imageUrl?: string;
}

// Micro-variations along the horizontal seam to simulate realistic jagged ripped paper fibers
const tearPoints: [number, number][] = [
  [0, 50.0],
  [2.5, 49.6],
  [4.8, 50.8],
  [7.2, 49.2],
  [9.6, 51.1],
  [12.2, 49.5],
  [14.6, 50.7],
  [17.0, 48.9],
  [19.4, 51.3],
  [22.0, 50.0],
  [24.5, 48.6],
  [27.0, 50.4],
  [29.5, 49.1],
  [32.2, 51.5],
  [34.8, 49.7],
  [37.4, 50.9],
  [40.0, 48.8],
  [42.5, 51.2],
  [45.0, 49.6],
  [47.6, 51.8],
  [50.2, 49.2],
  [52.8, 50.9],
  [55.4, 48.7],
  [58.0, 51.4],
  [60.6, 49.9],
  [63.2, 51.2],
  [65.8, 48.9],
  [68.4, 51.7],
  [71.0, 49.3],
  [73.6, 50.8],
  [76.2, 48.5],
  [78.8, 51.1],
  [81.4, 49.6],
  [84.0, 51.4],
  [86.6, 49.2],
  [89.2, 50.7],
  [91.8, 49.4],
  [94.4, 51.0],
  [97.0, 49.3],
  [98.5, 50.5],
  [100, 50.0]
];

// Top half polygon: from (0,0) -> (100,0) -> down jagged line from right to left -> back to (0,0)
const topClip = `polygon(0% 0%, 100% 0%, ${[...tearPoints]
  .reverse()
  .map(([x, y]) => `${x}% ${y}%`)
  .join(', ')}, 0% 0%)`;

// Bottom half polygon: from jagged line left to right -> (100,100) -> (0,100)
const bottomClip = `polygon(${tearPoints
  .map(([x, y]) => `${x}% ${y}%`)
  .join(', ')}, 100% 100%, 0% 100%)`;

export const PaperTearSection: React.FC<PaperTearSectionProps> = ({
  imageUrl = '/rejected-resume.jpg'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check screen size
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();

    // Check reduced motion preference
    const mediaQueryMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQueryMotion.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    mediaQueryMotion.addEventListener('change', handleMotionChange);

    // Scroll progress handler using requestAnimationFrame
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const totalDistance = containerRef.current.offsetHeight - window.innerHeight;
            if (totalDistance > 0) {
              const currentScroll = -rect.top;
              const p = Math.max(0, Math.min(1, currentScroll / totalDistance));
              setProgress(p);
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', checkMobile, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkMobile);
      mediaQueryMotion.removeEventListener('change', handleMotionChange);
    };
  }, []);

  // Compute transform styles based on device and motion preference
  const getTopTransform = () => {
    if (prefersReducedMotion) return undefined;
    if (isMobile) {
      return `translate3d(0, -${progress * 90}%, 0)`;
    }
    // Desktop: smooth upward translation + slight natural paper tilt
    return `translate3d(-${progress * 1.5}%, -${progress * 115}%, 0) rotate(-${progress * 3.2}deg)`;
  };

  const getBottomTransform = () => {
    if (prefersReducedMotion) return undefined;
    if (isMobile) {
      return `translate3d(0, ${progress * 90}%, 0)`;
    }
    // Desktop: smooth downward translation + slight natural paper tilt
    return `translate3d(${progress * 1.5}%, ${progress * 115}%, 0) rotate(${progress * 2.8}deg)`;
  };

  const opacity = prefersReducedMotion ? Math.max(0, 1 - progress * 1.5) : 1;

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[220vh] bg-surface select-none"
      aria-label="Interactive Paper Tear Resume Story"
    >
      {/* Sticky pinned viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-surface">
        {/* REVEAL CONTENT: The impactful message revealed behind the tearing paper */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6 z-0 pointer-events-none max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container border border-white/[0.08] shadow-sm">
            <span className="w-2 h-2 rounded-full bg-error animate-pulse" />
            <span className="font-['Inter',sans-serif] text-xs font-bold text-error uppercase tracking-widest">
              The 6-Second ATS Wall
            </span>
          </div>

          <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-3xl sm:text-5xl lg:text-6xl font-extrabold text-on-surface tracking-tight leading-[1.15]">
            75% of Qualified Resumes <br />
            <span className="bg-gradient-to-r from-primary via-tertiary to-secondary bg-clip-text text-transparent">
              Never Reach a Human Eye.
            </span>
          </h2>

          <p className="font-['Inter',sans-serif] text-base sm:text-lg text-on-surface-variant max-w-2xl leading-relaxed">
            Legacy parsing bots reject top talent over formatting quirks and missing keyword densities.
            CareerPilot shreds the filters and puts you directly in the interview chair.
          </p>

          <div className="pt-2 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary font-['Inter',sans-serif]">
            <span>Keep scrolling to choose your launch runway</span>
            <span className="material-symbols-outlined text-[16px]">arrow_downward</span>
          </div>
        </div>

        {/* TOP HALF OF TORN PAPER */}
        <div
          className="absolute inset-0 w-full h-full z-10 will-change-transform"
          style={{
            transform: getTopTransform(),
            opacity,
            clipPath: topClip,
            filter: 'drop-shadow(0 14px 20px rgba(0,0,0,0.55))',
            transition: prefersReducedMotion ? 'opacity 0.2s linear' : undefined
          }}
        >
          {/* Inner image container (matches full screen to align with bottom half) */}
          <div className="relative w-full h-full flex items-center justify-center bg-surface-container-lowest">
            <img
              src={imageUrl}
              alt="Rejected Resume stamped with Rejection"
              className="w-full h-full object-contain max-h-screen"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Rough White Paper Fiber Rim (Top Half Seam) */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <polyline
              points={tearPoints.map(([x, y]) => `${x},${y}`).join(' ')}
              fill="none"
              stroke="var(--color-surface, #ffffff)"
              strokeWidth="0.4"
              strokeLinecap="round"
              strokeDasharray="0.3 0.15"
              className="dark:stroke-slate-200 stroke-stone-100 opacity-90"
            />
          </svg>
        </div>

        {/* BOTTOM HALF OF TORN PAPER */}
        <div
          className="absolute inset-0 w-full h-full z-10 will-change-transform"
          style={{
            transform: getBottomTransform(),
            opacity,
            clipPath: bottomClip,
            filter: 'drop-shadow(0 -14px 20px rgba(0,0,0,0.55))',
            transition: prefersReducedMotion ? 'opacity 0.2s linear' : undefined
          }}
        >
          {/* Inner image container (matches full screen to align with top half) */}
          <div className="relative w-full h-full flex items-center justify-center bg-surface-container-lowest">
            <img
              src={imageUrl}
              alt="Rejected Resume stamped with Rejection"
              className="w-full h-full object-contain max-h-screen"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Rough White Paper Fiber Rim (Bottom Half Seam) */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <polyline
              points={tearPoints.map(([x, y]) => `${x},${y}`).join(' ')}
              fill="none"
              stroke="var(--color-surface, #ffffff)"
              strokeWidth="0.4"
              strokeLinecap="round"
              strokeDasharray="0.25 0.12"
              className="dark:stroke-slate-200 stroke-stone-100 opacity-90"
            />
          </svg>
        </div>

        {/* "SCROLL TO REVEAL" HINT PILL */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none transition-opacity duration-300"
          style={{
            opacity: Math.max(0, 1 - progress * 4)
          }}
        >
          <div className="px-4 py-2 rounded-full bg-surface-container-high/90 backdrop-blur-md border border-white/10 text-on-surface text-xs font-['Inter',sans-serif] font-medium flex items-center gap-2 shadow-xl">
            <span className="material-symbols-outlined text-[16px] text-primary animate-bounce">
              keyboard_double_arrow_down
            </span>
            <span>Scroll down to tear &amp; reveal</span>
          </div>
        </div>
      </div>
    </section>
  );
};
