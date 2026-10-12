'use client';

import dynamic from 'next/dynamic';

/** The WebGL room only exists in the browser, so it is loaded client-side without SSR. */
const Lab = dynamic(() => import('./Lab'), {
  ssr: false,
  loading: () => <div id="loader" role="status">POWERING UP THE LAB…</div>,
});

export default function LabClient() {
  return <Lab />;
}
