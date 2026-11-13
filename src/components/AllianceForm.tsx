import { useEffect, useState, type FormEvent } from 'react';
import { Check, Copy, Mail, ArrowRight } from 'lucide-react';
import { InquiryType } from '../data/caritechData';

const INQUIRY_OPTIONS: InquiryType[] = [
  'Alianza / Nuevo Espacio',
  'Booking de Talento',
  'Producción de Evento',
  'Escuela DJ & Producción',
];

interface AllianceFormProps {
  selectedPreset: InquiryType;
  presetNote?: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  location?: string;
  message?: string;
}

export function AllianceForm({ selectedPreset, presetNote }: AllianceFormProps) {
  const [inquiryType, setInquiryType] = useState<InquiryType>(selectedPreset);
  const [name, setName] = useState('');
  const [organization, setOrganization] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [submittedBrief, setSubmittedBrief] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setInquiryType(selectedPreset);
    if (presetNote) {
      setMessage((prev) =>
        prev.trim().length === 0
          ? `Interés en explorar una propuesta vinculada a: ${presetNote}.`
          : prev
      );
    }
  }, [selectedPreset, presetNote]);

  const validate = (): boolean => {
    const nextErrors: FormErrors = {};
    if (name.trim().length < 2) {
      nextErrors.name = 'Ingresa tu nombre completo o persona de contacto.';
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.trim())) {
      nextErrors.email = 'Ingresa un correo electrónico válido.';
    }
    if (location.trim().length < 2) {
      nextErrors.location = 'Indica la ciudad o país del proyecto.';
    }
    if (message.trim().length < 15) {
      nextErrors.message = 'Describe brevemente el espacio, fecha o alcance (mínimo 15 caracteres).';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const buildBriefText = () => {
    return [
      `Tipo de solicitud: ${inquiryType}`,
      `Contacto: ${name.trim()}`,
      organization.trim() ? `Marca / Venue / Club: ${organization.trim()}` : null,
      `Correo: ${email.trim()}`,
      `Ciudad / País: ${location.trim()}`,
      `Detalle de la propuesta:\n${message.trim()}`,
    ]
      .filter(Boolean)
      .join('\n');
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!validate()) return;
    setSubmittedBrief(buildBriefText());
    setCopied(false);
  };

  const handleCopyBrief = async () => {
    if (!submittedBrief) return;
    try {
      await navigator.clipboard.writeText(submittedBrief);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  const mailtoHref = submittedBrief
    ? `mailto:caritechmusic@gmail.com?subject=${encodeURIComponent(
        `Caritech Music · ${inquiryType}${organization ? ` — ${organization}` : ''}`
      )}&body=${encodeURIComponent(submittedBrief)}`
    : 'mailto:caritechmusic@gmail.com';

  if (submittedBrief) {
    return (
      <div className="rounded-xl border border-white/15 bg-[#111115] p-6 sm:p-8 space-y-6">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#E5A93C] text-[#08080A]">
            <Check className="h-4 w-4" aria-hidden="true" />
          </div>
          <div>
            <h3 className="font-display text-xl font-semibold text-[#EDECE8]">
              Resumen de propuesta preparado
            </h3>
            <p className="mt-1 text-sm text-[#A3A39E]">
              Tu ficha estructurada está lista para enviar directamente al equipo de Caritech Music.
            </p>
          </div>
        </div>

        <pre className="whitespace-pre-wrap rounded-lg border border-white/10 bg-[#08080A] p-4 font-mono text-xs leading-relaxed text-[#D6D5D0]">
          {submittedBrief}
        </pre>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href={mailtoHref}
            className="inline-flex items-center justify-center gap-2 rounded-md bg-[#E5A93C] px-5 py-2.5 text-sm font-semibold text-[#08080A] hover:bg-[#EEB955] transition-colors duration-150 whitespace-nowrap"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            <span>Enviar por correo</span>
          </a>

          <button
            type="button"
            onClick={handleCopyBrief}
            className="inline-flex items-center justify-center gap-2 rounded-md border border-white/15 bg-transparent px-4 py-2.5 text-sm font-medium text-[#EDECE8] hover:bg-white/5 transition-colors duration-150 whitespace-nowrap cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-[#E5A93C]" aria-hidden="true" />
                <span>Copiado al portapapeles</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" aria-hidden="true" />
                <span>Copiar resumen</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => setSubmittedBrief(null)}
            className="ml-auto text-sm font-medium text-[#A3A39E] hover:text-[#EDECE8] underline-offset-4 hover:underline cursor-pointer"
          >
            Editar solicitud
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-xl border border-white/15 bg-[#111115] p-6 sm:p-8 space-y-6"
    >
      <div>
        <span className="block text-xs font-medium text-[#A3A39E] mb-3">
          Área de interés
        </span>
        <div className="flex flex-wrap gap-2">
          {INQUIRY_OPTIONS.map((option) => {
            const active = inquiryType === option;
            return (
              <button
                key={option}
                type="button"
                onClick={() => setInquiryType(option)}
                className={`rounded-md px-3.5 py-2 text-xs font-medium transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5A93C] ${
                  active
                    ? 'bg-[#E5A93C] text-[#08080A] font-semibold'
                    : 'border border-white/10 bg-[#0A0A0D] text-[#B8B7B2] hover:border-white/25 hover:text-[#EDECE8]'
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="block text-xs font-medium text-[#D6D5D0] mb-1.5">
            Nombre completo
          </label>
          <input
            id="contact-name"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
            }}
            placeholder="Ej. Andrés Mendoza"
            aria-invalid={Boolean(errors.name)}
            className="w-full rounded-md border border-white/15 bg-[#08080A] px-3.5 py-2.5 text-sm text-[#EDECE8] placeholder:text-[#666662] focus:border-[#E5A93C] focus:outline-none"
          />
          {errors.name && <p className="mt-1.5 text-xs text-amber-400">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="contact-org" className="block text-xs font-medium text-[#D6D5D0] mb-1.5">
            Venue, club, marca o proyecto
          </label>
          <input
            id="contact-org"
            type="text"
            value={organization}
            onChange={(e) => setOrganization(e.target.value)}
            placeholder="Opcional"
            className="w-full rounded-md border border-white/15 bg-[#08080A] px-3.5 py-2.5 text-sm text-[#EDECE8] placeholder:text-[#666662] focus:border-[#E5A93C] focus:outline-none"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-email" className="block text-xs font-medium text-[#D6D5D0] mb-1.5">
            Correo electrónico
          </label>
          <input
            id="contact-email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
            }}
            placeholder="nombre@empresa.com"
            aria-invalid={Boolean(errors.email)}
            className="w-full rounded-md border border-white/15 bg-[#08080A] px-3.5 py-2.5 text-sm text-[#EDECE8] placeholder:text-[#666662] focus:border-[#E5A93C] focus:outline-none"
          />
          {errors.email && <p className="mt-1.5 text-xs text-amber-400">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="contact-location" className="block text-xs font-medium text-[#D6D5D0] mb-1.5">
            Ciudad y país
          </label>
          <input
            id="contact-location"
            type="text"
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
              if (errors.location) setErrors((prev) => ({ ...prev, location: undefined }));
            }}
            placeholder="Ej. Caracas, Venezuela / Madrid, España"
            aria-invalid={Boolean(errors.location)}
            className="w-full rounded-md border border-white/15 bg-[#08080A] px-3.5 py-2.5 text-sm text-[#EDECE8] placeholder:text-[#666662] focus:border-[#E5A93C] focus:outline-none"
          />
          {errors.location && <p className="mt-1.5 text-xs text-amber-400">{errors.location}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-xs font-medium text-[#D6D5D0] mb-1.5">
          Contexto de la propuesta o consulta
        </label>
        <textarea
          id="contact-message"
          rows={4}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }));
          }}
          placeholder="Cuéntanos sobre el espacio disponible, fechas tentativas, perfil de evento, booking requerido o interés en la escuela."
          aria-invalid={Boolean(errors.message)}
          className="w-full rounded-md border border-white/15 bg-[#08080A] px-3.5 py-2.5 text-sm text-[#EDECE8] placeholder:text-[#666662] focus:border-[#E5A93C] focus:outline-none resize-y"
        />
        {errors.message && <p className="mt-1.5 text-xs text-amber-400">{errors.message}</p>}
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-1">
        <p className="text-xs text-[#8D8D88]">
          Respuesta directa a través de caritechmusic@gmail.com
        </p>
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-md bg-[#E5A93C] px-6 py-3 text-sm font-semibold text-[#08080A] hover:bg-[#EEB955] active:scale-[0.98] transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5A93C]"
        >
          <span>Preparar propuesta</span>
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </form>
  );
}
