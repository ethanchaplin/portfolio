import { createApp } from "vue";
import "./style.css";
import Home from "./views/home/Home.vue";
import PerfectScrollbar from "vue3-perfect-scrollbar";
import { createRouter, createWebHistory } from "vue-router";
import "vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css";
import App from "./App.vue";
import YearInReview from "./views/year-in-review/YearInReview.vue";
import FirstYear from "./views/year-in-review/years/FirstYear.vue";
import SecondYear from "./views/year-in-review/years/SecondYear.vue";
import paper from "paper";

const routes = [
  { path: "/", component: Home },
  { path: "/yearreview", component: YearInReview },
  { path: "/yearreview/firstyear", component: FirstYear },
  { path: "/yearreview/secondyear", component: SecondYear },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App).use(PerfectScrollbar).use(router).use(paper).mount("#app");
