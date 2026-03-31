<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import albumArt from 'album-art';

const router = useRouter();

const albums = [
  { artist: "Relient K", album: "Mmhmm" },
  { artist: "The Band CAMINO", album: "tryhard" },
  { artist: "The Brook and the Bluff", album: "Bluebeard" },
  { artist: "The Strike", album: "The Lost Years" },
];

const favorites = [
  "Relient K - This Week The Trend",
  "The Band CAMINO - What I Want",
  "The Brook and the Bluff - Long Limbs",
  "The Strike - Devils in the Canyon",
];

const albumUrls = ref<string[]>(Array(albums.length).fill(''));

onMounted(() => {
  Promise.all(
    albums.map((entry, i) =>
      albumArt(entry.artist, { album: entry.album })
        .then((url: string) => { albumUrls.value[i] = url; })
        .catch(() => { albumUrls.value[i] = ''; })
    )
  );
});
</script>

<template>

  <div class="pt-28 pb-24 px-8 max-w-4xl mx-auto text-left">

    <button v-on:click="router.push('/yearreview')"
      class="text-xs text-neutral-500 hover:text-white transition-colors mb-8 inline-block bg-transparent border-none cursor-pointer p-0">
      ← Back to Year in Review
    </button>

    <!-- Header -->
    <div class="mb-12">
      <p class="text-xs text-amber-400 uppercase tracking-widest mb-2 font-semibold">Year 3 of 4</p>
      <h1 class="text-5xl font-bold mb-3">Pre-Junior Year</h1>
      <p class="text-lg text-neutral-400 italic">"Experimentation"</p>
    </div>

    <!-- Soundtrack -->
    <div class="section-header mb-5">
      <h2 class="text-sm font-bold text-amber-400 uppercase tracking-widest whitespace-nowrap">Soundtrack</h2>
      <div class="flex-1 h-px bg-amber-400/20"></div>
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
      <h2 class="text-sm font-bold text-amber-400 uppercase tracking-widest whitespace-nowrap">Favorite Tracks</h2>
      <div class="flex-1 h-px bg-amber-400/20"></div>
    </div>
    <ol class="flex flex-col gap-3 mb-12">
      <li v-for="(item, i) in favorites" :key="i" class="flex items-start gap-4 group">
        <span class="text-xs text-amber-400/60 font-mono pt-0.5 w-5 shrink-0">{{ String(i + 1).padStart(2, '0')
        }}</span>
        <span class="text-sm text-neutral-300 group-hover:text-white transition-colors">{{ item }}</span>
      </li>
    </ol>

    <!-- Liner Notes -->
    <div class="section-header mb-5">
      <h2 class="text-sm font-bold text-amber-400 uppercase tracking-widest whitespace-nowrap">Liner Notes</h2>
      <div class="flex-1 h-px bg-amber-400/20"></div>
    </div>
    <div class="flex flex-col gap-5">
      <p class="text-base text-neutral-200 leading-relaxed">
        If I'm going to be completely honest, the first part of my third year played out like a filler episode
        of a TV show. I was still working at Genetesis, but this time doing it remotely from my home in
        Tallmadge — about 3 hours away. It was advantageous to save on gas and rent, but I was missing out
        on the social side of office life. I found opportunities to head back to Cincinnati every once in a
        while, which broke up the monotony a bit.
      </p>
      <p class="text-base text-neutral-200 leading-relaxed">
        The pace picked up as I headed back down for my fall semester. Heading into August I already had an
        offer from Goodyear for a spring internship, so I knew my time in Cincinnati was limited. That acted
        as a great motivator to get out and try new things. I took an Honors Pinball Seminar — which might've
        been my favorite course of the entire semester — and the rest of my classes were becoming more major
        specific. Throughout all that, I also signed up for a hackathon with a couple of friends. Trying to
        code on no sleep is not something I'd recommend, but it was still a great experience.
      </p>
      <p class="text-base text-neutral-200 leading-relaxed">
        I headed back to Akron in the spring to start my co-op at Goodyear. The first two weeks were extremely
        slow, and I soon found out what the term "corporate" really meant. Everything was locked down, and I
        had to get permission to access the slightest thing, which cramped my productivity for a bit. Things
        picked up the pace around early February, right in time for my side projects to start taking off as
        well. I was also working with Jady for their headlining show at Newport Music Hall — the biggest show
        they had ever played. It sold 1,200 tickets, and the experience of planning and running lights for a
        packed concert like that was unlike anything else I had ever done.
      </p>
      <p class="text-base text-neutral-200 leading-relaxed">
        I really picked up more involvement in Akron during this stretch — joined a volleyball club, a
        pickleball club, and had plenty of time to hang out with old friends from home. My last day at
        Goodyear landed on my birthday, and once again I received an email from Taco Bell that my scholarship
        had renewed. Some traditions you don't see coming.
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
