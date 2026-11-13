import heroMeliaHelipad from '../assets/images/hero_melia_helipad_1794599674069.jpg';
import eventJourneySpace from '../assets/images/event_journey_space_1794599673851.jpg';
import studioProductionSession from '../assets/images/studio_production_session_1794599674401.jpg';
import academyDjTurntables from '../assets/images/academy_dj_turntables_1794599674727.jpg';

export type ServiceCategory = 'todos' | 'eventos-bookings' | 'produccion-visuales' | 'academia';

export type InquiryType =
  | 'Alianza / Nuevo Espacio'
  | 'Booking de Talento'
  | 'Producción de Evento'
  | 'Escuela DJ & Producción';

export interface ExperienceItem {
  id: string;
  title: string;
  location: string;
  year: string;
  category: string;
  summary: string;
  impactDetail: string;
  deliverables: string[];
  image: string;
  imageAlt: string;
  aspectClass: string;
  inquiryPreset: InquiryType;
}

export interface TimelineMilestone {
  period: string;
  title: string;
  description: string;
}

export interface ServiceOffering {
  number: string;
  id: string;
  category: Exclude<ServiceCategory, 'todos'>;
  categoryLabel: string;
  title: string;
  lead: string;
  deliverables: string[];
  targetAudience: string;
  inquiryPreset: InquiryType;
}

export interface DivisionProfile {
  id: string;
  role: string;
  focus: string;
  description: string;
  capabilities: string[];
}

export interface VisionPillar {
  index: string;
  title: string;
  description: string;
}

export const HERO_MEDIA = {
  image: heroMeliaHelipad,
  alt: 'Music in the Heights realizado en el helipuerto del Hotel Meliá Caracas al atardecer frente al Ávila',
  caption: 'Music in the Heights · Helipuerto del Hotel Meliá Caracas',
};

export const KEY_METRICS = [
  {
    value: '2019',
    label: 'Año de fundación',
    detail: 'Origen colectivo en Caracas',
  },
  {
    value: '360°',
    label: 'Ecosistema integrado',
    detail: 'Eventos, bookings, estudio y visuales',
  },
  {
    value: '5',
    label: 'Divisiones activas',
    detail: 'DJs, productores, foto y academia',
  },
  {
    value: 'LATAM +',
    label: 'Proyección futura',
    detail: 'Alianzas para nuevos territorios',
  },
];

export const TIMELINE_MILESTONES: TimelineMilestone[] = [
  {
    period: '2019',
    title: 'Origen como colectivo de DJs',
    description:
      'Un grupo de colegas DJs en Caracas une criterio musical, técnica en cabina y visión estética para proponer sesiones electrónicas fuera del circuito convencional.',
  },
  {
    period: '2021 — 2022',
    title: 'Evolución hacia bookings y gestión',
    description:
      'La demanda de curaduría consistente transforma el colectivo en estructura de representación artística, conectando talento con clubes nocturnos y festivales.',
  },
  {
    period: '2023 — 2025',
    title: 'Hitos inmersivos en la capital',
    description:
      'Nacen formatos propios de alto impacto como Music in the Heights en el helipuerto del Hotel Meliá Caracas y Journey to the Space, elevando la puesta en escena nocturna.',
  },
  {
    period: '2026 +',
    title: 'Ecosistema integral y expansión internacional',
    description:
      'Con estudio de producción, equipo fotográfico y escuela de DJ y producción, Caritech Music abre alianzas con venues, promotores y marcas fuera de fronteras.',
  },
];

