/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Award, DollarSign, Gift, Sparkles, TrendingUp } from 'lucide-react';

export function EconomyModule() {
  const [amount, setAmount] = useState(10000);
  const [splitType, setSplitType] = useState<'20/30/50' | '50/35/10/5'>('20/30/50');

  const getSplit = () => {
    if (splitType === '20/30/50') {
      return {
        platform: amount * 0.2,
        treasury: amount * 0.3,
        creator: amount * 0.5,
      };
    }
    return {
      creator: amount * 0.5,
      community: amount * 0.35,
      treasury: amount * 0.1,
      validator: amount * 0.05,
    };
  };

  const splits = getSplit();

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-[#d7ddd9] bg-[#fffdf8] p-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-[#d7ddd9] pb-4">
          <div>
            <h2 className="font-serif text-2xl text-[#10222b]">Creator Economy &middot; Revenue Split Engine</h2>
            <p className="text-xs text-[#58696b]">Modelo de monetización con modelos de reparto (20/30/50 y 50/35/10/5), insignias y regalos.</p>
          </div>
          <span className="flex items-center gap-1.5 rounded-full bg-[#53c6a0]/15 px-3 py-1 font-mono text-xs text-[#0b6975]">
            <DollarSign className="size-3.5" /> STRIPE & LEDGER READY
          </span>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="space-y-4 rounded-xl border border-[#d7ddd9] bg-[#f5f3ee] p-5">
            <h3 className="font-serif font-medium text-sm text-[#10222b]">Simulador de Reparto</h3>
            <div className="space-y-3 font-mono text-xs">
              <div>
                <label className="text-[#58696b] block mb-1">Monto Total de Transacción (MXN)</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full rounded-lg border border-[#d7ddd9] bg-white p-2.5 text-xs text-[#10222b]"
                />
              </div>
              <div>
                <label className="text-[#58696b] block mb-1">Modelo de Split</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setSplitType('20/30/50')}
                    className={`rounded-lg border p-2 text-center transition ${splitType === '20/30/50' ? 'border-[#0b6975] bg-[#0b6975] text-white' : 'border-[#d7ddd9] bg-white text-[#10222b]'}`}
                  >
                    20 / 30 / 50
                  </button>
                  <button
                    onClick={() => setSplitType('50/35/10/5')}
                    className={`rounded-lg border p-2 text-center transition ${splitType === '50/35/10/5' ? 'border-[#0b6975] bg-[#0b6975] text-white' : 'border-[#d7ddd9] bg-white text-[#10222b]'}`}
                  >
                    50 / 35 / 10 / 5
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-[#d7ddd9] bg-[#071426] p-5 text-[#f4f6f5] flex flex-col justify-between">
            <div>
              <p className="font-mono text-[9px] tracking-widest text-[#62c4d2]">RESULTADO DE REPARTO ({splitType})</p>
              <div className="mt-4 space-y-3 font-mono text-xs">
                {Object.entries(splits).map(([key, val]) => (
                  <div key={key} className="flex justify-between border-b border-white/10 pb-2">
                    <span className="capitalize text-[#bfcac8]/80">{key}</span>
                    <span className="font-bold text-[#d8a85a]">${val.toLocaleString()} MXN</span>
                  </div>
                ))}
              </div>
            </div>
            <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#53c6a0] py-3 text-xs font-bold text-[#020817] transition hover:bg-[#42b08d]">
              Simular Payout en Ledger BookPI
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
