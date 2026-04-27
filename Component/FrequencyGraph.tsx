
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FrequencyData } from '../types';

const mockFreqData: FrequencyData[] = Array.from({ length: 40 }, (_, i) => ({
  freq: i * 2,
  original: Math.random() * 30 + 10 + (i > 15 ? 10 : 0),
  synthetic: Math.random() * 50 + 20 + (i > 25 ? 20 : 0)
}));

const FrequencyGraph: React.FC = () => {
  return (
    <div className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={mockFreqData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorOrig" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorSynth" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
          <XAxis
            dataKey="freq"
            stroke="#64748b"
            fontSize={10}
            tickLine={false}
            axisLine={false}
            tickFormatter={(val) => `${val}kHz`}
          />
          <YAxis
            stroke="#64748b"
            fontSize={10}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            contentStyle={{ backgroundColor: '#1E293B', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
            itemStyle={{ fontSize: '12px' }}
          />
          <Area
            type="monotone"
            dataKey="synthetic"
            stroke="#EF4444"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorSynth)"
            name="Synthetic Artifacts"
          />
          <Area
            type="monotone"
            dataKey="original"
            stroke="#3B82F6"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorOrig)"
            name="Baseline Real"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FrequencyGraph;
