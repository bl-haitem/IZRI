import React, { useState } from 'react';
import { 
  UserCheck, 
  Clock, 
  AlertCircle, 
  Search, 
  CheckCircle2,
  ShieldCheck,
  Link2
} from 'lucide-react';

export default function CustomerRegistrationsPage({ sales = [] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [validatedVins, setValidatedVins] = useState({});

  const verifiedCount = sales.filter(s => s.registrationStatus === 'Verified').length;
  const pendingCount = sales.filter(s => s.registrationStatus === 'Pending').length;
  const unregisteredCount = sales.filter(s => s.registrationStatus === 'Unregistered').length;

  const handleValidateClaim = (vin) => {
    setValidatedVins(prev => ({ ...prev, [vin]: true }));
  };

  const filteredSales = sales.filter(s => {
    const matchesSearch = searchTerm === '' ||
      s.vin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.modelName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.dealershipName.toLowerCase().includes(searchTerm.toLowerCase());

    const effectiveStatus = validatedVins[s.vin] ? 'Verified' : s.registrationStatus;
    const matchesStatus = statusFilter === 'All' || effectiveStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-4 pb-12">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-extrabold text-[#191919]">
            Enregistrements Propriétaires (Application IZRI)
          </h2>
          <p className="text-xs text-[#777777]">
            Rapprochement certifié entre la vente concession et le compte mobile conducteur
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-gray-500 font-mono">
          <Link2 className="w-4 h-4 text-[#E30613]" />
          <span>Liaison Unique par Numéro Châssis (VIN)</span>
        </div>
      </div>

      {/* 3 Focused Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* 1. Verified Owners */}
        <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-card border-l-4 border-l-emerald-500">
          <div className="flex items-center justify-between text-gray-500 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">Propriétaires Vérifiés</span>
            <UserCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-[#191919] font-mono">
            {verifiedCount.toLocaleString()} <span className="text-xs text-gray-500 font-sans font-medium">comptes</span>
          </div>
          <span className="text-xs text-emerald-700 font-semibold">Garantie constructeur activée</span>
        </div>

        {/* 2. Pending Claims */}
        <div className="bg-amber-50/70 rounded-2xl border border-amber-200 p-4 shadow-card border-l-4 border-l-amber-500">
          <div className="flex items-center justify-between text-amber-900 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-900">Revendications en Attente</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-black text-amber-900 font-mono">
            {pendingCount.toLocaleString()} <span className="text-xs text-amber-800 font-sans font-medium">dossiers</span>
          </div>
          <span className="text-xs text-amber-800 font-medium">Rapprochement Daïra sous 48h</span>
        </div>

        {/* 3. Sold Motorcycles Without App Registration */}
        <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-card border-l-4 border-l-gray-400">
          <div className="flex items-center justify-between text-gray-500 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-700">Motos Vendues Non Inscrites</span>
            <AlertCircle className="w-4 h-4 text-gray-500" />
          </div>
          <div className="text-2xl font-black text-[#191919] font-mono">
            {unregisteredCount.toLocaleString()} <span className="text-xs text-gray-500 font-sans font-medium">motos</span>
          </div>
          <span className="text-xs text-[#777777]">Vente concession constatée sans compte IZRI</span>
        </div>
      </div>

      {/* Ecosystem Rule Note (Clear UX context without clutter) */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs text-gray-600 flex items-center gap-2">
        <ShieldCheck className="w-4 h-4 text-[#191919] shrink-0" />
        <span>
          <strong>Règle Écosystème IZRI :</strong> La vente en concession crée l'enregistrement unique. L'inscription sur l'application mobile valide l'identité du propriétaire sans doubler la vente. Les données personnelles privées restent protégées.
        </span>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-card flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher par VIN, modèle, concession..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#F5F5F7] border border-gray-200 rounded-lg pl-8 pr-2.5 py-1.5 text-xs text-[#191919] focus:outline-none focus:border-[#E30613]"
          />
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#F5F5F7] border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs text-[#191919] focus:outline-none focus:border-[#E30613]"
          >
            <option value="All">Tous les Statuts</option>
            <option value="Verified">Propriétaires Vérifiés</option>
            <option value="Pending">Revendications en Attente</option>
            <option value="Unregistered">Motos Non Inscrites</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-200 text-[#777777] font-semibold text-[11px] bg-[#F9F9FB]">
                <th className="py-3 px-3.5">Numéro Châssis (VIN)</th>
                <th className="py-3 px-3.5">Modèle Moto</th>
                <th className="py-3 px-3.5">Concessionnaire d'Achat</th>
                <th className="py-3 px-3.5">Date Vente</th>
                <th className="py-3 px-3.5 text-center">Statut Application IZRI</th>
                <th className="py-3 px-3.5 text-center">Action Super Admin</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredSales.map((sale) => {
                const isVerified = validatedVins[sale.vin] || sale.registrationStatus === 'Verified';
                const isPending = !validatedVins[sale.vin] && sale.registrationStatus === 'Pending';

                return (
                  <tr key={sale.id} className="hover:bg-gray-50/80 transition-colors">
                    {/* VIN as the universal connection key */}
                    <td className="py-3 px-3.5 font-mono font-bold text-[#191919]">
                      <span className="bg-gray-100 px-2 py-0.5 rounded border border-gray-200 select-all">
                        {sale.vin}
                      </span>
                    </td>

                    <td className="py-3 px-3.5 font-bold text-[#191919]">
                      {sale.modelName}
                    </td>

                    <td className="py-3 px-3.5 text-gray-700 font-medium">
                      {sale.dealershipName}
                      <span className="text-[10px] text-gray-400 block">{sale.wilaya}</span>
                    </td>

                    <td className="py-3 px-3.5 font-mono text-gray-600">
                      {sale.saleDate}
                    </td>

                    <td className="py-3 px-3.5 text-center">
                      {isVerified ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          Propriétaire Vérifié
                        </span>
                      ) : isPending ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                          <Clock className="w-3 h-3 text-amber-600" />
                          Revendication en Attente
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-gray-100 text-gray-600">
                          Non Inscrit
                        </span>
                      )}
                    </td>

                    <td className="py-3 px-3.5 text-center">
                      {isPending ? (
                        <button
                          onClick={() => handleValidateClaim(sale.vin)}
                          className="px-2.5 py-1 rounded bg-[#E30613] text-white hover:bg-[#C40510] text-[11px] font-bold shadow-xs transition-colors"
                        >
                          Valider Revendication
                        </button>
                      ) : isVerified ? (
                        <span className="text-[11px] text-emerald-700 font-semibold">
                          Certifié VMS
                        </span>
                      ) : (
                        <span className="text-[11px] text-gray-400">
                          En attente client
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
