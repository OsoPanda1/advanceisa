/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { BrainCircuit, Database, FileText, Globe, History, Layers } from 'lucide-react';
import { MemoryLayerItem } from '../../types/isabella';

const memoryLayers: MemoryLayerItem[] = [
  { layerId: 1, title: 'Memoria de Sesión (Ephemeral Context)', type: 'session', recordsCount: 142, provenanceCID: 'bafybeig...01', lastSynced: 'Hace 2 min' },
  { layerId: 2, title: 'Memoria de Proyecto (Workspace State)', type: 'project', recordsCount: 890, provenanceCID: 'bafybeig...02', lastSynced: 'Hace 15 min' },
  { layerId: 3, title: 'Memoria Territorial (Real del Monte & LatAm)', type: 'territorial', recordsCount: 2450, provenanceCID: 'bafybeig...03', lastSynced: 'Hace 1 hora' },
  { layerId: 4, title: 'Memoria Histórica y Archivo CROWN', type: 'historical', recordsCount: 12400, provenanceCID: 'bafybeig...04', lastSynced: 'Hace 1 día' },
  { layerId: 5, title: 'DIGYTAMV Graph Knowledge Store', type: 'digytamv', recordsCount: 54100, provenanceCID: 'bafybeig...05', lastSynced: 'Sincronizado' },
];

export function MemoryModule() {
  const [layers] = useState<MemoryLayerItem[]>(memoryLayers);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-[#d7ddd9] bg-[#fffdf8] p-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-[#d7ddd9] pb-4">
          <div>
            <h2 className="font-serif text-2xl text-[#10222b]">Arquitectura de Memoria de 5 Capas</h2>
            <p className="text-xs text-[#58696b]">Gestión de contexto, RAG epistémico, grafos de conocimiento y procedencia verificable.</p>
          </div>
          <span className="flex items-center gap-1.5 rounded-full bg-[#0b6975]/15 px-3 py-1 font-mono text-xs text-[#0b6975]">
            <Database className="size-3.5" /> 5 CAPAS ACTIVAS
          </span>
        </div>

        <div className="mt-6 space-y-4">
          {layers.map((layer) => (
            <div key={layer.layerId} className="rounded-xl border border-[#d7ddd9] bg-[#f5f3ee] p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#071426] font-serif text-sm text-[#d8a85a]">
                  0{layer.layerId}
                </div>
                <div>
                  <h3 className="font-serif font-medium text-sm text-[#10222b]">{layer.title}</h3>
                  <p className="font-mono text-[10px] text-[#58696b] mt-0.5">CID: {layer.provenanceCID}</p>
                </div>
              </div>
              <div className="flex items-center gap-6 font-mono text-xs">
                <div>
                  <span className="text-[#8e9d9b] block text-[9px]">REGISTROS</span>
                  <span className="font-bold text-[#10222b]">{layer.recordsCount.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-[#8e9d9b] block text-[9px]">ESTADO</span>
                  <span className="text-[#53c6a0]">{layer.lastSynced}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
