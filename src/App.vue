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
  <link
    rel="stylesheet"
    href="https://unicons.iconscout.com/release/v2.1.5/css/unicons.css"
  />
  <Loading @loaded="showTitle" />
  <div class="nav">
    <div class="nav-left">
      <a
        target="_blank"
        rel="noreferrer noopener"
        href="https://www.linkedin.com/in/ethan-chaplin/"
        ><i class="uil uil-linkedin"> </i
      ></a>
      <a
        target="_blank"
        rel="noreferrer noopener"
        href="https://github.com/ethanchaplin/"
        ><i class="uil uil-github"></i
      ></a>
      <a
        target="_blank"
        rel="noreferrer noopener"
        href="https://www.instagram.com/ethan__chaplin/"
        ><i class="uil uil-instagram"></i
      ></a>
      <a
        target="_blank"
        rel="noreferrer noopener"
        href="mailto:chapliep@mail.uc.edu"
        ><i class="uil uil-envelope"></i
      ></a>
    </div>
    <div class="nav-right">
      <h3>About Me</h3>
      <h3>Year In Review</h3>
      <h3>Honors Projects</h3>
    </div>
  </div>
  <MovingBackground>
    <div id="title" />
    <div id="subtitle" />
  </MovingBackground>
</template>

<style scoped>
.nav {
  position: fixed;
  width: 100%;
  height: 10%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  left: 0;
  z-index: 5;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(3px);
}
.uil {
  font-size: 1.5rem;
  padding-right: 10px;
  text-decoration: none;
  color: white;
}

.nav div {
  padding: 5rem;
  display: flex;
  gap: 3rem;
}

.nav * * {
  transition: 0.3s;
}

.nav * h3:hover {
  filter: drop-shadow(0 0 0.6em #fff);
  cursor: pointer;
}

.nav * *:hover {
  cursor: pointer;
}

.nav * .uil-linkedin:hover {
  filter: drop-shadow(0 0 0.6em #00a6ff);
  color: #0077b5;
}

.nav * .uil-github:hover {
  filter: drop-shadow(0 0 0.6em #fff);
  color: #fff;
}

.nav * .uil-instagram:hover {
  filter: drop-shadow(0 0 0.6em #ff00ff);
  color: #ff00ff;
}

.nav * .uil-envelope:hover {
  filter: drop-shadow(0 0 0.6em #ffff00);
  color: #ffff00;
}

.typer {
  width: 100%;
  height: 100%;
}
</style>
