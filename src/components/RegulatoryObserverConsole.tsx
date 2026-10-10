import React, { useState } from 'react';
import { MOCK_REGULATORY_OBSERVER_LOGS, ISSUERS_DATA } from '../data/mockData';
import { RegulatoryObserverLog } from '../types';
import { ShieldCheck, CheckCircle2, AlertTriangle, FileText, Search, Play } from 'lucide-react';

export const RegulatoryObserverConsole: React.FC = () => {
  const [audits, setAudits] = useState<RegulatoryObserverLog[]>(MOCK_REGULATORY_OBSERVER_LOGS);
  const [filterRating, setFilterRating] = useState<string>('ALL');
  const [auditNotification, setAuditNotification] = useState<string | null>(null);

  const handleTriggerRoutineAudit = () => {
    const randomIssuer = ISSUERS_DATA[Math.floor(Math.random() * ISSUERS_DATA.length)];
    const newAudit: RegulatoryObserverLog = {
      id: `obs-${Math.floor(9200 + Math.random() * 800)}`,
      directiveCode: 'REF-DIR-2025/IMM-SURVEILLANCE-SIM',
      subject: 'Automated Intermittent Call Invariant Verification (Prototype)',
      entityName: randomIssuer.name,
      auditScope: `Simulated FX retention verification & ${randomIssuer.financials.exportRevenueSharePct}% hard-currency collateral audit`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' EAT',
      complianceRating: 'COMPLIANT',
      auditorId: `OBSERVER-SIM-${Math.floor(10 + Math.random() * 80)}`,
    };

    setAudits([newAudit, ...audits]);
    setAuditNotification(`Simulated regulatory surveillance check logged for ${randomIssuer.name}: Prototype invariant checks completed.`);
    setTimeout(() => setAuditNotification(null), 5000);
  };

  const filteredAudits = audits.filter(
    (a) => filterRating === 'ALL' || a.complianceRating === filterRating
  );

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="text-xs font-mono text-emerald-400">
            REGULATORY OBSERVER // REFERENCE CONTEXT: PROCLAMATION 1248/2021
          </div>
          <h2 className="text-2xl font-semibold tracking-tight text-white mt-1">
            Regulatory Observer — Prototype UX
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Prototype interface illustrating regulatory-observer oversight, compliance controls, and disclosure 
            surveillance workflows designed with reference to Ethiopian Capital Market Authority private placement concepts.
          </p>
        </div>

        <button
          onClick={handleTriggerRoutineAudit}
          className="px-4 py-2.5 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors flex items-center gap-2 cursor-pointer shadow-sm whitespace-nowrap"
        >
          <Play className="w-4 h-4 fill-current" />
          Simulate Supervisory Audit Check
        </button>
      </div>

      {auditNotification && (
        <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-800/60 text-emerald-300 text-xs flex items-center gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{auditNotification}</span>
        </div>
      )}

      {/* Regulatory Context & Prototype Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400">QUALIFIED INVESTOR THRESHOLDS</span>
            <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Modelled
            </span>
          </div>
          <div className="font-semibold text-sm text-white">Institutional Eligibility Gate (Modelled)</div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Simulated qualification policy: trading modelled for licensed institutional buyers with net investable assets exceeding $2,000,000 USD equivalent.
          </p>
        </div>

        <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400">DUAL-CURRENCY SETTLEMENT</span>
            <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Proposed
            </span>
          </div>
          <div className="font-semibold text-sm text-white">Dual-Currency Custody Concept</div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Target architecture concept: paired offshore USD and local Birr accounts explored for Delivery-versus-Payment without FX friction.
          </p>
        </div>

        <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400">DISCLOSURE INVARIANT</span>
            <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Prototype
            </span>
          </div>
          <div className="font-semibold text-sm text-white">IMM Scoring Threshold Guard (Prototype)</div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Modelled control: suspension of intermittent auction eligibility if an issuer’s analytical IMM score drops below 60 without structured credit enhancement.
          </p>
        </div>
      </div>

      {/* Audit Logs Table */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/40 overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-white">Simulated Regulatory Surveillance Log</h3>
            <span className="text-xs text-slate-400 font-mono">({filteredAudits.length} entries)</span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400">Status Filter:</span>
            <select
              value={filterRating}
              onChange={(e) => setFilterRating(e.target.value)}
              className="bg-slate-950 border border-slate-800 text-slate-200 rounded-lg px-2.5 py-1 font-mono"
            >
              <option value="ALL">All Records</option>
              <option value="COMPLIANT">Compliant Only</option>
              <option value="UNDER_REVIEW">Under Review</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 bg-slate-950/40">
                <th className="py-3 px-4">Audit ID</th>
                <th className="py-3 px-4">Directive Code</th>
                <th className="py-3 px-4">Observed Entity</th>
                <th className="py-3 px-4">Subject & Scope</th>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Observer ID</th>
                <th className="py-3 px-4">Verdict</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredAudits.map((log) => (
                <tr key={log.id} className="hover:bg-slate-800/20">
                  <td className="py-3 px-4 font-semibold text-slate-300">{log.id}</td>
                  <td className="py-3 px-4 text-emerald-400">{log.directiveCode}</td>
                  <td className="py-3 px-4 font-sans font-medium text-slate-100">{log.entityName}</td>
                  <td className="py-3 px-4 font-sans text-slate-300 max-w-xs truncate" title={log.auditScope}>
                    {log.subject}
                  </td>
                  <td className="py-3 px-4 text-slate-400">{log.timestamp}</td>
                  <td className="py-3 px-4 text-slate-400">{log.auditorId}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`font-semibold ${
                        log.complianceRating === 'COMPLIANT'
                          ? 'text-emerald-400'
                          : 'text-amber-400'
                      }`}
                    >
                      {log.complianceRating}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export const EcmaRegulatoryConsole = RegulatoryObserverConsole;
