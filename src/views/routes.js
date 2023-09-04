import Dashboard from "./dashboard/Dashboard.vue";
import Meal from "./meal/Meal.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
	{
		name: "DashboardRoute",
		path: "/home",
		component: Dashboard,
	},
	{
		name: "MealRoute",
		component: Meal,
		path: "/meal/:id",
		props: true,
	},
	{
		path: "/",
		redirect: "/home",
	},
];

export const router = createRouter({
	history: createWebHistory(),
	routes,
});
