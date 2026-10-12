import * as THREE from 'three';
import { Kit, PI } from './kit';
import { npt, pad } from '@/lib/time';

export interface ScreenLine { q: string; a: string }

export interface DeskHandles {
  fans: THREE.Mesh[];
  toyHead: THREE.Group;
  toyArm: THREE.Group;
  shadeM: THREE.MeshStandardMaterial;
  bulbM: THREE.MeshBasicMaterial;
  pool: THREE.Mesh;
  /** repaint the monitor texture */
  drawScreen: (t: number) => void;
}

function wrapText(g: CanvasRenderingContext2D, text: string, x: number, y0: number, maxW: number, lh: number): void {
  let line = '';
  let y = y0;
  text.split(' ').forEach((word) => {
    const next = line ? `${line} ${word}` : word;
    if (g.measureText(next).width > maxW && line) {
      g.fillText(line, x, y);
      y += lh;
      line = word;
    } else line = next;
  });
  g.fillText(line, x, y);
}

/** Desk, PC tower, monitor with the "Ask my AI" screen, mug, lamp, toy figure, chair, plants and briefcase. */
export function buildDesk(k: Kit, script: ScreenLine[]): DeskHandles {
  const { scene, WOOD, DARK, GOLD } = k;
  const BX = k.BX.bind(k), CY = k.CY.bind(k), SP = k.SP.bind(k), PL = k.PL.bind(k), M = k.M.bind(k);

  // desk body
  BX(scene, 6.2, 0.18, 2.3, WOOD, 0, 2.61, -3.8);
  [-2.9, 2.9].forEach((x) => BX(scene, 0.16, 2.52, 2.1, M(0x2a1b10), x, 1.26, -3.8));
  BX(scene, 5.6, 2.2, 0.1, M(0x2a1b10), 0, 1.5, -4.85);

  // drawer unit
  const du = new THREE.Group();
  scene.add(du);
  BX(du, 1.6, 1.9, 1.8, M(0x352214), 0, 0, 0);
  [0.55, 0, -0.55].forEach((y) => {
    BX(du, 1.4, 0.5, 0.06, M(0x4a3020), 0, y, 0.92);
    CY(du, 0.04, 0.04, 0.4, GOLD, 0, y, 0.97, 8).rotation.z = PI / 2;
  });
  du.position.set(1.95, 1, -3.9);

  // PC tower with RGB fans
  const tw = new THREE.Group();
  scene.add(tw);
  BX(tw, 1.1, 2.2, 1.8, M(0x10161d, { r: 0.4, m: 0.6 }), 0, 0, 0);
  const fans: THREE.Mesh[] = [];
  [-0.65, 0, 0.65].forEach((y, i) => {
    const f = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.05, 8, 24), new THREE.MeshBasicMaterial({ color: i === 1 ? 0xff5fd2 : 0x7bf0ff }));
    f.position.set(0, y, 0.92);
    tw.add(f);
    fans.push(f);
    CY(tw, 0.08, 0.08, 0.05, DARK, 0, y, 0.92, 10).rotation.x = PI / 2;
  });
  BX(tw, 0.05, 2, 0.04, new THREE.MeshBasicMaterial({ color: 0x7bf0ff }), 0.5, 0, 0.92);
  tw.position.set(-1.5, 1.2, -4.0);
  k.glow(0x7bf0ff, 2.2, 3.6, -1.5, 1.3, -3.0, 'always', 0.35);

  // monitor
  const mon = new THREE.Group();
  const part = (g: THREE.BufferGeometry, m: THREE.Material, x: number, y: number, z: number) => {
    const o = new THREE.Mesh(g, m);
    o.position.set(x, y, z);
    mon.add(o);
  };
  part(new THREE.CylinderGeometry(0.55, 0.6, 0.08, 24), DARK, 0, 0.04, 0);
  part(new THREE.BoxGeometry(0.25, 0.9, 0.15), DARK, 0, 0.5, 0);
  part(new THREE.BoxGeometry(3.7, 2.25, 0.15), M(0x0c1015, { m: 0.4 }), 0, 1.75, 0);

  const SSC = k.opts.isSmall ? 1.5 : 2;
  const sc = document.createElement('canvas');
  sc.width = 512 * SSC;
  sc.height = 300 * SSC;
  const sg = sc.getContext('2d');
  if (!sg) throw new Error('2D canvas is not available');
  const stex = new THREE.CanvasTexture(sc);
  stex.anisotropy = k.opts.maxAniso;
  PL(mon, 3.4, 2.0, new THREE.MeshBasicMaterial({ map: stex }), 0, 1.75, 0.09);
  mon.position.set(0, 2.7, -4.3);
  scene.add(mon);
  k.click(mon, 'ai', 'Monitor', 'Ask my AI', 'Click to chat');
  k.glow(0x35d0ff, 5.5, 3.8, 0, 4.5, -4, 'always', 0.28);

  const drawScreen = (tIn: number): void => {
    const t = Math.max(0, tIn || 0);
    sg.setTransform(SSC, 0, 0, SSC, 0, 0);
    const gr = sg.createLinearGradient(0, 0, 0, 300);
    gr.addColorStop(0, '#0a1424');
    gr.addColorStop(1, '#101c33');
    sg.fillStyle = gr;
    sg.fillRect(0, 0, 512, 300);
    sg.fillStyle = '#142540';
    sg.fillRect(0, 0, 512, 32);
    sg.fillStyle = '#7bf0ff';
    sg.beginPath();
    sg.arc(20, 16, 7 + Math.sin(t * 3) * 1.5, 0, 6.283);
    sg.fill();
    sg.fillStyle = '#e9f3fb';
    sg.font = 'bold 15px sans-serif';
    sg.textAlign = 'left';
    sg.fillText('Ask my AI', 36, 21);
    const d = npt();
    sg.textAlign = 'right';
    sg.fillStyle = '#8fb0d8';
    sg.fillText(`${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())} NPT`, 498, 21);
    sg.textAlign = 'left';
    const n = script.length;
    const i = ((Math.floor(t / 8) % n) + n) % n;
    const ph = t % 8;
    const line = script[i];
    const q = line.q.slice(0, Math.floor(ph * 22));
    sg.fillStyle = '#ffb454';
    sg.fillRect(250, 52, 246, 34);
    sg.fillStyle = '#231503';
    sg.font = '15px sans-serif';
    sg.fillText(q, 262, 74);
    if (ph > 1.6) {
      const a = line.a.slice(0, Math.floor((ph - 1.6) * 26));
      sg.fillStyle = '#1b3052';
      sg.fillRect(16, 104, 340, 92);
      sg.fillStyle = '#e9f3fb';
      sg.font = '15px sans-serif';
      wrapText(sg, a + (Math.floor(t * 2) % 2 ? '▌' : ''), 28, 128, 316, 22);
    }
    sg.fillStyle = '#142540';
    sg.fillRect(16, 252, 480, 32);
    sg.fillStyle = '#6f8fb0';
    sg.fillText('Ask anything about me…', 28, 273);
    stex.needsUpdate = true;
  };

  // keyboard, mouse, desk mat, mug
  BX(scene, 1.8, 0.08, 0.6, M(0x1a222b, { m: 0.3, e: 0x103040, ei: 0.6 }), 0, 2.75, -3.3);
  BX(scene, 0.3, 0.07, 0.45, M(0x1a222b), 1.4, 2.74, -3.3);
  BX(scene, 2.6, 0.02, 1.1, M(0x10161d), 0.2, 2.71, -3.3);
  const mug = new THREE.Group();
  CY(mug, 0.24, 0.2, 0.42, M(0xe6b04a, { r: 0.4 }), 0, 0, 0, 20);
  const mh = new THREE.Mesh(new THREE.TorusGeometry(0.13, 0.035, 8, 16), M(0xe6b04a));
  mh.position.set(0.26, 0, 0);
  mug.add(mh);
  mug.position.set(-1.35, 2.92, -3.3);
  scene.add(mug);

  // desk lamp
  const lampG = new THREE.Group();
  scene.add(lampG);
  const LM = M(0x222a30, { m: 0.6, r: 0.4 });
  CY(lampG, 0.3, 0.35, 0.08, LM, -2.3, 2.74, -3.1, 24);
  const arm = CY(lampG, 0.04, 0.04, 1.3, LM, -2.3 - Math.sin(0.25) * 0.65, 2.7 + Math.cos(0.25) * 0.65, -3.1, 8);
  arm.rotation.z = 0.25;
  SP(lampG, 0.07, LM, -2.62, 3.96, -3.1);
  const shadeM = new THREE.MeshStandardMaterial({ color: 0xffb454, emissive: 0xffa030, emissiveIntensity: 0.9, side: THREE.DoubleSide, roughness: 0.6 });
  const shade = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.5, 0.5, 24, 1, true), shadeM);
  shade.position.set(-2.62, 4.05, -3.1);
  lampG.add(shade);
  const bulbM = new THREE.MeshBasicMaterial({ color: 0xfff0c8 });
  SP(lampG, 0.12, bulbM, -2.62, 3.88, -3.1);
  k.glow(0xffb454, 2.6, 2.6, -2.62, 3.85, -3.1, 'lamp', 0.9);
  const pool = new THREE.Mesh(
    new THREE.CircleGeometry(1.0, 32),
    new THREE.MeshBasicMaterial({ map: k.glowTex, color: 0xffb454, blending: THREE.AdditiveBlending, transparent: true, depthWrite: false, opacity: 0.5 }),
  );
  pool.rotation.x = -PI / 2;
  pool.position.set(-2.55, 2.72, -3.05);
  scene.add(pool);
  k.click(shade, 'sw-lamp', 'Lamp', 'Desk lamp', 'Click to switch');

  // toy figure of me
  const toy = new THREE.Group();
  const skin = M(0xc89a73, { r: 0.7 }), hairM = M(0x120e0c, { r: 0.9 }), tee = M(0x77746f, { r: 1 });
  const jean = M(0x27334f, { r: 0.9 }), blk = M(0x0b0b0e, { r: 0.4 }), dk = M(0x2a1d18, { r: 1 });
  CY(toy, 0.52, 0.56, 0.1, M(0x1e2430, { r: 0.4, m: 0.4 }), 0, 0.05, 0, 32);
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.54, 0.025, 8, 40), GOLD);
  ring.rotation.x = PI / 2;
  ring.position.y = 0.1;
  toy.add(ring);
  [-0.14, 0.14].forEach((x) => {
    BX(toy, 0.2, 0.5, 0.22, jean, x, 0.35, 0);
    BX(toy, 0.24, 0.12, 0.36, M(0xf0f0f0, { r: 0.6 }), x, 0.16, 0.05);
  });
  BX(toy, 0.62, 0.62, 0.34, tee, 0, 0.91, 0);
  BX(toy, 0.16, 0.5, 0.18, tee, -0.4, 0.95, 0);
  SP(toy, 0.09, skin, -0.4, 0.66, 0);
  const toyArm = new THREE.Group();
  toyArm.position.set(0.4, 1.15, 0);
  BX(toyArm, 0.16, 0.5, 0.18, tee, 0, -0.25, 0);
  SP(toyArm, 0.09, skin, 0, -0.54, 0);
  toy.add(toyArm);
  CY(toy, 0.1, 0.12, 0.14, skin, 0, 1.27, 0, 12);
  const toyHead = new THREE.Group();
  toyHead.position.set(0, 1.58, 0);
  toy.add(toyHead);
  SP(toyHead, 0.45, skin, 0, 0, 0, 1, 1.05, 0.95);
  const hair = new THREE.Mesh(new THREE.SphereGeometry(0.475, 20, 12, 0, PI * 2, 0, PI * 0.56), hairM);
  hair.scale.set(1, 1.08, 1);
  hair.position.set(0, 0.02, -0.03);
  hair.rotation.x = -0.45;
  toyHead.add(hair);
  const curls: [number, number, number][] = [[-0.3, 0.38, 0.06], [0.1, 0.46, 0.1], [0.32, 0.34, 0], [-0.12, 0.44, -0.2], [0.25, 0.3, -0.27], [-0.35, 0.22, -0.22]];
  curls.forEach(([x, y, z]) => SP(toyHead, 0.13, hairM, x, y, z, 1, 0.9, 1));
  [-0.3, -0.15, 0, 0.15, 0.3].forEach((x, i) => SP(toyHead, 0.1, hairM, x, 0.3 + (i % 2) * 0.03, 0.33, 1, 0.8, 0.8));
  [-1, 1].forEach((s) => {
    BX(toyHead, 0.27, 0.2, 0.05, blk, s * 0.17, 0.02, 0.42);
    BX(toyHead, 0.21, 0.14, 0.052, M(0xa8d8ff, { r: 0.1, m: 0.3, t: 0.45 }), s * 0.17, 0.02, 0.425);
    BX(toyHead, 0.03, 0.03, 0.32, blk, s * 0.3, 0.04, 0.26);
    SP(toyHead, 0.035, blk, s * 0.17, 0.02, 0.385);
    BX(toyHead, 0.2, 0.035, 0.04, dk, s * 0.17, 0.17, 0.385).rotation.z = -s * 0.1;
    SP(toyHead, 0.08, skin, s * 0.45, 0, -0.02);
  });
  BX(toyHead, 0.09, 0.035, 0.05, blk, 0, 0.05, 0.42);
  SP(toyHead, 0.055, M(0xb98660, { r: 0.8 }), 0, -0.07, 0.43, 1, 1.2, 1);
  BX(toyHead, 0.16, 0.03, 0.04, dk, 0, -0.13, 0.41);
  BX(toyHead, 0.14, 0.025, 0.03, M(0x6b3a30), 0, -0.19, 0.385);
  BX(toyHead, 0.12, 0.1, 0.05, dk, 0, -0.29, 0.335);
  toy.scale.set(0.85, 0.85, 0.85);
  toy.position.set(2.35, 2.7, -3.4);
  toy.rotation.y = -0.25;
  scene.add(toy);
  k.click(toy, 'about', 'About me', 'The toy version of me', 'Click to read my story');
  k.meta(toy).s0 = 0.85;
  const plaqueT = k.tex(256, 64, (g) => {
    g.fillStyle = '#e6b04a';
    g.fillRect(0, 0, 256, 64);
    g.fillStyle = '#231503';
    g.font = 'bold 30px sans-serif';
    g.textAlign = 'center';
    g.fillText('BISHWAS', 128, 44);
  });
  PL(toy, 0.6, 0.14, k.basic(plaqueT), 0, 0.07, 0.56);

  // plants
  const plant = (x: number, y: number, z: number, s: number) => {
    const g = new THREE.Group();
    CY(g, 0.4, 0.3, 0.6, M(0x7a3a28), 0, 0.3, 0, 16);
    for (let i = 0; i < 7; i++) {
      const l = new THREE.Mesh(new THREE.ConeGeometry(0.17, 1.1, 6), M(0x2f8f55, { r: 0.6 }));
      l.position.set(Math.cos(i * 0.9) * 0.22, 1.0, Math.sin(i * 0.9) * 0.22);
      l.rotation.set(Math.sin(i * 0.9) * 0.5, 0, -Math.cos(i * 0.9) * 0.5);
      g.add(l);
    }
    g.position.set(x, y, z);
    g.scale.set(s, s, s);
    scene.add(g);
  };
  plant(-9.0, 0, -5.2, 1.35);
  plant(9.1, 0, -5.4, 1.5);
  plant(-9.0, 0, 4.8, 1.6);

  // briefcase (experience)
  const brief = new THREE.Group();
  const lea = M(0x6b3a22, { r: 0.6 });
  BX(brief, 1.0, 0.72, 0.3, lea, 0, 0.36, 0);
  BX(brief, 0.96, 0.04, 0.32, M(0x4a2616), 0, 0.55, 0);
  BX(brief, 0.12, 0.12, 0.05, GOLD, -0.2, 0.55, 0.17);
  BX(brief, 0.12, 0.12, 0.05, GOLD, 0.2, 0.55, 0.17);
  const bh = new THREE.Mesh(new THREE.TorusGeometry(0.17, 0.025, 8, 16, PI), M(0x2a1608));
  bh.position.set(0, 0.72, 0);
  brief.add(bh);
  BX(brief, 0.5, 0.1, 0.02, GOLD, 0, 0.3, 0.16);
  brief.position.set(-6.4, 0, -5.2);
  brief.rotation.y = 0.35;
  scene.add(brief);
  k.click(brief, 'exp', 'Experience', 'Briefcase', 'Click to open');

  // office chair
  const chair = new THREE.Group();
  const CH = M(0x1b2230, { r: 0.7 });
  scene.add(chair);
  for (let i = 0; i < 5; i++) {
    const a = BX(chair, 0.8, 0.06, 0.12, DARK, 0, 0.2, 0);
    a.rotation.y = i * 1.2566;
    a.position.set(Math.cos(i * 1.2566) * 0.4, 0.2, Math.sin(i * 1.2566) * 0.4);
  }
  CY(chair, 0.06, 0.06, 0.7, DARK, 0, 0.55, 0, 10);
  BX(chair, 1.2, 0.2, 1.2, CH, 0, 0.95, 0);
  BX(chair, 1.1, 1.3, 0.18, CH, 0, 1.75, 0.55);
  BX(chair, 0.12, 0.5, 0.8, DARK, -0.65, 1.3, 0);
  BX(chair, 0.12, 0.5, 0.8, DARK, 0.65, 1.3, 0);
  BX(chair, 0.7, 0.3, 0.14, M(0xff5fd2, { r: 0.6, e: 0xff2bd6, ei: 0.25 }), 0, 2.2, 0.55);
  chair.position.set(3.9, 0, -1.2);
  chair.rotation.y = 0.8;

  return { fans, toyHead, toyArm, shadeM, bulbM, pool, drawScreen };
}
