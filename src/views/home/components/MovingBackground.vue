<script setup lang="ts">
import { onMounted, ref } from "vue";
import { onBeforeRouteLeave } from "vue-router";

// ─── Config ───────────────────────────────────────────────────────────────────
const PARTICLE_COUNT = 22;
const MAX_SPEED = 0.5;
const RADIUS = 8;
const CONNECT_DIST = 250;
const NOTE_COOLDOWN = 180; // ms — prevents same ball re-triggering every frame


const BASE_FREQ = 150;

const multiplier = (note: number) => Math.pow(2, note / 12);

const NOTES = [
  // ── octave 1 ──
  { freq: BASE_FREQ, r: 255, g: 100, b: 40 }, // root  — deep orange
  { freq: BASE_FREQ * multiplier(2), r: 255, g: 235, b: 50 }, // 2 — bright yellow
  { freq: BASE_FREQ * multiplier(4), r: 50, g: 230, b: 230 }, // 4 — cyan
  { freq: BASE_FREQ * multiplier(7), r: 60, g: 130, b: 255 }, // 5  — deep blue
  { freq: BASE_FREQ * multiplier(9), r: 240, g: 60, b: 200 }, // 6 — magenta
  // ── octave 2 ──
  { freq: BASE_FREQ * 2, r: 255, g: 155, b: 60 }, // root — orange
  { freq: BASE_FREQ * multiplier(14), r: 180, g: 235, b: 80 }, // 2 — yellow-green
  { freq: BASE_FREQ * multiplier(16), r: 60, g: 200, b: 180 }, // 4 — teal
  { freq: BASE_FREQ * multiplier(19), r: 130, g: 160, b: 255 }, // 5  — periwinkle
  { freq: BASE_FREQ * multiplier(21), r: 255, g: 100, b: 200 }, // 6 — pink
  // ── octave 3 ──
  { freq: BASE_FREQ * 4, r: 255, g: 107, b: 107 }, // root  — coral
  { freq: BASE_FREQ * multiplier(26), r: 255, g: 185, b: 80 }, // 2 — amber
  { freq: BASE_FREQ * multiplier(28), r: 80, g: 220, b: 160 }, // 4 — mint
  { freq: BASE_FREQ * multiplier(31), r: 80, g: 185, b: 255 }, // 5  — sky blue
  { freq: BASE_FREQ * multiplier(33), r: 185, g: 120, b: 255 }, // 6 — violet
] as const;

// ─── Konami easter egg (brighter color mode) ──────────────────────────────────
const konamiSeq = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
let konamiIdx = 0;
let colorMode = false;

// ─── Types ────────────────────────────────────────────────────────────────────
interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  note: number;       // index into NOTES
  lastPlayed: number; // Date.now() of last sound trigger
}

let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;
let particles: Particle[] = [];
let running = true;
const muted = ref(true);

// ─── Audio ────────────────────────────────────────────────────────────────────
let audioCtx: AudioContext | null = null;
let masterGain: GainNode | null = null;

const getAudio = () => {
  if (!audioCtx) {
    audioCtx = new AudioContext();
    masterGain = audioCtx.createGain();
    // Light compression so simultaneous hits don't clip
    const comp = audioCtx.createDynamicsCompressor();
    comp.threshold.value = -20;
    comp.ratio.value = 8;
    comp.attack.value = 0.001; // fast enough to catch simultaneous collision spikes
    masterGain.connect(comp);
    comp.connect(audioCtx.destination);
  }
  if (audioCtx.state === "suspended") audioCtx.resume();
  return { ac: audioCtx, out: masterGain! };
};

const playBell = (noteIdx: number, x: number, speed: number) => {
  const { ac, out } = getAudio();
  const freq = NOTES[noteIdx].freq;
  // Lookahead large enough to survive a slow frame (GC pause, many collisions)
  const now = ac.currentTime + 0.05;

  // Velocity → gain: clamp to a soft floor so even slow hits are audible
  const gain = Math.max(0.04, Math.min(0.35, speed * 0.7));

  // Stereo pan: -1 (left) → +1 (right) based on ball x position
  const panner = ac.createStereoPanner();
  panner.pan.value = (x / canvas.width) * 2 - 1;
  panner.connect(out);

  // Fundamental — long decay
  const osc1 = ac.createOscillator();
  const env1 = ac.createGain();
  osc1.type = randV() < 0.5 ? "triangle" : "sine";
  osc1.frequency.value = freq;
  env1.gain.setValueAtTime(0.0, now);
  env1.gain.linearRampToValueAtTime(gain, now + 0.02);
  env1.gain.exponentialRampToValueAtTime(0.0001, now + 2.4);
  osc1.connect(env1).connect(panner);
  osc1.start(now);
  osc1.stop(now + 3);
};

const tryPlay = (p: Particle, speed: number) => {
  if (muted.value) return;
  const now = Date.now();
  if (now - p.lastPlayed < NOTE_COOLDOWN) return;
  p.lastPlayed = now;
  playBell(p.note, p.x, speed);
};

// ─── Particle factory ─────────────────────────────────────────────────────────
const randV = () => (Math.random() - 0.5) * MAX_SPEED * 2;

const makeParticle = (x?: number, y?: number): Particle => ({
  x: x ?? Math.random() * window.innerWidth,
  y: y ?? Math.random() * window.innerHeight,
  vx: randV(),
  vy: randV(),
  note: Math.floor(Math.random() * NOTES.length),
  lastPlayed: 0,
});

