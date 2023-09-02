<script setup>
import { ref, onMounted } from "vue";
import { useNativeTransitions } from "../views/useNativeTransitions.js";
import { useRouter, useRoute } from "vue-router";
import { useMealsStore } from "../store/meals.store.js";
import { Loader as LoadingIcon } from "lucide-vue-next";

const props = defineProps(["data"]);
const { runViewTransition } = useNativeTransitions();
const mealTitleRef = ref(null);
const mealImageRef = ref(null);
const router = useRouter();
const isLoadingMealDetails = ref(false);
const mealsStore = useMealsStore();

const goToMealDetails = async () => {
	const hasData = mealsStore.mealsById[props.data.idMeal];
	if (!hasData) {
		isLoadingMealDetails.value = true;
		await mealsStore.fetchMealDetails(props.data.idMeal);
		isLoadingMealDetails.value = false;
	}
	runViewTransition([
		{
			transitionName: "meal-photo",
			domTarget: mealImageRef.value,
		},
		{
			transitionName: "meal-title",
			domTarget: mealTitleRef.value,
		},
	]).then(() => {
		router.push({
			name: "RecipeRoute",
			params: {
				id: props.data.idMeal,
			},
		});
	});
};
</script>
<template>
	<li
		class="meal-item__wrapper"
		:id="`meal-${data.idMeal}`"
		@click="goToMealDetails()"
		@keydown.enter="goToMealDetails()"
	>
		<LoadingIcon
			v-if="isLoadingMealDetails"
			class="meal-item__loading-details"
		/>
		<img
			class="meal-item__image"
			:src="data.strMealThumb"
			loading="lazy"
			ref="mealImageRef"
		/>
		<span class="meal-item__name text-truncate" ref="mealTitleRef">
			{{ data.strMeal }}
		</span>
	</li>
</template>
<style lang="scss">
.meal-item {
	&__wrapper {
		display: inline-flex;
		flex-direction: column;
		overflow: hidden;
		position: relative;
		border-radius: 12px;
		overflow: hidden;
	}
	&__loading-details {
		position: absolute;
		top: 10px;
		right: 10px;
		background-color: rgba(whitesmoke, 0.85);
		animation: linear Spin 1s infinite;
		backdrop-filter: blur(40px);
		border-radius: 50px;
		padding: 4px;
	}
	&__image {
		height: 250px;
		width: 100%;
		object-fit: cover;
	}
	&__name {
		position: absolute;
		bottom: 0px;
		left: 0px;
		background: rgba(whitesmoke, 0.85);
		backdrop-filter: blur(40px);
		width: 100%;
		padding: 14px;
		line-height: 2;
		font-weight: 600;
		font-size: 1.2rem;
		font-weight: 300;
	}
}
</style>
