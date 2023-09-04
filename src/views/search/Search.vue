<script setup>
import { ref, watchEffect, nextTick } from "vue";
import { useMealsStore } from "@/store/meals.store.js";
import {
	Loader as LoadingIcon,
	Search as SearchIcon,
	X as XIcon,
} from "lucide-vue-next";
import SearchResultItem from "./SearchResultItem.vue";
import SearchResultItemSkeleton from "@/skeletons/SearchResultItemSkeleton.vue";
import debounce from "lodash/debounce";
import Popup from "@/components/Popup.vue";

const mealsStore = useMealsStore();

const isSearchPopupVisible = ref(false);
const searchInput = ref(null);

const isSearching = ref(false);
const searchResults = ref(null);
const searchMeals = debounce(
	(inputValue) => {
		isSearching.value = true;
		mealsStore
			.searchMealByName(inputValue)
			.then((res) => {
				searchResults.value = res;
			})
			.finally(() => (isSearching.value = false));
	},
	300,
	{ leading: true },
);
watchEffect(() => {
	if (!searchInput.value) {
		searchResults.value = null;
		return;
	}
	searchMeals(searchInput.value);
});

watchEffect(async () => {
	if (!isSearchPopupVisible.value) return;
	nextTick().then(() => searchInputRef.value?.focus());
});

const searchInputRef = ref(null);
</script>
<template>
	<button @click="isSearchPopupVisible = true">
		<SearchIcon />
	</button>
	<Popup v-model="isSearchPopupVisible" v-if="isSearchPopupVisible">
		<div class="search__input-wrapper">
			<input
				type="text"
				v-model="searchInput"
				placeholder="Type to search..."
				class="search__input"
				ref="searchInputRef"
			/>
			<LoadingIcon v-if="isSearching" class="is-spinning" />
			<SearchIcon v-else />
		</div>
		<ul
			v-if="!isSearching && searchInput?.length && !searchResults?.length"
		>
			<li>No results found ...</li>
		</ul>
		<ul v-else-if="!isSearching">
			<SearchResultItem
				v-for="result in searchResults"
				:data="result"
				@select="isSearchPopupVisible = false"
			/>
		</ul>
		<ul v-else>
			<SearchResultItemSkeleton v-for="item in 3" />
		</ul>
	</Popup>
</template>
<style lang="scss">
.search {
	&__input-wrapper {
		display: flex;
		align-items: center;
		position: relative;
		margin-top: 20px;
		svg {
			position: absolute;
			top: 50%;
			right: 20px;
			translate: 0 -50%;
		}
	}
	&__input {
		font-size: 1.5rem;
		font-weight: 300;
		width: 100%;
		border: none;
		padding: 20px;
		padding-right: 60px;
		border-radius: 20px;
		outline: none;
	}
}
</style>
