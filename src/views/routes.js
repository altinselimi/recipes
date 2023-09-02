import Dashboard from "./Dashboard.vue";
import Recipe from "./Recipe.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
	{
		name: "DashboardRoute",
		path: "/home",
		component: Dashboard,
	},
	{
		name: "RecipeRoute",
		component: Recipe,
		path: "/meal/:id",
		props: true,
	},
];

export const router = createRouter({
	history: createWebHistory(),
	routes,
});
