/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { CheckCircle2, ShieldCheck, Terminal } from 'lucide-react';

export function GovernanceModule() {
  const [items] = useState([
    { id: 'gov-01', title: 'UNESCO AI Ethics Alignment', status: 'Verificado', risk: 'Bajo' },
    { id: 'gov-02', title: 'UN Global Digital Compact Compliance', status: 'Verificado', risk: 'Bajo' },
    { id: 'gov-03', title: 'WEF Governance Framework', status: 'Activo', risk: 'Medio' },
    { id: 'gov-04', title: 'CROWN Strict Ethical Guardrails', status: 'Verificado', risk: 'Bajo' },
  ]);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-[#d7ddd9] bg-[#fffdf8] p-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-[#d7ddd9] pb-4">
          <div>
            <h2 className="font-serif text-2xl text-[#10222b]">Gobernanza &middot; AI Risk Register y Model Cards</h2>
            <p className="text-xs text-[#58696b]">Alineación institucional con estándares internacionales, control humano y tarjetas de modelo.</p>
          </div>
          <span className="flex items-center gap-1.5 rounded-full bg-[#0b6975]/15 px-3 py-1 font-mono text-xs text-[#0b6975]">
            <ShieldCheck className="size-3.5" /> COMPLIANCE OK
          </span>
        </div>

        <div className="mt-6 space-y-3">
          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-between rounded-xl border border-[#d7ddd9] bg-[#f5f3ee] p-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="size-4 text-[#53c6a0]" />
                <div>
                  <h3 className="font-serif font-medium text-sm text-[#10222b]">{item.title}</h3>
                  <p className="font-mono text-[10px] text-[#58696b]">Nivel de Riesgo: {item.risk}</p>
                </div>
              </div>
              <span className="rounded-full bg-[#0b6975]/15 px-3 py-1 font-mono text-[10px] text-[#0b6975]">
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
