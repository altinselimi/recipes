<script setup>
import { computed } from "vue";
import MealCategory from "./DashboardMealCategory.vue";
import MealOfTheDay from "./DashboardMealOfTheDay.vue";
import DashboardSkeleton from "../skeletons/DashboardSkeleton.vue";
import { useMealsStore } from "../store/meals.store.js";

const mealsStore = useMealsStore();

const mealCategories = computed(() => mealsStore.mealCategories);
const isLoadingData = computed(
	() => !mealsStore.mealOfTheDay || !mealCategories.value,
);
</script>
<template>
	<DashboardSkeleton v-if="isLoadingData" />
	<div class="dashboard__body-wrapper" v-else>
		<MealOfTheDay class="dashboard__meal-of-the-day" />
		<ul class="dashboard__meal-categories-list">
			<MealCategory
				class="dashboard__meal-category"
				v-for="(mealCategory, idx) in mealCategories"
				:data="mealCategory"
			/>
		</ul>
	</div>
</template>
<style lang="scss">
.dashboard {
	&__body-wrapper {
		padding: 20px;
		max-width: var(--dashboard-width);
		width: 100%;
		align-self: center;
	}
	&__meal-categories-list {
		container-type: inline-size;
	}
	&__meal-category {
		margin-bottom: 40px;
	}
	&__meal-of-the-day {
		margin-bottom: 60px;
	}
}
</style>
