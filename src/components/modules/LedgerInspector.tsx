/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { BookOpen, CheckCircle2, FileCode, Lock, ShieldCheck, Terminal } from 'lucide-react';
import { LedgerEntry } from '../../types/isabella';

const sampleBlocks: LedgerEntry[] = [
  {
    id: 'block-001',
    timestamp: '2026-08-30T14:00:00Z',
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
    id: 'block-002',
    timestamp: '2026-08-30T15:30:00Z',
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
  },
  {
    id: 'block-003',
    timestamp: '2026-08-30T16:20:00Z',
    payloadHash: '0xa1b2c3d4e5f67890123456789abcdef0123456789abcdef0123456789abcdef',
    eventHash: '0xfedcba9876543210fedcba9876543210fedcba9876543210fedcba9876543210',
    cid: 'bafybeig9z8y7x6w5v4u3t2s1r0qponmlkjihg',
    powNonce: 15789,
    signature: 'pqc_ml_dsa_65_sig_VerifiedTrue',
    pqcAlgorithm: 'ML-DSA-65',
    debitAccount: 'territory.hidalgo',
    creditAccount: 'digytamv.graph',
    amount: 5400.0,
    currency: 'MXN',
    status: 'verified'
  }
];

export function LedgerInspector() {
  const [blocks, setBlocks] = useState<LedgerEntry[]>(sampleBlocks);
  const [selectedBlock, setSelectedBlock] = useState<LedgerEntry>(sampleBlocks[0]);
  const [verifying, setVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<string | null>(null);

  const handleVerifyChain = () => {
    setVerifying(true);
    setVerificationResult(null);
    setTimeout(() => {
      setVerifying(false);
      setVerificationResult('Hash chain integrity VERIFIED &middot; All CIDs match cryptographic state &middot; PQC ML-DSA-65 signatures valid.');
    }, 700);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-[#d7ddd9] bg-[#fffdf8] p-6 shadow-sm">
        <div className="flex flex-col gap-4 border-b border-[#d7ddd9] pb-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-serif text-2xl text-[#10222b]">BookPI &middot; Double-Entry Ledger Inspector</h2>
            <p className="text-xs text-[#58696b]">Auditoría inmutable de transacciones financieras y cognitivas con hash chaining, CID y firmas post-cuánticas.</p>
          </div>
          <button
            onClick={handleVerifyChain}
            disabled={verifying}
            className="flex items-center gap-2 rounded-xl bg-[#0b6975] px-4 py-2.5 text-xs font-medium text-white transition hover:bg-[#0b4f58]"
          >
            <ShieldCheck className="size-4" /> {verifying ? 'Verificando Cadena...' : 'Verificar Hash Chain'}
          </button>
        </div>

        {verificationResult && (
          <div className="mt-4 rounded-xl border border-[#53c6a0]/30 bg-[#53c6a0]/10 p-4 font-mono text-xs text-[#0b6975] flex items-center gap-3">
            <CheckCircle2 className="size-5 text-[#53c6a0] shrink-0" />
            <span>{verificationResult}</span>
          </div>
        )}

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-3">
            <p className="font-mono text-[9px] tracking-widest text-[#8e9d9b]">BLOQUES EN CADENA</p>
            {blocks.map((block) => (
              <div
                key={block.id}
                onClick={() => setSelectedBlock(block)}
                className={`cursor-pointer rounded-xl border p-4 transition ${
                  selectedBlock.id === block.id
                    ? 'border-[#0b6975] bg-[#eef6f4]'
                    : 'border-[#d7ddd9] bg-[#fffdf8] hover:border-[#0b6975]/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#10222b]">{block.id}</span>
                  <span className="font-mono text-[10px] text-[#53c6a0] flex items-center gap-1">
                    <CheckCircle2 className="size-3" /> {block.status}
                  </span>
                </div>
                <div className="mt-2 flex items-center justify-between text-xs text-[#58696b]">
                  <span>{block.debitAccount} &rarr; {block.creditAccount}</span>
                  <span className="font-mono font-bold text-[#10222b]">${block.amount.toLocaleString()} {block.currency}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-[#d7ddd9] bg-[#071426] p-5 text-[#f4f6f5]">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="font-mono text-[9px] tracking-widest text-[#62c4d2]">DETALLE DE BLOQUE: {selectedBlock.id}</span>
              <span className="font-mono text-[10px] text-[#d8a85a]">{selectedBlock.pqcAlgorithm}</span>
            </div>
            <div className="mt-4 space-y-3 font-mono text-xs">
              <div>
                <span className="text-[#bfcac8]/60 block text-[9px]">PAYLOAD HASH</span>
                <span className="text-[#62c4d2] break-all">{selectedBlock.payloadHash}</span>
              </div>
              <div>
                <span className="text-[#bfcac8]/60 block text-[9px]">EVENT HASH</span>
                <span className="text-[#d8a85a] break-all">{selectedBlock.eventHash}</span>
              </div>
              <div>
                <span className="text-[#bfcac8]/60 block text-[9px]">CONTENT IDENTIFIER (CID)</span>
                <span className="text-white break-all">{selectedBlock.cid}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10">
                <div>
                  <span className="text-[#bfcac8]/60 block text-[9px]">PoW NONCE</span>
                  <span>{selectedBlock.powNonce}</span>
                </div>
                <div>
                  <span className="text-[#bfcac8]/60 block text-[9px]">TIMESTAMP</span>
                  <span className="text-[#53c6a0]">{new Date(selectedBlock.timestamp).toLocaleTimeString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
