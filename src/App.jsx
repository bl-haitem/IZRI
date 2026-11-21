import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardPage from './pages/DashboardPage';
import ShowroomDashboard from './components/ShowroomDashboard';
import SalesManagementPage from './pages/SalesManagementPage';
import DealershipsPage from './pages/DealershipsPage';
import MotorcycleCatalogPage from './pages/MotorcycleCatalogPage';
import StockManagementPage from './pages/StockManagementPage';
import CustomerRegistrationsPage from './pages/CustomerRegistrationsPage';
import MaintenanceAnalyticsPage from './pages/MaintenanceAnalyticsPage';
import DemandForecastingPage from './pages/DemandForecastingPage';
import ReportsPage from './pages/ReportsPage';
import SettingsPage from './pages/SettingsPage';

import SaleDetailModal from './components/modals/SaleDetailModal';
import EditSaleModal from './components/modals/EditSaleModal';
import CancelSaleModal from './components/modals/CancelSaleModal';
import NewSaleModal from './components/modals/NewSaleModal';
import DealershipModal from './components/modals/DealershipModal';
import MotorcycleDetailModal from './components/modals/MotorcycleDetailModal';

import {
  INITIAL_MOTORCYCLES, INITIAL_DEALERSHIPS, INITIAL_SALES,
  MONTHLY_SALES_EVOLUTION, INITIAL_DEMAND_FORECASTS, SHOWROOM_CONFIG,
  getStoredData, saveStoredData
} from './data/mockData';

