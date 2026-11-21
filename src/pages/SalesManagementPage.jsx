import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Download, 
  Plus, 
  Eye, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  AlertTriangle,
  FileText,
  UserCheck,
  ShieldCheck,
  FileCheck,
  Zap,
  Fuel,
  Layers,
  Weight,
  Sparkles,
  Camera,
  Check,
  Info,
  LayoutGrid,
  List,
  Store,
  ChevronRight,
  User,
  Calendar,
  CreditCard,
  Hash,
  MapPin,
  Phone,
  Printer
} from 'lucide-react';
import MotorcycleVisual from '../components/MotorcycleVisual';

export default function SalesManagementPage({
  sales = [],
  motorcycles = [],
  dealerships = [],
  onOpenNewSale = () => {},
  onViewSale = () => {},
  onEditSale = () => {},
  onCancelSale = () => {},
  onSelectModelDetails = () => {},
  roleMode = 'superadmin',
  currentShowroom = null,
}) {
  const isShowroom = roleMode === 'showroom';

  // View Mode: In Showroom, default to 'showcase' (card workstation matching the user's photo)
  const [viewMode, setViewMode] = useState(isShowroom ? 'showcase' : 'showcase');
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedModel, setSelectedModel] = useState('All');
  const [selectedStatusTab, setSelectedStatusTab] = useState('All'); // 'All' | 'Verified' | 'Pending' | 'Unregistered'
  const [localValidatedVins, setLocalValidatedVins] = useState({});
  const [feedbackToast, setFeedbackToast] = useState(null);

  // Selected Sale ID for the Showcase Card presentation
  const [selectedSaleId, setSelectedSaleId] = useState(null);

  const showQuickToast = (msg) => {
    setFeedbackToast(msg);
    setTimeout(() => setFeedbackToast(null), 3500);
  };

  const handleValidateDaira = (sale) => {
    setLocalValidatedVins(prev => ({ ...prev, [sale.vin]: true }));
    showQuickToast(`Carte grise validée avec succès pour le châssis ${sale.vin} (${sale.customerName || 'Acheteur'}).`);
  };

  // Filtered sales based on search, model, and status tab
  const filteredSales = useMemo(() => {
    return sales.filter((sale) => {
      const matchesSearch = searchTerm === '' || 
        sale.vin?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sale.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sale.dealershipName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (sale.customerName && sale.customerName.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesModel = selectedModel === 'All' || sale.modelId === selectedModel || sale.modelName?.toLowerCase().includes(selectedModel.toLowerCase());
      
      const effectiveStatus = localValidatedVins[sale.vin] ? 'Verified' : sale.registrationStatus;
      const matchesTab = selectedStatusTab === 'All' || effectiveStatus === selectedStatusTab;

      return matchesSearch && matchesModel && matchesTab;
    });
  }, [sales, searchTerm, selectedModel, selectedStatusTab, localValidatedVins]);

  // Active selected sale for the showcase view
  const currentSale = useMemo(() => {
    if (filteredSales.length === 0) return null;
    const found = filteredSales.find(s => s.id === selectedSaleId);
    return found || filteredSales[0];
  }, [filteredSales, selectedSaleId]);

  // Model specs corresponding to the current selected sale
  const currentBike = useMemo(() => {
    if (!currentSale) return motorcycles[0] || {};
    return motorcycles.find(m => m.id === currentSale.modelId || m.name === currentSale.modelName) || {
      id: currentSale.modelId || 'vms-model',
      name: currentSale.modelName || 'VMS Moto',
      priceDZD: currentSale.price || 315000,
      image: '/models/vms_cuxi_2.webp',
      category: 'Scooter Citadin',
      displacement: '110 CC',
      power: '7.0 HP @ 7500 rpm',
      mileage: '1.9 L / 100 km',
      tankCapacity: '5.0 L',
      kerbWeight: '90 kg',
      topFeature: "Maniabilité citadine record, feux Full LED & démarrage électrique/kick",
      colors: ['Noir Profond', 'Rouge VMS', 'Blanc Pur', 'Gris Titane']
    };
  }, [currentSale, motorcycles]);

  // Metrics
  const totalCount = sales.length;
  const verifiedCount = sales.filter(s => localValidatedVins[s.vin] || s.registrationStatus === 'Verified').length;
  const pendingCount = sales.filter(s => !localValidatedVins[s.vin] && s.registrationStatus === 'Pending').length;
  const unregisteredCount = sales.filter(s => !localValidatedVins[s.vin] && s.registrationStatus === 'Unregistered').length;

  // Status calculation for current sale
  const isCurrentSaleVerified = currentSale ? (localValidatedVins[currentSale.vin] || currentSale.registrationStatus === 'Verified') : false;
  const isCurrentSalePending = currentSale ? (!localValidatedVins[currentSale.vin] && currentSale.registrationStatus === 'Pending') : false;

  // Export to CSV function
  const handleExportCSV = () => {
    const headers = ["Référence Vente", "N° Châssis (VIN)", "Modèle", "Client (Carte Grise)", "Concessionnaire", "Wilaya", "Montant (DZD)", "Date Vente", "Statut Carte Grise"];
    const rows = filteredSales.map(s => [
      s.id,
      s.vin,
      s.modelName,
      `"${s.customerName || 'Client Particulier'}"`,
      `"${s.dealershipName}"`,
      s.wilaya,
      s.price,
      s.saleDate,
      localValidatedVins[s.vin] ? 'Verified' : s.registrationStatus
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `VMS_Ventes_CartesGrises_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4 pb-12">
      {/* Toast feedback */}
      {feedbackToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#191919] text-white px-4 py-3 rounded-xl shadow-2xl border-l-4 border-l-emerald-500 flex items-center gap-2 text-xs font-semibold animate-in fade-in slide-in-from-bottom duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{feedbackToast}</span>
        </div>
      )}

      {/* Header & Quick Actions */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-extrabold text-[#191919]">
              {isShowroom ? "Ventes & Cartes Grises du Magasin" : "Ventes & Immatriculations Réseau"}
            </h2>
            {isShowroom && (
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-red-50 text-[#E30613] border border-red-200">
                {currentShowroom?.name || 'Showroom Alger (DZ-16-001)'}
              </span>
            )}
          </div>
          <p className="text-xs text-[#777777]">
            {isShowroom 
              ? "Gestion interactive des fiches de vente, immatriculation Daïra et livrets connectés IZRI"
              : "Suivi unifié des transactions et des certificats d'immatriculation du réseau VMS"}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Mode Switcher: Vitrine / Fiches Vente vs Registre Tableau */}
          <div className="flex items-center bg-[#F5F5F7] p-1 rounded-lg border border-gray-200">
            <button
              onClick={() => setViewMode('showcase')}
              className={`p-1.5 rounded-md text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'showcase' ? 'bg-[#191919] text-white shadow-xs' : 'text-gray-600 hover:text-black'
              }`}
              title="Vue Fiches Vente (Présentation Vitrine & Daïra)"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Fiches Vitrine</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-md text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'table' ? 'bg-[#191919] text-white shadow-xs' : 'text-gray-600 hover:text-black'
              }`}
              title="Vue Registre Tableau"
            >
              <List className="w-3.5 h-3.5" />
              <span>Tableau</span>
            </button>
          </div>

          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-300 text-xs font-semibold text-[#191919] hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Exporter</span>
          </button>

          <button
            onClick={onOpenNewSale}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#E30613] text-white text-xs font-bold hover:bg-[#C40510] shadow-sm transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Vente Comptoir</span>
          </button>
        </div>
      </div>

      {/* 4 Unified KPI Mini-Cards (Filterable on Click) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div 
          onClick={() => setSelectedStatusTab('All')}
          className={`bg-white rounded-xl p-3 border cursor-pointer transition-all ${
            selectedStatusTab === 'All' ? 'border-[#191919] ring-2 ring-black/5 bg-gray-50/50' : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="flex items-center justify-between text-gray-500 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider">Total Ventes Magasin</span>
            <FileText className="w-3.5 h-3.5 text-[#191919]" />
          </div>
          <div className="text-xl font-black text-[#191919] font-mono">{totalCount}</div>
          <span className="text-[10px] text-gray-500">Motos facturées au showroom</span>
        </div>

        <div 
          onClick={() => setSelectedStatusTab('Pending')}
          className={`bg-white rounded-xl p-3 border cursor-pointer transition-all ${
            selectedStatusTab === 'Pending' ? 'border-amber-500 ring-2 ring-amber-500/10 bg-amber-50/20' : 'border-gray-200 hover:border-amber-300'
          }`}
        >
          <div className="flex items-center justify-between text-amber-800 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider">En Attente Daïra</span>
            <Clock className="w-3.5 h-3.5 text-amber-600" />
          </div>
          <div className="text-xl font-black text-amber-900 font-mono">{pendingCount}</div>
          <span className="text-[10px] text-amber-800 font-semibold">Dossiers à certifier (priorité)</span>
        </div>

        <div 
          onClick={() => setSelectedStatusTab('Verified')}
          className={`bg-white rounded-xl p-3 border cursor-pointer transition-all ${
            selectedStatusTab === 'Verified' ? 'border-emerald-500 ring-2 ring-emerald-500/10 bg-emerald-50/20' : 'border-gray-200 hover:border-emerald-300'
          }`}
        >
          <div className="flex items-center justify-between text-emerald-800 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider">Cartes Grises Validées</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          </div>
          <div className="text-xl font-black text-emerald-800 font-mono">{verifiedCount}</div>
          <span className="text-[10px] text-emerald-700">Dossiers Daïra certifiés</span>
        </div>

        <div 
          onClick={() => setSelectedStatusTab('Unregistered')}
          className={`bg-white rounded-xl p-3 border cursor-pointer transition-all ${
            selectedStatusTab === 'Unregistered' ? 'border-gray-400 ring-2 ring-gray-400/10 bg-gray-50/50' : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="flex items-center justify-between text-gray-600 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider">Non Inscrits IZRI</span>
            <UserCheck className="w-3.5 h-3.5 text-gray-500" />
          </div>
          <div className="text-xl font-black text-gray-800 font-mono">{unregisteredCount}</div>
          <span className="text-[10px] text-gray-500">Relance livret digital</span>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white rounded-2xl border border-gray-200 p-3 shadow-card flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
          {/* VIN / Reference / Customer Search */}
          <div className="relative min-w-[220px]">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher VIN, client, modèle..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#F5F5F7] border border-gray-200 rounded-lg pl-8 pr-2.5 py-1.5 text-xs text-[#191919] placeholder:text-gray-400 focus:outline-none focus:border-[#E30613]"
            />
          </div>

          {/* Model Filter */}
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="bg-[#F5F5F7] border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs text-[#191919] focus:outline-none focus:border-[#E30613] cursor-pointer"
          >
            <option value="All">Tous les Modèles</option>
            {motorcycles.map(m => (
              <option key={m.id} value={m.id}>{m.name}</option>
            ))}
          </select>

          {/* Status Tab Pills */}
          <div className="flex items-center bg-[#F5F5F7] p-0.5 rounded-lg border border-gray-200">
            <button
              onClick={() => setSelectedStatusTab('All')}
              className={`px-2 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                selectedStatusTab === 'All' ? 'bg-[#191919] text-white shadow-xs' : 'text-gray-600 hover:text-black'
              }`}
            >
              Tous ({sales.length})
            </button>
            <button
              onClick={() => setSelectedStatusTab('Pending')}
              className={`px-2 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer flex items-center gap-1 ${
                selectedStatusTab === 'Pending' ? 'bg-amber-600 text-white shadow-xs' : 'text-gray-600 hover:text-black'
              }`}
            >
              <span>En Attente Daïra</span>
              {pendingCount > 0 && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  selectedStatusTab === 'Pending' ? 'bg-white text-amber-700' : 'bg-amber-100 text-amber-800'
                }`}>
                  {pendingCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setSelectedStatusTab('Verified')}
              className={`px-2 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                selectedStatusTab === 'Verified' ? 'bg-emerald-600 text-white shadow-xs' : 'text-gray-600 hover:text-black'
              }`}
            >
              Validées ({verifiedCount})
            </button>
          </div>

          {(searchTerm || selectedModel !== 'All' || selectedStatusTab !== 'All') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedModel('All');
                setSelectedStatusTab('All');
              }}
              className="text-xs text-[#E30613] hover:underline font-semibold cursor-pointer"
            >
              Réinitialiser
            </button>
          )}
        </div>

        <span className="text-xs text-[#777777] font-semibold self-end sm:self-auto">
          {filteredSales.length} dossier(s) trouvé(s)
        </span>
      </div>

      {/* ========================================================================= */}
      {/* 1. SHOWCASE WORKSTATION PRESENTATION (EXACTLY MATCHING THE USER'S PHOTO) */}
      {/* ========================================================================= */}
      {viewMode === 'showcase' && (
        filteredSales.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center text-gray-500 shadow-card">
            <FileText className="w-10 h-10 text-gray-300 mx-auto mb-2" />
            <h3 className="text-sm font-bold text-[#191919]">Aucun dossier correspondant</h3>
            <p className="text-xs text-gray-400 mt-1">Modifiez vos filtres ou enregistrez une nouvelle vente comptoir.</p>
            <button 
              onClick={() => { setSearchTerm(''); setSelectedModel('All'); setSelectedStatusTab('All'); }}
              className="mt-3 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-xs font-bold rounded-lg text-[#191919] transition-colors cursor-pointer"
            >
              Réinitialiser les filtres
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-card hover:shadow-hover transition-all">
            <div className="flex flex-col lg:flex-row items-stretch gap-4">
              
              {/* PANEL 1 (LEFT): Vertical Sales & Carte Grise Files Selector */}
              <div className="flex lg:flex-col gap-2 shrink-0 overflow-x-auto lg:overflow-y-auto max-h-[460px] pb-2 lg:pb-0 scrollbar-thin lg:w-48">
                <div className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider hidden lg:block px-1 pb-1">
                  Dossiers Ventes ({filteredSales.length})
                </div>

                {filteredSales.map((sale) => {
                  const isSelected = (currentSale && currentSale.id === sale.id);
                  const isVerified = localValidatedVins[sale.vin] || sale.registrationStatus === 'Verified';
                  const isPending = !localValidatedVins[sale.vin] && sale.registrationStatus === 'Pending';
                  
                  // Find image for this sale's model
                  const bikeSpec = motorcycles.find(m => m.id === sale.modelId || m.name === sale.modelName);
                  const thumbnailImg = bikeSpec?.image || '/models/vms_cuxi_2.webp';

                  return (
                    <button
                      key={sale.id}
                      onClick={() => setSelectedSaleId(sale.id)}
                      className={`relative flex items-center gap-2 p-2 rounded-xl border text-left transition-all duration-200 shrink-0 cursor-pointer ${
                        isSelected
                          ? 'border-[#E30613] bg-red-50/50 ring-2 ring-[#E30613]/20 shadow-xs'
                          : 'border-gray-200 bg-[#F9F9FB] hover:border-gray-300 hover:bg-gray-100'
                      } w-40 lg:w-full group`}
                    >
                      {/* Miniature Motorcycle Image */}
                      <div className="w-12 h-10 bg-white rounded-lg border border-gray-200/80 p-0.5 shrink-0 overflow-hidden flex items-center justify-center">
                        <img
                          src={thumbnailImg}
                          alt={sale.modelName}
                          className="w-full h-full object-contain group-hover:scale-110 transition-transform"
                        />
                      </div>

                      {/* Sale & Client Metadata */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1">
                          <span className="font-extrabold text-xs text-[#191919] truncate leading-tight">
                            {sale.modelName}
                          </span>
                          {/* Status Dot */}
                          <span 
                            className={`w-2 h-2 rounded-full shrink-0 ${
                              isVerified ? 'bg-emerald-500' : isPending ? 'bg-amber-500 animate-pulse' : 'bg-gray-400'
                            }`}
                            title={isVerified ? 'Carte Grise Validée' : isPending ? 'En attente Daïra' : 'Non inscrit'}
                          />
                        </div>
                        <div className="text-[10px] text-gray-600 truncate font-semibold">
                          {sale.customerName || 'Acheteur Particulier'}
                        </div>
                        <div className="text-[9px] font-mono text-gray-400 truncate">
                          {sale.vin ? sale.vin.split('-').slice(-2).join('-') : sale.id}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* PANEL 2 (CENTER): Large Motorcycle Canvas with Identification Badges */}
              <div className="flex-1 bg-gradient-to-b from-[#F9F9FB] via-[#F4F4F7] to-[#EDEDF2] rounded-xl border border-gray-200/80 p-5 flex flex-col items-center justify-between min-h-[360px] relative overflow-hidden group">
                {/* Top Info Bar inside canvas */}
                <div className="w-full flex items-center justify-between z-10 gap-2 flex-wrap">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white border border-gray-200 text-[#191919] shadow-2xs text-[10px] font-extrabold uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E30613]" />
                    <span className="font-mono">CHÂSSIS (VIN) : {currentSale?.vin || 'DZ-VMS-AKBOU'}</span>
                  </div>
                  
                  <div className="flex items-center gap-1.5 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-md border border-gray-200 text-[10px] font-bold text-[#191919]">
                    <span className={`w-2 h-2 rounded-full ${
                      isCurrentSaleVerified ? 'bg-emerald-500' : isCurrentSalePending ? 'bg-amber-500 animate-pulse' : 'bg-gray-400'
                    }`} />
                    <span>
                      Réf: {currentSale?.id} · {currentSale?.saleDate}
                    </span>
                  </div>
                </div>

                {/* Big Interactive Motorcycle Visual of the Sold Unit */}
                <div className="w-full py-4 my-auto flex items-center justify-center transform group-hover:scale-103 transition-transform duration-300">
                  <MotorcycleVisual 
                    modelId={currentBike.id} 
                    imageSrc={currentBike.image}
                    color="#E30613" 
                    className="w-full max-w-[440px] h-[220px]" 
                  />
                </div>

                {/* Bottom Badge & Subtitle */}
                <div className="w-full flex items-center justify-between text-xs text-[#777777] z-10 pt-2 border-t border-gray-200/70">
                  <div className="flex items-center gap-1.5 truncate">
                    <User className="w-3.5 h-3.5 text-[#191919]" />
                    <span className="font-bold text-[#191919] truncate">
                      {currentSale?.customerName || 'Acheteur Particulier'}
                    </span>
                    <span className="text-gray-400 text-[11px] truncate">
                      ({currentSale?.wilaya || '16 - Alger'})
                    </span>
                  </div>
                  <span className="font-mono text-[11px] font-bold text-gray-700 bg-white px-2 py-0.5 rounded border border-gray-200 shrink-0">
                    Garantie Usine 24 Mois
                  </span>
                </div>
              </div>

              {/* PANEL 3 (RIGHT): Sleek Dark Card (#191919) Tailored for Sale & Carte Grise */}
              <div className="w-full lg:w-[380px] shrink-0 bg-[#191919] text-white rounded-xl p-4 flex flex-col justify-between shadow-xl relative overflow-hidden">
                {/* Subtle Red glow in corner */}
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#E30613]/25 rounded-full blur-2xl pointer-events-none"></div>

                <div>
                  {/* Top Pills: Dossier Daïra & Current Status */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-white/10 text-red-400 border border-red-500/30">
                      DOSSIER CARTE GRISE · DAÏRA
                    </span>
                    
                    {/* Status Pill matching photo indicator style */}
                    {isCurrentSaleVerified ? (
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                        <span>Carte Grise Validée</span>
                      </div>
                    ) : isCurrentSalePending ? (
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-amber-400 bg-amber-950/60 border border-amber-500/30 px-2 py-0.5 rounded-full animate-pulse">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                        <span>En Attente Daïra</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-300 bg-white/10 border border-white/10 px-2 py-0.5 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                        <span>Non Inscrit</span>
                      </div>
                    )}
                  </div>

                  {/* Model Name & Price */}
                  <div className="flex items-baseline justify-between gap-2 border-b border-white/10 pb-3 mb-3">
                    <div>
                      <h3 className="text-xl font-black tracking-tight text-white">
                        {currentSale?.modelName || currentBike.name}
                      </h3>
                      <p className="text-[11px] text-gray-400 font-medium font-mono">
                        N° Châssis: {currentSale?.vin}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-[9px] uppercase tracking-wider text-gray-400 block font-semibold">Montant Facturé</span>
                      <span className="text-lg font-extrabold text-[#FFFFFF] font-mono tracking-tight">
                        {currentSale?.price?.toLocaleString() || currentBike.priceDZD?.toLocaleString()} <span className="text-xs text-[#E30613]">DZD</span>
                      </span>
                    </div>
                  </div>

                  {/* 2x2 Details Grid: Customer, Date, Payment & Registration */}
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    {/* 1. Client Acquéreur */}
                    <div className="bg-white/5 border border-white/10 rounded-lg p-2">
                      <div className="flex items-center gap-1.5 text-gray-400 text-[10px] mb-0.5">
                        <User className="w-3 h-3 text-amber-400" />
                        <span>Acheteur (Titulaire)</span>
                      </div>
                      <div className="text-xs font-bold text-white truncate">
                        {currentSale?.customerName || "Client Particulier"}
                      </div>
                      <div className="text-[10px] text-gray-400 truncate">
                        Wilaya: {currentSale?.wilaya || "16 - Alger"}
                      </div>
                    </div>

                    {/* 2. Date & Canal de Vente */}
                    <div className="bg-white/5 border border-white/10 rounded-lg p-2">
                      <div className="flex items-center gap-1.5 text-gray-400 text-[10px] mb-0.5">
                        <Calendar className="w-3 h-3 text-emerald-400" />
                        <span>Date de Facturation</span>
                      </div>
                      <div className="text-xs font-bold text-white truncate font-mono">
                        {currentSale?.saleDate || "2026-11-20"}
                      </div>
                      <div className="text-[10px] text-gray-400 truncate">
                        Comptoir Magasin
                      </div>
                    </div>

                    {/* 3. Règlement */}
                    <div className="bg-white/5 border border-white/10 rounded-lg p-2">
                      <div className="flex items-center gap-1.5 text-gray-400 text-[10px] mb-0.5">
                        <CreditCard className="w-3 h-3 text-blue-400" />
                        <span>Mode Règlement</span>
                      </div>
                      <div className="text-xs font-bold text-white truncate">
                        {currentSale?.paymentMethod || "Virement BEA"}
                      </div>
                      <div className="text-[10px] text-emerald-400 font-semibold truncate">
                        ✓ Facture Réglée
                      </div>
                    </div>

                    {/* 4. Concessionnaire */}
                    <div className="bg-white/5 border border-white/10 rounded-lg p-2">
                      <div className="flex items-center gap-1.5 text-gray-400 text-[10px] mb-0.5">
                        <MapPin className="w-3 h-3 text-purple-400" />
                        <span>Showroom Vendeur</span>
                      </div>
                      <div className="text-xs font-bold text-white truncate">
                        {currentSale?.dealershipName || "SARL Alger Moto"}
                      </div>
                      <div className="text-[10px] text-gray-400 truncate">
                        Code: DZ-16-001
                      </div>
                    </div>
                  </div>

                  {/* Daïra Certification Highlight Box (Matching Photo Spec Box) */}
                  <div className={`border rounded-lg p-2.5 mb-3 ${
                    isCurrentSaleVerified 
                      ? 'bg-gradient-to-r from-emerald-950/60 to-black border-emerald-500/40'
                      : isCurrentSalePending
                      ? 'bg-gradient-to-r from-amber-950/60 to-black border-amber-500/40'
                      : 'bg-gradient-to-r from-red-950/60 to-black border-red-500/40'
                  }`}>
                    <div className="flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider mb-0.5">
                      {isCurrentSaleVerified ? (
                        <>
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">Homologation & Carte Grise Délivrée</span>
                        </>
                      ) : isCurrentSalePending ? (
                        <>
                          <Clock className="w-3 h-3 text-amber-400" />
                          <span className="text-amber-400">Dossier en Cours auprès de la Daïra</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3 h-3 text-[#E30613]" />
                          <span className="text-[#E30613]">Livret Numérique IZRI Non Lié</span>
                        </>
                      )}
                    </div>
                    <p className="text-[11px] text-gray-200 leading-tight">
                      {isCurrentSaleVerified
                        ? "Dossier validé par les services de la Daïra. Carte grise biométrique remise au propriétaire et synchronisée dans l'application IZRI."
                        : isCurrentSalePending
                        ? "Dépôt d'immatriculation transmis à la Daïra. Récépissé 15 jours actif. Cliquez ci-dessous pour certifier la réception de la carte grise finale."
                        : "Véhicule livré au client. Invitation par SMS envoyée pour activation du carnet de garantie électronique sur l'application mobile IZRI."
                      }
                    </p>
                  </div>
                </div>

                {/* Action Buttons (Direct Validation & Full File Modal) */}
                <div className="flex items-center gap-2 pt-2 border-t border-white/10">
                  {/* Primary Action Button: Validate Daïra directly if pending */}
                  {isCurrentSalePending ? (
                    <button
                      onClick={() => handleValidateDaira(currentSale)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-[#E30613] hover:bg-[#C40510] text-xs font-bold text-white transition-all shadow-md cursor-pointer animate-pulse"
                      title="Valider la réception de la carte grise définitive"
                    >
                      <FileCheck className="w-4 h-4" />
                      <span>Valider Carte Grise Daïra</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => onViewSale(currentSale)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-emerald-600/90 hover:bg-emerald-600 text-xs font-bold text-white transition-colors cursor-pointer"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Dossier Certifié & Valide</span>
                    </button>
                  )}

                  {/* Secondary Action: View full modal & print certificate */}
                  <button
                    onClick={() => onViewSale(currentSale)}
                    className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors cursor-pointer"
                    title="Ouvrir le dossier complet avec certificat de conformité"
                  >
                    <Eye className="w-3.5 h-3.5 text-gray-300" />
                    <span>Dossier</span>
                  </button>

                  <button
                    onClick={() => onEditSale(currentSale)}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/15 text-gray-300 hover:text-white transition-colors cursor-pointer"
                    title="Modifier la vente"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        )
      )}

      {/* ========================================================================= */}
      {/* 2. TABULAR REGISTER VIEW (Accessible when user switches to 'Tableau')     */}
      {/* ========================================================================= */}
      {viewMode === 'table' && (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-gray-200 text-[#777777] font-semibold text-[11px] bg-[#F9F9FB]">
                  <th className="py-3 px-3.5">Numéro Châssis (VIN)</th>
                  <th className="py-3 px-3.5">Modèle & Prix</th>
                  <th className="py-3 px-3.5">Acheteur (Carte Grise)</th>
                  <th className="py-3 px-3.5">Date & Règlement</th>
                  <th className="py-3 px-3.5 text-center">Statut Carte Grise & IZRI</th>
                  <th className="py-3 px-3.5 text-center">Actions & Validation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredSales.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-gray-500 text-xs">
                      Aucune vente ou dossier d'immatriculation correspondant aux critères.
                    </td>
                  </tr>
                ) : (
                  filteredSales.map((sale) => {
                    const isVerified = localValidatedVins[sale.vin] || sale.registrationStatus === 'Verified';
                    const isPending = !localValidatedVins[sale.vin] && sale.registrationStatus === 'Pending';

                    return (
                      <tr 
                        key={sale.id}
                        className="hover:bg-gray-50/80 transition-colors"
                      >
                        {/* 1. Motorcycle Identifier (VIN) */}
                        <td className="py-3 px-3.5">
                          <div className="font-mono text-xs font-bold text-[#191919] bg-gray-100 px-2 py-0.5 rounded border border-gray-200 inline-block select-all">
                            {sale.vin}
                          </div>
                          <div className="text-[10px] text-gray-400 font-mono mt-0.5">{sale.id}</div>
                        </td>

                        {/* 2. Model */}
                        <td className="py-3 px-3.5">
                          <div className="font-bold text-[#191919]">{sale.modelName}</div>
                          <div className="text-[10px] text-gray-500 font-mono">{sale.price?.toLocaleString()} DZD</div>
                        </td>

                        {/* 3. Customer (Owner) */}
                        <td className="py-3 px-3.5">
                          <div className="font-bold text-[#191919]">{sale.customerName || "Client Particulier"}</div>
                          <div className="text-[10px] text-gray-500">{sale.wilaya || "16 - Alger"}</div>
                        </td>

                        {/* 4. Sale Date & Payment */}
                        <td className="py-3 px-3.5">
                          <div className="font-mono font-medium text-[#191919]">{sale.saleDate}</div>
                          <div className="text-[10px] text-gray-500">{sale.paymentMethod || sale.channel}</div>
                        </td>

                        {/* 5. Carte Grise & Registration Status */}
                        <td className="py-3 px-3.5 text-center">
                          {isVerified ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                              Carte Grise Certifiée
                            </span>
                          ) : isPending ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                              <Clock className="w-3 h-3 text-amber-600" />
                              En Attente Daïra
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-gray-100 text-gray-700 border border-gray-300">
                              Non Inscrit
                            </span>
                          )}
                        </td>

                        {/* 6. Unified Actions: Details + Direct Validation */}
                        <td className="py-3 px-3.5 text-center">
                          <div className="flex items-center justify-center gap-1.5">
                            {isPending && (
                              <button
                                onClick={() => handleValidateDaira(sale)}
                                className="px-2 py-1 rounded bg-[#E30613] hover:bg-[#C40510] text-white text-[11px] font-bold transition-all shadow-2xs cursor-pointer flex items-center gap-1"
                                title="Valider la réception de la carte grise de la Daïra"
                              >
                                <FileCheck className="w-3 h-3" />
                                <span>Valider Daïra</span>
                              </button>
                            )}

                            <button
                              onClick={() => onViewSale(sale)}
                              className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-gray-100 hover:bg-[#191919] hover:text-white text-gray-700 text-xs font-semibold transition-all cursor-pointer"
                              title="Voir le dossier complet"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>Dossier</span>
                            </button>

                            <button
                              onClick={() => onEditSale(sale)}
                              className="p-1 rounded text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                              title="Modifier"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>

                            <button
                              onClick={() => onCancelSale(sale)}
                              className="p-1 rounded text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                              title="Annuler"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
