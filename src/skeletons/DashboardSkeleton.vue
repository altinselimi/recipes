<script setup>
import MealOfTheDaySkeleton from "./DashboardMealOfTheDay.vue";
import MealCategorySkeleton from "./DashboardCategory.vue";
</script>
<template>
	<div class="dashboard__body-wrapper">
		<MealOfTheDaySkeleton />
		<ul class="dashboard__meal-categories-list" style="margin-top: 20px">
			<MealCategorySkeleton
				class="dashboard__meal-category"
				v-for="item in 5"
			/>
		</ul>
	</div>
</template>
