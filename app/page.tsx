'use client';

import React, { useState, useMemo } from 'react';
import { ProjectionInputs } from '@/types';
import { useProjection } from '@/hooks/useProjection';
import InputSlider from '@/components/InputSlider';
import SummaryCard from '@/components/SummaryCard';
import ProjectionChart from '@/components/ProjectionChart';
import ProjectionTable from '@/components/ProjectionTable';

import { Briefcase, TrendingUp, Users, DollarSign, Download, BookOpen, Target, AlertTriangle, HelpCircle } from 'lucide-react';
import Accordion from '../components/Accordion';

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

      {/* Guide Section */}
      <div className="mt-16 pt-16 border-t border-gray-700">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
            ⭐ SaaS Projection Guide: Understanding Your Growth Metrics
          </h2>
          <p className="mt-4 text-lg text-gray-400 max-w-3xl mx-auto">
            Operating a SaaS business requires more than building a great product — you must understand the metrics that predict your revenue, growth, and long-term sustainability. Below, we break down each concept so you can get the most accurate and meaningful results from your projections.
          </p>
        </div>

        <div className="space-y-12">
          {/* MRR Section */}
          <section className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700 shadow-lg">
            <h3 className="text-2xl font-bold text-cyan-300 flex items-center mb-6">
              <DollarSign className="mr-3" />
              What Is MRR (Monthly Recurring Revenue)?
            </h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              Monthly Recurring Revenue (MRR) is the lifeblood of any subscription business. It represents how much predictable revenue your SaaS generates every month.
            </p>
            <div className="bg-gray-900/50 p-4 rounded-lg border-l-4 border-cyan-400 mb-4">
              <strong className="text-cyan-300">Formula:</strong>
              <br />
              <code className="text-green-400 font-mono">MRR = Active Customers × ARPU</code>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Because MRR is recurring and stable, it is one of the first metrics investors evaluate. In this tool, changes in customer count, churn, ARPU, and growth rate directly impact your projected MRR curve. Even small increases in growth or reductions in churn can produce significant compounding effects over time.
            </p>
          </section>

          {/* ARR Section */}
          <section className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700 shadow-lg">
            <h3 className="text-2xl font-bold text-cyan-300 flex items-center mb-6">
              <TrendingUp className="mr-3" />
              What Is ARR (Annual Recurring Revenue)?
            </h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              ARR (Annual Recurring Revenue) is simply your MRR multiplied by 12. It gives a big-picture perspective of your subscription revenue at a yearly scale.
            </p>
            <div className="bg-gray-900/50 p-4 rounded-lg border-l-4 border-cyan-400 mb-4">
              <strong className="text-cyan-300">Formula:</strong>
              <br />
              <code className="text-green-400 font-mono">ARR = MRR × 12</code>
            </div>
            <p className="text-gray-300 leading-relaxed">
              ARR is commonly used in valuation models and financial planning. This tool automatically calculates your ARR projection so you can forecast what your business might make per year based on your inputs.
            </p>
          </section>

          {/* ARPU Section */}
          <section className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700 shadow-lg">
            <h3 className="text-2xl font-bold text-cyan-300 flex items-center mb-6">
              <Target className="mr-3" />
              Understanding ARPU (Average Revenue Per User)
            </h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              Average Revenue Per User (ARPU) tells you how much each customer contributes in revenue on average.
            </p>
            <div className="bg-gray-900/50 p-4 rounded-lg border-l-4 border-cyan-400 mb-4">
              <strong className="text-cyan-300">Formula:</strong>
              <br />
              <code className="text-green-400 font-mono">ARPU = MRR ÷ Total Customers</code>
            </div>
            <p className="text-gray-300 leading-relaxed mb-4">
              Increasing ARPU is one of the fastest ways to grow revenue. This can be achieved through:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-300 mb-4">
              <li>Tiered pricing</li>
              <li>Add-ons or upgrades</li>
              <li>Bundling features</li>
              <li>Better customer segmentation</li>
            </ul>
            <p className="text-gray-300 leading-relaxed">
              In the projection tool, adjusting ARPU instantly changes your MRR curve.
            </p>
          </section>

          {/* Growth Rate Section */}
          <section className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700 shadow-lg">
            <h3 className="text-2xl font-bold text-cyan-300 flex items-center mb-6">
              <TrendingUp className="mr-3" />
              Monthly Growth Rate Explained
            </h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              Your Monthly Growth Rate represents the percentage increase in your customer base each month. It comes from marketing, word of mouth, product quality, and customer referrals.
            </p>
            <p className="text-gray-300 leading-relaxed">
              A 5% growth rate means your customers compound by 5% every month. Even a small monthly growth rate can lead to exponential increases when projected over 12–36 months.
            </p>
          </section>

          {/* Churn Rate Section */}
          <section className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700 shadow-lg">
            <h3 className="text-2xl font-bold text-cyan-300 flex items-center mb-6">
              <AlertTriangle className="mr-3" />
              What Is Churn Rate and Why Does It Matter?
            </h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              Churn Rate is the percentage of customers that cancel each month. High churn kills SaaS growth.
            </p>
            <p className="text-gray-300 leading-relaxed mb-4">Examples of churn consequences:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-300 mb-4">
              <li>A 2% churn rate might be manageable.</li>
              <li>A 10% churn rate means you are losing customers faster than you can acquire them.</li>
            </ul>
            <p className="text-gray-300 leading-relaxed">
              This tool subtracts churn from your growth to calculate net new customers, which represents true SaaS health.
            </p>
          </section>

          {/* How the Model Works */}
          <section className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700 shadow-lg">
            <h3 className="text-2xl font-bold text-cyan-300 flex items-center mb-6">
              <BookOpen className="mr-3" />
              How the Projection Model Works
            </h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              Every month, the tool calculates:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-300 mb-4">
              <li>Starting Customers</li>
              <li>New Customers (based on growth %)</li>
              <li>Customers Lost (based on churn %)</li>
              <li>Ending Customers</li>
              <li>MRR and ARR for that month</li>
            </ul>
            <p className="text-gray-300 leading-relaxed">
              This creates a clear picture of how your business evolves over time. You can adjust sliders to simulate different business scenarios and instantly visualize the outcome.
            </p>
          </section>

          {/* Month-by-Month Breakdown */}
          <section className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700 shadow-lg">
            <h3 className="text-2xl font-bold text-cyan-300 flex items-center mb-6">
              <Users className="mr-3" />
              Month-by-Month Breakdown
            </h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              The month-by-month table allows you to see each calculation in detail, including:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-300 mb-4">
              <li>How many customers you gained</li>
              <li>How many churned</li>
              <li>What your ending customer count is</li>
              <li>How MRR and ARR grow month over month</li>
            </ul>
            <p className="text-gray-300 leading-relaxed">
              This makes the model transparent and easy to understand for founders, investors, and team members.
            </p>
          </section>

          {/* Real-World Example */}
          <section className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700 shadow-lg">
            <h3 className="text-2xl font-bold text-cyan-300 flex items-center mb-6">
              <Target className="mr-3" />
              Real-World SaaS Example
            </h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              Imagine you start with:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-300 mb-4">
              <li>100 customers</li>
              <li>ARPU of $50</li>
              <li>5% monthly growth</li>
              <li>2% churn</li>
            </ul>
            <p className="text-gray-300 leading-relaxed mb-4">
              After 36 months, your SaaS could grow to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-300 mb-4">
              <li>292 customers</li>
              <li>$14,600 MRR</li>
              <li>$175,200 ARR</li>
            </ul>
            <p className="text-gray-300 leading-relaxed">
              This shows how powerful compounding growth can be, even with modest monthly increases.
            </p>
          </section>

          {/* How to Improve Metrics */}
          <section className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700 shadow-lg">
            <h3 className="text-2xl font-bold text-cyan-300 flex items-center mb-6">
              <TrendingUp className="mr-3" />
              How to Improve Your SaaS Metrics
            </h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              Here are actionable strategies to improve each key metric:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-900/50 p-6 rounded-lg">
                <h4 className="text-lg font-semibold text-green-400 mb-3">To increase MRR:</h4>
                <ul className="space-y-2 text-gray-300">
                  <li>• Add higher pricing tiers</li>
                  <li>• Introduce add-ons</li>
                  <li>• Improve onboarding to reduce churn</li>
                </ul>
              </div>

              <div className="bg-gray-900/50 p-6 rounded-lg">
                <h4 className="text-lg font-semibold text-red-400 mb-3">To reduce churn:</h4>
                <ul className="space-y-2 text-gray-300">
                  <li>• Provide fast customer support</li>
                  <li>• Improve product onboarding</li>
                  <li>• Identify at-risk users with lifecycle emails</li>
                </ul>
              </div>

              <div className="bg-gray-900/50 p-6 rounded-lg">
                <h4 className="text-lg font-semibold text-blue-400 mb-3">To increase ARPU:</h4>
                <ul className="space-y-2 text-gray-300">
                  <li>• Upsell premium features</li>
                  <li>• Offer bundles</li>
                  <li>• Create "pro" plans</li>
                </ul>
              </div>

              <div className="bg-gray-900/50 p-6 rounded-lg">
                <h4 className="text-lg font-semibold text-purple-400 mb-3">To increase growth rate:</h4>
                <ul className="space-y-2 text-gray-300">
                  <li>• Improve SEO & content marketing</li>
                  <li>• Encourage customer referrals</li>
                  <li>• Offer annual discounts</li>
                </ul>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700 shadow-lg">
            <h3 className="text-2xl font-bold text-cyan-300 flex items-center mb-6">
              <HelpCircle className="mr-3" />
              Frequently Asked Questions (FAQ)
            </h3>
            <Accordion
              items={[
                {
                  question: 'How accurate are these SaaS projections?',
                  answer: 'Projections are models, not guarantees. They give directional insight based on your inputs but real-world results may vary.'
                },
                {
                  question: 'Should I use MRR or ARR for planning?',
                  answer: 'Use MRR for monthly planning and ARR for long-term financial strategy.'
                },
                {
                  question: 'What is a typical churn rate for SaaS?',
                  answer: 'Most SaaS businesses aim for 1%–5% monthly churn, depending on the market.'
                },
                {
                  question: 'How often should I update my SaaS metrics?',
                  answer: 'Ideally monthly, especially when tracking growth or preparing for fundraising.'
                },
                {
                  question: 'Why does small churn make such a big impact?',
                  answer: 'Churn compounds — losing even 2% of customers monthly can reduce long-term growth significantly.'
                }
              ]}
            />
          </section>
        </div>
      </div>
    </>
  );
};

export default App;
