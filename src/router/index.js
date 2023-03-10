import { createRouter, createWebHistory } from 'vue-router';
import Homepage from '../views/HomePage.vue';
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import Stockpanel from '../views/Stockpanel.vue'
import StockInformation from '../views/StockInformation.vue'
import Investments from '../views/Investments.vue'

import {
	getAuth,
	onAuthStateChanged
  } from "firebase/auth";

import { useToast } from "vue-toastification";
const toast = useToast();

const routes = [
	{
		path: '/',
		name: 'Homepage',
		component: Homepage,
	},
	{
		path: '/dashboard',
		name: 'Dashboard',
		component: Dashboard,
		meta: {
			requiresAuth: true
		}
	},
	{
		path: '/stockpanel',
		name: 'Stockpanel',
		component: Stockpanel,
		meta: {
			requiresAuth: true
		}
	},
	{
		path: '/stockpanel/:symbol',
		name: 'StockInformation',
		component: StockInformation,
		props: true,
		meta: {
			requiresAuth: true
		}
	},
	{
		path: '/investments',
		name: 'Investments',
		component: Investments,
		meta: {
			requiresAuth: true
		}
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

const getCurrentUser = () => {
	return new Promise((resolve, reject) => {
		const removeListener = onAuthStateChanged(
			getAuth(),
			(user) => {
				removeListener()
				resolve(user)
			},
			reject
		)
	})
}

// Check if a user is logged in before entering a route that requires authorization. If true, enter route. If not, go to /login 
router.beforeEach(async (to, from, next) => {
	if (to.matched.some((record) => record.meta.requiresAuth)) {
		if (await getCurrentUser()) {
			next();
		} else {
			toast("Log in to access the menu")
			next("/login")
		}
	} else {
		next();
	}
})

export default router;
