/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { BookOpen, CheckCircle, Database, Lock, Shield, Terminal } from 'lucide-react';
import { LedgerEntry } from '../../types/isabella';

const initialLedger: LedgerEntry[] = [
  {
    id: 'blk-001',
    timestamp: '2026-08-30T10:00:00Z',
    payloadHash: '0x8f9c2a3e7b1d4f6a9c8b7a6f5e4d3c2b1a0f9e8d7c6b5a4f3e2d1c0b9a8f7e6d',
    eventHash: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b',
    cid: 'bafybeigdyrzt5sfp7udm7hu76uh7y75g3d7m3s7',
    powNonce: 48921,
    signature: 'pqc_ml_dsa_65_sig_VerifiedTrue',
    pqcAlgorithm: 'ML-DSA-65',
    debitAccount: 'treasury.core',
    creditAccount: 'creator.pool',
    amount: 1500.0,
    currency: 'MXN',
    status: 'verified'
  },
  {
    id: 'blk-002',
    timestamp: '2026-08-30T12:30:00Z',
    payloadHash: '0x3c2b1a0f9e8d7c6b5a4f3e2d1c0b9a8f7e6d8f9c2a3e7b1d4f6a9c8b7a6f5e4d',
    eventHash: '0x7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d',
    cid: 'bafybeig0q1w2e3r4t5y6u7i8o9p0asdfghjkl',
    powNonce: 91823,
    signature: 'pqc_ml_dsa_65_sig_VerifiedTrue',
    pqcAlgorithm: 'ML-DSA-65',
    debitAccount: 'ai.compute',
    creditAccount: 'node.validator.01',
    amount: 3200.5,
    currency: 'MXN',
    status: 'audited'
  }
];

export function LedgerModule() {
  const [entries, setEntries] = useState<LedgerEntry[]>(initialLedger);
  const [selected, setSelected] = useState<LedgerEntry>(initialLedger[0]);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-[#d7ddd9] bg-[#fffdf8] p-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-[#d7ddd9] pb-4">
          <div>
            <h2 className="font-serif text-2xl text-[#10222b]">BookPI &middot; Double-Entry Ledger Inspector</h2>
            <p className="text-xs text-[#58696b]">Cadena de bloques inmutable con verificación PQC, hash chaining y Proof-of-Work.</p>
          </div>
          <span className="flex items-center gap-1.5 rounded-full bg-[#0b6975]/15 px-3 py-1 font-mono text-xs text-[#0b6975]">
            <Lock className="size-3.5" /> POST-QUANTUM SECURED
          </span>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-3">
            <p className="font-mono text-[9px] tracking-widest text-[#8e9d9b]">BLOQUES REGISTRADOS</p>
            {entries.map((entry) => (
              <div
                key={entry.id}
                onClick={() => setSelected(entry)}
                className={`cursor-pointer rounded-xl border p-4 transition ${
                  selected.id === entry.id
                    ? 'border-[#0b6975] bg-[#eef6f4]'
                    : 'border-[#d7ddd9] bg-[#fffdf8] hover:border-[#0b6975]/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-medium text-[#10222b]">{entry.id}</span>
                  <span className="font-mono text-xs text-[#53c6a0] flex items-center gap-1">
                    <CheckCircle className="size-3" /> {entry.status}
                  </span>
                </div>
                <div className="mt-2 flex items-center justify-between text-xs text-[#58696b]">
                  <span>{entry.debitAccount} &rarr; {entry.creditAccount}</span>
                  <span className="font-mono font-bold text-[#10222b]">{entry.amount} {entry.currency}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-[#d7ddd9] bg-[#071426] p-5 text-[#f4f6f5]">
            <p className="font-mono text-[9px] tracking-widest text-[#62c4d2]">INSPECTOR DETALLADO</p>
            <div className="mt-4 space-y-3 font-mono text-xs">
              <div>
                <span className="text-[#bfcac8]/60 block text-[10px]">PAYLOAD HASH</span>
                <span className="text-[#62c4d2] break-all">{selected.payloadHash}</span>
              </div>
              <div>
                <span className="text-[#bfcac8]/60 block text-[10px]">EVENT HASH</span>
                <span className="text-[#d8a85a] break-all">{selected.eventHash}</span>
              </div>
              <div>
                <span className="text-[#bfcac8]/60 block text-[10px]">CONTENT IDENTIFIER (CID)</span>
                <span className="text-white break-all">{selected.cid}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10">
                <div>
                  <span className="text-[#bfcac8]/60 block text-[10px]">PoW NONCE</span>
                  <span>{selected.powNonce}</span>
                </div>
                <div>
                  <span className="text-[#bfcac8]/60 block text-[10px]">ALGORITMO PQC</span>
                  <span className="text-[#53c6a0]">{selected.pqcAlgorithm}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
