import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid,
  Area,
  AreaChart
} from 'recharts';
import { Trophy } from 'lucide-react';

// Monthly performance mock data per top dealership
const DEALER_MONTHLY = [
  { month: 'Jan',  alger: 18, bejaia: 15, oran: 12, setif: 11, constantine: 9 },
  { month: 'Fév',  alger: 20, bejaia: 17, oran: 14, setif: 13, constantine: 11 },
  { month: 'Mar',  alger: 23, bejaia: 19, oran: 17, setif: 15, constantine: 14 },
  { month: 'Avr',  alger: 25, bejaia: 22, oran: 19, setif: 18, constantine: 16 },
  { month: 'Mai',  alger: 26, bejaia: 23, oran: 21, setif: 20, constantine: 18 },
  { month: 'Juin', alger: 29, bejaia: 26, oran: 24, setif: 22, constantine: 20 },
  { month: 'Juil', alger: 32, bejaia: 28, oran: 26, setif: 24, constantine: 22 },
  { month: 'Août', alger: 29, bejaia: 25, oran: 23, setif: 21, constantine: 19 },
  { month: 'Sept', alger: 24, bejaia: 21, oran: 19, setif: 17, constantine: 16 },
  { month: 'Oct',  alger: 16, bejaia: 14, oran: 13, setif: 12, constantine: 11 },
  { month: 'Nov',  alger: 11, bejaia: 10, oran: 9,  setif: 9,  constantine: 8 },
];

const LINES = [
  { key: 'alger',       label: 'Alger Moto Perf.',   color: '#E30613', width: 3,   dotR: 4 },
  { key: 'bejaia',      label: 'Béjaïa Hub',         color: '#191919', width: 2.5, dotR: 3.5 },
  { key: 'oran',        label: 'Oran Deux-Roues',    color: '#6366F1', width: 2,   dotR: 3 },
  { key: 'setif',       label: 'Sétif Distribution',  color: '#0EA5E9', width: 2,   dotR: 3 },
  { key: 'constantine', label: 'Constantine Motors',  color: '#9CA3AF', width: 1.5, dotR: 2.5 },
];

export default function SalesEvolutionChart({ monthlyData = [], dealerships = [] }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-card hover:shadow-hover transition-all flex flex-col justify-between">
      {/* Title & Legend */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
        <div>
          <h3 className="text-sm font-bold text-[#191919] flex items-center gap-2">
            Classement & Performance des Concessionnaires VMS
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-red-50 text-[#E30613] border border-red-200 flex items-center gap-1">
              <Trophy className="w-3 h-3" />
              Top Réseau
            </span>
          </h3>
          <p className="text-[11px] text-[#777777]">
            Suivi mensuel des ventes (motos livrées) par concessionnaire leader · 2026
          </p>
        </div>

        {/* Legend pills */}
        <div className="flex items-center gap-2.5 text-[10px] font-semibold text-[#191919] flex-wrap">
          {LINES.map((l) => (
            <div key={l.key} className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full border-2 shrink-0" style={{ borderColor: l.color, backgroundColor: l.color + '30' }}></span>
              <span className="text-gray-700">{l.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Smooth Multi-Line Chart */}
      <div className="h-[220px] w-full pt-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={DEALER_MONTHLY}
            margin={{ top: 10, right: 15, left: -10, bottom: 0 }}
          >
            <defs>
              <linearGradient id="algerGlow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#E30613" stopOpacity={0.15}/>
                <stop offset="100%" stopColor="#E30613" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F0F2" />
            <XAxis 
              dataKey="month" 
              tick={{ fontSize: 10, fill: '#777777' }} 
              axisLine={{ stroke: '#E5E7EB' }}
              tickLine={false}
            />
            <YAxis 
              tick={{ fontSize: 10, fill: '#777777' }} 
              axisLine={false}
              tickLine={false}
              tickFormatter={(val) => `${val}`}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (!active || !payload || !payload.length) return null;
                // Sort by value descending for the tooltip
                const sorted = [...payload].sort((a, b) => b.value - a.value);
                return (
                  <div className="bg-[#191919] text-white p-3 rounded-xl shadow-xl text-xs border border-gray-700 min-w-[210px]">
                    <p className="font-extrabold text-[#E30613] mb-1.5">{label} 2026</p>
                    <div className="space-y-1 text-[11px]">
                      {sorted.map((entry, idx) => {
                        const lineInfo = LINES.find(l => l.key === entry.dataKey);
                        if (!lineInfo) return null;
                        return (
                          <div key={lineInfo.key} className="flex items-center justify-between gap-3 text-gray-300">
                            <div className="flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: lineInfo.color }}></span>
                              <span className={idx === 0 ? 'text-white font-bold' : ''}>{lineInfo.label}</span>
                            </div>
                            <span className={`font-mono ${idx === 0 ? 'font-bold text-white' : 'text-gray-200'}`}>
                              {entry.value} motos
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              }}
            />
            {/* Lines — leader first with thicker stroke, others progressively lighter */}
            {LINES.map((l) => (
              <Line 
                key={l.key}
                type="natural" 
                dataKey={l.key} 
                stroke={l.color} 
                strokeWidth={l.width}
                dot={{ r: l.dotR, fill: l.color, stroke: '#fff', strokeWidth: 1.5 }} 
                activeDot={{ r: l.dotR + 2, stroke: '#FFFFFF', strokeWidth: 2, fill: l.color }}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-between text-[11px] text-[#777777] border-t border-gray-100 pt-2 mt-1">
        <span>Pic estival Juillet 2026 · Alger Moto Performance leader continu du réseau national</span>
        <span className="font-bold text-emerald-600">+14.2% YoY</span>
      </div>
    </div>
  );
}
