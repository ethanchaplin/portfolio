<script setup lang="ts">
import { useRouter } from "vue-router";
import { ref, onBeforeMount, } from 'vue';
import { Card, CardBody, CardHeader, Image } from "@nextui-org/react";
import { applyPureReactInVue, applyReactInVue } from 'veaury';
const VueCard = applyPureReactInVue(Card);
const VueCardHeader = applyPureReactInVue(CardHeader);
const VueCardBody = applyReactInVue(CardBody);
const VueImage = applyPureReactInVue(Image);

let router = useRouter();

const albumYearUrls = ref<string[][]>([]);
const albumYears = [
  [
    { artist: "Valley", album: "Maybe" },
    { artist: "Relient K", album: "Forget And Not Slow Down" },
    { artist: "Coldplay", album: "Music of the Spheres" },
    { artist: "John Mayer", album: "Sob Rock" },
  ],
  [
    { artist: "half alive", album: "Conditions of A Punk" },
    { artist: "Coldplay", album: "Parachutes" },
    { artist: "bad suns", album: "Apocalypse Whenever" },
    { artist: "Dayglow", album: "People In Motion" }
  ],
  [
    { artist: "Relient K", album: "Mmhmm" },
    { artist: "The Band CAMINO", album: "tryhard" },
    { artist: "The Brook and the Bluff", album: "Bluebeard" },
    { artist: "The Strike", album: "The Lost Years" }]
];

const creditHours = [
  34,
  16,
  16
]

const titles = [
  "Getting Used To A New Life",
  "Full Swing",
  "Experimentation",
];

const routeToReview = (index: number) => {
  router.push({ name: ["year-one", "year-two", "year-three"][index] })
}

onBeforeMount(async () => {
  for (let i = 0; i < albumYears.length; i += 1) {
    const year: string[] = [];
    for (let j = 0; j < albumYears[i].length; j += 1) {
      // @ts-ignore
      const response = await albumArt(albumYears[i][j].artist, { album: albumYears[i][j].album });
      year.push(response as string);
    }
    albumYearUrls.value.push(year);
  }
});
</script>

<template>

  <head>
    <title>Ethan Chaplin — Year In Review</title>
  </head>
  <div class="absolute z-0 wave">
    <img src="/src/assets/wave.png">
  </div>
  <div class="flex items-center h-full justify-evenly">
    <VueCard v-for="(_, index) in albumYearUrls.length" :isPressable="true" :isBlurred="true"
      :className="`py-4 border-none bg-background/60 dark:bg-default-100/50 hover-card max-w-sm`"
      :onPress="() => routeToReview(index)">
      <VueCardHeader :className="`pb-0 pt-2 px-4 flex-col items-start`">
        <p class="text-small uppercase font-bold">{{ titles[index] }}</p>
        <small class="text-default-500">{{ creditHours[index] }} Tracks</small>
        <h4 class="font-bold text-3xl">Year {{ index + 1 }}</h4>
      </VueCardHeader>
      <VueCardBody :className="`overflow-visible py-2 grid grid-cols-2`">
        <VueImage v-for="(_, corner) in 4" alt="Card background" :className="`object-cover rounded-xl col-span-1`"
          :src="albumYearUrls[index][corner]" :width=270 />
      </VueCardBody>
    </VueCard>
  </div>
</template>

<style scoped>
.wave {
  bottom: 0;
}
</style>
