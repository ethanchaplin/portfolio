<script setup lang="ts">
import { onMounted, onBeforeMount, ref } from "vue";
import Cookie from "js-cookie";
let loaded = ref(false);
let numDots = ref(0);

const emit = defineEmits(["loaded"]);

onBeforeMount(() => {
  if (Cookie.get("loaded") !== undefined) {
    loaded.value = true;
  } else {
    Cookie.set("loaded", "loaded");
  }
});
onMounted(() => {
  requestAnimationFrame(step);

  let start: DOMHighResTimeStamp;
  let done = false;
  function step(timestamp: DOMHighResTimeStamp) {
    if (start === undefined) {
      start = timestamp;
    }
    const elapsed = timestamp - start;

    numDots.value = elapsed / 200;

    if (elapsed < 1500) {
      // Stop the animation after 10 seconds
      if (!done) {
        window.requestAnimationFrame(step);
      }
    } else {
      done = true;
      loaded.value = true;
      emit("loaded");
    }
  }
});
</script>

<template>
  <Transition>
    <div v-if="!loaded" class="ascii">
      <p>Loading {{ ".".repeat(numDots % 4) }}</p>
    </div>
  </Transition>
</template>

<style scoped>
.ascii {
  font-family: Consolas;
  position: fixed;
  z-index: 8;
  top: 45vh;
  left: 45vw;
  font-size: 1.5rem;
  margin: 0;
}
.v-leave-active {
  transition: opacity 0.25s ease;
}

.v-leave-to {
  opacity: 0;
}
</style>
