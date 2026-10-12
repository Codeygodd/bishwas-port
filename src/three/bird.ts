import * as THREE from 'three';
import { Kit, PI, sm } from './kit';

type V3 = [number, number, number];
type BirdState = 'idle' | 'out' | 'gone' | 'in';

const OUT: [V3, V3, V3] = [[-9.72, 3.1, -1.2], [-9.85, 3.9, -1.9], [-9.92, 4.5, -3.0]];
const IN: [V3, V3, V3] = [[-9.92, 4.3, 0.9], [-9.85, 3.7, -0.2], [-9.72, 3.08, -1.2]];

function bezier(a: V3, b: V3, c: V3, u: number, out: THREE.Vector3): void {
  const k = 1 - u;
  out.set(
    k * k * a[0] + 2 * k * u * b[0] + u * u * c[0],
    k * k * a[1] + 2 * k * u * b[1] + u * u * c[1],
    k * k * a[2] + 2 * k * u * b[2] + u * u * c[2],
  );
}

/** The bluebird on the window sill. Click = contact form; sending a message makes it fly off with an envelope. */
export class Bird {
  readonly group = new THREE.Group();
  private state: BirdState = 'idle';
  private t0 = 0;
  private startPending = false;
  private readonly body = new THREE.Group();
  private readonly head = new THREE.Group();
  private readonly wingL = new THREE.Group();
  private readonly wingR = new THREE.Group();
  private readonly tail: THREE.Mesh;
  private readonly eyes: THREE.Mesh[];
  private readonly envelope = new THREE.Group();
  private readonly tmp = new THREE.Vector3();

  constructor(k: Kit) {
    const BX = k.BX.bind(k), CY = k.CY.bind(k), SP = k.SP.bind(k), M = k.M.bind(k);
    const bird = this.group;
    const blue = M(0x3a7bd5, { r: 0.6 }), dark = M(0x2a5db0, { r: 0.6 }), orange = M(0xf6a04d, { r: 0.7 });
    const black = M(0x0b0b0e, { r: 0.3 }), yellow = M(0xffc83d, { r: 0.5 });
    bird.add(this.body);
    SP(this.body, 0.18, blue, 0, 0.24, 0, 1.25, 1, 0.9);
    SP(this.body, 0.15, orange, 0.05, 0.2, 0, 1.1, 0.9, 0.85);
    this.head.position.set(0.2, 0.4, 0);
    this.body.add(this.head);
    SP(this.head, 0.12, blue, 0, 0, 0);
    const beak = new THREE.Mesh(new THREE.ConeGeometry(0.035, 0.1, 8), yellow);
    beak.rotation.z = -PI / 2;
    beak.position.set(0.14, -0.01, 0);
    this.head.add(beak);
    this.eyes = [SP(this.head, 0.022, black, 0.07, 0.03, 0.07), SP(this.head, 0.022, black, 0.07, 0.03, -0.07)];
    BX(this.envelope, 0.14, 0.1, 0.012, M(0xffffff, { r: 0.5 }), 0, 0, 0);
    SP(this.envelope, 0.02, M(0xd33a3a), 0, 0, 0.012);
    this.envelope.position.set(0.2, -0.06, 0);
    this.envelope.visible = false;
    this.head.add(this.envelope);
    this.wingL.position.set(-0.02, 0.28, 0.14);
    this.wingR.position.set(-0.02, 0.28, -0.14);
    SP(this.wingL, 0.13, dark, -0.02, 0, 0.08, 1.2, 0.22, 0.7);
    SP(this.wingR, 0.13, dark, -0.02, 0, -0.08, 1.2, 0.22, 0.7);
    this.body.add(this.wingL, this.wingR);
    this.tail = BX(this.body, 0.26, 0.03, 0.1, dark, -0.3, 0.22, 0);
    this.tail.rotation.z = 0.2;
    [-1, 1].forEach((s) => CY(bird, 0.014, 0.014, 0.14, orange, 0, 0.07, s * 0.05, 6));
    bird.position.set(-9.72, 3.01, -1.2);
    bird.scale.set(1.3, 1.3, 1.3);
    k.scene.add(bird);
    bird.userData.nohover = 1;
    k.click(bird, 'contact', 'Contact', 'The bird on the sill', 'Click to send me a message');
  }

  /** Deliver a message: bird picks up an envelope and flies out of the window. */
  fly(): void {
    if (this.state !== 'idle') return;
    this.state = 'out';
    this.startPending = true;
    this.envelope.visible = true;
  }

  private flap(t: number, amp: number): void {
    this.wingL.rotation.x = Math.sin(t * 24) * amp;
    this.wingR.rotation.x = -Math.sin(t * 24) * amp;
  }

  update(t: number): void {
    if (this.startPending) { this.t0 = t; this.startPending = false; }
    const d = t - this.t0;
    const bird = this.group;
    if (this.state === 'idle') {
      bird.position.set(-9.72, 3.01, -1.2);
      bird.scale.set(1.3, 1.3, 1.3);
      bird.rotation.set(0, 0, 0);
      this.wingL.rotation.x = this.wingR.rotation.x = 0;
      this.head.rotation.z = Math.sin(t * 1.3) * 0.15;
      this.head.rotation.y = Math.sin(t * 0.6) * 0.5;
      this.body.position.y = Math.sin(t * 2.2) * 0.006;
      this.tail.rotation.z = 0.2 + Math.sin(t * 3) * 0.05;
      const blink = t % 4.3 < 0.12 ? 0.1 : 1;
      this.eyes[0].scale.y = this.eyes[1].scale.y = blink;
    } else if (this.state === 'out') {
      const u = Math.min(1, d / 2.6), e = sm(u);
      bezier(OUT[0], OUT[1], OUT[2], e, this.tmp);
      bird.position.copy(this.tmp);
      bird.position.y += Math.sin(u * PI * 5) * 0.05;
      const s = 1.3 * (1 - 0.9 * e);
      bird.scale.set(s, s, s);
      bird.rotation.y = (PI / 2) * sm(u * 3);
      bird.rotation.z = 0.25 * Math.sin(u * PI);
      this.flap(t, 0.9);
      this.head.rotation.set(0, 0, 0);
      if (u >= 1) { this.state = 'gone'; this.t0 = t; bird.visible = false; this.envelope.visible = false; }
    } else if (this.state === 'gone') {
      if (d > 2.2) { this.state = 'in'; this.t0 = t; bird.visible = true; }
    } else {
      const u = Math.min(1, d / 2.4), e = sm(u);
      bezier(IN[0], IN[1], IN[2], e, this.tmp);
      bird.position.copy(this.tmp);
      const s = 1.3 * (0.1 + 0.9 * e);
      bird.scale.set(s, s, s);
      bird.rotation.y = (PI / 2) * (1 - sm(Math.max(0, (u - 0.7) / 0.3)));
      bird.rotation.z = -0.2 * Math.sin(u * PI);
      this.flap(t, u < 0.9 ? 0.9 : 0.9 * (1 - u) * 10);
      if (u >= 1) this.state = 'idle';
    }
  }
}
