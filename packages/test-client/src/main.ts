import '~/tool/moniter';
import '~/tool/history';
import { createApp } from 'vue';
import elementPlus from '~/plugin/element-plus';
import { getAppTitle } from '~/tool/env';
import components from '@/components';
import App from './App.vue';
import router from './router';

const app = createApp(App);
app.use(router);
app.use(elementPlus);
app.use(components);
app.mount('#app');

document.title = getAppTitle();
