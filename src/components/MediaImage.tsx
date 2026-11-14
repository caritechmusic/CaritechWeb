import { useState } from 'react';
import { Disc3 } from 'lucide-react';

interface MediaImageProps {
  src: string;
  alt: string;
  title?: string;
  className?: string;
}

export function MediaImage({ src, alt, title, className = '' }: MediaImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#141418] via-[#1C1416] to-[#09090B] p-6 text-center ${className}`}
      >
        <Disc3 className="h-8 w-8 text-[#EF4444]/85 mb-3" aria-hidden="true" />
        <span className="text-sm font-medium text-[#F4F4F5]">{title || alt}</span>
        <span className="mt-1 text-xs text-[#A1A1AA]">Caritech Music · Archivo Visual</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
