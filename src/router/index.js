import { createRouter, createWebHistory } from 'vue-router';
import Homepage from '../views/HomePage.vue';
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'

const routes = [
	{
		path: '/',
		name: 'Homepage',
		component: Homepage,
	},
	{
		path: '/register',
		name: 'Register',
		component: Register,
	},
	{
		path: '/login',
		name: 'Login',
		component: Login,
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
