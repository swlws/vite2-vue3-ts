import { createApp } from "vue";
import App from "./App.vue";

createApp(App).mount("#app");
const a = {} as any;
console.log(a?.b?.c);
console.log(import.meta.url);
document.title = import.meta.env.VITE_APP_TITLE;
