<script lang="ts" setup></script>

<template>
  <div class="pt-28 pb-24 px-8 max-w-3xl mx-auto text-left">

    <router-link :to="{ name: 'honors-projects' }" class="text-xs text-neutral-500 hover:text-white transition-colors mb-8 inline-block">
      ← Back to Projects
    </router-link>

    <div class="mb-12 text-center">
      <p class="text-xs text-emerald-400 uppercase tracking-widest mb-2 font-semibold">Honors Seminar</p>
      <h1 class="text-4xl font-bold">Design and Programming of Pinball Machines</h1>
    </div>

    <!-- About -->
    <div class="section-header mb-5">
      <h2 class="text-sm font-bold text-emerald-400 uppercase tracking-widest whitespace-nowrap">About</h2>
      <div class="flex-1 h-px bg-emerald-400/20"></div>
    </div>
    <div class="flex flex-col gap-4 mb-12">
      <p class="text-base text-neutral-200 leading-relaxed">
        I had the pleasure of taking this Honors Seminar course in the fall of 2023. It was an absolute
        blast getting to learn the history behind some of my favorite arcade machines, and then learn about
        the mechanics underneath them. The class culminated in a team project in which we built our own
        themed pinball machine using the principles we had learned in class. Our team decided to build a
        Phineas and Ferb themed pinball machine, complete with a Doofenshmirtz Evil Incorporated tower that
        acted as a ball trap and target.
      </p>
    </div>

    <!-- Take Aways -->
    <div class="section-header mb-5">
      <h2 class="text-sm font-bold text-emerald-400 uppercase tracking-widest whitespace-nowrap">Take Aways</h2>
      <div class="flex-1 h-px bg-emerald-400/20"></div>
    </div>
    <div class="flex flex-col gap-4 mb-12">
      <p class="text-base text-neutral-200 leading-relaxed">
        One of the biggest takeaways from this class was the importance of teamwork and communication. Our
        team had to work together to design and build our pinball machine, and we had to communicate
        effectively to make sure that we were all on the same page. I learned a lot about how to work with
        others and how to communicate effectively, which are skills that I will be able to use in the future.
      </p>
      <p class="text-base text-neutral-200 leading-relaxed">
        I also got a lot more hands-on experience with soldering, programming, and general electrical
        engineering. I had done hobby projects involving Arduinos and Raspberry Pis, but this project was
        the first I had done with others to reach a final goal.
      </p>
    </div>

    <!-- Pictures -->
    <div class="section-header mb-5">
      <h2 class="text-sm font-bold text-emerald-400 uppercase tracking-widest whitespace-nowrap">Pictures</h2>
      <div class="flex-1 h-px bg-emerald-400/20"></div>
    </div>
    <img src="/src/assets/pinball.jpg" class="rounded-xl w-full" />
    <p class="text-xs text-neutral-500 mt-2 text-center">The final functional pinball machine</p>

  </div>
</template>

<style scoped>
.section-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
</style>
