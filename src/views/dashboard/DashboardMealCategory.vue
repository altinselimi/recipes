<script setup>
import { computed } from "vue";
import MealItem from "./MealItem.vue";
import { useMealsStore } from "@/store/meals.store.js";
import { useRouter } from "vue-router";

const props = defineProps(["data"]);

const mealsStore = useMealsStore();

mealsStore.fetchMealsByCategory(props.data.strCategory);
const mealsForCategory = computed(() =>
	mealsStore.mealsByCategory[props.data.strCategory]?.slice(0, 6),
);
</script>
<template>
	<li class="meals-by-category__wrapper">
		<h1 class="meals-by-category__title">{{ data.strCategory }} meals</h1>
		<ul class="meals-by-category__list">
			<MealItem
				:data="meal"
				v-for="meal in mealsForCategory"
				tabindex="0"
			/>
		</ul>
	</li>
</template>
<style lang="scss">
.meals-by-category {
	&__wrapper {
		display: flex;
		flex-direction: column;
	}
	&__title {
		margin-bottom: 20px;
		font-weight: 300;
	}
	&__list {
		display: flex;
		flex-wrap: wrap;
		column-gap: var(--dashboard-grid-column-gap);
		row-gap: var(--dashboard-grid-column-gap);
	}
}
</style>
