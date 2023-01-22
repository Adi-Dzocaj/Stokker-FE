import { createApp } from 'vue';
import App from './App.vue';

// Pinia Global Store
import { createPinia } from 'pinia';

import router from '/src/router/index.js';

// FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { faGoogle, faGithub, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faArrowDown, faArrowRight, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faGoogle, faGithub, faFacebook, faArrowDown, faArrowRight, faXmark);

// Toastification
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

// Firebase
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

initializeApp(firebaseConfig);

createApp(App).use(router).use(Toast, {
  maxToasts: 5,
}).component('font-awesome-icon', FontAwesomeIcon).use(createPinia()).mount('#app');