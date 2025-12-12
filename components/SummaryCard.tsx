import React, { useState, useEffect, useRef } from 'react';
import type { LucideProps } from 'lucide-react';
import { Info } from 'lucide-react';

interface SummaryCardProps {
  title: string;
  value: number;
  icon: React.ComponentType<LucideProps>;
  isCurrency?: boolean;
  color: string;
  tooltip?: string;
}

const formatCurrency = (value: number) => {
  if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(2)}M`;
  }
  if (value >= 1_000) {
    return `$${(value / 1_000).toFixed(1)}K`;
  }
  return `$${Math.round(value).toLocaleString()}`;
};

const formatNumber = (value: number) => {
  return Math.round(value).toLocaleString();
};

const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, icon: Icon, isCurrency = false, color, tooltip }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        setShowTooltip(false);
      }
    };

    if (showTooltip) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [showTooltip]);

  return (
    <div className="relative">
      <div className={`bg-gray-800/50 p-5 rounded-xl border border-gray-700 shadow-lg relative overflow-hidden`}>
        <div className={`absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-br ${color} rounded-full opacity-10`}></div>

        {/* info icon with click handler */}
        {tooltip && (
          <div className="absolute top-2 right-2">
            <Info
              className="w-4 h-4 text-gray-400 hover:text-gray-300 cursor-pointer"
              onClick={() => setShowTooltip(!showTooltip)}
            />
          </div>
        )}

        <div className="flex items-center">
          <div className={`p-3 rounded-lg bg-gradient-to-br ${color} mr-4`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-sm text-gray-400">{title}</p>
            <p className="text-2xl font-bold text-white">{isCurrency ? formatCurrency(value) : formatNumber(value)}</p>
          </div>
        </div>
      </div>

      {/* tooltip positioned outside the card */}
      {tooltip && showTooltip && (
        <div
          ref={tooltipRef}
          className="absolute -top-2 right-2 z-50"
          onMouseLeave={() => {
            timeoutRef.current = setTimeout(() => setShowTooltip(false), 1000);
          }}
          onMouseEnter={() => {
            if (timeoutRef.current) {
              clearTimeout(timeoutRef.current);
            }
          }}
        >
          <div className="w-64 p-3 bg-gray-700 border border-gray-600 rounded-lg shadow-lg">
            <p className="text-sm text-gray-200">{tooltip}</p>
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-700"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SummaryCard;
