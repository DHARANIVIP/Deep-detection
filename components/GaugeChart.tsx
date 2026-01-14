
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface GaugeChartProps {
  probability: number;
}

const GaugeChart: React.FC<GaugeChartProps> = ({ probability }) => {
  const data = [
    { value: probability },
    { value: 100 - probability },
    { value: 100 } // This creates the empty bottom half
  ];

  const getRiskColor = (p: number) => {
    if (p > 80) return '#DC2626'; // Red (status-fake)
    if (p > 50) return '#F59E0B'; // Amber (status-warning)
    return '#2563EB'; // Blue (primary-blue)
  };

  const COLORS = [getRiskColor(probability), '#CBD5E1', 'transparent'];

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center pt-8">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="80%"
            startAngle={180}
            endAngle={0}
            innerRadius="75%"
            outerRadius="100%"
            paddingAngle={0}
            dataKey="value"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute top-[65%] left-1/2 -translate-x-1/2 text-center">
        <span className={`text-5xl font-black font-mono tracking-tighter ${probability > 50 ? 'text-status-fake' : 'text-primary-blue'}`}>
          {probability}%
        </span>
        <div className="flex flex-col items-center">
          <p className="text-[10px] uppercase font-black tracking-[0.2em] text-text-muted mt-2">Synth Confidence</p>
          <div className={`mt-3 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${probability > 50 ? 'bg-status-fake/10 text-status-fake border border-status-fake/20' : 'bg-primary-blue/10 text-primary-blue border border-primary-blue/20'
            }`}>
            {probability > 50 ? 'Detected' : 'Not Detected'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GaugeChart;
