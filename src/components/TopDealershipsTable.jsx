import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  CheckCircle2, 
  AlertCircle, 
  ArrowUpDown, 
  Eye, 
  Phone, 
  ExternalLink,
  BarChart3,
  List,
  Trophy,
  TrendingUp,
  PackageCheck
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Cell 
} from 'recharts';

export default function TopDealershipsTable({ 
  dealerships = [], 
  onViewDealership = () => {} 
}) {
  const [viewMode, setViewMode] = useState('graph'); // Default to 'graph' as requested by user
  const [metric, setMetric] = useState('sales'); // 'sales' | 'revenueM'
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('sales');

  // Sorted and filtered dealerships
  const sortedDealers = [...dealerships].sort((a, b) => b[metric] - a[metric]);
  
  const topChartData = sortedDealers.slice(0, 7).map((d, idx) => ({
    id: d.id,
    name: d.name.length > 22 ? d.name.substring(0, 20) + '...' : d.name,
    fullName: d.name,
    wilaya: d.wilaya,
    manager: d.manager,
    sales: d.sales,
    revenueM: d.revenueM,
    stock: d.stock,
    registrationRate: d.registrationRate,
    performance: d.performance,
    isLeader: idx === 0,
    rank: idx + 1,
  }));

  const filteredDealers = dealerships
    .filter(d => 
      d.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      d.wilaya.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.manager.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => b[sortField] - a[sortField]);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-card hover:shadow-hover transition-all">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-[#191919]">
              Classement & Performance des Concessionnaires VMS
            </h3>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-red-50 text-[#E30613] border border-red-200 flex items-center gap-1">
              <Trophy className="w-3 h-3" />
              <span>Top Réseau</span>
            </span>
          </div>
          <p className="text-[11px] text-[#777777]">
            Suivi visuel des volumes de livraison, chiffre d'affaires et santé des stocks
          </p>
        </div>

        {/* View Mode & Metric Switchers */}
        <div className="flex flex-wrap items-center gap-2">
          {viewMode === 'graph' && (
            <div className="flex items-center bg-[#F5F5F7] p-1 rounded-lg border border-gray-200">
              <button
                onClick={() => setMetric('sales')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                  metric === 'sales'
                    ? 'bg-[#191919] text-white shadow-xs'
                    : 'text-gray-600 hover:text-[#191919]'
                }`}
              >
                Unités Vendues
              </button>
              <button
                onClick={() => setMetric('revenueM')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                  metric === 'revenueM'
                    ? 'bg-[#191919] text-white shadow-xs'
                    : 'text-gray-600 hover:text-[#191919]'
                }`}
              >
                CA (M DZD)
              </button>
            </div>
          )}

          {/* Toggle between Graphique and Tableau */}
          <div className="flex items-center bg-[#F5F5F7] p-1 rounded-lg border border-gray-200">
            <button
              onClick={() => setViewMode('graph')}
              className={`p-1.5 rounded-md text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'graph' ? 'bg-[#191919] text-white shadow-xs' : 'text-gray-600 hover:text-black'
              }`}
              title="Vue Graphique"
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Graphique</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-md text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'table' ? 'bg-[#191919] text-white shadow-xs' : 'text-gray-600 hover:text-black'
              }`}
              title="Vue Tableau Détaillé"
            >
              <List className="w-3.5 h-3.5" />
              <span>Tableau</span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. GRAPH VIEW (Interactive Horizontal Bar Chart + Top 3 Podium Cards)     */}
      {/* ========================================================================= */}
      {viewMode === 'graph' && (
        <div className="space-y-3">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 items-stretch">
            {/* Left 7 cols: Recharts Bar Chart */}
            <div className="xl:col-span-7 bg-[#F9F9FB] rounded-xl border border-gray-200/80 p-3 flex flex-col justify-between">
              <div className="flex items-center justify-between text-xs font-bold text-[#191919] mb-1 px-1">
                <span>{metric === 'sales' ? 'Volume de Ventes par Concessionnaire (Motos)' : 'Chiffre d’Affaires Réalisé (Millions DZD)'}</span>
                <span className="text-[10px] text-gray-500 font-normal">7 Meilleurs Points Agréés</span>
              </div>

              <div className="h-[260px] w-full pt-1">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={topChartData}
                    layout="vertical"
                    margin={{ top: 5, right: 35, left: 15, bottom: 5 }}
                  >
                    <XAxis 
                      type="number" 
                      tickFormatter={(val) => metric === 'revenueM' ? `${val}M` : `${val}`}
                      tick={{ fontSize: 10, fill: '#777777' }} 
                      axisLine={{ stroke: '#E5E7EB' }}
                      tickLine={false}
                    />
                    <YAxis 
                      dataKey="name" 
                      type="category" 
                      tick={{ fontSize: 10.5, fill: '#191919', fontWeight: 600 }} 
                      axisLine={false}
                      tickLine={false}
                      width={130}
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (!active || !payload || !payload.length) return null;
                        const data = payload[0].payload;
                        return (
                          <div className="bg-[#191919] text-white p-3 rounded-xl shadow-xl text-xs border border-gray-700 min-w-[200px]">
                            <div className="flex items-center justify-between gap-2 border-b border-gray-700 pb-1.5 mb-1.5">
                              <span className="font-extrabold text-[#E30613] truncate">{data.fullName}</span>
                              <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded font-mono">#{data.rank}</span>
                            </div>
                            <p className="text-gray-300 text-[11px] mb-1">
                              📍 {data.wilaya} · Resp: {data.manager}
                            </p>
                            <div className="space-y-0.5 font-mono text-[11px]">
                              <p className="text-gray-200">
                                Ventes: <span className="font-bold text-white">{data.sales} unités</span>
                              </p>
                              <p className="text-gray-200">
                                CA Réseau: <span className="font-bold text-white">{data.revenueM}M DZD</span>
                              </p>
                              <p className="text-gray-200">
                                Stock Actuel: <span className="font-bold text-amber-300">{data.stock} motos</span>
                              </p>
                              <p className="text-gray-200">
                                Taux App IZRI: <span className="font-bold text-emerald-400">{data.registrationRate}%</span>
                              </p>
                            </div>
                          </div>
                        );
                      }}
                    />
                    <Bar 
                      dataKey={metric} 
                      radius={[0, 6, 6, 0]}
                      barSize={18}
                    >
                      {topChartData.map((entry, index) => (
                        <Cell 
                          key={`dealer-bar-${index}`} 
                          fill={entry.isLeader ? '#E30613' : index === 1 ? '#191919' : index === 2 ? '#3F3F46' : '#71717A'} 
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Chart Legend */}
              <div className="flex items-center justify-between text-[10px] text-[#777777] border-t border-gray-200/80 pt-2 px-1 mt-1">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#E30613]"></span>
                  <span className="font-bold text-[#191919]">#1 Leader National</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#191919]"></span>
                  <span>#2 Top Performer</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#71717A]"></span>
                  <span>Réseau Agréé VMS</span>
                </div>
              </div>
            </div>

            {/* Right 5 cols: Top 3 Leaders Cards */}
            <div className="xl:col-span-5 flex flex-col justify-between gap-2.5">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-gray-400 px-1">
                Podium & Synthèse Réseau
              </span>

              {topChartData.slice(0, 3).map((dealer, idx) => (
                <div 
                  key={dealer.id}
                  onClick={() => {
                    const original = dealerships.find(d => d.id === dealer.id);
                    if (original) onViewDealership(original);
                  }}
                  className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    idx === 0 
                      ? 'bg-red-50/40 border-red-200 hover:border-[#E30613] hover:shadow-xs' 
                      : idx === 1 
                      ? 'bg-gray-50 border-gray-200 hover:border-gray-400' 
                      : 'bg-white border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                      idx === 0 ? 'bg-[#E30613] text-white' : idx === 1 ? 'bg-[#191919] text-white' : 'bg-gray-200 text-gray-700'
                    }`}>
                      #{idx + 1}
                    </span>
                    <div className="min-w-0">
                      <div className="font-extrabold text-xs text-[#191919] truncate">
                        {dealer.fullName}
                      </div>
                      <div className="text-[10px] text-gray-500 flex items-center gap-1 truncate">
                        <MapPin className="w-2.5 h-2.5 text-gray-400 shrink-0" />
                        <span>{dealer.wilaya}</span>
                        <span>· Resp: {dealer.manager}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="font-mono font-black text-xs text-[#191919]">
                      {dealer.sales} motos
                    </div>
                    <div className="text-[10px] font-bold text-emerald-700">
                      {dealer.revenueM}M DZD
                    </div>
                  </div>
                </div>
              ))}

              <div className="bg-[#191919] text-white p-2.5 rounded-xl flex items-center justify-between text-xs mt-auto">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-red-400 shrink-0" />
                  <span className="text-[11px] text-gray-300">78 points de vente maillent l'Algérie</span>
                </div>
                <button
                  onClick={() => setViewMode('table')}
                  className="text-[11px] font-bold text-[#E30613] hover:text-red-400 underline cursor-pointer"
                >
                  Voir tous
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. TABLE VIEW (Full Table with Search & Sort)                             */}
      {/* ========================================================================= */}
      {viewMode === 'table' && (
        <div className="space-y-3">
          {/* Search bar inside table view */}
          <div className="flex items-center justify-between gap-2">
            <input
              type="text"
              placeholder="Filtrer concessionnaire, wilaya, gérant..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-[#F5F5F7] border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs text-[#191919] placeholder:text-gray-400 focus:outline-none focus:border-[#E30613] w-full sm:w-64"
            />
            <span className="text-xs text-gray-500">
              {filteredDealers.length} concessionnaire(s) affiché(s)
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-gray-200 text-[#777777] font-semibold text-[11px] bg-[#F9F9FB]">
                  <th className="py-2.5 px-3 rounded-l-lg">Concessionnaire & Ville</th>
                  <th className="py-2.5 px-3">Gérant / Contact</th>
                  <th className="py-2.5 px-3 text-right cursor-pointer" onClick={() => setSortField('sales')}>
                    <div className="flex items-center justify-end gap-1">
                      <span>Ventes</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="py-2.5 px-3 text-right cursor-pointer" onClick={() => setSortField('revenueM')}>
                    <div className="flex items-center justify-end gap-1">
                      <span>CA (DZD)</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="py-2.5 px-3 text-right">Stock</th>
                  <th className="py-2.5 px-3 text-right">Taux App IZRI</th>
                  <th className="py-2.5 px-3 text-center">Statut</th>
                  <th className="py-2.5 px-3 text-center rounded-r-lg">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredDealers.slice(0, 8).map((dealer, index) => (
                  <tr 
                    key={dealer.id}
                    className="hover:bg-gray-50/80 transition-colors group cursor-pointer"
                    onClick={() => onViewDealership(dealer)}
                  >
                    <td className="py-2.5 px-3">
                      <div className="flex items-center gap-2">
                        <span className={`w-5 h-5 rounded-md flex items-center justify-center font-bold text-[10px] ${
                          index === 0 ? 'bg-[#E30613] text-white' : index === 1 ? 'bg-[#191919] text-white' : 'bg-gray-200 text-gray-700'
                        }`}>
                          {index + 1}
                        </span>
                        <div>
                          <div className="font-bold text-[#191919] group-hover:text-[#E30613] transition-colors">
                            {dealer.name}
                          </div>
                          <div className="text-[10px] text-[#777777] flex items-center gap-1">
                            <MapPin className="w-2.5 h-2.5 text-gray-400" />
                            <span>{dealer.wilaya}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-2.5 px-3">
                      <div className="font-medium text-[#191919]">{dealer.manager}</div>
                      <div className="text-[10px] text-[#777777] font-mono">{dealer.phone}</div>
                    </td>

                    <td className="py-2.5 px-3 text-right font-mono font-bold text-[#191919]">
                      {dealer.sales} unités
                    </td>

                    <td className="py-2.5 px-3 text-right font-mono font-semibold text-[#191919]">
                      {dealer.revenueM}M DZD
                    </td>

                    <td className="py-2.5 px-3 text-right font-mono">
                      <span className={`px-1.5 py-0.5 rounded text-[11px] font-bold ${
                        dealer.stock <= 20 ? 'bg-red-50 text-[#E30613]' : 'bg-gray-100 text-[#191919]'
                      }`}>
                        {dealer.stock} dispo
                      </span>
                    </td>

                    <td className="py-2.5 px-3 text-right font-mono">
                      <span className={`font-bold ${
                        dealer.registrationRate >= 90 ? 'text-emerald-700' : 'text-[#191919]'
                      }`}>
                        {dealer.registrationRate}%
                      </span>
                    </td>

                    <td className="py-2.5 px-3 text-center">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        dealer.performance === 'Leader Réseau' 
                          ? 'bg-red-100 text-[#E30613]' 
                          : dealer.performance === 'Top Performer' 
                          ? 'bg-emerald-100 text-emerald-800'
                          : dealer.performance === 'À Surveiller'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {dealer.performance}
                      </span>
                    </td>

                    <td className="py-2.5 px-3 text-center" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => onViewDealership(dealer)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-[#191919] hover:bg-gray-200 transition-colors"
                        title="Voir fiche complète"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Footer link */}
      <div className="flex items-center justify-between text-[11px] text-[#777777] border-t border-gray-100 pt-2 mt-2">
        <span>Réseau agréé de distribution VMS Industrie Algérie</span>
        <button 
          onClick={() => onViewDealership(dealerships[0])}
          className="font-bold text-[#E30613] hover:underline flex items-center gap-1 cursor-pointer"
        >
          <span>Consulter les 78 concessions</span>
          <ExternalLink className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
