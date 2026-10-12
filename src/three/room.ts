import * as THREE from 'three';
import { Kit, PI, rnd } from './kit';

export interface RoomHandles {
  /** extra ceiling/floor/wall used only on tall portrait phones */
  ext: THREE.Group;
  hexes: THREE.Mesh[];
  ledM: THREE.MeshBasicMaterial;
  tubeMat: THREE.MeshBasicMaterial;
  rkT: THREE.Group;
  rkL: THREE.Group;
}

/** Floor, walls, trims, LED strip, murals, hex panels, rug, tube light and light switches. */
export function buildRoom(k: Kit): RoomHandles {
  const { scene, BX, CY, PL, M } = bind(k);

  const floorT = k.tex(512, 512, (g, w, h) => {
    g.fillStyle = '#3b2616';
    g.fillRect(0, 0, w, h);
    for (let i = 0; i < 8; i++) {
      g.fillStyle = `rgba(${(60 + rnd() * 30) | 0},${(36 + rnd() * 20) | 0},20,.9)`;
      g.fillRect(i * 64, 0, 62, h);
      g.fillStyle = 'rgba(0,0,0,.35)';
      g.fillRect(i * 64 + 62, 0, 2, h);
    }
  });
  floorT.wrapS = floorT.wrapT = THREE.RepeatWrapping;
  floorT.repeat.set(3, 2.2);
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(20, 13), new THREE.MeshStandardMaterial({ map: floorT, roughness: 0.55 }));
  floor.rotation.x = -PI / 2;
  scene.add(floor);
  BX(scene, 20.8, 0.5, 13.8, M(0x10161c), 0, -0.27, 0);

  const wpT = k.tex(256, 256, (g, w, h) => {
    g.fillStyle = '#16303b';
    g.fillRect(0, 0, w, h);
    g.strokeStyle = 'rgba(255,255,255,.05)';
    g.lineWidth = 2;
    for (let i = -256; i < 512; i += 32) {
      g.beginPath();
      g.moveTo(i, 0);
      g.lineTo(i + 256, 256);
      g.stroke();
    }
  });
  wpT.wrapS = wpT.wrapT = THREE.RepeatWrapping;
  wpT.repeat.set(6, 2.6);
  const wallM = new THREE.MeshStandardMaterial({ map: wpT, roughness: 0.95 });
  const wall = (w: number, h: number, x: number, y: number, z: number, ry: number) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), wallM);
    m.position.set(x, y, z);
    m.rotation.y = ry;
    scene.add(m);
  };
  wall(20, 9, 0, 4.5, -6.5, 0);
  wall(13, 9, -10, 4.5, 0, PI / 2);
  wall(13, 9, 10, 4.5, 0, -PI / 2);

  const TR = M(0x0c1a20);
  BX(scene, 20.6, 0.3, 0.5, TR, 0, 9.1, -6.5);
  BX(scene, 0.5, 0.3, 13.4, TR, -10, 9.1, 0);
  BX(scene, 0.5, 0.3, 13.4, TR, 10, 9.1, 0);
  BX(scene, 20, 0.4, 0.14, TR, 0, 0.2, -6.43);
  BX(scene, 0.14, 0.4, 13, TR, -9.93, 0.2, 0);
  BX(scene, 0.14, 0.4, 13, TR, 9.93, 0.2, 0);

  // animated LED strip
  const ledM = new THREE.MeshBasicMaterial({ color: 0x35d0ff });
  BX(scene, 19.6, 0.08, 0.08, ledM, 0, 8.8, -6.42);
  BX(scene, 0.08, 0.08, 12.6, ledM, -9.92, 8.8, 0);
  BX(scene, 0.08, 0.08, 12.6, ledM, 9.92, 8.8, 0);

  // mountain murals
  const mural = k.tex(1024, 128, (g, w, h) => {
    const layers: [string, number, number][] = [['rgba(53,208,255,.22)', 0.9, 0], ['rgba(255,95,210,.18)', 0.7, 1], ['rgba(255,255,255,.2)', 0.45, 2]];
    layers.forEach(([col, amp, ph]) => {
      g.fillStyle = col;
      g.beginPath();
      g.moveTo(0, h);
      for (let x = 0; x <= w; x += 32) g.lineTo(x, h * (1 - amp * (0.35 + 0.65 * Math.abs(Math.sin(x * 0.011 + ph * 1.7 + Math.sin(x * 0.03))))));
      g.lineTo(w, h);
      g.fill();
    });
  });
  const mm = new THREE.MeshBasicMaterial({ map: mural, transparent: true, depthWrite: false });
  PL(scene, 12.4, 1.5, mm, -9.96, 7.7, 0, PI / 2);
  PL(scene, 12.4, 1.5, mm, 9.96, 7.7, 0, -PI / 2);
  PL(scene, 7, 1.1, mm, -6.4, 7.9, -6.46, 0);
  PL(scene, 7, 1.1, mm, 6.4, 8.1, -6.46, 0);

  // hex light panels (colour cycling)
  const hexes: THREE.Mesh[] = [];
  const hexRows: [number, number[]][] = [[7.8, [-0.8, 0, 0.8]], [7.11, [-1.2, -0.4, 0.4, 1.2]], [6.42, [-0.8, 0, 0.8]]];
  hexRows.forEach(([y, xs]) => xs.forEach((x) => {
    const h = new THREE.Mesh(new THREE.CylinderGeometry(0.43, 0.43, 0.06, 6), new THREE.MeshBasicMaterial({ color: 0x35d0ff }));
    h.rotation.x = PI / 2;
    h.position.set(x, y, -6.44);
    scene.add(h);
    hexes.push(h);
  }));
  k.glow(0x7bf0ff, 7, 4.2, 0, 7.1, -6.2, 'always', 0.22);

  // portrait-phone extension: higher ceiling and deeper floor so the room feels taller
  const ext = new THREE.Group();
  ext.visible = false;
  scene.add(ext);
  {
    const fl = floorT.clone();
    fl.needsUpdate = true;
    fl.repeat.set(3, 2.4);
    const f = new THREE.Mesh(new THREE.PlaneGeometry(20, 12), new THREE.MeshStandardMaterial({ map: fl, roughness: 0.55 }));
    f.rotation.x = -PI / 2;
    f.position.set(0, 0, 12.5);
    ext.add(f);
    [-1, 1].forEach((s) => {
      const w = new THREE.Mesh(new THREE.PlaneGeometry(12, 9), wallM);
      w.position.set(s * 10, 4.5, 12.5);
      w.rotation.y = -s * PI / 2;
      ext.add(w);
      BX(ext, 0.08, 0.08, 12, ledM, s * 9.92, 8.8, 12.5);
      BX(ext, 0.14, 0.4, 12, TR, s * 9.93, 0.2, 12.5);
      PL(ext, 12, 1.5, mm, s * 9.96, 7.7, 12.5, -s * PI / 2);
    });
    const c = new THREE.Mesh(new THREE.PlaneGeometry(20.6, 24.5), new THREE.MeshStandardMaterial({ color: 0x0c1a20, roughness: 0.9, side: THREE.DoubleSide }));
    c.rotation.x = PI / 2;
    c.position.set(0, 9.25, 5.75);
    ext.add(c);
  }

  // rug
  const rugT = k.tex(512, 512, (g) => {
    const cs = ['#7a1f22', '#e6b04a', '#1d4f5a', '#c4553a', '#e6b04a', '#2a1a3a'];
    cs.forEach((col, i) => {
      g.fillStyle = col;
      g.beginPath();
      g.arc(256, 256, 256 - i * 40, 0, 6.283);
      g.fill();
    });
  });
  const rug = new THREE.Mesh(new THREE.CircleGeometry(3.6, 48), new THREE.MeshStandardMaterial({ map: rugT, roughness: 1 }));
  rug.rotation.x = -PI / 2;
  rug.position.set(0, 0.02, 0.8);
  scene.add(rug);

  // ceiling tube light
  const tube = new THREE.Group();
  scene.add(tube);
  const tubeMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
  BX(tube, 6.8, 0.08, 0.55, M(0xdfe6ea, { r: 0.5 }), 0, 0, 0);
  const tb = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.13, 6.2, 16), tubeMat);
  tb.rotation.z = PI / 2;
  tb.position.set(0, -0.12, 0.05);
  tube.add(tb);
  [-3.2, 3.2].forEach((x) => {
    CY(tube, 0.16, 0.16, 0.12, M(0x2a2f36), x, -0.12, 0.05, 12).rotation.z = PI / 2;
    BX(tube, 0.12, 0.5, 0.12, M(0x2a2f36), x, 0.25, -0.05);
  });
  tube.position.set(0, 8.4, -6.1);
  k.glow(0xdff0ff, 12, 2.6, 0, 8.2, -5.9, 'tube', 0.8);
  k.glow(0xbfd8ff, 18, 6, 0, 7.6, -5.5, 'tube', 0.18);

  // wall switch plate with two rockers
  const plate = new THREE.Group();
  scene.add(plate);
  BX(plate, 0.8, 1.2, 0.08, M(0xcfd6dc, { r: 0.5 }), 0, 0, 0);
  const rocker = (y: number): THREE.Group => {
    const g = new THREE.Group();
    g.position.set(0, y, 0.06);
    BX(g, 0.26, 0.42, 0.12, M(0x2a2f36), 0, 0, 0);
    plate.add(g);
    return g;
  };
  const rkT = rocker(0.28);
  const rkL = rocker(-0.28);
  plate.position.set(-3.7, 4.3, -6.42);
  const ghost = M(0xffffff, { t: 0.001 });
  const swT = BX(plate, 0.5, 0.55, 0.2, ghost, 0, 0.28, 0.06);
  const swL = BX(plate, 0.5, 0.55, 0.2, ghost, 0, -0.28, 0.06);
  k.click(swT, 'sw-tube', 'Switch', 'Ceiling tubelight', 'Click to switch');
  k.click(swL, 'sw-lamp', 'Switch', 'Desk lamp', 'Click to switch');

  return { ext, hexes, ledM, tubeMat, rkT, rkL };
}

function bind(k: Kit) {
  return {
    scene: k.scene,
    BX: k.BX.bind(k),
    CY: k.CY.bind(k),
    PL: k.PL.bind(k),
    M: k.M.bind(k),
  };
}

export { bind as kitFns };
