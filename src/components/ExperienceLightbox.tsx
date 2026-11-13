import { useEffect } from 'react';
import { X, ArrowUpRight } from 'lucide-react';
import { ExperienceItem, InquiryType } from '../data/caritechData';
import { MediaImage } from './MediaImage';

interface ExperienceLightboxProps {
  item: ExperienceItem | null;
  onClose: () => void;
  onRequestSimilar: (preset: InquiryType, subjectNote: string) => void;
}

export function ExperienceLightbox({
  item,
  onClose,
  onRequestSimilar,
}: ExperienceLightboxProps) {
  useEffect(() => {
    if (!item) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 sm:p-8 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-xl border border-white/15 bg-[#101014] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-white/10 bg-[#101014]/95 px-6 py-4 backdrop-blur-sm">
          <div className="min-w-0">
            <p className="text-xs text-[#9A9A96] truncate">
              {item.location} · {item.year}
            </p>
            <h3
              id="lightbox-title"
              className="font-display text-lg font-semibold text-[#EDECE8] truncate"
            >
              {item.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar ficha de experiencia"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-white/15 text-[#EDECE8] hover:bg-white/10 transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5A93C]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          <div className="overflow-hidden rounded-lg border border-white/10 bg-[#0A0A0D]">
            <MediaImage
              src={item.image}
              alt={item.imageAlt}
              title={item.title}
              className="aspect-[16/9] w-full object-cover"
            />
          </div>

          <div className="grid gap-8 md:grid-cols-12">
            <div className="md:col-span-7 space-y-4">
              <p className="text-xs font-medium text-[#E5A93C]">{item.category}</p>
              <p className="text-base leading-relaxed text-[#D8D7D2]">{item.summary}</p>
              <div className="border-t border-white/10 pt-4">
                <h4 className="font-display text-sm font-semibold text-[#EDECE8] mb-2">
                  Impacto cultural y propuesta de valor
                </h4>
                <p className="text-sm leading-relaxed text-[#A3A39E]">{item.impactDetail}</p>
              </div>
            </div>

            <div className="md:col-span-5 flex flex-col justify-between gap-6 border-t border-white/10 pt-4 md:border-t-0 md:border-l md:pt-0 md:pl-6">
              <div>
                <h4 className="font-display text-sm font-semibold text-[#EDECE8] mb-3">
                  Alcance ejecutado
                </h4>
                <ul className="space-y-2.5 text-sm text-[#A3A39E]">
                  {item.deliverables.map((entry) => (
                    <li key={entry} className="flex items-start gap-2.5">
                      <span className="mt-1.5 h-1 w-1 shrink-0 bg-[#E5A93C]" aria-hidden="true" />
                      <span>{entry}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                onClick={() => onRequestSimilar(item.inquiryPreset, item.title)}
                className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#E5A93C] px-5 py-3 text-sm font-semibold text-[#08080A] hover:bg-[#EEB955] active:scale-[0.98] transition-all duration-150 whitespace-nowrap cursor-pointer"
              >
                <span>Solicitar formato similar</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
