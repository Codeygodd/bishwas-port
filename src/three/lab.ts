import * as THREE from 'three';
import { STATIONS } from '@/data/stations';
import type { PanelId } from '@/lib/types';
import { npt } from '@/lib/time';
import { Kit, sm, type ClickMeta, type GlowMeta } from './kit';
import { buildRoom } from './room';
import { buildDecor } from './decor';
import { buildDesk, type ScreenLine } from './desk';
import { buildShelf } from './shelf';
import { buildBoards, type BoardContent } from './boards';
import { Bird } from './bird';
import { Ambience } from './ambience';

export interface HoverTip { kind: string; title: string; hint: string; x: number; y: number }

export interface LabHandlers {
  onOpen(id: PanelId, arg?: number): void;
  onCard(index: number): void;
  onStationName(name: string): void;
  onHover(tip: HoverTip | null): void;
  onLights(on: boolean): void;
  onReady(): void;
  onFail(reason: string): void;
  onRecover?(): void;
}

export interface LabContent extends BoardContent {
  role: string;
  /** letter + colour for each alphabet block on the first shelf */
  blocks: [string, string][];
  /** the looping "Ask my AI" demo on the monitor */
  screen: ScreenLine[];
}

export interface Lab {
  dispose(): void;
  setLights(on: boolean): void;
  toggleLights(): void;
  flyBird(): void;
  setCovered(on: boolean): void;
  goToStation(index: number): void;
}

const mq = (q: string): boolean => {
  try { return typeof window.matchMedia === 'function' && window.matchMedia(q).matches; } catch { return false; }
};

function hasWebGL(): boolean {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch { return false; }
}

