/** Small helpers shared by the API routes. */

export function clientIp(req: Request): string {
  const fwd = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  return (fwd || req.headers.get('x-real-ip') || 'anon').slice(0, 64);
}

/**
 * Browsers always send an Origin header on cross-site POSTs. Only accept requests from this
 * site (its configured URL, the current host, or localhost in development).
 */
export function sameOrigin(req: Request, siteUrl: string): boolean {
  const origin = req.headers.get('origin');
  if (!origin) return false;
  let host: string;
  try { host = new URL(origin).host; } catch { return false; }
  const allowed = new Set<string>();
  try { allowed.add(new URL(siteUrl).host); } catch { /* ignore */ }
  const own = req.headers.get('host');
  if (own) allowed.add(own);
  if (process.env.VERCEL_URL) allowed.add(process.env.VERCEL_URL);
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) allowed.add(process.env.VERCEL_PROJECT_PRODUCTION_URL);
  return allowed.has(host);
}

/** Reads a JSON body but refuses anything larger than `max` bytes. */
export async function readJson(req: Request, max = 8_000): Promise<unknown> {
  const len = Number(req.headers.get('content-length') ?? 0);
  if (len > max) throw new Error('too_large');
  const text = await req.text();
  if (text.length > max) throw new Error('too_large');
  return JSON.parse(text);
}
