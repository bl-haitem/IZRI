import React, { useState, useMemo } from 'react';
import { 
  Wrench, 
  ShieldCheck, 
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Bike,
  Smartphone,
  MapPin,
  Truck,
  TrendingUp,
  Package,
  Layers,
  Sparkles,
  Search,
  Filter,
  Check,
  Send
} from 'lucide-react';
import { MAINTENANCE_ANALYTICS } from '../data/mockData';

// Regional & Wilaya Maintenance + Detailed Spare Parts Demand breakdown
const WILAYA_MAINTENANCE_DATA = [
  {
    code: "16",
    name: "Alger",
    region: "Centre",
    workshopRevisions: 940,
    activeAppBooks: 865,
    appComplianceRate: 92.0,
    urgency: "Forte Sollicitation",
    factoryDirective: "Usine Akbou : Expédier d'urgence un lot de 250 jeux de plaquettes et 120 courroies vers le hub Alger & Blida pour couvrir la forte demande urbaine.",
    parts: [
      {
        name: "Plaquettes de Frein AV Céramique",
        ref: "OEM-VMS-BRK-110",
        category: "Freinage & Sécurité",
        compatibleModels: "VMS Cuxi 2, Driver 125",
        localDemand: 420,
        concessionStock: 25,
        factoryStock: 650,
        status: "Rupture Imminente",
        statusColor: "bg-red-100 text-[#E30613] border-red-200"
      },
      {
        name: "Courroie de Transmission Renforcée",
        ref: "OEM-VMS-BLT-743",
        category: "Transmission & Variateur",
        compatibleModels: "VMS Cuxi 2, VMAX 200",
        localDemand: 240,
        concessionStock: 18,
        factoryStock: 420,
        status: "Stock Faible",
        statusColor: "bg-amber-100 text-amber-800 border-amber-200"
      },
      {
        name: "Galets de Variateur Haute Résistance (12g)",
        ref: "OEM-VMS-ROL-12G",
        category: "Transmission & Variateur",
        compatibleModels: "VMS Driver 125, Cuxi 2",
        localDemand: 195,
        concessionStock: 34,
        factoryStock: 380,
        status: "Stock Normal",
        statusColor: "bg-gray-100 text-gray-800 border-gray-200"
      },
      {
        name: "Pneu Arrière Tubeless 100/90-10",
        ref: "OEM-VMS-TYR-10R",
        category: "Châssis & Liaison Sol",
        compatibleModels: "VMS Cuxi 2",
        localDemand: 165,
        concessionStock: 12,
        factoryStock: 290,
        status: "Critique",
        statusColor: "bg-red-100 text-[#E30613] border-red-200"
      },
      {
        name: "Filtre à Huile Haute Pression",
        ref: "OEM-VMS-FLT-02H",
        category: "Moteur & Filtration",
        compatibleModels: "VMS VMAX 200, Victoria 300",
        localDemand: 180,
        concessionStock: 45,
        factoryStock: 850,
        status: "Optimal",
        statusColor: "bg-emerald-100 text-emerald-800 border-emerald-200"
      }
    ],
    topMaintainedModels: [
      { name: "VMS Cuxi 2", share: 44, revisions: 414, mainService: "Vidange Motul 10W40 & Plaquettes AV" },
      { name: "VMS Driver 125", share: 32, revisions: 301, mainService: "Galets de variateur & Réglage Frein" },
      { name: "VMS VMAX 200", share: 18, revisions: 169, mainService: "Courroie & Filtre à Huile" }
    ]
  },
  {
    code: "06",
    name: "Béjaïa (Hub Usine)",
    region: "Est",
    workshopRevisions: 680,
    activeAppBooks: 645,
    appComplianceRate: 94.8,
    urgency: "Stock Usine Direct",
    factoryDirective: "Ateliers Taharacht Akbou : Disponibilité immédiate sur site. Forte usure des suspensions et filtres due au relief montagneux.",
    parts: [
      {
        name: "Filtre à Air Haute Filtration Poussière",
        ref: "OEM-VMS-AIR-300X",
        category: "Moteur & Filtration",
        compatibleModels: "VMS XDV 300, Driver 125",
        localDemand: 310,
        concessionStock: 85,
        factoryStock: 1200,
        status: "Optimal (Usine)",
        statusColor: "bg-emerald-100 text-emerald-800 border-emerald-200"
      },
      {
        name: "Amortisseur AR Renforcé Gaz Réglable",
        ref: "OEM-VMS-SHK-KYB",
        category: "Châssis & Suspension",
        compatibleModels: "VMS XDV 300",
        localDemand: 140,
        concessionStock: 22,
        factoryStock: 180,
        status: "À Surveiller",
        statusColor: "bg-amber-100 text-amber-800 border-amber-200"
      },
      {
        name: "Kit Chaîne & Pignon Renforcé 428H",
        ref: "OEM-VMS-CHN-428",
        category: "Transmission & Variateur",
        compatibleModels: "VMS Driver 125, Motos VMS",
        localDemand: 125,
        concessionStock: 35,
        factoryStock: 340,
        status: "Normal",
        statusColor: "bg-gray-100 text-gray-800 border-gray-200"
      },
      {
        name: "Bougies NGK Iridium Haute Performance",
        ref: "OEM-VMS-SPK-NGK",
        category: "Allumage & Électronique",
        compatibleModels: "VMS XDV 300, Cuxi 2",
        localDemand: 220,
        concessionStock: 95,
        factoryStock: 1400,
        status: "Optimal",
        statusColor: "bg-emerald-100 text-emerald-800 border-emerald-200"
      }
    ],
    topMaintainedModels: [
      { name: "VMS XDV 300", share: 48, revisions: 326, mainService: "Filtre à air haute filtration & Suspensions" },
      { name: "VMS Cuxi 2", share: 28, revisions: 190, mainService: "Vidange & Nettoyage Carburateur/Injection" },
      { name: "VMS Driver 125", share: 18, revisions: 122, mainService: "Kit Chaîne & Pneus mixtes" }
    ]
  },
  {
    code: "31",
    name: "Oran",
    region: "Ouest",
    workshopRevisions: 620,
    activeAppBooks: 550,
    appComplianceRate: 88.7,
    urgency: "Forte Demande",
    factoryDirective: "Usine Akbou : Réassort programmé de 90 courroies renforcées et 110 kits disques pour les maxi-scooters d'Oran.",
    parts: [
      {
        name: "Courroie de Transmission Gates Powerlink",
        ref: "OEM-VMS-BLT-GAT",
        category: "Transmission & Variateur",
        compatibleModels: "VMS VMAX 200, Victoria 300",
        localDemand: 280,
        concessionStock: 14,
        factoryStock: 420,
        status: "Critique",
        statusColor: "bg-red-100 text-[#E30613] border-red-200"
      },
      {
        name: "Plaquettes de Frein AV Double Disque ABS",
        ref: "OEM-VMS-BRK-VMX",
        category: "Freinage & Sécurité",
        compatibleModels: "VMS VMAX 200",
        localDemand: 210,
        concessionStock: 20,
        factoryStock: 650,
        status: "Stock Faible",
        statusColor: "bg-amber-100 text-amber-800 border-amber-200"
      },
      {
        name: "Variateur Complet Sport Usiné",
        ref: "OEM-VMS-VAR-125S",
        category: "Transmission & Variateur",
        compatibleModels: "VMS Driver 125",
        localDemand: 115,
        concessionStock: 8,
        factoryStock: 190,
        status: "Critique",
        statusColor: "bg-red-100 text-[#E30613] border-red-200"
      },
      {
        name: "Batterie Gel 12V 9Ah Résistante",
        ref: "OEM-VMS-BAT-09G",
        category: "Allumage & Électronique",
        compatibleModels: "Toute Gamme VMS",
        localDemand: 145,
        concessionStock: 28,
        factoryStock: 520,
        status: "Normal",
        statusColor: "bg-gray-100 text-gray-800 border-gray-200"
      }
    ],
    topMaintainedModels: [
      { name: "VMS Cuxi 2", share: 40, revisions: 248, mainService: "Vidange & Courroie de transmission" },
      { name: "VMS VMAX 200", share: 28, revisions: 174, mainService: "Plaquettes ABS & Révision 5000 km" },
      { name: "VMS Driver 125", share: 24, revisions: 149, mainService: "Contrôle électrique & Allumage" }
    ]
  },
  {
    code: "19",
    name: "Sétif",
    region: "Est",
    workshopRevisions: 490,
    activeAppBooks: 436,
    appComplianceRate: 89.0,
    urgency: "Attention Hiver / Froid",
    factoryDirective: "Usine Akbou : Préparer la dotation hivernale des Hauts Plateaux (antigel, batteries grand froid et bougies thermiques pour Sétif).",
    parts: [
      {
        name: "Batterie Gel Haute Résistance au Froid (-15°C)",
        ref: "OEM-VMS-BAT-CLD",
        category: "Allumage & Électronique",
        compatibleModels: "Toute Gamme VMS",
        localDemand: 230,
        concessionStock: 16,
        factoryStock: 520,
        status: "Urgence Hiver",
        statusColor: "bg-red-100 text-[#E30613] border-red-200"
      },
      {
        name: "Liquide de Refroidissement Antigel -25°C",
        ref: "OEM-VMS-COL-5L",
        category: "Moteur & Filtration",
        compatibleModels: "VMS VMAX 200, XDV 300",
        localDemand: 340,
        concessionStock: 35,
        factoryStock: 1100,
        status: "Forte Demande",
        statusColor: "bg-amber-100 text-amber-800 border-amber-200"
      },
      {
        name: "Plaquettes de Frein Tout-Terrain",
        ref: "OEM-VMS-BRK-XDV",
        category: "Freinage & Sécurité",
        compatibleModels: "VMS XDV 300",
        localDemand: 180,
        concessionStock: 22,
        factoryStock: 650,
        status: "Normal",
        statusColor: "bg-gray-100 text-gray-800 border-gray-200"
      },
      {
        name: "Filtre à Air Haute Densité",
        ref: "OEM-VMS-AIR-STD",
        category: "Moteur & Filtration",
        compatibleModels: "VMS Driver 125, Cuxi 2",
        localDemand: 160,
        concessionStock: 40,
        factoryStock: 890,
        status: "Optimal",
        statusColor: "bg-emerald-100 text-emerald-800 border-emerald-200"
      }
    ],
    topMaintainedModels: [
      { name: "VMS XDV 300", share: 42, revisions: 206, mainService: "Changement Filtre Air & Bougie Hiver" },
      { name: "VMS Driver 125", share: 34, revisions: 166, mainService: "Vidange 10W40 & Câbles Frein" },
      { name: "VMS Cuxi 2", share: 20, revisions: 98, mainService: "Batterie & Contrôle Démarreur" }
    ]
  },
  {
    code: "25",
    name: "Constantine",
    region: "Est",
    workshopRevisions: 410,
    activeAppBooks: 365,
    appComplianceRate: 89.0,
    urgency: "Normale",
    factoryDirective: "Usine Akbou : Maintenir le flux bimensuel vers le Hub Ali Mendjeli pour les pièces d'usure courante.",
    parts: [
      {
        name: "Plaquettes de Frein AV/AR Céramique",
        ref: "OEM-VMS-BRK-110",
        category: "Freinage & Sécurité",
        compatibleModels: "VMS Cuxi 2, XDV 300",
        localDemand: 195,
        concessionStock: 18,
        factoryStock: 650,
        status: "Stock Faible",
        statusColor: "bg-amber-100 text-amber-800 border-amber-200"
      },
      {
        name: "Silentblocs & Amortisseurs Arrière",
        ref: "OEM-VMS-SLB-KYB",
        category: "Châssis & Suspension",
        compatibleModels: "VMS XDV 300, Driver 125",
        localDemand: 110,
        concessionStock: 12,
        factoryStock: 240,
        status: "Surveillance",
        statusColor: "bg-amber-100 text-amber-800 border-amber-200"
      },
      {
        name: "Câbles Accélérateur & Frein Tambour",
        ref: "OEM-VMS-CBL-SET",
        category: "Commandes & Câblerie",
        compatibleModels: "VMS Cuxi 2",
        localDemand: 130,
        concessionStock: 30,
        factoryStock: 410,
        status: "Normal",
        statusColor: "bg-gray-100 text-gray-800 border-gray-200"
      }
    ],
    topMaintainedModels: [
      { name: "VMS XDV 300", share: 38, revisions: 156, mainService: "Plaquettes de frein & Amortisseurs" },
      { name: "VMS Driver 125", share: 35, revisions: 143, mainService: "Révision de rodage 1000 km" },
      { name: "VMS VMAX 200", share: 22, revisions: 90, mainService: "Vidange moteur & transmission" }
    ]
  },
  {
    code: "01",
    name: "Sud (Adrar, Ghardaïa, Biskra)",
    region: "Sud",
    workshopRevisions: 380,
    activeAppBooks: 325,
    appComplianceRate: 85.5,
    urgency: "Chaleur & Poussière",
    factoryDirective: "Usine Akbou : Expédition urgente de pré-filtres à air cyclone et radiateurs étanches pour le Sahara.",
    parts: [
      {
        name: "Pré-filtre à Air Cyclone Spécial Poussière & Sable",
        ref: "OEM-VMS-FLT-DES",
        category: "Moteur & Filtration",
        compatibleModels: "VMS XDV 300, Cuxi 2",
        localDemand: 380,
        concessionStock: 10,
        factoryStock: 580,
        status: "Rupture Critique",
        statusColor: "bg-red-100 text-[#E30613] border-red-200"
      },
      {
        name: "Radiateur Aluminium & Durites Renforcées",
        ref: "OEM-VMS-RAD-XDV",
        category: "Refroidissement",
        compatibleModels: "VMS XDV 300, VMAX 200",
        localDemand: 160,
        concessionStock: 12,
        factoryStock: 310,
        status: "Chaleur Extrême",
        statusColor: "bg-amber-100 text-amber-800 border-amber-200"
      },
      {
        name: "Pneu Tout-Terrain Renforcé Anti-Crevaison",
        ref: "OEM-VMS-TYR-ADV",
        category: "Châssis & Liaison Sol",
        compatibleModels: "VMS XDV 300",
        localDemand: 140,
        concessionStock: 8,
        factoryStock: 220,
        status: "Critique",
        statusColor: "bg-red-100 text-[#E30613] border-red-200"
      },
      {
        name: "Courroie Heavy-Duty Température Élevée",
        ref: "OEM-VMS-BLT-HD",
        category: "Transmission & Variateur",
        compatibleModels: "VMS VMAX 200, Cuxi 2",
        localDemand: 175,
        concessionStock: 15,
        factoryStock: 340,
        status: "Stock Faible",
        statusColor: "bg-amber-100 text-amber-800 border-amber-200"
      }
    ],
    topMaintainedModels: [
      { name: "VMS XDV 300", share: 55, revisions: 209, mainService: "Double filtration air & Protection sable" },
      { name: "VMS VMAX 200", share: 26, revisions: 99, mainService: "Liquide de refroidissement & Radiateur" },
      { name: "VMS Cuxi 2", share: 15, revisions: 57, mainService: "Pneus renforcés & Filtre essence" }
    ]
  }
];

