import { useState } from 'react';
import { ArrowUpRight, Mail, MapPin, Globe } from 'lucide-react';
import {
  CREATIVE_DIVISIONS,
  FLAGSHIP_EXPERIENCES,
  HERO_MEDIA,
  KEY_METRICS,
  SERVICE_OFFERINGS,
  TIMELINE_MILESTONES,
  VISION_PILLARS,
  type ExperienceItem,
  type InquiryType,
  type ServiceCategory,
} from './data/caritechData';
import { Navbar } from './components/Navbar';
import { MediaImage } from './components/MediaImage';
import { ExperienceLightbox } from './components/ExperienceLightbox';
import { AllianceForm } from './components/AllianceForm';

const SERVICE_FILTERS: { id: ServiceCategory; label: string }[] = [
  { id: 'todos', label: 'Todos los servicios' },
  { id: 'eventos-bookings', label: 'Eventos y Bookings' },
  { id: 'produccion-visuales', label: 'Estudio y Fotografía' },
  { id: 'academia', label: 'Academia DJ' },
];

export default function App() {
  const [activeLightbox, setActiveLightbox] = useState<ExperienceItem | null>(null);
  const [serviceFilter, setServiceFilter] = useState<ServiceCategory>('todos');
  const [inquiryPreset, setInquiryPreset] = useState<InquiryType>('Alianza / Nuevo Espacio');
  const [presetNote, setPresetNote] = useState<string | undefined>(undefined);

  const filteredServices =
    serviceFilter === 'todos'
      ? SERVICE_OFFERINGS
      : SERVICE_OFFERINGS.filter((service) => service.category === serviceFilter);

  const navigateToInquiry = (preset: InquiryType, note?: string) => {
    setInquiryPreset(preset);
    setPresetNote(note);
    setActiveLightbox(null);
    const target = document.getElementById('contacto');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="inicio" className="min-h-screen bg-[#08080A] text-[#EDECE8]">
      <Navbar onPrimaryAction={() => navigateToInquiry('Alianza / Nuevo Espacio')} />

      <main>
        {/* Hero Split-Screen */}
        <section className="mx-auto max-w-[1280px] px-6 pt-12 pb-12 lg:px-10 lg:pt-16 lg:pb-16">
          <div className="grid items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-6 flex flex-col justify-between py-2">
              <div className="space-y-6">
                <p className="text-xs font-medium tracking-wide text-[#A3A39E]">
                  Caracas, Venezuela · Fundado en 2019 · Proyección Internacional
                </p>

                <h1 className="font-display text-[clamp(2.25rem,4vw,3.65rem)] font-bold leading-[1.06] tracking-tight text-[#EDECE8]">
                  Arquitectura sonora y experiencias inmersivas para la vida nocturna.
                </h1>

                <p className="max-w-[60ch] text-base leading-relaxed text-[#B2B1AC]">
                  Caritech Music nació en 2019 como un colectivo de DJs y evolucionó en una
                  estructura integral de producción de eventos, bookings, gestión de talento,
                  estudio musical, fotografía y academia formativa. Desde el helipuerto del Hotel
                  Meliá Caracas hasta formatos conceptuales como Journey to the Space, diseñamos
                  propuestas vanguardistas listas para nuevos escenarios internacionales.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-5 pt-2">
                <button
                  type="button"
                  onClick={() => navigateToInquiry('Alianza / Nuevo Espacio')}
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-[#E5A93C] px-6 py-3.5 text-sm font-semibold text-[#08080A] hover:bg-[#EEB955] active:scale-[0.98] transition-all duration-150 whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5A93C]"
                >
                  <span>Presentar proyecto o espacio</span>
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </button>

                <a
                  href="#experiencias"
                  className="text-sm font-medium text-[#D6D5D0] hover:text-[#EDECE8] underline underline-offset-4 transition-colors duration-150 whitespace-nowrap"
                >
                  Explorar eventos emblemáticos
                </a>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative h-full min-h-[320px] overflow-hidden rounded-xl border border-white/10 bg-[#111115]">
                <MediaImage
                  src={HERO_MEDIA.image}
                  alt={HERO_MEDIA.alt}
                  title={HERO_MEDIA.caption}
                  className="h-full w-full object-cover lg:h-full"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
                  aria-hidden="true"
                />
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                  <p className="text-xs font-medium text-[#E5A93C]">Archivo destacado</p>
                  <p className="mt-1 text-sm font-medium text-[#EDECE8]">{HERO_MEDIA.caption}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Full-Width Key Metrics Strip below Hero Split */}
          <div className="mt-12 grid grid-cols-2 gap-6 border-t border-b border-white/10 py-8 lg:grid-cols-4 lg:gap-8">
            {KEY_METRICS.map((metric) => (
              <div key={metric.label} className="space-y-1">
                <p className="font-mono text-2xl font-medium tracking-tight text-[#EDECE8] tabular-nums sm:text-3xl">
                  {metric.value}
                </p>
                <p className="text-sm font-medium text-[#D6D5D0]">{metric.label}</p>
                <p className="text-xs text-[#8D8D88]">{metric.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Trayectoria e Impacto Cultural */}
        <section id="trayectoria" className="mx-auto max-w-[1280px] px-6 py-16 lg:px-10 lg:py-20">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end mb-12">
            <div className="lg:col-span-7 space-y-3">
              <p className="text-xs font-medium text-[#E5A93C]">Trayectoria desde 2019</p>
              <h2 className="font-display text-3xl font-semibold tracking-tight text-[#EDECE8] sm:text-4xl">
                De un grupo de colegas DJs a una plataforma cultural multidisciplinaria.
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="text-sm leading-relaxed text-[#A3A39E]">
                Cada etapa respondió a una necesidad real de la escena nocturna caraqueña: elevar el
                estándar técnico de las cabinas, profesionalizar la gestión artística y conquistar
                espacios arquitectónicos inéditos.
              </p>
            </div>
          </div>

          <div className="grid gap-8 border-t border-white/10 pt-10 md:grid-cols-2 lg:grid-cols-4">
            {TIMELINE_MILESTONES.map((milestone) => (
              <article key={milestone.period} className="space-y-3">
                <p className="font-mono text-sm font-medium text-[#E5A93C] tabular-nums">
                  {milestone.period}
                </p>
                <h3 className="font-display text-lg font-semibold text-[#EDECE8]">
                  {milestone.title}
                </h3>
                <p className="text-sm leading-relaxed text-[#A3A39E]">{milestone.description}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Experiencias Emblemáticas & Archivo Visual */}
        <section
          id="experiencias"
          className="border-t border-white/10 bg-[#0C0C0F] py-16 lg:py-24"
        >
          <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end mb-12">
              <div className="max-w-2xl space-y-3">
                <p className="text-xs font-medium text-[#E5A93C]">Portafolio &amp; Formatos</p>
                <h2 className="font-display text-3xl font-semibold tracking-tight text-[#EDECE8] sm:text-4xl">
                  Experiencias que redefinieron la noche en Caracas.
                </h2>
              </div>
              <p className="max-w-sm text-sm text-[#A3A39E]">
                Selecciona cualquier producción o unidad creativa para revisar su ficha técnica,
                alcance e impacto.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {FLAGSHIP_EXPERIENCES.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveLightbox(item)}
                  className={`group relative overflow-hidden rounded-xl border border-white/10 bg-[#111115] text-left transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5A93C] cursor-pointer ${item.aspectClass}`}
                >
                  <MediaImage
                    src={item.image}
                    alt={item.imageAlt}
                    title={item.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/10"
                    aria-hidden="true"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7 space-y-2">
                    <p className="text-xs text-[#D6D5D0]">
                      {item.location} · {item.year}
                    </p>
                    <div className="flex items-end justify-between gap-4">
                      <h3 className="font-display text-xl font-semibold text-[#EDECE8] sm:text-2xl">
                        {item.title}
                      </h3>
                      <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-white/20 bg-black/50 text-[#EDECE8] group-hover:bg-[#E5A93C] group-hover:text-[#08080A] group-hover:border-[#E5A93C] transition-colors duration-150">
                        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                      </span>
                    </div>
                    <p className="line-clamp-2 max-w-xl text-sm text-[#B2B1AC]">{item.summary}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Productos y Servicios */}
        <section id="servicios" className="mx-auto max-w-[1280px] px-6 py-16 lg:px-10 lg:py-24">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end mb-12">
            <div className="max-w-2xl space-y-3">
              <p className="text-xs font-medium text-[#E5A93C]">Productos &amp; Servicios</p>
              <h2 className="font-display text-3xl font-semibold tracking-tight text-[#EDECE8] sm:text-4xl">
                Soluciones comerciales para clubes, festivales, marcas y artistas.
              </h2>
            </div>

            <div
              role="tablist"
              aria-label="Filtrar servicios de Caritech Music"
              className="flex flex-wrap items-center gap-1.5 rounded-lg border border-white/10 bg-[#111115] p-1"
            >
              {SERVICE_FILTERS.map((filter) => {
                const isSelected = serviceFilter === filter.id;
                return (
                  <button
                    key={filter.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setServiceFilter(filter.id)}
                    className={`rounded-md px-3.5 py-2 text-xs font-medium transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5A93C] ${
                      isSelected
                        ? 'bg-[#E5A93C] text-[#08080A] font-semibold'
                        : 'text-[#A3A39E] hover:text-[#EDECE8]'
                    }`}
                  >
                    {filter.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="divide-y divide-white/10 border-t border-b border-white/10">
            {filteredServices.map((service) => (
              <article
                key={service.id}
                className="grid gap-6 py-8 lg:grid-cols-12 lg:items-start lg:gap-8"
              >
                <div className="lg:col-span-5 space-y-2">
                  <p className="text-xs text-[#9A9A96]">
                    <span className="font-mono text-[#E5A93C] mr-2 tabular-nums">
                      {service.number}
                    </span>
                    {service.categoryLabel}
                  </p>
                  <h3 className="font-display text-xl font-semibold text-[#EDECE8] sm:text-2xl">
                    {service.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#A3A39E]">{service.lead}</p>
                </div>

                <div className="lg:col-span-4 space-y-2.5">
                  <p className="text-xs font-medium text-[#D6D5D0]">Entregables clave</p>
                  <ul className="space-y-2 text-sm text-[#A3A39E]">
                    {service.deliverables.map((deliverable) => (
                      <li key={deliverable} className="flex items-start gap-2.5">
                        <span
                          className="mt-2 h-1 w-1 shrink-0 bg-[#E5A93C]"
                          aria-hidden="true"
                        />
                        <span>{deliverable}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="lg:col-span-3 flex flex-col justify-between gap-4 lg:items-end lg:text-right">
                  <div>
                    <p className="text-xs font-medium text-[#8D8D88]">Orientado a</p>
                    <p className="mt-1 text-sm text-[#D6D5D0]">{service.targetAudience}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigateToInquiry(service.inquiryPreset, service.title)}
                    className="inline-flex items-center justify-center gap-2 rounded-md border border-white/15 bg-[#111115] px-4 py-2.5 text-xs font-semibold text-[#EDECE8] hover:border-[#E5A93C] hover:text-[#E5A93C] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5A93C]"
                  >
                    <span>Solicitar propuesta</span>
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Colectivo Multidisciplinario & Visión Futura */}
        <section
          id="colectivo"
          className="border-t border-white/10 bg-[#0C0C0F] py-16 lg:py-24"
        >
          <div className="mx-auto max-w-[1280px] px-6 lg:px-10 space-y-20">
            <div>
              <div className="max-w-2xl space-y-3 mb-12">
                <p className="text-xs font-medium text-[#E5A93C]">Estructura Humana</p>
                <h2 className="font-display text-3xl font-semibold tracking-tight text-[#EDECE8] sm:text-4xl">
                  Cuatro disciplinas operando bajo una misma dirección estética.
                </h2>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {CREATIVE_DIVISIONS.map((division) => (
                  <article
                    key={division.id}
                    className="flex flex-col justify-between rounded-xl border border-white/10 bg-[#111115] p-6 space-y-6"
                  >
                    <div className="space-y-3">
                      <p className="text-xs text-[#8D8D88]">{division.focus}</p>
                      <h3 className="font-display text-xl font-semibold text-[#EDECE8]">
                        {division.role}
                      </h3>
                      <p className="text-sm leading-relaxed text-[#A3A39E]">
                        {division.description}
                      </p>
                    </div>
                    <div className="border-t border-white/10 pt-4 text-xs text-[#D6D5D0]">
                      {division.capabilities.join(' · ')}
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Visión Internacional */}
            <div id="vision" className="border-t border-white/10 pt-16">
              <div className="grid gap-10 lg:grid-cols-12">
                <div className="lg:col-span-5 space-y-4">
                  <p className="text-xs font-medium text-[#E5A93C]">Visión Futura &amp; Expansión</p>
                  <h2 className="font-display text-3xl font-semibold tracking-tight text-[#EDECE8] sm:text-4xl">
                    Abiertos a nuevos espacios, alianzas y mercados internacionales.
                  </h2>
                  <p className="text-sm leading-relaxed text-[#A3A39E]">
                    Nuestra meta trasciende el calendario local. Buscamos socios estratégicos,
                    grupos hoteleros, promotores y marcas culturales para exportar el sello de
                    Caritech Music a nuevas ciudades con propuestas vanguardistas llave en mano.
                  </p>
                </div>

                <div className="lg:col-span-7 grid gap-6 sm:grid-cols-3 lg:pl-6">
                  {VISION_PILLARS.map((pillar) => (
                    <div
                      key={pillar.index}
                      className="rounded-xl border border-white/10 bg-[#111115] p-6 space-y-3"
                    >
                      <p className="font-mono text-sm font-medium text-[#E5A93C] tabular-nums">
                        {pillar.index}
                      </p>
                      <h3 className="font-display text-base font-semibold text-[#EDECE8]">
                        {pillar.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-[#A3A39E]">{pillar.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contacto & Mesa de Alianzas */}
        <section id="contacto" className="mx-auto max-w-[1280px] px-6 py-16 lg:px-10 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-3">
                <p className="text-xs font-medium text-[#E5A93C]">Contacto Comercial &amp; Alianzas</p>
                <h2 className="font-display text-3xl font-semibold tracking-tight text-[#EDECE8] sm:text-4xl">
                  Construyamos la próxima experiencia juntos.
                </h2>
                <p className="text-sm leading-relaxed text-[#A3A39E]">
                  Ya sea para activar una locación singular, contratar talento del roster, producir
                  un evento corporativo o inscribirte en nuestra escuela de DJ y producción,
                  prepara tu solicitud y conversemos directamente.
                </p>
              </div>

              <div className="space-y-4 border-t border-white/10 pt-6 text-sm">
                <div className="flex items-center gap-3 text-[#D6D5D0]">
                  <Mail className="h-4 w-4 shrink-0 text-[#E5A93C]" aria-hidden="true" />
                  <a
                    href="mailto:caritechmusic@gmail.com"
                    className="hover:text-[#E5A93C] transition-colors underline-offset-4 hover:underline"
                  >
                    caritechmusic@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-3 text-[#A3A39E]">
                  <MapPin className="h-4 w-4 shrink-0 text-[#E5A93C]" aria-hidden="true" />
                  <span>Base operativa: Caracas, Venezuela</span>
                </div>
                <div className="flex items-center gap-3 text-[#A3A39E]">
                  <Globe className="h-4 w-4 shrink-0 text-[#E5A93C]" aria-hidden="true" />
                  <span>Disponibilidad: Giras, residencias y coproducciones internacionales</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <AllianceForm selectedPreset={inquiryPreset} presetNote={presetNote} />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-[#08080A] py-10">
        <div className="mx-auto flex max-w-[1280px] flex-col justify-between gap-6 px-6 sm:flex-row sm:items-center lg:px-10">
          <div className="space-y-1">
            <p className="font-display text-base font-semibold text-[#EDECE8]">Caritech Music</p>
            <p className="text-xs text-[#8D8D88]">
              Eventos inmersivos · Bookings · Producción Musical · Fotografía · Escuela DJ
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs text-[#8D8D88]">
            <a href="#trayectoria" className="hover:text-[#EDECE8] transition-colors">
              Trayectoria
            </a>
            <a href="#experiencias" className="hover:text-[#EDECE8] transition-colors">
              Experiencias
            </a>
            <a href="#servicios" className="hover:text-[#EDECE8] transition-colors">
              Servicios
            </a>
            <a href="mailto:caritechmusic@gmail.com" className="hover:text-[#EDECE8] transition-colors">
              caritechmusic@gmail.com
            </a>
            <span className="tabular-nums">© 2019–2026 Caritech Music</span>
          </div>
        </div>
      </footer>

      <ExperienceLightbox
        item={activeLightbox}
        onClose={() => setActiveLightbox(null)}
        onRequestSimilar={(preset, title) => navigateToInquiry(preset, title)}
      />
    </div>
  );
}
