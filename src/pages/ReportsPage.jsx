import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Calendar, 
  Filter, 
  CheckCircle2, 
  Building2, 
  Bike, 
  Boxes, 
  Printer, 
  TrendingUp 
} from 'lucide-react';

export default function ReportsPage() {
  const [selectedReportType, setSelectedReportType] = useState('sales');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const reportsList = [
    {
      id: 'sales',
      title: 'Rapport Commercial des Ventes Réseau',
      desc: 'Synthèse détaillée des volumes livrés, ventilation par canal et chiffre d\'affaires par wilaya.',
      freq: 'Mensuel & Trimestriel',
      icon: TrendingUp,
    },
    {
      id: 'dealers',
      title: 'Audit de Performance des Concessionnaires',
      desc: 'Indicateurs clés d\'activité, respect des quotas d\'usine et taux d\'immatriculation par Daïra.',
      freq: 'Trimestriel',
      icon: Building2,
    },
    {
      id: 'stock',
      title: 'État d\'Inventaire & Rotation des Stocks',
      desc: 'Niveaux d\'unités complètes en usine Akbou, dépôts centraux et risque de rupture par modèle.',
      freq: 'Hebdomadaire',
      icon: Boxes,
    },
    {
      id: 'demand',
      title: 'Plan Prévisionnel de la Demande VMS',
      desc: 'Recommandations d\'assemblage et prévisions de la demande par moyenne mobile sur 14 jours.',
      freq: 'Bi-mensuel',
      icon: Bike,
    },
  ];

  const handleDownload = (format) => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="space-y-4 pb-12">
      {/* Toast Alert */}
      {downloadSuccess && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#191919] text-white px-4 py-3 rounded-xl shadow-2xl border border-emerald-500/50 flex items-center gap-2 animate-in fade-in slide-in-from-bottom duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="text-xs font-semibold">Génération et export du rapport VMS Industrie achevés avec succès.</span>
        </div>
      )}

      {/* Header */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-extrabold text-[#191919]">
            Rapports
          </h2>
          <p className="text-xs text-[#777777]">
            Synthèses et exports de données
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F5F5F7] border border-gray-200 text-xs font-semibold text-[#191919]">
            <Calendar className="w-3.5 h-3.5 text-gray-500" />
            <span>Exercice 2026 (YTD)</span>
          </div>
        </div>
      </div>

      {/* Report Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reportsList.map((rep) => {
          const Icon = rep.icon;
          const isSelected = selectedReportType === rep.id;
          return (
            <div
              key={rep.id}
              onClick={() => setSelectedReportType(rep.id)}
              className={`bg-white rounded-2xl border p-4 shadow-card hover:shadow-hover transition-all cursor-pointer flex flex-col justify-between ${
                isSelected ? 'border-[#E30613] ring-2 ring-[#E30613]/20' : 'border-gray-200'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    isSelected ? 'bg-[#E30613] text-white' : 'bg-gray-100 text-[#191919]'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono font-bold text-gray-400 uppercase bg-gray-50 px-2 py-0.5 rounded">
                    {rep.freq}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-[#191919] mb-1">
                  {rep.title}
                </h3>
                <p className="text-xs text-[#777777] leading-relaxed">
                  {rep.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-gray-100 mt-4 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-[#191919]">Format: CSV / XLSX / PDF</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDownload('csv');
                  }}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#191919] hover:bg-black text-white text-xs font-bold transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Exporter</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Custom Report Builder Panel */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-card space-y-4">
        <div>
          <h3 className="text-sm font-bold text-[#191919]">
            Générateur d'Extraction Personnalisée
          </h3>
          <p className="text-xs text-[#777777]">
            Sélectionnez les critères pour générer une vue consolidée prête pour tableur
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div>
            <label className="font-bold text-[#191919] block mb-1">Périmètre Géographique</label>
            <select className="w-full bg-[#F5F5F7] border border-gray-200 rounded-lg p-2 focus:outline-none focus:border-[#E30613]">
              <option>Ensemble du Territoire National (38 Wilayas)</option>
              <option>Région Centre (Alger, Blida, Tizi Ouzou)</option>
              <option>Région Est (Béjaïa, Sétif, Constantine)</option>
              <option>Région Ouest (Oran, Tlemcen)</option>
              <option>Région Sud (Biskra, Ouargla)</option>
            </select>
          </div>

          <div>
            <label className="font-bold text-[#191919] block mb-1">Segment Deux-Roues</label>
            <select className="w-full bg-[#F5F5F7] border border-gray-200 rounded-lg p-2 focus:outline-none focus:border-[#E30613]">
              <option>Tous les Segments</option>
              <option>Commuter & Scooters 125cc</option>
              <option>Maxi-Scooters 250cc</option>
              <option>VMS XDV 300 & Victoria 300</option>
              <option>Flotte & Utilitaires 150cc</option>
            </select>
          </div>

          <div>
            <label className="font-bold text-[#191919] block mb-1">Format de Sortie</label>
            <select className="w-full bg-[#F5F5F7] border border-gray-200 rounded-lg p-2 focus:outline-none focus:border-[#E30613]">
              <option>Classeur Excel (.xlsx)</option>
              <option>Fichier Données CSV (.csv)</option>
              <option>Document Exécutif PDF (.pdf)</option>
            </select>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={() => handleDownload('custom')}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#E30613] text-white text-xs font-bold hover:bg-[#C40510] shadow-sm transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Générer le Rapport Consolidé</span>
          </button>
        </div>
      </div>
    </div>
  );
}
