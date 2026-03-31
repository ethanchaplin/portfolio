<script setup lang="ts">
import { useRouter } from "vue-router";
import { ref, onBeforeMount } from 'vue';
import albumArt from 'album-art';

const router = useRouter();

const albumYears = [
  [
    { artist: "Valley",      album: "Maybe" },
    { artist: "Relient K",   album: "Forget And Not Slow Down" },
    { artist: "Coldplay",    album: "Music of the Spheres" },
    { artist: "John Mayer",  album: "Sob Rock" },
  ],
  [
    { artist: "half alive",  album: "Conditions of A Punk" },
    { artist: "Coldplay",    album: "Parachutes" },
    { artist: "bad suns",    album: "Apocalypse Whenever" },
    { artist: "Dayglow",     album: "People In Motion" },
  ],
  [
    { artist: "Relient K",               album: "Mmhmm" },
    { artist: "The Band CAMINO",         album: "tryhard" },
    { artist: "The Brook and the Bluff", album: "Bluebeard" },
    { artist: "The Strike",              album: "The Lost Years" },
  ],
  [
    { artist: "Twenty One Pilots", album: "Clancy" },
    { artist: "COIN",              album: "I'm Not Afraid Of Music Anymore" },
    { artist: "Dayglow",           album: "Dayglow" },
    { artist: "bad suns",          album: "Infinite Joy" },
  ],
];

const titles    = ["Getting Used To A New Life", "Full Swing", "Experimentation", "Challenges"];
const subtitles = ["Freshman Year", "Sophomore Year", "Pre-Junior Year", "Junior Year"];
const routes    = ["year-one", "year-two", "year-three", "year-four"];

const albumYearUrls = ref<(string | null)[][]>(
  Array.from({ length: 4 }, () => Array(4).fill(null))
);
const imageLoaded = ref<boolean[][]>(
  Array.from({ length: 4 }, () => Array(4).fill(false))
);

onBeforeMount(() => {
  albumYears.forEach((year, y) => {
    year.forEach((entry, a) => {
      albumArt(entry.artist, { album: entry.album })
        .then(url => { albumYearUrls.value[y][a] = url as string; })
        .catch(()  => { albumYearUrls.value[y][a] = ''; });
    });
  });
});
</script>

<template>
  <head>
    <title>Ethan Chaplin — Year In Review</title>
  </head>
  <div class="absolute z-0 wave">
    <img src="/src/assets/wave.png">
  </div>
  <div class="flex items-center justify-center min-h-screen py-24 px-8">
    <div class="grid grid-cols-2 gap-6 w-full max-w-3xl">
      <div
        v-for="(year, index) in albumYears"
        :key="index"
        class="year-card cursor-pointer rounded-2xl overflow-hidden"
        @click="router.push({ name: routes[index] })">
        <!-- 2×2 album grid -->
        <div class="grid grid-cols-2">
          <div v-for="(entry, corner) in year" :key="corner" class="relative aspect-square overflow-hidden">
            <!-- Skeleton with white swipe -->
            <div v-if="!imageLoaded[index][corner]" class="skeleton-cell absolute inset-0">
              <div class="swipe" />
            </div>
            <!-- Album art -->
            <img
              v-if="albumYearUrls[index][corner] !== null"
              :src="albumYearUrls[index][corner] ?? ''"
              :alt="entry.album"
              class="w-full h-full object-cover transition-opacity duration-500"
              :class="imageLoaded[index][corner] ? 'opacity-100' : 'opacity-0'"
              @load="imageLoaded[index][corner] = true" />
          </div>
        </div>
        <!-- Card footer -->
        <div class="px-4 pt-3 pb-4 text-left">
          <p class="text-xs uppercase font-bold text-white/60 tracking-widest">{{ titles[index] }}</p>
          <p class="text-neutral-500 text-xs mt-0.5">{{ subtitles[index] }}</p>
          <h4 class="font-bold text-2xl mt-1">Year {{ index + 1 }}</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wave {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  pointer-events: none;
}

.year-card {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(12px);
  transition: border-color 0.2s, transform 0.2s, box-shadow 0.2s;
}

.year-card:hover {
  border-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
}

.skeleton-cell {
  background: transparent;
  overflow: hidden;
}

.swipe {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    105deg,
    transparent 20%,
    rgba(255, 255, 255, 0.07) 35%,
    rgba(255, 255, 255, 0.18) 50%,
    rgba(255, 255, 255, 0.07) 65%,
    transparent 80%
  );
  background-size: 300% 100%;
  animation: swipe 2s ease-in-out infinite;
}

@keyframes swipe {
  0%   { background-position: 250% 0; }
  100% { background-position: -250% 0; }
}
</style>
