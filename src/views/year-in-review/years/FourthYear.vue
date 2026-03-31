<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import albumArt from 'album-art';

const router = useRouter();

const albums = [
  { artist: "Twenty One Pilots", album: "Clancy" },
  { artist: "COIN", album: "I'm Not Afraid Of Music Anymore" },
  { artist: "Dayglow", album: "Dayglow" },
  { artist: "bad suns", album: "Infinite Joy" },
];

const favorites = [
  "Twenty One Pilots — Next Semester",
  "COIN — It's Hard To Care About Everything",
  "Dayglow — Old Friend, New Face",
  "bad suns — The One I Used To Love",
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

    <button @click="router.push('/yearreview')"
      class="text-xs text-neutral-500 hover:text-white transition-colors mb-8 inline-block bg-transparent border-none cursor-pointer p-0">
      ← Back to Year in Review
    </button>

    <!-- Header -->
    <div class="mb-12">
      <p class="text-xs text-violet-400 uppercase tracking-widest mb-2 font-semibold">Year 4 of 4</p>
      <h1 class="text-5xl font-bold mb-3">Junior Year</h1>
      <p class="text-lg text-neutral-400 italic">"Challenges"</p>
    </div>

    <!-- Soundtrack -->
    <div class="section-header mb-5">
      <h2 class="text-sm font-bold text-violet-400 uppercase tracking-widest whitespace-nowrap">Soundtrack</h2>
      <div class="flex-1 h-px bg-violet-400/20"></div>
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
      <h2 class="text-sm font-bold text-violet-400 uppercase tracking-widest whitespace-nowrap">Favorite Tracks</h2>
      <div class="flex-1 h-px bg-violet-400/20"></div>
    </div>
    <ol class="flex flex-col gap-3 mb-12">
      <li v-for="(item, i) in favorites" :key="i" class="flex items-start gap-4 group">
        <span class="text-xs text-violet-400/60 font-mono pt-0.5 w-5 shrink-0">{{ String(i + 1).padStart(2, '0')
        }}</span>
        <span class="text-sm text-neutral-300 group-hover:text-white transition-colors">{{ item }}</span>
      </li>
    </ol>

    <!-- Liner Notes -->
    <div class="section-header mb-5">
      <h2 class="text-sm font-bold text-violet-400 uppercase tracking-widest whitespace-nowrap">Liner Notes</h2>
      <div class="flex-1 h-px bg-violet-400/20"></div>
    </div>
    <div class="flex flex-col gap-5">
      <p class="text-base text-neutral-200 leading-relaxed">
        Year four was absolutely chaotic, in the best and worst of ways. It started by me finding out that most
        of my classes for the summer would be online, and that the rental agreement I had entered for the summer
        had fallen through, to no fault of my own. With two weeks until the semester started, I had to make a
        split-second decision to stay home in Akron. I discussed the one in-person course with the professor,
        and we agreed I could take it remotely since attendance wasn't mandatory. Then, five days before class
        started, I got an email that the professor was no longer teaching it and a GTA would be taking over
        instead. Oh dear. The negotiation started over — and to his credit, the TA obliged.
      </p>
      <p class="text-base text-neutral-200 leading-relaxed">
        That opened up some unexpected opportunities back in Akron: volunteering for local summer camps and
        growing more proficient in photo and video. The only roadblocks were the exams I had to take in person,
        which meant driving 3.5 hours to Cincinnati the night before, crashing at a friend's place, taking the
        exam, then driving back. Not ideal conditions for one of the hardest courses I've ever faced — but I
        made it work.
      </p>
      <p class="text-base text-neutral-200 leading-relaxed">
        On the hobby side of things, I did more travel with Jady than in any other calendar year. Just in the
        summer, we hit several cities across the Midwest and made a notable stop back in Nashville. Then in
        September I had the opportunity to fly to New York City to run a show at the Mercury Lounge — a
        well-known venue for up-and-coming artists. The two days I spent in the city were some of the coolest
        I've had in a long time, and I really hope to get back there soon.
      </p>
      <p class="text-base text-neutral-200 leading-relaxed">
        I resumed work with Genetesis in the fall and found the company's business model had evolved. While
        still focused on the diagnostic Cardioflux device, they were kickstarting a wellness platform for
        individuals to track their own heart health. The other developers were largely documenting the device
        for an upcoming FDA trial submittal — which made me the majority contributor to the wellness platform.
        It was a tremendous learning experience. Growing into tools like Stripe, writing code that would
        actually be used by real customers in a real-world context — that weight hadn't been there in
        previous co-ops.
      </p>
      <p class="text-base text-neutral-200 leading-relaxed">
        In the spring, I entered what I lovingly call "the gauntlet." Past me had decided it would be
        beneficial to stack all remaining difficult courses into one semester to "get them out of the way."
        One semester: Operating Systems, AI Fundamentals, and Theory of Formal Automata and Languages. Three
        of the most notorious classes in the entire CS program. I've never locked in to a semester like I
        did this one. I deleted all social media to eliminate distractions, and I came out the other side
        with an A in Automata, an A in Operating Systems, and an A− in AI. The dedication paid off.
      </p>
      <p class="text-base text-neutral-200 leading-relaxed">
        I don't think I've ever been bent, stretched, or pulled in a million directions the way I was this
        year. It was a boot camp in setting priorities and hitting goals — but I came out the other side all
        the better for it.
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
