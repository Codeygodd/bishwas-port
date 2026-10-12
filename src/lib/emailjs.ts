import emailjs from '@emailjs/browser';

/**
 * EmailJS delivers the contact form straight to Bishwas's inbox from the browser.
 * The service id, template id and public key are *meant* to be public (they are not secrets);
 * lock them down in the EmailJS dashboard by restricting "Allowed domains" to your site.
 * Override them with NEXT_PUBLIC_EMAILJS_* env vars on Vercel if you ever rotate them.
 */
const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_9nomxlj';
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_vmlr5ax';
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'gdIlR-_DI6I4_Be6u';

export interface ContactPayload { name: string; email: string; message: string }

const COOLDOWN_MS = 30_000;
const HOURLY_MAX = 5;
const KEY = 'bp:contact:log';

function readLog(): number[] {
  try {
    const raw: unknown = JSON.parse(window.localStorage.getItem(KEY) ?? '[]');
    return Array.isArray(raw) ? raw.filter((n): n is number => typeof n === 'number') : [];
  } catch { return []; }
}

/** Client-side spam guard (the real protection is EmailJS' own limits + allowed-domain list). */
export function checkCooldown(): string | null {
  const now = Date.now();
  const log = readLog().filter((t) => now - t < 3_600_000);
  if (log.length && now - log[log.length - 1] < COOLDOWN_MS) return 'Please wait a few seconds before sending another message.';
  if (log.length >= HOURLY_MAX) return 'You have sent several messages already. Please try again later or email me directly.';
  return null;
}

function remember(): void {
  try {
    const now = Date.now();
    const log = readLog().filter((t) => now - t < 3_600_000);
    log.push(now);
    window.localStorage.setItem(KEY, JSON.stringify(log));
  } catch { /* storage may be blocked; ignore */ }
}

export async function sendContact(d: ContactPayload): Promise<void> {
  await emailjs.send(
    SERVICE_ID,
    TEMPLATE_ID,
    {
      name: d.name,
      email: d.email,
      message: d.message,
      from_name: d.name,
      from_email: d.email,
      reply_to: d.email,
      time: new Date().toLocaleString('en-GB', { timeZone: 'Asia/Kathmandu' }) + ' (Kathmandu)',
    },
    PUBLIC_KEY,
  );
  remember();
}
