<script lang="ts" setup>
import { computed } from 'vue';
import { GUITAR_PRACTICE_LOG } from './practice_log';

const totalMinutes = computed(() =>
  GUITAR_PRACTICE_LOG.reduce((sum, e) => sum + e.duration_minutes, 0)
);

const groupedLog = computed(() => {
  const groups = new Map<string, typeof GUITAR_PRACTICE_LOG>();
  for (const entry of GUITAR_PRACTICE_LOG) {
    const d = new Date(entry.date);
    const key = d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(entry);
  }
  return [...groups.entries()];
});
</script>

<template>
  <div class="pt-28 pb-24 px-6 max-w-2xl mx-auto text-left">

    <router-link :to="{ name: 'guitar' }" class="text-xs text-neutral-500 hover:text-white transition-colors mb-8 inline-block">
      ← Back to Guitar
    </router-link>

    <!-- Header -->
    <div class="mb-14 text-center">
      <p class="text-xs text-amber-400 uppercase tracking-widest mb-2 font-semibold">Honors Project</p>
      <h1 class="text-4xl font-bold mb-1">Guitar Practice Log</h1>
      <p class="text-neutral-400 text-sm">August 2025 &mdash; February 2026</p>

      <div class="flex justify-center gap-12 mt-8">
        <div class="text-center">
          <p class="text-3xl font-bold text-amber-400">{{ GUITAR_PRACTICE_LOG.length }}</p>
          <p class="text-xs text-neutral-400 uppercase tracking-wider mt-1">Sessions</p>
        </div>
        <div class="text-center">
          <p class="text-3xl font-bold text-amber-400">
            {{ Math.floor(totalMinutes / 60) }}<span class="text-lg font-normal">h</span>
            {{ totalMinutes % 60 }}<span class="text-lg font-normal">m</span>
          </p>
          <p class="text-xs text-neutral-400 uppercase tracking-wider mt-1">Total Practice</p>
        </div>
      </div>
    </div>

    <!-- Monthly groups -->
    <div v-for="([month, entries]) in groupedLog" :key="month" class="mb-12">
      <div class="flex items-center gap-3 mb-5">
        <h2 class="text-sm font-bold text-amber-400 uppercase tracking-widest whitespace-nowrap">{{ month }}</h2>
        <div class="flex-1 h-px bg-amber-400/20"></div>
        <span class="text-xs text-neutral-500 whitespace-nowrap">
          {{ entries.reduce((s, e) => s + e.duration_minutes, 0) }} min
        </span>
      </div>

      <div class="flex flex-col gap-3">
        <div
          v-for="entry in entries"
          :key="entry.date"
          class="entry-card bg-neutral-900/60 border-l-2 border-amber-400 rounded-r-xl px-5 py-4"
        >
          <div class="flex items-center justify-between gap-4 mb-2.5">
            <h3 class="font-semibold text-white text-sm leading-tight">{{ entry.title }}</h3>
            <span class="shrink-0 text-xs bg-amber-400/10 text-amber-300 border border-amber-400/25 rounded-full px-2.5 py-0.5 font-mono">
              {{ entry.duration_minutes }}m
            </span>
          </div>
          <ul class="space-y-1.5">
            <li
              v-for="item in entry.log_items"
              :key="item"
              class="text-sm text-neutral-300 flex items-start gap-2"
            >
              <span class="text-amber-500 mt-0.5 text-xs leading-none">&#9654;</span>
              <span>{{ item }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="text-center mt-4 text-neutral-500 text-xs">
      {{ Math.floor(totalMinutes / 60) }} hours {{ totalMinutes % 60 }} minutes logged across {{ GUITAR_PRACTICE_LOG.length }} sessions
    </div>

  </div>
</template>

<style scoped>
.entry-card {
  transition: border-color 0.2s, background 0.2s;
}

.entry-card:hover {
  border-color: rgb(251 191 36);
  background: rgba(251, 191, 36, 0.05);
}
</style>
