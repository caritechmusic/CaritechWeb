import { useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { EventPhoto } from '../data/caritechData';
import { MediaImage } from './MediaImage';

interface FeedPhotoLightboxProps {
  photos: EventPhoto[];
  activeIndex: number | null;
  eventTitle: string;
  eventDate: string;
  onClose: () => void;
  onChangeIndex: (nextIndex: number) => void;
}

export function FeedPhotoLightbox({
  photos,
  activeIndex,
  eventTitle,
  eventDate,
  onClose,
  onChangeIndex,
}: FeedPhotoLightboxProps) {
  useEffect(() => {
    if (activeIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      } else if (event.key === 'ArrowLeft') {
        onChangeIndex((activeIndex - 1 + photos.length) % photos.length);
      } else if (event.key === 'ArrowRight') {
        onChangeIndex((activeIndex + 1) % photos.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, photos.length, onClose, onChangeIndex]);

  if (activeIndex === null || !photos[activeIndex]) return null;

  const photo = photos[activeIndex];
  const prevIndex = (activeIndex - 1 + photos.length) % photos.length;
  const nextIndex = (activeIndex + 1) % photos.length;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Galería de ${eventTitle}`}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-8 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl overflow-hidden rounded-xl border border-white/15 bg-[#121216] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-3.5 sm:px-6">
          <div className="min-w-0">
            <p className="text-xs text-[#A1A1AA] truncate">
              {eventTitle} · {eventDate}
            </p>
            <p className="font-mono text-xs text-[#EF4444] tabular-nums mt-0.5">
              {String(activeIndex + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar fotografía"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-white/15 text-[#F4F4F5] hover:bg-white/10 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EF4444]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="relative bg-[#070709]">
          <MediaImage
            src={photo.src}
            alt={photo.alt}
            title={eventTitle}
            className="mx-auto max-h-[65vh] w-full object-contain"
          />

          <button
            type="button"
            onClick={() => onChangeIndex(prevIndex)}
            aria-label="Fotografía anterior"
            className="absolute left-3 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/20 bg-black/75 text-[#F4F4F5] hover:bg-[#DC2626] hover:text-white hover:border-[#DC2626] transition-colors cursor-pointer"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={() => onChangeIndex(nextIndex)}
            aria-label="Siguiente fotografía"
            className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/20 bg-black/75 text-[#F4F4F5] hover:bg-[#DC2626] hover:text-white hover:border-[#DC2626] transition-colors cursor-pointer"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-t border-white/10 px-5 py-4 sm:px-6">
          <p className="text-sm text-[#D4D4D8]">{photo.caption}</p>
          <p className="text-xs text-[#8A8A93] shrink-0">{photo.credit}</p>
        </div>
      </div>
    </div>
  );
}
