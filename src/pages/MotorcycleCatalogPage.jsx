import React, { useState } from 'react';
import { Sparkles, Eye, Info, Package, DollarSign, ArrowUpRight, Search, Zap, Fuel, Layers, Store } from 'lucide-react';
import MotorcycleVisual from '../components/MotorcycleVisual';

export default function MotorcycleCatalogPage({
  motorcycles = [],
  onSelectModel = () => {},
  roleMode = 'superadmin',
  currentShowroom = null,
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const isShowroom = roleMode === 'showroom';

  const filteredModels = motorcycles.filter(m => {
    const matchesSearch = searchTerm === '' || 
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'All' || m.segment === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-4 pb-12">
      {/* Header Bar */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-extrabold text-[#191919]">
              {isShowroom ? `Catalogue & Tarifs Showroom • ${currentShowroom?.name || 'Alger'}` : "Catalogue VMS Industrie"}
            </h2>
            {isShowroom && (
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-red-50 text-[#E30613] border border-red-200">
                Tarifs Publics TTC
              </span>
            )}
          </div>
          <p className="text-xs text-[#777777]">
            {isShowroom 
              ? "Gamme officielle VMS disponible à la commande et livraison immédiate" 
              : "Modèles homologués et assemblés à l'usine d'Akbou (Béjaïa)"}
          </p>
        </div>

        {/* Filter controls */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Chercher modèle..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-[#F5F5F7] border border-gray-200 rounded-lg pl-8 pr-2.5 py-1.5 text-xs text-[#191919] focus:outline-none focus:border-[#E30613]"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-[#F5F5F7] border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs text-[#191919] focus:outline-none focus:border-[#E30613] cursor-pointer"
          >
            <option value="All">Tous les Segments</option>
            <option value="Commuter">Commuter & Urbain</option>
            <option value="Premium">Maxi-Scooter GT</option>
            <option value="Adventure">Trail & Aventure</option>
            <option value="Cargo & Flotte">Utilitaire & Flotte</option>
          </select>
        </div>
      </div>

      {/* Grid of Motorcycle Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredModels.map((bike) => {
          const isLowStock = bike.availableStock < 50;
          const localStock = currentShowroom?.stockByModel?.find(s => s.modelId === bike.id);

          return (
            <div
              key={bike.id}
              onClick={() => onSelectModel(bike)}
              className="bg-white rounded-2xl border border-gray-200 p-4 shadow-card hover:shadow-hover hover:-translate-y-1 transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                {/* Top Badge Bar */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-gray-100 text-[#191919] border border-gray-200">
                    {bike.displacement} · {bike.category}
                  </span>
                  
                  {isShowroom && localStock ? (
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      localStock.alert 
                        ? 'bg-amber-100 text-amber-900 border border-amber-200' 
                        : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                    }`}>
                      {localStock.inStock} dispo(s) à Alger
                    </span>
                  ) : (
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isLowStock 
                        ? 'bg-red-100 text-[#E30613]' 
                        : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {isLowStock ? 'Stock Réseau Critique' : 'En Disponibilité'}
                    </span>
                  )}
                </div>

                {/* Bike Visual Canvas */}
                <div className="w-full bg-[#F9F9FB] rounded-xl p-3 flex items-center justify-center min-h-[170px] border border-gray-100 my-2 group-hover:bg-[#F2F2F5] transition-colors">
                  <MotorcycleVisual modelId={bike.id} imageSrc={bike.image} color="#E30613" className="w-full max-w-[280px] h-[140px]" />
                </div>

                {/* Model Title & Price */}
                <div className="flex items-baseline justify-between gap-1 mb-2">
                  <div>
                    <h3 className="text-base font-extrabold text-[#191919] group-hover:text-[#E30613] transition-colors">
                      {bike.name}
                    </h3>
                    <p className="text-[11px] text-[#777777]">{bike.subtitle}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-black text-[#191919] font-mono">
                      {bike.priceDZD.toLocaleString()} <span className="text-xs text-[#E30613]">DZD</span>
                    </span>
                  </div>
                </div>

                {/* 3 Quick Specs */}
                <div className="grid grid-cols-3 gap-1.5 bg-[#F9F9FB] rounded-xl p-2 border border-gray-100 text-center text-xs mb-3">
                  <div>
                    <span className="text-[9px] uppercase font-bold text-gray-400 block">Puissance</span>
                    <span className="font-bold text-[#191919] truncate block text-[11px]">{bike.power.split('@')[0]}</span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase font-bold text-gray-400 block">Conso</span>
                    <span className="font-bold text-[#191919] truncate block text-[11px]">{bike.mileage}</span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase font-bold text-gray-400 block">Réservoir</span>
                    <span className="font-bold text-[#191919] truncate block text-[11px]">{bike.fuelTank}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="border-t border-gray-100 pt-2.5 flex items-center justify-between text-xs">
                <span className="text-[11px] text-gray-500 font-semibold">Garantie 2 ans</span>
                <span className="text-[11px] font-bold text-[#E30613] group-hover:underline flex items-center gap-1">
                  <span>Fiche Technique</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
