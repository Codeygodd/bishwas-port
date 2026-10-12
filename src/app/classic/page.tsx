import type { Metadata } from 'next';
import { profile as P } from '@/data/profile';

export const metadata: Metadata = {
  title: 'Text version',
  description: `The plain, fast, accessible version of ${P.name}'s portfolio.`,
  alternates: { canonical: '/classic' },
};

export default function Classic() {
  const c = P.contact;
  return (
    <main className="classic">
      <p><a href="/">← Back to the 3D lab</a></p>
      <h1>{P.name}</h1>
      <div className="meta">{P.headline} · {P.location}</div>
      <div className="top">
        <a className="btn" href={P.cvFile} download>⬇ Download CV (PDF)</a>
        <a className="btn g" href={`mailto:${c.email}`}>✉️ {c.email}</a>
        <a className="btn g" href={c.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
      </div>
      <p><b>{P.intro.lead}</b></p>
      <ul>{P.intro.focus.map((f) => <li key={f.label}><b>{f.label}</b>: {f.text}</li>)}</ul>
      <p>{P.intro.closing}</p>
      <p>🎯 {P.seeking}</p>
      <p><i>&ldquo;{P.intro.motto}&rdquo;</i></p>
      <p>{P.summary}</p>

      <h2>Skills</h2>
      <div className="grid">{P.skillGroups.map((g) => <div key={g.title}><b>{g.title}</b><br /><span className="meta">{g.items.join(' · ')}</span></div>)}</div>
      <p className="meta">{P.practice.text}</p>

      <h2>Experience</h2>
      {P.experience.map((j) => (
        <article key={j.role}>
          <h3>{j.role} — {j.org}</h3>
          <div className="meta">{j.period} · {j.place}</div>
          <ul>{j.points.map((x) => <li key={x}>{x}</li>)}</ul>
        </article>
      ))}

      <h2>Projects</h2>
      {P.projects.map((p) => (
        <article key={p.title}>
          <h3>{p.icon} {p.title}</h3>
          <div className="meta">{p.period} · {p.tech.join(', ')}</div>
          <ul>{p.points.map((x) => <li key={x}>{x}</li>)}</ul>
        </article>
      ))}

      <h2>Education</h2>
      {P.education.map((e) => (
        <article key={e.school}><h3>{e.school}</h3><div className="meta">{e.degree} · {e.period} · {e.place}</div></article>
      ))}

      <h2>Certifications &amp; achievements</h2>
      <ul>{P.achievements.map((x) => <li key={x.title}><b>{x.title}</b> — {x.org}, {x.date}</li>)}{P.certificates.map((x) => <li key={x.title + x.issuer}><b>{x.title}</b> — {x.issuer}, {x.date}</li>)}</ul>

      <h2>Contact</h2>
      <p>{c.phone} · <a href={`mailto:${c.email}`}>{c.email}</a> · <a href={c.linkedin}>{c.linkedinLabel}</a> · <a href={c.website}>{c.websiteLabel}</a></p>
      <p>{P.socials.map((x) => <a key={x.id} className="btn g" href={x.url} target="_blank" rel="noopener noreferrer">{x.label} ↗</a>)}</p>
    </main>
  );
}
