/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { CinematicIntro } from './CinematicIntro';
import { ChatModule } from './modules/ChatModule';
import { LedgerInspector } from './modules/LedgerInspector';
import { CognitiveABXModule } from './modules/CognitiveABXModule';
import { MemoryModule } from './modules/MemoryModule';
import { QuantumBridgeModule } from './modules/QuantumBridgeModule';
import { EconomyModule } from './modules/EconomyModule';
import { GovernanceModule } from './modules/GovernanceModule';
import { InventoryMatrixModule } from './modules/InventoryMatrixModule';
import { ModuleId } from '../types/isabella';
import { Activity, BookOpen, BrainCircuit, Cpu, Database, DollarSign, Globe, Layers, MessageCircle, ShieldCheck, Sparkles, Terminal } from 'lucide-react';

export default function IsabellaPlatform() {
  const [intro, setIntro] = useState(true);
  const [activeModule, setActiveModule] = useState<ModuleId>('overview');

  return (
    <>
      {intro && <CinematicIntro onComplete={() => setIntro(false)} />}
      <div className="flex min-h-screen flex-col bg-[#f5f3ee] text-[#10222b]">
        {/* Top Thematic Navbar */}
        <header className="flex h-16 items-center justify-between border-b border-[#d7ddd9] bg-[#fffdf8] px-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex size-10 items-center justify-center rounded-xl bg-[#071426] font-serif text-sm text-[#d8a85a]">
              IV
            </div>
            <div>
              <p className="font-serif font-bold text-sm text-[#10222b]">Isabella Villaseñor AI</p>
              <p className="font-mono text-[9px] tracking-[0.25em] text-[#0b6975]">SOVEREIGN COGNITIVE INFRASTRUCTURE &middot; CROWN STERN</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden items-center gap-2 rounded-full bg-[#53c6a0]/15 px-3 py-1 font-mono text-xs text-[#0b6975] md:flex">
              <Activity className="size-3.5 animate-pulse" /> CLASICAL-FIRST &middot; PQC ACTIVE
            </span>
            <button
              onClick={() => setIntro(true)}
              className="rounded-xl border border-[#d7ddd9] bg-[#f5f3ee] px-3 py-1.5 font-mono text-xs text-[#10222b] transition hover:border-[#0b6975]"
            >
              Ver Trailer
            </button>
          </div>
        </header>

        {/* Main Layout with Left 3-tier Navbars & Right 2 Panels */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left Tier 1: Core Navigation */}
          <aside className="w-56 shrink-0 border-r border-[#d7ddd9] bg-[#fffdf8] p-4 hidden lg:flex flex-col justify-between select-none">
            <div className="space-y-6">
              <div>
                <p className="mb-2 font-mono text-[9px] tracking-[0.2em] text-[#8e9d9b]">01. NÚCLEO Y CHAT</p>
                <div className="space-y-1">
                  <button
                    onClick={() => setActiveModule('overview')}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-xs font-medium transition ${activeModule === 'overview' ? 'bg-[#0b6975] text-white' : 'text-[#58696b] hover:bg-[#f5f3ee]'}`}
                  >
                    <Globe className="size-4" /> Resumen Ejecutivo
                  </button>
                  <button
                    onClick={() => setActiveModule('chat')}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-xs font-medium transition ${activeModule === 'chat' ? 'bg-[#0b6975] text-white' : 'text-[#58696b] hover:bg-[#f5f3ee]'}`}
                  >
                    <MessageCircle className="size-4" /> CROWN Gateway Chat
                  </button>
                </div>
              </div>

              <div>
                <p className="mb-2 font-mono text-[9px] tracking-[0.2em] text-[#8e9d9b]">02. COGNICIÓN Y MEMORIA</p>
                <div className="space-y-1">
                  <button
                    onClick={() => setActiveModule('cognitive')}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-xs font-medium transition ${activeModule === 'cognitive' ? 'bg-[#0b6975] text-white' : 'text-[#58696b] hover:bg-[#f5f3ee]'}`}
                  >
                    <BrainCircuit className="size-4" /> ABX-01 Runtime
                  </button>
                  <button
                    onClick={() => setActiveModule('memory')}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-xs font-medium transition ${activeModule === 'memory' ? 'bg-[#0b6975] text-white' : 'text-[#58696b] hover:bg-[#f5f3ee]'}`}
                  >
                    <Database className="size-4" /> 5 Capas de Memoria
                  </button>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-[#071426] p-3 text-[#f4f6f5] font-mono text-[10px]">
              <span className="text-[#62c4d2] block mb-1">CROWN NODE</span>
              <span>Real del Monte, Hidalgo</span>
            </div>
          </aside>

          {/* Left Tier 2: Governance & Ledger Nav */}
          <aside className="w-52 shrink-0 border-r border-[#d7ddd9] bg-[#f9f8f5] p-4 hidden xl:flex flex-col justify-between select-none">
            <div className="space-y-6">
              <div>
                <p className="mb-2 font-mono text-[9px] tracking-[0.2em] text-[#8e9d9b]">03. CONFIANZA Y LEDGER</p>
                <div className="space-y-1">
                  <button
                    onClick={() => setActiveModule('ledger')}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-xs font-medium transition ${activeModule === 'ledger' ? 'bg-[#0b4f58] text-white' : 'text-[#58696b] hover:bg-[#efece6]'}`}
                  >
                    <BookOpen className="size-4" /> BookPI Inspector
                  </button>
                  <button
                    onClick={() => setActiveModule('governance')}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-xs font-medium transition ${activeModule === 'governance' ? 'bg-[#0b4f58] text-white' : 'text-[#58696b] hover:bg-[#efece6]'}`}
                  >
                    <ShieldCheck className="size-4" /> Gobernanza & Riesgo
                  </button>
                </div>
              </div>

              <div>
                <p className="mb-2 font-mono text-[9px] tracking-[0.2em] text-[#8e9d9b]">04. ECOSISTEMA</p>
                <div className="space-y-1">
                  <button
                    onClick={() => setActiveModule('quantum')}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-xs font-medium transition ${activeModule === 'quantum' ? 'bg-[#0b4f58] text-white' : 'text-[#58696b] hover:bg-[#efece6]'}`}
                  >
                    <Cpu className="size-4" /> Quantum Bridge
                  </button>
                  <button
                    onClick={() => setActiveModule('economy')}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-xs font-medium transition ${activeModule === 'economy' ? 'bg-[#0b4f58] text-white' : 'text-[#58696b] hover:bg-[#efece6]'}`}
                  >
                    <DollarSign className="size-4" /> Creator Economy
                  </button>
                </div>
              </div>
            </div>

            <div>
              <button
                onClick={() => setActiveModule('inventory')}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-xs font-medium transition ${activeModule === 'inventory' ? 'bg-[#0b6975] text-white' : 'text-[#0b6975] bg-[#0b6975]/10'}`}
              >
                <Layers className="size-4" /> Inventario Total
              </button>
            </div>
          </aside>

          {/* Center Main Work Area */}
          <main className="flex-1 overflow-y-auto p-6 lg:p-8">
            <header className="mb-6 border-b border-[#d7ddd9] pb-4">
              <p className="font-mono text-[10px] tracking-[0.2em] text-[#0b6975]">ISABELLA VILLASEÑOR &middot; ENTERPRISE WORKSPACE</p>
              <h1 className="font-serif text-2xl font-bold text-[#10222b] mt-0.5">
                {activeModule === 'overview' && 'Resumen del Ecosistema Soberano'}
                {activeModule === 'chat' && 'CROWN Gateway &middot; Agente Conversacional'}
                {activeModule === 'ledger' && 'BookPI &middot; Double-Entry Ledger Inspector'}
                {activeModule === 'cognitive' && 'ABX-01 &middot; Alpha/Beta Runtime'}
                {activeModule === 'memory' && 'Arquitectura de Memoria de 5 Capas'}
                {activeModule === 'quantum' && 'Quantum Bridge &middot; PennyLane / Qiskit'}
                {activeModule === 'economy' && 'Creator Economy &middot; Revenue Split Engine'}
                {activeModule === 'governance' && 'Gobernanza &middot; AI Risk Register'}
                {activeModule === 'inventory' && 'Inventario Total y Matriz de Estado'}
              </h1>
            </header>

            {activeModule === 'overview' && (
              <div className="space-y-6">
                <div className="grid gap-6 md:grid-cols-3">
                  <div className="rounded-2xl border border-[#d7ddd9] bg-[#fffdf8] p-6 shadow-sm">
                    <p className="font-mono text-[9px] tracking-widest text-[#8e9d9b]">NÚCLEO CROWN</p>
                    <h3 className="font-serif text-lg font-bold mt-2">24 Carriles Cognitivos</h3>
                    <p className="mt-2 text-xs text-[#58696b] leading-relaxed">
                      Orquestación ABX-01 con 12 cabezas adaptativas, ruteo inteligente y bucle de reparación automática.
                    </p>
                    <button
                      onClick={() => setActiveModule('cognitive')}
                      className="mt-4 font-mono text-xs text-[#0b6975] hover:underline"
                    >
                      Inspeccionar Carriles &rarr;
                    </button>
                  </div>

                  <div className="rounded-2xl border border-[#d7ddd9] bg-[#fffdf8] p-6 shadow-sm">
                    <p className="font-mono text-[9px] tracking-widest text-[#8e9d9b]">LIBRO DIARIO</p>
                    <h3 className="font-serif text-lg font-bold mt-2">BookPI Double-Entry</h3>
                    <p className="mt-2 text-xs text-[#58696b] leading-relaxed">
                      Verificación de transacciones mediante hash chaining, payloadHash y firmas post-cuánticas ML-DSA-65.
                    </p>
                    <button
                      onClick={() => setActiveModule('ledger')}
                      className="mt-4 font-mono text-xs text-[#0b6975] hover:underline"
                    >
                      Abrir LedgerInspector &rarr;
                    </button>
                  </div>

                  <div className="rounded-2xl border border-[#d7ddd9] bg-[#fffdf8] p-6 shadow-sm">
                    <p className="font-mono text-[9px] tracking-widest text-[#8e9d9b]">MEMORIA RAG</p>
                    <h3 className="font-serif text-lg font-bold mt-2">Grafo DIGYTAMV</h3>
                    <p className="mt-2 text-xs text-[#58696b] leading-relaxed">
                      Arquitectura de 5 capas con soporte para almacenamiento territorial, de sesión y de proyecto.
                    </p>
                    <button
                      onClick={() => setActiveModule('memory')}
                      className="mt-4 font-mono text-xs text-[#0b6975] hover:underline"
                    >
                      Ver Capas de Memoria &rarr;
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeModule === 'chat' && <ChatModule />}
            {activeModule === 'ledger' && <LedgerInspector />}
            {activeModule === 'cognitive' && <CognitiveABXModule />}
            {activeModule === 'memory' && <MemoryModule />}
            {activeModule === 'quantum' && <QuantumBridgeModule />}
            {activeModule === 'economy' && <EconomyModule />}
            {activeModule === 'governance' && <GovernanceModule />}
            {activeModule === 'inventory' && <InventoryMatrixModule />}
          </main>

          {/* Right Side Panel 1: Telemetry & CROWN Status */}
          <aside className="w-64 shrink-0 border-l border-[#d7ddd9] bg-[#fffdf8] p-4 hidden 2xl:flex flex-col justify-between select-none">
            <div className="space-y-6">
              <div>
                <p className="mb-3 font-mono text-[9px] tracking-[0.2em] text-[#8e9d9b]">TELEMETRÍA CROWN</p>
                <div className="space-y-3 font-mono text-xs">
                  <div className="rounded-xl border border-[#d7ddd9] bg-[#f5f3ee] p-3">
                    <span className="text-[#8e9d9b] block text-[9px]">LATENCIA GATEWAY</span>
                    <span className="font-bold text-[#10222b]">38 ms</span>
                  </div>
                  <div className="rounded-xl border border-[#d7ddd9] bg-[#f5f3ee] p-3">
                    <span className="text-[#8e9d9b] block text-[9px]">CARRIL ACTIVO</span>
                    <span className="font-bold text-[#0b6975]">ABX-01 / 24 Lanes</span>
                  </div>
                  <div className="rounded-xl border border-[#d7ddd9] bg-[#f5f3ee] p-3">
                    <span className="text-[#8e9d9b] block text-[9px]">ESTADO PQC</span>
                    <span className="font-bold text-[#53c6a0]">ML-KEM / ML-DSA</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-[#071426] p-4 text-[#f4f6f5]">
              <p className="font-mono text-[9px] tracking-widest text-[#62c4d2]">SEGURIDAD INSTITUCIONAL</p>
              <p className="mt-2 text-xs font-medium">RBAC / ABAC Activado</p>
            </div>
          </aside>

          {/* Right Side Panel 2: Agent Context Inspector */}
          <aside className="w-56 shrink-0 border-l border-[#d7ddd9] bg-[#f9f8f5] p-4 hidden 3xl:flex xl:flex flex-col justify-between select-none">
            <div className="space-y-4">
              <p className="font-mono text-[9px] tracking-[0.2em] text-[#8e9d9b]">CONTEXTO ACTIVO</p>
              <div className="rounded-xl border border-[#d7ddd9] bg-white p-3 font-mono text-[11px] space-y-2">
                <div>
                  <span className="text-[#8e9d9b] block text-[9px]">MODELO</span>
                  <span className="text-[#10222b]">gemini-3.7-flash</span>
                </div>
                <div>
                  <span className="text-[#8e9d9b] block text-[9px]">TOKENS RAG</span>
                  <span className="text-[#10222b]">4,210 tokens</span>
                </div>
                <div>
                  <span className="text-[#8e9d9b] block text-[9px]">HASH DE SESIÓN</span>
                  <span className="text-[#0b6975] truncate block">0x8f9c...2a3e</span>
                </div>
              </div>
            </div>

            <div className="font-mono text-[9px] text-[#8e9d9b]">
              Real del Monte, Hidalgo &middot; MX
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
