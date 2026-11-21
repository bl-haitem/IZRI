import React from 'react';
import { 
  Sparkles, 
  TrendingUp, 
  AlertTriangle, 
  Award, 
  ArrowRight, 
  BrainCircuit, 
  ShieldAlert,
  ChevronRight
} from 'lucide-react';

export default function DemandInsightsPanel({ onGoToForecast = () => {} }) {
  const insights = [
    {
      id: 1,
      type: "top_requested",
      title: "Modèle le Plus Demandé",
      model: "VMS Cuxi 2",
      badge: "842 unités vendues",
      desc: "Représente 34% de la demande totale. Forte rotation dans les grandes agglomérations (Alger, Oran, Constantine).",
      icon: Award,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
      border: "border-amber-200",
    },
    {
      id: 2,
      type: "demand_growth",
      title: "Forte Accélération de la Demande",
      model: "VMS XDV 300",
      badge: "+31.2% ce mois",
      desc: "Surge exceptionnel enregistré dans les wilayas de l'Est et des Hauts Plateaux (Sétif, Batna, Bordj Bou Arreridj).",
      icon: TrendingUp,
      color: "text-emerald-600",
      bg: "bg-emerald-500/10",
      border: "border-emerald-200",
    },
    {
      id: 3,
      type: "stock_shortage",
      title: "Risque Imminent de Rupture",
      model: "VMS Driver 125",
      badge: "Rupture sous 16j",
      desc: "Stock national réduit à 42 unités pour un rythme de 18 ventes/semaine. Réapprovisionnement usine Béjaïa recommandé.",
      icon: AlertTriangle,
      color: "text-[#E30613]",
      bg: "bg-red-500/10",
      border: "border-red-200",
    },
    {
      id: 4,
      type: "top_dealer",
      title: "Concessionnaire Numéro 1",
      model: "SARL Alger Moto Performance",
      badge: "242 unités livrées",
      desc: "Taux de satisfaction client de 94.1% avec 89.2% de conducteurs enregistrés sur l'application connectée IZRI.",
      icon: Sparkles,
      color: "text-purple-600",
      bg: "bg-purple-500/10",
      border: "border-purple-200",
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-card hover:shadow-hover transition-all flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 border-b border-gray-100 pb-2.5">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-black text-white flex items-center justify-center">
            <BrainCircuit className="w-4 h-4 text-[#E30613]" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#191919] flex items-center gap-1.5">
              <span>Intelligence & Signaux du Marché</span>
              <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-gray-100 text-[#777777] font-mono border border-gray-200">
                Simulated AI
              </span>
            </h3>
            <p className="text-[10px] text-[#777777]">
              Analytique prédictive basée sur les données réelles du réseau VMS
            </p>
          </div>
        </div>

        <button
          onClick={onGoToForecast}
          className="text-xs font-bold text-[#E30613] hover:underline flex items-center gap-1 shrink-0"
        >
          <span>Planning Réassort</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Grid of 4 simulated insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {insights.map((item) => {
          const IconComponent = item.icon;
          return (
            <div
              key={item.id}
              className={`p-3 rounded-xl border ${item.border} bg-[#FDFDFE] flex flex-col justify-between hover:shadow-xs transition-shadow`}
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#777777]">
                    {item.title}
                  </span>
                  <div className={`w-5 h-5 rounded-md ${item.bg} flex items-center justify-center shrink-0`}>
                    <IconComponent className={`w-3 h-3 ${item.color}`} />
                  </div>
                </div>

                <div className="font-extrabold text-[#191919] text-xs mb-1">
                  {item.model}
                </div>

                <p className="text-[11px] text-[#777777] leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-2.5 pt-2 border-t border-gray-100 flex items-center justify-between">
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                  item.type === 'stock_shortage' 
                    ? 'bg-red-100 text-[#E30613]' 
                    : item.type === 'demand_growth'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {item.badge}
                </span>
                <span className="text-[10px] text-gray-400 font-mono">Algorithme VMS</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-3 pt-2 border-t border-gray-100 text-[10px] text-gray-400 flex items-center justify-between">
        <span>Remarque : Les projections de demande sont recalculées sur la base d'une moyenne mobile à 14 jours.</span>
        <span className="text-[#191919] font-medium">Validé par Direction Supply Chain</span>
      </div>
    </div>
  );
}
