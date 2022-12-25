import { createApp } from 'vue';
import App from './App.vue';
import router from '/src/router/index.js';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserTie } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faUserTie);

createApp(App).use(router).component('font-awesome-icon', FontAwesomeIcon).mount('#app');
