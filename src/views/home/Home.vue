<script setup lang="ts">
import Loading from "./components/Loading.vue";
import Typewriter from "typewriter-effect/dist/core";
import MovingBackground from "./components/MovingBackground.vue";
import "vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css";

import { ref } from "vue";
const professions = [
  "Software Developer",
  "Photographer",
  "Musician",
  "Lighting Designer",
  "Audio Engineer",
  "Tinkerer",
  "Experimenter",
  "Problem Solver",
];

const loaded = ref(false);

let randProfessions = professions;
randProfessions.push("Try ↑↑↓↓←→BA!");
randProfessions = randProfessions.sort(() => 0.5 - Math.random());

randProfessions.concat(professions.sort(() => 0.5 - Math.random()));

professions.push("Try pressing anywhere!");

randProfessions.concat(professions.sort(() => 0.5 - Math.random()));

const showTitle = () => {
  loaded.value = true;
  const title = document.getElementById("title");
  const typewriter = new Typewriter(title, {
    loop: false,
    delay: 55,
    wrapperClassName: "titleWrapper",
    cursorClassName: "titleCursor",
    cursor: "",
  });
  typewriter
    .typeString("Ethan Chaplin")
    .pauseFor(300)
    .callFunction(() => {
      const sect = document.getElementById("subtitle");
      const subType = new Typewriter(sect, {
        loop: true,
        autoStart: true,
        delay: 75,
        wrapperClassName: "subWrapper",
        cursorClassName: "subCursor",
        cursor: "_",
        deleteSpeed: 30,
        strings: randProfessions,
      });

      subType;
    })
    .start();
};
</script>

<template>
  <head>
    <title>Ethan Chaplin — Home Page</title>
  </head>
  <Loading @loaded="showTitle" />
  <MovingBackground>
    <div id="title" />
    <div id="subtitle" />
  </MovingBackground>
</template>

<style scoped>
.typer {
  width: 100%;
  height: 100%;
}
</style>
