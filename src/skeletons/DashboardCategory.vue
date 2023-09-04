<template>
	<li class="meals-by-category__wrapper is-skeleton-component">
		<h1 class="meals-by-category__title is-skeleton">Lorem meals</h1>
		<ul class="meals-by-category__list">
			<li class="is-skeleton" v-for="item in 5">Lorem ipsum</li>
		</ul>
	</li>
</template>
<style lang="scss">
.meals-by-category {
	&__wrapper {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		container-type: inline-size;
	}
	&__title {
		margin-bottom: 20px;
	}
	&__list li {
		width: calc((100cqw / 3) - 10px);
		height: 250px;
		@container (max-width: 700px) {
			width: calc((100cqw / 2) - 10px);
		}
		@container (max-width: 450px) {
			width: calc(100cqw - 10px);
		}
	}
}
</style>
