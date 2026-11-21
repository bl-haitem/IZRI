import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ShowroomDashboard from './components/ShowroomDashboard';
import SalesManagementPage from './pages/SalesManagementPage';
import MotorcycleCatalogPage from './pages/MotorcycleCatalogPage';
import StockManagementPage from './pages/StockManagementPage';

import SaleDetailModal from './components/modals/SaleDetailModal';
import EditSaleModal from './components/modals/EditSaleModal';
import CancelSaleModal from './components/modals/CancelSaleModal';
import NewSaleModal from './components/modals/NewSaleModal';
import MotorcycleDetailModal from './components/modals/MotorcycleDetailModal';

import {
  INITIAL_MOTORCYCLES, INITIAL_DEALERSHIPS, INITIAL_SALES,
  SHOWROOM_CONFIG, getStoredData, saveStoredData
} from './data/mockData';

export default function App() {
  const currentShowroom = SHOWROOM_CONFIG;
  const [activePage, setActivePage] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState(null);

  const [motorcycles, setMotorcycles] = useState(() => getStoredData('motorcycles', INITIAL_MOTORCYCLES));
  const [dealerships, setDealerships] = useState(() => getStoredData('dealerships', INITIAL_DEALERSHIPS));
  const [sales, setSales] = useState(() => getStoredData('sales', INITIAL_SALES));

  const [selectedSaleDetail, setSelectedSaleDetail] = useState(null);
  const [editingSale, setEditingSale] = useState(null);
  const [cancelingSale, setCancelingSale] = useState(null);
  const [isNewSaleOpen, setIsNewSaleOpen] = useState(false);
  const [selectedMotorcycleModal, setSelectedMotorcycleModal] = useState(null);

  const showToast = (msg) => { setToastMessage(msg); setTimeout(() => setToastMessage(null), 3000); };

  // Data specialized exclusively for this showroom (SARL Alger Moto Performance)
  const showroomSales = sales.filter(s => 
    s.dealershipId === currentShowroom.id || 
    (s.dealershipName && s.dealershipName.toLowerCase().includes(currentShowroom.name.toLowerCase()))
  );

  const handleAddSale = (newSale) => {
    const updatedSales = [newSale, ...sales];
    setSales(updatedSales);
    saveStoredData('sales', updatedSales);
    setMotorcycles(prev => { 
      const u = prev.map(m => m.id === newSale.modelId ? { ...m, unitsSold: (m.unitsSold||0)+1, availableStock: Math.max(0,(m.availableStock||0)-1) } : m); 
      saveStoredData('motorcycles', u); 
      return u; 
    });
    setDealerships(prev => { 
      const u = prev.map(d => d.id === newSale.dealershipId ? { ...d, sales: (d.sales||0)+1, stock: Math.max(0,(d.stock||0)-1) } : d); 
      saveStoredData('dealerships', u); 
      return u; 
    });
    setIsNewSaleOpen(false);
    showToast(`Vente comptoir ${newSale.id} enregistrée.`);
  };

  const handleSaveEditSale = (s) => { 
    const u = sales.map(x => x.id === s.id ? s : x); 
    setSales(u); 
    saveStoredData('sales', u); 
    setEditingSale(null); 
    showToast(`Dossier ${s.id} mis à jour.`); 
  };
  
  const handleConfirmCancelSale = (id, reason) => { 
    const u = sales.map(s => s.id === id ? { ...s, registrationStatus: 'Cancelled', notes: `Annulée : ${reason}` } : s); 
    setSales(u); 
    saveStoredData('sales', u); 
    setCancelingSale(null); 
    showToast(`Vente ${id} annulée.`); 
  };

  // Showroom Titles
  const showroomTitles = {
    dashboard: ["Tableau de Bord Showroom", `${currentShowroom.name} (${currentShowroom.code})`],
    sales: ["Ventes & Cartes Grises", `Transactions comptoir & immatriculations Daïra • ${currentShowroom.name}`],
    stock: ["Stock en Magasin", `Disponibilité physique hall d'expo & dépôt • ${currentShowroom.name}`],
    models: ["Catalogue & Tarifs", `Tarifs TTC et disponibilité magasin • ${currentShowroom.name}`],
  };

  const [title, subtitle] = showroomTitles[activePage] || showroomTitles.dashboard;

  return (
    <div className="min-h-screen bg-[#F5F5F7] text-[#191919] flex">
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-[#191919] text-white px-4 py-3 rounded-xl shadow-2xl border-l-4 border-l-[#E30613] flex items-center gap-2 text-xs font-semibold animate-in fade-in duration-200">
          <span className="w-2 h-2 rounded-full bg-[#E30613]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Pure Showroom Sidebar (No Usine Switcher) */}
      <Sidebar 
        activePage={activePage} 
        setActivePage={setActivePage} 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)}
        currentShowroom={currentShowroom}
      />

      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">
        <Header 
          title={title} 
          subtitle={subtitle} 
          onOpenSidebar={() => setIsSidebarOpen(true)} 
          onOpenNewSale={() => setIsNewSaleOpen(true)} 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery}
          currentShowroom={currentShowroom}
        />

        <main className="flex-1 p-4 lg:p-6 max-w-[1600px] w-full mx-auto">
          {/* 1. Showroom Dashboard */}
          {activePage === 'dashboard' && (
            <ShowroomDashboard
              currentShowroom={currentShowroom}
              motorcycles={motorcycles}
              sales={showroomSales}
              dealerships={dealerships}
              onSelectShowroom={() => {}}
              onOpenNewSale={() => setIsNewSaleOpen(true)}
              onViewSale={(s) => setSelectedSaleDetail(s)}
              onGoToStock={() => setActivePage('stock')}
              onGoToSales={() => setActivePage('sales')}
            />
          )}

          {/* 2. Sales & Cartes Grises Management (3-Panel Showcase Workstation) */}
          {activePage === 'sales' && (
            <SalesManagementPage 
              sales={showroomSales} 
              motorcycles={motorcycles} 
              dealerships={dealerships} 
              onOpenNewSale={() => setIsNewSaleOpen(true)} 
              onViewSale={(s) => setSelectedSaleDetail(s)} 
              onEditSale={(s) => setEditingSale(s)} 
              onCancelSale={(s) => setCancelingSale(s)} 
              onSelectModelDetails={(m) => setSelectedMotorcycleModal(m)}
              roleMode="showroom"
              currentShowroom={currentShowroom}
            />
          )}

          {/* 3. Stock Management Page (Magasin, Hall Expo & Transit Usine) */}
          {activePage === 'stock' && (
            <StockManagementPage 
              motorcycles={motorcycles} 
              dealerships={dealerships} 
              roleMode="showroom"
              currentShowroom={currentShowroom}
            />
          )}

          {/* 4. Motorcycle Catalog & Pricing Page */}
          {activePage === 'models' && (
            <MotorcycleCatalogPage 
              motorcycles={motorcycles} 
              onSelectModel={(m) => setSelectedMotorcycleModal(m)} 
              roleMode="showroom"
              currentShowroom={currentShowroom}
            />
          )}
        </main>
      </div>

      {/* Modals */}
      {selectedSaleDetail && (
        <SaleDetailModal 
          sale={selectedSaleDetail} 
          onClose={() => setSelectedSaleDetail(null)} 
        />
      )}

      {editingSale && (
        <EditSaleModal 
          sale={editingSale} 
          motorcycles={motorcycles} 
          dealerships={dealerships} 
          onClose={() => setEditingSale(null)} 
          onSave={handleSaveEditSale} 
        />
      )}

      {cancelingSale && (
        <CancelSaleModal 
          sale={cancelingSale} 
          onClose={() => setCancelingSale(null)} 
          onConfirm={handleConfirmCancelSale} 
        />
      )}

      {isNewSaleOpen && (
        <NewSaleModal 
          motorcycles={motorcycles} 
          dealerships={dealerships} 
          onClose={() => setIsNewSaleOpen(false)} 
          onSave={handleAddSale}
          roleMode="showroom"
          currentShowroom={currentShowroom}
        />
      )}

      {selectedMotorcycleModal && (
        <MotorcycleDetailModal 
          motorcycle={selectedMotorcycleModal} 
          onClose={() => setSelectedMotorcycleModal(null)} 
        />
      )}
    </div>
  );
}
