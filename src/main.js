import { createApp } from "vue";
import "./styles/index.scss";
import App from "./App.vue";
import { createPinia } from "pinia";
import { router } from "./views/routes.js";

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);

app.mount("#app");