export default function App() {
  const [roleMode, setRoleMode] = useState('superadmin'); // 'superadmin' (Usine) | 'showroom' (Showroom Local)
  const [currentShowroom, setCurrentShowroom] = useState(() => SHOWROOM_CONFIG);
  const [activePage, setActivePage] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState(null);

  const [motorcycles, setMotorcycles] = useState(() => getStoredData('motorcycles', INITIAL_MOTORCYCLES));
  const [dealerships, setDealerships] = useState(() => getStoredData('dealerships', INITIAL_DEALERSHIPS));
  const [sales, setSales] = useState(() => getStoredData('sales', INITIAL_SALES));
  const [forecasts, setForecasts] = useState(() => getStoredData('forecasts', INITIAL_DEMAND_FORECASTS));

  const [selectedSaleDetail, setSelectedSaleDetail] = useState(null);
  const [editingSale, setEditingSale] = useState(null);
  const [cancelingSale, setCancelingSale] = useState(null);
  const [isNewSaleOpen, setIsNewSaleOpen] = useState(false);
  const [selectedDealershipModal, setSelectedDealershipModal] = useState(null);
  const [selectedMotorcycleModal, setSelectedMotorcycleModal] = useState(null);

  const showToast = (msg) => { setToastMessage(msg); setTimeout(() => setToastMessage(null), 3000); };

  // Data specialized for the single showroom when in showroom mode
  const showroomSales = sales.filter(s => 
    s.dealershipId === currentShowroom.id || 
    (s.dealershipName && s.dealershipName.toLowerCase().includes(currentShowroom.name.toLowerCase()))
  );
  const activeSales = roleMode === 'showroom' ? showroomSales : sales;

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
    showToast(`Vente ${newSale.id} enregistrée.`);
  };

  const handleSaveEditSale = (s) => { 
    const u = sales.map(x => x.id === s.id ? s : x); 
    setSales(u); 
    saveStoredData('sales', u); 
    setEditingSale(null); 
    showToast(`Vente ${s.id} mise à jour.`); 
  };
  
  const handleConfirmCancelSale = (id, reason) => { 
    const u = sales.map(s => s.id === id ? { ...s, registrationStatus: 'Cancelled', notes: `Annulée : ${reason}` } : s); 
    setSales(u); 
    saveStoredData('sales', u); 
    setCancelingSale(null); 
    showToast(`Vente ${id} annulée.`); 
  };
  
  const handleUpdateDealership = (d) => { 
    const u = dealerships.map(x => x.id === d.id ? d : x); 
    setDealerships(u); 
    saveStoredData('dealerships', u); 
    setSelectedDealershipModal(null); 
    showToast(`${d.name} mis à jour.`); 
  };
  
  const handleApproveForecast = (id) => { 
    const u = forecasts.map(f => f.id === id ? { ...f, status: 'Approved' } : f); 
    setForecasts(u); 
    saveStoredData('forecasts', u); 
    showToast(`Ordre ${id} approuvé pour l'usine.`); 
  };
  
  const handleRejectForecast = (id) => { 
    const u = forecasts.map(f => f.id === id ? { ...f, status: 'Rejected' } : f); 
    setForecasts(u); 
    saveStoredData('forecasts', u); 
    showToast(`Ordre ${id} rejeté.`); 
  };

  // Titles specialized per mode
  const superAdminTitles = {
    dashboard: ["Tableau de Bord National", "VMS Industrie – Vue d'Ensemble Réseau"],
    sales: ["Ventes Réseau", "Registre national des transactions"],
    dealerships: ["Concessionnaires", "Réseau national des 78 points de vente"],
    models: ["Catalogue Motos", "Gamme VMS Industrie assemblée à Akbou"],
    stock: ["Gestion des Stocks", "Inventaire usine et réseau national"],
    registrations: ["Enregistrements", "Vérification nationale des cartes grises"],
    maintenance: ["Maintenance & SAV", "Statistiques ateliers et pièces détachées"],
    forecast: ["Prévisions Demande", "Planification usine S+1 et S+2"],
    reports: ["Rapports", "Exports & synthèses nationales"],
    settings: ["Paramètres", "Configuration de la plateforme"],
  };

  const showroomTitles = {
    dashboard: ["Tableau de Bord Showroom", `${currentShowroom.name} (${currentShowroom.code})`],
    sales: ["Ventes & Cartes Grises", `Transactions comptoir & immatriculations Daïra • ${currentShowroom.name}`],
    stock: ["Stock en Magasin", `Disponibilité physique hall d'expo & dépôt • ${currentShowroom.name}`],
    models: ["Catalogue & Tarifs", `Tarifs TTC et disponibilité magasin • ${currentShowroom.name}`],
  };

  const currentTitles = roleMode === 'showroom' ? showroomTitles : superAdminTitles;
  const [title, subtitle] = currentTitles[activePage] || currentTitles.dashboard;

  return (
    <div className="min-h-screen bg-[#F5F5F7] text-[#191919] flex">
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-[#191919] text-white px-4 py-3 rounded-xl shadow-2xl border-l-4 border-l-[#E30613] flex items-center gap-2 text-xs font-semibold animate-in fade-in duration-200">
          <span className="w-2 h-2 rounded-full bg-[#E30613]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Sidebar with roleMode state */}
      <Sidebar 
        activePage={activePage} 
        setActivePage={setActivePage} 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)}
        roleMode={roleMode}
        setRoleMode={(mode) => {
          setRoleMode(mode);
          if (mode === 'showroom') {
            if (activePage === 'registrations') {
              setActivePage('sales');
            } else if (!['dashboard', 'sales', 'stock', 'models'].includes(activePage)) {
              setActivePage('dashboard');
            }
          }
        }}
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
          roleMode={roleMode}
          currentShowroom={currentShowroom}
        />

        <main className="flex-1 p-4 lg:p-6 max-w-[1600px] w-full mx-auto">
          {/* Dashboard Page - Dynamically switches between Factory Overview & Showroom Dashboard */}
          {activePage === 'dashboard' && (
            roleMode === 'showroom' ? (
              <ShowroomDashboard
                currentShowroom={currentShowroom}
                motorcycles={motorcycles}
                sales={sales}
                dealerships={dealerships}
                onSelectShowroom={(d) => {
                  setCurrentShowroom(d);
                  showToast(`Showroom basculé : ${d.name}`);
                }}
                onOpenNewSale={() => setIsNewSaleOpen(true)}
                onViewSale={(s) => setSelectedSaleDetail(s)}
                onGoToStock={() => setActivePage('stock')}
                onGoToSales={() => setActivePage('sales')}
              />
            ) : (
              <DashboardPage 
                motorcycles={motorcycles} 
                dealerships={dealerships} 
                monthlyData={MONTHLY_SALES_EVOLUTION} 
                onSelectModelDetails={(m) => setSelectedMotorcycleModal(m)} 
                onRequestReplenish={(m) => { setActivePage('forecast'); showToast(`Prévision pour ${m.name}`); }} 
                onViewDealership={(d) => setSelectedDealershipModal(d)} 
                onGoToForecast={() => setActivePage('forecast')} 
                onGoToStock={() => setActivePage('stock')} 
                onSelectKPI={(id) => { 
                  if (id==='units_sold'||id==='net_sales') setActivePage('sales'); 
                  else if (id==='top_model') setActivePage('models'); 
                  else if (id==='top_dealership'||id==='active_dealerships') setActivePage('dealerships'); 
                  else if (id==='stock_shortages'||id==='total_stock') setActivePage('stock'); 
                  else if (id==='forecast_anticipation') setActivePage('forecast'); 
                  else if (id==='registered_motos'||id==='pending_registrations') setActivePage('registrations'); 
                }} 
              />
            )
          )}

          {/* Sales & Cartes Grises Management Page */}
          {activePage === 'sales' && (
            <SalesManagementPage 
              sales={activeSales} 
              motorcycles={motorcycles} 
              dealerships={dealerships} 
              onOpenNewSale={() => setIsNewSaleOpen(true)} 
              onViewSale={(s) => setSelectedSaleDetail(s)} 
              onEditSale={(s) => setEditingSale(s)} 
              onCancelSale={(s) => setCancelingSale(s)} 
              onSelectModelDetails={(m) => setSelectedMotorcycleModal(m)}
              roleMode={roleMode}
              currentShowroom={currentShowroom}
            />
          )}

          {/* Dealerships Page (Factory/Super Admin) */}
          {activePage === 'dealerships' && (
            <DealershipsPage 
              dealerships={dealerships} 
              onViewDealership={(d) => setSelectedDealershipModal(d)} 
              onToggleStatus={(d) => handleUpdateDealership({ ...d, status: d.status === 'Actif' ? 'Inactif' : 'Actif' })} 
              onAddDealership={() => setSelectedDealershipModal({ id: `deal-${Date.now()}`, name: "Nouveau Point de Vente", code: `DZ-NEW-${Math.floor(100+Math.random()*900)}`, wilaya: "16 - Alger", region: "Centre", address: "Adresse", manager: "Gérant", phone: "+213 21 00 00 00", email: "contact@vms.dz", sales: 0, stock: 15, registrationRate: 0, performance: "Standard", status: "Actif", revenueM: 0 })} 
            />
          )}

          {/* Motorcycle Catalog Page */}
          {activePage === 'models' && (
            <MotorcycleCatalogPage 
              motorcycles={motorcycles} 
              onSelectModel={(m) => setSelectedMotorcycleModal(m)} 
              roleMode={roleMode}
              currentShowroom={currentShowroom}
            />
          )}

          {/* Stock Management Page */}
          {activePage === 'stock' && (
            <StockManagementPage 
              motorcycles={motorcycles} 
              dealerships={dealerships} 
              roleMode={roleMode}
              currentShowroom={currentShowroom}
            />
          )}

          {/* Customer Registrations Page - Scoped in Showroom mode */}
          {activePage === 'registrations' && (
            <CustomerRegistrationsPage 
              sales={activeSales} 
            />
          )}

          {/* Maintenance Analytics Page (Usine/National) */}
          {activePage === 'maintenance' && <MaintenanceAnalyticsPage />}

          {/* Demand Forecasting Page (Usine/National) */}
          {activePage === 'forecast' && (
            <DemandForecastingPage 
              forecasts={forecasts} 
              onApproveForecast={handleApproveForecast} 
              onRejectForecast={handleRejectForecast} 
            />
          )}

          {/* Reports Page */}
          {activePage === 'reports' && <ReportsPage />}

          {/* Settings Page */}
          {activePage === 'settings' && <SettingsPage />}
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
          onSave={handleSaveEditSale} 
          onClose={() => setEditingSale(null)} 
        />
      )}

      {cancelingSale && (
        <CancelSaleModal 
          sale={cancelingSale} 
          onConfirm={handleConfirmCancelSale} 
          onClose={() => setCancelingSale(null)} 
        />
      )}

      {isNewSaleOpen && (
        <NewSaleModal 
          onAddSale={handleAddSale} 
          onClose={() => setIsNewSaleOpen(false)} 
          defaultDealershipId={roleMode === 'showroom' ? currentShowroom.id : undefined}
          lockDealership={roleMode === 'showroom'}
        />
      )}

      {selectedDealershipModal && (
        <DealershipModal 
          dealership={selectedDealershipModal} 
          onUpdate={handleUpdateDealership} 
          onClose={() => setSelectedDealershipModal(null)} 
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
