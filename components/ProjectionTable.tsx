import React from 'react';
import { ProjectionDataPoint } from '@/types';

interface ProjectionTableProps {
  data: ProjectionDataPoint[];
}

const formatCurrency = (value: number) => {
  return `$${Math.round(value).toLocaleString()}`;
};

const ProjectionTable: React.FC<ProjectionTableProps> = ({ data }) => {
  return (
    <div className="overflow-x-auto max-h-96 rounded-lg border border-gray-700">
      <table className="min-w-full divide-y divide-gray-700">
        <thead className="bg-gray-800 sticky top-0">
          <tr>
            <th scope="col" className="py-3.5 px-4 text-left text-sm font-semibold text-cyan-300">
              Month
            </th>
            <th scope="col" className="py-3.5 px-4 text-left text-sm font-semibold text-cyan-300">
              Starting Customers
            </th>
            <th scope="col" className="py-3.5 px-4 text-left text-sm font-semibold text-green-400">
              New
            </th>
            <th scope="col" className="py-3.5 px-4 text-left text-sm font-semibold text-red-400">
              Lost
            </th>
            <th scope="col" className="py-3.5 px-4 text-left text-sm font-semibold text-cyan-300">
              Ending Customers
            </th>
            <th scope="col" className="py-3.5 px-4 text-left text-sm font-semibold text-cyan-300">
              MRR
            </th>
            <th scope="col" className="py-3.5 px-4 text-left text-sm font-semibold text-cyan-300">
              ARR
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700 bg-gray-900/50">
          {data.map((row) => (
            <tr key={row.month} className="hover:bg-gray-800/60 transition-colors">
              <td className="whitespace-nowrap py-4 px-4 text-sm font-medium text-white">{row.month}</td>
              <td className="whitespace-nowrap py-4 px-4 text-sm text-gray-300">
                {row.startingCustomers.toLocaleString()}
              </td>
              <td className="whitespace-nowrap py-4 px-4 text-sm text-green-400">
                +{row.newCustomers.toLocaleString()}
              </td>
              <td className="whitespace-nowrap py-4 px-4 text-sm text-red-400">
                -{row.lostCustomers.toLocaleString()}
              </td>
              <td className="whitespace-nowrap py-4 px-4 text-sm font-medium text-white">
                {row.endingCustomers.toLocaleString()}
              </td>
              <td className="whitespace-nowrap py-4 px-4 text-sm text-gray-300">{formatCurrency(row.mrr)}</td>
              <td className="whitespace-nowrap py-4 px-4 text-sm text-gray-300">{formatCurrency(row.arr)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectionTable;