export const FLAGSHIP_EXPERIENCES: ExperienceItem[] = [
  {
    id: 'music-in-the-heights',
    title: 'Music in the Heights',
    location: 'Helipuerto del Hotel Meliá Caracas',
    year: 'Formato Insignia',
    category: 'Producción en Locación Singular · Sunset & Night',
    summary:
      'Transformación del helipuerto del Hotel Meliá Caracas en un escenario electrónico al aire libre con vista panorámica sobre la ciudad y el Ávila.',
    impactDetail:
      'Demostró que la arquitectura hotelera de gran formato puede albergar propuestas electrónicas de alta exigencia técnica, acústica controlada y hospitalidad curada.',
    deliverables: [
      'Diseño de escenario y sonorización direccional en altura',
      'Curaduría musical progresiva desde el atardecer',
      'Dirección fotográfica y cobertura audiovisual documental',
      'Operación logística, accesos y experiencia VIP',
    ],
    image: heroMeliaHelipad,
    imageAlt: 'Escenario electrónico en el helipuerto del Hotel Meliá Caracas al caer la tarde',
    aspectClass: 'lg:col-span-2 aspect-[16/10]',
    inquiryPreset: 'Producción de Evento',
  },
  {
    id: 'journey-to-the-space',
    title: 'Journey to the Space',
    location: 'Caracas · Formato Inmersivo',
    year: 'Experiencia Conceptual',
    category: 'Dirección Artística & Diseño Lumínico',
    summary:
      'Propuesta inmersiva enfocada en narrativa espacial, arquitectura de haces de luz cálidos y progresión sonora diseñada para envolver al público de principio a fin.',
    impactDetail:
      'Redefinió la expectativa del público capitalino respecto al clubbing, sustituyendo la decoración genérica por atmósfera arquitectónica, sonido envolvente y coherencia visual.',
    deliverables: [
      'Concepto creativo y guion lumínico por actos',
      'Lineup curado con sets extendidos de DJs residentes',
      'Diseño espacial y control atmosférico de sala',
      'Registro fotográfico de alto contraste para prensa y archivo',
    ],
    image: eventJourneySpace,
    imageAlt: 'Instalación lumínica y cabina DJ en espacio arquitectónico durante Journey to the Space',
    aspectClass: 'aspect-[4/3]',
    inquiryPreset: 'Producción de Evento',
  },
  {
    id: 'estudio-produccion',
    title: 'Dirección Sonora & Estudio',
    location: 'Caritech Studio · Caracas',
    year: 'Producción Original',
    category: 'Producción Musical · Mezcla · Sound Design',
    summary:
      'Laboratorio interno donde nuestros productores desarrollan lanzamientos discográficos, ediciones exclusivas para sets y diseño sonoro para marcas y experiencias.',
    impactDetail:
      'Consolida una identidad musical propia: no solo programamos eventos, sino que creamos el catálogo sonoro que distingue a nuestros artistas en cabina.',
    deliverables: [
      'Producción de música electrónica y arreglos híbridos',
      'Mezcla y mastering preparados para sistemas de club',
      'Bandas sonoras a medida para activaciones de marca',
      'Acompañamiento creativo para artistas del roster',
    ],
    image: studioProductionSession,
    imageAlt: 'Productor musical trabajando con sintetizadores analógicos y monitores de estudio',
    aspectClass: 'aspect-[4/3]',
    inquiryPreset: 'Booking de Talento',
  },
  {
    id: 'escuela-dj-produccion',
    title: 'Escuela de DJ y Producción',
    location: 'Programa Formativo Caritech',
    year: 'Formación Continua',
    category: 'Academia Técnica & Mentoría Escénica',
    summary:
      'Formación práctica en equipamiento estándar de club y entornos de producción musical, impartida directamente por DJs y productores activos en la escena.',
    impactDetail:
      'Asegura el relevo generacional de la cultura electrónica con criterio curatorial, dominio técnico real y proyección hacia showcases reales.',
    deliverables: [
      'Técnica de mezcla en reproductores y mixers profesionales',
      'Lectura de pista, construcción de sets y criterio musical',
      'Fundamentos de producción, síntesis y estructura en DAW',
      'Prácticas guiadas y evaluación de desempeño en vivo',
    ],
    image: academyDjTurntables,
    imageAlt: 'Instructor realizando mezcla en consola DJ profesional dentro del estudio de formación',
    aspectClass: 'lg:col-span-2 aspect-[16/10]',
    inquiryPreset: 'Escuela DJ & Producción',
  },
];

