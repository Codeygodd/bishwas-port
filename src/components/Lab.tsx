'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { profile as P } from '@/data/profile';
import { STATIONS } from '@/data/stations';
import { MENU_ORDER, PANEL_META, type PanelId } from '@/lib/types';
import { createLab, type HoverTip, type Lab as LabApi, type LabContent } from '@/three/lab';
import { PanelBody, type PanelCtx } from './panels';

const CONTENT: LabContent = {
  name: P.name,
  role: P.role,
  ideas: P.ideas.map((i) => ({ title: i.short, stage: i.stage })),
  posts: P.blog.map((b) => ({ title: b.title, date: b.tag })),
  blocks: [
    ['R', '#2d9cdb'], ['N', '#222a33'], ['JS', '#d9b400'],
    ['PY', '#3776ab'], ['SQL', '#d33a8a'], ['ML', '#35a85a'],
  ],
  screen: [
    { q: 'Who is Bishwas?', a: 'A full-stack software engineer from Kathmandu who builds with React, Node.js and Python.' },
    { q: 'What are his top skills?', a: 'React, Node.js, Python, SQL, REST APIs, data analytics and ML fundamentals.' },
    { q: 'Show me his projects', a: 'Full-stack web apps and a Python + SQL data pipeline. Click the big book on the shelf.' },
    { q: 'Does he practise coding?', a: 'Yes. He solves LeetCode problems and Kaggle competitions regularly.' },
  ],
};

interface Open { id: PanelId; arg: number }

