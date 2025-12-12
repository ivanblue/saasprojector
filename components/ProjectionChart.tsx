import React, { useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ProjectionDataPoint } from '@/types';
import { trackChartView } from './GoogleAnalytics';

interface ProjectionChartProps {
  data: ProjectionDataPoint[];
}

const currencyFormatter = (value: number) => {
  if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
  return `$${value}`;
};

const numberFormatter = (value: number) => {
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
  return value.toString();
};

const CustomTooltip: React.FC<{
  active?: boolean;
  payload?: Array<{ value: number; color: string }>;
  label?: string;
}> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-700/80 backdrop-blur-sm p-3 border border-gray-600 rounded-lg shadow-lg">
        <p className="font-bold text-gray-200">{`Month ${label}`}</p>
        <p style={{ color: '#38bdf8' }}>{`MRR: ${currencyFormatter(payload[0].value)}`}</p>
        <p style={{ color: '#a78bfa' }}>{`Customers: ${numberFormatter(payload[1].value)}`}</p>
      </div>
    );
  }
  return null;
};

const ProjectionChart: React.FC<ProjectionChartProps> = ({ data }) => {
  useEffect(() => {
    // Track chart view when component mounts or data changes
    trackChartView('projection_chart');
  }, [data]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 10,
          left: 10,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" />
        <XAxis dataKey="month" stroke="#a0aec0" tick={{ fill: '#a0aec0', fontSize: 12 }} />
        <YAxis
          yAxisId="left"
          stroke="#38bdf8"
          tickFormatter={currencyFormatter}
          tick={{ fill: '#38bdf8', fontSize: 12 }}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          stroke="#a78bfa"
          tickFormatter={numberFormatter}
          tick={{ fill: '#a78bfa', fontSize: 12 }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{ color: '#cbd5e0', paddingTop: '10px' }} />
        <Line yAxisId="left" type="monotone" dataKey="mrr" name="MRR" stroke="#38bdf8" strokeWidth={2} dot={false} />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="endingCustomers"
          name="Customers"
          stroke="#a78bfa"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ProjectionChart;
