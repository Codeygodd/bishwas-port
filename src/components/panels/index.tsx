'use client';

import { useEffect, useRef, useState } from 'react';
import { profile as P } from '@/data/profile';
import type { PanelId } from '@/lib/types';
import { npt, pad } from '@/lib/time';
import { AiChat } from './AiChat';
import { ContactForm } from './ContactForm';

export interface PanelCtx {
  open: (id: PanelId, arg?: number) => void;
  toast: (message: string, ms?: number) => void;
  flyBird: () => void;
  close: () => void;
  isSmall: boolean;
}

const Chips = ({ items }: { items: string[] }) => (
  <div className="chips">{items.map((x) => <span className="chip" key={x}>{x}</span>)}</div>
);

function Socials() {
  return (
    <div className="links">
      {P.socials.map((s) => (
        <a key={s.id} className="btn g" href={s.url} target="_blank" rel="noopener noreferrer">{s.label} ↗</a>
      ))}
    </div>
  );
}

function About({ ctx }: { ctx: PanelCtx }) {
  return (
    <>
      <div className="feat">
        <h3>{P.name}</h3>
        <div className="chip" style={{ display: 'inline-block' }}>{P.role}</div>
        <p><b>{P.intro.lead}</b></p>
        <ul className="pts">
          {P.intro.focus.map((f) => <li key={f.label}><b>{f.label}</b>: {f.text}</li>)}
        </ul>
        <p>{P.intro.closing}</p>
        <p>🎯 {P.seeking}</p>
        <p><i>&ldquo;{P.intro.motto}&rdquo;</i></p>
        {P.facts.map((f) => <div key={f.text} style={{ margin: '4px 0' }}>{f.icon} {f.text}</div>)}
      </div>
      <div className="stat">
        <div><b>2+</b><span>years building</span></div>
        <div><b>{P.certificates.length}</b><span>certifications</span></div>
        <div><b>100+</b><span>students reached</span></div>
      </div>
      <h4>Top skills</h4>
      <Chips items={P.topSkills} />
      <h4>Practice</h4>
      <p>{P.practice.text}</p>
      <Socials />
      <button className="btn" onClick={() => ctx.open('ai')}>🤖 Ask my AI</button>
      <button className="btn g" onClick={() => ctx.open('cv')}>📄 View CV</button>
      <button className="btn g" onClick={() => ctx.open('contact')}>✉️ Contact</button>
    </>
  );
}

function Skills() {
  return (
    <>
      <p>Each alphabet block on the shelf stands for one of these skills.</p>
      {P.skillGroups.map((g) => (
        <div className="grp" key={g.title}>
          <h4>{g.title}</h4>
          <Chips items={g.items} />
        </div>
      ))}
      <div className="feat" style={{ marginTop: 14 }}>
        <b>🧠 {P.practice.title}</b>
        <p>{P.practice.text}</p>
        <div className="links">
          {P.socials.filter((x) => ['github', 'kaggle', 'leetcode', 'huggingface'].includes(x.id)).map((x) => (
            <a key={x.id} className="btn g" href={x.url} target="_blank" rel="noopener noreferrer">{x.label} ↗</a>
          ))}
        </div>
      </div>
    </>
  );
}

