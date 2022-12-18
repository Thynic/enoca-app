import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
	{
		path: "/",
		name: "home",
		component: HomeView,
	},
	{
		path: "/details/:id",
		name: "details",
		component: () =>
			import(/* webpackChunkName: "tasks" */ "../views/DetailsView.vue"),
	},
	{
		path: "/search/:query",
		name: "search",
		component: () =>
			import(/* webpackChunkName: "tasks" */ "../views/SearchView.vue"),
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
	scrollBehavior() {
		return { top: 0 };
	},
});

export default router;
