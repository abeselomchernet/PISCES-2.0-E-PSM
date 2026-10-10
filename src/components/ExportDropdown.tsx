import React, { useState, useRef, useEffect } from 'react';
import { Download, ChevronDown, FileSpreadsheet, FileJson, Check } from 'lucide-react';

interface ExportDropdownProps {
  label?: string;
  count?: number;
  onExportCsv: () => void;
  onExportJson: () => void;
  className?: string;
}

export const ExportDropdown: React.FC<ExportDropdownProps> = ({
  label = 'Export Data',
  count,
  onExportCsv,
  onExportJson,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [lastExported, setLastExported] = useState<'csv' | 'json' | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleExportCsv = () => {
    onExportCsv();
    setLastExported('csv');
    setIsOpen(false);
    setTimeout(() => setLastExported(null), 2500);
  };

  const handleExportJson = () => {
    onExportJson();
    setLastExported('json');
    setIsOpen(false);
    setTimeout(() => setLastExported(null), 2500);
  };

  return (
    <div className={`relative inline-block ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="px-3 py-2 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 hover:text-white border border-slate-700/60 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {lastExported ? (
          <Check className="w-3.5 h-3.5 text-emerald-400" />
        ) : (
          <Download className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-200" />
        )}
        <span>{lastExported ? `Exported ${lastExported.toUpperCase()}` : label}</span>
        {count !== undefined && (
          <span className="text-[11px] font-mono px-1.5 py-0.2 bg-slate-900 text-slate-400 rounded">
            {count}
          </span>
        )}
        <ChevronDown
          className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-150 ${
            isOpen ? 'rotate-180 text-emerald-400' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1.5 w-48 rounded-xl bg-slate-900 border border-slate-800 shadow-xl py-1.5 z-40 text-xs font-sans animate-in fade-in zoom-in-95 duration-100">
          <div className="px-3 py-1.5 text-[10px] font-mono font-medium text-slate-500 uppercase tracking-wider border-b border-slate-800/80">
            Export {count !== undefined ? `(${count} records)` : 'Options'}
          </div>

          <button
            type="button"
            onClick={handleExportCsv}
            className="w-full text-left px-3 py-2 text-slate-200 hover:text-white hover:bg-slate-800/80 transition-colors flex items-center gap-2.5 cursor-pointer"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-400 shrink-0" />
            <div>
              <div className="font-medium text-slate-200">Export as CSV</div>
              <div className="text-[10px] text-slate-400">Excel / Spreadsheet (.csv)</div>
            </div>
          </button>

          <button
            type="button"
            onClick={handleExportJson}
            className="w-full text-left px-3 py-2 text-slate-200 hover:text-white hover:bg-slate-800/80 transition-colors flex items-center gap-2.5 cursor-pointer"
          >
            <FileJson className="w-4 h-4 text-amber-400 shrink-0" />
            <div>
              <div className="font-medium text-slate-200">Export as JSON</div>
              <div className="text-[10px] text-slate-400">Structured Data (.json)</div>
            </div>
          </button>
        </div>
      )}
    </div>
  );
};
