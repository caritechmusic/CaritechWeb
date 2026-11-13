import { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onPrimaryAction: () => void;
}

const NAV_LINKS = [
  { href: '#trayectoria', label: 'Trayectoria' },
  { href: '#experiencias', label: 'Experiencias' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#colectivo', label: 'Colectivo' },
  { href: '#vision', label: 'Visión' },
];

export function Navbar({ onPrimaryAction }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMobileNavClick = () => {
    setMobileMenuOpen(false);
  };

  const handleMobileCta = () => {
    setMobileMenuOpen(false);
    onPrimaryAction();
  };

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#08080A]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between gap-8 px-6 lg:px-10">
        <a
          href="#inicio"
          className="font-display text-lg font-semibold tracking-tight text-[#EDECE8] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5A93C] rounded-sm"
        >
          Caritech Music
        </a>

        <nav aria-label="Navegación principal" className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-[#A3A39E] hover:text-[#EDECE8] transition-colors duration-150 underline-offset-4 hover:underline whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5A93C] rounded-sm"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onPrimaryAction}
            className="hidden sm:inline-flex items-center justify-center rounded-md bg-[#E5A93C] px-4 py-2 text-xs font-semibold text-[#08080A] hover:bg-[#EEB955] active:scale-[0.98] transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5A93C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#08080A]"
          >
            Proponer Alianza
          </button>

          <button
            type="button"
            aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="inline-flex md:hidden items-center justify-center rounded-md border border-white/10 p-2 text-[#EDECE8] hover:bg-white/5 transition-colors cursor-pointer min-h-[44px] min-w-[44px]"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#0D0D11] px-6 py-5">
          <nav aria-label="Navegación móvil" className="flex flex-col gap-4">
            {NAV_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={handleMobileNavClick}
                className="text-base font-medium text-[#D6D5D0] hover:text-[#EDECE8] py-1"
              >
                {item.label}
              </a>
            ))}
            <button
              type="button"
              onClick={handleMobileCta}
              className="mt-2 inline-flex w-full items-center justify-center rounded-md bg-[#E5A93C] px-4 py-3 text-sm font-semibold text-[#08080A] hover:bg-[#EEB955] transition-colors cursor-pointer"
            >
              Proponer Alianza
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
