import React, { useState } from 'react';
import { Search, Bell, Menu, CheckCircle2, AlertTriangle, Plus, Info, X, Store, Factory } from 'lucide-react';

export default function Header({ 
  title = "Tableau de Bord", 
  subtitle = "VMS Industrie",
  onOpenSidebar = () => {},
  onOpenNewSale = () => {},
  searchQuery = "",
  setSearchQuery = () => {},
  roleMode = "superadmin",
  currentShowroom = null,
}) {
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, title: "Stock Critique : VMS Driver 125", desc: "42 unités restantes.", type: "alert" },
    { id: 2, title: "125 Enregistrements en attente", desc: "Certificats à vérifier.", type: "info" },
    { id: 3, title: "Hausse Demande : VMS XDV 300", desc: "+31.2% commandes Est.", type: "success" },
  ];

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-200 px-4 lg:px-6 py-2.5">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <button onClick={onOpenSidebar} className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 cursor-pointer">
            <Menu className="w-5 h-5" />
          </button>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-[#191919] truncate">{title}</h1>
              {roleMode === 'showroom' ? (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-red-50 text-[#E30613] border border-red-200 text-[10px] font-bold">
                  <Store className="w-3 h-3" />
                  Showroom Alger
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-gray-100 text-[#191919] border border-gray-200 text-[10px] font-bold">
                  <Factory className="w-3 h-3 text-[#E30613]" />
                  Vue Usine
                </span>
              )}
            </div>
            <p className="text-[11px] text-[#777777] truncate">{subtitle}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <div className="relative hidden sm:block">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-[#F5F5F7] border border-gray-200 rounded-lg pl-8 pr-3 py-1.5 text-xs text-[#191919] placeholder:text-gray-400 focus:outline-none focus:border-[#E30613] w-40 lg:w-48"
            />
          </div>

          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-1.5 rounded-lg text-gray-500 hover:text-[#191919] hover:bg-gray-100 cursor-pointer"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#E30613] ring-2 ring-white"></span>
            </button>
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200 py-1 z-50">
                <div className="px-3 py-2 border-b border-gray-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-[#191919]">Notifications</span>
                  <button onClick={() => setShowNotifications(false)} className="text-gray-400 hover:text-gray-700"><X className="w-3.5 h-3.5" /></button>
                </div>
                <div className="divide-y divide-gray-100">
                  {notifications.map((n) => (
                    <div key={n.id} className="p-2.5 hover:bg-gray-50 cursor-pointer">
                      <div className="flex items-start gap-2">
                        {n.type === 'alert' && <AlertTriangle className="w-3.5 h-3.5 text-[#E30613] shrink-0 mt-0.5" />}
                        {n.type === 'info' && <Info className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />}
                        {n.type === 'success' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />}
                        <div>
                          <div className="text-[11px] font-bold text-[#191919]">{n.title}</div>
                          <div className="text-[10px] text-[#777777]">{n.desc}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button
            onClick={onOpenNewSale}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#E30613] text-white text-xs font-bold hover:bg-[#C40510] shadow-sm cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{roleMode === 'showroom' ? 'Vente Comptoir' : 'Vente'}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
