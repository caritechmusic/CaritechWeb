import { useEffect, useState } from 'react';
import { ArrowUpRight, Mail, MapPin, Globe } from 'lucide-react';
import {
  CREATIVE_DIVISIONS,
  KEY_METRICS,
  SERVICE_OFFERINGS,
  STUDIO_SPOTLIGHTS,
  TIMELINE_MILESTONES,
  VISION_PILLARS,
  type InquiryType,
  type ServiceCategory,
} from './data/caritechData';
import { Navbar, type AppTab } from './components/Navbar';
import { HeroCarousel } from './components/HeroCarousel';
import { MediaImage } from './components/MediaImage';
import { RealizedEventsSection } from './components/RealizedEventsSection';
import { SetsArchiveSection } from './components/SetsArchiveSection';
import { AllianceForm } from './components/AllianceForm';

const SERVICE_FILTERS: { id: ServiceCategory; label: string }[] = [
  { id: 'todos', label: 'Todos los servicios' },
  { id: 'eventos-bookings', label: 'Eventos y Bookings' },
  { id: 'produccion-visuales', label: 'Estudio y Fotografía' },
  { id: 'academia', label: 'Academia DJ' },
];

const HOME_DIRECTORY: {
  number: string;
  tab: AppTab;
  title: string;
  hint: string;
  featured?: boolean;
}[] = [
  {
    number: '01',
    tab: 'eventos',
    title: 'Eventos Realizados',
    hint: 'Journey to the Space · Music in the Heights',
    featured: true,
  },
  {
    number: '02',
    tab: 'sets',
    title: 'Sets en Vivo',
    hint: 'Archivo audiovisual ordenado por evento',
  },
  {
    number: '03',
    tab: 'trayectoria',
    title: 'Trayectoria',
    hint: 'Evolución desde 2019 en Caracas',
  },
  {
    number: '04',
    tab: 'servicios',
    title: 'Servicios y Productos',
    hint: 'Eventos, bookings, estudio, foto y academia',
  },
  {
    number: '05',
    tab: 'colectivo',
    title: 'Colectivo y Academia',
    hint: 'Disciplinas y formación presencial',
  },
  {
    number: '06',
    tab: 'vision',
    title: 'Visión Internacional',
    hint: 'Nuevos espacios y coproducciones',
  },
  {
    number: '07',
    tab: 'contacto',
    title: 'Contacto y Alianzas',
    hint: 'Propuestas comerciales y bookings',
  },
];

const VALID_TABS: AppTab[] = [
  'inicio',
  'trayectoria',
  'eventos',
  'sets',
  'servicios',
  'colectivo',
  'vision',
  'contacto',
];

