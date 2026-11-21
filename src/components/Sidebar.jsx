import React from 'react';
import { 
  LayoutDashboard, ReceiptText, Building2, Bike, Boxes, 
  UserCheck, Wrench, TrendingUp, BarChart3, Settings, 
  LogOut, X, Store, Factory, MapPin
} from 'lucide-react';
import IzriLogo from './IzriLogo';

export default function Sidebar({
  activePage,
  setActivePage,
  isOpen = false,
  onClose = () => {},
  roleMode = 'superadmin',
  setRoleMode = () => {},
  currentShowroom = null,
}) {
  // Super Admin Navigation (Usine - National Network View)
  const superAdminSections = [
    {
      group: 'VUE D\'ENSEMBLE',
      items: [
        { id: 'dashboard', label: 'Tableau de Bord', icon: LayoutDashboard },
      ],
    },
    {
      group: 'OPÉRATIONS',
      items: [
        { id: 'sales', label: 'Ventes', icon: ReceiptText },
        { id: 'dealerships', label: 'Concessionnaires', icon: Building2 },
        { id: 'stock', label: 'Stocks', icon: Boxes },
        { id: 'models', label: 'Catalogue Motos', icon: Bike },
      ],
    },
    {
      group: 'DONNÉES CLIENTS',
      items: [
        { id: 'registrations', label: 'Enregistrements', icon: UserCheck },
        { id: 'maintenance', label: 'Maintenance SAV', icon: Wrench },
      ],
    },
    {
      group: 'INTELLIGENCE',
      items: [
        { id: 'forecast', label: 'Prévisions Demande', icon: TrendingUp },
        { id: 'reports', label: 'Rapports', icon: BarChart3 },
      ],
    },
    {
      group: 'SYSTÈME',
      items: [
        { id: 'settings', label: 'Paramètres', icon: Settings },
      ],
    },
  ];

  // Showroom Navigation (Specialized for ONE Dealership - Ventes & Cartes Grises unifiées)
  const showroomSections = [
    {
      group: 'SHOWROOM LOCAL (ALGER)',
      items: [
        { id: 'dashboard', label: 'Tableau de Bord', icon: LayoutDashboard },
        { id: 'sales', label: 'Ventes & Cartes Grises', icon: ReceiptText },
        { id: 'stock', label: 'Stock Magasin', icon: Boxes },
        { id: 'models', label: 'Catalogue & Tarifs', icon: Bike },
      ],
    },
  ];

  const sections = roleMode === 'superadmin' ? superAdminSections : showroomSections;

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

        {/* 2-Way Mode Switcher: Usine vs Showroom */}
        <div className="px-3 py-2.5 border-b border-white/10">
          <div className="grid grid-cols-2 gap-1 bg-black/50 p-1 rounded-lg">
            <button
              onClick={() => { 
                setRoleMode('superadmin'); 
                if (['sales', 'stock', 'models', 'registrations'].includes(activePage)) {
                  // Keep current page
                } else {
                  setActivePage('dashboard');
                }
              }}
              className={`text-xs font-semibold py-1.5 rounded-md transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                roleMode === 'superadmin' ? 'bg-[#E30613] text-white shadow-xs' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Factory className="w-3.5 h-3.5" />
              Usine
            </button>
            <button
              onClick={() => { 
                setRoleMode('showroom'); 
                if (activePage === 'registrations') {
                  setActivePage('sales');
                } else if (!['dashboard', 'sales', 'stock', 'models'].includes(activePage)) {
                  setActivePage('dashboard');
                }
              }}
              className={`text-xs font-semibold py-1.5 rounded-md transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                roleMode === 'showroom' ? 'bg-[#E30613] text-white shadow-xs' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Store className="w-3.5 h-3.5" />
              Showroom
            </button>
          </div>

          {/* Showroom Subtitle when in Showroom mode */}
          {roleMode === 'showroom' && (
            <div className="mt-2 px-1 text-[10px] text-gray-400 flex items-center gap-1 truncate">
              <MapPin className="w-3 h-3 text-[#E30613] shrink-0" />
              <span className="truncate">Alger (DZ-16-001)</span>
            </div>
          )}
        </div>

        {/* Grouped Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-3">
          {sections.map((section, idx) => (
            <div key={idx} className="space-y-0.5">
              <div className="px-3 py-1 text-[10px] font-bold tracking-wider text-gray-500 uppercase">
                {section.group}
              </div>
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = activePage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => { setActivePage(item.id); onClose(); }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs transition-all cursor-pointer ${
                      isActive ? 'bg-[#E30613] text-white font-bold shadow-xs' : 'text-gray-400 hover:bg-white/5 hover:text-white font-medium'
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

        {/* Footer */}
        <div className="p-3 border-t border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#E30613] text-white flex items-center justify-center font-bold text-xs shrink-0">
              {roleMode === 'superadmin' ? 'KB' : 'RK'}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-semibold text-white truncate">
                {roleMode === 'superadmin' ? 'Karim Benali' : (currentShowroom?.manager || 'Redouane Khelifi')}
              </div>
              <div className="text-[10px] text-gray-500 truncate">
                {roleMode === 'superadmin' ? 'Super Admin VMS' : 'Gérant Showroom Alger'}
              </div>
            </div>
            <button onClick={() => alert("Déconnexion de la session")} className="p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-white/10 transition-colors">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
