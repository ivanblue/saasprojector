'use client';

import React, { useState, useMemo } from 'react';
import { ProjectionInputs } from '@/types';
import { useProjection } from '@/hooks/useProjection';
import InputSlider from '@/components/InputSlider';
import SummaryCard from '@/components/SummaryCard';
import ProjectionChart from '@/components/ProjectionChart';
import ProjectionTable from '@/components/ProjectionTable';

import { Briefcase, TrendingUp, Users, DollarSign, Download } from 'lucide-react';

const App: React.FC = () => {
  const [inputs, setInputs] = useState<ProjectionInputs>({
    initialCustomers: 100,
    initialMrr: 5000,
    arpu: 50,
    monthlyGrowthRate: 5,
    churnRate: 2,
    projectionMonths: 36,
  });

  const handleInputChange = (field: keyof ProjectionInputs, value: number) => {
    setInputs((prev) => ({ ...prev, [field]: value }));
  };

  const projectionData = useProjection(inputs);

  const finalDataPoint = useMemo(() => {
    return projectionData.length > 0 ? projectionData[projectionData.length - 1] : null;
  }, [projectionData]);

  const totalRevenue = useMemo(() => {
    return projectionData.reduce((acc, curr) => acc + curr.mrr, 0);
  }, [projectionData]);

  const exportToCSV = () => {
    if (projectionData.length === 0) return;

    // Create CSV headers
    const headers = [
      'Month',
      'Starting Customers',
      'New Customers',
      'Lost Customers',
      'Ending Customers',
      'MRR ($)',
      'ARR ($)',
    ];

    // Create CSV rows
    const csvData = projectionData.map((row) => [
      row.month,
      row.startingCustomers,
      row.newCustomers,
      row.lostCustomers,
      row.endingCustomers,
      row.mrr.toFixed(2),
      row.arr.toFixed(2),
    ]);

    // Combine headers and data
    const csvContent = [headers, ...csvData].map((row) => row.map((field) => `"${field}"`).join(',')).join('\n');

    // Create and download the file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `saas-projection-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // const NavLink: React.FC<{ page: Page; children: React.ReactNode }> = ({ page, children }) => {
  //   const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
  //     e.preventDefault();
  //     const newHash = page === 'projector' ? '' : page;
  //     // Only update hash if it's different to avoid redundant history entries
  //     if (window.location.hash.replace('#', '') !== newHash) {
  //       window.location.hash = newHash;
  //     }
  //   };

  //   return (
  //     <a
  //       href={page === 'projector' ? '#' : `#${page}`}
  //       onClick={handleClick}
  //       className={`px-3 py-1 rounded-md transition-colors text-sm ${
  //         currentPage === page
  //           ? 'text-cyan-300 bg-cyan-900/50 font-semibold'
  //           : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
  //       }`}
  //       aria-current={currentPage === page ? 'page' : undefined}
  //     >
  //       {children}
  //     </a>
  //   );
  // };

  return (
    <>
      <header className="text-left mb-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
          SaaS Revenue Projector
        </h1>
        <p className="mt-3 text-lg text-gray-400 max-w-2xl">
          Model your future subscription revenue by adjusting key growth levers.
        </p>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Controls Column */}
        <div className="lg:col-span-1 bg-gray-800/50 p-6 rounded-2xl border border-gray-700 shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-cyan-300 flex items-center">
            <Briefcase className="mr-3" />
            Input Metrics
          </h2>
          <div className="space-y-6">
            <InputSlider
              label="Initial Customers"
              value={inputs.initialCustomers}
              onChange={(e) => handleInputChange('initialCustomers', parseInt(e.target.value, 10))}
              min={0}
              max={1000}
              step={10}
              tooltip="The starting number of customers at the beginning of your projection. This is your baseline customer count."
            />
            <InputSlider
              label="Initial MRR"
              value={inputs.initialMrr}
              onChange={(e) => handleInputChange('initialMrr', parseInt(e.target.value, 10))}
              min={0}
              max={50000}
              step={500}
              unit="$"
              tooltip="Monthly Recurring Revenue at the start of your projection. This is your baseline monthly subscription income."
            />
            <InputSlider
              label="ARPU"
              value={inputs.arpu}
              onChange={(e) => handleInputChange('arpu', parseInt(e.target.value, 10))}
              min={5}
              max={500}
              step={5}
              unit="$"
              tooltip="Average Revenue Per User - the average amount each customer pays per month. Calculated as MRR ÷ Number of Customers."
            />
            <InputSlider
              label="Monthly Growth Rate"
              value={inputs.monthlyGrowthRate}
              onChange={(e) => handleInputChange('monthlyGrowthRate', parseFloat(e.target.value))}
              min={0}
              max={25}
              step={0.5}
              unit="%"
              tooltip="The percentage increase in new customers each month. Higher rates mean faster growth but may be harder to sustain."
            />
            <InputSlider
              label="Monthly Churn Rate"
              value={inputs.churnRate}
              onChange={(e) => handleInputChange('churnRate', parseFloat(e.target.value))}
              min={0}
              max={15}
              step={0.1}
              unit="%"
              tooltip="The percentage of customers who cancel their subscription each month. Lower churn rates lead to better long-term growth."
            />
            <InputSlider
              label="Projection (Months)"
              value={inputs.projectionMonths}
              onChange={(e) => handleInputChange('projectionMonths', parseInt(e.target.value, 10))}
              min={12}
              max={60}
              step={1}
              tooltip="The number of months to project into the future. Longer projections help you see long-term trends but may be less accurate."
            />
          </div>
        </div>

        {/* Results Column */}
        <div className="lg:col-span-3 space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <SummaryCard
              title="Final MRR"
              value={finalDataPoint?.mrr ?? 0}
              icon={TrendingUp}
              isCurrency={true}
              color="from-green-500 to-cyan-500"
              tooltip="Monthly Recurring Revenue at the end of the projection period. This represents your steady monthly income from subscriptions."
            />
            <SummaryCard
              title="Final ARR"
              value={finalDataPoint?.arr ?? 0}
              icon={DollarSign}
              isCurrency={true}
              color="from-blue-500 to-indigo-500"
              tooltip="Annual Recurring Revenue at the end of the projection period. Calculated as Final MRR × 12."
            />
            <SummaryCard
              title="Final Customers"
              value={finalDataPoint?.endingCustomers ?? 0}
              icon={Users}
              isCurrency={false}
              color="from-purple-500 to-pink-500"
              tooltip="Total number of active customers at the end of the projection period, accounting for growth and churn."
            />
            <SummaryCard
              title="Total Revenue"
              value={totalRevenue}
              icon={DollarSign}
              isCurrency={true}
              color="from-orange-500 to-red-500"
              tooltip="Cumulative revenue generated over the entire projection period. This is the sum of all monthly MRR values."
            />
          </div>

          <div className="bg-gray-800/50 p-4 sm:p-6 rounded-2xl border border-gray-700 shadow-lg">
            <h3 className="text-xl font-bold mb-4 text-cyan-300">Growth Over Time</h3>
            <div className="h-80 w-full">
              <ProjectionChart data={projectionData} />
            </div>
          </div>

          <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-cyan-300">Month-by-Month Breakdown</h3>
              <button
                onClick={exportToCSV}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <Download size={16} />
                Export CSV
              </button>
            </div>
            <ProjectionTable data={projectionData} />
          </div>
        </div>
      </main>
    </>
  );
};

export default App;
