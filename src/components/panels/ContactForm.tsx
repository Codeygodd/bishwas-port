'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { profile as P } from '@/data/profile';
import { checkCooldown, sendContact } from '@/lib/emailjs';
import type { PanelCtx } from './index';

const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const strip = (s: string) => s.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '');

export function ContactForm({ ctx }: { ctx: PanelCtx }) {
  const [state, setState] = useState<'form' | 'sending' | 'sent'>('form');
  const [error, setError] = useState('');
  const [sentName, setSentName] = useState('');
  const timers = useRef<number[]>([]);
  // timers belong to this form: if the visitor opens another panel, they must not close it
  useEffect(() => () => { timers.current.forEach((t) => window.clearTimeout(t)); }, []);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = strip(String(fd.get('name') ?? '')).trim().slice(0, 120);
    const email = String(fd.get('email') ?? '').trim().slice(0, 200);
    const message = strip(String(fd.get('message') ?? '')).trim().slice(0, 4000);
    const website = String(fd.get('website') ?? '');

    // honeypot: real people never see this field, bots fill it
    if (website.trim()) { setState('sent'); setSentName(name || 'friend'); return; }

    if (!name) return setError('Please add your name.');
    if (!EMAIL.test(email)) return setError('That email does not look right.');
    if (message.length < 5) return setError('Please write a short message.');
    const wait = checkCooldown();
    if (wait) return setError(wait);

    setError('');
    setState('sending');
    try {
      await sendContact({ name, email, message });
      setSentName(name);
      setState('sent');
      ctx.flyBird();
      ctx.toast('🐦 Delivering your message…', 2800);
      timers.current.push(window.setTimeout(() => ctx.toast('✅ Delivered. Thank you!', 2400), 3000));
      if (ctx.isSmall) timers.current.push(window.setTimeout(ctx.close, 1600));
    } catch {
      setState('form');
      setError(`Something went wrong. Please try again, or email me at ${P.contact.email}.`);
    }
  }

  if (state === 'sent') {
    return (
      <div className="ok">
        <div className="big">🐦</div>
        <h3>Message on its way!</h3>
        <p>Thanks, {sentName}. The bird is delivering it now and I&apos;ll reply to your email.</p>
        <button className="btn g" onClick={() => setState('form')}>Send another</button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate>
      <label className="fld">Name<input name="name" autoComplete="name" placeholder="Your name" maxLength={120} required /></label>
      <label className="fld">Email<input name="email" type="email" inputMode="email" autoComplete="email" placeholder="you@example.com" maxLength={200} required /></label>
      <label className="fld">Message<textarea name="message" rows={5} placeholder="What would you like to talk about?" maxLength={4000} required /></label>
      <input className="hp" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <div className="err" role="alert">{error}</div>
      <button className="btn" type="submit" disabled={state === 'sending'}>{state === 'sending' ? 'Sending…' : '✈ Send message'}</button>
    </form>
  );
}
