'use client';

import React from 'react';
import { BookOpen, TrendingUp, DollarSign, Users, Target, AlertTriangle, HelpCircle } from 'lucide-react';
import Accordion from '../../components/Accordion';

const GuidePage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
          ⭐ SaaS Projection Tool: Complete Guide to Understanding Your Growth Metrics
        </h1>
        <p className="mt-4 text-lg text-gray-400 max-w-3xl mx-auto">
          Operating a SaaS business requires more than building a great product — you must understand the metrics that predict your revenue, growth, and long-term sustainability. This SaaS Projection Tool helps you visualize how your customer base and revenue evolve over time based on your inputs. Below, we break down each concept so you can get the most accurate and meaningful results from your projections.
        </p>
      </div>

      <div className="space-y-12">
        {/* MRR Section */}
        <section className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700 shadow-lg">
          <h2 className="text-2xl font-bold text-cyan-300 flex items-center mb-6">
            <DollarSign className="mr-3" />
            What Is MRR (Monthly Recurring Revenue)?
          </h2>
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
          <h2 className="text-2xl font-bold text-cyan-300 flex items-center mb-6">
            <TrendingUp className="mr-3" />
            What Is ARR (Annual Recurring Revenue)?
          </h2>
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
          <h2 className="text-2xl font-bold text-cyan-300 flex items-center mb-6">
            <Target className="mr-3" />
            Understanding ARPU (Average Revenue Per User)
          </h2>
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
          <h2 className="text-2xl font-bold text-cyan-300 flex items-center mb-6">
            <TrendingUp className="mr-3" />
            Monthly Growth Rate Explained
          </h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            Your Monthly Growth Rate represents the percentage increase in your customer base each month. It comes from marketing, word of mouth, product quality, and customer referrals.
          </p>
          <p className="text-gray-300 leading-relaxed">
            A 5% growth rate means your customers compound by 5% every month. Even a small monthly growth rate can lead to exponential increases when projected over 12–36 months.
          </p>
        </section>

        {/* Churn Rate Section */}
        <section className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700 shadow-lg">
          <h2 className="text-2xl font-bold text-cyan-300 flex items-center mb-6">
            <AlertTriangle className="mr-3" />
            What Is Churn Rate and Why Does It Matter?
          </h2>
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
          <h2 className="text-2xl font-bold text-cyan-300 flex items-center mb-6">
            <BookOpen className="mr-3" />
            How the Projection Model Works
          </h2>
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
          <h2 className="text-2xl font-bold text-cyan-300 flex items-center mb-6">
            <Users className="mr-3" />
            Month-by-Month Breakdown
          </h2>
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
          <h2 className="text-2xl font-bold text-cyan-300 flex items-center mb-6">
            <Target className="mr-3" />
            Real-World SaaS Example
          </h2>
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
          <h2 className="text-2xl font-bold text-cyan-300 flex items-center mb-6">
            <TrendingUp className="mr-3" />
            How to Improve Your SaaS Metrics
          </h2>
          <p className="text-gray-300 leading-relaxed mb-6">
            Here are actionable strategies to improve each key metric:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-900/50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-green-400 mb-3">To increase MRR:</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Add higher pricing tiers</li>
                <li>• Introduce add-ons</li>
                <li>• Improve onboarding to reduce churn</li>
              </ul>
            </div>

            <div className="bg-gray-900/50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-red-400 mb-3">To reduce churn:</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Provide fast customer support</li>
                <li>• Improve product onboarding</li>
                <li>• Identify at-risk users with lifecycle emails</li>
              </ul>
            </div>

            <div className="bg-gray-900/50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-400 mb-3">To increase ARPU:</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Upsell premium features</li>
                <li>• Offer bundles</li>
                <li>• Create "pro" plans</li>
              </ul>
            </div>

            <div className="bg-gray-900/50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-purple-400 mb-3">To increase growth rate:</h3>
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
          <h2 className="text-2xl font-bold text-cyan-300 flex items-center mb-6">
            <HelpCircle className="mr-3" />
            Frequently Asked Questions (FAQ)
          </h2>
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
  );
};

export default GuidePage;