// ─── Event handlers ───────────────────────────────────────────────────────────
const onKey = (e: KeyboardEvent) => {
  if (e.key !== konamiSeq[konamiIdx]) { konamiIdx = 0; return; }
  if (++konamiIdx === konamiSeq.length) { konamiIdx = 0; colorMode = !colorMode; }
};

const onClick = (e: MouseEvent) => {
  const p = makeParticle(e.clientX, e.clientY);
  particles.push(p);
  tryPlay(p, Math.hypot(p.vx, p.vy));
};

const onResize = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};

// ─── Main loop ────────────────────────────────────────────────────────────────
const tick = () => {
  if (!running) return;
  requestAnimationFrame(tick);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Wall bounce
  for (const p of particles) {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < RADIUS) {
      p.x = RADIUS; p.vx = Math.abs(p.vx); tryPlay(p, Math.abs(p.vx));
    } else if (p.x > canvas.width - RADIUS) {
      p.x = canvas.width - RADIUS; p.vx = -Math.abs(p.vx); tryPlay(p, Math.abs(p.vx));
    }
    if (p.y < RADIUS) {
      p.y = RADIUS; p.vy = Math.abs(p.vy); tryPlay(p, Math.abs(p.vy));
    } else if (p.y > canvas.height - RADIUS) {
      p.y = canvas.height - RADIUS; p.vy = -Math.abs(p.vy); tryPlay(p, Math.abs(p.vy));
    }
  }

  // Ball–ball elastic collisions (equal mass)
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const a = particles[i], b = particles[j];
      const dx = b.x - a.x, dy = b.y - a.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist === 0 || dist >= RADIUS * 2) continue;

      const nx = dx / dist, ny = dy / dist;

      // Relative velocity along collision normal
      const dvn = (a.vx - b.vx) * nx + (a.vy - b.vy) * ny;
      if (dvn <= 0) continue; // already separating — skip

      // Swap velocity components along normal
      a.vx -= dvn * nx; a.vy -= dvn * ny;
      b.vx += dvn * nx; b.vy += dvn * ny;

      // Positional correction — push apart so they don't stick
      const correction = (RADIUS * 2 - dist) * 0.5;
      a.x -= correction * nx; a.y -= correction * ny;
      b.x += correction * nx; b.y += correction * ny;

      tryPlay(a, dvn);
      tryPlay(b, dvn);
    }
  }

  // ── Draw connections ────────────────────────────────────────────────────────
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist >= CONNECT_DIST) continue;

      const alpha = (1 - dist / CONNECT_DIST) ** 2 * 0.55;

      let lineStyle: string | CanvasGradient;
      if (colorMode) {
        const ni = NOTES[particles[i].note];
        const nj = NOTES[particles[j].note];
        const grad = ctx.createLinearGradient(
          particles[i].x, particles[i].y,
          particles[j].x, particles[j].y
        );
        grad.addColorStop(0, `rgba(${ni.r},${ni.g},${ni.b},${alpha})`);
        grad.addColorStop(1, `rgba(${nj.r},${nj.g},${nj.b},${alpha})`);
        lineStyle = grad;
      } else {
        lineStyle = `rgba(160,160,160,${alpha})`;
      }

      ctx.strokeStyle = lineStyle;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(particles[i].x, particles[i].y);
      ctx.lineTo(particles[j].x, particles[j].y);
      ctx.stroke();
    }
  }

  // ── Draw balls ──────────────────────────────────────────────────────────────
  for (const p of particles) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, RADIUS, 0, Math.PI * 2);
    if (colorMode) {
      const { r, g, b } = NOTES[p.note];
      ctx.fillStyle = `rgba(${r},${g},${b},1.0)`;
      ctx.shadowColor = `rgba(${r},${g},${b},0.9)`;
      ctx.shadowBlur = 28;
    } else {
      ctx.fillStyle = `rgba(160,160,160,1.0)`;
      ctx.shadowColor = `rgba(200,200,200,0.4)`;
      ctx.shadowBlur = 12;
    }
    ctx.fill();
    ctx.shadowBlur = 0;
  }
};

// ─── Lifecycle ────────────────────────────────────────────────────────────────
onMounted(() => {
  canvas = document.getElementById("bg-canvas") as HTMLCanvasElement;
  ctx = canvas.getContext("2d")!;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(makeParticle());

  document.addEventListener("keydown", onKey);
  document.addEventListener("click", onClick);
  window.addEventListener("resize", onResize);
  requestAnimationFrame(tick);
});

onBeforeRouteLeave(() => {
  running = false;
  document.removeEventListener("keydown", onKey);
  document.removeEventListener("click", onClick);
  window.removeEventListener("resize", onResize);
  audioCtx?.close();
});
</script>

<template>
  <canvas id="bg-canvas"></canvas>
  <slot />
  <button class="mute-btn" @click.stop="muted = !muted" :title="muted ? 'Unmute' : 'Mute'">
    <!-- Speaker off -->
    <svg v-if="muted" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path
        d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
    </svg>
    <!-- Speaker on -->
    <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path
        d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
    </svg>
  </button>
</template>

<style scoped>
#bg-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
}

.mute-btn {
  position: fixed;
  bottom: 2rem;
  left: 2rem;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.4rem;
  height: 2.4rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 0.6rem;
  color: rgba(255, 255, 255, 0.45);
  cursor: pointer;
  backdrop-filter: blur(6px);
  transition: background 0.2s, border-color 0.2s, color 0.2s;
}

.mute-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.25);
  color: rgba(255, 255, 255, 0.9);
}
</style>
