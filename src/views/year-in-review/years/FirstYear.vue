<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import albumArt from 'album-art';

const router = useRouter();

const albums = [
  { artist: "Valley", album: "Maybe" },
  { artist: "Relient K", album: "Forget And Not Slow Down" },
  { artist: "Coldplay", album: "Music of the Spheres" },
  { artist: "John Mayer", album: "Sob Rock" },
];

const favorites = [
  "Valley - Closer To The Picture",
  "Relient K - Savannah",
  "Coldplay - Coloratura",
  "John Mayer - Til the Right One Comes",
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
      <p class="text-xs text-sky-400 uppercase tracking-widest mb-2 font-semibold">Year 1 of 4</p>
      <h1 class="text-5xl font-bold mb-3">Freshman Year</h1>
      <p class="text-lg text-neutral-400 italic">"Getting Used To A New Life"</p>
    </div>

    <!-- Soundtrack -->
    <div class="section-header mb-5">
      <h2 class="text-sm font-bold text-sky-400 uppercase tracking-widest whitespace-nowrap">Soundtrack</h2>
      <div class="flex-1 h-px bg-sky-400/20"></div>
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
      <h2 class="text-sm font-bold text-sky-400 uppercase tracking-widest whitespace-nowrap">Favorite Tracks</h2>
      <div class="flex-1 h-px bg-sky-400/20"></div>
    </div>
    <ol class="flex flex-col gap-3 mb-12">
      <li v-for="(item, i) in favorites" :key="i" class="flex items-start gap-4 group">
        <span class="text-xs text-sky-400/60 font-mono pt-0.5 w-5 shrink-0">{{ String(i + 1).padStart(2, '0') }}</span>
        <span class="text-sm text-neutral-300 group-hover:text-white transition-colors">{{ item }}</span>
      </li>
    </ol>

    <!-- Liner Notes -->
    <div class="section-header mb-5">
      <h2 class="text-sm font-bold text-sky-400 uppercase tracking-widest whitespace-nowrap">Liner Notes</h2>
      <div class="flex-1 h-px bg-sky-400/20"></div>
    </div>
    <div class="flex flex-col gap-5">
      <p class="text-base text-neutral-200 leading-relaxed">
        As a freshman going into your first year of college, you are most likely filled to the brim with tips
        and advice about navigating life on campus, in classes, and everywhere else you go. I know this was me
        in the summer months of 2021 as I prepared to start my first semester at the University of Cincinnati.
        It was hard for me to take all the encouragement to heart, as I had yet to experience spending more than
        a week at a time away from my hometown. My previous life as a person growing up in Tallmadge was ingrained
        into the fiber of my being and imagining another life outside of it seemed unlikely. To aid the transition
        of being away from home so much, I worked as an overnight summer camp counselor from May to August, away
        from home for 75% of the time — but weekends were still an opportunity to come home and recharge.
      </p>
      <p class="text-base text-neutral-200 leading-relaxed">
        The first weekend on campus was one of the hardest for me, because it solidified the notion that
        physically I was now on my own. Obviously, my parents would be one call away, but a 250-mile,
        4-hour drive up I-71 meant that if I wasn't actively dying, I would be the one leading the charge
        on problems and decision making. This had been something I dreamed about for years, but the
        realization of it struck very sharply that first weekend.
      </p>
      <p class="text-base text-neutral-200 leading-relaxed">
        Like a new sailor on the seas, it took a bit of time for me to gain my "campus legs". Learning what
        routines and activities fit my schedule on a weekly-to-monthly basis, as well as balancing social and
        academic circles, did not come easily — it took some trial and error to find what worked. There were
        times when the homesickness would strike, and the fear of having made the wrong choice about college
        was all too common. But I planted my feet and told myself this was the place I was supposed to be.
        By keeping my head level, I was able to navigate those doubts and continued to perform well in both
        academic and social contexts.
      </p>
      <p class="text-base text-neutral-200 leading-relaxed">
        I remember the anxiety I felt on move-in day, with a crowd of 40,000 new faces I had never seen before.
        Since none of my close friends from home had chosen Cincinnati, I was essentially on my own. However,
        leaving campus for the final time on that brisk Friday morning in April, I realized how much I had grown
        into the school and my new life — and that no matter how many first days I would experience again on
        that campus, I would never feel that same fear of isolation. With my parents still by my side through
        it all, even if not physically, and with the community of friends I had built around me, I was never
        truly alone.
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
