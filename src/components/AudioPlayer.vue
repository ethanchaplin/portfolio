<script lang="ts" setup>
import { ref } from 'vue';

const props = defineProps<{
  src: string;
  title: string;
  subtitle?: string;
}>();

const audioRef = ref<HTMLAudioElement | null>(null);
const isPlaying = ref(false);
const currentTime = ref(0);
const duration = ref(0);

function formatTime(seconds: number): string {
  if (!isFinite(seconds)) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function togglePlay() {
  if (!audioRef.value) return;
  if (isPlaying.value) {
    audioRef.value.pause();
  } else {
    audioRef.value.play();
  }
}

function onTimeUpdate() {
  if (!audioRef.value) return;
  currentTime.value = audioRef.value.currentTime;
}

function onLoadedMetadata() {
  if (!audioRef.value) return;
  duration.value = audioRef.value.duration;
}

function onEnded() {
  isPlaying.value = false;
  if (audioRef.value) audioRef.value.currentTime = 0;
  currentTime.value = 0;
}

function seek(e: MouseEvent) {
  if (!audioRef.value || !duration.value) return;
  const bar = e.currentTarget as HTMLElement;
  const rect = bar.getBoundingClientRect();
  const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
  audioRef.value.currentTime = ratio * duration.value;
}

const progress = () => duration.value ? (currentTime.value / duration.value) * 100 : 0;
</script>

<template>
  <audio ref="audioRef" :src="props.src" preload="metadata" @timeupdate="onTimeUpdate"
    @loadedmetadata="onLoadedMetadata" @ended="onEnded" @play="isPlaying = true" @pause="isPlaying = false" />

  <div class="audio-player bg-neutral-900/60 border border-amber-400/20 rounded-xl px-5 py-4 flex flex-col gap-3">
    <!-- Title + time -->
    <div class="flex items-start justify-between gap-3">
      <div>
        <p class="text-sm font-semibold text-white leading-tight">{{ props.title }}</p>
        <p v-if="props.subtitle" class="text-xs text-neutral-500 mt-0.5">{{ props.subtitle }}</p>
      </div>
      <span class="text-xs font-mono text-neutral-500 shrink-0 pt-0.5 tabular-nums">
        {{ formatTime(currentTime) }} / {{ formatTime(duration) }}
      </span>
    </div>

    <!-- Controls -->
    <div class="flex items-center gap-4">
      <!-- Play / Pause -->
      <button @click="togglePlay"
        class="play-btn shrink-0 w-9 h-9 rounded-full border border-amber-400/40 flex items-center justify-center text-amber-400 hover:bg-amber-400/10 hover:border-amber-400 transition-all"
        :aria-label="isPlaying ? 'Pause' : 'Play'">
        <svg v-if="!isPlaying" class="w-4 h-4 ml-0.5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 5v14l11-7z" />
        </svg>
        <svg v-else class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
        </svg>
      </button>

      <!-- Progress bar -->
      <div class="progress-track flex-1 h-1.5 bg-neutral-700/60 rounded-full cursor-pointer relative group"
        @click="seek">
        <div class="h-full bg-amber-400 rounded-full pointer-events-none" :style="{ width: progress() + '%' }" />
        <div
          class="scrubber absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 bg-amber-400 rounded-full shadow-[0_0_8px_rgba(251,191,36,0.6)] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
          :style="{ left: progress() + '%' }" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.audio-player {
  transition: border-color 0.2s, background 0.2s;
}

.audio-player:hover {
  border-color: rgba(251, 191, 36, 0.4);
  background: rgba(251, 191, 36, 0.03);
}

.play-btn {
  transition: background 0.15s, border-color 0.15s, transform 0.1s;
}

.play-btn:active {
  transform: scale(0.9);
}
</style>