export const SERVICE_OFFERINGS: ServiceOffering[] = [
  {
    number: '01.',
    id: 'produccion-eventos',
    category: 'eventos-bookings',
    categoryLabel: 'Eventos & Formatos Propios',
    title: 'Producción de Eventos y Experiencias Inmersivas',
    lead: 'Conceptualización, dirección técnica y ejecución integral de eventos vanguardistas en locaciones singulares, hoteles, azoteas, clubes y festivales.',
    deliverables: [
      'Diseño de concepto, narrativa espacial y experiencia del asistente',
      'Producción técnica de sonido, iluminación arquitectónica y visuales',
      'Activación de venues no convencionales (helipuertos, galerías, terrazas)',
    ],
    targetAudience: 'Hoteles, venues, marcas comerciales y promotores culturales',
    inquiryPreset: 'Producción de Evento',
  },
  {
    number: '02.',
    id: 'bookings-talento',
    category: 'eventos-bookings',
    categoryLabel: 'Management & Curaduría',
    title: 'Bookings y Gestión de Talento',
    lead: 'Representación comercial y programación artística de DJs y proyectos electrónicos para clubes nocturnos, festivales, giras y eventos privados de alto nivel.',
    deliverables: [
      'Curaduría de lineups adaptados al perfil acústico y horario del venue',
      'Gestión contractual, riders técnicos y coordinación logística de artistas',
      'Residencias estratégicas y showcase oficiales bajo el sello Caritech Music',
    ],
    targetAudience: 'Clubes nocturnos, festivales internacionales y agencias de hospitalidad',
    inquiryPreset: 'Booking de Talento',
  },
  {
    number: '03.',
    id: 'produccion-musical',
    category: 'produccion-visuales',
    categoryLabel: 'Audio & Catálogo',
    title: 'Producción Musical y Diseño Sonoro',
    lead: 'Desarrollo de música original, postproducción y curaduría sonora para artistas, lanzamientos independientes, pasarelas y experiencias de marca.',
    deliverables: [
      'Composición, arreglo y producción electrónica en estudio',
      'Mezcla y mastering optimizados para sistemas de sonido de gran formato',
      'Identidad sonora para eventos corporativos, hoteles y campañas visuales',
    ],
    targetAudience: 'Artistas emergentes, sellos, marcas de lujo y productoras audiovisuales',
    inquiryPreset: 'Producción de Evento',
  },
  {
    number: '04.',
    id: 'fotografia-editorial',
    category: 'produccion-visuales',
    categoryLabel: 'Imagen & Archivo',
    title: 'Fotografía y Dirección Visual',
    lead: 'Cobertura documental de alto contraste, retratos de prensa para artistas y arquitectura visual pensada para construir posicionamiento internacional.',
    deliverables: [
      'Cobertura fotográfica nocturna y de festivales con estética editorial',
      'Press kits visuales para DJs, productores y lanzamientos discográficos',
      'Archivo documental y piezas visuales para patrocinadores y venues',
    ],
    targetAudience: 'DJs, festivales, clubes y marcas asociadas a experiencias',
    inquiryPreset: 'Alianza / Nuevo Espacio',
  },
  {
    number: '05.',
    id: 'academia-caritech',
    category: 'academia',
    categoryLabel: 'Formación & Talento',
    title: 'Escuela de DJ y Producción Musical',
    lead: 'Programas presenciales y mentorías personalizadas para dominar el arte de la cabina y la creación musical con estándares profesionales actuales.',
    deliverables: [
      'Módulos de DJing: beatmatching, armonía, phrasing y lectura de pista',
      'Módulos de producción: diseño sonoro, ritmo, arreglo y mezcla',
      'Sesiones prácticas con equipamiento profesional de club y estudio',
    ],
    targetAudience: 'Aspirantes a DJ, productores en formación y artistas buscando perfeccionamiento',
    inquiryPreset: 'Escuela DJ & Producción',
  },
];

export const CREATIVE_DIVISIONS: DivisionProfile[] = [
  {
    id: 'div-djs',
    role: 'Roster de DJs',
    focus: 'Curaduría · Cabina · Touring',
    description:
      'Selectores y performers especializados en narrativa musical de largo aliento para clubes, rooftops, helipuertos y festivales.',
    capabilities: ['House & Melodic', 'Indie Dance & Afro', 'Techno Arquitectónico'],
  },
  {
    id: 'div-producers',
    role: 'Productores Musicales',
    focus: 'Estudio · Catálogo · Sound Design',
    description:
      'Creadores de música original y arquitectos de sonido que dotan al colectivo de identidad propia y servicios profesionales de estudio.',
    capabilities: ['Producción Original', 'Mezcla & Mastering', 'Audio para Marcas'],
  },
  {
    id: 'div-photo',
    role: 'Fotógrafos & Visuales',
    focus: 'Documental · Press Kits · Escena',
    description:
      'Mirada editorial enfocada en capturar la arquitectura de la luz, la energía del público y la presencia escénica sin artificios.',
    capabilities: ['Cobertura Inmersiva', 'Retrato de Artista', 'Dirección de Arte'],
  },
  {
    id: 'div-academy',
    role: 'Cuerpo Docente',
    focus: 'Escuela DJ · Mentoría · Cantera',
    description:
      'Profesionales activos que transmiten oficio real de cabina y estudio, formando la próxima generación de talento electrónico.',
    capabilities: ['Entrenamiento en Cabina', 'Producción en DAW', 'Proyección Escénica'],
  },
];

export const VISION_PILLARS: VisionPillar[] = [
  {
    index: 'A.',
    title: 'Nuevos Espacios & Locaciones Singulares',
    description:
      'Buscamos alianzas con hoteles, centros culturales, terrazas arquitectónicas y clubes dispuestos a transformar sus espacios mediante experiencias sonoras curadas.',
  },
  {
    index: 'B.',
    title: 'Coproducciones y Alianzas de Marca',
    description:
      'Colaboramos con marcas contemporáneas que buscan conectar con audiencias exigentes a través de formatos propios probados y estética documental impecable.',
  },
  {
    index: 'C.',
    title: 'Expansión Internacional',
    description:
      'Proyectamos nuestros showcases, roster de DJs y know-how de producción desde Caracas hacia circuitos clave de Latinoamérica, Norteamérica y Europa.',
  },
];