function Projects({ arg, ctx }: { arg: number; ctx: PanelCtx }) {
  const i = Math.min(Math.max(arg, 0), P.projects.length - 1);
  const p = P.projects[i];
  return (
    <>
      <div className="feat">
        <h3>{p.title}</h3>
        {p.period && <small style={{ color: 'var(--muted)' }}>{p.period}</small>}
        <p>{p.summary}</p>
        <ul className="pts">{p.points.map((x) => <li key={x}>{x}</li>)}</ul>
        <Chips items={p.tech} />
        {(p.live || p.repo) && (
          <div className="links">
            {p.live && <a className="btn g" href={p.live} target="_blank" rel="noopener noreferrer">Live demo ↗</a>}
            {p.repo && <a className="btn g" href={p.repo} target="_blank" rel="noopener noreferrer">Source ↗</a>}
          </div>
        )}
      </div>
      <h4>All projects</h4>
      <div className="list">
        {P.projects.map((q, j) => (
          <button key={q.title} className={`li${j === i ? ' on' : ''}`} onClick={() => ctx.open('projects', j)}>{q.title}</button>
        ))}
      </div>
      <p className="hint2" style={{ marginTop: 12 }}>
        More work lives on <a href={P.contact.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a>, <a href={P.contact.kaggle} target="_blank" rel="noopener noreferrer">Kaggle ↗</a> and <a href={P.contact.huggingface} target="_blank" rel="noopener noreferrer">Hugging Face ↗</a>.
      </p>
    </>
  );
}

function Certs() {
  return (
    <>
      <p>The trophy holds my {P.certificates.length} certifications and my achievements.</p>
      <h4>Achievements</h4>
      {P.achievements.map((x) => (
        <div className="cert" key={x.title}>
          <div className="ic">🥇</div>
          <div><b>{x.title}</b><br /><small>{x.org} · {x.date}</small></div>
        </div>
      ))}
      <h4>Certifications ({P.certificates.length})</h4>
      {P.certificates.map((c) => (
        <div className="cert" key={c.title + c.issuer}>
          <div className="ic">🏅</div>
          <div>
            <b>{c.title}</b><br />
            <small>{c.issuer} · Issued {c.date}</small>
            {c.credentialId && <><br /><small>Credential ID {c.credentialId}</small></>}
            {c.desc && <p className="cd">{c.desc}</p>}
            {c.skills && <div className="chips">{c.skills.map((k) => <span className="chip" key={k}>{k}</span>)}</div>}
            {c.link && <a href={c.link} target="_blank" rel="noopener noreferrer"><small>Verify ↗</small></a>}
          </div>
        </div>
      ))}
    </>
  );
}

function Experience() {
  return (
    <>
      <h4>Experience</h4>
      <div className="tl">
        {P.experience.map((e) => (
          <div key={e.role + e.period}>
            <b>{e.role}</b> · {e.org}<br />
            <small>{e.period} · {e.place}</small>
            <ul className="pts">{e.points.map((x) => <li key={x}>{x}</li>)}</ul>
          </div>
        ))}
      </div>
      <h4>Education</h4>
      <div className="tl">
        {P.education.map((e) => (
          <div key={e.school}>
            <b>{e.degree}</b><br />
            {e.school}<br />
            <small>{e.period} · {e.place}</small>
          </div>
        ))}
      </div>
    </>
  );
}

function Blog({ arg }: { arg: number }) {
  const n = P.blog.length;
  const [sel, setSel] = useState(arg >= 0 && arg < n ? arg : -1);
  const [openSec, setOpenSec] = useState(0);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) { first.current = false; return; }
    document.getElementById('pb')?.scrollTo({ top: 0 });
  }, [sel]);

  const go = (j: number) => { setSel(j); setOpenSec(0); };

  if (sel < 0) {
    return (
      <>
        <p className="lead">Short, plain-English notes. Tap one to read it.</p>
        <div className="posts">
          {P.blog.map((b, j) => (
            <button key={b.title} className="pc" onClick={() => go(j)}>
              <span className="pc-tx">
                <span className="tag">{b.tag}</span>
                <b>{b.title}</b>
                <span className="pc-s">{b.summary}</span>
                <small>{b.read}</small>
              </span>
              <span className="pc-go" aria-hidden="true">›</span>
            </button>
          ))}
        </div>
        <p className="hint2">Each post is also pinned as a note on the blog board.</p>
      </>
    );
  }

  const b = P.blog[sel];
  return (
    <article className="rd" key={sel}>
      <button className="back" onClick={() => setSel(-1)}>← All posts</button>
      <div className="rd-h">
        <span className="tag">{b.tag}</span>
        <h3>{b.title}</h3>
        <small>{b.read} · {b.date}</small>
      </div>
      <div className="callout"><span>In short</span>{b.tldr}</div>
      <div className="acc">
        {b.sections.map((sec, j) => {
          const on = openSec === j;
          return (
            <div className={`ac${on ? ' on' : ''}`} key={sec.h}>
              <button aria-expanded={on} onClick={() => setOpenSec(on ? -1 : j)}>
                <span>{sec.h}</span><i aria-hidden="true">{on ? '−' : '+'}</i>
              </button>
              {on && <p>{sec.p}</p>}
            </div>
          );
        })}
      </div>
      <div className="callout take"><span>Takeaway</span>{b.takeaway}</div>
      <div className="pn">
        <button className="btn g" disabled={sel === 0} onClick={() => go(sel - 1)}>← Previous</button>
        <span>{sel + 1} / {n}</span>
        <button className="btn g" disabled={sel === n - 1} onClick={() => go(sel + 1)}>Next →</button>
      </div>
    </article>
  );
}

