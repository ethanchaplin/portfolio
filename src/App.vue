<script setup lang="ts"></script>

<template>
  <link
    rel="stylesheet"
    href="https://unicons.iconscout.com/release/v2.1.5/css/unicons.css"
  />
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
      <h3><router-link to="/">About Me</router-link></h3>
      <h3><router-link to="/yearreview">Year In Review</router-link></h3>
      <h3>
        <a href="https://ethanchaplin.com/old/projects/">Honors Projects</a>
      </h3>
      <h3><a href="https://github.com/ethanchaplin?tab=repositories">Personal Projects</a></h3>
    </div>
  </div>
  <router-view></router-view>
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
  z-index: 100;
}
.uil {
  font-size: 1.5rem;
  padding-right: 10px;
  text-decoration: none;
  color: white;
}

h3 a {
  color: inherit;
  text-decoration: none;
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
</style>
