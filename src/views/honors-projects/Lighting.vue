<script lang="ts" setup></script>

<template>
  <div class="pt-28 pb-24 px-8 max-w-4xl mx-auto text-left">

    <router-link :to="{ name: 'honors-projects' }"
      class="back-link text-xs text-neutral-500 hover:text-white transition-colors mb-8 inline-block">
      ← Back to Projects
    </router-link>

    <div class="mb-12 text-center">
      <p class="text-xs text-amber-400 uppercase tracking-widest mb-2 font-semibold">Self-Designed Honors Project</p>
      <h1 class="text-4xl font-bold">Cross-Platform DMX Lighting Application</h1>
    </div>

    <!-- About -->
    <div class="section-header mb-5">
      <h2 class="text-sm font-bold text-amber-400 uppercase tracking-widest whitespace-nowrap">About</h2>
      <div class="flex-1 h-px bg-amber-400/20"></div>
    </div>
    <div class="flex gap-8 items-start mb-12">
      <div class="w-1/3 shrink-0">
        <img src="/src/assets/jady.jpg" class="rounded-xl w-full" />
        <p class="text-xs text-neutral-500 mt-2 text-center">Jady performing, with lights envisioned with early beta
          version of program</p>
        <p class="text-xs text-neutral-500 text-center">Credit: <a href="https://www.instagram.com/carlosmanuelstoner/"
            class="underline hover:text-white transition-colors">Carlos Emanuel Stoner</a></p>
      </div>
      <div class="flex-1 flex flex-col gap-4">
        <p class="text-base text-neutral-200 leading-relaxed text-right">
          This project started as an intersection of two of my favorite hobbies: programming and
          <a href="https://en.wikipedia.org/wiki/Stage_lighting"
            class="underline hover:text-white transition-colors">stage lighting</a>.
          I was frustrated at the fact that all <a href="https://en.wikipedia.org/wiki/DMX512"
            class="underline hover:text-white transition-colors">DMX</a>-controlling
          applications that are free are clunky and unintuitive for beginners (see
          <a href="http://www.freestylerdmx.be/" class="underline hover:text-white transition-colors">Freestyler</a>),
          and those more suited for large-scale events are
          <a href="https://www.sweetwater.com/store/detail/VistaApp512--chroma-q-vista-app-software-lighting-controller-and-512-ch-dongle"
            class="underline hover:text-white transition-colors">wildly expensive!</a>
          I resolved to create a program that was just as powerful as the greats, but at none of the cost!
        </p>
        <p class="text-base text-neutral-200 leading-relaxed text-right">
          The only cost to budding lighting operators would be a $35 interface that allows for four simultaneous
          outputs — unfathomably cheap compared to others which can range into the hundreds. While the initial
          program was to be written in C++, I found that using C# and .NET Core to be much better when dealing
          with cross-platform compilation.
        </p>
      </div>
    </div>

    <!-- Who Benefits -->
    <div class="section-header mb-5">
      <h2 class="text-sm font-bold text-amber-400 uppercase tracking-widest whitespace-nowrap">Who Benefits?</h2>
      <div class="flex-1 h-px bg-amber-400/20"></div>
    </div>
    <div class="flex gap-8 items-start mb-12">
      <div class="flex-1 flex flex-col gap-4">
        <p class="text-base text-neutral-200 leading-relaxed text-left">
          The first end-user in mind for this project was Camp Carl, a local overnight summer camp where I have
          been previously employed. I was in charge of running the lights and sound within their auditorium, and
          the system they used was not great. It had an unintuitive interface, and anyone not extensively trained
          on the board had no idea how to operate it in case something went wrong — which it often did. One such
          problem was that the board would occasionally strobe the lights when changing color or brightness, which
          is not great if you have a camper with epilepsy or other sensitivities to lights. This program was
          designed as a replacement system. [CL Pro = Camp Lighting Pro]
        </p>
        <p class="text-base text-neutral-200 leading-relaxed text-left">
          Other users in mind included budding artists such as Jady or Jay Joseph, whom I collaborated with while
          developing the software. People like them benefit greatly from the relatively inexpensive cost of
          operating lights at a noticeable scale, and this program could assist in bringing creative tools to
          anyone, regardless of financial status.
        </p>
      </div>
      <div class="w-1/3 shrink-0">
        <img src="/src/assets/del.jpg" class="rounded-xl w-full" />
        <p class="text-xs text-neutral-500 mt-2 text-center">Del Ruth performing, with lights envisioned with early beta
          version of program</p>
        <p class="text-xs text-neutral-500 text-center">Credit: <a href="https://www.instagram.com/carlosmanuelstoner/"
            class="underline hover:text-white transition-colors">Carlos Emanuel Stoner</a></p>
      </div>
    </div>

    <!-- Sample Work -->
    <div class="section-header mb-5">
      <h2 class="text-sm font-bold text-amber-400 uppercase tracking-widest whitespace-nowrap">Sample Work</h2>
      <div class="flex-1 h-px bg-amber-400/20"></div>
    </div>
    <div class="flex gap-8 items-start">
      <div class="w-1/3 shrink-0">
        <img src="/src/assets/jay.jpg" class="rounded-xl w-full" />
        <p class="text-xs text-neutral-500 mt-2 text-center">Jay Joseph performing at The Basement, with lights
          partially programmed in early beta</p>
        <p class="text-xs text-neutral-500 text-center">Credit: <a href="https://www.instagram.com/utsstudios/"
            class="underline hover:text-white transition-colors">Justin Volley</a></p>
      </div>
      <div class="flex-1 flex flex-col gap-4">
        <p class="text-base text-neutral-200 leading-relaxed text-right">
          Included here are pictures which include light shows partially programmed and envisioned within CL Pro.
          While the program in its entirety was not finished, it had enough capability to pre-program lights and
          looks, which were then transferred to another lighting program
          (<a href="https://www.dmxis.com/dmxis/" class="underline hover:text-white transition-colors">DMXis</a>).
          The <a href="https://github.com/coluris/photon" class="underline hover:text-white transition-colors">source
            code is available on GitHub</a>.
        </p>
        <router-link :to="{ name: 'lighting-log' }"
          class="inline-flex items-center gap-2 text-sm text-amber-400 hover:text-white transition-colors">
          View Progress Log →
        </router-link>
      </div>
    </div>

  </div>
</template>

<style scoped>
.section-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

a {
  color: inherit;
}
</style>