function getTabFromHash(): AppTab {
  if (typeof window === 'undefined') return 'inicio';
  const rawHash = window.location.hash.replace(/^#/, '').toLowerCase() as AppTab;
  return VALID_TABS.includes(rawHash) ? rawHash : 'inicio';
}

export default function App() {
  const [activeTab, setActiveTab] = useState<AppTab>(getTabFromHash);
  const [serviceFilter, setServiceFilter] = useState<ServiceCategory>('todos');
  const [inquiryPreset, setInquiryPreset] = useState<InquiryType>('Alianza / Nuevo Espacio');
  const [presetNote, setPresetNote] = useState<string | undefined>(undefined);

  useEffect(() => {
    const onHashChange = () => {
      setActiveTab(getTabFromHash());
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const selectTab = (tab: AppTab) => {
    setActiveTab(tab);
    const targetHash = `#${tab}`;
    if (window.location.hash !== targetHash) {
      window.history.pushState(null, '', targetHash);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToInquiry = (preset: InquiryType, note?: string) => {
    setInquiryPreset(preset);
    setPresetNote(note);
    selectTab('contacto');
  };

  const filteredServices =
    serviceFilter === 'todos'
      ? SERVICE_OFFERINGS
      : SERVICE_OFFERINGS.filter((service) => service.category === serviceFilter);

  return (
    <div className="flex min-h-screen flex-col bg-[#09090B] text-[#F4F4F5]">
      <Navbar
        activeTab={activeTab}
        onSelectTab={selectTab}
        onPrimaryAction={() => navigateToInquiry('Alianza / Nuevo Espacio')}
      />

      <main className="flex-1">
        {/* PESTAÑA: INICIO — Galería deslizante automática + frase + directorio vertical dinámico + contacto */}
        {activeTab === 'inicio' && (
          <section
            aria-label="Inicio"
            className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-[1280px] flex-col justify-center px-6 py-8 lg:px-10 lg:py-10"
          >
            <div className="grid gap-8 lg:grid-cols-12 lg:items-stretch">
              {/* Galería automática principal */}
              <div className="lg:col-span-8">
                <HeroCarousel />
              </div>

              {/* Panel lateral vertical dinámico */}
              <div className="lg:col-span-4 flex flex-col justify-between gap-6">
                <nav
                  aria-label="Explorar secciones de Caritech Music"
                  className="flex flex-col divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-[#141418]"
                >
                  {HOME_DIRECTORY.map((item) => (
                    <button
                      key={item.tab}
                      type="button"
                      onClick={() => selectTab(item.tab)}
                      className={`group relative flex items-center justify-between gap-4 px-5 py-3.5 text-left transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#EF4444] ${
                        item.featured
                          ? 'bg-[#DC2626] text-white hover:bg-[#EF4444]'
                          : 'hover:bg-white/[0.04] text-[#F4F4F5]'
                      }`}
                    >
                      {!item.featured && (
                        <span
                          className="absolute inset-y-0 left-0 w-[3px] bg-[#DC2626] scale-y-0 transition-transform duration-150 origin-center group-hover:scale-y-100"
                          aria-hidden="true"
                        />
                      )}

                      <div className="flex items-baseline gap-3 min-w-0">
                        <span
                          className={`font-mono text-xs tabular-nums shrink-0 ${
                            item.featured
                              ? 'text-white/90'
                              : 'text-[#EF4444] group-hover:text-red-400'
                          }`}
                        >
                          {item.number}
                        </span>
                        <div className="min-w-0">
                          <p className="font-display text-sm font-semibold tracking-tight truncate">
                            {item.title}
                          </p>
                          <p
                            className={`text-[11px] truncate ${
                              item.featured ? 'text-white/80' : 'text-[#A1A1AA]'
                            }`}
                          >
                            {item.hint}
                          </p>
                        </div>
                      </div>

                      <ArrowUpRight
                        className={`h-4 w-4 shrink-0 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                          item.featured
                            ? 'text-white'
                            : 'text-[#8A8A93] group-hover:text-[#EF4444]'
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                  ))}
                </nav>

                {/* Correo y bandera en pequeño */}
                <div className="rounded-xl border border-white/10 bg-[#141418] px-5 py-4 flex flex-col gap-2">
                  <a
                    href="mailto:caritechmusic@gmail.com"
                    className="inline-flex items-center gap-2 text-sm font-medium text-[#F4F4F5] hover:text-[#EF4444] transition-colors duration-150 underline-offset-4 hover:underline"
                  >
                    <Mail className="h-4 w-4 text-[#EF4444] shrink-0" aria-hidden="true" />
                    <span>caritechmusic@gmail.com</span>
                  </a>

                  <div className="inline-flex items-center gap-2" aria-label="Venezuela">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 16"
                      className="h-3.5 w-[21px] shrink-0 rounded-[2px] border border-white/15"
                      role="img"
                      aria-label="Bandera de Venezuela"
                    >
                      <rect width="24" height="5.33" y="0" fill="#FFCC00" />
                      <rect width="24" height="5.34" y="5.33" fill="#00247D" />
                      <rect width="24" height="5.33" y="10.67" fill="#CF142B" />
                      <g fill="#FFFFFF">
                        <circle cx="8.2" cy="9.0" r="0.45" />
                        <circle cx="9.1" cy="7.9" r="0.45" />
                        <circle cx="10.2" cy="7.1" r="0.45" />
                        <circle cx="11.4" cy="6.7" r="0.45" />
                        <circle cx="12.6" cy="6.7" r="0.45" />
                        <circle cx="13.8" cy="7.1" r="0.45" />
                        <circle cx="14.9" cy="7.9" r="0.45" />
                        <circle cx="15.8" cy="9.0" r="0.45" />
                      </g>
                    </svg>
                    <span className="text-xs text-[#A1A1AA]">Caracas, Venezuela</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* PESTAÑA: TRAYECTORIA */}
        {activeTab === 'trayectoria' && (
          <section id="trayectoria" className="mx-auto max-w-[1280px] px-6 py-12 lg:px-10 lg:py-20">
            <div className="mb-12 grid grid-cols-2 gap-6 border-b border-white/10 pb-10 lg:grid-cols-4 lg:gap-8">
              {KEY_METRICS.map((metric) => (
                <div key={metric.label} className="space-y-1">
                  <p className="font-mono text-2xl font-medium tracking-tight text-[#F4F4F5] tabular-nums sm:text-3xl">
                    {metric.value}
                  </p>
                  <p className="text-sm font-medium text-[#D4D4D8]">{metric.label}</p>
                  <p className="text-xs text-[#8A8A93]">{metric.detail}</p>
                </div>
              ))}
            </div>

            <div className="grid gap-8 lg:grid-cols-12 lg:items-end mb-12">
              <div className="lg:col-span-7 space-y-3">
                <p className="text-xs font-medium text-[#EF4444]">Trayectoria desde 2019</p>
                <h1 className="font-display text-3xl font-semibold tracking-tight text-[#F4F4F5] sm:text-4xl">
                  De un grupo de colegas DJs a una plataforma cultural multidisciplinaria.
                </h1>
              </div>
              <div className="lg:col-span-5">
                <p className="text-sm leading-relaxed text-[#A1A1AA]">
                  Cada etapa respondió a una necesidad real de la escena nocturna caraqueña: elevar el
                  estándar técnico de las cabinas, profesionalizar la gestión artística y conquistar
                  espacios arquitectónicos inéditos.
                </p>
              </div>
            </div>

            <div className="grid gap-8 border-t border-b border-white/10 py-10 md:grid-cols-2 lg:grid-cols-4">
              {TIMELINE_MILESTONES.map((milestone) => (
                <article key={milestone.period} className="space-y-3">
                  <p className="font-mono text-sm font-medium text-[#EF4444] tabular-nums">
                    {milestone.period}
                  </p>
                  <h2 className="font-display text-lg font-semibold text-[#F4F4F5]">
                    {milestone.title}
                  </h2>
                  <p className="text-sm leading-relaxed text-[#A1A1AA]">{milestone.description}</p>
                </article>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => selectTab('eventos')}
                className="inline-flex items-center gap-2 rounded-md bg-[#DC2626] px-5 py-3 text-sm font-semibold text-white hover:bg-[#EF4444] transition-colors cursor-pointer"
              >
                <span>Ver Eventos Realizados</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => selectTab('sets')}
                className="inline-flex items-center gap-2 rounded-md border border-white/15 bg-[#141418] px-5 py-3 text-sm font-medium text-[#F4F4F5] hover:border-[#DC2626] transition-colors cursor-pointer"
              >
                <span>Ir al Archivo de Sets</span>
              </button>
            </div>
          </section>
        )}

        {/* PESTAÑA: EVENTOS REALIZADOS */}
        {activeTab === 'eventos' && (
          <RealizedEventsSection onRequestEventProposal={navigateToInquiry} />
        )}

        {/* PESTAÑA: SETS */}
        {activeTab === 'sets' && <SetsArchiveSection />}

        {/* PESTAÑA: PRODUCTOS Y SERVICIOS */}
        {activeTab === 'servicios' && (
          <section id="servicios" className="mx-auto max-w-[1280px] px-6 py-12 lg:px-10 lg:py-20">
            <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end mb-12">
              <div className="max-w-2xl space-y-3">
                <p className="text-xs font-medium text-[#EF4444]">Productos &amp; Servicios</p>
                <h1 className="font-display text-3xl font-semibold tracking-tight text-[#F4F4F5] sm:text-4xl">
                  Soluciones comerciales para clubes, festivales, marcas y artistas.
                </h1>
              </div>

              <div
                role="tablist"
                aria-label="Filtrar servicios de Caritech Music"
                className="flex flex-wrap items-center gap-1.5 rounded-lg border border-white/10 bg-[#141418] p-1"
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
                      className={`rounded-md px-3.5 py-2 text-xs font-medium transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EF4444] ${
                        isSelected
                          ? 'bg-[#DC2626] text-white font-semibold'
                          : 'text-[#A1A1AA] hover:text-[#F4F4F5]'
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
                    <p className="text-xs text-[#A1A1AA]">
                      <span className="font-mono text-[#EF4444] mr-2 tabular-nums">
                        {service.number}
                      </span>
                      {service.categoryLabel}
                    </p>
                    <h2 className="font-display text-xl font-semibold text-[#F4F4F5] sm:text-2xl">
                      {service.title}
                    </h2>
                    <p className="text-sm leading-relaxed text-[#A1A1AA]">{service.lead}</p>
                  </div>

                  <div className="lg:col-span-4 space-y-2.5">
                    <p className="text-xs font-medium text-[#D4D4D8]">Entregables clave</p>
                    <ul className="space-y-2 text-sm text-[#A1A1AA]">
                      {service.deliverables.map((deliverable) => (
                        <li key={deliverable} className="flex items-start gap-2.5">
                          <span
                            className="mt-2 h-1 w-1 shrink-0 bg-[#EF4444]"
                            aria-hidden="true"
                          />
                          <span>{deliverable}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="lg:col-span-3 flex flex-col justify-between gap-4 lg:items-end lg:text-right">
                    <div>
                      <p className="text-xs font-medium text-[#8A8A93]">Orientado a</p>
                      <p className="mt-1 text-sm text-[#D4D4D8]">{service.targetAudience}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => navigateToInquiry(service.inquiryPreset, service.title)}
                      className="inline-flex items-center justify-center gap-2 rounded-md border border-white/15 bg-[#141418] px-4 py-2.5 text-xs font-semibold text-[#F4F4F5] hover:border-[#DC2626] hover:text-[#EF4444] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EF4444]"
                    >
                      <span>Solicitar propuesta</span>
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* PESTAÑA: COLECTIVO & ACADEMIA */}
        {activeTab === 'colectivo' && (
          <section id="colectivo" className="bg-[#0F0F12] py-12 lg:py-20">
            <div className="mx-auto max-w-[1280px] px-6 lg:px-10 space-y-16">
              <div>
                <div className="max-w-2xl space-y-3 mb-12">
                  <p className="text-xs font-medium text-[#EF4444]">Estructura Humana</p>
                  <h1 className="font-display text-3xl font-semibold tracking-tight text-[#F4F4F5] sm:text-4xl">
                    Cuatro disciplinas operando bajo una misma dirección estética.
                  </h1>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                  {CREATIVE_DIVISIONS.map((division) => (
                    <article
                      key={division.id}
                      className="flex flex-col justify-between rounded-xl border border-white/10 bg-[#141418] p-6 space-y-6"
                    >
                      <div className="space-y-3">
                        <p className="text-xs text-[#8A8A93]">{division.focus}</p>
                        <h2 className="font-display text-xl font-semibold text-[#F4F4F5]">
                          {division.role}
                        </h2>
                        <p className="text-sm leading-relaxed text-[#A1A1AA]">
                          {division.description}
                        </p>
                      </div>
                      <div className="border-t border-white/10 pt-4 text-xs text-[#D4D4D8]">
                        {division.capabilities.join(' · ')}
                      </div>
                    </article>
                  ))}
                </div>

                <div className="mt-10 grid gap-6 lg:grid-cols-2">
                  {STUDIO_SPOTLIGHTS.map((spotlight) => (
                    <article
                      key={spotlight.id}
                      className="grid overflow-hidden rounded-xl border border-white/10 bg-[#141418] sm:grid-cols-12"
                    >
                      <div className="sm:col-span-5 aspect-[4/3] sm:aspect-auto">
                        <MediaImage
                          src={spotlight.image}
                          alt={spotlight.imageAlt}
                          title={spotlight.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="sm:col-span-7 flex flex-col justify-between gap-5 p-6">
                        <div className="space-y-2">
                          <p className="text-xs font-medium text-[#EF4444]">{spotlight.kicker}</p>
                          <h2 className="font-display text-xl font-semibold text-[#F4F4F5]">
                            {spotlight.title}
                          </h2>
                          <p className="text-sm leading-relaxed text-[#A1A1AA]">
                            {spotlight.description}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => navigateToInquiry(spotlight.inquiryPreset, spotlight.title)}
                          className="inline-flex w-fit items-center gap-1.5 text-xs font-semibold text-[#F4F4F5] hover:text-[#EF4444] transition-colors cursor-pointer"
                        >
                          <span>Consultar disponibilidad</span>
                          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* PESTAÑA: VISIÓN FUTURA */}
        {activeTab === 'vision' && (
          <section id="vision" className="bg-[#0F0F12] py-12 lg:py-24">
            <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
              <div className="grid gap-10 lg:grid-cols-12">
                <div className="lg:col-span-5 space-y-5">
                  <p className="text-xs font-medium text-[#EF4444]">Visión Futura &amp; Expansión</p>
                  <h1 className="font-display text-3xl font-semibold tracking-tight text-[#F4F4F5] sm:text-4xl">
                    Abiertos a nuevos espacios, alianzas y mercados internacionales.
                  </h1>
                  <p className="text-sm leading-relaxed text-[#A1A1AA]">
                    Nuestra meta trasciende el calendario local. Buscamos socios estratégicos,
                    grupos hoteleros, promotores y marcas culturales para exportar el sello de
                    Caritech Music a nuevas ciudades con propuestas vanguardistas llave en mano.
                  </p>
                  <button
                    type="button"
                    onClick={() =>
                      navigateToInquiry('Alianza / Nuevo Espacio', 'Propuesta de Expansión / Alianza')
                    }
                    className="inline-flex items-center gap-2 rounded-md bg-[#DC2626] px-5 py-3 text-sm font-semibold text-white hover:bg-[#EF4444] transition-colors cursor-pointer"
                  >
                    <span>Proponer una alianza</span>
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>

                <div className="lg:col-span-7 grid gap-6 sm:grid-cols-3 lg:pl-6">
                  {VISION_PILLARS.map((pillar) => (
                    <div
                      key={pillar.index}
                      className="rounded-xl border border-white/10 bg-[#141418] p-6 space-y-3"
                    >
                      <p className="font-mono text-sm font-medium text-[#EF4444] tabular-nums">
                        {pillar.index}
                      </p>
                      <h2 className="font-display text-base font-semibold text-[#F4F4F5]">
                        {pillar.title}
                      </h2>
                      <p className="text-sm leading-relaxed text-[#A1A1AA]">{pillar.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* PESTAÑA: CONTACTO & ALIANZAS */}
        {activeTab === 'contacto' && (
          <section id="contacto" className="mx-auto max-w-[1280px] px-6 py-12 lg:px-10 lg:py-20">
            <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
              <div className="lg:col-span-5 space-y-8">
                <div className="space-y-3">
                  <p className="text-xs font-medium text-[#EF4444]">Contacto Comercial &amp; Alianzas</p>
                  <h1 className="font-display text-3xl font-semibold tracking-tight text-[#F4F4F5] sm:text-4xl">
                    Construyamos la próxima experiencia juntos.
                  </h1>
                  <p className="text-sm leading-relaxed text-[#A1A1AA]">
                    Ya sea para activar una locación singular, contratar talento del roster, producir
                    un evento corporativo o inscribirte en nuestra escuela de DJ y producción,
                    prepara tu solicitud y conversemos directamente.
                  </p>
                </div>

                <div className="space-y-4 border-t border-white/10 pt-6 text-sm">
                  <div className="flex items-center gap-3 text-[#D4D4D8]">
                    <Mail className="h-4 w-4 shrink-0 text-[#EF4444]" aria-hidden="true" />
                    <a
                      href="mailto:caritechmusic@gmail.com"
                      className="hover:text-[#EF4444] transition-colors underline-offset-4 hover:underline"
                    >
                      caritechmusic@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center gap-3 text-[#A1A1AA]">
                    <MapPin className="h-4 w-4 shrink-0 text-[#EF4444]" aria-hidden="true" />
                    <span>Base operativa: Caracas, Venezuela</span>
                  </div>
                  <div className="flex items-center gap-3 text-[#A1A1AA]">
                    <Globe className="h-4 w-4 shrink-0 text-[#EF4444]" aria-hidden="true" />
                    <span>Disponibilidad: Giras, residencias y coproducciones internacionales</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7">
                <AllianceForm selectedPreset={inquiryPreset} presetNote={presetNote} />
              </div>
            </div>
          </section>
        )}
      </main>

      <footer className="border-t border-white/10 bg-[#09090B] py-8">
        <div className="mx-auto flex max-w-[1280px] flex-col justify-between gap-6 px-6 sm:flex-row sm:items-center lg:px-10">
          <div className="flex items-center gap-3.5">
            <img
              src="/assets/aistudio/Logo_Caritech-01_4a9a2bb2.png"
              alt="Logo Caritech Music"
              className="h-10 w-10 shrink-0 object-contain mix-blend-screen"
            />
            <div className="space-y-1">
              <p className="font-display text-base font-semibold text-[#F4F4F5]">Caritech Music</p>
              <p className="text-xs text-[#8A8A93]">
                Eventos inmersivos · Bookings · Producción Musical · Fotografía · Escuela DJ
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-5 text-xs text-[#8A8A93]">
            <button
              type="button"
              onClick={() => selectTab('inicio')}
              className="hover:text-[#F4F4F5] transition-colors cursor-pointer"
            >
              Inicio
            </button>
            <button
              type="button"
              onClick={() => selectTab('eventos')}
              className="hover:text-[#F4F4F5] transition-colors cursor-pointer"
            >
              Eventos
            </button>
            <button
              type="button"
              onClick={() => selectTab('sets')}
              className="hover:text-[#F4F4F5] transition-colors cursor-pointer"
            >
              Sets
            </button>
            <button
              type="button"
              onClick={() => selectTab('servicios')}
              className="hover:text-[#F4F4F5] transition-colors cursor-pointer"
            >
              Servicios
            </button>
            <a href="mailto:caritechmusic@gmail.com" className="hover:text-[#F4F4F5] transition-colors">
              caritechmusic@gmail.com
            </a>
            <span className="tabular-nums">© 2019–2026 Caritech Music</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
