import React from 'react';
import { 
  Bike, 
  Flame, 
  Trophy, 
  AlertOctagon, 
  TrendingUp,
  ArrowUpRight
} from 'lucide-react';

export default function KPICards({ onSelectKPI = () => {} }) {
  // Directly answering the 5 fundamental executive questions of VMS Industrie
  const questionsAnswers = [
    {
      id: "units_sold",
      questionNumber: "1. Ventes Réseau",
      label: "Motos Vendues (Année)",
      value: "2,485",
      unit: "unités",
      subtext: "185.4M DZD (+12.8%)",
      isPositive: true,
      icon: Bike,
      highlight: true,
      action: "Consulter les ventes",
    },
    {
      id: "top_model",
      questionNumber: "2. Modèle le Plus Demandé",
      label: "Leader des Commandes",
      value: "Driver 125",
      unit: "VMS",
      subtext: "680 ventes (27.4% du CA)",
      isPositive: true,
      icon: Flame,
      highlight: false,
      badge: "Top 1 VMS",
      action: "Voir le catalogue",
    },
    {
      id: "top_dealership",
      questionNumber: "3. Meilleure Concession",
      label: "Leader du Réseau (78 pts)",
      value: "Moto Alger",
      unit: "Sarl",
      subtext: "382 ventes · 94.2% certifiées",
      isPositive: true,
      icon: Trophy,
      highlight: false,
      action: "Voir concessions",
    },
    {
      id: "stock_shortages",
      questionNumber: "4. Pénuries & Ruptures",
      label: "Modèles à Risque Critique",
      value: "2",
      unit: "modèles",
      subtext: "XDV 300 & Estate X (<20j)",
      isPositive: false,
      icon: AlertOctagon,
      alert: true,
      action: "Gérer les stocks",
    },
    {
      id: "forecast_anticipation",
      questionNumber: "5. Anticipation S+2",
      label: "Demande Estimée (14 jours)",
      value: "+210",
      unit: "unités",
      subtext: "+16.4% · Ordre conseillé",
      isPositive: true,
      icon: TrendingUp,
      forecast: true,
      action: "Voir prévisions",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
      {questionsAnswers.map((item) => {
        const IconComponent = item.icon;
        return (
          <div
            key={item.id}
            onClick={() => onSelectKPI(item.id)}
            className={`bg-white rounded-xl p-3.5 border cursor-pointer transition-all hover:shadow-md hover:-translate-y-0.5 flex flex-col justify-between ${
              item.highlight 
                ? 'border-l-4 border-l-[#E30613] border-gray-200' 
                : item.alert 
                ? 'border-l-4 border-l-red-500 border-red-200 bg-red-50/20' 
                : item.forecast
                ? 'border-l-4 border-l-black border-gray-200'
                : 'border-gray-200'
            }`}
          >
            <div>
              {/* Question / Category */}
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                  {item.questionNumber}
                </span>
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                  item.alert 
                    ? 'bg-red-100 text-[#E30613]' 
                    : item.highlight 
                    ? 'bg-red-50 text-[#E30613]' 
                    : 'bg-gray-100 text-[#191919]'
                }`}>
                  <IconComponent className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Main Metric Value */}
              <div className="flex items-baseline gap-1.5 mb-1">
                <span className="text-xl font-black text-[#191919] tracking-tight font-mono">
                  {item.value}
                </span>
                <span className="text-xs font-semibold text-gray-500">
                  {item.unit}
                </span>
              </div>

              {/* Label */}
              <p className="text-[11px] font-medium text-gray-600 truncate">
                {item.label}
              </p>
            </div>

            {/* Subtext and Quick Link */}
            <div className="mt-2.5 pt-2 border-t border-gray-100 flex items-center justify-between text-[11px]">
              <span className={`font-semibold ${
                item.alert ? 'text-red-600' : 'text-gray-700'
              }`}>
                {item.subtext}
              </span>
              <ArrowUpRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-black shrink-0" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
