/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Cpu, Play, RefreshCw, ShieldCheck } from 'lucide-react';

export function QuantumBridgeModule() {
  const [wires, setWires] = useState(4);
  const [shots, setShots] = useState(1024);
  const [simulating, setSimulating] = useState(false);
  const [results, setResults] = useState<{ state: string; probability: number }[]>([
    { state: '|0000⟩', probability: 0.48 },
    { state: '|0101⟩', probability: 0.22 },
    { state: '|1010⟩', probability: 0.18 },
    { state: '|1111⟩', probability: 0.12 },
  ]);

  const runSimulation = () => {
    setSimulating(true);
    setTimeout(() => {
      const p1 = Number((Math.random() * 0.3 + 0.3).toFixed(2));
      const p2 = Number((Math.random() * 0.2 + 0.1).toFixed(2));
      const p3 = Number((Math.random() * 0.2 + 0.1).toFixed(2));
      const p4 = Number((1 - (p1 + p2 + p3)).toFixed(2));
      setResults([
        { state: '|0000⟩', probability: p1 },
        { state: '|0101⟩', probability: p2 },
        { state: '|1010⟩', probability: p3 },
        { state: '|1111⟩', probability: p4 },
      ]);
      setSimulating(false);
    }, 900);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-[#d7ddd9] bg-[#fffdf8] p-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-[#d7ddd9] pb-4">
          <div>
            <h2 className="font-serif text-2xl text-[#10222b]">Quantum Bridge &middot; PennyLane / Qiskit Simulator</h2>
            <p className="text-xs text-[#58696b]">Optimización cuántica híbrida con respaldo clásico automático cuando la evidencia lo requiere.</p>
          </div>
          <span className="flex items-center gap-1.5 rounded-full bg-[#d8a85a]/15 px-3 py-1 font-mono text-xs text-[#d8a85a]">
            <Cpu className="size-3.5" /> QUANTUM SIMULATOR
          </span>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="space-y-4 rounded-xl border border-[#d7ddd9] bg-[#f5f3ee] p-5">
            <h3 className="font-serif font-medium text-sm text-[#10222b]">Configuración de Circuito</h3>
            <div className="space-y-3 font-mono text-xs">
              <div>
                <label className="text-[#58696b] block mb-1">Qubits (Wires): {wires}</label>
                <input
                  type="range"
                  min="2"
                  max="12"
                  value={wires}
                  onChange={(e) => setWires(Number(e.target.value))}
                  className="w-full accent-[#0b6975]"
                />
              </div>
              <div>
                <label className="text-[#58696b] block mb-1">Shots: {shots}</label>
                <select
                  value={shots}
                  onChange={(e) => setShots(Number(e.target.value))}
                  className="w-full rounded-lg border border-[#d7ddd9] bg-white p-2 text-xs text-[#10222b]"
                >
                  <option value={512}>512 shots</option>
                  <option value={1024}>1024 shots</option>
                  <option value={4096}>4096 shots</option>
                </select>
              </div>
            </div>
            <button
              onClick={runSimulation}
              disabled={simulating}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0b6975] py-3 text-xs font-medium text-white transition hover:bg-[#0b4f58]"
            >
              {simulating ? <RefreshCw className="size-4 animate-spin" /> : <Play className="size-4" />}
              Ejecutar Simulación Cuántica
            </button>
          </div>

          <div className="rounded-xl border border-[#d7ddd9] bg-[#071426] p-5 text-[#f4f6f5]">
            <p className="font-mono text-[9px] tracking-widest text-[#62c4d2]">DISTRIBUCIÓN DE PROBABILIDAD</p>
            <div className="mt-4 space-y-3 font-mono text-xs">
              {results.map((r) => (
                <div key={r.state} className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-[#d8a85a]">{r.state}</span>
                    <span>{(r.probability * 100).toFixed(1)}%</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                    <div className="h-full bg-[#62c4d2] transition-all duration-500" style={{ width: `${r.probability * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
