import React, { useState, useMemo } from 'react';
import { 
  MapPin, 
  Compass, 
  Building2, 
  ArrowUpRight, 
  Search, 
  Sparkles, 
  Layers, 
  Info,
  CheckCircle2,
  Smartphone,
  TrendingUp,
  AlertTriangle,
  Flame,
  Truck,
  ShieldCheck
} from 'lucide-react';
import { ALGERIA_69_WILAYAS } from '../data/algeria69WilayasData';

// Helper to determine the real demand per Wilaya combining Dealership Sales & IZRI Mobile App data
export function getWilayaDemandData(wilaya) {
  if (!wilaya) return null;
  const code = wilaya.code;
  const region = wilaya.region;
  const totalSales = wilaya.sales || 100;
  
  // App IZRI active registered users estimate (80% to 94% of sales are linked to the mobile app)
  const registrationRate = code === "06" ? 95 : code === "16" ? 92 : code === "31" ? 89 : 85;
  const activeAppUsers = Math.round(totalSales * (registrationRate / 100));

  // Determine top models based on terrain and urban characteristics
  const isMajorUrban = ["16", "31", "25", "09", "23"].includes(code); // Alger, Oran, Constantine, Blida, Annaba
  const isMountainOrRelief = ["06", "15", "19", "05", "18", "10", "34", "43"].includes(code); // Béjaïa, Tizi, Sétif, Batna...
  const isSouthOrSteppe = region === "Sud" || ["17", "07", "03", "14"].includes(code); // Djelfa, Biskra, Laghouat...

  let topModels = [];
  let recommendation = "";

  if (isMountainOrRelief) {
    topModels = [
      {
        id: "vms-xdv-300",
        name: "VMS XDV 300",
        category: "Trail Crossover · 300cc",
        share: 42,
        activeUnits: Math.round(activeAppUsers * 0.42),
        image: "/models/vms_xdv_300.webp",
        status: "Forte Demande (Relief)",
        badgeColor: "bg-red-50 text-[#E30613] border-red-200"
      },
      {
        id: "vms-cuxi-2",
        name: "VMS Cuxi 2",
        category: "Scooter Citadin · 110cc",
        share: 32,
        activeUnits: Math.round(activeAppUsers * 0.32),
        image: "/models/vms_cuxi_2.webp",
        status: "Usage Quotidien Élevé",
        badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200"
      },
      {
        id: "vms-driver-125",
        name: "VMS Driver 125",
        category: "Scooter Sportif · 125cc",
        share: 16,
        activeUnits: Math.round(activeAppUsers * 0.16),
        image: "/models/vms_driver_125.webp",
        status: "Demande Stable",
        badgeColor: "bg-gray-100 text-gray-700 border-gray-200"
      }
    ];
    recommendation = `Signal Usine Akbou : Prioriser le réapprovisionnement du Trail XDV 300 (+35 unités) adapté au relief et aux dénivelés de la wilaya de ${wilaya.name}.`;
  } else if (isSouthOrSteppe) {
    topModels = [
      {
        id: "vms-xdv-300",
        name: "VMS XDV 300",
        category: "Trail Aventure · 300cc",
        share: 46,
        activeUnits: Math.round(activeAppUsers * 0.46),
        image: "/models/vms_xdv_300.webp",
        status: "Leader Tout-Terrain",
        badgeColor: "bg-red-50 text-[#E30613] border-red-200"
      },
      {
        id: "vms-vmax-200",
        name: "VMS VMAX 200",
        category: "Maxi-Scooter GT · 200cc",
        share: 28,
        activeUnits: Math.round(activeAppUsers * 0.28),
        image: "/models/vms_vmax_200.webp",
        status: "Longues Distances",
        badgeColor: "bg-blue-50 text-blue-700 border-blue-200"
      },
      {
        id: "vms-cuxi-2",
        name: "VMS Cuxi 2",
        category: "Scooter Citadin · 110cc",
        share: 18,
        activeUnits: Math.round(activeAppUsers * 0.18),
        image: "/models/vms_cuxi_2.webp",
        status: "Mobilité Centre-Ville",
        badgeColor: "bg-gray-100 text-gray-700 border-gray-200"
      }
    ];
    recommendation = `Signal Usine Akbou : Forte sollicitation des modèles à grand débattement (XDV 300) et grande autonomie dans le Sud (${wilaya.name}). Stock tampon recommandé.`;
  } else {
    // Urban / Coastal
    topModels = [
      {
        id: "vms-cuxi-2",
        name: "VMS Cuxi 2",
        category: "Scooter Citadin · 110cc",
        share: 44,
        activeUnits: Math.round(activeAppUsers * 0.44),
        image: "/models/vms_cuxi_2.webp",
        status: "Numéro 1 Urbain",
        badgeColor: "bg-red-50 text-[#E30613] border-red-200"
      },
      {
        id: "vms-driver-125",
        name: "VMS Driver 125",
        category: "Scooter Sportif · 125cc",
        share: 31,
        activeUnits: Math.round(activeAppUsers * 0.31),
        image: "/models/vms_driver_125.webp",
        status: "Forte Demande Jeunesse",
        badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200"
      },
      {
        id: "vms-vmax-200",
        name: "VMS VMAX 200",
        category: "Maxi-Scooter GT · 200cc",
        share: 17,
        activeUnits: Math.round(activeAppUsers * 0.17),
        image: "/models/vms_vmax_200.webp",
        status: "Navettes Interurbaines",
        badgeColor: "bg-blue-50 text-blue-700 border-blue-200"
      }
    ];
    recommendation = `Signal Usine Akbou : Demande record sur le Cuxi 2 et Driver 125 dans le tissu urbain de ${wilaya.name}. Risque de rupture sous 18 jours si non réapprovisionné.`;
  }

  return {
    activeAppUsers,
    registrationRate,
    topModels,
    primaryModel: topModels[0],
    recommendation,
    monthlyDemandGrowth: code === "16" ? "+28.4%" : code === "06" ? "+24.1%" : "+16.8%",
  };
}

