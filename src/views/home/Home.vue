<script setup lang="ts">
import Loading from "./components/Loading.vue";
import Typewriter from "typewriter-effect/dist/core";
import MovingBackground from "./components/MovingBackground.vue";
// import {Button} from "@nextui-org/react";
// import {applyReactInVue} from 'veaury';
import "vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css";

import { ref } from "vue";
const professions = [
  "Software Developer",
  "Photographer",
  "Musician",
  "Lighting Designer",
  "Audio Engineer",
];

// const VueButton = applyReactInVue(Button);

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
    <div class="center-box">
      <div class="abs">
        <div id="title" />
        <div id="subtitle" />
      </div>
    </div>
  </MovingBackground>
  <!-- <div class="h-5/6" id="lower">TEST</div> -->
</template>

<style scoped>
.typer {
  width: 100%;
  height: 100%;
}
.abs {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: fit-content;
  height: fit-content;
  z-index: 5;
  backdrop-filter: blur(3px);
  padding: 3rem;
}
.center-box {
  height: 100%;
  width: 100%;
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

</style>
