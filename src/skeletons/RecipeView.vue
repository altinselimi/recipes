<script setup>
import { useRouter } from "vue-router";
import { ChevronLeft as BackIcon } from "lucide-vue-next";

const router = useRouter();
const goBack = () => {
	router.replace({ name: "DashboardRoute" });
};
</script>
<template>
	<div class="recipe__body-wrapper">
		<div class="recipe__header">
			<button @click="goBack()">
				<BackIcon />
			</button>
			<h1 class="is-skeleton recipe__skeleton-title">Lorem ipsum</h1>
		</div>
		<div class="recipe__video is-skeleton"></div>
	</div>
</template>
<style lang="scss">
.recipe {
	&__skeleton-title {
		margin-left: 20px;
		padding: 0px 20px;
	}
	&__video {
		width: 100cqw;
		height: calc((100cqw / 16) * 9);
		margin-top: 20px;
	}
}
</style>
