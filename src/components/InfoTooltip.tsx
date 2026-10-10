import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';

interface InfoTooltipProps {
  text: string;
  className?: string;
}

export const InfoTooltip: React.FC<InfoTooltipProps> = ({ text, className = '' }) => {
  const [visible, setVisible] = useState(false);

  return (
    <span className={`relative inline-flex items-center ml-1 align-baseline ${className}`}>
      <button
        type="button"
        aria-label="More information"
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        onFocus={() => setVisible(true)}
        onBlur={() => setVisible(false)}
        onClick={(e) => {
          e.stopPropagation();
          setVisible(!visible);
        }}
        className="text-slate-400 hover:text-emerald-400 transition-colors focus:outline-none focus:ring-1 focus:ring-emerald-400 rounded-full"
      >
        <HelpCircle className="w-3.5 h-3.5" />
      </button>

      {visible && (
        <span
          role="tooltip"
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 z-50 w-56 sm:w-64 p-2 text-[11px] leading-relaxed font-sans font-normal normal-case tracking-normal text-slate-200 bg-slate-900 border border-slate-700 rounded-lg shadow-xl shadow-black/60 pointer-events-none"
        >
          {text}
          <span className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-slate-700" />
        </span>
      )}
    </span>
  );
};
