import React from 'react';
import { X, Zap, Fuel, Layers, Weight, Sparkles, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';
import MotorcycleVisual from '../MotorcycleVisual';

export default function MotorcycleDetailModal({ motorcycle, onClose = () => {} }) {
  if (!motorcycle) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-2xl w-full border border-gray-200 shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-[#191919] text-white p-4 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-black text-white">{motorcycle.name}</h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#E30613] text-white uppercase">
                {motorcycle.subtitle}
              </span>
            </div>
            <p className="text-xs text-gray-400">{motorcycle.category} · Fabrication VMS Industrie Béjaïa</p>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4 max-h-[80vh] overflow-y-auto text-xs">
          {/* Visual Canvas Banner */}
          <div className="bg-gradient-to-b from-[#F5F5F7] to-[#E9EAED] rounded-xl p-4 flex items-center justify-center min-h-[190px] border border-gray-200">
            <MotorcycleVisual modelId={motorcycle.id} imageSrc={motorcycle.image} color="#E30613" className="w-full max-w-[360px] h-[170px]" />
          </div>

          {/* Pricing & Commercial Stats */}
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-[#F9F9FB] rounded-xl p-3 border border-gray-200">
              <span className="text-[10px] text-gray-400 uppercase font-bold block">Prix Public Conseillé</span>
              <span className="text-base font-black text-[#191919] font-mono">
                {motorcycle.priceDZD.toLocaleString()} <span className="text-xs text-[#E30613]">DZD</span>
              </span>
            </div>
            <div className="bg-[#F9F9FB] rounded-xl p-3 border border-gray-200">
              <span className="text-[10px] text-gray-400 uppercase font-bold block">Ventes Réseau Totales</span>
              <span className="text-base font-black text-[#191919] font-mono">{motorcycle.unitsSold} unités</span>
            </div>
            <div className="bg-[#F9F9FB] rounded-xl p-3 border border-gray-200">
              <span className="text-[10px] text-gray-400 uppercase font-bold block">Stock Disponible</span>
              <span className={`text-base font-black font-mono ${
                motorcycle.availableStock < 50 ? 'text-[#E30613]' : 'text-emerald-700'
              }`}>
                {motorcycle.availableStock} unités
              </span>
            </div>
          </div>

          {/* Full Technical Specs Sheet */}
          <div className="bg-[#F9F9FB] rounded-xl p-4 border border-gray-200">
            <span className="text-[11px] font-extrabold uppercase text-[#191919] tracking-wider block mb-2.5">
              Fiche Technique Homologation Algérie
            </span>
            <div className="grid grid-cols-2 gap-y-2 gap-x-4">
              <div className="flex justify-between py-1 border-b border-gray-200/60">
                <span className="text-gray-500">Cylindrée</span>
                <span className="font-bold text-[#191919]">{motorcycle.displacement}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-200/60">
                <span className="text-gray-500">Motorisation</span>
                <span className="font-bold text-[#191919]">{motorcycle.engineType}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-200/60">
                <span className="text-gray-500">Puissance Max</span>
                <span className="font-bold text-[#191919]">{motorcycle.power}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-200/60">
                <span className="text-gray-500">Couple Max</span>
                <span className="font-bold text-[#191919]">{motorcycle.torque}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-200/60">
                <span className="text-gray-500">Consommation Moyenne</span>
                <span className="font-bold text-[#191919]">{motorcycle.mileage}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-200/60">
                <span className="text-gray-500">Vitesse Maximale</span>
                <span className="font-bold text-[#191919]">{motorcycle.topSpeed}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-200/60">
                <span className="text-gray-500">Système de Freinage</span>
                <span className="font-bold text-[#191919]">{motorcycle.brakes}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-200/60">
                <span className="text-gray-500">Capacité Réservoir</span>
                <span className="font-bold text-[#191919]">{motorcycle.tankCapacity}</span>
              </div>
            </div>
          </div>

          {/* Connected IZRI Feature */}
          <div className="bg-red-50/70 border border-red-200 rounded-xl p-3 flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-[#E30613] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-[#E30613] block">Connectivité IZRI Mobile Intégrée</span>
              <p className="text-gray-700 text-[11px] leading-relaxed">
                {motorcycle.topFeature}. Ce modèle transmet automatiquement les échéances d'entretien et le carnet digital à l'application mobile de l'acheteur.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-[#F9F9FB] flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#191919] text-white text-xs font-bold hover:bg-black transition-colors"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}
