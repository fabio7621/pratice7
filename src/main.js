import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import axios from "axios";
import VueAxios from "vue-axios";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
app.use(VueAxios, axios);

import { date, currency } from "@/methods/filters";
//引入另外建立的方法且在全域上用
app.config.globalProperties.$filters = {
  date,
  currency,
};