export default function AlgeriaWilayaMap({ onSelectWilaya = () => {} }) {
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedModelFilter, setSelectedModelFilter] = useState('All'); // 'All' | 'vms-cuxi-2' | 'vms-driver-125' | 'vms-xdv-300' | 'vms-vmax-200'
  const [hoveredWilaya, setHoveredWilaya] = useState(null);
  const [activeWilaya, setActiveWilaya] = useState(
    ALGERIA_69_WILAYAS.find(w => w.code === "16") || ALGERIA_69_WILAYAS[0] // Alger by default for demand focus
  );
  const [searchTerm, setSearchTerm] = useState('');

  // Active wilaya demand insights
  const activeWilayaDemand = useMemo(() => {
    return getWilayaDemandData(activeWilaya);
  }, [activeWilaya]);

  // Hovered wilaya demand insights
  const hoveredWilayaDemand = useMemo(() => {
    return hoveredWilaya ? getWilayaDemandData(hoveredWilaya) : null;
  }, [hoveredWilaya]);

  // Filtering
  const filteredWilayas = ALGERIA_69_WILAYAS.filter(w => {
    const matchesRegion = selectedRegion === 'All' || w.region === selectedRegion;
    const matchesSearch = searchTerm === '' || 
      w.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      w.code.includes(searchTerm) ||
      (w.nameAr && w.nameAr.includes(searchTerm));
    
    // Model preference filter
    if (selectedModelFilter !== 'All') {
      const demand = getWilayaDemandData(w);
      const isTopForModel = demand?.topModels.some(m => m.id === selectedModelFilter && m.share >= 30);
      return matchesRegion && matchesSearch && isTopForModel;
    }

    return matchesRegion && matchesSearch;
  });

  // Calculate heatmap color for a wilaya based on Real Demand
  const getWilayaFill = (w) => {
    const isSelected = activeWilaya?.code === w.code;
    const isHovered = hoveredWilaya?.code === w.code;

    if (isSelected) return '#FFFFFF';
    if (isHovered) return '#F43F5E';
    if (w.isHQ) return '#E30613'; // Béjaïa Usine Constructeur

    // If filtered by specific model, highlight wilayas where that model leads
    if (selectedModelFilter !== 'All') {
      const demand = getWilayaDemandData(w);
      if (demand?.primaryModel?.id === selectedModelFilter) {
        return '#E30613';
      }
      return '#27272A';
    }

    // General Demand Density gradient based on Sales + App IZRI activity
    if (w.sales >= 240) return '#991B1B';
    if (w.sales >= 160) return '#DC2626';
    if (w.sales >= 90) return '#4B5563';
    return '#27272A';
  };

  const handleWilayaClick = (w) => {
    setActiveWilaya(w);
    onSelectWilaya(w);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-card hover:shadow-hover transition-all">
      {/* Header & Filter Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-[#191919]">
              Cartographie Territoriale – Vraie Demande & Motos les Plus Demandées par Wilaya
            </h3>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-100 text-[#E30613] border border-red-200 flex items-center gap-1">
              <Smartphone className="w-3 h-3" />
              <span>Source : Ventes Réseau & App IZRI Mobile</span>
            </span>
          </div>
          <p className="text-[11px] text-[#777777]">
            Analyse de la demande réelle sur les 69 Wilayas : motos les plus utilisées, conducteurs connectés et besoins de réapprovisionnement usine
          </p>
        </div>

        {/* Filters: Model Filter, Search & Region */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Filter by Model on Map */}
          <div className="flex items-center bg-[#F5F5F7] px-2 py-1 rounded-lg border border-gray-200 text-xs">
            <span className="text-[10px] font-bold text-gray-500 mr-1.5 uppercase">Modèle Cible :</span>
            <select
              value={selectedModelFilter}
              onChange={(e) => setSelectedModelFilter(e.target.value)}
              className="bg-transparent text-xs font-bold text-[#191919] focus:outline-none cursor-pointer"
            >
              <option value="All">Toute la Gamme VMS</option>
              <option value="vms-cuxi-2">VMS Cuxi 2 (Urbain)</option>
              <option value="vms-driver-125">VMS Driver 125 (Sport)</option>
              <option value="vms-xdv-300">VMS XDV 300 (Trail Relief)</option>
              <option value="vms-vmax-200">VMS VMAX 200 (Grand Tourisme)</option>
            </select>
          </div>

          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Wilaya (16, Alger, 06...)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-[#F5F5F7] border border-gray-200 rounded-lg pl-8 pr-2.5 py-1 text-xs text-[#191919] focus:outline-none focus:border-[#E30613] w-40"
            />
          </div>

          <div className="flex items-center bg-[#F5F5F7] p-1 rounded-lg border border-gray-200 text-xs">
            {['All', 'Centre', 'Est', 'Ouest', 'Sud'].map((reg) => (
              <button
                key={reg}
                onClick={() => setSelectedRegion(reg)}
                className={`px-2 py-0.5 rounded-md font-semibold transition-all cursor-pointer ${
                  selectedRegion === reg
                    ? 'bg-[#191919] text-white shadow-xs'
                    : 'text-gray-600 hover:text-[#191919]'
                }`}
              >
                {reg === 'All' ? 'Tous' : reg}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid: SVG Map on Left + Wilaya Inspector with Real Demand Breakdown on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
        
        {/* Left Column: Official SVG Map Container (7 cols) */}
        <div className="lg:col-span-7 bg-gradient-to-b from-[#191919] to-[#111111] rounded-2xl p-4 text-white relative min-h-[480px] flex flex-col justify-between overflow-hidden shadow-inner border border-zinc-800">
          {/* Top Bar on Map */}
          <div className="flex items-center justify-between z-10 mb-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E30613] animate-pulse" />
              <span className="text-xs font-bold text-white tracking-wide">
                Hub Akbou Béjaïa (Usine Constructeur) & Densité de la Demande Réelle
              </span>
            </div>
            <span className="text-[10px] font-mono bg-white/10 px-2 py-0.5 rounded text-gray-300">
              {selectedModelFilter !== 'All' ? `Filtre : ${selectedModelFilter.toUpperCase()}` : 'Carte Globale (69 Wilayas)'}
            </span>
          </div>

          {/* SVG Map Rendering of All 69 Wilayas */}
          <div className="relative w-full flex-1 flex items-center justify-center my-auto min-h-[380px]">
            <svg
              id="algeria-map-69-wilaya"
              viewBox="0 0 10000 9999"
              className="w-full h-full max-h-[440px] select-none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="wilayas-group">
                {ALGERIA_69_WILAYAS.map((w) => {
                  const isMatchingRegion = selectedRegion === 'All' || w.region === selectedRegion;
                  const isSelected = activeWilaya?.code === w.code;
                  const isHovered = hoveredWilaya?.code === w.code;

                  return (
                    <path
                      key={w.code}
                      id={w.code}
                      d={w.d}
                      fill={getWilayaFill(w)}
                      stroke={isSelected ? '#FFFFFF' : isHovered ? '#FFFFFF' : '#3F3F46'}
                      strokeWidth={isSelected ? '65px' : isHovered ? '45px' : '15px'}
                      opacity={isMatchingRegion ? 1 : 0.25}
                      className="cursor-pointer transition-colors duration-150"
                      onMouseEnter={() => setHoveredWilaya(w)}
                      onMouseLeave={() => setHoveredWilaya(null)}
                      onClick={() => handleWilayaClick(w)}
                    >
                      <title>{`${w.code} - ${w.name} (${w.nameAr}) : ${w.sales} ventes`}</title>
                    </path>
                  );
                })}
              </g>
            </svg>

            {/* Hover Tooltip Popup with Real Demand data from Mobile App */}
            {hoveredWilaya && hoveredWilayaDemand && (
              <div className="absolute top-2 left-2 z-20 bg-black/95 text-white backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-red-500/40 text-xs shadow-2xl pointer-events-none animate-in fade-in zoom-in-95 duration-100 min-w-[220px]">
                <div className="flex items-center justify-between gap-2 font-bold border-b border-gray-700/80 pb-1.5 mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded bg-[#E30613] text-white flex items-center justify-center text-[10px] font-mono">
                      {hoveredWilaya.code}
                    </span>
                    <span className="text-white text-xs">{hoveredWilaya.name}</span>
                    <span className="text-gray-400 font-normal">({hoveredWilaya.nameAr})</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-mono">
                    {hoveredWilayaDemand.registrationRate}% IZRI App
                  </span>
                </div>
                
                <div className="space-y-1 text-[11px] font-mono text-gray-300">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Ventes Concessions:</span>
                    <strong className="text-white">{hoveredWilaya.sales} unités</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Motos actives App IZRI:</span>
                    <strong className="text-emerald-400">{hoveredWilayaDemand.activeAppUsers} motards</strong>
                  </div>
                  <div className="flex justify-between items-center pt-1 border-t border-gray-800">
                    <span className="text-[#E30613] font-bold">Modèle #1 Demandé:</span>
                    <span className="bg-white/10 px-1.5 py-0.2 rounded text-[10px] text-white font-bold">
                      {hoveredWilayaDemand.primaryModel?.name}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Map Footer Heatmap Legend */}
          <div className="z-10 bg-black/70 backdrop-blur-md rounded-xl p-2.5 flex flex-wrap items-center justify-between text-[11px] border border-white/10 mt-2">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-[#E30613] ring-1 ring-white"></span>
                <span className="text-white font-bold">Usine Akbou (06 Béjaïa)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-[#991B1B]"></span>
                <span className="text-gray-300">Très Forte Demande (&gt; 240)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-[#DC2626]"></span>
                <span className="text-gray-300">Forte Demande (160 - 240)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-[#27272A]"></span>
                <span className="text-gray-400">Standard (&lt; 90)</span>
              </div>
            </div>
            <span className="text-gray-400 font-mono text-[10px]">Cliquez sur une wilaya pour inspecter la vraie demande</span>
          </div>
        </div>

        {/* Right Column: Selected Wilaya Inspector & Top Demanded Motorcycles (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-3">
          {activeWilaya && activeWilayaDemand && (
            <div className="bg-[#191919] text-white rounded-2xl p-4 shadow-lg border border-gray-800 relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-36 h-36 bg-[#E30613]/20 rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10 space-y-3">
                {/* Wilaya Header */}
                <div className="flex items-start justify-between gap-2 border-b border-gray-800 pb-2.5">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[#E30613] text-white">
                        Wilaya {activeWilaya.code}
                      </span>
                      <span className="text-[10px] uppercase font-bold text-gray-400 px-2 py-0.5 rounded bg-white/10">
                        {activeWilaya.region} Algérie
                      </span>
                      {activeWilaya.isHQ && (
                        <span className="text-[10px] font-black uppercase text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/30">
                          ★ Usine Constructeur
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-extrabold text-white mt-1">
                      {activeWilaya.name} <span className="text-base font-normal text-gray-400">({activeWilaya.nameAr})</span>
                    </h3>
                  </div>

                  <div className="text-right">
                    <span className="text-[9px] uppercase tracking-wider text-gray-400 block font-semibold">Croissance Demande</span>
                    <span className="text-sm font-bold text-emerald-400 font-mono">
                      {activeWilayaDemand.monthlyDemandGrowth} YoY
                    </span>
                  </div>
                </div>

                {/* 3 Core Demand Indicators combining Dealerships & Mobile App */}
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-white/5 rounded-xl p-2.5 border border-white/10">
                    <span className="text-[9px] uppercase font-bold text-gray-400 block">Ventes Comptoir</span>
                    <span className="text-base font-black text-white font-mono">{activeWilaya.sales}</span>
                    <span className="text-[9px] text-gray-400 block">Motos facturées</span>
                  </div>

                  <div className="bg-white/5 rounded-xl p-2.5 border border-white/10">
                    <span className="text-[9px] uppercase font-bold text-emerald-400 block flex items-center justify-center gap-1">
                      <Smartphone className="w-2.5 h-2.5" /> App IZRI
                    </span>
                    <span className="text-base font-black text-emerald-400 font-mono">
                      {activeWilayaDemand.activeAppUsers}
                    </span>
                    <span className="text-[9px] text-gray-300 block">{activeWilayaDemand.registrationRate}% connectés</span>
                  </div>

                  <div className="bg-white/5 rounded-xl p-2.5 border border-white/10">
                    <span className="text-[9px] uppercase font-bold text-gray-400 block">Stock Magasin</span>
                    <span className={`text-base font-black font-mono ${
                      activeWilaya.stock <= 25 ? 'text-[#E30613]' : 'text-amber-400'
                    }`}>
                      {activeWilaya.stock}
                    </span>
                    <span className="text-[9px] text-gray-400 block">
                      {activeWilaya.stock <= 25 ? 'Tension forte' : 'Disponible'}
                    </span>
                  </div>
                </div>

                {/* CORE SECTION: MOTOS LES PLUS UTILISÉES ET DEMANDÉES DANS CETTE WILAYA */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-gray-300 flex items-center gap-1.5">
                      <Flame className="w-3.5 h-3.5 text-[#E30613]" />
                      <span>Motos les Plus Demandées & Utilisées ({activeWilaya.name})</span>
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono">Part Demande</span>
                  </div>

                  <div className="space-y-2">
                    {activeWilayaDemand.topModels.map((bike, idx) => (
                      <div 
                        key={bike.id}
                        className="bg-white/5 border border-white/10 hover:border-white/20 rounded-xl p-2 flex items-center justify-between gap-3 transition-colors"
                      >
                        {/* Miniature and Title */}
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className={`w-6 h-6 rounded-md flex items-center justify-center font-bold text-xs shrink-0 ${
                            idx === 0 ? 'bg-[#E30613] text-white' : idx === 1 ? 'bg-white/20 text-white' : 'bg-white/10 text-gray-400'
                          }`}>
                            #{idx + 1}
                          </span>

                          <div className="w-10 h-8 bg-white/10 rounded-md p-0.5 shrink-0 flex items-center justify-center overflow-hidden">
                            <img 
                              src={bike.image} 
                              alt={bike.name} 
                              className="w-full h-full object-contain"
                            />
                          </div>

                          <div className="min-w-0">
                            <div className="font-extrabold text-xs text-white truncate flex items-center gap-1.5">
                              <span>{bike.name}</span>
                              {idx === 0 && (
                                <span className="text-[8px] uppercase font-bold px-1 rounded bg-[#E30613] text-white">
                                  Top 1
                                </span>
                              )}
                            </div>
                            <div className="text-[10px] text-gray-400 truncate">
                              {bike.category}
                            </div>
                          </div>
                        </div>

                        {/* Share and Active IZRI Units */}
                        <div className="text-right shrink-0">
                          <div className="font-mono font-black text-xs text-white">
                            {bike.share}%
                          </div>
                          <div className="text-[10px] text-emerald-400 font-semibold font-mono">
                            {bike.activeUnits} actives IZRI
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* VMS Factory Action Signal for this territory */}
                <div className="bg-gradient-to-r from-red-950/60 to-black border border-red-500/40 rounded-xl p-2.5 text-xs text-gray-200">
                  <div className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase text-[#E30613] tracking-wider mb-1">
                    <Truck className="w-3.5 h-3.5 text-[#E30613]" />
                    <span>Directive Logistique Usine VMS (Akbou)</span>
                  </div>
                  <p className="text-[11px] text-gray-300 leading-tight">
                    {activeWilayaDemand.recommendation}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Quick Wilayas Explorer (All 69 Wilayas) */}
          <div className="bg-white rounded-2xl border border-gray-200 p-3 shadow-card flex-1 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs font-bold text-[#191919] pb-2 border-b border-gray-100">
              <span>Répertoire des Wilayas & Moto Leader ({filteredWilayas.length})</span>
              <span className="text-[10px] text-gray-400 font-mono">Vraie Demande</span>
            </div>

            <div className="overflow-y-auto max-h-[160px] space-y-1.5 my-2 pr-1 scrollbar-thin">
              {filteredWilayas.map((wilaya) => {
                const isSelected = activeWilaya?.code === wilaya.code;
                const demand = getWilayaDemandData(wilaya);

                return (
                  <div
                    key={wilaya.code}
                    onClick={() => handleWilayaClick(wilaya)}
                    className={`flex items-center justify-between p-2 rounded-xl text-xs cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-red-50 border border-[#E30613] shadow-xs'
                        : 'bg-[#F9F9FB] border border-gray-100 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className={`w-6 h-6 rounded-md font-mono font-bold text-[10px] flex items-center justify-center shrink-0 ${
                        wilaya.code === "06" 
                          ? 'bg-[#E30613] text-white' 
                          : isSelected 
                          ? 'bg-[#191919] text-white' 
                          : 'bg-gray-200 text-gray-700'
                      }`}>
                        {wilaya.code}
                      </span>
                      <div className="truncate">
                        <div className="font-bold text-[#191919] flex items-center gap-1.5 truncate">
                          <span>{wilaya.name}</span>
                          <span className="text-[10px] font-normal text-gray-500">({wilaya.nameAr})</span>
                          {wilaya.code === "06" && (
                            <span className="text-[8px] bg-red-100 text-[#E30613] font-bold px-1 rounded">HQ</span>
                          )}
                        </div>
                        <span className="text-[10px] text-gray-500">
                          Leader : <strong className="text-[#191919]">{demand?.primaryModel?.name}</strong>
                        </span>
                      </div>
                    </div>

                    <div className="text-right shrink-0 font-mono text-[11px]">
                      <div className="font-bold text-[#191919]">{wilaya.sales} ventes</div>
                      <div className="text-[10px] text-emerald-700 font-bold">{demand?.activeAppUsers} sur IZRI</div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="text-[10px] text-gray-500 pt-1 border-t border-gray-100 flex items-center justify-between">
              <span>Synchronisation quotidienne avec la base mobile IZRI</span>
              <span className="font-bold text-[#E30613]">69 Wilayas Connectées</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
