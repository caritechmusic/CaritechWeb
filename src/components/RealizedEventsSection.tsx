import { useEffect, useState } from 'react';
import {
  ArrowUpRight,
  Calendar,
  ExternalLink,
  Film,
  Grid3X3,
  Headphones,
  MapPin,
  Play,
  X,
} from 'lucide-react';
import {
  REALIZED_EVENTS,
  type EventAudiovisualLink,
  type InquiryType,
} from '../data/caritechData';
import { MediaImage } from './MediaImage';
import { FeedPhotoLightbox } from './FeedPhotoLightbox';
import { getYoutubeEmbedUrl } from '../utils/youtube';

interface RealizedEventsSectionProps {
  onRequestEventProposal: (preset: InquiryType, note: string) => void;
}

export function RealizedEventsSection({ onRequestEventProposal }: RealizedEventsSectionProps) {
  const [selectedEventId, setSelectedEventId] = useState<string>(REALIZED_EVENTS[0].id);
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);
  const [activeMediaItem, setActiveMediaItem] = useState<EventAudiovisualLink | null>(null);

  const activeEvent =
    REALIZED_EVENTS.find((event) => event.id === selectedEventId) ?? REALIZED_EVENTS[0];

  useEffect(() => {
    if (!activeMediaItem) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveMediaItem(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [activeMediaItem]);

  const handleSelectEvent = (eventId: string) => {
    setSelectedEventId(eventId);
    setActivePhotoIndex(null);
    setActiveMediaItem(null);
  };

  const activeEmbedUrl = getYoutubeEmbedUrl(activeMediaItem?.externalUrl);

  return (
    <section id="eventos" className="bg-[#0F0F12] py-12 lg:py-20">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        {/* Section Heading + Event Switcher */}
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end mb-12">
          <div className="max-w-2xl space-y-3">
            <p className="text-xs font-medium text-[#EF4444]">Archivo de Producciones</p>
            <h1 className="font-display text-3xl font-semibold tracking-tight text-[#F4F4F5] sm:text-4xl">
              Eventos que hemos realizado.
            </h1>
          </div>

          <div
            role="tablist"
            aria-label="Seleccionar evento realizado"
            className="flex flex-wrap items-center gap-1.5 rounded-lg border border-white/10 bg-[#141418] p-1"
          >
            {REALIZED_EVENTS.map((event) => {
              const isSelected = event.id === activeEvent.id;
              return (
                <button
                  key={event.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => handleSelectEvent(event.id)}
                  className={`rounded-md px-4 py-2 text-xs font-medium transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EF4444] ${
                    isSelected
                      ? 'bg-[#DC2626] text-white font-semibold'
                      : 'text-[#A1A1AA] hover:text-[#F4F4F5]'
                  }`}
                >
                  <span className="font-mono mr-1.5 opacity-80 tabular-nums">
                    {event.indexLabel}
                  </span>
                  {event.title}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Event Layout: Left Dossier + Audiovisual Sets | Right 3-in-3 Instagram Feed */}
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-12">
          {/* Left Column: Event Identity, Date, Description, Sets & Audiovisual */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                {activeEvent.logo && (
                  <div className="h-20 w-20 sm:h-24 sm:w-24 shrink-0 overflow-hidden rounded-lg border border-white/15 bg-[#09090B]">
                    <MediaImage
                      src={activeEvent.logo}
                      alt={activeEvent.logoAlt || `Logo de ${activeEvent.title}`}
                      title={activeEvent.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}

                <div className="space-y-1.5 min-w-0">
                  <p className="text-xs font-medium text-[#EF4444]">{activeEvent.formatTag}</p>
                  <h2 className="font-display text-2xl font-semibold tracking-tight text-[#F4F4F5] sm:text-3xl">
                    {activeEvent.title}
                  </h2>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-1 text-xs text-[#A1A1AA]">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-[#EF4444]" aria-hidden="true" />
                      <span>{activeEvent.date}</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-[#EF4444]" aria-hidden="true" />
                      <span>{activeEvent.location}</span>
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-sm sm:text-base leading-relaxed text-[#D4D4D8]">
                {activeEvent.description}
              </p>

              <ul className="space-y-2 border-t border-white/10 pt-4 text-sm text-[#A1A1AA]">
                {activeEvent.productionHighlights.map((point) => (
                  <li key={point} className="flex items-start gap-2.5">
                    <span className="mt-2 h-1 w-1 shrink-0 bg-[#EF4444]" aria-hidden="true" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Material Audiovisual & Links de Sets */}
            <div className="rounded-xl border border-white/10 bg-[#141418] p-5 sm:p-6 space-y-4">
              <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-3">
                <h3 className="font-display text-base font-semibold text-[#F4F4F5]">
                  Material audiovisual y sets
                </h3>
                <span className="font-mono text-xs text-[#8A8A93] tabular-nums">
                  {activeEvent.audiovisualLinks.length} enlaces
                </span>
              </div>

              <div className="divide-y divide-white/10">
                {activeEvent.audiovisualLinks.map((media) => {
                  const Icon = media.kind === 'aftermovie' ? Film : Headphones;
                  const hasYoutube = Boolean(getYoutubeEmbedUrl(media.externalUrl));

                  return (
                    <div
                      key={media.id}
                      className="flex items-center justify-between gap-3 py-3.5"
                    >
                      <button
                        type="button"
                        onClick={() => setActiveMediaItem(media)}
                        className="group flex flex-1 items-start gap-3 min-w-0 text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EF4444] rounded-sm"
                      >
                        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-white/10 bg-[#09090B] text-[#EF4444] group-hover:border-[#DC2626]/60 transition-colors">
                          {hasYoutube ? (
                            <Play className="h-3.5 w-3.5" aria-hidden="true" />
                          ) : (
                            <Icon className="h-4 w-4" aria-hidden="true" />
                          )}
                        </div>
                        <div className="min-w-0 space-y-0.5">
                          <p className="text-sm font-medium text-[#F4F4F5] group-hover:text-[#EF4444] transition-colors truncate">
                            {media.artistOrDirector}
                          </p>
                          <p className="text-xs text-[#A1A1AA] truncate">
                            {media.styleOrFormat} · {media.platform}
                          </p>
                        </div>
                      </button>

                      <div className="flex items-center gap-2 shrink-0">
                        {hasYoutube ? (
                          <button
                            type="button"
                            onClick={() => setActiveMediaItem(media)}
                            className="rounded-md border border-white/15 bg-[#09090B] px-2.5 py-1.5 text-xs font-medium text-[#F4F4F5] hover:border-[#DC2626] hover:text-[#EF4444] transition-colors whitespace-nowrap cursor-pointer"
                          >
                            Reproducir
                          </button>
                        ) : media.externalUrl ? (
                          <a
                            href={media.externalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-md border border-white/15 bg-[#09090B] px-2.5 py-1.5 text-xs font-medium text-[#F4F4F5] hover:border-[#DC2626] hover:text-[#EF4444] transition-colors whitespace-nowrap"
                          >
                            {media.externalUrl.includes('instagram.com') ? 'Ver en IG' : 'Ver enlace'}
                          </a>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setActiveMediaItem(media)}
                            className="rounded-md border border-white/15 bg-[#09090B] px-2.5 py-1.5 text-xs font-medium text-[#F4F4F5] hover:border-[#DC2626] hover:text-[#EF4444] transition-colors whitespace-nowrap cursor-pointer"
                          >
                            Ver ficha
                          </button>
                        )}
                        {media.externalUrl && (
                          <a
                            href={media.externalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Abrir ${media.artistOrDirector} en ${media.platform.split('·')[0].trim()}`}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-white/10 bg-[#09090B] text-[#A1A1AA] hover:border-white/30 hover:text-[#F4F4F5] transition-colors"
                          >
                            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                          </a>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                onRequestEventProposal(
                  activeEvent.inquiryPreset,
                  `${activeEvent.title} (${activeEvent.date})`
                )
              }
              className="inline-flex items-center justify-center gap-2 rounded-md bg-[#DC2626] px-5 py-3 text-sm font-semibold text-white hover:bg-[#EF4444] active:scale-[0.98] transition-all duration-150 whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EF4444]"
            >
              <span>Llevar este formato a tu espacio</span>
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          {/* Right Column: 3-in-3 Instagram-Style Photo Feed */}
          <div className="lg:col-span-7">
            <div className="rounded-xl border border-white/10 bg-[#141418] p-4 sm:p-6 space-y-4">
              <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-3.5">
                <div className="flex items-center gap-2.5 min-w-0">
                  <Grid3X3 className="h-4 w-4 shrink-0 text-[#EF4444]" aria-hidden="true" />
                  <p className="text-xs font-medium text-[#F4F4F5] truncate">
                    Galería del evento · {activeEvent.title}
                  </p>
                </div>
                <p className="font-mono text-xs text-[#8A8A93] tabular-nums shrink-0">
                  {activeEvent.gallery.length} fotos · Feed 3×3
                </p>
              </div>

              <div className="grid grid-cols-3 gap-1.5 sm:gap-3">
                {activeEvent.gallery.map((photo, index) => {
                  const aspectClass = activeEvent.galleryAspectClass ?? 'aspect-square';
                  const objectPositionClass =
                    aspectClass === 'aspect-[3/4]' ? 'object-[50%_38%]' : 'object-[50%_22%]';
                  return (
                    <button
                      key={photo.id}
                      type="button"
                      onClick={() => setActivePhotoIndex(index)}
                      aria-label={`Ver fotografía ${index + 1} de ${activeEvent.title}`}
                      className={`group relative ${aspectClass} overflow-hidden rounded-md sm:rounded-lg border border-white/10 bg-[#09090B] text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EF4444]`}
                    >
                      <MediaImage
                        src={photo.src}
                        alt={photo.alt}
                        title={activeEvent.title}
                        className={`h-full w-full object-cover ${objectPositionClass} transition-transform duration-300 group-hover:scale-[1.04]`}
                      />
                      <div
                        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                        aria-hidden="true"
                      />
                      <div className="absolute inset-x-0 bottom-0 p-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-150 hidden sm:block">
                        <p className="line-clamp-2 text-[11px] leading-snug text-[#F4F4F5]">
                          {photo.caption}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Photo Feed Lightbox */}
      <FeedPhotoLightbox
        photos={activeEvent.gallery}
        activeIndex={activePhotoIndex}
        eventTitle={activeEvent.title}
        eventDate={activeEvent.date}
        onClose={() => setActivePhotoIndex(null)}
        onChangeIndex={setActivePhotoIndex}
      />

      {/* Audiovisual / YouTube Set Modal */}
      {activeMediaItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="media-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 sm:p-6 backdrop-blur-sm"
          onClick={() => setActiveMediaItem(null)}
        >
          <div
            className="w-full max-w-2xl rounded-xl border border-white/15 bg-[#121216] p-6 shadow-2xl space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
              <div className="space-y-1">
                <p className="text-xs font-medium text-[#EF4444]">
                  {activeEvent.title} · {activeMediaItem.platform}
                </p>
                <h3
                  id="media-modal-title"
                  className="font-display text-xl font-semibold text-[#F4F4F5]"
                >
                  {activeMediaItem.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveMediaItem(null)}
                aria-label="Cerrar reproductor audiovisual"
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-white/15 text-[#F4F4F5] hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {activeEmbedUrl ? (
              <div className="overflow-hidden rounded-lg border border-white/10 bg-black aspect-video">
                <iframe
                  src={activeEmbedUrl}
                  title={activeMediaItem.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="h-full w-full"
                />
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 rounded-lg border border-white/10 bg-[#09090B] p-4 text-xs">
                <div>
                  <p className="text-[#8A8A93]">Responsable</p>
                  <p className="mt-0.5 font-medium text-[#F4F4F5]">
                    {activeMediaItem.artistOrDirector}
                  </p>
                </div>
                <div>
                  <p className="text-[#8A8A93]">Duración / Formato</p>
                  <p className="mt-0.5 font-mono text-[#F4F4F5] tabular-nums">
                    {activeMediaItem.duration} · {activeMediaItem.styleOrFormat}
                  </p>
                </div>
              </div>
            )}

            <p className="text-sm leading-relaxed text-[#D4D4D8]">{activeMediaItem.description}</p>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
              {activeMediaItem.externalUrl ? (
                <a
                  href={activeMediaItem.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-md bg-[#DC2626] px-4 py-2 text-xs font-semibold text-white hover:bg-[#EF4444] transition-colors whitespace-nowrap"
                >
                  <span>
                    {activeEmbedUrl
                      ? 'Abrir en YouTube'
                      : activeMediaItem.externalUrl.includes('instagram.com')
                        ? 'Ver Aftermovie en Instagram'
                        : 'Abrir en plataforma externa'}
                  </span>
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    const title = activeMediaItem.title;
                    setActiveMediaItem(null);
                    onRequestEventProposal(
                      'Alianza / Nuevo Espacio',
                      `Solicitud de acceso a material audiovisual / set: ${title} (${activeEvent.title})`
                    );
                  }}
                  className="inline-flex items-center gap-1.5 rounded-md bg-[#DC2626] px-4 py-2 text-xs font-semibold text-white hover:bg-[#EF4444] transition-colors cursor-pointer whitespace-nowrap"
                >
                  <span>Solicitar link directo</span>
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              )}

              <button
                type="button"
                onClick={() => {
                  const artist = activeMediaItem.artistOrDirector;
                  setActiveMediaItem(null);
                  onRequestEventProposal(
                    'Booking de Talento',
                    `Consulta de booking / colaboración vinculada a ${artist} (${activeEvent.title})`
                  );
                }}
                className="text-xs font-medium text-[#A1A1AA] hover:text-[#F4F4F5] underline-offset-4 hover:underline cursor-pointer"
              >
                Consultar booking del artista
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
