import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export type AppTab =
  | 'inicio'
  | 'trayectoria'
  | 'eventos'
  | 'sets'
  | 'servicios'
  | 'colectivo'
  | 'vision'
  | 'contacto';

interface NavbarProps {
  activeTab: AppTab;
  onSelectTab: (tab: AppTab) => void;
  onPrimaryAction: () => void;
}

const NAV_LINKS: { tab: AppTab; label: string }[] = [
  { tab: 'inicio', label: 'Inicio' },
  { tab: 'trayectoria', label: 'Trayectoria' },
  { tab: 'eventos', label: 'Eventos' },
  { tab: 'sets', label: 'Sets' },
  { tab: 'servicios', label: 'Servicios' },
  { tab: 'colectivo', label: 'Colectivo' },
  { tab: 'vision', label: 'Visión' },
];

export function Navbar({ activeTab, onSelectTab, onPrimaryAction }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleTabSelect = (tab: AppTab) => {
    setMobileMenuOpen(false);
    onSelectTab(tab);
  };

  const handleMobileCta = () => {
    setMobileMenuOpen(false);
    onPrimaryAction();
  };

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#09090B]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between gap-6 px-6 lg:px-10">
        <button
          type="button"
          onClick={() => handleTabSelect('inicio')}
          className="inline-flex items-center gap-2.5 font-display text-lg font-semibold tracking-tight text-[#F4F4F5] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EF4444] rounded-sm"
        >
          <img
            src="/assets/aistudio/Logo_Caritech-01_4a9a2bb2.png"
            alt=""
            aria-hidden="true"
            className="h-8 w-8 object-contain mix-blend-screen shrink-0"
          />
          <span>Caritech Music</span>
        </button>

        <nav
          aria-label="Navegación principal"
          className="hidden lg:flex items-center gap-5 xl:gap-7"
        >
          {NAV_LINKS.map((item) => {
            const isActive = activeTab === item.tab;
            return (
              <button
                key={item.tab}
                type="button"
                aria-current={isActive ? 'page' : undefined}
                onClick={() => handleTabSelect(item.tab)}
                className={`relative py-1 text-sm font-medium transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EF4444] rounded-sm ${
                  isActive ? 'text-[#EF4444]' : 'text-[#A1A1AA] hover:text-[#F4F4F5]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span
                    className="absolute inset-x-0 -bottom-[19px] h-[2px] bg-[#DC2626]"
                    aria-hidden="true"
                  />
                )}
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onPrimaryAction}
            className={`hidden sm:inline-flex items-center justify-center rounded-md px-4 py-2 text-xs font-semibold transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EF4444] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B] active:scale-[0.98] ${
              activeTab === 'contacto'
                ? 'bg-[#F4F4F5] text-[#09090B]'
                : 'bg-[#DC2626] text-white hover:bg-[#EF4444]'
            }`}
          >
            Proponer Alianza
          </button>

          <button
            type="button"
            aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="inline-flex lg:hidden items-center justify-center rounded-md border border-white/10 p-2 text-[#F4F4F5] hover:bg-white/5 transition-colors cursor-pointer min-h-[44px] min-w-[44px]"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/10 bg-[#0F0F12] px-6 py-5">
          <nav aria-label="Navegación móvil" className="flex flex-col gap-3">
            {NAV_LINKS.map((item) => {
              const isActive = activeTab === item.tab;
              return (
                <button
                  key={item.tab}
                  type="button"
                  aria-current={isActive ? 'page' : undefined}
                  onClick={() => handleTabSelect(item.tab)}
                  className={`text-left text-base font-medium py-1.5 cursor-pointer transition-colors ${
                    isActive ? 'text-[#EF4444]' : 'text-[#D4D4D8] hover:text-[#F4F4F5]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
            <button
              type="button"
              onClick={handleMobileCta}
              className="mt-2 inline-flex w-full items-center justify-center rounded-md bg-[#DC2626] px-4 py-3 text-sm font-semibold text-white hover:bg-[#EF4444] transition-colors cursor-pointer"
            >
              Proponer Alianza
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
