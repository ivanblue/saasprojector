'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: FAQItem[];
}

const Accordion: React.FC<AccordionProps> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [heights, setHeights] = useState<Record<number, number>>({});
  const innerRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // measure content heights when opening
  useEffect(() => {
    if (openIndex !== null) {
      const innerEl = innerRefs.current[openIndex];

      if (innerEl && !heights[openIndex]) {
        // measure height by temporarily removing constraints
        const parent = innerEl.parentElement;
        if (parent) {
          const originalMaxHeight = parent.style.maxHeight;
          const originalOverflow = parent.style.overflow;

          // temporarily allow full height to measure
          parent.style.maxHeight = 'none';
          parent.style.overflow = 'visible';

          requestAnimationFrame(() => {
            const height = innerEl.scrollHeight;

            // restore original styles
            parent.style.maxHeight = originalMaxHeight;
            parent.style.overflow = originalOverflow;

            setHeights((prev) => ({
              ...prev,
              [openIndex]: height,
            }));
          });
        }
      }
    }
  }, [openIndex, heights]);

  // initialize refs array
  useEffect(() => {
    innerRefs.current = innerRefs.current.slice(0, items.length);
  }, [items.length]);

  return (
    <div className="space-y-4">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const innerRef = (el: HTMLDivElement | null) => {
          innerRefs.current[index] = el;
        };

        return (
          <div key={index} className="bg-gray-900/50 rounded-lg border border-gray-700 overflow-hidden">
            <button
              onClick={() => toggleItem(index)}
              className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-800/50 transition-colors duration-200"
            >
              <span className="text-lg font-semibold text-cyan-300">{item.question}</span>
              <ChevronDown
                className={`w-5 h-5 text-cyan-400 transition-transform duration-300 ${
                  isOpen ? 'transform rotate-180' : ''
                }`}
              />
            </button>
            <div
              className="transition-all duration-300 ease-in-out overflow-hidden"
              style={{
                maxHeight: isOpen && heights[index] ? `${heights[index]}px` : '0px',
                opacity: isOpen ? 1 : 0,
              }}
            >
              <div ref={innerRef} className="px-6 pb-4">
                <p className="text-gray-300 leading-relaxed">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;
