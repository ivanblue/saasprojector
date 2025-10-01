'use client';

import React from 'react';
import { Briefcase, Users, TrendingUp } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
          About SaaS Revenue Projector
        </h1>
        <p className="mt-4 text-lg text-gray-400">
          An intuitive tool for founders, finance teams, and investors to forecast the financial future of a
          subscription-based business.
        </p>
      </div>

      <div className="mt-12 bg-gray-800/50 p-8 rounded-2xl border border-gray-700 shadow-lg space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-cyan-300 flex items-center mb-4">
            <Briefcase className="mr-3" />
            What is this tool?
          </h2>
          <p className="text-gray-300 leading-relaxed">
            The SaaS Revenue Projector is a dynamic calculator designed to model key metrics of a Software-as-a-Service
            (SaaS) business. By adjusting inputs like initial customers, monthly growth rate, churn, and average revenue
            per user (ARPU), you can generate instant projections for Monthly Recurring Revenue (MRR), Annual Recurring
            Revenue (ARR), and customer base growth over time.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-cyan-300 flex items-center mb-4">
            <Users className="mr-3" />
            Who is it for?
          </h2>
          <p className="text-gray-300 leading-relaxed">This tool is built for anyone involved in the SaaS ecosystem:</p>
          <ul className="list-disc list-inside mt-4 space-y-2 text-gray-300">
            <li>
              <strong>Founders & Entrepreneurs:</strong> Quickly model different growth scenarios for business planning
              and fundraising.
            </li>
            <li>
              <strong>Finance & Ops Teams:</strong> Create financial forecasts and understand the impact of churn and
              growth on the bottom line.
            </li>
            <li>
              <strong>Investors & VCs:</strong> Evaluate the potential of a SaaS startup by stress-testing their growth
              assumptions.
            </li>
            <li>
              <strong>Students & Enthusiasts:</strong> Learn about the core mechanics of SaaS business models in an
              interactive way.
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-cyan-300 flex items-center mb-4">
            <TrendingUp className="mr-3" />
            How it works
          </h2>
          <p className="text-gray-300 leading-relaxed">
            The projection is calculated month-by-month. For each month, we take the starting number of customers, add
            new customers based on the growth rate, and subtract customers lost due to churn. The resulting end-of-month
            customer count is then multiplied by the ARPU to determine the MRR, which is then annualized to get the ARR.
            This simple but powerful model provides a clear view of your company&apos;s potential growth trajectory.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
