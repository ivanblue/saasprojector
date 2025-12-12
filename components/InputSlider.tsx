import React, { useState, useEffect, useRef } from 'react';
import { Info } from 'lucide-react';
import { trackSliderInteraction } from './GoogleAnalytics';

interface InputSliderProps {
  label: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min: number;
  max: number;
  step: number;
  unit?: string;
  tooltip?: string;
}

const InputSlider: React.FC<InputSliderProps> = ({ label, value, onChange, min, max, step, unit = '', tooltip }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    // Track slider interaction with Google Analytics
    trackSliderInteraction(label, newValue);
    onChange(e);
  };

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
    <div className="w-full relative">
      <label className="text-sm font-medium text-gray-300 mb-2 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span>{label}</span>
          {tooltip && (
            <Info
              className="w-4 h-4 text-gray-400 hover:text-gray-300 cursor-pointer"
              onClick={() => setShowTooltip(!showTooltip)}
            />
          )}
        </div>
        <span className="font-bold text-cyan-300">{`${unit}${value}${unit === '%' ? '' : ''}`}</span>
      </label>
      <input
        type="range"
        value={value}
        onChange={handleChange}
        min={min}
        max={max}
        step={step}
        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer range-lg accent-cyan-400"
      />

      {/* tooltip */}
      {tooltip && showTooltip && (
        <div
          ref={tooltipRef}
          className="absolute top-0 left-0 z-50"
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
            <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-700"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InputSlider;
