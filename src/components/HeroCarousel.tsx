import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { HERO_SLIDES } from '../data/caritechData';
import { MediaImage } from './MediaImage';

export function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused || HERO_SLIDES.length <= 1) return;
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    const interval = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 4500);

    return () => window.clearInterval(interval);
  }, [isPaused]);

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const currentSlide = HERO_SLIDES[currentIndex];

  return (
    <div
      className="relative flex h-full min-h-[380px] sm:min-h-[480px] lg:min-h-[560px] w-full flex-col justify-end overflow-hidden rounded-2xl border border-white/10 bg-[#141418]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-roledescription="carrusel"
      aria-label="Galería principal de Caritech Music"
    >
      {/* Sliding Track */}
      <div
        className="absolute inset-0 flex h-full w-full transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {HERO_SLIDES.map((slide) => (
          <div key={slide.id} className="relative h-full w-full shrink-0">
            <MediaImage
              src={slide.image}
              alt={slide.alt}
              title={slide.caption}
              className={`h-full w-full object-cover ${slide.objectPosition ?? 'object-center'}`}
            />
          </div>
        ))}
      </div>

      {/* High-contrast monochrome vignette for legible typography */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#09090B] via-[#09090B]/45 to-black/20"
        aria-hidden="true"
      />

      {/* Top Controls: Slide Counter & Progress Bars */}
      <div className="relative z-10 flex items-center justify-between gap-4 p-5 sm:p-7 mb-auto">
        <span className="font-mono text-xs text-[#D4D4D8] bg-black/55 px-2.5 py-1 rounded backdrop-blur-sm tabular-nums border border-white/10">
          {String(currentIndex + 1).padStart(2, '0')} / {String(HERO_SLIDES.length).padStart(2, '0')}
        </span>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={goToPrev}
            aria-label="Imagen anterior de portada"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/15 bg-black/55 text-[#F4F4F5] hover:border-[#DC2626] hover:bg-[#DC2626] transition-colors backdrop-blur-sm cursor-pointer"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={goToNext}
            aria-label="Siguiente imagen de portada"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/15 bg-black/55 text-[#F4F4F5] hover:border-[#DC2626] hover:bg-[#DC2626] transition-colors backdrop-blur-sm cursor-pointer"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Bottom Copy + Interactive Progress Indicators */}
      <div className="relative z-10 p-6 sm:p-10 lg:p-12 space-y-5">
        <h1 className="max-w-2xl font-display text-[clamp(1.85rem,3.6vw,3.35rem)] font-bold leading-[1.06] tracking-tight text-[#F4F4F5]">
          “Not everybody understand the house music.”
        </h1>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
          <p className="text-xs font-medium text-[#D4D4D8]">{currentSlide.caption}</p>

          <div
            className="flex items-center gap-1.5"
            role="tablist"
            aria-label="Seleccionar diapositiva de portada"
          >
            {HERO_SLIDES.map((slide, index) => {
              const active = index === currentIndex;
              return (
                <button
                  key={slide.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  aria-label={`Ver diapositiva ${index + 1}: ${slide.caption}`}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    active ? 'w-8 bg-[#EF4444]' : 'w-3 bg-white/30 hover:bg-white/60'
                  }`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
