<script setup>
import { ref, watchEffect, nextTick, computed } from "vue";
import { useMealsStore } from "@/store/meals.store.js";
import {
	Loader as LoadingIcon,
	BookMarked as BookmarkedIcon,
	MinusCircle as MinusIcon,
} from "lucide-vue-next";
import debounce from "lodash/debounce";
import SearchResultItem from "@/views/search/SearchResultItem.vue";
import Popup from "@/components/Popup.vue";

const isBookmarkPopupVisible = ref(false);
const mealsStore = useMealsStore();
const bookmarks = computed(() => mealsStore.bookmarkedMeals);
watchEffect(() => {
	localStorage.setItem("moorbanBookmarks", JSON.stringify(bookmarks.value));
	const toBeAddedToStore = bookmarks.value.filter(
		(bookmark) => !mealsStore.mealsById[bookmark.idMeal],
	);
	toBeAddedToStore.forEach((meal) => mealsStore.addMealToStore(meal));
});

const removeFromBookmarks = (bookmark) => {
	mealsStore.removeFromBookmarks(bookmark);
};
</script>
<template>
	<button @click="isBookmarkPopupVisible = true">
		<BookmarkedIcon />
	</button>
	<Popup v-model="isBookmarkPopupVisible" v-if="isBookmarkPopupVisible">
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
	</Popup>
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
	&__remove {
		position: absolute;
		top: 20px;
		right: 20px;
		display: flex;
		align-items: center;
	}
}
</style>
