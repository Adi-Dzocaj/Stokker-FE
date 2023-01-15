import { createApp } from 'vue';
import App from './App.vue';

import { createPinia } from 'pinia';

import router from '/src/router/index.js';

// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'

// import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.js'

// FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { faGoogle, faGithub, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Toastify
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

import { initializeApp } from "firebase/app";

library.add(faGoogle, faGithub, faFacebook);

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

initializeApp(firebaseConfig);

createApp(App).use(router).use(Toast).component('font-awesome-icon', FontAwesomeIcon).use(createPinia()).mount('#app');

// .use(bootstrap)