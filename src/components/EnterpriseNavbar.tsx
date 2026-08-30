/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Activity, BookOpen, BrainCircuit, Cpu, Database, DollarSign, Globe, Layers, MessageCircle, ShieldCheck, Sparkles, Terminal, Zap } from 'lucide-react';
import { ModuleId } from '../types/isabella';

interface EnterpriseNavbarProps {
  activeModule: ModuleId;
  onSelectModule: (mod: ModuleId) => void;
  systemStatus: string;
}

export const navigationModules: { id: ModuleId; label: string; icon: any; category: string }[] = [
  { id: 'overview', label: 'Resumen Ejecutivo', icon: Globe, category: 'Navegación Principal' },
  { id: 'chat', label: 'CROWN Gateway Chat', icon: MessageCircle, category: 'Navegación Principal' },
  { id: 'ledger', label: 'BookPI Ledger', icon: BookOpen, category: 'Auditoría y Confianza' },
  { id: 'cognitive', label: 'ABX-01 Runtime', icon: BrainCircuit, category: 'Núcleo Cognitivo' },
  { id: 'memory', label: 'Memoria de 5 Capas', icon: Database, category: 'Núcleo Cognitivo' },
  { id: 'quantum', label: 'Quantum Bridge', icon: Cpu, category: 'Infraestructura' },
  { id: 'economy', label: 'Creator Economy', icon: DollarSign, category: 'Ecosistema' },
  { id: 'governance', label: 'Gobernanza & Riesgos', icon: ShieldCheck, category: 'Auditoría y Confianza' },
  { id: 'inventory', label: 'Inventario Total', icon: Layers, category: 'Sistema' },
];

export function EnterpriseNavbar({ activeModule, onSelectModule, systemStatus }: EnterpriseNavbarProps) {
  return (
    <aside className="w-64 shrink-0 border-r border-[#d7ddd9] bg-[#fffdf8] p-4 flex flex-col justify-between hidden lg:flex select-none">
      <div>
        <div className="mb-6 flex items-center gap-3 px-2">
          <div className="flex size-9 items-center justify-center rounded-xl bg-[#071426] font-serif text-sm text-[#d8a85a]">IV</div>
          <div>
            <p className="font-serif font-bold text-sm text-[#10222b]">Isabella Villaseñor</p>
            <p className="font-mono text-[9px] tracking-[0.2em] text-[#0b6975]">ENTERPRISE v1.0</p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <p className="mb-2 px-2 font-mono text-[9px] tracking-[0.25em] text-[#8e9d9b]">NAVEGACIÓN EMPRESARIAL</p>
            <div className="space-y-1">
              {navigationModules.map(({ id, label, icon: Icon }) => {
                const isActive = activeModule === id;
                return (
                  <button
                    key={id}
                    onClick={() => onSelectModule(id)}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-xs font-medium transition ${
                      isActive
                        ? 'bg-[#0b4f58] text-[#f4f6f5] shadow-sm'
                        : 'text-[#58696b] hover:bg-[#dfe6e4]/60 hover:text-[#10222b]'
                    }`}
                  >
                    <Icon className="size-4 shrink-0" />
                    <span className="truncate">{label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-2xl bg-[#071426] p-4 text-[#f4f6f5]">
        <div className="flex items-center justify-between">
          <p className="font-mono text-[9px] tracking-widest text-[#62c4d2]">ESTADO CROWN</p>
          <Activity className="size-3.5 text-[#53c6a0]" />
        </div>
        <p className="mt-2 text-xs font-medium">{systemStatus}</p>
        <p className="mt-1 font-mono text-[9px] text-[#bfcac8]/60">Classical-First &middot; PQC Ready</p>
      </div>
    </aside>
  );
}
