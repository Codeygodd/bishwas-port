import * as THREE from 'three';
import { Kit, PI, rnd } from './kit';
import { kitFns } from './room';

/** Dusk-over-the-Himalaya picture used for the window view and the poster. */
function dusk(k: Kit, w: number, h: number, label?: string): THREE.CanvasTexture {
  return k.tex(w, h, (g) => {
    const gr = g.createLinearGradient(0, 0, 0, h);
    gr.addColorStop(0, '#141c4a');
    gr.addColorStop(0.6, '#7a4a86');
    gr.addColorStop(1, '#f0905c');
    g.fillStyle = gr;
    g.fillRect(0, 0, w, h);
    for (let i = 0; i < 60; i++) {
      g.fillStyle = `rgba(255,255,255,${rnd() * 0.8})`;
      g.fillRect(rnd() * w, rnd() * h * 0.45, 1.5, 1.5);
    }
    const ridges: [string, number, number][] = [['#2a2350', 0.62, 0.22], ['#1a1a3a', 0.72, 0.28]];
    ridges.forEach(([col, base, amp], i) => {
      g.fillStyle = col;
      g.beginPath();
      g.moveTo(0, h);
      for (let x = 0; x <= w; x += 16) g.lineTo(x, h * base - Math.abs(Math.sin(x * 0.012 + i * 2)) * h * amp * (0.6 + 0.4 * Math.sin(x * 0.03 + i)));
      g.lineTo(w, h);
      g.fill();
    });
    g.fillStyle = 'rgba(255,255,255,.85)';
    g.beginPath();
    g.moveTo(w * 0.49, h * 0.34);
    g.lineTo(w * 0.56, h * 0.34 + 22);
    g.lineTo(w * 0.42, h * 0.34 + 22);
    g.fill();
    if (label) {
      g.fillStyle = '#fff';
      g.textAlign = 'center';
      g.font = 'bold 54px sans-serif';
      g.fillText(label, w / 2, h * 0.22);
      g.font = '22px sans-serif';
      g.fillText('HIMALAYA · NEPAL', w / 2, h * 0.22 + 30);
    }
  });
}

/** Half-open window, plant on the sill, Nepal poster and the framed CV. */
export function buildDecor(k: Kit, role: string): void {
  const { scene, BX, CY, SP, PL, M } = { ...kitFns(k), SP: k.SP.bind(k) };
  const WF = M(0x2a1b10);
  const GOLD = k.GOLD;

  PL(scene, 4.6, 3.4, k.basic(dusk(k, 512, 384)), -9.93, 4.8, -1, PI / 2);
  BX(scene, 0.18, 0.16, 4.9, WF, -9.95, 6.58, -1);
  BX(scene, 0.18, 3.5, 0.16, WF, -9.95, 4.8, -3.4);
  BX(scene, 0.18, 3.5, 0.16, WF, -9.95, 4.8, 1.4);
  BX(scene, 0.5, 0.12, 5.1, WF, -9.8, 2.95, -1);

  const sash = new THREE.Group();
  scene.add(sash);
  BX(sash, 0.08, 0.1, 4.5, WF, -9.86, 6.45, -1);
  BX(sash, 0.08, 0.12, 4.5, WF, -9.86, 4.85, -1);
  BX(sash, 0.08, 1.7, 0.1, WF, -9.86, 5.65, -3.25);
  BX(sash, 0.08, 1.7, 0.1, WF, -9.86, 5.65, 1.25);
  BX(sash, 0.08, 1.7, 0.05, WF, -9.86, 5.65, -1);
  BX(sash, 0.08, 0.05, 4.5, WF, -9.86, 5.65, -1);
  PL(sash, 4.5, 1.7, new THREE.MeshBasicMaterial({ color: 0xbfe0ff, transparent: true, opacity: 0.13, depthWrite: false }), -9.84, 5.65, -1, PI / 2);
  BX(sash, 0.1, 0.08, 0.4, GOLD, -9.8, 4.92, -1);

  const pot = new THREE.Group();
  CY(pot, 0.14, 0.1, 0.2, M(0xd9d4c8), 0, 0.1, 0, 12);
  SP(pot, 0.15, M(0x3aa05c, { r: 0.6 }), 0, 0.28, 0);
  pot.position.set(-9.72, 3.01, 0.6);
  scene.add(pot);

  PL(scene, 1.8, 2.4, k.basic(dusk(k, 256, 340, 'NEPAL')), -9.88, 5.0, 3.6, PI / 2);
  BX(scene, 0.1, 2.6, 2, WF, -9.96, 5.0, 3.6);

  // framed CV page
  const cvT = k.tex(380, 520, (g, w, h) => {
    g.fillStyle = '#fbfbf6';
    g.fillRect(0, 0, w, h);
    g.fillStyle = '#1b2430';
    g.font = 'bold 30px sans-serif';
    g.fillText('BISHWAS PANDEY', 24, 52);
    g.font = '15px sans-serif';
    g.fillStyle = '#e07a1f';
    g.fillText(role.toUpperCase().replace('FULL-STACK ', '') + ' · NEPAL', 24, 76);
    const blocks: [string, number][] = [['SUMMARY', 110], ['EXPERIENCE', 210], ['PROJECTS', 330], ['SKILLS', 430]];
    blocks.forEach(([label, y]) => {
      g.fillStyle = '#1b2430';
      g.font = 'bold 13px sans-serif';
      g.fillText(label, 24, y);
      g.fillStyle = '#c9cfd6';
      for (let i = 0; i < 3; i++) g.fillRect(24, y + 14 + i * 18, w - 48 - (i === 2 ? 100 : 0), 7);
    });
    g.fillStyle = '#1b2430';
    g.fillRect(0, 0, 12, h);
  });
  BX(scene, 0.12, 2.9, 2.2, M(0xc8a24a, { r: 0.35, m: 0.4 }), -9.94, 4.9, -5.0);
  const cvP = PL(scene, 1.9, 2.6, k.basic(cvT), -9.86, 4.9, -5.0, PI / 2);
  k.click(cvP, 'cv', 'CV', 'Framed CV', 'Click to view or download');
  k.glow(0xffd9a0, 3.2, 3.6, -9.6, 5.9, -5.0, 'tube', 0.25);
}
