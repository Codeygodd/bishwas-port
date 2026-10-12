import { NextResponse } from 'next/server';
import { profile as P } from '@/data/profile';
import { systemPrompt } from '@/lib/assistant';
import { limited } from '@/lib/rateLimit';
import { clientIp, readJson, sameOrigin } from '@/lib/security';

export const runtime = 'nodejs';

interface Turn { role: 'user' | 'assistant'; content: string }

const fail = (error: string, status: number) => NextResponse.json({ error }, { status });

export async function POST(req: Request) {
  const key = process.env.ANTHROPIC_API_KEY;
  // No key configured: tell the page to use the built-in answer engine (a normal response, not an error).
  if (!key) return NextResponse.json({ mode: 'local' });

  // Only this website may call the endpoint (blocks other sites from spending your API credit).
  if (!sameOrigin(req, P.siteUrl)) return fail('forbidden', 403);
  if (!(req.headers.get('content-type') ?? '').includes('application/json')) return fail('bad_request', 415);

  // Per-visitor and site-wide budgets.
  const ip = clientIp(req);
  if (limited(`chat:${ip}`, 12, 60_000) || limited(`chat-h:${ip}`, 60, 3_600_000)) return fail('rate_limited', 429);
  if (limited('chat:global', 400, 3_600_000)) return fail('busy', 429);

  let body: unknown;
  try { body = await readJson(req); } catch { return fail('bad_request', 400); }
  const raw = (body as { messages?: unknown } | null)?.messages;
  if (!Array.isArray(raw) || raw.length === 0) return fail('bad_request', 400);

  const messages: Turn[] = raw
    .slice(-8)
    .filter((m): m is Turn => !!m && typeof m === 'object' && ((m as Turn).role === 'user' || (m as Turn).role === 'assistant') && typeof (m as Turn).content === 'string')
    .map((m) => ({ role: m.role, content: m.content.slice(0, 400) }));
  if (!messages.length || messages[messages.length - 1].role !== 'user') return fail('bad_request', 400);

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'x-api-key': key, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
      body: JSON.stringify({
        model: process.env.ANTHROPIC_MODEL || 'claude-haiku-5-5',
        max_tokens: 400,
        system: systemPrompt(),
        messages,
      }),
      signal: AbortSignal.timeout(20_000),
    });
    if (!res.ok) return fail('upstream', 502);
    const data = (await res.json()) as { content?: { type: string; text?: string }[] };
    const text = data.content?.filter((c) => c.type === 'text').map((c) => c.text ?? '').join('').trim();
    if (!text) return fail('empty', 502);
    return NextResponse.json({ text: text.slice(0, 1500) });
  } catch {
    return fail('upstream', 502);
  }
}

// Anything but POST is not supported.
export const GET = () => fail('method_not_allowed', 405);
