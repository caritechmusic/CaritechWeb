import { useEffect, useState } from 'react';
import { Calendar, ExternalLink, Headphones, MapPin, Play, X } from 'lucide-react';
import {
  REALIZED_EVENTS,
  type EventAudiovisualLink,
  type RealizedEvent,
} from '../data/caritechData';
import { getYoutubeEmbedUrl, getYoutubeThumbnailUrl } from '../utils/youtube';
import { MediaImage } from './MediaImage';

interface ActiveSetSelection {
  event: RealizedEvent;
  setItem: EventAudiovisualLink;
}

export function SetsArchiveSection() {
  const [selectedEventFilter, setSelectedEventFilter] = useState<string>('todos');
  const [activeSet, setActiveSet] = useState<ActiveSetSelection | null>(null);

  const eventsWithSets = REALIZED_EVENTS.map((event) => ({
    event,
    sets: event.audiovisualLinks.filter((item) => item.kind === 'set'),
  })).filter((group) => group.sets.length > 0);

  const totalSetsCount = eventsWithSets.reduce((acc, group) => acc + group.sets.length, 0);

  const visibleGroups =
    selectedEventFilter === 'todos'
      ? eventsWithSets
      : eventsWithSets.filter((group) => group.event.id === selectedEventFilter);

  useEffect(() => {
    if (!activeSet) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveSet(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [activeSet]);

  const activeEmbedUrl = getYoutubeEmbedUrl(activeSet?.setItem.externalUrl);

  return (
    <section id="sets" className="bg-[#09090B] py-12 lg:py-20">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        {/* Heading + Filter Tabs */}
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end mb-12">
          <div className="max-w-2xl space-y-3">
            <p className="text-xs font-medium text-[#EF4444]">Archivo de Sets en Vivo</p>
            <h1 className="font-display text-3xl font-semibold tracking-tight text-[#F4F4F5] sm:text-4xl">
              Todos nuestros sets, ordenados por evento.
            </h1>
            <p className="text-sm leading-relaxed text-[#A1A1AA]">
              Colección curada de sesiones grabadas en estudio y locaciones singulares, agrupadas
              por producción para escuchar o ver directamente en la web.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Filtrar sets por evento"
            className="flex flex-wrap items-center gap-1.5 rounded-lg border border-white/10 bg-[#141418] p-1"
          >
            <button
              type="button"
              role="tab"
              aria-selected={selectedEventFilter === 'todos'}
              onClick={() => setSelectedEventFilter('todos')}
              className={`rounded-md px-3.5 py-2 text-xs font-medium transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EF4444] ${
                selectedEventFilter === 'todos'
                  ? 'bg-[#DC2626] text-white font-semibold'
                  : 'text-[#A1A1AA] hover:text-[#F4F4F5]'
              }`}
            >
              Todos los eventos ({totalSetsCount})
            </button>

            {eventsWithSets.map(({ event, sets }) => {
              const isSelected = selectedEventFilter === event.id;
              return (
                <button
                  key={event.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setSelectedEventFilter(event.id)}
                  className={`rounded-md px-3.5 py-2 text-xs font-medium transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EF4444] ${
                    isSelected
                      ? 'bg-[#DC2626] text-white font-semibold'
                      : 'text-[#A1A1AA] hover:text-[#F4F4F5]'
                  }`}
                >
                  {event.title} ({sets.length})
                </button>
              );
            })}
          </div>
        </div>

        {/* Event Groups */}
        <div className="space-y-14">
          {visibleGroups.map(({ event, sets }) => (
            <div key={event.id} className="space-y-6">
              {/* Event Group Header */}
              <div className="flex flex-col justify-between gap-4 border-b border-white/10 pb-5 sm:flex-row sm:items-end">
                <div className="flex items-center gap-4 min-w-0">
                  {event.logo && (
                    <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-white/15 bg-[#141418]">
                      <MediaImage
                        src={event.logo}
                        alt={event.logoAlt || event.title}
                        title={event.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                  <div className="min-w-0 space-y-1">
                    <p className="font-mono text-xs text-[#EF4444] tabular-nums">
                      {event.indexLabel} {event.formatTag}
                    </p>
                    <h2 className="font-display text-2xl font-semibold tracking-tight text-[#F4F4F5]">
                      {event.title}
                    </h2>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#8A8A93]">
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 text-[#EF4444]" aria-hidden="true" />
                        <span>{event.date}</span>
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-[#EF4444]" aria-hidden="true" />
                        <span>{event.location}</span>
                      </span>
                    </div>
                  </div>
                </div>

                <p className="font-mono text-xs text-[#A1A1AA] tabular-nums shrink-0">
                  {sets.length} sets disponibles
                </p>
              </div>

              {/* Ordered Set Cards Grid */}
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {sets.map((setItem, index) => {
                  const thumbUrl = getYoutubeThumbnailUrl(setItem.externalUrl);
                  const hasEmbed = Boolean(getYoutubeEmbedUrl(setItem.externalUrl));
                  const trackNumber = String(index + 1).padStart(2, '0');

                  return (
                    <article
                      key={setItem.id}
                      className="group flex flex-col justify-between overflow-hidden rounded-xl border border-white/10 bg-[#141418] transition-colors duration-150 hover:border-white/25"
                    >
                      <div>
                        {/* Thumbnail / Play Trigger */}
                        <button
                          type="button"
                          onClick={() => setActiveSet({ event, setItem })}
                          aria-label={`Reproducir set ${setItem.artistOrDirector} en ${event.title}`}
                          className="relative block aspect-video w-full overflow-hidden bg-[#09090B] text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EF4444]"
                        >
                          {thumbUrl ? (
                            <img
                              src={thumbUrl}
                              alt={`Miniatura del set ${setItem.artistOrDirector} — ${event.title}`}
                              loading="lazy"
                              referrerPolicy="no-referrer"
                              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center bg-[#18181B] text-[#8A8A93]">
                              <Headphones className="h-8 w-8" aria-hidden="true" />
                            </div>
                          )}

                          <div
                            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
                            aria-hidden="true"
                          />

                          <span className="absolute left-3 top-3 rounded bg-black/80 px-2 py-0.5 font-mono text-[11px] font-medium text-[#F4F4F5] tabular-nums backdrop-blur-sm border border-white/10">
                            {trackNumber} · {setItem.styleOrFormat}
                          </span>

                          {hasEmbed && (
                            <span
                              className="absolute inset-0 flex items-center justify-center"
                              aria-hidden="true"
                            >
                              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/25 bg-[#09090B]/85 text-[#EF4444] shadow-lg transition-transform duration-200 group-hover:scale-110 group-hover:bg-[#DC2626] group-hover:text-white group-hover:border-[#DC2626]">
                                <Play className="h-5 w-5 translate-x-0.5" />
                              </span>
                            </span>
                          )}
                        </button>

                        {/* Set Info */}
                        <div className="p-5 space-y-2">
                          <p className="text-xs text-[#A1A1AA]">
                            {setItem.platform} · {setItem.duration}
                          </p>
                          <h3 className="font-display text-lg font-semibold text-[#F4F4F5]">
                            {setItem.artistOrDirector}
                          </h3>
                          <p className="text-xs leading-relaxed text-[#A1A1AA] line-clamp-2">
                            {setItem.description}
                          </p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-between gap-3 border-t border-white/10 px-5 py-3.5">
                        <button
                          type="button"
                          onClick={() => setActiveSet({ event, setItem })}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#EF4444] hover:text-red-300 transition-colors cursor-pointer"
                        >
                          <Play className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>{hasEmbed ? 'Reproducir aquí' : 'Ver detalle'}</span>
                        </button>

                        {setItem.externalUrl && (
                          <a
                            href={setItem.externalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#A1A1AA] hover:text-[#F4F4F5] transition-colors whitespace-nowrap"
                          >
                            <span>Abrir en YouTube</span>
                            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                          </a>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Set Video Player Modal */}
      {activeSet && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="set-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 sm:p-6 backdrop-blur-sm"
          onClick={() => setActiveSet(null)}
        >
          <div
            className="w-full max-w-3xl rounded-xl border border-white/15 bg-[#121216] p-6 shadow-2xl space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
              <div className="space-y-1">
                <p className="text-xs font-medium text-[#EF4444]">
                  {activeSet.event.title} · {activeSet.setItem.styleOrFormat}
                </p>
                <h3
                  id="set-modal-title"
                  className="font-display text-xl font-semibold text-[#F4F4F5]"
                >
                  {activeSet.setItem.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveSet(null)}
                aria-label="Cerrar reproductor de set"
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-white/15 text-[#F4F4F5] hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {activeEmbedUrl && (
              <div className="overflow-hidden rounded-lg border border-white/10 bg-black aspect-video">
                <iframe
                  src={activeEmbedUrl}
                  title={activeSet.setItem.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="h-full w-full"
                />
              </div>
            )}

            <p className="text-sm leading-relaxed text-[#D4D4D8]">
              {activeSet.setItem.description}
            </p>

            {activeSet.setItem.externalUrl && (
              <div className="flex items-center justify-between gap-4 border-t border-white/10 pt-4">
                <span className="text-xs text-[#8A8A93]">
                  {activeSet.event.location} · {activeSet.event.date}
                </span>
                <a
                  href={activeSet.setItem.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-md bg-[#DC2626] px-4 py-2 text-xs font-semibold text-white hover:bg-[#EF4444] transition-colors whitespace-nowrap"
                >
                  <span>Abrir en YouTube</span>
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
