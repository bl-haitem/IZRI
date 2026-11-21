import React from 'react';
import { Package, AlertOctagon, CheckCircle2, Clock, Truck, ShieldAlert } from 'lucide-react';

export default function StockOverviewWidget({ 
  motorcycles = [], 
  onGoToStock = () => {} 
}) {
  const totalStock = motorcycles.reduce((acc, m) => acc + (m.availableStock || 0), 0);
  const criticalStockModels = motorcycles.filter(m => (m.availableStock || 0) < 60);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-card hover:shadow-hover transition-all flex flex-col justify-between">
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-[#191919]">
              État des Stocks & Alertes de Réapprovisionnement
            </h3>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-gray-100 text-[#191919] border border-gray-200">
              Inventaire Global
            </span>
          </div>
          <p className="text-[11px] text-[#777777]">
            Surveillance en temps réel des unités en entrepôt et dans les concessions
          </p>
        </div>

        <button
          onClick={onGoToStock}
          className="text-xs font-bold text-[#E30613] hover:underline"
        >
          Gérer tout le stock
        </button>
      </div>

      {/* 4 Summary Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-3">
        <div className="bg-[#F9F9FB] border border-gray-200 rounded-xl p-2.5">
          <div className="flex items-center justify-between text-gray-500 mb-1">
            <span className="text-[10px] font-bold uppercase">Stock National</span>
            <Package className="w-3.5 h-3.5 text-gray-700" />
          </div>
          <div className="text-lg font-black text-[#191919] font-mono leading-none">
            {totalStock.toLocaleString()}
          </div>
          <span className="text-[10px] text-gray-500 font-medium">Unités assemblées</span>
        </div>

        <div className="bg-[#F9F9FB] border border-gray-200 rounded-xl p-2.5">
          <div className="flex items-center justify-between text-gray-500 mb-1">
            <span className="text-[10px] font-bold uppercase">Usine Béjaïa</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          </div>
          <div className="text-lg font-black text-[#191919] font-mono leading-none">
            1,850
          </div>
          <span className="text-[10px] text-gray-500 font-medium">Ligne Akbou opérationnelle</span>
        </div>

        <div className="bg-[#F9F9FB] border border-gray-200 rounded-xl p-2.5">
          <div className="flex items-center justify-between text-gray-500 mb-1">
            <span className="text-[10px] font-bold uppercase">En Transit Hubs</span>
            <Truck className="w-3.5 h-3.5 text-blue-600" />
          </div>
          <div className="text-lg font-black text-[#191919] font-mono leading-none">
            340
          </div>
          <span className="text-[10px] text-gray-500 font-medium">Rotations en cours</span>
        </div>

        <div className="bg-red-50/70 border border-red-200 rounded-xl p-2.5">
          <div className="flex items-center justify-between text-[#E30613] mb-1">
            <span className="text-[10px] font-bold uppercase">Alerte Rupture</span>
            <AlertOctagon className="w-3.5 h-3.5 text-[#E30613]" />
          </div>
          <div className="text-lg font-black text-[#E30613] font-mono leading-none">
            {criticalStockModels.length} Modèle(s)
          </div>
          <span className="text-[10px] text-red-700 font-medium">Action requise</span>
        </div>
      </div>

      {/* Critical Models List */}
      <div className="space-y-1.5">
        {motorcycles.map((m) => {
          const isCritical = m.availableStock < 60;
          const pct = Math.min(100, Math.round((m.availableStock / 400) * 100));
          return (
            <div key={m.id} className="flex items-center justify-between text-xs py-1 px-2 rounded-lg bg-[#F9F9FB] border border-gray-100">
              <div className="flex items-center gap-2 min-w-0">
                <span className={`w-2 h-2 rounded-full ${isCritical ? 'bg-[#E30613] animate-pulse' : 'bg-emerald-500'}`} />
                <span className="font-bold text-[#191919] truncate">{m.name}</span>
                <span className="text-[10px] text-gray-400">({m.category})</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-24 bg-gray-200 rounded-full h-1.5 hidden sm:block overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${isCritical ? 'bg-[#E30613]' : 'bg-[#191919]'}`} 
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className={`font-mono font-bold ${isCritical ? 'text-[#E30613]' : 'text-[#191919]'}`}>
                  {m.availableStock} unités
                </span>
                {isCritical && (
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-red-100 text-[#E30613]">
                    Critique
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
