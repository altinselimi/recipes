<script setup>
import { ref, watchEffect, nextTick, computed } from "vue";
import { useMealsStore } from "../store/meals.store.js";
import {
	Loader as LoadingIcon,
	BookMarked as BookmarkedIcon,
	X as XIcon,
	MinusCircle as MinusIcon,
} from "lucide-vue-next";
import debounce from "lodash/debounce";
import { useFocusTrap } from "@vueuse/integrations/useFocusTrap";
import SearchResultItem from "./SearchResultItem.vue";

const mealsStore = useMealsStore();
const bookmarks = computed(() => mealsStore.bookmarkedMeals);
watchEffect(() => {
	localStorage.setItem("moorbanBookmarks", JSON.stringify(bookmarks.value));
	const toBeAddedToStore = bookmarks.value.filter(
		(bookmark) => !mealsStore.mealsById[bookmark.idMeal],
	);
	toBeAddedToStore.forEach((meal) => mealsStore.addMealToStore(meal));
});

const isBookmarkPopupVisible = ref(false);
const bookmarkWrapperRef = ref(null);
const { activate, deactivate } = useFocusTrap(bookmarkWrapperRef);

watchEffect(() => {
	mealsStore.isBrowsingBookmarks = isBookmarkPopupVisible.value;
	if (isBookmarkPopupVisible.value) {
		nextTick().then(() => activate());
	} else {
		deactivate();
	}
	document.body.setAttribute(
		"class",
		isBookmarkPopupVisible.value ? "prevent-overflow" : "",
	);
});

const removeFromBookmarks = (bookmark) => {
	mealsStore.removeFromBookmarks(bookmark);
};
</script>
<template>
	<button @click="isBookmarkPopupVisible = true">
		<BookmarkedIcon />
	</button>
	<teleport to="#popup" v-if="isBookmarkPopupVisible">
		<div
			class="bookmark__wrapper"
			@keydown.esc="isBookmarkPopupVisible = false"
			ref="bookmarkWrapperRef"
		>
			<div class="bookmark__content">
				<button
					class="bookmark__close-button"
					@click="isBookmarkPopupVisible = false"
				>
					<XIcon />
				</button>
				<h1>Bookmarks</h1>
				<ul v-if="bookmarks?.length">
					<SearchResultItem
						v-for="result in bookmarks"
						:data="result"
						@select="isBookmarkPopupVisible = false"
					>
						<button
							class="bookmark__remove"
							@click.prevent.stop="removeFromBookmarks(result)"
						>
							<MinusIcon />
						</button>
					</SearchResultItem>
				</ul>
				<ul v-else>
					<li>No bookmarks yet ...</li>
				</ul>
			</div>
		</div>
	</teleport>
</template>
<style lang="scss">
.bookmark {
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
			position: relative;
		}
		> h1 {
			font-size: 1.5rem;
			font-weight: 300;
		}
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
	&__remove {
		position: absolute;
		top: 20px;
		right: 20px;
		display: flex;
		align-items: center;
	}
}
body.prevent-overflow #app {
	overflow: hidden;
	pointer-events: none;
}
</style>
