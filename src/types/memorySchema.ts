/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type MemoryLayerType = 'session' | 'project' | 'territorial' | 'historical' | 'digytamv';

export interface MemoryNode {
  id: string;
  layer: MemoryLayerType;
  title: string;
  content: string;
  tags: string[];
  provenanceCID: string;
  timestamp: string;
  confidence: number;
  metadata?: Record<string, any>;
}

export interface KnowledgeGraphEdge {
  id: string;
  sourceNodeId: string;
  targetNodeId: string;
  relationType: 'SUPPORTS' | 'CONTRADICTS' | 'DERIVED_FROM' | 'GEOSPATIAL_NEAR' | 'CAUSES';
  weight: number;
}

export interface MemoryArchitectureSchema {
  version: string;
  layers: {
    session: { retentionTtlSeconds: number; maxNodes: number };
    project: { persistenceMode: 'postgres' | 'supabase'; encrypted: boolean };
    territorial: { jurisdiction: string; coordinateBoundaries: [number, number, number, number] };
    historical: { immutableStore: boolean; pkiSigned: boolean };
    digytamv: { graphModel: string; vertexCount: number; edgeCount: number };
  };
  nodes: MemoryNode[];
  edges: KnowledgeGraphEdge[];
}

export const initialMemorySchema: MemoryArchitectureSchema = {
  version: '1.0.0',
  layers: {
    session: { retentionTtlSeconds: 86400, maxNodes: 1000 },
    project: { persistenceMode: 'postgres', encrypted: true },
    territorial: { jurisdiction: 'Real del Monte, Hidalgo, MX', coordinateBoundaries: [20.138, -98.673, 20.150, -98.660] },
    historical: { immutableStore: true, pkiSigned: true },
    digytamv: { graphModel: 'DIGYTAMV-HYBRID-GRAPH', vertexCount: 54120, edgeCount: 128900 }
  },
  nodes: [
    {
      id: 'node-01',
      layer: 'territorial',
      title: 'Mina de Acosta - Registro Histórico',
      content: 'Registro geológico y minero de Real del Monte asociado al desarrollo soberano.',
      tags: ['minería', 'hidalgo', 'historia'],
      provenanceCID: 'bafybeigdyrzt5sfp7udm7hu76uh7y75g3d7m3s7',
      timestamp: new Date().toISOString(),
      confidence: 0.99
    },
    {
      id: 'node-02',
      layer: 'project',
      title: 'CROWN Protocol Specifications',
      content: 'Arquitectura classical-first y control de gobernanza estricta V1.',
      tags: ['crown', 'governance', 'architecture'],
      provenanceCID: 'bafybeig0q1w2e3r4t5y6u7i8o9p0asdfghjkl',
      timestamp: new Date().toISOString(),
      confidence: 1.0
    }
  ],
  edges: [
    {
      id: 'edge-01',
      sourceNodeId: 'node-01',
      targetNodeId: 'node-02',
      relationType: 'SUPPORTS',
      weight: 0.95
    }
  ]
};
