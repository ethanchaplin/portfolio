<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import albumArt from 'album-art';

const router = useRouter();

const albums = [
  { artist: "half alive", album: "Conditions of A Punk" },
  { artist: "Coldplay", album: "Parachutes" },
  { artist: "bad suns", album: "Apocalypse Whenever" },
  { artist: "Dayglow", album: "People In Motion" },
];

const favorites = [
  "half•alive — Back Around",
  "Coldplay — Shiver",
  "Bad Suns — Summer Lightning",
  "Dayglow — Like She Does",
];

const albumUrls = ref<string[]>(Array(albums.length).fill(''));

onMounted(() => {
  Promise.all(
    albums.map((entry, i) =>
      albumArt(entry.artist, { album: entry.album })
        .then(url => { albumUrls.value[i] = url as string; })
        .catch(() => { albumUrls.value[i] = ''; })
    )
  );
});
</script>

<template>

  <div class="pt-28 pb-24 px-8 max-w-4xl mx-auto text-left">

    <button @click="router.push('/yearreview')"
      class="text-xs text-neutral-500 hover:text-white transition-colors mb-8 inline-block bg-transparent border-none cursor-pointer p-0">
      ← Back to Year in Review
    </button>

    <!-- Header -->
    <div class="mb-12">
      <p class="text-xs text-emerald-400 uppercase tracking-widest mb-2 font-semibold">Year 2 of 4</p>
      <h1 class="text-5xl font-bold mb-3">Sophomore Year</h1>
      <p class="text-lg text-neutral-400 italic">"Full Swing"</p>
    </div>

    <!-- Soundtrack -->
    <div class="section-header mb-5">
      <h2 class="text-sm font-bold text-emerald-400 uppercase tracking-widest whitespace-nowrap">Soundtrack</h2>
      <div class="flex-1 h-px bg-emerald-400/20"></div>
    </div>
    <div class="grid grid-cols-4 gap-4 mb-12">
      <div v-for="(entry, i) in albums" :key="i" class="flex flex-col gap-2">
        <div class="aspect-square rounded-lg overflow-hidden bg-neutral-800">
          <img v-if="albumUrls[i]" :src="albumUrls[i]" :alt="`${entry.album} by ${entry.artist}`"
            class="w-full h-full object-cover" />
        </div>
        <p class="text-xs font-semibold text-white truncate">{{ entry.album }}</p>
        <p class="text-xs text-neutral-500 truncate -mt-1">{{ entry.artist }}</p>
      </div>
    </div>

    <!-- Favorites -->
    <div class="section-header mb-5">
      <h2 class="text-sm font-bold text-emerald-400 uppercase tracking-widest whitespace-nowrap">Favorite Tracks</h2>
      <div class="flex-1 h-px bg-emerald-400/20"></div>
    </div>
    <ol class="flex flex-col gap-3 mb-12">
      <li v-for="(item, i) in favorites" :key="i" class="flex items-start gap-4 group">
        <span class="text-xs text-emerald-400/60 font-mono pt-0.5 w-5 shrink-0">{{ String(i + 1).padStart(2, '0')
        }}</span>
        <span class="text-sm text-neutral-300 group-hover:text-white transition-colors">{{ item }}</span>
      </li>
    </ol>

    <!-- Liner Notes -->
    <div class="section-header mb-5">
      <h2 class="text-sm font-bold text-emerald-400 uppercase tracking-widest whitespace-nowrap">Liner Notes</h2>
      <div class="flex-1 h-px bg-emerald-400/20"></div>
    </div>
    <div class="flex flex-col gap-5">
      <p class="text-base text-neutral-200 leading-relaxed">
        If I said that my second year at the University of Cincinnati was decently busy, I would be selling it
        <b>way</b> short. This was the year that a lot of the seeds I had planted my freshman year took sprout,
        and boy was there a lot to harvest.
      </p>
      <p class="text-base text-neutral-200 leading-relaxed">
        To start, I was blessed with the opportunity to co-op at Genetesis, a medical imaging firm located in
        Mason, OH. It was here that I got to experience working in a professional software position for the first
        time. I had no idea what to expect going in, but it was a wonderful experience through and through. My
        co-workers were some of the nicest people I've had the pleasure of working with. They let me take a
        hybrid schedule — in office on Monday, Wednesday, and Friday, remote on Tuesday and Thursday. This not
        only saved on gas, but broke up the daily monotony in a great way. I often parked myself at a local
        coffee shop until noon, then headed back to my apartment to finish the day.
      </p>
      <p class="text-base text-neutral-200 leading-relaxed">
        Having 9-to-5 responsibilities meant my free time got a whole lot more free, and I could invest in
        relationships and passion projects I hadn't had time for before. I began working with my friends Jarrett
        and Ashton of the band "Jady" to run lights for their performances, as they were starting to sell out
        venues in Columbus. This even led to me joining them for a show in Nashville — which also sold out, by
        the way — and that was a blast.
      </p>
      <p class="text-base text-neutral-200 leading-relaxed">
        Heading into the spring semester, I had the delight of returning to classes (you can hear the sarcasm).
        Gone was the element of temporal freedom, and adjusting to sporadic class times after a 9-to-5 schedule
        took a little doing. However, I loved what I was taking. From low-level assembly in Intro to Computer
        Systems to balanced binary trees in Data Structures, I was getting a real taste of pure computer science,
        and I was hooked.
      </p>
      <p class="text-base text-neutral-200 leading-relaxed">
        I also had the opportunity to be a TA for ENED 1120 — the required first-year engineering course that is
        the source of much student ire. Being only a year removed from it myself, I fully understood what those
        students were going through. I had a wonderful time assisting Dr. Yoona with her section and, hopefully,
        made some kind of impact. I had the privilege of making this a pre-approved Honors experience as well.
      </p>
      <p class="text-base text-neutral-200 leading-relaxed">
        Inspired by my at-the-time girlfriend, I applied for the $10,000 Taco Bell Live Más Scholarship in early
        January. The awards weren't announced until April 25, so that date lived in the back of my mind the entire
        semester. Honestly, I didn't think I was going to get it — but shots in the dark are what college is all
        about. April 25 came and went with no word from the Taco Bell Foundation. I wasn't devastated.
      </p>
      <p class="text-base text-neutral-200 leading-relaxed">
        I woke up on my birthday, April 26, to an email from the Taco Bell Foundation:
        <span class="block mt-3 text-lg font-bold text-white">"Congrats! You are a Live Más Scholarship
          recipient!"</span>
        <span class="block mt-1 text-neutral-400">It's cool or whatever.</span>
      </p>
    </div>

  </div>
</template>

<style scoped>
.section-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
</style>
