import { createApp } from 'vue';
import App from './App.vue';

import router from './router';

const app = createApp(App);
app.use(router);
app.mount('#app');

document.title = import.meta.env.VITE_APP_TITLE;
