<script setup>
import MealIcon from "./MealIcon.vue";
import { MapPin as MapPinIcon } from "lucide-vue-next";
import { useNativeTransitions } from "../views/useNativeTransitions.js";
import { useRouter } from "vue-router";
import { useMealsStore } from "../store/meals.store.js";
import { ref } from "vue";

const props = defineProps(["data"]);
const emit = defineEmits(["select"]);
const { runViewTransition } = useNativeTransitions();
const mealTitleRef = ref(null);
const mealImageRef = ref(null);
const router = useRouter();
const mealsStore = useMealsStore();

const goToMealDetails = () => {
	mealsStore.addMealToStore(props.data);
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
		emit("select");
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
		class="search-result__wrapper"
		@click="goToMealDetails()"
		@keydown.enter="goToMealDetails()"
		tabindex="0"
	>
		<img
			ref="mealImageRef"
			loading="lazy"
			:src="data?.strMealThumb"
			alt=""
		/>
		<div class="search-result__description">
			<h4 ref="mealTitleRef">{{ data?.strMeal }}</h4>
			<div class="search-result__meta">
				<div>
					<MealIcon :type="data.strCategory.toLowerCase()" />
					<span style="margin-left: 8px">
						{{ data.strCategory }}
					</span>
				</div>
				<div>
					<MapPinIcon />
					<span style="margin-left: 8px">
						{{ data.strArea }}
					</span>
				</div>
			</div>
		</div>
		<slot></slot>
	</li>
</template>
<style lang="scss">
.search-result {
	&__wrapper {
		display: flex;
		align-items: flex-start;
		border-radius: 8px;
		background-color: white;
		overflow: hidden;
		cursor: pointer;
		img {
			width: 80px;
			height: 80px;
		}
		h4 {
			font-size: 1.1rem;
			font-weight: 300;
		}
	}
	&__description {
		padding: 10px;
	}
	&__meta {
		display: flex;
		font-size: 1rem;
		margin-top: 5px;
		font-weight: 300;
		> div {
			display: inline-flex;
			align-items: center;
			margin-right: 10px;
		}
		svg {
			width: 20px;
			height: 20px;
			stroke: var(--grey);
		}
	}
}
</style>
