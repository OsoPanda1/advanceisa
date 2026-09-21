/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ModuleId =
  | 'overview'
  | 'chat'
  | 'ledger'
  | 'cognitive'
  | 'memory'
  | 'quantum'
  | 'economy'
  | 'governance'
  | 'inventory'
  | 'investigation'
  | 'creation'
  | 'actions'
  | 'trust'
  | 'observability';

export type FunctionState =
  | 'implemented'
  | 'verified'
  | 'experimental'
  | 'simulated'
  | 'shadow'
  | 'planned'
  | 'unavailable';

export interface FunctionInventoryItem {
  id: string;
  name: string;
  purpose: string;
  file: string;
  interfaceName: string;
  currentState: FunctionState;
  risk: 'low' | 'medium' | 'high' | 'critical';
  input: string;
  output: string;
  persistence: string;
  authorization: string;
  latencyMs: number;
  testsPassing: boolean;
  featureFlag: string;
  fallback: string;
  rollback: string;
}

export interface LedgerEntry {
  id: string;
  timestamp: string;
  payloadHash: string;
  eventHash: string;
  cid: string;
  powNonce: number;
  signature: string;
  pqcAlgorithm: 'ML-KEM-768' | 'ML-DSA-65' | 'HYBRID-ED25519';
  debitAccount: string;
  creditAccount: string;
  amount: number;
  currency: string;
  status: 'verified' | 'pending' | 'audited';
}

export interface CognitiveLane {
  id: string;
  name: string;
  head: string;
  status: 'active' | 'idle' | 'repair' | 'shadow';
  alphaScore: number;
  betaScore: number;
  consensusRatio: number;
}

export interface MemoryLayerItem {
  layerId: number;
  title: string;
  type: 'session' | 'project' | 'territorial' | 'historical' | 'digytamv';
  recordsCount: number;
  provenanceCID: string;
  lastSynced: string;
}

export interface CreatorEconomyItem {
  id: string;
  creatorName: string;
  projectTitle: string;
  revenueTotal: number;
  splitModel: '20/30/50' | '50/35/10/5';
  badgesCount: number;
  status: 'active' | 'payout_ready';
}