/** Builds the whole interactive room on the given canvas. Returns null when WebGL is unavailable. */
export function createLab(canvas: HTMLCanvasElement, content: LabContent, h: LabHandlers): Lab | null {
  if (!hasWebGL()) { h.onFail('WebGL is not available'); return null; }

  const PI = Math.PI;
  const IS_TOUCH = mq('(hover: none)');
  const RM = mq('(prefers-reduced-motion: reduce)');
  let isSmall = mq('(max-width: 700px)');
  const devDpr = window.devicePixelRatio || 1;

  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: !(isSmall && devDpr >= 2.5), powerPreference: 'high-performance' });
  } catch (e) { h.onFail(String(e)); return null; }

  // ---- adaptive resolution: never below 1x, up to 2x on sharp screens ----
  let dprMax = isSmall ? Math.min(1.75, Math.max(devDpr, 1.25)) : Math.min(2, Math.max(devDpr, 1.5));
  const dprMin = 1;
  let dpr = dprMax;
  let ambience: Ambience | null = null;
  renderer.setPixelRatio(dpr);
  renderer.setSize(innerWidth, innerHeight, false);
  const setDpr = (v: number) => {
    dpr = v;
    renderer.setPixelRatio(v);
    renderer.setSize(innerWidth, innerHeight, false);
    if (ambience) ambience.starMat.size = 1.1 * v;
  };

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x03070d);
  scene.fog = new THREE.FogExp2(0x03070d, 0.008);
  const camera = new THREE.PerspectiveCamera(55, innerWidth / innerHeight, 0.2, 200);

  const kit = new Kit(scene, {
    maxAniso: Math.min(8, renderer.capabilities.getMaxAnisotropy() || 1),
    maxTex: renderer.capabilities.maxTextureSize || 2048,
    isSmall,
  });

  // ---- lights ----
  const amb = new THREE.AmbientLight(0x5a7a9a, 0.9);
  const hemi = new THREE.HemisphereLight(0x8fb0d8, 0x2a1a10, 0.8);
  const moon = new THREE.DirectionalLight(0x8fb4ff, 0.5);
  moon.position.set(-12, 6, -1);
  const tL1 = new THREE.PointLight(0xf4f8ff, 1.5, 36);
  const tL2 = new THREE.PointLight(0xf4f8ff, 1.5, 36);
  tL1.position.set(-4, 8, -3.5);
  tL2.position.set(4, 8, -3.5);
  const lampL = new THREE.PointLight(0xffb454, 1.8, 14);
  lampL.position.set(-2.6, 3.9, -3.1);
  const scrL = new THREE.PointLight(0x35d0ff, 0.9, 9);
  scrL.position.set(0, 4.4, -3.3);
  scene.add(amb, hemi, moon, tL1, tL2, lampL, scrL);

  // ---- build the room ----
  const room = buildRoom(kit);
  buildDecor(kit, content.role);
  const desk = buildDesk(kit, content.screen);
  const shelf = buildShelf(kit, content.blocks);
  const boards = buildBoards(kit, content);
  const bird = new Bird(kit);
  ambience = new Ambience(scene, isSmall, dpr);

  // ---- light state ----
  const t0 = performance.now();
  let tubeOn = false, lampOn = true, tubeV = 0, lampV = 1, tubeT0 = -9;
  const emitLights = () => h.onLights(tubeOn || lampOn);
  const setTube = (v: boolean) => { tubeOn = v; if (v) tubeT0 = (performance.now() - t0) / 1000; emitLights(); };
  const setLamp = (v: boolean) => { lampOn = v; emitLights(); };

  // ---- input ----
  const mouse = new THREE.Vector2(9, 9);
  const ray = new THREE.Raycaster();
  let mx = 0, my = 0, sx = 0, sy = 0, cx = 0, cy = 0, moved = false;
  let hover: THREE.Object3D | null = null;

  const pick = (): THREE.Object3D | null => {
    ray.setFromCamera(mouse, camera);
    const hits = ray.intersectObjects(kit.clicks, true);
    if (!hits.length) return null;
    let o: THREE.Object3D | null = hits[0].object;
    while (o && !o.userData.act) o = o.parent;
    return o;
  };
  const onPointerMove = (e: PointerEvent) => {
    if (e.pointerType === 'touch') return;
    cx = e.clientX; cy = e.clientY;
    mx = (cx / innerWidth) * 2 - 1;
    my = (cy / innerHeight) * 2 - 1;
    mouse.set(mx, -my);
    moved = true;
  };
  const onClick = (e: MouseEvent) => {
    mouse.set((e.clientX / innerWidth) * 2 - 1, -(e.clientY / innerHeight) * 2 + 1);
    const o = pick();
    if (!o) return;
    const m = kit.meta(o);
    if (m.act === 'sw-tube') setTube(!tubeOn);
    else if (m.act === 'sw-lamp') setLamp(!lampOn);
    else h.onOpen(m.act as PanelId, m.arg);
  };

  // ---- scroll-driven tour ----
  const NS = STATIONS.length - 1;
  let tgt = 0, pr = 0;
  const onScroll = () => {
    const m = document.documentElement.scrollHeight - innerHeight;
    tgt = m > 0 ? Math.min(1, Math.max(0, scrollY / m)) : 0;
  };

  // ---- resize / framing ----
  let fw = 0, fh = 0;
  const fit = () => {
    isSmall = mq('(max-width: 700px)');
    const w = innerWidth, hh = innerHeight;
    camera.aspect = w / hh;
    camera.fov = camera.aspect < 1 ? 56 + (1 - camera.aspect) * 18 : 55;
    const portraitPhone = isSmall && camera.aspect < 1;
    room.ext.visible = portraitPhone;
    if (portraitPhone) camera.setViewOffset(w, hh, 0, Math.round(hh * 0.13), w, hh);
    else camera.clearViewOffset();
    camera.updateProjectionMatrix();
    // ignore tiny height changes (mobile URL bar) so the buffer is not re-allocated while scrolling
    if (!fw || !isSmall || w !== fw || Math.abs(hh - fh) >= 140) { fw = w; fh = hh; renderer.setSize(w, hh, false); }
  };
  const onOrient = () => { window.setTimeout(fit, 250); };

  const onLost = (e: Event) => { e.preventDefault(); h.onFail('context lost'); };
  const onRestored = () => h.onRecover?.();

  addEventListener('pointermove', onPointerMove);
  canvas.addEventListener('click', onClick);
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', fit);
  addEventListener('orientationchange', onOrient);
  canvas.addEventListener('webglcontextlost', onLost);
  canvas.addEventListener('webglcontextrestored', onRestored);
  fit();
  onScroll();

  // ---- loop ----
  const KS = [0.5, 0.55, 0.55, 0.55, 0.55, 0.55];
  const a1 = new THREE.Vector3(), a2 = new THREE.Vector3(), cp = new THREE.Vector3(), cl = new THREE.Vector3();
  const b1 = new THREE.Vector3(), b2 = new THREE.Vector3();
  // direct 'fly-to' blend so jumping to a station never replays the stations in between
  const lastCp = new THREE.Vector3(0, 5.8, 14.5), lastCl = new THREE.Vector3(0, 4.2, -3);
  const fromCp = new THREE.Vector3(), fromCl = new THREE.Vector3();
  let jb = 1;
  const offC = new THREE.Color(0x7a858f), onC = new THREE.Color(0xffffff);
  let lastDraw = -1, first = true, fpsT = 0, fpsN = 0, slowN = 0, fastN = 0, warm = 0, raised = false;
  let covered = false, skipN = 0;
  let lastNow = 0, lastCard = -1, lastName = '', raf = 0, disposed = false, errOnce = false;

  const frame = (now: number): void => {
    if (disposed) return;
    raf = requestAnimationFrame(frame);
    // a bottom sheet hides most of the room on phones: render at half rate while it is open
    if (covered && isSmall && (skipN++ & 1)) return;
    try {
      const t = Math.max(0, (now - t0) / 1000) || 0;
      const dt = Math.min(0.05, Math.max(0.001, (now - lastNow) / 1000 || 0.016));
      lastNow = now;
      const e60 = (a: number) => 1 - Math.pow(1 - a, dt * 60);

      // adaptive resolution
      if (!fpsT) fpsT = now;
      fpsN++;
      if (now - fpsT > 1500) {
        const fps = (fpsN * 1000) / (now - fpsT);
        fpsN = 0; fpsT = now; warm++;
        if (warm > 2 && !document.hidden && !covered) {
          if (fps < 40) { slowN++; fastN = 0; } else if (fps > 52) { fastN++; slowN = 0; } else { slowN = 0; fastN = 0; }
          if (slowN >= 2 && dpr > dprMin) { setDpr(Math.max(dprMin, dpr - 0.25)); if (raised) { dprMax = dpr; raised = false; } slowN = 0; fastN = 0; }
          else if (fastN >= 10 && dpr < dprMax) { setDpr(Math.min(dprMax, dpr + 0.25)); raised = true; fastN = 0; }
        }
      }

      // camera along the tour
      pr += (tgt - pr) * e60(0.06);
      const seg = pr * NS, i = Math.min(NS - 1, Math.floor(seg)), k = sm(seg - i);
      a1.fromArray(STATIONS[i].c); a2.fromArray(STATIONS[i + 1].c); cp.lerpVectors(a1, a2, k);
      b1.fromArray(STATIONS[i].l); b2.fromArray(STATIONS[i + 1].l); cl.lerpVectors(b1, b2, k);
      const asp = camera.aspect;
      let f = asp < 1.2 ? Math.min(2.1, 1 + (1.2 - asp) * 1.1) : 1;
      if (f > 1) f = 1 + (f - 1) * (KS[i] + (KS[i + 1] - KS[i]) * k);
      cp.sub(cl).multiplyScalar(f).add(cl);
      if (jb < 1) {
        jb = Math.min(1, jb + dt / 1.1);
        const w = sm(jb);
        cp.lerpVectors(fromCp, cp, w);
        cl.lerpVectors(fromCl, cl, w);
      }
      lastCp.copy(cp);
      lastCl.copy(cl);
      sx += (mx - sx) * e60(0.07);
      sy += (my - sy) * e60(0.07);
      let lx = sx, ly = sy;
      if (IS_TOUCH && !RM) { lx = Math.sin(t * 0.25) * 0.35; ly = Math.sin(t * 0.18) * 0.12; }
      camera.position.set(cp.x + lx * 0.5, cp.y - ly * 0.25 + (RM ? 0 : Math.sin(t * 0.7) * 0.05), cp.z);
      camera.lookAt(cl.x + lx * 0.3, cl.y - ly * 0.15, cl.z);

      // lights: tube flickers on, lamp fades
      if (tubeOn) {
        const age = t - tubeT0;
        const v = RM || age >= 0.6 ? 1 : age > 0.04 && Math.sin(age * 75) > -0.15 ? 1 : 0.08;
        tubeV += (v - tubeV) * e60(0.6);
      } else tubeV += (0 - tubeV) * e60(0.25);
      lampV += ((lampOn ? 1 : 0) - lampV) * e60(0.18);
      amb.intensity = 0.12 + 0.8 * tubeV;
      hemi.intensity = 0.06 + 0.78 * tubeV;
      tL1.intensity = tL2.intensity = 1.6 * tubeV;
      lampL.intensity = 1.9 * lampV;
      room.tubeMat.color.lerpColors(offC, onC, tubeV);
      desk.shadeM.emissiveIntensity = 0.08 + 0.9 * lampV;
      desk.bulbM.color.setRGB(0.25 + 0.75 * lampV, 0.22 + 0.7 * lampV, 0.18 + 0.6 * lampV);
      (desk.pool.material as THREE.MeshBasicMaterial).opacity = 0.55 * lampV;
      scrL.intensity = 0.9 + 0.9 * (1 - tubeV);
      room.rkT.rotation.x += ((tubeOn ? -0.4 : 0.4) - room.rkT.rotation.x) * e60(0.25);
      room.rkL.rotation.x += ((lampOn ? -0.4 : 0.4) - room.rkL.rotation.x) * e60(0.25);
      for (const s of kit.glows) {
        const u = s.userData as GlowMeta;
        const m = u.kind === 'tube' ? tubeV : u.kind === 'lamp' ? lampV : 1 + (1 - tubeV) * 0.9;
        s.material.opacity = Math.min(1, u.base * m);
      }
      room.ledM.color.setHSL((t * 0.04) % 1, 0.85, 0.6);
      room.hexes.forEach((hx, n) => (hx.material as THREE.MeshBasicMaterial).color.setHSL((t * 0.05 + n * 0.08) % 1, 0.85, 0.58));

      // monitor + clock
      if (t - lastDraw > (isSmall ? 0.2 : 0.12)) { desk.drawScreen(t); lastDraw = t; }
      const d = npt();
      const sec = d.getUTCSeconds() + d.getUTCMilliseconds() / 1000;
      const mn = d.getUTCMinutes() + sec / 60;
      const hr = (d.getUTCHours() % 12) + mn / 60;
      boards.secondHand.rotation.z = (-sec / 60) * 6.2832;
      boards.minuteHand.rotation.z = (-mn / 60) * 6.2832;
      boards.hourHand.rotation.z = (-hr / 12) * 6.2832;

      // small animations
      desk.toyHead.rotation.y = Math.sin(t * 0.8) * 0.25;
      desk.toyArm.rotation.z = -2.5 + Math.sin(t * 5) * 0.25;
      bird.update(t);
      desk.fans.forEach((fn, j) => { fn.rotation.z = t * (2 + j); });
      shelf.trophyStar.rotation.y = t * 0.9;
      ambience?.update(t);

      // UI sync
      const ci = Math.min(NS, Math.floor(tgt * (NS + 1)));
      if (ci !== lastCard) { lastCard = ci; h.onCard(ci); }
      const name = STATIONS[Math.round(pr * NS)].name;
      if (name !== lastName) { lastName = name; h.onStationName(name); }

      // hover
      if (moved && !IS_TOUCH) {
        moved = false;
        const o = pick();
        hover = o;
        canvas.style.cursor = o ? 'pointer' : 'default';
        if (o) { const [kind, title, hint] = kit.meta(o).tip; h.onHover({ kind, title, hint, x: cx, y: cy }); } else h.onHover(null);
      }
      const ee = e60(0.2);
      for (const o of kit.clicks) {
        const m = o.userData as ClickMeta;
        if (m.nohover) continue;
        const s0 = m.s0 || 1;
        const s = o === hover ? s0 * 1.06 : s0;
        o.scale.x += (s - o.scale.x) * ee;
        o.scale.y += (s - o.scale.y) * ee;
        o.scale.z += (s - o.scale.z) * ee;
      }

      renderer.render(scene, camera);
      if (first) { first = false; h.onReady(); }
    } catch (err) {
      if (!errOnce) { errOnce = true; console.error(err); }
    }
  };
  raf = requestAnimationFrame(frame);

  void PI;
  return {
    setLights(on) { setTube(on); setLamp(on); },
    toggleLights() { const on = !(tubeOn || lampOn); setTube(on); setLamp(on); },
    flyBird() { bird.fly(); },
    setCovered(on) { covered = on; fpsN = 0; fpsT = 0; slowN = 0; fastN = 0; },
    goToStation(index) {
      const m = document.documentElement.scrollHeight - innerHeight;
      if (m <= 0) return;
      // blend straight from where the camera is now to the target station
      fromCp.copy(lastCp);
      fromCl.copy(lastCl);
      jb = 0;
      tgt = index / NS;
      pr = tgt;
      window.scrollTo({ top: m * tgt, behavior: 'instant' });
    },
    dispose() {
      disposed = true;
      cancelAnimationFrame(raf);
      removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('click', onClick);
      removeEventListener('scroll', onScroll);
      removeEventListener('resize', fit);
      removeEventListener('orientationchange', onOrient);
      canvas.removeEventListener('webglcontextlost', onLost);
      canvas.removeEventListener('webglcontextrestored', onRestored);
      kit.dispose();
      renderer.dispose();
    },
  };
}
