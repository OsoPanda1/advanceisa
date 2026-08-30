/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { ISABELLA_FUNCTION_INVENTORY } from '../../data/inventory';
import { FunctionState } from '../../types/isabella';
import { CheckCircle2, Layers, Search, ShieldCheck } from 'lucide-react';

export function InventoryMatrixModule() {
  const [filterState, setFilterState] = useState<string>('all');
  const [search, setSearch] = useState<string>('');

  const filtered = ISABELLA_FUNCTION_INVENTORY.filter((item) => {
    const matchesState = filterState === 'all' || item.currentState === filterState;
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) || item.purpose.toLowerCase().includes(search.toLowerCase());
    return matchesState && matchesSearch;
  });

  const stateColors: Record<FunctionState, string> = {
    implemented: 'bg-[#53c6a0]/15 text-[#0b6975]',
    verified: 'bg-[#62c4d2]/20 text-[#0b4f58]',
    experimental: 'bg-[#d8a85a]/20 text-[#8c6522]',
    simulated: 'bg-purple-100 text-purple-800',
    shadow: 'bg-slate-200 text-slate-800',
    planned: 'bg-amber-100 text-amber-800',
    unavailable: 'bg-rose-100 text-rose-800',
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-[#d7ddd9] bg-[#fffdf8] p-6 shadow-sm">
        <div className="flex flex-col gap-4 border-b border-[#d7ddd9] pb-5 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-serif text-2xl text-[#10222b]">Inventario Total y Matriz de Estado</h2>
            <p className="text-xs text-[#58696b]">Evaluación transparente de funciones, riesgos, latencias y mecanismos de fallback.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 size-4 text-[#8e9d9b]" />
              <input
                type="text"
                placeholder="Buscar función..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="rounded-xl border border-[#d7ddd9] bg-[#f5f3ee] pl-9 pr-4 py-2 text-xs text-[#10222b] outline-none focus:border-[#0b6975]"
              />
            </div>
            <select
              value={filterState}
              onChange={(e) => setFilterState(e.target.value)}
              className="rounded-xl border border-[#d7ddd9] bg-[#f5f3ee] px-3 py-2 text-xs text-[#10222b]"
            >
              <option value="all">Todos los estados</option>
              <option value="implemented">Implementados</option>
              <option value="verified">Verificados</option>
              <option value="simulated">Simulados</option>
            </select>
          </div>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="border-b border-[#d7ddd9] text-[#8e9d9b]">
                <th className="pb-3 font-medium">NOMBRE / PROPÓSITO</th>
                <th className="pb-3 font-medium">ARCHIVO</th>
                <th className="pb-3 font-medium">ESTADO</th>
                <th className="pb-3 font-medium">RIESGO</th>
                <th className="pb-3 font-medium">LATENCIA</th>
                <th className="pb-3 font-medium">FALLBACK</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#d7ddd9]">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-[#f5f3ee]/60">
                  <td className="py-4">
                    <p className="font-serif font-medium text-sm text-[#10222b]">{item.name}</p>
                    <p className="text-[11px] text-[#58696b] font-sans mt-0.5">{item.purpose}</p>
                  </td>
                  <td className="py-4 text-[#0b6975] text-[11px]">{item.file}</td>
                  <td className="py-4">
                    <span className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-medium uppercase ${stateColors[item.currentState]}`}>
                      {item.currentState}
                    </span>
                  </td>
                  <td className="py-4 uppercase text-[11px] text-[#10222b]">{item.risk}</td>
                  <td className="py-4 text-[11px]">{item.latencyMs} ms</td>
                  <td className="py-4 text-[11px] text-[#58696b]">{item.fallback}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
