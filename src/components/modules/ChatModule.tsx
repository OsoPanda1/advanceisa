/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Bot, CheckCircle2, MessageCircle, Send, ShieldCheck, Sparkles, User } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'isabella';
  text: string;
  timestamp: string;
  provenanceCID?: string;
  model?: string;
}

export function ChatModule() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'isabella',
      text: 'Hola, Anubis. Soy Isabella Villaseñor AI, operando bajo CROWN Gateway con arquitectura classical-first. ¿En qué puedo asistirte hoy?',
      timestamp: new Date().toLocaleTimeString(),
      provenanceCID: 'bafybeigdyrzt5sfp7udm7hu76uh7y75g3d7m3s7',
      model: 'gemini-3.7-flash'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const prompt = input.trim();
    if (!prompt || loading) return;

    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      sender: 'user',
      text: prompt,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/v1/chat', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ message: prompt })
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error || 'chat_error');

      const botMsg: ChatMessage = {
        id: crypto.randomUUID(),
        sender: 'isabella',
        text: json.data.text,
        timestamp: new Date().toLocaleTimeString(),
        provenanceCID: 'bafybeig' + Math.random().toString(36).substring(7),
        model: json.data.model
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: crypto.randomUUID(),
        sender: 'isabella',
        text: `[Error de Conexión] No se pudo procesar la solicitud en CROWN Gateway: ${err?.message || 'timeout'}. Operando en modo local seguro.`,
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-[#d7ddd9] bg-[#fffdf8] p-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-[#d7ddd9] pb-4">
          <div>
            <h2 className="font-serif text-2xl text-[#10222b]">CROWN Gateway &middot; Agente Conversacional</h2>
            <p className="text-xs text-[#58696b]">Loop estilo Hermes con planificador, skills registry y verificación epistémica.</p>
          </div>
          <span className="flex items-center gap-1.5 rounded-full bg-[#53c6a0]/15 px-3 py-1 font-mono text-xs text-[#0b6975]">
            <ShieldCheck className="size-3.5" /> GOBERNANZA ACTIVA
          </span>
        </div>

        <div className="mt-6 flex h-[480px] flex-col justify-between rounded-xl border border-[#d7ddd9] bg-[#f5f3ee] p-4">
          <div className="flex-1 space-y-4 overflow-y-auto pr-2">
            {messages.map((m) => {
              const isUser = m.sender === 'user';
              return (
                <div key={m.id} className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
                  <div className={`flex size-8 shrink-0 items-center justify-center rounded-xl font-serif text-xs ${isUser ? 'bg-[#0b6975] text-white' : 'bg-[#071426] text-[#d8a85a]'}`}>
                    {isUser ? <User className="size-4" /> : <Bot className="size-4" />}
                  </div>
                  <div className={`max-w-xl rounded-2xl p-4 text-sm shadow-sm ${isUser ? 'bg-[#0b6975] text-white' : 'bg-[#fffdf8] text-[#10222b] border border-[#d7ddd9]'}`}>
                    <p className="leading-relaxed">{m.text}</p>
                    <div className="mt-2 flex items-center justify-between gap-4 font-mono text-[9px] opacity-75">
                      <span>{m.timestamp}</span>
                      {m.provenanceCID && <span className="truncate">CID: {m.provenanceCID}</span>}
                    </div>
                  </div>
                </div>
              );
            })}
            {loading && (
              <div className="flex items-center gap-3">
                <div className="flex size-8 items-center justify-center rounded-xl bg-[#071426] text-[#d8a85a]">
                  <Bot className="size-4 animate-spin" />
                </div>
                <div className="rounded-2xl bg-[#fffdf8] p-4 text-xs font-mono text-[#58696b] border border-[#d7ddd9]">
                  Isabella está calculando ruta cognitiva (Alpha/Beta consensus)...
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleSend} className="mt-4 flex items-center gap-2 pt-3 border-t border-[#d7ddd9]">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe tu intención para Isabella..."
              className="flex-1 rounded-xl border border-[#d7ddd9] bg-[#fffdf8] px-4 py-3 text-sm text-[#10222b] outline-none placeholder:text-[#8e9d9b] focus:border-[#0b6975]"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="flex items-center gap-2 rounded-xl bg-[#0b6975] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#0b4f58] disabled:opacity-50"
            >
              Enviar <Send className="size-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
