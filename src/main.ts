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
import ThirdYear from "./views/year-in-review/years/ThirdYear.vue";

const routes = [
  { name: 'home', path: "/", component: Home },
  { name: 'year-review', path: "/yearreview", component: YearInReview },
  { name: 'year-one', path: "/yearreview/firstyear", component: FirstYear },
  { name: 'year-two', path: "/yearreview/secondyear", component: SecondYear },
  { name: 'year-three', path: "/yearreview/thirdyear", component: ThirdYear },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App).use(PerfectScrollbar).use(router).use(paper).mount("#app");
