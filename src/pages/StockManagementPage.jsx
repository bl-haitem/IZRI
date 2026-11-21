import React, { useState } from 'react';
import { 
  Boxes, 
  AlertOctagon, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRightLeft, 
  Search, 
  Warehouse, 
  Store,
  ShieldAlert,
  Truck
} from 'lucide-react';
import { SHOWROOM_CONFIG } from '../data/mockData';

export default function StockManagementPage({
  motorcycles = [],
  dealerships = [],
  roleMode = 'superadmin',
  currentShowroom = SHOWROOM_CONFIG,
}) {
  const [filterType, setFilterType] = useState('model'); // 'model' | 'dealership'
  const [searchTerm, setSearchTerm] = useState('');
  const [showTransferSuccess, setShowTransferSuccess] = useState(false);

  const isShowroom = roleMode === 'showroom';

  const totalStock = motorcycles.reduce((acc, m) => acc + (m.availableStock || 0), 0);
  const lowStockModels = motorcycles.filter(m => (m.availableStock || 0) < 60);
  const outOfStockModels = motorcycles.filter(m => (m.availableStock || 0) <= 25);

  const handleSimulateTransfer = () => {
    setShowTransferSuccess(true);
    setTimeout(() => setShowTransferSuccess(false), 3000);
  };

  return (
    <div className="space-y-4 pb-12">
      {/* Toast Feedback */}
      {showTransferSuccess && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#191919] text-white px-4 py-3 rounded-xl shadow-2xl border border-red-500/40 flex items-center gap-2 animate-in fade-in slide-in-from-bottom duration-200 text-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="font-semibold">
            {isShowroom 
              ? "Demande de réassort transmise à l'Usine d'Akbou (Béjaïa)." 
              : "Ordre de transfert logistique vers le hub concessionnaire enregistré."}
          </span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-extrabold text-[#191919]">
              {isShowroom ? `Stock du Magasin • ${currentShowroom.name}` : "Gestion des Stocks & Logistique"}
            </h2>
            {isShowroom && (
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-red-50 text-[#E30613] border border-red-200">
                {currentShowroom.code}
              </span>
            )}
          </div>
          <p className="text-xs text-[#777777]">
            {isShowroom 
              ? "Inventaire physique disponible au hall d'exposition et dépôt local" 
              : "Suivi des disponibilités usine et réseau en temps réel"}
          </p>
        </div>

        <button
          onClick={handleSimulateTransfer}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#E30613] text-white text-xs font-bold hover:bg-[#C40510] shadow-sm transition-all self-start md:self-auto cursor-pointer"
        >
          {isShowroom ? <Truck className="w-3.5 h-3.5" /> : <ArrowRightLeft className="w-3.5 h-3.5" />}
          <span>{isShowroom ? "Commander Réassort Usine Akbou" : "Nouveau Transfert Logistique"}</span>
        </button>
      </div>

      {/* 4 Indicators */}
      {isShowroom ? (
        /* Showroom Specific Indicators */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-card">
            <div className="flex items-center justify-between text-gray-500 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-700">Stock Showroom Total</span>
              <Store className="w-4 h-4 text-[#191919]" />
            </div>
            <div className="text-2xl font-black text-[#191919] font-mono">
              {currentShowroom.stock || 58} <span className="text-xs text-gray-500 font-sans font-medium">motos</span>
            </div>
            <span className="text-xs text-[#777777]">Prêtes à la vente immédiate</span>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-card">
            <div className="flex items-center justify-between text-gray-500 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-700">Hall d'Exposition</span>
              <Boxes className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-black text-[#191919] font-mono">
              28 <span className="text-xs text-gray-500 font-sans font-medium">motos</span>
            </div>
            <span className="text-xs text-emerald-700 font-semibold">Exposées en vitrine magasin</span>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-card">
            <div className="flex items-center justify-between text-gray-500 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-700">Dépôt Mohammadia</span>
              <Warehouse className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-2xl font-black text-[#191919] font-mono">
              30 <span className="text-xs text-gray-500 font-sans font-medium">motos</span>
            </div>
            <span className="text-xs text-[#777777]">Stock tampon local</span>
          </div>

          <div className="bg-red-50/80 rounded-2xl border border-red-200 p-4 shadow-card">
            <div className="flex items-center justify-between text-[#E30613] mb-1">
              <span className="text-xs font-bold uppercase tracking-wider">En Transit Usine</span>
              <Truck className="w-4 h-4 text-[#E30613]" />
            </div>
            <div className="text-2xl font-black text-[#E30613] font-mono">
              12 <span className="text-xs text-[#E30613] font-sans font-medium">motos</span>
            </div>
            <span className="text-xs text-red-700 font-semibold">Arrivée estimée : Demain 14h</span>
          </div>
        </div>
      ) : (
        /* National Super Admin Indicators */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-card">
            <div className="flex items-center justify-between text-gray-500 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider">Stock Total Disponible</span>
              <Boxes className="w-4 h-4 text-[#191919]" />
            </div>
            <div className="text-2xl font-black text-[#191919] font-mono">
              {totalStock.toLocaleString()} <span className="text-xs text-gray-500 font-sans font-medium">unités</span>
            </div>
            <span className="text-xs text-[#777777]">1,850 usine • 1,400 concessions</span>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-card">
            <div className="flex items-center justify-between text-amber-700 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider">Modèles en Stock Faible</span>
              <AlertTriangle className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-2xl font-black text-amber-700 font-mono">
              {lowStockModels.length} <span className="text-xs text-amber-600 font-sans font-medium">modèles</span>
            </div>
            <span className="text-xs text-amber-700/80">Moins de 60 unités en réserve</span>
          </div>

          <div className="bg-red-50/80 rounded-2xl border border-red-200 p-4 shadow-card">
            <div className="flex items-center justify-between text-[#E30613] mb-1">
              <span className="text-xs font-bold uppercase tracking-wider">Risque Pénurie Imminent</span>
              <AlertOctagon className="w-4 h-4 text-[#E30613]" />
            </div>
            <div className="text-2xl font-black text-[#E30613] font-mono">
              {outOfStockModels.length} <span className="text-xs text-[#E30613] font-sans font-medium">modèles</span>
            </div>
            <span className="text-xs text-red-700 font-semibold">Réserve &lt; 15 jours de vente</span>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-card">
            <div className="flex items-center justify-between text-gray-500 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider">Couverture Réseau</span>
              <Warehouse className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-black text-[#191919] font-mono">
              45 <span className="text-xs text-gray-500 font-sans font-medium">jours</span>
            </div>
            <span className="text-xs text-emerald-700 font-semibold">Rythme d'écoulement régulier</span>
          </div>
        </div>
      )}

      {/* Showroom Table View */}
      {isShowroom ? (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-card overflow-hidden">
          <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-sm font-bold text-[#191919]">
                Détail de l'Inventaire du Magasin ({currentShowroom.name})
              </h3>
              <p className="text-[11px] text-gray-500">
                Unités physiquement stockées et réparties entre le hall et le dépôt local
              </p>
            </div>
            <span className="text-xs font-mono font-bold bg-gray-100 px-2.5 py-1 rounded border border-gray-200 text-[#191919]">
              Total : {currentShowroom.stock || 58} unités
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-gray-200 text-[#777777] font-semibold text-[11px] bg-[#F9F9FB]">
                  <th className="py-3 px-3.5">Modèle Moto VMS</th>
                  <th className="py-3 px-3.5">Emplacement Local</th>
                  <th className="py-3 px-3.5 text-right">Quantité Disponible</th>
                  <th className="py-3 px-3.5 text-right">Prix Public TTC</th>
                  <th className="py-3 px-3.5 text-center">Disponibilité Vente</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {(currentShowroom.stockByModel || []).map((item) => (
                  <tr key={item.modelId} className="hover:bg-gray-50/80 transition-colors">
                    <td className="py-3 px-3.5 font-bold text-[#191919]">
                      {item.modelName}
                    </td>
                    <td className="py-3 px-3.5 text-gray-600">
                      {item.location}
                    </td>
                    <td className="py-3 px-3.5 text-right font-mono font-bold text-sm">
                      <span className={item.alert ? 'text-[#E30613]' : 'text-[#191919]'}>
                        {item.inStock} unités
                      </span>
                    </td>
                    <td className="py-3 px-3.5 text-right font-mono text-gray-700">
                      {item.price?.toLocaleString()} DZD
                    </td>
                    <td className="py-3 px-3.5 text-center">
                      {item.alert ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-[#E30613] border border-red-200">
                          <AlertTriangle className="w-3 h-3" />
                          Stock Bas (Réassort conseillé)
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          <CheckCircle2 className="w-3 h-3" />
                          Disponible Immédiatement
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* National Factory View */
        <>
          {/* Distribution Switcher & Search */}
          <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-card flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center bg-[#F5F5F7] p-1 rounded-lg border border-gray-200">
              <button
                onClick={() => setFilterType('model')}
                className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all cursor-pointer ${
                  filterType === 'model' ? 'bg-[#191919] text-white shadow-xs' : 'text-gray-600 hover:text-black'
                }`}
              >
                Répartition par Modèle de Moto
              </button>
              <button
                onClick={() => setFilterType('dealership')}
                className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all cursor-pointer ${
                  filterType === 'dealership' ? 'bg-[#191919] text-white shadow-xs' : 'text-gray-600 hover:text-black'
                }`}
              >
                Répartition par Concessionnaire
              </button>
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher modèle ou concession..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#F5F5F7] border border-gray-200 rounded-lg pl-8 pr-2.5 py-1.5 text-xs text-[#191919] focus:outline-none focus:border-[#E30613]"
              />
            </div>
          </div>

          {/* Distribution by Model */}
          {filterType === 'model' ? (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-gray-200 text-[#777777] font-semibold text-[11px] bg-[#F9F9FB]">
                      <th className="py-3 px-3.5">Modèle VMS</th>
                      <th className="py-3 px-3.5">Catégorie</th>
                      <th className="py-3 px-3.5 text-right">Stock Disponible</th>
                      <th className="py-3 px-3.5 text-right">Seuil Sécurité</th>
                      <th className="py-3 px-3.5 text-right">Vitesse Vente</th>
                      <th className="py-3 px-3.5 text-center">Statut Risque</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {motorcycles
                      .filter(m => m.name.toLowerCase().includes(searchTerm.toLowerCase()))
                      .map((m) => {
                        const isCritical = m.availableStock < 60;
                        return (
                          <tr key={m.id} className="hover:bg-gray-50/80 transition-colors">
                            <td className="py-3 px-3.5 font-bold text-[#191919]">
                              {m.name}
                            </td>
                            <td className="py-3 px-3.5 text-gray-600">
                              {m.category}
                            </td>
                            <td className="py-3 px-3.5 text-right font-mono font-bold text-sm">
                              <span className={isCritical ? 'text-[#E30613]' : 'text-[#191919]'}>
                                {m.availableStock} unités
                              </span>
                            </td>
                            <td className="py-3 px-3.5 text-right font-mono text-gray-500">
                              50 unités
                            </td>
                            <td className="py-3 px-3.5 text-right font-mono text-gray-700">
                              ~{Math.round(m.unitsSold / 40)} / sem.
                            </td>
                            <td className="py-3 px-3.5 text-center">
                              {isCritical ? (
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-[#E30613] border border-red-200">
                                  <AlertTriangle className="w-3 h-3" />
                                  Pénurie Imminente
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                                  <CheckCircle2 className="w-3 h-3" />
                                  Disponible
                                </span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            /* Distribution by Dealership */
            <div className="bg-white rounded-2xl border border-gray-200 shadow-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-gray-200 text-[#777777] font-semibold text-[11px] bg-[#F9F9FB]">
                      <th className="py-3 px-3.5">Concessionnaire</th>
                      <th className="py-3 px-3.5">Wilaya</th>
                      <th className="py-3 px-3.5 text-right">Stock Actuel</th>
                      <th className="py-3 px-3.5 text-right">Capacité Stockage</th>
                      <th className="py-3 px-3.5 text-center">Taux d'Occupation</th>
                      <th className="py-3 px-3.5 text-center">Statut Approvisionnement</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {dealerships
                      .filter(d => d.name.toLowerCase().includes(searchTerm.toLowerCase()) || d.wilaya.toLowerCase().includes(searchTerm.toLowerCase()))
                      .map((d) => {
                        const capacity = 80;
                        const pct = Math.round((d.stock / capacity) * 100);
                        return (
                          <tr key={d.id} className="hover:bg-gray-50/80 transition-colors">
                            <td className="py-3 px-3.5 font-bold text-[#191919]">{d.name}</td>
                            <td className="py-3 px-3.5 text-gray-600">{d.wilaya}</td>
                            <td className="py-3 px-3.5 text-right font-mono font-bold text-[#191919]">
                              {d.stock} unités
                            </td>
                            <td className="py-3 px-3.5 text-right font-mono text-gray-500">
                              {capacity} unités
                            </td>
                            <td className="py-3 px-3.5 text-center font-mono font-semibold">
                              {pct}%
                            </td>
                            <td className="py-3 px-3.5 text-center">
                              {d.stock <= 25 ? (
                                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-[#E30613] border border-red-200">
                                  Réappro Requis
                                </span>
                              ) : (
                                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                                  Stock Suffisant
                                </span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
