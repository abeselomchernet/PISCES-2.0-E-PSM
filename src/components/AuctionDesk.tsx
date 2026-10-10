import React, { useState } from 'react';
import { AuctionOrder } from '../types';
import { MOCK_AUCTION_ORDERS, ISSUERS_DATA } from '../data/mockData';
import { ArrowUpDown, CheckCircle2, Clock, Plus, DollarSign, Layers } from 'lucide-react';
import { exportToCsv, exportToJson } from '../utils/exportUtils';
import { ExportDropdown } from './ExportDropdown';
import { InfoTooltip } from './InfoTooltip';

export const AuctionDesk: React.FC = () => {
  const [orders, setOrders] = useState<AuctionOrder[]>(MOCK_AUCTION_ORDERS);
  const [selectedSecurity, setSelectedSecurity] = useState<string>('AWSH-AGRO-SR');
  const [orderType, setOrderType] = useState<'BID' | 'ASK'>('BID');
  const [investorType, setInvestorType] = useState<AuctionOrder['investorType']>('QIB Pension');
  const [investorName, setInvestorName] = useState<string>('Illustrative Domestic DFI Syndicate');
  const [unitPrice, setUnitPrice] = useState<number>(100.50);
  const [volume, setVolume] = useState<number>(20000);
  const [showOrderModal, setShowOrderModal] = useState<boolean>(false);
  const [clearingMessage, setClearingMessage] = useState<string | null>(null);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const newOrder: AuctionOrder = {
      id: `ord-${Math.floor(1000 + Math.random() * 9000)}`,
      investorName,
      investorType,
      type: orderType,
      securityTicker: selectedSecurity,
      unitPriceUSD: Number(unitPrice),
      volumeUnits: Number(volume),
      totalValueUSD: Number(unitPrice) * Number(volume),
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
      status: 'Pending Call',
    };

    setOrders([newOrder, ...orders]);
    setShowOrderModal(false);
    setClearingMessage(`Institutional ${orderType} order for ${volume.toLocaleString()} units of ${selectedSecurity} staged in local prototype for next intermittent clearing window.`);
    setTimeout(() => setClearingMessage(null), 5000);
  };

  const handleExecuteIntermittentClearing = () => {
    // Demonstration: sets status to Matched with illustrative clearing price notice
    const updated = orders.map((ord) => ({
      ...ord,
      status: 'Matched' as const,
    }));
    setOrders(updated);
    setClearingMessage('Simulated Call Executed: Demonstration clearing price set at $100.35/unit. (Note: Simplified matching demo; full algorithmic clearing-price engine is target architecture).');
    setTimeout(() => setClearingMessage(null), 7000);
  };

  const totalBidVolume = orders
    .filter((o) => o.type === 'BID')
    .reduce((sum, o) => sum + o.volumeUnits, 0);

  const totalAskVolume = orders
    .filter((o) => o.type === 'ASK')
    .reduce((sum, o) => sum + o.volumeUnits, 0);

  const totalVolumeUSD = orders.reduce((sum, o) => sum + o.totalValueUSD, 0);

  const handleExportOrdersCsv = () => {
    const headers = [
      'Order ID',
      'Participant Institution',
      'Investor Category',
      'Order Side',
      'Security Ticker',
      'Limit Unit Price (USD)',
      'Volume (Units)',
      'Total Notional Value (USD)',
      'Logged Timestamp (UTC)',
      'Execution Status',
    ];
    const rows = orders.map((ord) => [
      ord.id,
      ord.investorName,
      ord.investorType,
      ord.type,
      ord.securityTicker,
      ord.unitPriceUSD,
      ord.volumeUnits,
      ord.totalValueUSD,
      ord.timestamp,
      ord.status,
    ]);
    const dateStr = new Date().toISOString().slice(0, 10);
    exportToCsv(`PISCES_Auction_OrderBook_${dateStr}.csv`, headers, rows);
  };

  const handleExportOrdersJson = () => {
    const dateStr = new Date().toISOString().slice(0, 10);
    exportToJson(`PISCES_Auction_OrderBook_${dateStr}.json`, {
      exchange: 'PISCES 2.0 (E-PSM Prototype)',
      system: 'Intermittent Order Staging Workflow (Simulation)',
      exportedAt: new Date().toISOString(),
      metrics: {
        totalBookValueUSD: totalVolumeUSD,
        totalOrdersCount: orders.length,
        totalBidVolumeUnits: totalBidVolume,
        totalAskVolumeUnits: totalAskVolume,
      },
      orders,
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="text-xs font-mono text-emerald-400">
            PISCES 2.0 // INTERMITTENT AUCTION WORKFLOW (SIMULATION)
          </div>
          <h2 className="text-2xl font-semibold tracking-tight text-white mt-1">
            Intermittent Auction Desk (Simulated Workflow)
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Explores discrete, scheduled call auction workflows rather than continuous trading, concentrating 
            institutional liquidity and exploring non-continuous market structure for unlisted private securities.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <ExportDropdown
            label="Export Orders"
            count={orders.length}
            onExportCsv={handleExportOrdersCsv}
            onExportJson={handleExportOrdersJson}
          />
          <button
            onClick={() => setShowOrderModal(true)}
            className="px-4 py-2.5 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Stage Institutional Order
          </button>
          <button
            onClick={handleExecuteIntermittentClearing}
            className="px-4 py-2.5 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
          >
            Simulate Auction Call
          </button>
        </div>
      </div>

      {clearingMessage && (
        <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-800/60 text-emerald-300 text-xs flex items-center gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{clearingMessage}</span>
        </div>
      )}

      {/* Metrics Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60">
          <div className="text-xs text-slate-400">Total Book Value</div>
          <div className="mt-1 text-xl font-bold font-mono tabular-nums text-white">
            ${(totalVolumeUSD / 1000000).toFixed(2)}M
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">Across {orders.length} Logged Orders</div>
        </div>

        <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60">
          <div className="text-xs text-slate-400">Bid / Ask Ratio</div>
          <div className="mt-1 text-xl font-bold font-mono tabular-nums text-emerald-400">
            {(totalBidVolume / Math.max(1, totalAskVolume)).toFixed(2)}x
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">Modelled Order Imbalance</div>
        </div>

        <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60">
          <div className="text-xs text-slate-400">Clearing Schedule (Modelled)</div>
          <div className="mt-1 text-xl font-bold font-mono tabular-nums text-white">
            Bi-Weekly Call
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">Illustrative Window: Oct 24, 2026</div>
        </div>

        <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60">
          <div className="text-xs text-slate-400">Settlement Model (Proposed)</div>
          <div className="mt-1 text-xl font-bold font-mono tabular-nums text-white">
            T+2 DvP (Simulated)
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">Modelled Depository Workflow</div>
        </div>
      </div>

      {/* Order Book Table */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/40 overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-white">Institutional Intermittent Order Book</h3>
            <span className="text-xs text-slate-400 font-mono">({orders.length} Orders Logged)</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400 font-mono hidden sm:inline">Simulated Order Book Privacy Gate</span>
            <ExportDropdown
              label="Export Table"
              count={orders.length}
              onExportCsv={handleExportOrdersCsv}
              onExportJson={handleExportOrdersJson}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 bg-slate-950/40">
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">Participant Institution</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Side</th>
                <th className="py-3 px-4">Security</th>
                <th className="py-3 px-4 text-right">Unit Price</th>
                <th className="py-3 px-4 text-right">Volume</th>
                <th className="py-3 px-4 text-right">Total (USD)</th>
                <th className="py-3 px-4">
                  <div className="flex items-center">
                    <span>Status</span>
                    <InfoTooltip text="Delivery versus Payment (DvP): a securities settlement principle. All DvP states in this prototype are entirely simulated." />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {orders.map((ord) => {
                const isBid = ord.type === 'BID';
                return (
                  <tr key={ord.id} className="hover:bg-slate-800/20">
                    <td className="py-3 px-4 font-semibold text-slate-300">{ord.id}</td>
                    <td className="py-3 px-4 font-sans font-medium text-slate-100">{ord.investorName}</td>
                    <td className="py-3 px-4 text-slate-400">{ord.investorType}</td>
                    <td className="py-3 px-4">
                      <span className={`font-bold ${isBid ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {ord.type}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-200">{ord.securityTicker}</td>
                    <td className="py-3 px-4 text-right tabular-nums text-slate-100">
                      ${ord.unitPriceUSD.toFixed(2)}
                    </td>
                    <td className="py-3 px-4 text-right tabular-nums text-slate-300">
                      {ord.volumeUnits.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-right tabular-nums font-semibold text-slate-100">
                      ${ord.totalValueUSD.toLocaleString()}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`text-[11px] ${
                          ord.status === 'Simulated DvP'
                            ? 'text-emerald-400'
                            : ord.status === 'Matched'
                            ? 'text-blue-400'
                            : 'text-amber-400'
                        }`}
                      >
                        {ord.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Placing Institutional Order */}
      {showOrderModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-semibold text-white">
                Stage Institutional Order (Simulation)
              </h3>
              <button
                onClick={() => setShowOrderModal(false)}
                className="text-slate-400 hover:text-slate-200 text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handlePlaceOrder} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-slate-300 font-medium">Security Tranche:</label>
                <select
                  value={selectedSecurity}
                  onChange={(e) => setSelectedSecurity(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-lg p-2.5 font-mono"
                >
                  {ISSUERS_DATA.map((iss) => (
                    <React.Fragment key={iss.id}>
                      <option value={`${iss.ticker}-SR`}>{iss.ticker}-SR (Senior Secured)</option>
                      <option value={`${iss.ticker}-MZ`}>{iss.ticker}-MZ (Mezzanine Yield)</option>
                    </React.Fragment>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Order Side:</label>
                  <select
                    value={orderType}
                    onChange={(e) => setOrderType(e.target.value as 'BID' | 'ASK')}
                    className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-lg p-2.5 font-mono"
                  >
                    <option value="BID">BID (Buy Order)</option>
                    <option value="ASK">ASK (Sell Order)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Investor Classification:</label>
                  <select
                    value={investorType}
                    onChange={(e) => setInvestorType(e.target.value as AuctionOrder['investorType'])}
                    className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-lg p-2.5"
                  >
                    <option value="QIB Pension">QIB Pension Fund</option>
                    <option value="Sovereign Wealth">Illustrative Sovereign Investor</option>
                    <option value="Regional DFI">Regional DFI</option>
                    <option value="Private Equity Syndication">Private Equity Syndication</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-medium">Institution Legal Name:</label>
                <input
                  type="text"
                  required
                  value={investorName}
                  onChange={(e) => setInvestorName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-lg p-2.5"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Limit Unit Price (USD):</label>
                  <input
                    type="number"
                    step="0.05"
                    min="50"
                    max="200"
                    required
                    value={unitPrice}
                    onChange={(e) => setUnitPrice(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-lg p-2.5 font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Volume (Units):</label>
                  <input
                    type="number"
                    step="1000"
                    min="1000"
                    required
                    value={volume}
                    onChange={(e) => setVolume(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-lg p-2.5 font-mono"
                  />
                </div>
              </div>

              <div className="p-3 bg-slate-950 rounded-lg text-slate-400 font-mono text-xs flex justify-between">
                <span>Notional Commitment:</span>
                <span className="text-white font-semibold">
                  ${(unitPrice * volume).toLocaleString()} USD
                </span>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowOrderModal(false)}
                  className="px-4 py-2 text-xs text-slate-400 hover:text-slate-200 rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg cursor-pointer"
                >
                  Stage Order in Prototype
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
