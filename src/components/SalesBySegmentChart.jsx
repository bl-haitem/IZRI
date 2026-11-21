import React from 'react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip 
} from 'recharts';

export default function SalesBySegmentChart({ segments = [] }) {
  const defaultSegments = [
    { name: "Commuter & Citadin", value: 38.2, units: 948, color: "#191919" },
    { name: "Maxi-Scooter GT", value: 24.5, units: 608, color: "#E30613" },
    { name: "Trail & Adventure", value: 18.3, units: 455, color: "#52525B" },
    { name: "Sport & Roadster", value: 11.8, units: 293, color: "#A1A1AA" },
    { name: "Cargo & Flotte", value: 7.2, units: 181, color: "#D4D4D8" },
  ];

  const data = segments.length ? segments : defaultSegments;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-card hover:shadow-hover transition-all flex flex-col justify-between">
      <div>
        <h3 className="text-sm font-bold text-[#191919]">
          Répartition des Ventes par Segment
        </h3>
        <p className="text-[11px] text-[#777777]">
          Part de marché par catégorie de deux-roues
        </p>
      </div>

      <div className="flex items-center gap-2 py-2">
        {/* Donut Visual with Center Overlay */}
        <div className="w-[145px] h-[145px] relative shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip
                content={({ active, payload }) => {
                  if (!active || !payload || !payload.length) return null;
                  const item = payload[0].payload;
                  return (
                    <div className="bg-[#191919] text-white p-2 rounded-lg text-xs shadow-lg">
                      <p className="font-bold">{item.name}</p>
                      <p className="font-mono text-gray-300">{item.value}% ({item.units} unités)</p>
                    </div>
                  );
                }}
              />
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={44}
                outerRadius={68}
                paddingAngle={3}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Center Text in Donut */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-[10px] uppercase font-bold text-gray-400">Total</span>
            <span className="text-sm font-extrabold text-[#191919] leading-tight font-mono">2,485</span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex-1 space-y-1.5 pl-2">
          {data.map((item, index) => (
            <div key={index} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 min-w-0">
                <span 
                  className="w-2.5 h-2.5 rounded-full shrink-0" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-[#191919] font-medium truncate text-[11px]">
                  {item.name}
                </span>
              </div>
              <span className="font-mono font-bold text-[#191919] text-[11px] shrink-0">
                {item.value}%
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="text-[10px] text-[#777777] bg-[#F5F5F7] px-2.5 py-1.5 rounded-lg border border-gray-200/80 flex items-center justify-between">
        <span>Segment dominant : Commuter Urbain</span>
        <span className="font-bold text-[#E30613]">38.2%</span>
      </div>
    </div>
  );
}
