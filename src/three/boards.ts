import * as THREE from 'three';
import { Kit, PI, rnd } from './kit';

export interface BoardHandles {
  hourHand: THREE.Group;
  minuteHand: THREE.Group;
  secondHand: THREE.Group;
}

export interface BoardContent {
  name: string;
  ideas: { title: string; stage: string }[];
  posts: { title: string; date: string }[];
}

const HAND_FONT = '"Segoe Print","Bradley Hand","Comic Sans MS",cursive';

/** Neon sign, idea corkboard, blog board with one pinned note per post, and the wall clock. */
export function buildBoards(k: Kit, c: BoardContent): BoardHandles {
  const { scene, WOOD, GOLD } = k;
  const BX = k.BX.bind(k), PL = k.PL.bind(k), SP = k.SP.bind(k);

  // neon sign
  const label = `< ${c.name.split(' ')[0].toUpperCase()} />`;
  const neonT = k.tex(1024, 256, (g, w) => {
    g.textAlign = 'center';
    g.shadowColor = '#ff2bd6';
    g.shadowBlur = 26;
    g.fillStyle = '#ffd0f4';
    g.font = 'bold 120px monospace';
    g.fillText(label, w / 2, 160);
    g.shadowColor = '#2de2ff';
    g.shadowBlur = 14;
    g.fillStyle = '#bff6ff';
    g.fillText(label, w / 2 + 2, 162);
  });
  PL(scene, 4.0, 1.0, k.basic(neonT, { transparent: true }), 7.2, 7.1, -6.4);
  k.glow(0xff2bd6, 6.5, 2.4, 7.2, 7.1, -6.2, 'always', 0.55);

  // corkboard with idea notes
  const ckT = k.tex(768, 540, (g, w, h) => {
    g.fillStyle = '#b98a52';
    g.fillRect(0, 0, w, h);
    for (let i = 0; i < 1400; i++) {
      g.fillStyle = `rgba(${rnd() < 0.5 ? '90,60,30' : '230,190,130'},${rnd() * 0.25})`;
      g.fillRect(rnd() * w, rnd() * h, 2, 2);
    }
    const cols = ['#ffe27a', '#9ee6ff', '#ffb3d0', '#b8ffb0'];
    c.ideas.slice(0, 6).forEach((n, i) => {
      g.save();
      g.translate(34 + (i % 3) * 242, 70 + Math.floor(i / 3) * 235);
      g.rotate((rnd() - 0.5) * 0.12);
      g.fillStyle = cols[i % 4];
      g.fillRect(0, 0, 214, 170);
      g.fillStyle = '#d33';
      g.beginPath();
      g.arc(107, 12, 9, 0, 6.283);
      g.fill();
      g.fillStyle = '#222';
      g.font = `bold 25px ${HAND_FONT}`;
      const words = n.title.split(' ');
      g.fillText(words.slice(0, 2).join(' '), 14, 68);
      g.fillText(words.slice(2, 4).join(' '), 14, 102);
      g.font = 'bold 15px sans-serif';
      g.fillText(n.stage, 14, 155);
      g.restore();
    });
  });
  BX(scene, 4.2, 3.0, 0.1, WOOD, 7.0, 4.3, -6.45);
  const ck = PL(scene, 4, 2.8, k.basic(ckT), 7.0, 4.3, -6.37);
  k.click(ck, 'ideas', 'Corkboard', 'Upcoming ideas', 'Click to open');

  // blog chalkboard
  const cbT = k.tex(1024, 560, (g, w, h) => {
    g.fillStyle = '#1c2a25';
    g.fillRect(0, 0, w, h);
    for (let i = 0; i < 400; i++) {
      g.fillStyle = `rgba(255,255,255,${rnd() * 0.04})`;
      g.fillRect(rnd() * w, rnd() * h, rnd() * 60, 2);
    }
    g.fillStyle = '#f2f2e8';
    g.strokeStyle = '#f2f2e8';
    g.font = `bold 64px ${HAND_FONT}`;
    g.fillText('BLOG', 44, 86);
    g.fillRect(44, 100, 200, 5);
    g.lineWidth = 4;
    g.beginPath();
    g.moveTo(800, 110);
    g.lineTo(870, 40);
    g.lineTo(940, 110);
    g.lineTo(800, 110);
    g.stroke();
    g.beginPath();
    g.arc(970, 46, 22, 0, 6.283);
    g.stroke();
  });
  BX(scene, 0.14, 3.55, 6.25, WOOD, 9.95, 4.6, -2.2);
  BX(scene, 0.3, 0.1, 5.8, WOOD, 9.8, 2.85, -2.2);
  PL(scene, 6, 3.3, k.basic(cbT), 9.85, 4.6, -2.2, -PI / 2);

  const noteTex = (title: string, date: string, col: string) => k.tex(256, 256, (g, w, h) => {
    g.fillStyle = col;
    g.fillRect(0, 0, w, h);
    g.fillStyle = 'rgba(0,0,0,.06)';
    g.fillRect(0, h - 26, w, 26);
    g.fillStyle = '#2a2118';
    g.font = `bold 26px ${HAND_FONT}`;
    g.textAlign = 'left';
    let line = '', y = 62, n = 0;
    title.split(' ').forEach((word) => {
      const t = line ? `${line} ${word}` : word;
      if (g.measureText(t).width > w - 40 && line) {
        if (n < 4) g.fillText(line, 20, y);
        y += 32;
        n++;
        line = word;
      } else line = t;
    });
    if (n < 4) g.fillText(line, 20, y);
    g.font = '14px sans-serif';
    g.fillStyle = '#5a4a38';
    g.fillText(date, 20, h - 8);
  });
  {
    const n = Math.max(1, c.posts.length);
    const cols = Math.min(n, Math.max(2, Math.ceil(Math.sqrt(n * 2.2))));
    const rows = Math.ceil(n / cols);
    const cw = 5.4 / cols, ch = 2.35 / rows;
    const s = Math.min(cw, ch) * 0.86;
    const pal = ['#ffe27a', '#9ee6ff', '#ffb3d0', '#b8ffb0', '#ffd1a6', '#d9c2ff'];
    c.posts.forEach((b, i) => {
      const r = Math.floor(i / cols), col = i % cols;
      const inRow = Math.min(cols, n - r * cols);
      const off = (cols - inRow) / 2;
      const g = new THREE.Group();
      PL(g, s, s, k.basic(noteTex(b.title, b.date, pal[i % 6])), 0, 0, 0);
      SP(g, s * 0.06, new THREE.MeshStandardMaterial({ color: 0xd33a3a, roughness: 0.3 }), 0, s * 0.4, 0.03);
      g.position.set(9.82, 5.45 - ch * (r + 0.5) - 0.1, -4.9 + cw * (col + off + 0.5));
      g.rotation.y = -PI / 2;
      g.rotation.z = (rnd() - 0.5) * 0.14;
      scene.add(g);
      k.click(g, 'blog', 'Blog post', b.title, 'Click to read', i);
    });
  }

  // wall clock (Kathmandu time)
  const faceT = k.tex(256, 256, (g) => {
    g.fillStyle = '#f4efe4';
    g.beginPath();
    g.arc(128, 128, 126, 0, 6.283);
    g.fill();
    g.fillStyle = '#1b2430';
    g.textAlign = 'center';
    g.textBaseline = 'middle';
    g.font = 'bold 30px serif';
    for (let i = 1; i <= 12; i++) {
      const a = (i / 12) * 6.283;
      g.fillText(String(i), 128 + Math.sin(a) * 98, 128 - Math.cos(a) * 98);
    }
    for (let j = 0; j < 60; j++) {
      const b = (j / 60) * 6.283;
      g.fillRect(128 + Math.sin(b) * 118 - 1, 128 - Math.cos(b) * 118 - 1, j % 5 ? 2 : 4, j % 5 ? 2 : 4);
    }
  });
  const clk = new THREE.Group();
  clk.rotation.y = -PI / 2;
  clk.position.set(9.9, 7.7, -2.2);
  scene.add(clk);
  clk.add(new THREE.Mesh(new THREE.TorusGeometry(0.95, 0.08, 12, 48), GOLD));
  const face = new THREE.Mesh(new THREE.CircleGeometry(0.92, 40), new THREE.MeshBasicMaterial({ map: faceT }));
  face.position.z = 0.02;
  clk.add(face);
  const hand = (w: number, l: number, col: number): THREE.Group => {
    const h = new THREE.Group();
    BX(h, w, l, 0.03, new THREE.MeshBasicMaterial({ color: col }), 0, l / 2 - 0.08, 0);
    h.position.z = 0.06;
    clk.add(h);
    return h;
  };
  const hourHand = hand(0.07, 0.5, 0x1b2430);
  const minuteHand = hand(0.05, 0.75, 0x1b2430);
  const secondHand = hand(0.02, 0.82, 0xd33a3a);
  SP(clk, 0.06, new THREE.MeshBasicMaterial({ color: 0xd33a3a }), 0, 0, 0.07);
  k.click(clk, 'time', 'Clock', 'Kathmandu time', 'Click for the big clock');

  return { hourHand, minuteHand, secondHand };
}
