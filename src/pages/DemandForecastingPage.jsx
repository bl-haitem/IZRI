import React from 'react';
import { 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Flame,
  Award,
  AlertOctagon,
  Boxes,
  Truck
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid 
} from 'recharts';

export default function DemandForecastingPage({
  forecasts = [],
  onApproveForecast = () => {},
  onRejectForecast = () => {},
}) {
  // Simulated 6-Week Moving Average Projection Data
  // Clearly distinguishes historical actual sales (Sem -4 to -1) from estimated demand (Sem +1, +2)
  const forecastEvolutionData = [
    { period: "Semaine -4", actualSales: 58, estimatedDemand: 56, isForecast: false },
    { period: "Semaine -3", actualSales: 64, estimatedDemand: 60, isForecast: false },
    { period: "Semaine -2", actualSales: 72, estimatedDemand: 70, isForecast: false },
    { period: "Semaine -1 (Précédente)", actualSales: 81, estimatedDemand: 78, isForecast: false },
    { period: "Semaine +1 (Prévue)", actualSales: null, estimatedDemand: 92, isForecast: true },
    { period: "Semaine +2 (Prévue)", actualSales: null, estimatedDemand: 105, isForecast: true },
  ];

  return (
    <div className="space-y-4 pb-12">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-extrabold text-[#191919]">
            Prévisions de la Demande & Planification VMS
          </h2>
          <p className="text-xs text-[#777777]">
            Anticipation de la demande à 14 jours par modèle et propositions de réapprovisionnement
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-lg bg-red-50 border border-red-200 text-[#E30613]">
            Horizon Prévisionnel : S+1 & S+2 (14 Jours)
          </span>
        </div>
      </div>

      {/* 4 Key Intelligence Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* 1. Most Demanded Model */}
        <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-card border-l-4 border-l-[#E30613]">
          <div className="flex items-center justify-between text-gray-500 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-700">Modèle le Plus Demandé</span>
            <Award className="w-4 h-4 text-[#E30613]" />
          </div>
          <div className="text-xl font-black text-[#191919]">
            VMS Driver 125
          </div>
          <span className="text-xs text-gray-600 font-semibold">680 ventes (27.4% part de marché)</span>
        </div>

        {/* 2. Model with Increasing Demand */}
        <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-card border-l-4 border-l-emerald-500">
          <div className="flex items-center justify-between text-gray-500 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">Forte Accélération</span>
            <Flame className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-xl font-black text-[#191919]">
            VMS Cuxi 2
          </div>
          <span className="text-xs text-emerald-700 font-semibold">+24.8% de demande ce mois</span>
        </div>

        {/* 3. Potential Stock Shortage */}
        <div className="bg-red-50/70 rounded-2xl border border-red-200 p-4 shadow-card border-l-4 border-l-red-500">
          <div className="flex items-center justify-between text-[#E30613] mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#E30613]">Risque Pénurie Imminent</span>
            <AlertOctagon className="w-4 h-4 text-[#E30613]" />
          </div>
          <div className="text-xl font-black text-[#E30613]">
            VMS XDV 300
          </div>
          <span className="text-xs text-red-700 font-semibold">Stock critique : 9 jours de réserve</span>
        </div>

        {/* 4. Suggested Replenishment Total */}
        <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-card border-l-4 border-l-black">
          <div className="flex items-center justify-between text-gray-500 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-700">Volume Total Conseillé</span>
            <Truck className="w-4 h-4 text-[#191919]" />
          </div>
          <div className="text-xl font-black text-[#191919] font-mono">
            +210 <span className="text-xs text-gray-500 font-sans font-medium">unités</span>
          </div>
          <span className="text-xs text-[#777777]">À assembler à l'usine d'Akbou</span>
        </div>
      </div>

      {/* Moving-Average Projection Chart */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div>
            <h3 className="text-sm font-bold text-[#191919]">
              Ventes Hebdomadaires Réelles vs Estimation Prévisionnelle de la Demande
            </h3>
            <p className="text-[11px] text-[#777777]">
              Moyenne mobile 4 semaines avec projection sur les deux prochaines semaines (S+1 et S+2)
            </p>
          </div>

          {/* Visual Legend */}
          <div className="flex items-center gap-4 text-xs font-semibold text-[#191919]">
            <div className="flex items-center gap-1.5">
              <span className="w-4 h-1.5 rounded-full bg-[#191919]"></span>
              <span>Ventes Réelles Constatées</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-4 h-1.5 rounded-full bg-[#E30613]"></span>
              <span>Demande Estimée (IZRI)</span>
            </div>
          </div>
        </div>

        <div className="h-[240px] w-full pt-1">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={forecastEvolutionData} margin={{ top: 10, right: 15, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="colorDemand" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#E30613" stopOpacity={0.25}/>
                  <stop offset="95%" stopColor="#E30613" stopOpacity={0.0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F0F2" />
              <XAxis dataKey="period" tick={{ fontSize: 10, fill: '#777777' }} axisLine={{ stroke: '#E5E7EB' }} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#777777' }} axisLine={false} tickLine={false} />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (!active || !payload || !payload.length) return null;
                  const item = payload[0].payload;
                  return (
                    <div className="bg-[#191919] text-white p-3 rounded-xl shadow-xl text-xs border border-gray-700">
                      <p className="font-extrabold text-[#E30613] mb-1">{label}</p>
                      {item.actualSales !== null ? (
                        <p className="text-gray-300 font-mono">
                          Ventes Réelles : <span className="font-bold text-white">{item.actualSales} unités</span>
                        </p>
                      ) : (
                        <p className="text-amber-400 font-medium">
                          Période future (Prévision)
                        </p>
                      )}
                      <p className="text-gray-300 font-mono mt-0.5">
                        Demande Estimée : <span className="font-bold text-[#E30613]">{item.estimatedDemand} unités</span>
                      </p>
                    </div>
                  );
                }}
              />
              <Area type="monotone" dataKey="estimatedDemand" stroke="#E30613" strokeWidth={2.5} fillOpacity={1} fill="url(#colorDemand)" />
              <Area type="monotone" dataKey="actualSales" stroke="#191919" strokeWidth={2.5} fillOpacity={0} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="flex items-center justify-between text-[11px] text-[#777777] border-t border-gray-100 pt-2 mt-1">
          <span>* Modèle algorithmique de moyenne mobile : calcul basé sur le carnet de commandes des 78 concessions.</span>
          <span className="font-bold text-emerald-600">+16.4% d'augmentation de demande projetée</span>
        </div>
      </div>

      {/* Suggested Replenishment Orders (Review and Approval Workflow) */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-[#191919]">
                Ordres de Réapprovisionnement Conseillés (Validation Super Admin)
              </h3>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-red-100 text-[#E30613]">
                Décision Requise
              </span>
            </div>
            <p className="text-[11px] text-[#777777]">
              L'approbation transmet directement la quantité conseillée au planning d'assemblage de l'usine d'Akbou
            </p>
          </div>
        </div>

        {/* Proposals List */}
        <div className="space-y-3">
          {forecasts.map((fcs) => {
            const isCritical = fcs.urgency === 'Critique';
            return (
              <div
                key={fcs.id}
                className={`rounded-xl border p-4 transition-all ${
                  fcs.status === 'Approved'
                    ? 'bg-emerald-50/40 border-emerald-300'
                    : fcs.status === 'Rejected'
                    ? 'bg-gray-50 border-gray-200 opacity-60'
                    : isCritical
                    ? 'bg-red-50/40 border-red-300 ring-1 ring-red-300/40'
                    : 'bg-white border-gray-200'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Left Info */}
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-black text-[#191919]">{fcs.modelName}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-gray-100 text-gray-700 font-bold">
                        {fcs.id}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        fcs.urgency === 'Critique'
                          ? 'bg-red-100 text-[#E30613]'
                          : fcs.urgency === 'Élevée'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        Urgence: {fcs.urgency}
                      </span>
                      <span className="text-xs font-semibold text-emerald-700">
                        {fcs.trend}
                      </span>
                    </div>

                    <p className="text-xs text-gray-600 leading-relaxed">
                      <strong>Motif de la recommandation :</strong> {fcs.reason}
                    </p>

                    <div className="flex items-center gap-4 text-xs text-[#777777] pt-1">
                      <span>Destination : <strong className="text-[#191919]">{fcs.targetHub}</strong></span>
                      <span>Délai d'assemblage : <strong className="text-[#191919]">{fcs.leadTimeDays} jours</strong></span>
                    </div>
                  </div>

                  {/* Middle Stats */}
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="bg-white rounded-lg p-2.5 border border-gray-200 text-center min-w-[90px]">
                      <span className="text-[9px] uppercase font-bold text-gray-400 block">Stock Dispo</span>
                      <span className="text-sm font-black text-[#191919] font-mono">{fcs.currentStock} un.</span>
                      <span className="text-[9px] text-red-600 font-semibold block">{fcs.daysOfInventoryLeft}j restants</span>
                    </div>

                    <div className="bg-white rounded-lg p-2.5 border border-gray-200 text-center min-w-[100px]">
                      <span className="text-[9px] uppercase font-bold text-gray-400 block">Demande S+2</span>
                      <span className="text-sm font-black text-[#191919] font-mono">+{fcs.forecastDemand2Weeks} un.</span>
                      <span className="text-[9px] text-gray-500 block">Rythme: {fcs.weeklyRunRate}/sem.</span>
                    </div>

                    <div className="bg-red-50 rounded-lg p-2.5 border border-red-200 text-center min-w-[110px]">
                      <span className="text-[9px] uppercase font-bold text-[#E30613] block">Ordre Conseillé</span>
                      <span className="text-base font-black text-[#E30613] font-mono">+{fcs.recommendedReplenish}</span>
                      <span className="text-[9px] text-red-700 block font-semibold">Unités Akbou</span>
                    </div>
                  </div>

                  {/* Right Actions: Approval Workflow */}
                  <div className="flex items-center gap-2 shrink-0 border-t lg:border-t-0 pt-2 lg:pt-0">
                    {fcs.status === 'Approved' ? (
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-bold">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Ordre Approuvé (En Production)</span>
                      </div>
                    ) : fcs.status === 'Rejected' ? (
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-200 text-gray-700 text-xs font-bold">
                        <XCircle className="w-4 h-4 text-gray-500" />
                        <span>Proposition Rejetée</span>
                      </div>
                    ) : (
                      <>
                        <button
                          onClick={() => onRejectForecast(fcs.id)}
                          className="px-3 py-1.5 rounded-lg border border-gray-300 text-xs font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                          Rejeter
                        </button>
                        <button
                          onClick={() => onApproveForecast(fcs.id)}
                          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#E30613] text-white text-xs font-bold hover:bg-[#C40510] shadow-sm transition-all"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Approuver l'Ordre</span>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
