'use client';

import { useEffect, useRef, useState } from 'react';
import { localAnswer } from '@/lib/assistant';

interface Msg { role: 'user' | 'assistant'; content: string }

const SUGGESTIONS = ['Who is Bishwas?', 'What are his top skills?', 'Show me his projects', 'Does he practise LeetCode or Kaggle?', 'How can I contact him?'];
const GREETING: Msg = { role: 'assistant', content: "Hi! I'm the lab assistant. Ask me anything about Bishwas, his work, skills or certificates." };

export function AiChat() {
  const [msgs, setMsgs] = useState<Msg[]>([GREETING]);
  const [text, setText] = useState('');
  const [busy, setBusy] = useState(false);
  const [live, setLive] = useState<boolean | null>(null);
  const box = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    box.current?.scrollTo({ top: box.current.scrollHeight });
  }, [msgs]);
  useEffect(() => {
    if (!window.matchMedia('(hover: none)').matches) input.current?.focus();
  }, []);

  async function ask(raw: string) {
    const q = raw.trim();
    if (!q || busy) return;
    setText('');
    const next: Msg[] = [...msgs, { role: 'user', content: q }];
    setMsgs([...next, { role: 'assistant', content: 'Thinking…' }]);
    setBusy(true);
    let answer = '';
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ messages: next.filter((m) => m !== GREETING) }),
      });
      if (res.ok) {
        const data = (await res.json()) as { text?: string };
        if (data.text) { answer = data.text; setLive(true); } else setLive(false);
      }
    } catch { /* fall back below */ }
    if (!answer) {
      await new Promise((r) => setTimeout(r, 350));
      answer = localAnswer(q);
    }
    setMsgs([...next, { role: 'assistant', content: answer }]);
    setBusy(false);
  }

  return (
    <div className="chat">
      <div className="note" style={{ margin: '0 0 8px' }}>
        {live ? 'Answers come from Claude, using only the facts on this site.' : 'Answers come from the portfolio facts.'}
      </div>
      <div className="msgs" ref={box} role="log" aria-live="polite">
        {msgs.map((m, i) => <div key={i} className={`m ${m.role === 'user' ? 'u' : 'b'}`}>{m.content}</div>)}
      </div>
      <div className="sug">
        {SUGGESTIONS.map((s) => <button key={s} onClick={() => ask(s)}>{s}</button>)}
      </div>
      <form className="cin" onSubmit={(e) => { e.preventDefault(); ask(text); }}>
        <input ref={input} value={text} onChange={(e) => setText(e.target.value)} autoComplete="off" aria-label="Ask a question" placeholder="Ask anything about me…" maxLength={300} />
        <button className="btn" type="submit" disabled={busy}>Send</button>
      </form>
    </div>
  );
}
