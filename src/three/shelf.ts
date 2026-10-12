import * as THREE from 'three';
import { Kit, PI, rnd } from './kit';

export interface ShelfHandles {
  trophyStar: THREE.Mesh;
}

/** Bookshelf: skill blocks, the projects book, a Lego F1 car and the certificates trophy. */
export function buildShelf(k: Kit, blocks: [string, string][]): ShelfHandles {
  const { scene, WOOD, GOLD } = k;
  const BX = k.BX.bind(k), CY = k.CY.bind(k), SP = k.SP.bind(k), PL = k.PL.bind(k), M = k.M.bind(k);
  const CX = -6.5;
  const SY = [3.1, 4.6, 6.1];

  SY.forEach((y) => BX(scene, 4.2, 0.12, 1.0, WOOD, CX, y - 0.06, -5.95));
  BX(scene, 4.4, 0.12, 1.0, WOOD, CX, 7.5, -5.95);
  [-1, 1].forEach((s) => BX(scene, 0.12, 4.65, 1.0, WOOD, CX + s * 2.16, 5.2, -5.95));
  SY.forEach((y, i) => {
    const c = i === 1 ? 0xff5fd2 : 0x35d0ff;
    BX(scene, 4, 0.04, 0.04, new THREE.MeshBasicMaterial({ color: c }), CX, y - 0.14, -5.5);
    k.glow(c, 5, 0.9, CX, y - 0.2, -5.4, 'always', 0.3);
  });
  const place = (g: THREE.Object3D, i: number, x: number, z = -5.9) => {
    g.position.set(x, SY[i], z);
    scene.add(g);
  };

  // shelf 1: skill blocks (a pyramid of six)
  const blockTex = (txt: string, col: string) => k.tex(128, 128, (g) => {
    g.fillStyle = col;
    g.fillRect(0, 0, 128, 128);
    g.strokeStyle = 'rgba(255,255,255,.7)';
    g.lineWidth = 6;
    g.strokeRect(5, 5, 118, 118);
    g.fillStyle = '#fff';
    g.font = `bold ${txt.length > 2 ? 44 : 58}px sans-serif`;
    g.textAlign = 'center';
    g.fillText(txt, 64, txt.length > 2 ? 78 : 84);
  });
  const layout: [number, number][] = [[-0.5, 0], [0, 0], [0.5, 0], [-0.25, 0.46], [0.25, 0.46], [0, 0.92]];
  const stack = new THREE.Group();
  blocks.slice(0, 6).forEach(([txt, col], i) => {
    const [x, y] = layout[i];
    const c = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.44, 0.44), new THREE.MeshStandardMaterial({ map: blockTex(txt, col), roughness: 0.5 }));
    c.position.set(x, 0.23 + y, 0);
    c.rotation.y = (rnd() - 0.5) * 0.5;
    stack.add(c);
  });
  place(stack, 0, CX);
  k.click(stack, 'skills', 'Skills', 'Alphabet blocks', 'Click to see my skills');

  // shelf 2: one big projects book
  const bookTex = k.tex(256, 330, (g, w, h) => {
    const r = g.createLinearGradient(0, 0, w, 0);
    r.addColorStop(0, '#5b1519');
    r.addColorStop(0.5, '#7a1f22');
    r.addColorStop(1, '#4d1216');
    g.fillStyle = r;
    g.fillRect(0, 0, w, h);
    g.fillStyle = 'rgba(230,176,74,.92)';
    [18, 26, h - 30, h - 22].forEach((y) => g.fillRect(0, y, w, 3));
    g.strokeStyle = 'rgba(230,176,74,.75)';
    g.lineWidth = 3;
    g.strokeRect(22, 48, w - 44, h - 96);
    g.fillStyle = '#f2dca0';
    g.textAlign = 'center';
    g.font = 'bold 40px sans-serif';
    g.fillText('PROJECTS', w / 2, h / 2 + 4);
    g.font = '600 20px sans-serif';
    g.fillStyle = 'rgba(242,220,160,.85)';
    g.fillText('ALL MY BUILDS', w / 2, h / 2 + 40);
    g.font = 'bold 26px sans-serif';
    g.fillText('</>', w / 2, h / 2 - 42);
  });
  const book = new THREE.Group();
  BX(book, 0.95, 1.25, 0.72, M(0x7a1f22, { r: 0.7 }), 0, 0.625, 0);
  PL(book, 0.95, 1.25, k.basic(bookTex), 0, 0.625, 0.365);
  BX(book, 0.05, 0.3, 0.02, M(0xd8232a, { r: 0.5 }), 0.28, 1.1, 0.372);
  book.position.set(-7.35, SY[1], -5.9);
  scene.add(book);
  k.click(book, 'projects', 'Projects', 'All projects', 'Click to open my projects');

  // Lego F1 car
  const car = new THREE.Group();
  const red = M(0xd8232a, { r: 0.3 }), wht = M(0xf2f2f2, { r: 0.3 }), blk = M(0x14161a, { r: 0.4 }), yel = M(0xf2d02a, { r: 0.3 });
  BX(car, 0.9, 0.12, 0.26, red, 0, 0.17, 0);
  BX(car, 0.3, 0.09, 0.15, red, 0.55, 0.14, 0);
  BX(car, 0.08, 0.03, 0.52, red, 0.72, 0.08, 0);
  [-1, 1].forEach((s) => {
    BX(car, 0.1, 0.1, 0.02, wht, 0.72, 0.12, s * 0.26);
    BX(car, 0.14, 0.15, 0.02, wht, -0.5, 0.43, s * 0.24);
  });
  BX(car, 0.12, 0.03, 0.48, red, -0.5, 0.5, 0);
  [-1, 1].forEach((s) => BX(car, 0.03, 0.2, 0.03, blk, -0.5, 0.34, s * 0.1));
  BX(car, 0.3, 0.15, 0.2, wht, -0.15, 0.29, 0);
  BX(car, 0.3, 0.02, 0.2, red, -0.15, 0.37, 0);
  BX(car, 0.2, 0.05, 0.16, blk, 0.17, 0.25, 0);
  SP(car, 0.07, yel, 0.14, 0.31, 0);
  const wheels: [number, number, number, number][] = [[0.38, 0.12, 0.2, 0.12], [0.38, 0.12, -0.2, 0.12], [-0.4, 0.14, 0.21, 0.14], [-0.4, 0.14, -0.21, 0.14]];
  wheels.forEach(([x, y, z, r]) => {
    CY(car, r, r, 0.13, blk, x, y, z, 18).rotation.x = PI / 2;
    CY(car, r * 0.45, r * 0.45, 0.14, M(0xb9c0c7, { m: 0.5 }), x, y, z, 10).rotation.x = PI / 2;
  });
  const studs: [number, number][] = [[0.5, 0.03], [0.58, -0.03], [0.45, -0.04], [-0.2, 0.07], [-0.2, -0.07], [-0.35, 0.07], [-0.35, -0.07]];
  studs.forEach(([x, z], i) => CY(car, 0.035, 0.035, 0.03, i < 3 ? red : i < 5 ? wht : red, x, i < 3 ? 0.205 : 0.23, z, 8));
  car.scale.set(0.9, 0.9, 0.9);
  car.position.set(-5.65, SY[1], -5.78);
  car.rotation.y = -0.38;
  scene.add(car);

  // shelf 3: trophy for certificates
  const trophy = new THREE.Group();
  BX(trophy, 0.5, 0.12, 0.5, M(0x1e2430), 0, 0.06, 0);
  BX(trophy, 0.38, 0.1, 0.38, GOLD, 0, 0.17, 0);
  CY(trophy, 0.05, 0.07, 0.4, GOLD, 0, 0.42, 0, 12);
  CY(trophy, 0.3, 0.12, 0.4, GOLD, 0, 0.82, 0, 20);
  [-1, 1].forEach((s) => {
    const h = new THREE.Mesh(new THREE.TorusGeometry(0.15, 0.03, 8, 16), GOLD);
    h.position.set(s * 0.32, 0.85, 0);
    trophy.add(h);
  });
  const star = new THREE.Mesh(new THREE.OctahedronGeometry(0.1), new THREE.MeshBasicMaterial({ color: 0xffe27a }));
  star.position.y = 1.15;
  trophy.add(star);
  trophy.scale.set(0.95, 0.95, 0.95);
  place(trophy, 2, CX);
  k.click(trophy, 'certs', 'Certificates', 'Trophy', 'Click to see certificates');
  k.meta(trophy).s0 = 0.95;

  return { trophyStar: star };
}
