import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.light.css";
import { createApp } from "vue";
import store from "./store";
import App from "./App.vue";
import router from "./router";
import "./interceptors/axios";

createApp(App).use(router).use(store).mount("#app");