export default function MaintenanceAnalyticsPage() {
  const { totalRecords, activeWarranties, avgServiceIntervalDays, commonServices, partReplacements } = MAINTENANCE_ANALYTICS;

  const [selectedWilayaCode, setSelectedWilayaCode] = useState("16"); // Default Alger
  const [replenishSuccessMsg, setReplenishSuccessMsg] = useState(null);

  const activeWilayaData = useMemo(() => {
    return WILAYA_MAINTENANCE_DATA.find(w => w.code === selectedWilayaCode) || WILAYA_MAINTENANCE_DATA[0];
  }, [selectedWilayaCode]);

  const handleOrderParts = (part) => {
    setReplenishSuccessMsg(`Ordre d'expédition Usine Akbou créé : 50x ${part.name} vers ${activeWilayaData.name}.`);
    setTimeout(() => setReplenishSuccessMsg(null), 4000);
  };

  return (
    <div className="space-y-4 pb-12">
      {/* Toast Feedback */}
      {replenishSuccessMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#191919] text-white px-4 py-3 rounded-xl shadow-2xl border-l-4 border-l-[#E30613] flex items-center gap-2 text-xs font-semibold animate-in fade-in slide-in-from-bottom duration-200">
          <Truck className="w-4 h-4 text-[#E30613] shrink-0" />
          <span>{replenishSuccessMsg}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-extrabold text-[#191919]">
              Analytique Maintenance & Pièces de Rechange par Wilaya
            </h2>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1">
              <Smartphone className="w-3 h-3 text-emerald-600" />
              <span>Carnets Digitaux IZRI Mobile & Concessions</span>
            </span>
          </div>
          <p className="text-xs text-[#777777]">
            Suivi des révisions, kilomètres réels, usure des composants et approvisionnement des pièces de rechange par territoire
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-lg bg-gray-100 border border-gray-200 text-[#191919]">
            {totalRecords.toLocaleString()} Révisions Certifiées
          </span>
        </div>
      </div>

      {/* 4 Focused Maintenance & Digital Warranty KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Total Revisions */}
        <div className="bg-white rounded-2xl border border-gray-200 p-3.5 shadow-card">
          <div className="flex items-center justify-between text-gray-500 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider">Passages en Atelier</span>
            <Wrench className="w-3.5 h-3.5 text-[#191919]" />
          </div>
          <div className="text-xl font-black text-[#191919] font-mono">
            {totalRecords.toLocaleString()} <span className="text-xs text-gray-500 font-sans font-medium">révisions</span>
          </div>
          <span className="text-[10px] text-emerald-700 font-semibold">Taux de respect carnet : 92.4%</span>
        </div>

        {/* Maintenance Frequency / Interval */}
        <div className="bg-white rounded-2xl border border-gray-200 p-3.5 shadow-card">
          <div className="flex items-center justify-between text-gray-500 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider">Fréquence Moyenne</span>
            <Calendar className="w-3.5 h-3.5 text-blue-600" />
          </div>
          <div className="text-xl font-black text-[#191919] font-mono">
            {avgServiceIntervalDays} <span className="text-xs text-gray-500 font-sans font-medium">jours</span>
          </div>
          <span className="text-[10px] text-gray-500 font-mono">Moyenne : 2 450 km / vidange</span>
        </div>

        {/* Active Warranties */}
        <div className="bg-white rounded-2xl border border-gray-200 p-3.5 shadow-card">
          <div className="flex items-center justify-between text-gray-500 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider">Garanties Actives (24 Mois)</span>
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          </div>
          <div className="text-xl font-black text-[#191919] font-mono">
            {activeWarranties.toLocaleString()} <span className="text-xs text-gray-500 font-sans font-medium">motos</span>
          </div>
          <span className="text-[10px] text-emerald-700 font-semibold">Livrées et connectées à l'app</span>
        </div>

        {/* Overdue Alerts on App */}
        <div className="bg-white rounded-2xl border border-gray-200 p-3.5 shadow-card">
          <div className="flex items-center justify-between text-amber-700 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider">Relances Entretien Mobile</span>
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
          </div>
          <div className="text-xl font-black text-amber-900 font-mono">
            148 <span className="text-xs text-amber-700 font-sans font-medium">alertes</span>
          </div>
          <span className="text-[10px] text-amber-800 font-semibold">Notifications push & SMS envoyées</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION CENTRALE : ANALYSE DES PIÈCES & MAINTENANCE PAR WILAYA           */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-card space-y-4">
        {/* Wilaya Filter Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-3">
          <div>
            <h3 className="text-sm font-bold text-[#191919] flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#E30613]" />
              <span>Consommation des Pièces de Rechange & Pannes par Wilaya</span>
            </h3>
            <p className="text-[11px] text-[#777777]">
              Sélectionnez une wilaya pour inspecter les pièces d'usure les plus demandées et anticiper les expéditions depuis l'usine d'Akbou
            </p>
          </div>

          {/* Wilaya Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-thin">
            {WILAYA_MAINTENANCE_DATA.map((w) => (
              <button
                key={w.code}
                onClick={() => setSelectedWilayaCode(w.code)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  selectedWilayaCode === w.code
                    ? 'bg-[#191919] text-white shadow-xs'
                    : 'bg-[#F5F5F7] text-gray-600 hover:text-black hover:bg-gray-200'
                }`}
              >
                {w.code} - {w.name}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Wilaya Top Overview Bar */}
        <div className="bg-gradient-to-r from-[#191919] to-[#262626] text-white rounded-xl p-3.5 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-[#E30613] text-white flex items-center justify-center font-bold text-sm font-mono shrink-0">
              {activeWilayaData.code}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm text-white">Wilaya de {activeWilayaData.name}</span>
                <span className="text-[10px] bg-white/10 px-2 py-0.2 rounded font-semibold text-gray-300">
                  {activeWilayaData.region} Algérie
                </span>
              </div>
              <p className="text-[11px] text-gray-300">
                {activeWilayaData.workshopRevisions} révisions réalisées · {activeWilayaData.activeAppBooks} carnets numériques actifs ({activeWilayaData.appComplianceRate}%)
              </p>
            </div>
          </div>

          {/* Factory Directive Banner */}
          <div className="bg-white/10 border border-white/15 rounded-lg px-3 py-2 text-xs flex items-center gap-2 max-w-xl">
            <Truck className="w-4 h-4 text-red-400 shrink-0" />
            <span className="text-[11px] text-gray-200 leading-tight">
              {activeWilayaData.factoryDirective}
            </span>
          </div>
        </div>

        {/* ===================================================================== */}
        {/* TABLEAU CLÉ : PIÈCES DE RECHANGE DEMANDÉES DANS CETTE WILAYA         */}
        {/* ===================================================================== */}
        <div className="border border-gray-200 rounded-xl overflow-hidden shadow-2xs">
          <div className="bg-[#F9F9FB] px-3.5 py-2.5 border-b border-gray-200 flex items-center justify-between">
            <span className="text-xs font-extrabold text-[#191919] flex items-center gap-2">
              <Package className="w-4 h-4 text-[#E30613]" />
              <span>Pièces de Rechange les Plus Demandées & Remplacées à {activeWilayaData.name}</span>
            </span>
            <span className="text-[10px] font-mono text-gray-500">
              Données croisées Ateliers Agréés & Demandes Pièces IZRI
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-gray-200 text-[#777777] font-semibold text-[11px] bg-white">
                  <th className="py-2.5 px-3.5">Pièce de Rechange & Réf. OEM</th>
                  <th className="py-2.5 px-3.5">Catégorie</th>
                  <th className="py-2.5 px-3.5">Motos Compatibles</th>
                  <th className="py-2.5 px-3.5 text-right">Demande Wilaya (Mois)</th>
                  <th className="py-2.5 px-3.5 text-right">Stock Concessions ({activeWilayaData.name})</th>
                  <th className="py-2.5 px-3.5 text-right">Stock Usine (Akbou)</th>
                  <th className="py-2.5 px-3.5 text-center">Niveau de Risque</th>
                  <th className="py-2.5 px-3.5 text-center">Action Logistique</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {activeWilayaData.parts.map((part, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/80 transition-colors">
                    {/* Part Name & OEM Ref */}
                    <td className="py-3 px-3.5">
                      <div className="font-extrabold text-[#191919]">{part.name}</div>
                      <div className="text-[10px] font-mono text-gray-400 mt-0.5">{part.ref}</div>
                    </td>

                    {/* Category */}
                    <td className="py-3 px-3.5">
                      <span className="text-gray-600 font-medium text-[11px]">{part.category}</span>
                    </td>

                    {/* Compatible Models */}
                    <td className="py-3 px-3.5">
                      <div className="flex items-center gap-1 flex-wrap">
                        {part.compatibleModels.split(', ').map((m, i) => (
                          <span key={i} className="text-[10px] font-semibold bg-gray-100 text-[#191919] px-1.5 py-0.5 rounded">
                            {m}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* Local Demand */}
                    <td className="py-3 px-3.5 text-right font-mono font-black text-[#191919]">
                      {part.localDemand} unités
                    </td>

                    {/* Concession Stock */}
                    <td className="py-3 px-3.5 text-right font-mono font-bold">
                      <span className={part.concessionStock <= 15 ? 'text-[#E30613]' : 'text-gray-800'}>
                        {part.concessionStock} un.
                      </span>
                    </td>

                    {/* Factory Stock Akbou */}
                    <td className="py-3 px-3.5 text-right font-mono font-bold text-gray-600">
                      {part.factoryStock} un.
                    </td>

                    {/* Risk Badge */}
                    <td className="py-3 px-3.5 text-center">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${part.statusColor}`}>
                        {part.status}
                      </span>
                    </td>

                    {/* Action Button */}
                    <td className="py-3 px-3.5 text-center">
                      <button
                        onClick={() => handleOrderParts(part)}
                        className="px-2.5 py-1 rounded-md bg-[#191919] hover:bg-[#E30613] text-white text-[10px] font-bold transition-colors cursor-pointer flex items-center gap-1 mx-auto"
                        title="Créer un ordre d'expédition usine vers cette wilaya"
                      >
                        <Send className="w-2.5 h-2.5" />
                        <span>Réappro Usine</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Motos nécessitant le plus de révisions dans cette wilaya */}
        <div className="bg-[#F9F9FB] rounded-xl p-3 border border-gray-200/80">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-[#191919] flex items-center gap-1.5">
              <Bike className="w-3.5 h-3.5 text-[#E30613]" />
              <span>Motos Concentrant le Plus d'Interventions à {activeWilayaData.name}</span>
            </span>
            <span className="text-[10px] text-gray-500 font-mono">Liaison Défaillances & Terrain</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
            {activeWilayaData.topMaintainedModels.map((item, idx) => (
              <div key={idx} className="bg-white rounded-lg p-2.5 border border-gray-200">
                <div className="flex items-center justify-between font-bold text-xs text-[#191919] mb-1">
                  <span>#{idx + 1} {item.name}</span>
                  <span className="text-[#E30613] font-mono">{item.share}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1 mb-1.5">
                  <div className="bg-[#191919] h-full rounded-full" style={{ width: `${item.share * 2}%` }} />
                </div>
                <div className="text-[10px] text-gray-500">
                  Intervention type : <strong className="text-gray-800">{item.mainService}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* PRESTATIONS SAV NATIONALES & STOCK CENTRAL USINE (AKBOU)                  */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* Prestations SAV les plus fréquentes (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-gray-200 p-4 shadow-card flex flex-col justify-between">
          <div className="mb-3">
            <h3 className="text-sm font-bold text-[#191919]">
              Prestations SAV les Plus Fréquentes (National)
            </h3>
            <p className="text-[11px] text-[#777777]">
              Types d'interventions tamponnées dans les carnets d'entretien numériques
            </p>
          </div>

          <div className="space-y-2">
            {commonServices.map((srv, idx) => (
              <div key={idx} className="bg-[#F9F9FB] rounded-xl p-2.5 border border-gray-100 text-xs">
                <div className="flex items-center justify-between font-bold text-[#191919] mb-1">
                  <span>{srv.service}</span>
                  <span className="font-mono text-gray-700">{srv.count} ({srv.pct}%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${idx === 0 ? 'bg-[#E30613]' : 'bg-[#191919]'}`} 
                    style={{ width: `${srv.pct * 2.8}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="text-[11px] text-[#777777] border-t border-gray-100 pt-2 mt-3">
            La révision de rodage (1000 km) est obligatoire pour valider la garantie constructeur 24 mois.
          </div>
        </div>

        {/* Consommation des pièces d'origine & Stock Central Usine Akbou (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-200 p-4 shadow-card flex flex-col justify-between">
          <div>
            <div className="mb-3 flex items-center justify-between gap-2">
              <div>
                <h3 className="text-sm font-bold text-[#191919]">
                  Stocks Centraux de Pièces d'Origine à l'Usine VMS (Akbou)
                </h3>
                <p className="text-[11px] text-[#777777]">
                  Disponibilité centrale des pièces de rechange pour alimenter les concessions des 69 wilayas
                </p>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-gray-100 text-gray-700 border border-gray-200">
                Hub Akbou Béjaïa
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-gray-200 text-[#777777] font-semibold text-[11px] bg-[#F9F9FB]">
                    <th className="py-2.5 px-3">Composant & Pièce Détachée</th>
                    <th className="py-2.5 px-3 text-right">Remplacements (Réseau)</th>
                    <th className="py-2.5 px-3 text-right">Stock Usine Akbou</th>
                    <th className="py-2.5 px-3 text-center">Niveau de Disponibilité</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {partReplacements.map((part, idx) => (
                    <tr key={idx} className="hover:bg-gray-50/80 transition-colors">
                      <td className="py-2.5 px-3 font-semibold text-[#191919]">{part.part}</td>
                      <td className="py-2.5 px-3 text-right font-mono font-bold text-[#191919]">{part.replacements} un.</td>
                      <td className="py-2.5 px-3 text-right font-mono font-bold text-gray-800">{part.stockAvailable} un.</td>
                      <td className="py-2.5 px-3 text-center">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          part.risk === 'Critique'
                            ? 'bg-red-100 text-[#E30613]'
                            : part.risk === 'Attention'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {part.risk === 'Critique' ? 'Stock Critique' : part.risk === 'Attention' ? 'À Surveiller' : 'Stock Optimal'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="text-[11px] text-[#777777] border-t border-gray-100 pt-2 mt-2 flex items-center justify-between">
            <span>Règlementation VMS : Toutes les pièces installées sont certifiées d'origine constructeur.</span>
            <span className="font-bold text-[#E30613]">Traçabilité 100% Numérique</span>
          </div>
        </div>

      </div>
    </div>
  );
}
