import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import PerfectScrollbar from "vue3-perfect-scrollbar";
import "vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css";

createApp(App).use(PerfectScrollbar).mount("#app");
