/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Activity, BrainCircuit, CheckCircle2, GitMerge, ShieldCheck, Zap } from 'lucide-react';
import { CognitiveLane } from '../../types/isabella';

const initialLanes: CognitiveLane[] = [
  { id: 'lane-01', name: 'Percepción Territorial', head: 'Head-Alpha-01', status: 'active', alphaScore: 0.98, betaScore: 0.96, consensusRatio: 0.97 },
  { id: 'lane-02', name: 'Gobernanza CROWN', head: 'Head-Alpha-02', status: 'active', alphaScore: 0.99, betaScore: 0.99, consensusRatio: 0.99 },
  { id: 'lane-03', name: 'Razonamiento Híbrido', head: 'Head-Beta-01', status: 'active', alphaScore: 0.94, betaScore: 0.95, consensusRatio: 0.945 },
  { id: 'lane-04', name: 'Verificación Epistémica', head: 'Head-Beta-02', status: 'active', alphaScore: 0.97, betaScore: 0.96, consensusRatio: 0.965 },
];

export function CognitiveABXModule() {
  const [lanes, setLanes] = useState<CognitiveLane[]>(initialLanes);
  const [runningSimulation, setRunningSimulation] = useState(false);

  const runSimulation = () => {
    setRunningSimulation(true);
    setTimeout(() => {
      setLanes((prev) =>
        prev.map((l) => ({
          ...l,
          alphaScore: Math.min(1.0, Number((l.alphaScore + (Math.random() * 0.02 - 0.01)).toFixed(3))),
          betaScore: Math.min(1.0, Number((l.betaScore + (Math.random() * 0.02 - 0.01)).toFixed(3))),
        }))
      );
      setRunningSimulation(false);
    }, 800);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-[#d7ddd9] bg-[#fffdf8] p-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-[#d7ddd9] pb-4">
          <div>
            <h2 className="font-serif text-2xl text-[#10222b]">ABX-01 &middot; Alpha/Beta Runtime Orchestration</h2>
            <p className="text-xs text-[#58696b]">24 carriles cognitivos distribuidos en 12 cabezas con ruteo adaptativo y bucle de reparación.</p>
          </div>
          <button
            onClick={runSimulation}
            disabled={runningSimulation}
            className="flex items-center gap-2 rounded-xl bg-[#0b6975] px-4 py-2 text-xs font-medium text-white transition hover:bg-[#0b4f58]"
          >
            <GitMerge className="size-4" /> {runningSimulation ? 'Sincronizando...' : 'Ejecutar Consenso'}
          </button>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {lanes.map((lane) => (
            <div key={lane.id} className="rounded-xl border border-[#d7ddd9] bg-[#f5f3ee] p-5">
              <div className="flex items-center justify-between">
                <span className="font-serif font-medium text-sm text-[#10222b]">{lane.name}</span>
                <span className="font-mono text-[10px] text-[#0b6975]">{lane.head}</span>
              </div>
              <div className="mt-4 space-y-2 font-mono text-xs">
                <div className="flex justify-between">
                  <span className="text-[#58696b]">Alpha Score</span>
                  <span className="font-bold text-[#10222b]">{lane.alphaScore * 100}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#58696b]">Beta Score</span>
                  <span className="font-bold text-[#10222b]">{lane.betaScore * 100}%</span>
                </div>
                <div className="flex justify-between border-t border-[#d7ddd9] pt-2">
                  <span className="text-[#0b6975]">Ratio de Consenso</span>
                  <span className="font-bold text-[#53c6a0]">{lane.consensusRatio * 100}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
