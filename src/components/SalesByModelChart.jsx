import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Cell 
} from 'recharts';

export default function SalesByModelChart({ motorcycles = [] }) {
  const [metric, setMetric] = useState('netSales'); // 'netSales' | 'grossProfit' | 'units'

  const chartData = motorcycles.map((m) => {
    const units = m.unitsSold || 0;
    const netSales = units * m.priceDZD;
    const grossProfit = units * (m.grossProfitPerUnit || 30000);
    return {
      name: m.name,
      units,
      netSales,
      grossProfit,
      formattedNetSales: (netSales / 1000000).toFixed(1) + 'M DZD',
      formattedGrossProfit: (grossProfit / 1000000).toFixed(1) + 'M DZD',
      isLeader: m.id === 'vms-cuxi-2' || m.id === 'vms-cux-125',
    };
  }).sort((a, b) => b[metric] - a[metric]);

  const formatYAxis = (val) => {
    if (metric === 'units') return `${val}`;
    return `${(val / 1000000).toFixed(0)}M`;
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-card hover:shadow-hover transition-all flex flex-col justify-between">
      {/* Header & Toggle Switcher (matching Honda layout) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
        <div>
          <h3 className="text-sm font-bold text-[#191919]">
            {metric === 'netSales' && "Chiffre d'Affaires par Modèle"}
            {metric === 'grossProfit' && "Marge Brute par Modèle"}
            {metric === 'units' && "Unités Vendues par Modèle"}
          </h3>
          <p className="text-[11px] text-[#777777]">
            Classement des ventes réseau VMS Industrie
          </p>
        </div>

        {/* 3-State Metric Switcher Buttons */}
        <div className="flex items-center bg-[#F5F5F7] p-1 rounded-lg border border-gray-200 self-start sm:self-auto">
          <button
            onClick={() => setMetric('netSales')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
              metric === 'netSales'
                ? 'bg-[#191919] text-white shadow-xs'
                : 'text-gray-600 hover:text-[#191919]'
            }`}
          >
            CA Net
          </button>
          <button
            onClick={() => setMetric('grossProfit')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
              metric === 'grossProfit'
                ? 'bg-[#191919] text-white shadow-xs'
                : 'text-gray-600 hover:text-[#191919]'
            }`}
          >
            Marge Brute
          </button>
          <button
            onClick={() => setMetric('units')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
              metric === 'units'
                ? 'bg-[#191919] text-white shadow-xs'
                : 'text-gray-600 hover:text-[#191919]'
            }`}
          >
            Unités
          </button>
        </div>
      </div>

      {/* Horizontal Bar Chart */}
      <div className="h-[230px] w-full pt-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 35, bottom: 5 }}
          >
            <XAxis 
              type="number" 
              tickFormatter={formatYAxis} 
              tick={{ fontSize: 10, fill: '#777777' }} 
              axisLine={{ stroke: '#E5E7EB' }}
              tickLine={false}
            />
            <YAxis 
              dataKey="name" 
              type="category" 
              tick={{ fontSize: 11, fill: '#191919', fontWeight: 600 }} 
              axisLine={false}
              tickLine={false}
              width={105}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (!active || !payload || !payload.length) return null;
                const data = payload[0].payload;
                return (
                  <div className="bg-[#191919] text-white p-2.5 rounded-xl shadow-xl text-xs border border-gray-700">
                    <p className="font-extrabold text-[#E30613]">{data.name}</p>
                    <p className="text-gray-200 mt-1 font-mono">
                      Unités: <span className="font-bold text-white">{data.units.toLocaleString()}</span>
                    </p>
                    <p className="text-gray-200 font-mono">
                      CA: <span className="font-bold text-white">{(data.netSales).toLocaleString()} DZD</span>
                    </p>
                    <p className="text-gray-200 font-mono">
                      Marge: <span className="font-bold text-emerald-400">{(data.grossProfit).toLocaleString()} DZD</span>
                    </p>
                  </div>
                );
              }}
            />
            <Bar 
              dataKey={metric} 
              radius={[0, 6, 6, 0]}
              barSize={18}
            >
              {chartData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.isLeader ? '#E30613' : index === 1 ? '#3F3F46' : '#71717A'} 
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-between text-[11px] text-[#777777] border-t border-gray-100 pt-2 mt-1">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2.5 h-2.5 rounded-xs bg-[#E30613]"></span>
          <span>Leader des Ventes (VMS Cuxi 2)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block w-2.5 h-2.5 rounded-xs bg-[#71717A]"></span>
          <span>Autres Modèles Réseau</span>
        </div>
      </div>
    </div>
  );
}
