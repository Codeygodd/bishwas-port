import * as THREE from 'three';

export const PI = Math.PI;
export const rnd = Math.random;

/** Smoothstep easing. */
export function sm(x: number): number {
  const v = Math.min(1, Math.max(0, x));
  return v * v * (3 - 2 * v);
}

export interface MatOpts { r?: number; m?: number; e?: number; ei?: number; t?: number }
export interface ClickMeta {
  act: string;
  tip: [string, string, string];
  arg?: number;
  nohover?: boolean;
  /** resting scale used by the hover grow effect */
  s0?: number;
}
export type GlowKind = 'tube' | 'lamp' | 'always';
export interface GlowMeta { kind: GlowKind; base: number }

export interface KitOptions { maxAniso: number; maxTex: number; isSmall: boolean }

type Ctx2D = CanvasRenderingContext2D;

/**
 * Small toolkit shared by every part of the room: cached materials, supersampled
 * canvas textures, primitive builders, glow sprites and the clickable-object registry.
 */
export class Kit {
  readonly clicks: THREE.Object3D[] = [];
  readonly glows: THREE.Sprite[] = [];
  readonly glowTex: THREE.CanvasTexture;
  readonly WOOD: THREE.MeshStandardMaterial;
  readonly DARK: THREE.MeshStandardMaterial;
  readonly GOLD: THREE.MeshStandardMaterial;
  private readonly cache = new Map<string, THREE.MeshStandardMaterial>();
  private readonly owned: { dispose(): void }[] = [];

  constructor(readonly scene: THREE.Scene, readonly opts: KitOptions) {
    this.WOOD = this.M(0x6b4a2b, { r: 0.55 });
    this.DARK = this.M(0x151a20, { r: 0.5, m: 0.4 });
    this.GOLD = this.M(0xe6b04a, { r: 0.3, m: 0.5, e: 0x3a2a00 });
    // soft radial falloff used by all fake-bloom sprites
    this.glowTex = this.tex(128, 128, (g) => {
      const r = g.createRadialGradient(64, 64, 0, 64, 64, 64);
      const stops: [number, number][] = [[0, 1], [0.1, 0.78], [0.22, 0.5], [0.38, 0.27], [0.55, 0.12], [0.72, 0.045], [0.88, 0.01], [1, 0]];
      stops.forEach(([o, a]) => r.addColorStop(o, `rgba(255,255,255,${a})`));
      g.fillStyle = r;
      g.fillRect(0, 0, 128, 128);
    });
  }

  /** Cached standard material. */
  M(c: number, o: MatOpts = {}): THREE.MeshStandardMaterial {
    const r = o.r === undefined ? 0.8 : o.r;
    const key = [c, r, o.m || 0, o.e || 0, o.ei || 1, o.t || 0].join('|');
    const hit = this.cache.get(key);
    if (hit) return hit;
    const mat = new THREE.MeshStandardMaterial({
      color: c, roughness: r, metalness: o.m || 0, emissive: o.e || 0,
      emissiveIntensity: o.ei || 1, transparent: !!o.t, opacity: o.t || 1,
    });
    this.cache.set(key, mat);
    return mat;
  }

  /** Canvas texture drawn at up to 2x for crisp text and edges, with anisotropic filtering. */
  tex(w: number, h: number, draw: (g: Ctx2D, w: number, h: number) => void): THREE.CanvasTexture {
    const S = Math.min(this.opts.isSmall ? 1.5 : 2, this.opts.maxTex / Math.max(w, h));
    const c = document.createElement('canvas');
    c.width = Math.round(w * S);
    c.height = Math.round(h * S);
    const g = c.getContext('2d');
    if (!g) throw new Error('2D canvas is not available');
    g.scale(S, S);
    draw(g, w, h);
    const t = new THREE.CanvasTexture(c);
    t.anisotropy = this.opts.maxAniso;
    this.owned.push(t);
    return t;
  }

  /** Material that shows a canvas texture without lighting. */
  basic(map: THREE.Texture, extra: THREE.MeshBasicMaterialParameters = {}): THREE.MeshBasicMaterial {
    const m = new THREE.MeshBasicMaterial({ map, ...extra });
    this.owned.push(m);
    return m;
  }

  BX(p: THREE.Object3D, w: number, h: number, d: number, m: THREE.Material, x: number, y: number, z: number): THREE.Mesh {
    const o = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m);
    o.position.set(x, y, z);
    p.add(o);
    return o;
  }

  CY(p: THREE.Object3D, rt: number, rb: number, h: number, m: THREE.Material, x: number, y: number, z: number, seg = 20): THREE.Mesh {
    const o = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg), m);
    o.position.set(x, y, z);
    p.add(o);
    return o;
  }

  SP(p: THREE.Object3D, r: number, m: THREE.Material, x: number, y: number, z: number, sx?: number, sy?: number, sz?: number): THREE.Mesh {
    const o = new THREE.Mesh(new THREE.SphereGeometry(r, 16, 12), m);
    o.position.set(x, y, z);
    if (sx !== undefined) o.scale.set(sx, sy ?? sx, sz ?? sx);
    p.add(o);
    return o;
  }

  PL(p: THREE.Object3D, w: number, h: number, m: THREE.Material, x: number, y: number, z: number, ry = 0): THREE.Mesh {
    const o = new THREE.Mesh(new THREE.PlaneGeometry(w, h), m);
    o.position.set(x, y, z);
    if (ry) o.rotation.y = ry;
    p.add(o);
    return o;
  }

  /** Marks an object as clickable (with a hover tooltip). */
  click<T extends THREE.Object3D>(o: T, act: string, kind: string, title: string, hint = 'Click to open', arg?: number): T {
    const meta: ClickMeta = { act, tip: [kind, title, hint], arg };
    Object.assign(o.userData, meta);
    this.clicks.push(o);
    return o;
  }

  meta(o: THREE.Object3D): ClickMeta {
    return o.userData as ClickMeta;
  }

  /** Additive sprite used as cheap bloom. Brightness follows the light it belongs to. */
  glow(col: number, w: number, h: number, x: number, y: number, z: number, kind: GlowKind, base: number): THREE.Sprite {
    const s = new THREE.Sprite(new THREE.SpriteMaterial({
      map: this.glowTex, color: col, blending: THREE.AdditiveBlending,
      transparent: true, depthWrite: false, depthTest: false, fog: false,
    }));
    s.renderOrder = 5;
    s.scale.set(w, h, 1);
    s.position.set(x, y, z);
    const meta: GlowMeta = { kind, base };
    Object.assign(s.userData, meta);
    this.scene.add(s);
    this.glows.push(s);
    return s;
  }

  dispose(): void {
    this.owned.forEach((o) => o.dispose());
    this.cache.forEach((m) => m.dispose());
    this.cache.clear();
    this.scene.traverse((o) => {
      const mesh = o as THREE.Mesh;
      if (mesh.geometry) mesh.geometry.dispose();
      const mat = mesh.material as THREE.Material | THREE.Material[] | undefined;
      if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
      else if (mat) mat.dispose();
    });
  }
}
