<script setup>
import { ref, watchEffect, nextTick } from "vue";
import { useMealsStore } from "../store/meals.store.js";
import {
	Loader as LoadingIcon,
	Search as SearchIcon,
	X as XIcon,
} from "lucide-vue-next";
import SearchResultItem from "./SearchResultItem.vue";
import SearchResultItemSkeleton from "../skeletons/SearchResultItemSkeleton.vue";
import debounce from "lodash/debounce";
import { useFocusTrap } from "@vueuse/integrations/useFocusTrap";

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

const searchInputRef = ref(null);
const searchWrapperRef = ref(null);
const { activate, deactivate } = useFocusTrap(searchWrapperRef);

watchEffect(() => {
	mealsStore.isSearching = isSearchPopupVisible.value;
	if (isSearchPopupVisible.value) {
		nextTick().then(() => activate() && searchInputRef.value?.focus());
	} else {
		deactivate();
	}
	document.body.setAttribute(
		"class",
		isSearchPopupVisible.value ? "prevent-overflow" : "",
	);
});
</script>
<template>
	<button @click="isSearchPopupVisible = true">
		<SearchIcon />
	</button>
	<teleport to="#popup" v-if="isSearchPopupVisible">
		<div
			class="search__wrapper"
			@keydown.esc="isSearchPopupVisible = false"
			ref="searchWrapperRef"
		>
			<div class="search__content">
				<button
					class="search__close-button"
					@click="isSearchPopupVisible = false"
				>
					<XIcon />
				</button>
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
					v-if="
						!isSearching &&
						searchInput?.length &&
						!searchResults?.length
					"
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
			</div>
		</div>
	</teleport>
</template>
<style lang="scss">
.search {
	&__wrapper {
		position: fixed;
		top: 0;
		left: 0;
		background-color: rgba(whitesmoke, 0.85);
		backdrop-filter: blur(40px);
		width: 100%;
		height: 100%;
		z-index: 99999;
		overflow-y: auto;
		scrollbar-gutter: stable both-edges;
	}
	&__content {
		max-width: var(--search-popup-width);
		width: 100%;
		padding: 40px;
		padding-top: 60px;
		margin: auto;
		> ul {
			padding: 20px 0px;
		}
		> ul > li {
			margin-bottom: 10px;
		}
	}
	&__input-wrapper {
		display: flex;
		align-items: center;
		position: relative;
		svg {
			position: absolute;
			top: 50%;
			right: 20px;
			translate: 0 -50%;
		}
	}
	&__input {
		font-size: 2rem;
		font-weight: 300;
		width: 100%;
		border: none;
		padding: 20px;
		padding-right: 60px;
		border-radius: 20px;
		outline: none;
	}
	&__close-button {
		position: absolute;
		top: 20px;
		right: 20px;
		display: flex;
		align-items: center;
		border-radius: 100%;
		border: solid 1px var(--grey);
	}
}
body.prevent-overflow #app {
	overflow: hidden;
	pointer-events: none;
}
</style>
