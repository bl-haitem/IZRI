import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Package, 
  Search, 
  Plus, 
  ExternalLink,
  LayoutGrid, 
  List,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export default function DealershipsPage({
  dealerships = [],
  onViewDealership = () => {},
  onToggleStatus = () => {},
  onAddDealership = () => {},
}) {
  const [viewMode, setViewMode] = useState('table'); // 'table' is the primary view
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedPerformance, setSelectedPerformance] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDealerships = dealerships.filter((d) => {
    const matchesSearch = searchTerm === '' ||
      d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.wilaya.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.manager.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRegion = selectedRegion === 'All' || d.region === selectedRegion;
    const matchesPerf = selectedPerformance === 'All' || d.performance === selectedPerformance;

    return matchesSearch && matchesRegion && matchesPerf;
  });

  const getPerformanceBadge = (perf) => {
    switch (perf) {
      case 'Leader Réseau':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-800 border border-purple-200">Leader Réseau</span>;
      case 'Top Performer':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">Top Performer</span>;
      case 'Forte Croissance':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800 border border-blue-200">Forte Croissance</span>;
      case 'Objectif Dépassé':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-100 text-teal-800 border border-teal-200">Objectif Dépassé</span>;
      default:
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-gray-100 text-gray-700 border border-gray-200">{perf || 'Standard'}</span>;
    }
  };

  return (
    <div className="space-y-4 pb-12">
      {/* Header Bar */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-extrabold text-[#191919]">
            Concessionnaires Agréés
          </h2>
          <p className="text-xs text-[#777777]">
            Réseau national de distribution VMS Industrie
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* View Mode Switcher */}
          <div className="flex items-center bg-[#F5F5F7] p-1 rounded-lg border border-gray-200">
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-md transition-all ${
                viewMode === 'table' ? 'bg-[#191919] text-white shadow-xs' : 'text-gray-500 hover:text-black'
              }`}
              title="Vue Tableau (Recommandée)"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md transition-all ${
                viewMode === 'grid' ? 'bg-[#191919] text-white shadow-xs' : 'text-gray-500 hover:text-black'
              }`}
              title="Vue Grille"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={onAddDealership}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#E30613] text-white text-xs font-bold hover:bg-[#C40510] shadow-sm transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Nouveau Point Agréé</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-card flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
          {/* Search */}
          <div className="relative min-w-[220px]">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher nom, wilaya, gérant..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#F5F5F7] border border-gray-200 rounded-lg pl-8 pr-2.5 py-1.5 text-xs text-[#191919] focus:outline-none focus:border-[#E30613]"
            />
          </div>

          {/* Region */}
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="bg-[#F5F5F7] border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs text-[#191919] focus:outline-none focus:border-[#E30613]"
          >
            <option value="All">Toutes les Régions</option>
            <option value="Centre">Centre (Alger, Blida...)</option>
            <option value="Est">Est (Béjaïa, Sétif...)</option>
            <option value="Ouest">Ouest (Oran, Tlemcen...)</option>
            <option value="Sud">Sud (Biskra, Ouargla...)</option>
          </select>

          {/* Performance */}
          <select
            value={selectedPerformance}
            onChange={(e) => setSelectedPerformance(e.target.value)}
            className="bg-[#F5F5F7] border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs text-[#191919] focus:outline-none focus:border-[#E30613]"
          >
            <option value="All">Tous Niveaux Performance</option>
            <option value="Leader Réseau">Leader Réseau</option>
            <option value="Top Performer">Top Performer</option>
            <option value="Forte Croissance">Forte Croissance</option>
            <option value="Objectif Dépassé">Objectif Dépassé</option>
          </select>
        </div>

        <span className="text-xs text-[#777777] font-semibold self-end sm:self-auto">
          {filteredDealerships.length} concession(s) trouvée(s)
        </span>
      </div>

      {/* Primary Clean Table View */}
      {viewMode === 'table' ? (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-gray-200 text-[#777777] font-semibold text-[11px] bg-[#F9F9FB]">
                  <th className="py-3 px-3.5">Nom de la Concession</th>
                  <th className="py-3 px-3.5">Wilaya & Région</th>
                  <th className="py-3 px-3.5 text-right">Ventes Réalisées</th>
                  <th className="py-3 px-3.5 text-right">Stock Disponible</th>
                  <th className="py-3 px-3.5 text-center">Performance</th>
                  <th className="py-3 px-3.5 text-center">Fiche Détaillée</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredDealerships.map((d) => (
                  <tr 
                    key={d.id}
                    onClick={() => onViewDealership(d)}
                    className="hover:bg-gray-50/80 transition-colors cursor-pointer group"
                  >
                    {/* 1. Name */}
                    <td className="py-3 px-3.5">
                      <div className="font-bold text-[#191919] group-hover:text-[#E30613] transition-colors">
                        {d.name}
                      </div>
                      <div className="text-[10px] text-gray-400 font-mono">{d.code} • {d.manager}</div>
                    </td>

                    {/* 2. Wilaya */}
                    <td className="py-3 px-3.5">
                      <div className="font-medium text-[#191919]">{d.wilaya}</div>
                      <div className="text-[10px] text-gray-500">Région {d.region}</div>
                    </td>

                    {/* 3. Sales */}
                    <td className="py-3 px-3.5 text-right font-mono">
                      <span className="font-black text-[#191919]">{d.sales}</span>
                      <span className="text-[11px] text-gray-500 ml-1">unités</span>
                    </td>

                    {/* 4. Stock */}
                    <td className="py-3 px-3.5 text-right font-mono">
                      <span className={`font-bold ${d.stock < 25 ? 'text-[#E30613]' : 'text-gray-800'}`}>
                        {d.stock}
                      </span>
                      <span className="text-[11px] text-gray-500 ml-1">motos</span>
                    </td>

                    {/* 5. Performance */}
                    <td className="py-3 px-3.5 text-center">
                      {getPerformanceBadge(d.performance)}
                    </td>

                    {/* Action */}
                    <td className="py-3 px-3.5 text-center" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => onViewDealership(d)}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-md bg-gray-100 hover:bg-[#191919] hover:text-white text-gray-700 text-xs font-semibold transition-all"
                      >
                        <span>Consulter</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Grid View Alternative */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDealerships.map((dealer) => (
            <div
              key={dealer.id}
              onClick={() => onViewDealership(dealer)}
              className="bg-white rounded-2xl border border-gray-200 p-4 shadow-card hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h3 className="text-sm font-bold text-[#191919] hover:text-[#E30613] transition-colors">
                      {dealer.name}
                    </h3>
                    <p className="text-[10px] font-mono text-gray-400">{dealer.code}</p>
                  </div>
                  {getPerformanceBadge(dealer.performance)}
                </div>

                <div className="space-y-1.5 text-xs text-gray-600 mb-3">
                  <div className="flex items-center gap-1.5 text-[11px]">
                    <MapPin className="w-3.5 h-3.5 text-[#E30613] shrink-0" />
                    <span>{dealer.wilaya} (Région {dealer.region})</span>
                  </div>
                  <div className="text-[11px] text-gray-500">
                    Gérant : <strong className="text-gray-700">{dealer.manager}</strong>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-3 grid grid-cols-2 gap-2 text-center text-xs">
                <div className="bg-gray-50 rounded-lg p-2">
                  <span className="text-[10px] text-gray-400 block font-semibold">Ventes</span>
                  <span className="font-mono font-black text-sm text-[#191919]">{dealer.sales}</span>
                </div>
                <div className="bg-gray-50 rounded-lg p-2">
                  <span className="text-[10px] text-gray-400 block font-semibold">Stock Local</span>
                  <span className={`font-mono font-black text-sm ${dealer.stock < 25 ? 'text-[#E30613]' : 'text-gray-800'}`}>
                    {dealer.stock} un.
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
