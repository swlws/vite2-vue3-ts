import { createApp } from 'vue';
import elementPlus from '~/plugin/element-plus';
import router from './router';
import App from './App.vue';

const app = createApp(App);
app.use(router);
app.use(elementPlus);
app.mount('#app');

document.title = import.meta.env.VITE_APP_TITLE;
