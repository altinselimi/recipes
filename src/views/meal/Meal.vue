<script setup>
import { computed, ref, onMounted, watchEffect } from "vue";
import { useMealsStore } from "@/store/meals.store.js";
import {
	ChevronLeft as BackIcon,
	MapPin as MapPinIcon,
	Bookmark as BookmarkIcon,
	BookmarkMinus as RemoveBookmarkIcon,
} from "lucide-vue-next";
import MealIcon from "@/components/MealIcon.vue";
import { useRouter } from "vue-router";
import RecipeSkeleton from "@/skeletons/RecipeView.vue";

const props = defineProps(["id"]);

const mealsStore = useMealsStore();
const mealData = computed(() => mealsStore.mealsById[props.id]);
if (!mealData.value) mealsStore.fetchMealDetails(props.id);

const isLoadingData = computed(() => !mealData.value);
const ingredients = computed(() =>
	Object.keys(mealData.value || {}).filter(
		(key) =>
			key.toLowerCase().includes("ingredient") && mealData.value[key],
	),
);
const ingredientKeyLength = "strIngredient".length;

const isIframeRenderingSuitable = ref(false);
setTimeout(() => {
	isIframeRenderingSuitable.value = true;
}, 500);

const titleRef = ref(null);
onMounted(() => {
	titleRef.value?.scrollIntoViewIfNeeded();
});
const router = useRouter();
const mealPhotoRef = ref(null);
const mealInstructionsRef = ref(null);
const goBack = async () => {
	const previousExists = router.options.history.state.back;
	previousExists ? router.go(-1) : router.replace({ name: "DashboardRoute" });
};
const addToBookmarks = () => {
	mealsStore.addToBookmarks(mealData.value);
};
const removeFromBookmarks = () => {
	mealsStore.removeFromBookmarks(mealData.value);
};
const isBookmarked = computed(() =>
	mealsStore.bookmarkedMeals.some((m) => m.idMeal === mealData.value.idMeal),
);
watchEffect(() => {
	if (mealsStore.isSearching || mealsStore.isBrowsingBookmarks) {
		[titleRef.value, mealPhotoRef.value, mealInstructionsRef.value].forEach(
			(el) => {
				el.setAttribute("style", "view-transition-name: none;");
			},
		);
	}
});
</script>
<template>
	<RecipeSkeleton v-if="isLoadingData" />
	<div class="recipe__body-wrapper" v-else>
		<div class="recipe__header">
			<button @click="goBack()">
				<BackIcon />
			</button>
			<h1 class="recipe__title" ref="titleRef">
				{{ mealData.strMeal }}
			</h1>
		</div>
		<div class="recipe__meta">
			<div>
				<MealIcon :type="mealData.strCategory.toLowerCase()" />
				<span style="margin-left: 4px">
					{{ mealData.strCategory }}
				</span>
			</div>
			<div>
				<MapPinIcon />
				<span style="margin-left: 4px">
					{{ mealData.strArea }}
				</span>
			</div>
			<div>
				<button
					@click="
						isBookmarked ? removeFromBookmarks() : addToBookmarks()
					"
					:class="{ 'is-bookmarked': isBookmarked }"
					class="recipe__bookmark"
				>
					<BookmarkIcon v-if="!isBookmarked" />
					<RemoveBookmarkIcon v-else />
					<span v-if="!isBookmarked">Bookmark</span>
					<span v-else>Remove bookmark</span>
				</button>
			</div>
		</div>
		<div class="recipe__brief-intro">
			<div class="recipe__image">
				<img :src="mealData.strMealThumb" ref="mealPhotoRef" alt="" />
			</div>
			<p class="recipe__instructions" ref="mealInstructionsRef">
				{{ mealData.strInstructions }}
			</p>
		</div>
		<div style="padding: 0px 20px; margin-bottom: 20px">
			<div v-if="mealData.strYoutube" class="recipe__youtube-iframe">
				<iframe
					v-if="isIframeRenderingSuitable"
					:src="
						isIframeRenderingSuitable &&
						mealData.strYoutube.replace('watch?v=', 'embed/')
					"
					title="YouTube video player"
					frameborder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					allowfullscreen
				></iframe>
			</div>
		</div>
		<div class="recipe__ingredients" tabindex="0">
			<h2>Ingredients</h2>
			<ul>
				<li v-for="ingredient in ingredients">
					<span style="text-transform: capitalize">
						{{ mealData[ingredient] }}
					</span>
					<span>
						({{
							mealData[
								`strMeasure${ingredient.slice(
									ingredientKeyLength,
								)}`
							]
						}})
					</span>
				</li>
			</ul>
		</div>
	</div>
</template>
<style lang="scss">
.recipe {
	&__body-wrapper {
		padding: 20px;
		max-width: var(--recipe-width);
		width: 100%;
		align-self: center;
		container-type: inline-size;
		h1,
		h2 {
			text-decoration: underline var(--grey);
		}
		h1 {
			font-weight: 300;
			font-size: 1.5rem;
		}
		h2 {
			font-size: 1.5rem;
			font-weight: 300;
			margin-bottom: 10px;
		}
	}
	&__header {
		display: flex;
		align-items: center;
		button {
			display: flex;
			align-items: center;
		}
		& ~ div {
			padding: 0px 20px;
		}
	}
	&__title {
		view-transition-name: meal-title;
		font-size: 1.5rem;
		font-weight: 300;
		margin-left: 8px;
	}
	&__meta {
		display: flex;
		font-size: 1rem;
		font-weight: 300;
		view-transition-name: meal-meta;
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
		button {
			display: flex;
			align-items: center;
			margin-left: -8px;
			border: solid 1px var(--grey);
			span {
				margin-left: 4px;
			}
		}
	}
	&__brief-intro {
		padding: 20px 0px;
		container-type: inline-size;
		margin-bottom: 20px;
		margin-top: 20px;
	}
	&__image {
		border-radius: 20px;
		flex-shrink: 0;
		float: left;
		padding: 20px;
		padding-left: 0px;
		img {
			width: 25cqw;
			min-width: 200px;
			border-radius: 20px;
			view-transition-name: meal-photo;
		}
		@container (max-width: 450px) {
			float: none;
			img {
				width: 100%;
			}
		}
	}
	&__youtube-iframe {
		width: 100cqw;
		height: calc((100cqw / 16) * 9);
		background-color: var(--grey);
		iframe {
			width: 100cqw;
			height: calc((100cqw / 16) * 9);
		}
	}
	&__description {
		flex: 3;
		font-size: 1rem;
		margin-right: 40px;
		white-space: pre-wrap;
	}
	&__instructions {
		white-space: pre-wrap;
		view-transition-name: meal-instructions;
	}
	&__ingredients {
		ul {
			list-style: disc;
			padding-left: 20px;
		}
		li {
			font-size: 1rem;
		}
	}
	&__bookmark {
		&.is-bookmarked {
			background-color: var(--green);
		}
	}
}
</style>
