import React, { useState } from 'react';
import { 
  Zap, 
  Fuel, 
  Gauge, 
  Weight, 
  Sparkles, 
  Check, 
  ChevronRight, 
  ShoppingBag, 
  Layers, 
  Info,
  Camera
} from 'lucide-react';
import MotorcycleVisual from './MotorcycleVisual';

export default function MotorcycleShowcase({ 
  motorcycles = [], 
  onSelectModelDetails = () => {},
  onRequestReplenish = () => {}
}) {
  const [selectedId, setSelectedId] = useState(motorcycles[0]?.id || 'vms-cuxi-2');
  const [selectedColorIndex, setSelectedColorIndex] = useState(1);

  const currentBike = motorcycles.find(m => m.id === selectedId) || motorcycles[0];
  if (!currentBike) return null;

  const activeColorHex = selectedColorIndex === 0 
    ? '#191919' 
    : selectedColorIndex === 1 
    ? '#E30613' 
    : selectedColorIndex === 2 
    ? '#F8FAFC' 
    : '#71717A';

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-card hover:shadow-hover transition-all">
      <div className="flex flex-col lg:flex-row items-stretch gap-4">
        {/* Left: Thumbnail Selector (matching Honda layout reference) */}
        <div className="flex lg:flex-col gap-2 shrink-0 overflow-x-auto lg:overflow-y-auto max-h-[340px] pb-2 lg:pb-0 scrollbar-thin">
          {motorcycles.map((bike) => {
            const isSelected = bike.id === selectedId;
            return (
              <button
                key={bike.id}
                onClick={() => {
                  setSelectedId(bike.id);
                  setSelectedColorIndex(1);
                }}
                className={`relative flex items-center justify-center p-1 rounded-xl border transition-all duration-200 shrink-0 ${
                  isSelected
                    ? 'border-[#E30613] bg-red-50/40 ring-2 ring-[#E30613]/30 shadow-xs'
                    : 'border-gray-200 bg-[#F9F9FB] hover:border-gray-300 hover:bg-gray-100'
                } w-16 h-14 lg:w-16 lg:h-14 overflow-hidden group`}
                title={bike.name}
              >
                {/* Real miniature photo */}
                <img
                  src={bike.image || '/models/vms_cuxi_2.webp'}
                  alt={bike.name}
                  className="w-full h-full object-contain p-0.5 group-hover:scale-110 transition-transform"
                />
                {bike.availableStock <= 50 && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#E30613] ring-2 ring-white"></span>
                )}
              </button>
            );
          })}
        </div>

        {/* Center: Large Featured Motorcycle View with Real Photo */}
        <div className="flex-1 bg-gradient-to-b from-[#F9F9FB] via-[#F4F4F7] to-[#EDEDF2] rounded-xl border border-gray-200/80 p-5 flex flex-col items-center justify-between min-h-[300px] relative overflow-hidden group">
          {/* Top Info Bar inside canvas */}
          <div className="w-full flex items-center justify-between z-10">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white border border-gray-200 text-[#191919] shadow-2xs text-[10px] font-extrabold uppercase tracking-wider">
              <Camera className="w-3 h-3 text-[#E30613]" />
              <span>Modèle Réel VMS Industrie (Akbou)</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-md border border-gray-200 text-[10px] font-bold text-[#191919]">
              <span className={`w-2 h-2 rounded-full ${currentBike.availableStock <= 50 ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`}></span>
              <span>Stock Usine & Réseau: {currentBike.availableStock} unités</span>
            </div>
          </div>

          {/* Big Interactive Real Motorcycle Visual */}
          <div className="w-full py-3 my-auto flex items-center justify-center transform group-hover:scale-103 transition-transform duration-300">
            <MotorcycleVisual 
              modelId={currentBike.id} 
              imageSrc={currentBike.image}
              color={activeColorHex} 
              className="w-full max-w-[440px] h-[220px]" 
            />
          </div>

          {/* Bottom Badge & Model Subtitle */}
          <div className="w-full flex items-center justify-between text-xs text-[#777777] z-10 pt-2 border-t border-gray-200/70">
            <span className="font-semibold text-[#191919]">{currentBike.segment} · Écosystème Connecté IZRI</span>
            <span className="font-mono text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              {currentBike.demandTrend}
            </span>
          </div>
        </div>

        {/* Right: Spec & Pricing Card (as in Honda layout inspiration) */}
        <div className="w-full lg:w-[340px] shrink-0 bg-[#191919] text-white rounded-xl p-4 flex flex-col justify-between shadow-lg relative overflow-hidden">
          {/* Subtle Red glow in corner */}
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#E30613]/25 rounded-full blur-2xl pointer-events-none"></div>

          <div>
            {/* Category Pill & Color Pill */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-white/10 text-red-400 border border-red-500/30">
                {currentBike.subtitle}
              </span>
              <div className="flex items-center gap-1 text-[10px] text-gray-400">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: activeColorHex }}></span>
                <span className="capitalize">{currentBike.colors[selectedColorIndex] || 'Finition'}</span>
              </div>
            </div>

            {/* Model Name & Price */}
            <div className="flex items-baseline justify-between gap-2 border-b border-white/10 pb-3 mb-3">
              <div>
                <h3 className="text-xl font-black tracking-tight text-white">
                  {currentBike.name}
                </h3>
                <p className="text-[11px] text-gray-400 font-medium">
                  {currentBike.category}
                </p>
              </div>
              <div className="text-right">
                <span className="text-[9px] uppercase tracking-wider text-gray-400 block font-semibold">Prix Public Conseillé</span>
                <span className="text-lg font-extrabold text-[#FFFFFF] font-mono tracking-tight">
                  {currentBike.priceDZD.toLocaleString()} <span className="text-xs text-[#E30613]">DZD</span>
                </span>
              </div>
            </div>

            {/* 4 Technical Metrics Grid */}
            <div className="grid grid-cols-2 gap-2 mb-3">
              <div className="bg-white/5 border border-white/10 rounded-lg p-2">
                <div className="flex items-center gap-1.5 text-gray-400 text-[10px] mb-0.5">
                  <Zap className="w-3 h-3 text-amber-400" />
                  <span>Puissance Moteur</span>
                </div>
                <div className="text-xs font-bold text-white truncate">
                  {currentBike.power.split('@')[0]}
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-lg p-2">
                <div className="flex items-center gap-1.5 text-gray-400 text-[10px] mb-0.5">
                  <Fuel className="w-3 h-3 text-emerald-400" />
                  <span>Consommation</span>
                </div>
                <div className="text-xs font-bold text-white truncate">
                  {currentBike.mileage}
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-lg p-2">
                <div className="flex items-center gap-1.5 text-gray-400 text-[10px] mb-0.5">
                  <Layers className="w-3 h-3 text-blue-400" />
                  <span>Réservoir Carburant</span>
                </div>
                <div className="text-xs font-bold text-white truncate">
                  {currentBike.tankCapacity}
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-lg p-2">
                <div className="flex items-center gap-1.5 text-gray-400 text-[10px] mb-0.5">
                  <Weight className="w-3 h-3 text-purple-400" />
                  <span>Poids à Vide</span>
                </div>
                <div className="text-xs font-bold text-white truncate">
                  {currentBike.kerbWeight}
                </div>
              </div>
            </div>

            {/* Top Feature Highlight Banner */}
            <div className="bg-gradient-to-r from-red-950/60 to-black border border-red-500/40 rounded-lg p-2.5 mb-3">
              <div className="flex items-center gap-1 text-[10px] font-extrabold uppercase text-[#E30613] tracking-wider mb-0.5">
                <Sparkles className="w-3 h-3" />
                <span>Spécification Phare</span>
              </div>
              <p className="text-[11px] text-gray-200 leading-tight">
                {currentBike.topFeature}
              </p>
            </div>

            {/* Color Palette Picker */}
            <div className="mb-3">
              <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block mb-1.5">
                Finitions & Teintes d'Usine
              </span>
              <div className="flex items-center gap-2">
                {currentBike.colors.map((colorName, idx) => (
                  <button
                    key={colorName}
                    onClick={() => setSelectedColorIndex(idx)}
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-transform ${
                      selectedColorIndex === idx ? 'scale-110 border-[#E30613]' : 'border-gray-500/50'
                    }`}
                    style={{
                      backgroundColor: idx === 0 ? '#191919' : idx === 1 ? '#E30613' : idx === 2 ? '#FFFFFF' : '#71717A'
                    }}
                    title={colorName}
                  >
                    {selectedColorIndex === idx && (
                      <Check className={`w-3 h-3 ${idx === 2 ? 'text-black' : 'text-white'}`} />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-2 pt-2 border-t border-white/10">
            <button
              onClick={() => onSelectModelDetails(currentBike)}
              className="flex-1 flex items-center justify-center gap-1 py-2 px-3 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors"
            >
              <Info className="w-3.5 h-3.5 text-gray-300" />
              <span>Fiche Complète</span>
            </button>
            <button
              onClick={() => onRequestReplenish(currentBike)}
              className="flex-1 flex items-center justify-center gap-1 py-2 px-3 rounded-lg bg-[#E30613] hover:bg-[#C40510] text-xs font-bold text-white transition-colors shadow-sm"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Réappro Usine</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