const IDEA_MS = 5600;
function Ideas() {
  const n = P.ideas.length;
  const [i, setI] = useState(0);
  const [hold, setHold] = useState(false);
  const [manual, setManual] = useState(false);
  const [rm, setRm] = useState(false);

  useEffect(() => { setRm(window.matchMedia('(prefers-reduced-motion: reduce)').matches); }, []);

  const paused = hold || manual || rm;
  useEffect(() => {
    if (paused) return;
    const t = window.setTimeout(() => setI((x) => (x + 1) % n), IDEA_MS);
    return () => window.clearTimeout(t);
  }, [i, paused, n]);

  useEffect(() => {
    document.querySelector('.rail .on')?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: rm ? 'auto' : 'smooth' });
  }, [i, rm]);

  const pick = (j: number) => { setI((j + n) % n); setManual(true); };
  const it = P.ideas[i];

  return (
    <div onMouseEnter={() => setHold(true)} onMouseLeave={() => setHold(false)} onFocus={() => setHold(true)} onBlur={() => setHold(false)}>
      <p className="lead">What I want to build next. The spotlight moves on by itself; tap anything to take over.</p>
      <div className="seg" role="presentation">
        {P.ideas.map((x, j) => (
          <i key={x.title} className={j < i ? 'done' : j === i ? 'cur' : ''}>
            {j === i && <b key={`${i}-${paused}`} style={{ animationDuration: `${IDEA_MS}ms` }} className={paused ? 'full' : ''} />}
          </i>
        ))}
      </div>
      <section className="spot" data-stage={it.stage} key={i} aria-live="polite">
        <div className="spot-top">
          <span className="stage">{it.stage}</span>
        </div>
        <h3>{it.title}</h3>
        <div className="tagl">{it.tagline}</div>
        <p>{it.why}</p>
        <h4>The plan</h4>
        <ol className="steps">
          {it.steps.map((x, j) => <li key={x} style={{ animationDelay: `${120 + j * 110}ms` }}><span>{j + 1}</span>{x}</li>)}
        </ol>
        <Chips items={it.tech} />
      </section>
      <div className="ctl2">
        <button className="btn g" onClick={() => pick(i - 1)} aria-label="Previous idea">←</button>
        <button className="btn g" onClick={() => setManual((m) => !m)} disabled={rm}>{manual || rm ? 'Autoplay' : 'Pause'}</button>
        <button className="btn g" onClick={() => pick(i + 1)} aria-label="Next idea">→</button>
        <span className="cnt">{i + 1} / {n}</span>
      </div>
      <div className="rail" role="list">
        {P.ideas.map((x, j) => (
          <button key={x.title} role="listitem" data-stage={x.stage} className={j === i ? 'on' : ''} onClick={() => pick(j)}>
            {x.short}
          </button>
        ))}
      </div>
    </div>
  );
}

function Contact({ ctx }: { ctx: PanelCtx }) {
  const c = P.contact;
  return (
    <>
      <p>Say hello. A little bird will carry your message to me.</p>
      <div className="links">
        <a className="btn g" href={`mailto:${c.email}`}>✉️ {c.email}</a>
        <a className="btn g" href={`tel:${c.phone.replace(/[^+\d]/g, '')}`}>📞 {c.phone}</a>
      </div>
      <Socials />
      <ContactForm ctx={ctx} />
    </>
  );
}

function Cv() {
  return (
    <>
      <div className="paper">
        <h3>{P.name}</h3>
        <div><b>{P.headline}</b></div>
        <div>{P.location} · {P.contact.phone} · {P.contact.email}</div>
        <h5>Summary</h5>
        <div>{P.summary}</div>
        <h5>Technical skills</h5>
        {P.skillGroups.map((g) => <div key={g.title}><b>{g.title}:</b> {g.items.join(', ')}</div>)}
        <h5>Experience</h5>
        {P.experience.map((e) => <div key={e.role} style={{ marginBottom: 6 }}><b>{e.role}</b>, {e.org} ({e.period})</div>)}
        <h5>Projects</h5>
        {P.projects.map((p) => <div key={p.title}><b>{p.title}</b> ({p.period}): {p.summary}</div>)}
        <h5>Education</h5>
        {P.education.map((e) => <div key={e.school}>{e.degree}, {e.school} ({e.period})</div>)}
        <h5>Certifications &amp; achievements</h5>
        {P.achievements.map((c) => <div key={c.title}>{c.title} ({c.date})</div>)}
        {P.certificates.map((c) => <div key={c.title + c.issuer}>{c.title}, {c.issuer} ({c.date})</div>)}
      </div>
      <div className="links" style={{ marginTop: 14 }}>
        <a className="btn" href={P.cvFile} download>⬇ Download CV (PDF)</a>
        <a className="btn g" href={P.cvFile} target="_blank" rel="noopener noreferrer">Open in new tab ↗</a>
      </div>
    </>
  );
}

function Time() {
  const [now, setNow] = useState<{ clock: string; date: string }>({ clock: '--:--:--', date: '' });
  useEffect(() => {
    const tick = () => {
      const d = npt();
      setNow({ clock: `${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:${pad(d.getUTCSeconds())}`, date: d.toUTCString().slice(0, 16) });
    };
    tick();
    const id = window.setInterval(tick, 500);
    return () => window.clearInterval(id);
  }, []);
  return (
    <>
      <div className="clockbig" aria-live="off">{now.clock}</div>
      <p style={{ textAlign: 'center' }}>{now.date}</p>
      <p style={{ textAlign: 'center' }}>Nepal Standard Time (UTC+5:45), the same time the wall clock shows.</p>
    </>
  );
}

export function PanelBody({ id, arg, ctx }: { id: PanelId; arg: number; ctx: PanelCtx }) {
  switch (id) {
    case 'about': return <About ctx={ctx} />;
    case 'skills': return <Skills />;
    case 'projects': return <Projects arg={arg} ctx={ctx} />;
    case 'certs': return <Certs />;
    case 'exp': return <Experience />;
    case 'blog': return <Blog arg={arg} />;
    case 'ideas': return <Ideas />;
    case 'contact': return <Contact ctx={ctx} />;
    case 'cv': return <Cv />;
    case 'ai': return <AiChat />;
    case 'time': return <Time />;
  }
}
