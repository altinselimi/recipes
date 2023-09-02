<script setup>
import { useRouter } from "vue-router";
import { computed, ref } from "vue";
import MealIcon from "../components/MealIcon.vue";
import { useMealsStore } from "../store/meals.store.js";
import { MapPin as MapPinIcon } from "lucide-vue-next";
import { useNativeTransitions } from "./useNativeTransitions.js";

const mealsStore = useMealsStore();
const mealOfTheDay = computed(() => mealsStore.mealOfTheDay);
const router = useRouter();
const { runViewTransition } = useNativeTransitions();
const mealImage = ref(null);
const mealTitle = ref(null);
const mealMeta = ref(null);
const mealInstructions = ref(null);
const goToMealDetails = () => {
	runViewTransition([
		{
			transitionName: "meal-photo",
			domTarget: mealImage.value,
		},
		{
			transitionName: "meal-title",
			domTarget: mealTitle.value,
		},
		{
			transitionName: "meal-meta",
			domTarget: mealMeta.value,
		},
		{
			transitionName: "meal-instructions",
			domTarget: mealInstructions.value,
		},
	]).then(() => {
		router.push({
			name: "RecipeRoute",
			params: {
				id: mealOfTheDay.value.idMeal,
			},
		});
	});
};
</script>
<template>
	<div class="meal-of-the-day__wrapper">
		<h1 class="meal-of-the-day__title">Meal of the day</h1>
		<div
			class="meal__wrapper"
			@click="goToMealDetails()"
			@keydown.enter="goToMealDetails()"
			tabindex="0"
		>
			<img
				:src="mealOfTheDay.strMealThumb"
				alt=""
				class="meal__image"
				ref="mealImage"
			/>
			<div class="meal__description">
				<div
					:style="{
						backgroundImage: `url('${mealOfTheDay.strMealThumb}')`,
					}"
					class="meal__description-bg"
				></div>
				<div class="meal__description-content">
					<h1 class="meal__title text-truncate" ref="mealTitle">
						{{ mealOfTheDay.strMeal }}
					</h1>
					<div class="meal__meta" ref="mealMeta">
						<div>
							<MealIcon
								:type="mealOfTheDay.strCategory.toLowerCase()"
							/>
							<span style="margin-left: 8px">
								{{ mealOfTheDay.strCategory }}
							</span>
						</div>
						<div>
							<MapPinIcon />
							<span style="margin-left: 8px">
								{{ mealOfTheDay.strArea }}
							</span>
						</div>
					</div>
					<p
						class="text-truncate"
						style="
							-webkit-line-clamp: 8;
							margin: 0px;
							margin-top: 20px;
							font-size: 1rem;
							white-space: pre-wrap;
							word-break: break-word;
						"
						ref="mealInstructions"
					>
						{{ mealOfTheDay.strInstructions }}
					</p>
					<a
						:href="`/meal/${mealOfTheDay.idMeal}`"
						style="margin-top: auto; color: black; font-size: 1rem"
						>Read more</a
					>
				</div>
			</div>
		</div>
	</div>
</template>
<style lang="scss">
.meal-of-the-day {
	&__wrapper {
		display: flex;
		flex-direction: column;
		position: relative;
		width: 100%;
		overflow: hidden;
	}
	&__title {
		margin-bottom: 10px;
		align-self: flex-start;
		font-weight: 300;
	}
}
.meal {
	&__wrapper {
		position: relative;
		display: flex;
		border-radius: 20px;
		overflow: hidden;
		cursor: pointer;
	}
	&__image {
		height: 400px;
		object-fit: cover;
		width: 50%;
	}
	&__description {
		position: absolute;
		width: 50%;
		height: 100%;
		display: flex;
		top: 0px;
		right: 0px;
		z-index: 1;
	}
	&__description-content {
		backdrop-filter: blur(80px);
		background: rgba(white, 0.9);
		flex: 1;
		padding: 20px;
		display: flex;
		flex-direction: column;
	}
	&__description-bg {
		position: absolute;
		top: 0px;
		right: 0px;
		width: 100%;
		height: 100%;
	}
	&__title {
		font-size: 1.5rem;
		font-weight: 300;
	}
	&__meta {
		display: flex;
		font-size: 1rem;
		font-weight: 300;
		> div {
			display: inline-flex;
			align-items: center;
			margin-right: 20px;
		}
		svg {
			width: 20px;
			height: 20px;
			stroke: var(--grey);
		}
	}
}
</style>
