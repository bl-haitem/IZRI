import React from 'react';
import KPICards from '../components/KPICards';
import SalesByModelChart from '../components/SalesByModelChart';
import SalesEvolutionChart from '../components/SalesEvolutionChart';
import AlgeriaWilayaMap from '../components/AlgeriaWilayaMap';

export default function DashboardPage({
  motorcycles = [],
  dealerships = [],
  monthlyData = [],
  onSelectKPI = () => {},
}) {
  return (
    <div className="space-y-4 pb-8">
      {/* 1. Executive KPIs */}
      <KPICards onSelectKPI={onSelectKPI} />

      {/* 2. Classement Concessionnaires + Ventes par Modèle */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
        <div className="xl:col-span-7">
          <SalesEvolutionChart dealerships={dealerships} />
        </div>
        <div className="xl:col-span-5">
          <SalesByModelChart motorcycles={motorcycles} />
        </div>
      </div>

      {/* 3. Territorial Sales Coverage - 69 Wilayas Map */}
      <AlgeriaWilayaMap onSelectWilaya={() => {}} />
    </div>
  );
}