export default function Lab() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const labRef = useRef<LabApi | null>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const toastTimer = useRef<number>(0);
  const lastFocus = useRef<HTMLElement | null>(null);

  const [panel, setPanel] = useState<Open | null>(null);
  const [menu, setMenu] = useState(false);
  const [card, setCard] = useState(0);
  const [station, setStation] = useState<string>(STATIONS[0].name);
  const [lightsOn, setLightsOn] = useState(true);
  const [tip, setTip] = useState<HoverTip | null>(null);
  const [toast, setToastText] = useState('');
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [small, setSmall] = useState(false);

  const showToast = useCallback((m: string, ms = 2600) => {
    setToastText(m);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToastText(''), ms);
  }, []);

  const open = useCallback((id: PanelId, arg: number = id === 'blog' ? -1 : 0) => {
    lastFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setPanel({ id, arg });
    setMenu(false);
    if (id === 'contact' && !window.matchMedia('(max-width: 700px)').matches) labRef.current?.goToStation(5);
  }, []);

  const close = useCallback(() => {
    setPanel(null);
    lastFocus.current?.focus?.();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const lab = createLab(canvas, CONTENT, {
      onOpen: (id, arg) => open(id, arg),
      onCard: setCard,
      onStationName: setStation,
      onHover: setTip,
      onLights: setLightsOn,
      onReady: () => setReady(true),
      onFail: () => { setFailed(true); setReady(true); },
      onRecover: () => setFailed(false),
    });
    labRef.current = lab;
    return () => { lab?.dispose(); labRef.current = null; };
  }, [open]);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 700px)');
    const f = () => setSmall(mq.matches);
    f();
    mq.addEventListener('change', f);
    return () => mq.removeEventListener('change', f);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setMenu(false); close(); } };
    addEventListener('keydown', onKey);
    return () => removeEventListener('keydown', onKey);
  }, [close]);

  useEffect(() => {
    document.body.classList.toggle('po', !!panel);
    labRef.current?.setCovered(!!panel);
    if (panel) { bodyRef.current?.scrollTo({ top: 0 }); closeRef.current?.focus({ preventScroll: true }); }
  }, [panel]);

  const ctx: PanelCtx = { open, toast: showToast, flyBird: () => labRef.current?.flyBird(), close, isSmall: small };
  const meta = panel ? PANEL_META[panel.id] : null;

  return (
    <>
      <canvas id="c" ref={canvasRef} aria-label="Interactive 3D AI lab room" role="img" />
      {!ready && <div id="loader" role="status">POWERING UP THE LAB…</div>}
      {failed && (
        <div id="nogl" className="glass" role="alert">
          The 3D room can&apos;t run on this device, but everything is still here:
          <div className="nogl-actions">
            <button className="btn" onClick={() => open('ai')}>Ask my AI</button>
            <button className="btn g" onClick={() => open('about')}>About me</button>
            <button className="btn g" onClick={() => open('contact')}>Contact</button>
            <a className="btn g" href="/classic">Text version</a>
          </div>
        </div>
      )}

      <div
        id="tip"
        className={'glass' + (tip ? ' on' : '')}
        aria-hidden="true"
        style={tip ? { left: Math.max(8, Math.min(innerWidth - 260, tip.x + 16)), top: Math.min(innerHeight - 90, tip.y + 18) } : undefined}
      >
        <small>{tip?.kind}</small><b>{tip?.title}</b><span>{tip?.hint}</span>
      </div>
      <div id="toast" className={'glass' + (toast ? ' on' : '')} role="status" aria-live="polite">{toast}</div>

      <header className="hud">
        <div className="brand">BISHWAS PANDEY<span className="bsub"> · THE AI LAB</span></div>
        <div className="r">
          <button className="pill glass" id="mbtn" aria-expanded={menu} aria-controls="menu" onClick={() => setMenu((m) => !m)}>☰ Explore</button>
          <button className="pill glass" id="mood" aria-label={lightsOn ? 'Turn the lab lights off' : 'Turn the lab lights on'} onClick={() => labRef.current?.toggleLights()}>
            <span aria-hidden="true">💡</span><span className="tx"> {lightsOn ? 'Lights off' : 'Lights on'}</span>
          </button>
        </div>
      </header>

      <nav id="menu" className={'glass' + (menu ? ' open' : '')} aria-label="Sections">
        {MENU_ORDER.map((k) => (
          <button key={k} onClick={() => open(k)}>{PANEL_META[k].icon}  {PANEL_META[k].title}</button>
        ))}
        <a href={P.cvFile} download style={{ textDecoration: 'none' }}><button style={{ width: '100%' }}>⬇  Download CV (PDF)</button></a>
      </nav>

      <div className="alt" aria-hidden="true">STATION<b>{station}</b><span>{P.location}</span></div>

      <div id="cards">
        {STATIONS.map((s, i) => (
          <section key={s.name} className={'card glass' + (i === card ? ' on' : '')} aria-hidden={i !== card}>
            <small>{s.kicker}</small>
            {s.hero ? <h1>{s.heading}</h1> : <h2>{s.heading}</h2>}
            <p>{s.text}</p>
            {s.hero && (
              <>
                <div className="hint">↓ Scroll · move the mouse to look around · click objects · use the switch or the Lights button</div>
                <div className="hint mh">↓ Swipe up to explore · tap objects · 💡 toggles the lights</div>
              </>
            )}
            {s.buttons?.map(([id, label], j) => (
              <button key={id} className={'btn' + (j ? ' g' : '')} tabIndex={i === card ? 0 : -1} onClick={() => open(id)}>{label}</button>
            ))}
          </section>
        ))}
      </div>

      <div id="spacer" aria-hidden="true" />
      <div id="scrim" className={panel ? 'on' : ''} onClick={close} />
      <aside id="panel" className={panel ? 'open' : ''} role="dialog" aria-modal="false" aria-label={meta?.title ?? 'Details'} aria-hidden={!panel}>
        <div className="grab" />
        <div className="ph">
          {panel && panel.id !== 'blog' && panel.id !== 'ideas' && <div className="pi" aria-hidden="true">{meta?.icon}</div>}
          <div><b>{meta?.title}</b><small>{meta?.sub}</small></div>
          <button ref={closeRef} className="px" onClick={close} aria-label="Close">✕</button>
        </div>
        <div id="pb" ref={bodyRef}>
          {panel && <PanelBody key={`${panel.id}:${panel.arg}`} id={panel.id} arg={panel.arg} ctx={ctx} />}
        </div>
      </aside>
    </>
  );
}
