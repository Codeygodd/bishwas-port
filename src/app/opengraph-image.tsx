import { ImageResponse } from 'next/og';
import { profile as P } from '@/data/profile';

export const alt = `${P.name} — ${P.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 80, background: 'linear-gradient(135deg,#060d14,#12304a)', color: '#e9f3fb' }}>
        <div style={{ fontSize: 28, letterSpacing: 6, color: '#ffb454' }}>INTERACTIVE 3D PORTFOLIO</div>
        <div style={{ fontSize: 96, fontWeight: 800, marginTop: 16 }}>{P.name}</div>
        <div style={{ fontSize: 40, marginTop: 12, color: '#9db3c6' }}>{`${P.role} · ${P.location}`}</div>
        <div style={{ display: 'flex', gap: 16, marginTop: 40, fontSize: 28 }}>
          {['React', 'Node.js', 'Python', 'SQL'].map((t) => (
            <div key={t} style={{ padding: '8px 22px', border: '2px solid #35d0ff', borderRadius: 999, color: '#7bf0ff' }}>{t}</div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
