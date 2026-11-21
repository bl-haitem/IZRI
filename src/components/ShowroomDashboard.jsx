import React, { useState } from 'react';
import { 
  Store, 
  Bike, 
  Boxes, 
  Clock, 
  Truck, 
  Plus, 
  ArrowRightLeft, 
  MapPin, 
  CheckCircle2, 
  AlertTriangle,
  Eye,
  ChevronRight,
  FileCheck
} from 'lucide-react';
import { SHOWROOM_CONFIG } from '../data/mockData';

export default function ShowroomDashboard({
  currentShowroom = SHOWROOM_CONFIG,
  motorcycles = [],
  sales = [],
  dealerships = [],
  onSelectShowroom = () => {},
  onOpenNewSale = () => {},
  onViewSale = () => {},
  onGoToStock = () => {},
  onGoToSales = () => {},
}) {
  const [showOrderToast, setShowOrderToast] = useState(false);

  // Filter sales for this showroom
  const showroomSales = sales.filter(s => 
    s.dealershipId === currentShowroom.id || 
    (s.dealershipName && s.dealershipName.toLowerCase().includes(currentShowroom.name.toLowerCase()))
  );

  const handleOrderReplenish = () => {
    setShowOrderToast(true);
    setTimeout(() => setShowOrderToast(false), 3500);
  };

  return (
    <div className="space-y-4 pb-12">
      {/* Replenishment Feedback Toast */}
      {showOrderToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#191919] text-white px-4 py-3 rounded-xl shadow-2xl border-l-4 border-l-[#E30613] flex items-center gap-2.5 text-xs animate-in fade-in slide-in-from-bottom duration-200">
          <Truck className="w-4 h-4 text-[#E30613] shrink-0" />
          <span>Commande de réassort transmise à la logistique de l'Usine d'Akbou (Béjaïa).</span>
        </div>
      )}

      {/* Showroom Identity Banner (Clean & Compact) */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-card">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#191919] text-white flex items-center justify-center shrink-0 shadow-xs">
              <Store className="w-5 h-5 text-[#E30613]" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-base font-extrabold text-[#191919]">
                  {currentShowroom.name}
                </h2>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-red-50 text-[#E30613] border border-red-200">
                  {currentShowroom.code}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  Showroom Agréé VMS
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1.5 flex-wrap">
                <MapPin className="w-3.5 h-3.5 text-[#E30613] shrink-0" />
                <span>{currentShowroom.address} • Wilaya {currentShowroom.wilaya} • Gérant : <strong>{currentShowroom.manager}</strong></span>
              </p>
            </div>
          </div>

          {/* Right Controls: Switcher & Fast Sale */}
          <div className="flex items-center gap-2 self-start lg:self-auto shrink-0">
            <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs">
              <span className="text-[10px] uppercase font-bold text-gray-400">Point de Vente :</span>
              <select
                value={currentShowroom.id}
                onChange={(e) => {
                  const found = dealerships.find(d => d.id === e.target.value);
                  if (found) onSelectShowroom(found);
                }}
                className="bg-transparent font-bold text-[#191919] focus:outline-none cursor-pointer"
              >
                {dealerships.map((d) => (
                  <option key={d.id} value={d.id}>{d.name} ({d.wilaya})</option>
                ))}
              </select>
            </div>

            <button
              onClick={onOpenNewSale}
              className="flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#E30613] text-white text-xs font-bold hover:bg-[#C40510] shadow-sm transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Vente Comptoir</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Focused KPI Cards (No Duplicates) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* 1. Showroom Sales */}
        <div 
          onClick={onGoToSales}
          className="bg-white rounded-xl p-3.5 border border-gray-200 border-l-4 border-l-[#E30613] hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between text-gray-500 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-600">Ventes du Magasin</span>
              <Bike className="w-4 h-4 text-[#E30613]" />
            </div>
            <div className="flex items-baseline gap-1.5 mb-1">
              <span className="text-xl font-black text-[#191919] font-mono">{currentShowroom.sales || currentShowroom.totalSales || 242}</span>
              <span className="text-xs text-gray-500 font-medium">unités</span>
            </div>
            <p className="text-[11px] text-gray-600 font-medium">
              CA : {currentShowroom.revenueM || 52.8}M DZD (+14.6%)
            </p>
          </div>
          <span className="text-[10px] text-emerald-700 font-bold mt-2 pt-2 border-t border-gray-100 block">
            Leader Région Centre
          </span>
        </div>

        {/* 2. Showroom Floor Stock */}
        <div 
          onClick={onGoToStock}
          className="bg-white rounded-xl p-3.5 border border-gray-200 border-l-4 border-l-emerald-500 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between text-gray-500 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">Stock Showroom</span>
              <Boxes className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="flex items-baseline gap-1.5 mb-1">
              <span className="text-xl font-black text-[#191919] font-mono">{currentShowroom.stock || currentShowroom.totalStock || 58}</span>
              <span className="text-xs text-gray-500 font-medium">motos</span>
            </div>
            <p className="text-[11px] text-gray-600 font-medium">
              28 en hall • 30 au dépôt local
            </p>
          </div>
          <span className="text-[10px] text-emerald-700 font-bold mt-2 pt-2 border-t border-gray-100 block">
            Disponibles immédiatement
          </span>
        </div>

        {/* 3. Cartes Grises & Clients (Unified Concept) */}
        <div 
          onClick={onGoToSales}
          className="bg-white rounded-xl p-3.5 border border-gray-200 border-l-4 border-l-amber-500 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between text-amber-800 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">Cartes Grises & Clients</span>
              <Clock className="w-4 h-4 text-amber-600" />
            </div>
            <div className="flex items-baseline gap-1.5 mb-1">
              <span className="text-xl font-black text-amber-900 font-mono">{currentShowroom.pendingRegistrations || 18}</span>
              <span className="text-xs text-amber-800 font-medium">en cours Daïra</span>
            </div>
            <p className="text-[11px] text-gray-600 font-medium">
              {currentShowroom.registeredUsers || 216} comptes IZRI validés (89%)
            </p>
          </div>
          <span className="text-[10px] text-amber-700 font-bold mt-2 pt-2 border-t border-gray-100 block">
            Instruction sous 48h ouvrées
          </span>
        </div>

        {/* 4. In-Transit Factory Replenishment */}
        <div className="bg-white rounded-xl p-3.5 border border-gray-200 border-l-4 border-l-black flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-gray-500 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-700">En Transit Usine</span>
              <Truck className="w-4 h-4 text-[#191919]" />
            </div>
            <div className="flex items-baseline gap-1.5 mb-1">
              <span className="text-xl font-black text-[#191919] font-mono">{currentShowroom.inTransitFromFactory || 12}</span>
              <span className="text-xs text-gray-500 font-medium">unités</span>
            </div>
            <p className="text-[11px] text-gray-600 font-medium">
              Expédition ZI Taharacht (Akbou)
            </p>
          </div>
          <span className="text-[10px] text-gray-700 font-bold mt-2 pt-2 border-t border-gray-100 block">
            Arrivée estimée : Demain 14h
          </span>
        </div>
      </div>

      {/* Main 2-Column Balanced Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Column (7 cols): Immediate Showroom Stock Availability */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-200 p-4 shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-100">
              <div>
                <h3 className="text-sm font-bold text-[#191919]">
                  Disponibilité Immédiate en Magasin
                </h3>
                <p className="text-[11px] text-gray-500">
                  Unités physiquement stockées prêtes pour enlèvement client
                </p>
              </div>

              <button
                onClick={onGoToStock}
                className="text-xs font-bold text-[#E30613] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Inventaire complet</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-2">
              {(currentShowroom.stockByModel || [
                { modelId: "vms-cuxi-2", modelName: "VMS Cuxi 2", inStock: 18, location: "Hall d'expo", alert: false, price: 315000 },
                { modelId: "vms-driver-125", modelName: "VMS Driver 125", inStock: 14, location: "Hall d'expo", alert: false, price: 388000 },
                { modelId: "vms-vmax-200", modelName: "VMS VMAX 200", inStock: 9, location: "Dépôt local", alert: false, price: 534000 },
                { modelId: "vms-estate-x", modelName: "VMS Estate X", inStock: 8, location: "Dépôt local", alert: false, price: 345000 },
                { modelId: "vms-xdv-300", modelName: "VMS XDV 300", inStock: 6, location: "Hall d'expo", alert: true, price: 595000 },
                { modelId: "vms-victoria-300", modelName: "VMS Victoria 300", inStock: 3, location: "Hall d'expo", alert: true, price: 580000 },
              ]).map((item) => (
                <div 
                  key={item.modelId}
                  className={`p-2.5 rounded-xl border flex items-center justify-between gap-3 transition-colors ${
                    item.alert ? 'bg-red-50/40 border-red-200' : 'bg-[#F9F9FB] border-gray-200'
                  }`}
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-[#191919] text-xs">{item.modelName}</span>
                      <span className="text-[10px] text-gray-400 font-mono">{item.location}</span>
                    </div>
                    <span className="text-[11px] text-gray-500 font-mono font-medium">
                      {item.price?.toLocaleString()} DZD TTC
                    </span>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right">
                      <span className={`font-mono font-black text-sm block ${item.alert ? 'text-[#E30613]' : 'text-[#191919]'}`}>
                        {item.inStock} en stock
                      </span>
                    </div>

                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      item.alert ? 'bg-red-100 text-[#E30613]' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {item.alert ? 'Stock Bas' : 'Disponible'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500">
            <span>Total : <strong>{currentShowroom.stock || 58} motos prêtes à livrer</strong></span>
            <span className="text-emerald-700 font-semibold">Garantie VMS activée dès la vente</span>
          </div>
        </div>

        {/* Right Column (5 cols): In-Transit Delivery & Recent Counter Sales */}
        <div className="lg:col-span-5 space-y-4">
          {/* Active Factory Shipment Card */}
          <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-card">
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#E30613]" />
                <h3 className="text-sm font-bold text-[#191919]">
                  Livraison Usine en Route
                </h3>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                Camion Plateau
              </span>
            </div>

            <div className="bg-[#F9F9FB] border border-gray-200 rounded-xl p-3 text-xs space-y-2">
              <div className="flex items-center justify-between text-gray-700 font-mono">
                <span>Bon : <strong>BL-VMS-2026-991</strong></span>
                <span className="text-[#E30613] font-bold">12 unités</span>
              </div>
              <div className="text-[11px] text-gray-600">
                4x Driver 125, 4x XDV 300, 4x Cuxi 2
              </div>
              <div className="text-[11px] text-gray-500 pt-1 border-t border-gray-200 font-mono">
                Départ : Akbou • Arrivée : <strong>Demain 14h00</strong>
              </div>
            </div>

            <button
              onClick={handleOrderReplenish}
              className="mt-3 w-full py-1.5 px-3 rounded-lg border border-gray-300 hover:border-[#E30613] hover:text-[#E30613] text-xs font-bold transition-all text-[#191919] flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <ArrowRightLeft className="w-3.5 h-3.5 text-[#E30613]" />
              <span>Commander Réassort Usine Akbou</span>
            </button>
          </div>

          {/* Recent Sales & Registration Tracking */}
          <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-card">
            <div className="flex items-center justify-between mb-2.5 pb-2 border-b border-gray-100">
              <h3 className="text-sm font-bold text-[#191919]">
                Dernières Ventes Comptoir
              </h3>
              <button
                onClick={onGoToSales}
                className="text-xs font-bold text-[#E30613] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Voir tout</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-2">
              {showroomSales.slice(0, 3).map((sale) => (
                <div 
                  key={sale.id}
                  onClick={() => onViewSale(sale)}
                  className="p-2 rounded-xl bg-[#F9F9FB] hover:bg-gray-100 transition-colors border border-gray-100 flex items-center justify-between text-xs cursor-pointer"
                >
                  <div className="min-w-0">
                    <div className="font-bold text-[#191919] truncate">{sale.modelName}</div>
                    <div className="text-[10px] text-gray-500 truncate">{sale.customerName || "Client"} • {sale.saleDate}</div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      sale.registrationStatus === 'Verified'
                        ? 'bg-emerald-100 text-emerald-800'
                        : sale.registrationStatus === 'Pending'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {sale.registrationStatus === 'Verified' ? 'Validé' : sale.registrationStatus === 'Pending' ? 'Daïra' : 'Non lié'}
                    </span>
                    <Eye className="w-3.5 h-3.5 text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
