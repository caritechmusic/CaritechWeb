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
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#141418] via-[#1B1813] to-[#0B0B0E] p-6 text-center ${className}`}
      >
        <Disc3 className="h-8 w-8 text-[#E5A93C]/80 mb-3" aria-hidden="true" />
        <span className="text-sm font-medium text-[#EDECE8]">{title || alt}</span>
        <span className="mt-1 text-xs text-[#9A9A96]">Caritech Music · Archivo Visual</span>
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
