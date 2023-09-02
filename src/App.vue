<script setup>
import { computed } from "vue";
import { useMealsStore } from "./store/meals.store.js";
import Search from "./components/Search.vue";
import Bookmarks from "./components/Bookmarks.vue";
import { useRoute } from "vue-router";

const route = useRoute();

const mealsStore = useMealsStore();
mealsStore.fetchMealCategories();
mealsStore.fetchRandomMeal();
</script>
<template>
  <div class="app-header__wrapper">
    <div class="app-header__content">
      <Bookmarks />
      <router-link :to="'/home'" class="app-header__logo">
        morbaan recipes
      </router-link>
      <Search />
    </div>
  </div>
  <router-view :key="route.fullPath"></router-view>
</template>
<style lang="scss">
.app-header {
  &__wrapper {
    position: sticky;
    top: 0px;
    z-index: 2;
    background-color: rgba(whitesmoke, 0.85);
    backdrop-filter: blur(40px);
    &.prevent-overflow {
      overflow: hidden;
    }
  }
  &__content {
    display: flex;
    padding: 8px 12px;
    justify-content: space-between;
    max-width: var(--dashboard-width);
    margin: 0 auto;
    width: 100%;
  }
  &__logo {
    font-weight: 300;
    font-size: 2rem;
    font-weight: 300;
    color: var(--grey);
    text-decoration: none;
  }
}
</style>
