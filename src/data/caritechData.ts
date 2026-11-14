export type ServiceCategory = 'todos' | 'eventos-bookings' | 'produccion-visuales';

export type InquiryType =
  | 'Alianza / Nuevo Espacio'
  | 'Booking de Talento'
  | 'Producción de Evento'
  | 'Escuela DJ & Producción';

export interface EventPhoto {
  id: string;
  src: string;
  alt: string;
  caption: string;
  credit: string;
}

export interface EventAudiovisualLink {
  id: string;
  kind: 'aftermovie' | 'set';
  title: string;
  artistOrDirector: string;
  platform: string;
  duration: string;
  styleOrFormat: string;
  description: string;
  /** Reemplazar con enlace real de YouTube, SoundCloud o Mixcloud cuando esté publicado */
  externalUrl?: string;
}

export interface RealizedEvent {
  id: string;
  indexLabel: string;
  title: string;
  date: string;
  location: string;
  formatTag: string;
  logo?: string;
  logoAlt?: string;
  description: string;
  productionHighlights: string[];
  audiovisualLinks: EventAudiovisualLink[];
  gallery: EventPhoto[];
  galleryAspectClass?: string;
  inquiryPreset: InquiryType;
}

export interface StudioSpotlight {
  id: string;
  kicker: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
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

export interface HeroSlide {
  id: string;
  image: string;
  alt: string;
  caption: string;
  objectPosition?: string;
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-melia-team',
    image: '/assets/aistudio/IMG_2629_359cacd2.jpg',
    alt: 'DJs de Caritech Music en el helipuerto del Hotel Meliá Caracas con el Ávila de fondo',
    caption: 'Music in the Heights · Helipuerto del Hotel Meliá Caracas',
    objectPosition: 'object-[50%_26%]',
  },
  {
    id: 'slide-melia-bts-group',
    image: '/assets/aistudio/WhatsApp_Image_2021-08-07_at_4.46.50_PM_657a1545.jpeg',
    alt: 'Equipo completo de DJs, fotografía y producción en el helipuerto de Caracas',
    caption: 'Backstage & Dirección Visual · Hotel Meliá Caracas',
    objectPosition: 'object-[50%_28%]',
  },
  {
    id: 'slide-caracas-skyline',
    image: '/assets/aistudio/IMG_2323_0ab1da04.jpg',
    alt: 'Vista panorámica de Caracas y el Ávila desde las alturas del helipuerto',
    caption: 'Horizonte de Caracas · Sesiones de día y atardecer',
    objectPosition: 'object-center',
  },
];

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
    value: '4',
    label: 'Líneas de servicio',
    detail: 'Eventos, bookings, estudio y foto',
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
    period: '2020 · Pandemia',
    title: 'Journey to the Space',
    description:
      'De agosto a noviembre nace este viaje sonoro digital para disfrutar sesiones electrónicas desde casa, reuniendo a 6 DJs nacionales invitados en formato audiovisual.',
  },
  {
    period: '2021 — 2024',
    title: 'Eventos, bookings y locaciones singulares',
    description:
      'El proyecto muta hacia gestión de talento para clubes y festivales, además de producciones presenciales emblemáticas como Music in the Heights en el helipuerto del Hotel Meliá Caracas.',
  },
  {
    period: '2025 — 2026+',
    title: 'Ecosistema 360° y expansión internacional',
    description:
      'Con DJs, productores musicales y fotógrafos, Caritech Music impulsa alianzas para llevar propuestas vanguardistas a nuevos mercados.',
  },
];

