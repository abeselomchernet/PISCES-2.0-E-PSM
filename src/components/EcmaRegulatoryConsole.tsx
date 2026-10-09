import React, { useState } from 'react';
import { MOCK_ECMA_AUDITS, ISSUERS_DATA } from '../data/mockData';
import { EcmaAuditLog } from '../types';
import { ShieldCheck, CheckCircle2, AlertTriangle, FileText, Search, Play } from 'lucide-react';

export const EcmaRegulatoryConsole: React.FC = () => {
  const [audits, setAudits] = useState<EcmaAuditLog[]>(MOCK_ECMA_AUDITS);
  const [filterRating, setFilterRating] = useState<string>('ALL');
  const [auditNotification, setAuditNotification] = useState<string | null>(null);

  const handleTriggerRoutineAudit = () => {
    const randomIssuer = ISSUERS_DATA[Math.floor(Math.random() * ISSUERS_DATA.length)];
    const newAudit: EcmaAuditLog = {
      id: `ecma-${Math.floor(9200 + Math.random() * 800)}`,
      directiveCode: 'DIR-2025/IMM-SURVEILLANCE-LIVE',
      subject: 'Automated Intermittent Call Invariant Verification',
      entityName: randomIssuer.name,
      auditScope: `Real-time FX retention vault verification & ${randomIssuer.financials.exportRevenueSharePct}% hard-currency collateral audit`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' EAT',
      complianceRating: 'COMPLIANT',
      auditorId: `ECMA-OFFICER-${Math.floor(10 + Math.random() * 80)}`,
    };

    setAudits([newAudit, ...audits]);
    setAuditNotification(`ECMA Supervisory Audit successfully executed for ${randomIssuer.name}: All regulatory invariants confirmed compliant.`);
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
            ECMA REGULATORY MOAT // PROCLAMATION 1248/2021
          </div>
          <h2 className="text-2xl font-semibold tracking-tight text-white mt-1">
            ECMA Observer & Compliance Console
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Supervisory interface monitoring adherence to Ethiopian Capital Market Authority private 
            placement directives, institutional accreditation thresholds, and dual-currency reserve vaults.
          </p>
        </div>

        <button
          onClick={handleTriggerRoutineAudit}
          className="px-4 py-2.5 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors flex items-center gap-2 cursor-pointer shadow-sm whitespace-nowrap"
        >
          <Play className="w-4 h-4 fill-current" />
          Run ECMA Compliance Audit
        </button>
      </div>

      {auditNotification && (
        <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-800/60 text-emerald-300 text-xs flex items-center gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{auditNotification}</span>
        </div>
      )}

      {/* Statutory Regulatory Invariants */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400">RULE 144A EQUIVALENT</span>
            <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Enforced
            </span>
          </div>
          <div className="font-semibold text-sm text-white">QIB Exclusivity Moat</div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Secondary trading restricted exclusively to licensed institutional buyers with net investable assets exceeding $2,000,000 USD equivalent.
          </p>
        </div>

        <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400">NBE DIRECTIVE FX-02</span>
            <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> 100% Cleared
            </span>
          </div>
          <div className="font-semibold text-sm text-white">Dual-Currency Custody Vault</div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Offshore USD settlement accounts paired with National Bank Birr clearing vaults, ensuring Delivery-versus-Payment without FX friction.
          </p>
        </div>

        <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400">PROSPECTUS INVARIANT</span>
            <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Active
            </span>
          </div>
          <div className="font-semibold text-sm text-white">Predictive IMM Invariant Guard</div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Automated suspension of intermittent auction eligibility if an issuer’s predictive IMM score drops below 60 without structured anchor injection.
          </p>
        </div>
      </div>

      {/* Audit Logs Table */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/40 overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-white">Regulatory Audit Trail</h3>
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
                <th className="py-3 px-4">Supervised Entity</th>
                <th className="py-3 px-4">Subject & Scope</th>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Auditor ID</th>
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
