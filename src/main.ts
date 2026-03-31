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
import ThirdYear from "./views/year-in-review/years/ThirdYear.vue";
import FourthYear from "./views/year-in-review/years/FourthYear.vue";
import Projects from "./views/honors-projects/Projects.vue";
import Lighting from "./views/honors-projects/Lighting.vue";
import LightingLog from "./views/honors-projects/LightingLog.vue";
import FirstTA from "./views/honors-projects/FirstTA.vue";
import SecondTA from "./views/honors-projects/SecondTA.vue";
import Pinball from "./views/honors-projects/Pinball.vue";
import Guitar from "./views/honors-projects/Guitar.vue";
import GuitarLog from "./views/honors-projects/GuitarLog.vue";

const routes = [
  { name: 'home', path: "/", component: Home },
  { name: 'year-review', path: "/yearreview", component: YearInReview },
  { name: 'year-one', path: "/yearreview/firstyear", component: FirstYear },
  { name: 'year-two', path: "/yearreview/secondyear", component: SecondYear },
  { name: 'year-three', path: "/yearreview/thirdyear", component: ThirdYear },
  { name: 'year-four', path: "/yearreview/fourthyear", component: FourthYear},
  { name: 'honors-projects', path: "/projects", component: Projects },
  { name: 'lighting-project', path: "/projects/lighting", component: Lighting },
  { name: 'lighting-log', path: "/projects/lighting/log", component: LightingLog },
  { name: 'ened-1120-ta', path: "/projects/ened-1120-ta", component: FirstTA },
  { name: 'ened-1100-ta', path: "/projects/ened-1100-ta", component: SecondTA },
  { name: 'pinball', path: "/projects/pinball", component: Pinball },
  { name: 'guitar', path: "/projects/guitar", component: Guitar },
  { name: 'guitar-log', path: "/projects/guitar/log", component: GuitarLog },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App).use(PerfectScrollbar).use(router).mount("#app");