export const REALIZED_EVENTS: RealizedEvent[] = [
  {
    id: 'journey-to-the-space',
    indexLabel: '01.',
    title: 'Journey to the Space',
    date: 'Agosto — Noviembre · Edición Pandemia',
    location: 'Sesiones desde casa · Venezuela',
    formatTag: 'Ciclo Audiovisual · 6 DJs Nacionales Invitados',
    logo: '/assets/aistudio/logospacetothejourney2_424c2a0a.jpg',
    logoAlt: 'Logo oficial del evento Journey to the Space',
    galleryAspectClass: 'aspect-[3/4]',
    description:
      'Journey to the Space fue el viaje sonoro programado durante la pandemia, entre agosto y noviembre, para poder disfrutar de sesiones electrónicas desde casa. El ciclo reunió sets grabados con la participación de seis DJs nacionales invitados: Brakick, Fat Daddy, Macht Holder, Rafael Ortega, Yosmardreadful y Enyer Bernaez.',
    productionHighlights: [
      'Temporada continua de agosto a noviembre con estrenos de sets nacionales',
      'Lineup curado de 6 DJs invitados: Brakick, Fat Daddy, Macht Holder, Rafael Ortega, Yosmardreadful y Enyer Bernaez',
      'Formato audiovisual pensado para conectar la cultura electrónica desde casa',
    ],
    audiovisualLinks: [
      {
        id: 'jtts-brakick',
        kind: 'set',
        title: 'Journey to the Space — Brakick',
        artistOrDirector: 'Brakick',
        platform: 'YouTube · Set Invitado',
        duration: 'Sesión Completa',
        styleOrFormat: 'Set 01 / 06',
        description:
          'Sesión electrónica de Brakick dentro del ciclo Journey to the Space, grabada para disfrutar desde casa durante la temporada de pandemia.',
        externalUrl: 'https://www.youtube.com/watch?v=g-fKkOPPQPc&t=2701s',
      },
      {
        id: 'jtts-fat-daddy',
        kind: 'set',
        title: 'Journey to the Space — Fat Daddy',
        artistOrDirector: 'Fat Daddy',
        platform: 'YouTube · Set Invitado',
        duration: 'Sesión Completa',
        styleOrFormat: 'Set 02 / 06',
        description:
          'Participación de Fat Daddy en el viaje sonoro de agosto a noviembre con curaduría electrónica especial de estudio.',
        externalUrl: 'https://www.youtube.com/watch?v=gdvkCIKS9fc&t=901s',
      },
      {
        id: 'jtts-macht-holder',
        kind: 'set',
        title: 'Journey to the Space — Macht Holder',
        artistOrDirector: 'Macht Holder',
        platform: 'YouTube · Set Invitado',
        duration: 'Sesión Completa',
        styleOrFormat: 'Set 03 / 06',
        description:
          'Entrega audiovisual de Macht Holder formando parte de la programación oficial de seis DJs nacionales.',
        externalUrl: 'https://www.youtube.com/watch?v=2VRbe2jmb7c&t=559s',
      },
      {
        id: 'jtts-rafael-ortega',
        kind: 'set',
        title: 'Journey to the Space — Rafael Ortega',
        artistOrDirector: 'Rafael Ortega',
        platform: 'YouTube · Set Invitado',
        duration: 'Sesión Completa',
        styleOrFormat: 'Set 04 / 06',
        description:
          'Set electrónico de Rafael Ortega estrenado en el ciclo Journey to the Space entre agosto y noviembre.',
        externalUrl: 'https://www.youtube.com/watch?v=OwMgDwPu_XU&t=269s',
      },
      {
        id: 'jtts-yosmardreadful',
        kind: 'set',
        title: 'Journey to the Space — Yosmardreadful',
        artistOrDirector: 'Yosmardreadful',
        platform: 'YouTube · Set Invitado',
        duration: 'Sesión Completa',
        styleOrFormat: 'Set 05 / 06',
        description:
          'Sesión de Yosmardreadful dentro del archivo oficial de Journey to the Space en YouTube.',
        externalUrl: 'https://www.youtube.com/watch?v=e7Aq_mUEN4E',
      },
      {
        id: 'jtts-enyer-bernaez',
        kind: 'set',
        title: 'Journey to the Space — Enyer Bernaez',
        artistOrDirector: 'Enyer Bernaez',
        platform: 'YouTube · Set Invitado',
        duration: 'Sesión Completa',
        styleOrFormat: 'Set 06 / 06',
        description:
          'Set de Enyer Bernaez cerrando el bloque de seis DJs nacionales invitados en Journey to the Space.',
        externalUrl: 'https://www.youtube.com/watch?v=GtZ0DjxvGf0&t=952s',
      },
    ],
    gallery: [
      {
        id: 'jtts-flyer-brakick',
        src: '/assets/aistudio/Instagram_history_flyer_brakick_1_9ebe8dcf.png',
        alt: 'Flyer oficial de Brakick en Journey to the Space presentado por Caritech Music',
        caption: 'Brakick — Sesión invitada en Journey to the Space.',
        credit: 'Flyer Oficial · Caritech Music',
      },
      {
        id: 'jtts-flyer-fat-daddy',
        src: '/assets/aistudio/Fat_Insta_History_f2294c06.png',
        alt: 'Flyer oficial de Fat Daddy en Journey to the Space presentado por Caritech Music',
        caption: 'Fat Daddy — Sesión invitada en Journey to the Space.',
        credit: 'Flyer Oficial · Caritech Music',
      },
      {
        id: 'jtts-flyer-macht-holder',
        src: '/assets/aistudio/MachtHolderInstagramHistory_1952aba1.jpg',
        alt: 'Flyer oficial de Macht Holder en Journey to the Space Streaming 10PM',
        caption: 'Macht Holder — Streaming a las 10PM en Journey to the Space.',
        credit: 'Flyer Oficial · Caritech Music',
      },
      {
        id: 'jtts-flyer-rafael-ortega',
        src: '/assets/aistudio/Instagram_History_04a34cee.png',
        alt: 'Flyer oficial de Rafael Ortega en Journey to the Space Streaming 10PM',
        caption: 'Rafael Ortega — Streaming a las 10PM en Journey to the Space.',
        credit: 'Flyer Oficial · Caritech Music',
      },
      {
        id: 'jtts-flyer-yosmar',
        src: '/assets/aistudio/Instagram_history_flyer_yosmar_a07038f4.png',
        alt: 'Flyer oficial de Yosmardreadful Guest DJ en Journey to the Space',
        caption: 'Yosmardreadful — Guest DJ en Journey to the Space.',
        credit: 'Flyer Oficial · Caritech Music',
      },
      {
        id: 'jtts-flyer-enyer',
        src: '/assets/aistudio/Instagram_history_flyer_43bfc42b.png',
        alt: 'Flyer oficial de Enyer Bernaez Guest DJ en Journey to the Space',
        caption: 'Enyer Bernaez — Guest DJ en Journey to the Space.',
        credit: 'Flyer Oficial · Caritech Music',
      },
    ],
    inquiryPreset: 'Producción de Evento',
  },
  {
    id: 'music-in-the-heights',
    indexLabel: '02.',
    title: 'Music in the Heights',
    date: '1.ª y 2.ª Edición · +8 horas',
    location: 'Helipuerto del Hotel Meliá Caracas',
    formatTag: 'Evento Privado en Altura · Día Soleado & Atardecer',
    logo: '/assets/aistudio/image_ebd28c0c.png',
    logoAlt: 'Portada oficial de Music in the Heights — Live Sets en el Hotel Meliá Caracas',
    galleryAspectClass: 'aspect-square',
    description:
      'Evento privado realizado en los espacios del helipuerto del Hotel Meliá Caracas, donde se musicalizó por más de 8 horas continuas. Desde las alturas de la capital se pudo apreciar el día soleado y su transición hacia el atardecer frente al Ávila tanto en su primera como en su segunda edición.',
    productionHighlights: [
      'Más de 8 horas continuas de musicalización en vivo desde las alturas',
      'Edición I (Fat Daddy, Brakick, De la Trinidad, Macht Holder) y Edición II (Brakick B2B Fat Daddy, Macht Holder)',
      'Curaduría sonora diseñada para acompañar el día soleado y el atardecer caraqueño',
    ],
    audiovisualLinks: [
      {
        id: 'mith-aftermovie',
        kind: 'aftermovie',
        title: 'Aftermovie Oficial — Music in the Heights',
        artistOrDirector: 'Aftermovie Oficial · Caritech Music',
        platform: 'Instagram TV',
        duration: 'Video Resumen',
        styleOrFormat: 'Edición Helipuerto Meliá',
        description:
          'Resumen audiovisual oficial de la experiencia en el helipuerto del Hotel Meliá Caracas entre música electrónica, el día soleado y el atardecer frente al Ávila.',
        externalUrl: 'https://www.instagram.com/tv/CZzpvRgDJ0K/?srtk=Mjd6eXJ2bWRxbzY=',
      },
      {
        id: 'mith-1-fat-daddy',
        kind: 'set',
        title: 'Music in the Heights I — Fat Daddy',
        artistOrDirector: 'Fat Daddy',
        platform: 'YouTube · Helipuerto Meliá',
        duration: 'Set en Vivo',
        styleOrFormat: 'Edición I',
        description:
          'Sesión en vivo de Fat Daddy grabada en las alturas del helipuerto del Hotel Meliá Caracas durante la primera edición.',
        externalUrl: 'https://www.youtube.com/watch?v=B_CM8HH-BVk&t=171s',
      },
      {
        id: 'mith-1-brakick',
        kind: 'set',
        title: 'Music in the Heights I — Brakick',
        artistOrDirector: 'Brakick',
        platform: 'YouTube · Helipuerto Meliá',
        duration: 'Set en Vivo',
        styleOrFormat: 'Edición I',
        description:
          'Set de Brakick desde el helipuerto del Hotel Meliá Caracas acompañando la jornada al aire libre.',
        externalUrl: 'https://www.youtube.com/watch?v=Ba9Lt1hsdr8&t=275s',
      },
      {
        id: 'mith-1-de-la-trinidad',
        kind: 'set',
        title: 'Music in the Heights I — De la Trinidad',
        artistOrDirector: 'De la Trinidad',
        platform: 'YouTube · Helipuerto Meliá',
        duration: 'Set en Vivo',
        styleOrFormat: 'Edición I',
        description:
          'Participación de De la Trinidad en la primera edición de Music in the Heights sobre la ciudad de Caracas.',
        externalUrl: 'https://www.youtube.com/watch?v=_FBiqLP3Nxg&t=2625s&pp=0gcJCccHAYcqIYzv',
      },
      {
        id: 'mith-1-macht-holder',
        kind: 'set',
        title: 'Music in the Heights I — Macht Holder',
        artistOrDirector: 'Macht Holder',
        platform: 'YouTube · Helipuerto Meliá',
        duration: 'Set en Vivo',
        styleOrFormat: 'Edición I',
        description:
          'Sesión de Macht Holder grabada en el helipuerto del Hotel Meliá Caracas en la primera edición.',
        externalUrl: 'https://www.youtube.com/watch?v=h7Y9KekfpxY&pp=0gcJCccHAYcqIYzv',
      },
      {
        id: 'mith-2-brakick-b2b-fat-daddy',
        kind: 'set',
        title: 'Music in the Heights II — Brakick B2B Fat Daddy',
        artistOrDirector: 'Brakick B2B Fat Daddy',
        platform: 'YouTube · Helipuerto Meliá',
        duration: 'Set B2B en Vivo',
        styleOrFormat: 'Edición II',
        description:
          'Set especial Back-to-Back entre Brakick y Fat Daddy durante la segunda edición de Music in the Heights.',
        externalUrl: 'https://www.youtube.com/watch?v=MutI-1imrwI&t=1752s',
      },
      {
        id: 'mith-2-macht-holder',
        kind: 'set',
        title: 'Music in the Heights II — Macht Holder',
        artistOrDirector: 'Macht Holder',
        platform: 'YouTube · Helipuerto Meliá',
        duration: 'Set en Vivo',
        styleOrFormat: 'Edición II',
        description:
          'Set de Macht Holder en la segunda edición de Music in the Heights frente al Ávila.',
        externalUrl: 'https://www.youtube.com/watch?v=7-NZzSCrfFI&t=1s',
      },
    ],
    gallery: [
      {
        id: 'mith-photo-1',
        src: '/assets/aistudio/image_ebd28c0c.png',
        alt: 'Portada oficial de Music in the Heights Live Sets con los cuatro DJs en el helipuerto',
        caption: 'Portada oficial Music in the Heights — Live Sets (Caritech × Meliá × Trainer 360).',
        credit: 'Arte Oficial · Caritech Music',
      },
      {
        id: 'mith-photo-2',
        src: '/assets/aistudio/IMG_2629_359cacd2.jpg',
        alt: 'Brakick, Macht Holder, De la Trinidad y Fat Daddy en el helipuerto del Hotel Meliá Caracas',
        caption: 'Los cuatro artistas en el helipuerto del Hotel Meliá Caracas con el Ávila de fondo.',
        credit: 'Foto: Archivo Caritech Music',
      },
      {
        id: 'mith-photo-3',
        src: '/assets/aistudio/IMG_2323_0ab1da04.jpg',
        alt: 'Vista panorámica de Caracas y el Ávila desde el helipuerto del Hotel Meliá',
        caption: 'Panorámica de Caracas desde las alturas del helipuerto durante la jornada.',
        credit: 'Foto: Archivo Caritech Music',
      },
      {
        id: 'mith-photo-4',
        src: '/assets/aistudio/image_e24b447c.png',
        alt: 'Flyer del Live Set de Fat Daddy en Music in the Heights disponible en YouTube',
        caption: 'Fat Daddy — Live Set en el helipuerto del Hotel Meliá Caracas.',
        credit: 'Arte Oficial · Caritech Music',
      },
      {
        id: 'mith-photo-5',
        src: '/assets/aistudio/image_3a137dbf.png',
        alt: 'Flyer del Live Set de Brakick en Music in the Heights disponible en YouTube',
        caption: 'Brakick — Live Set en el helipuerto del Hotel Meliá Caracas.',
        credit: 'Arte Oficial · Caritech Music',
      },
      {
        id: 'mith-photo-6',
        src: '/assets/aistudio/image_ef649bbd.png',
        alt: 'Flyer del Live Set de De la Trinidad en Music in the Heights disponible en YouTube',
        caption: 'De la Trinidad — Live Set en el helipuerto del Hotel Meliá Caracas.',
        credit: 'Arte Oficial · Caritech Music',
      },
      {
        id: 'mith-photo-7',
        src: '/assets/aistudio/image_f50e5fcf.png',
        alt: 'Flyer del Live Set de Macht Holder en Music in the Heights disponible en YouTube',
        caption: 'Macht Holder — Live Set en el helipuerto del Hotel Meliá Caracas.',
        credit: 'Arte Oficial · Caritech Music',
      },
      {
        id: 'mith-photo-8',
        src: '/assets/aistudio/WhatsApp_Image_2021-08-07_at_4.46.33_PM__2__864a0cd7.jpeg',
        alt: 'Detrás de cámaras con cámara y aro de luz fotografiando a Brakick en cabina',
        caption: 'Detrás de cámaras: dirección fotográfica y grabación en vivo sobre el helipuerto.',
        credit: 'BTS: Equipo Caritech Music',
      },
      {
        id: 'mith-photo-9',
        src: '/assets/aistudio/WhatsApp_Image_2021-08-07_at_4.46.50_PM_657a1545.jpeg',
        alt: 'Equipo completo de DJs, producción y fotografía reunido tras la cabina en el helipuerto',
        caption: 'Equipo de DJs, fotografía y producción reunido en el helipuerto del Meliá.',
        credit: 'BTS: Equipo Caritech Music',
      },
    ],
    inquiryPreset: 'Producción de Evento',
  },
];

export const STUDIO_SPOTLIGHTS: StudioSpotlight[] = [
  {
    id: 'estudio-produccion',
    kicker: 'Estudio & Dirección Sonora',
    title: 'Producción musical y catálogo propio',
    description:
      'Nuestro equipo de productores trabaja en estudio en composiciones originales, mezcla, mastering y diseño sonoro para artistas, lanzamientos discográficos y activaciones de marca.',
    image: '/assets/aistudio/image_5eba940a.png',
    imageAlt: 'Estudio de producción musical de Caritech Music con FL Studio, monitores, teclado MIDI y micrófono',
    inquiryPreset: 'Booking de Talento',
  },
  {
    id: 'escuela-dj-produccion',
    kicker: 'Academia Caritech',
    title: 'Escuela de DJ y Producción Musical',
    description:
      'Entrenamiento presencial práctico en equipamiento profesional de club y estaciones de producción digital, guiado por DJs y productores activos en la escena.',
    image: '/assets/aistudio/image_540df62e.png',
    imageAlt: 'Controladora Pioneer DJ con Rekordbox y monitores de estudio para entrenamiento presencial',
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
