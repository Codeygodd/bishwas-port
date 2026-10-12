import LabClient from '@/components/LabClient';
import { profile as P } from '@/data/profile';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: P.name,
  jobTitle: P.role,
  url: P.siteUrl,
  email: `mailto:${P.contact.email}`,
  telephone: P.contact.phone,
  address: { '@type': 'PostalAddress', addressLocality: 'Kathmandu', addressCountry: 'NP' },
  alumniOf: { '@type': 'CollegeOrUniversity', name: 'Tribhuvan University, Institute of Science and Technology' },
  sameAs: P.socials.map((x) => x.url),
  knowsAbout: P.skillGroups.flatMap((g) => g.items),
};

export default function Home() {
  return (
    <>
      <a className="skipl" href="#content">Skip to the text version</a>
      <LabClient />
      {/* Crawler- and screen-reader-friendly copy of everything shown in the 3D room. */}
      <main id="content" className="sr-only">
        <h1>{P.name} — {P.role}</h1>
        <p>{P.tagline}</p>
        <p>{P.summary}</p>
        <h2>Skills</h2>
        <ul>{P.skillGroups.map((g) => <li key={g.title}>{g.title}: {g.items.join(', ')}</li>)}</ul>
        <h2>Projects</h2>
        {P.projects.map((p) => <article key={p.title}><h3>{p.title} ({p.period})</h3><p>{p.summary}</p></article>)}
        <h2>Experience</h2>
        {P.experience.map((j) => <article key={j.role}><h3>{j.role}, {j.org} ({j.period})</h3><ul>{j.points.map((x) => <li key={x}>{x}</li>)}</ul></article>)}
        <h2>Education</h2>
        <ul>{P.education.map((e) => <li key={e.school}>{e.degree}, {e.school} ({e.period})</li>)}</ul>
        <h2>Certifications and achievements</h2>
        <ul>{P.achievements.map((c) => <li key={c.title}>{c.title} — {c.org} {c.date}</li>)}{P.certificates.map((c) => <li key={c.title + c.issuer}>{c.title} — {c.issuer} {c.date}</li>)}</ul>
        <h2>About</h2>
        <p>{P.intro.lead} {P.intro.closing} {P.seeking}</p>
        <h2>Profiles</h2>
        <ul>{P.socials.map((x) => <li key={x.id}><a href={x.url} rel="me noopener">{x.label}</a></li>)}</ul>
        <h2>Contact</h2>
        <p><a href={`mailto:${P.contact.email}`}>{P.contact.email}</a> · <a href={P.contact.linkedin}>LinkedIn</a> · <a href="/classic">Text version</a> · <a href={P.cvFile}>Download CV</a></p>
      </main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
    </>
  );
}
