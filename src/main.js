import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import router from '/src/router/index.js';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserTie,  } from '@fortawesome/free-solid-svg-icons';
import { faGoogle, faGithub, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faUserTie, faGoogle, faGithub, faFacebook);

createApp(App).use(router).component('font-awesome-icon', FontAwesomeIcon).use(createPinia()).mount('#app');
