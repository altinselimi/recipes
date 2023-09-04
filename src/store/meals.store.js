import { defineStore } from "pinia";

export const useMealsStore = defineStore("mealsStore", {
	state: () => ({
		mealOfTheDay: null,
		meals: null,
		mealCategories: null,
		mealsByCategory: {},
		mealsById: {},
		bookmarkedMeals:
			JSON.parse(localStorage.getItem("moorbanBookmarks")) || [],
		isSearching: false,
		isBrowsingBookmarks: false,
	}),
	actions: {
		fetchMeals() {},
		fetchRandomMeal() {
			return fetch("https://themealdb.com/api/json/v1/1/random.php")
				.then((res) => res.json())
				.then((res) => {
					this.mealOfTheDay = res.meals[0];
					this.mealsById[this.mealOfTheDay.idMeal] = res.meals[0];
					return res;
				});
		},
		fetchMealDetails(id) {
			return fetch(
				`https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
			)
				.then((res) => res.json())
				.then((res) => {
					this.mealsById[id] = res.meals[0];
					return res.meals[0];
				});
		},
		fetchMealByName(name) {
			return fetch(
				`https://themealdb.com/api/json/v1/1/search.php?s=${name}`,
			).then((res) => res.json());
		},
		fetchMealCategories() {
			return fetch(`https://themealdb.com/api/json/v1/1/categories.php`)
				.then((res) => res.json())
				.then((res) => {
					this.mealCategories = res.categories;
					return res;
				});
		},
		fetchMealsByCategory(category) {
			return fetch(
				`https://themealdb.com/api/json/v1/1/filter.php?c=${category}`,
			)
				.then((res) => res.json())
				.then((res) => {
					this.mealsByCategory[category] = res.meals;
					return res;
				});
		},
		searchMealByName(name) {
			return fetch(
				`https://themealdb.com/api/json/v1/1/search.php?s=${name}`,
			)
				.then((res) => res.json())
				.then((res) => {
					return res.meals;
				});
		},
		addMealToStore(meal) {
			this.mealsById[meal.idMeal] = meal;
		},
		addToBookmarks(meal) {
			this.bookmarkedMeals.push(meal);
		},
		removeFromBookmarks(meal) {
			const currentIndex = this.bookmarkedMeals.findIndex(
				(m) => m.idMeal === meal.idMeal,
			);
			this.bookmarkedMeals.splice(currentIndex, 1);
		},
	},
});
