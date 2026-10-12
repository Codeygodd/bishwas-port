import * as THREE from 'three';
import { rnd } from './kit';

/** Drifting dust, steam over the mug and a night-sky star dome. */
export class Ambience {
  readonly starMat: THREE.PointsMaterial;
  private readonly dustPos: Float32Array;
  private readonly dustBase: [number, number, number][] = [];
  private readonly dustGeo = new THREE.BufferGeometry();
  private readonly steamPos: Float32Array;
  private readonly steamGeo = new THREE.BufferGeometry();
  private readonly dustCount: number;
  private static readonly STEAM = 14;

  constructor(scene: THREE.Scene, isSmall: boolean, pixelRatio: number) {
    this.dustCount = isSmall ? 60 : 140;
    this.dustPos = new Float32Array(this.dustCount * 3);
    for (let i = 0; i < this.dustCount; i++) this.dustBase.push([(rnd() - 0.5) * 18, rnd() * 7 + 0.5, (rnd() - 0.5) * 11 - 1]);
    this.dustGeo.setAttribute('position', new THREE.BufferAttribute(this.dustPos, 3));
    const dust = new THREE.Points(this.dustGeo, new THREE.PointsMaterial({ color: 0xffe9c0, size: 0.05, transparent: true, opacity: 0.6, depthWrite: false }));
    dust.frustumCulled = false;
    scene.add(dust);

    this.steamPos = new Float32Array(Ambience.STEAM * 3);
    this.steamGeo.setAttribute('position', new THREE.BufferAttribute(this.steamPos, 3));
    const steam = new THREE.Points(this.steamGeo, new THREE.PointsMaterial({ color: 0xffffff, size: 0.12, transparent: true, opacity: 0.35, depthWrite: false }));
    steam.frustumCulled = false;
    scene.add(steam);

    const stars: number[] = [];
    for (let i = 0; i < (isSmall ? 250 : 500); i++) {
      const u = rnd() * 6.283, v = rnd() * 1.3 + 0.1;
      stars.push(Math.cos(u) * Math.cos(v) * 90, Math.sin(v) * 90 + 10, Math.sin(u) * Math.cos(v) * 90);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(stars, 3));
    this.starMat = new THREE.PointsMaterial({ color: 0xffffff, size: 1.1 * pixelRatio, sizeAttenuation: false, fog: false, transparent: true, opacity: 0.7 });
    scene.add(new THREE.Points(geo, this.starMat));
  }

  update(t: number): void {
    const p = this.dustPos;
    for (let q = 0; q < this.dustCount; q++) {
      const b = this.dustBase[q];
      p[q * 3] = b[0] + Math.sin(t * 0.2 + q) * 0.4;
      p[q * 3 + 1] = b[1] + Math.sin(t * 0.3 + q * 1.7) * 0.25;
      p[q * 3 + 2] = b[2] + Math.cos(t * 0.15 + q) * 0.4;
    }
    this.dustGeo.attributes.position.needsUpdate = true;
    const n = Ambience.STEAM;
    for (let w = 0; w < n; w++) {
      const u = (t * 0.35 + w / n) % 1;
      this.steamPos[w * 3] = -1.35 + Math.sin(u * 6 + w) * 0.08;
      this.steamPos[w * 3 + 1] = 3.15 + u * 1.1;
      this.steamPos[w * 3 + 2] = -3.3 + Math.cos(u * 5 + w) * 0.08;
    }
    this.steamGeo.attributes.position.needsUpdate = true;
  }
}
