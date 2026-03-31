<script lang="ts" setup>
import { ref } from 'vue';

const projects = [
  { name: "Cross-Platform Lighting Software", tag: "Software / Hardware", type: "Self-Designed", route: "lighting-project" },
  { name: "ENED 1120 Teaching Assistant", tag: "Education", type: "Pre-Approved", route: "ened-1120-ta" },
  { name: "Pinball Design and Programming", tag: "Engineering", type: "Honors Seminar", route: "pinball" },
  { name: "ENED 1100 Teaching Assistant", tag: "Education", type: "Pre-Approved", route: "ened-1100-ta" },
  { name: "Learning the Guitar", tag: "Music", type: "Self-Designed", route: "guitar" },
];

const palette: Record<string, { r: number; g: number; b: number }> = {
  "Self-Designed": { r: 255, g: 210, b: 60 },
  "Pre-Approved": { r: 20, g: 200, b: 255 },
  "Honors Seminar": { r: 60, g: 230, b: 160 },
};

const cardStyle = (type: string, hovered: boolean) => {
  const { r, g, b } = palette[type];
  return {
    background: `linear-gradient(135deg, rgba(${r},${g},${b},0.18) 0%, rgba(${r},${g},${b},0.05) 100%)`,
    borderColor: `rgba(${r},${g},${b},${hovered ? 0.85 : 0.45})`,
    boxShadow: hovered
      ? `0 0 40px 6px rgba(${r},${g},${b},0.35), inset 0 1px 0 rgba(${r},${g},${b},0.15)`
      : `0 0 14px 1px rgba(${r},${g},${b},0.12)`,
  };
};

const badgeStyle = (type: string) => {
  const { r, g, b } = palette[type];
  return {
    background: `rgba(${r},${g},${b},0.15)`,
    borderColor: `rgba(${r},${g},${b},0.4)`,
    color: `rgba(${r},${g},${b},1)`,
  };
};

const arrowStyle = (type: string, hovered: boolean) => {
  const { r, g, b } = palette[type];
  return { color: `rgba(${r},${g},${b},${hovered ? 1 : 0.4})` };
};

const hoveredIndex = ref<number | null>(null);
</script>

<template>
  <div class="pt-28 pb-24 px-6 max-w-xl mx-auto">
    <div class="mb-12 text-center">
      <p class="text-xs text-white/40 uppercase tracking-widest mb-2 font-semibold">Portfolio</p>
      <h1 class="text-4xl font-bold">Honors Projects</h1>
    </div>

    <div class="flex flex-col gap-3">
      <router-link v-for="(project, index) in projects" :key="project.name" :to="{ name: project.route }"
        class="project-link flex items-center justify-between border rounded-xl px-6 py-4 group"
        :style="cardStyle(project.type, hoveredIndex === index)" @mouseenter="hoveredIndex = index"
        @mouseleave="hoveredIndex = null">
        <div class="flex flex-col gap-1.5 text-left">
          <p class="font-semibold text-white text-sm">{{ project.name }}</p>
          <div class="flex items-center gap-2">
            <p class="text-xs text-neutral-400">{{ project.tag }}</p>
            <span class="text-neutral-600 text-xs">·</span>
            <span class="text-xs border rounded-full px-2 py-0.5 font-mono" :style="badgeStyle(project.type)">
              {{ project.type }}
            </span>
          </div>
        </div>
        <span class="transition-colors text-lg shrink-0 ml-4"
          :style="arrowStyle(project.type, hoveredIndex === index)">→</span>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.project-link {
  transition: box-shadow 0.25s ease, border-color 0.25s ease, background 0.25s ease;
  text-decoration: none;
}
</style>
