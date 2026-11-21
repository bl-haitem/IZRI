import React from 'react';
import { 
  LayoutDashboard, ReceiptText, Bike, Boxes, 
  LogOut, X, Store, MapPin
} from 'lucide-react';
import IzriLogo from './IzriLogo';

export default function Sidebar({
  activePage,
  setActivePage,
  isOpen = false,
  onClose = () => {},
  currentShowroom = null,
}) {
  // Showroom Navigation (Pure Showroom Management - Specialized for ONE Dealership)
  const showroomSections = [
    {
      group: 'GESTION MAGASIN',
      items: [
        { id: 'dashboard', label: 'Tableau de Bord', icon: LayoutDashboard },
        { id: 'sales', label: 'Ventes & Cartes Grises', icon: ReceiptText },
        { id: 'stock', label: 'Stock Magasin', icon: Boxes },
        { id: 'models', label: 'Catalogue & Tarifs', icon: Bike },
      ],
    },
  ];

  return (
    <>
      {isOpen && (
        <div onClick={onClose} className="fixed inset-0 bg-black/60 z-40 lg:hidden" />
      )}
      <aside className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#191919] text-white flex flex-col transition-transform duration-300 lg:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Logo */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <IzriLogo light showTagline className="h-10" />
          <button onClick={onClose} className="lg:hidden p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Showroom Identity Card (No Usine Switcher) */}
        <div className="px-3.5 py-3 border-b border-white/10 bg-white/5">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-[#E30613] text-white flex items-center justify-center shrink-0">
              <Store className="w-4 h-4" />
            </span>
            <div className="min-w-0">
              <div className="text-xs font-extrabold text-white truncate">
                {currentShowroom?.name || 'SARL Alger Moto Performance'}
              </div>
              <div className="text-[10px] text-gray-400 flex items-center gap-1 font-mono">
                <MapPin className="w-2.5 h-2.5 text-[#E30613] shrink-0" />
                <span>DZ-16-001 · Mohammadia</span>
              </div>
            </div>
          </div>
        </div>

        {/* Grouped Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-3">
          {showroomSections.map((section, idx) => (
            <div key={idx} className="space-y-1">
              <div className="px-3 py-1 text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                {section.group}
              </div>
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = activePage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => { setActivePage(item.id); onClose(); }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs transition-all cursor-pointer ${
                      isActive 
                        ? 'bg-[#E30613] text-white font-bold shadow-md' 
                        : 'text-gray-300 hover:bg-white/10 hover:text-white font-medium'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Footer User Info */}
        <div className="p-3 border-t border-white/10 bg-black/30">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#E30613] text-white flex items-center justify-center font-bold text-xs shrink-0">
              RK
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-semibold text-white truncate">
                {currentShowroom?.manager || 'Redouane Khelifi'}
              </div>
              <div className="text-[10px] text-gray-400 truncate">
                Gérant Showroom Alger
              </div>
            </div>
            <button onClick={() => alert("Session Showroom active")} className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
