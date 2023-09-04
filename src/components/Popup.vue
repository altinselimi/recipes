<script setup>
import { X as XIcon } from "lucide-vue-next";
import { useFocusTrap } from "@vueuse/integrations/useFocusTrap";
import { useUiStateStore } from "@/store/ui-state.store.js";
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue";

const props = defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue"]);
const uiStateStore = useUiStateStore();

const isBookmarkPopupVisible = ref(false);
const popupWrapperRef = ref(null);
const { activate, deactivate } = useFocusTrap(popupWrapperRef);

onMounted(() => {
	uiStateStore.isPopupOpen = true;
	nextTick().then(() => activate());
	document.body.setAttribute("class", "prevent-overflow");
});

onBeforeUnmount(() => {
	deactivate();
	document.body.setAttribute("class", "");
});
</script>
<template>
	<teleport to="#popup">
		<div
			class="popup__wrapper"
			@keydown.esc="$emit('update:modelValue', false)"
			tabindex="0"
			ref="popupWrapperRef"
		>
			<div class="popup__content">
				<button
					class="popup__close-button"
					@click="$emit('update:modelValue', false)"
				>
					<XIcon />
				</button>
				<slot></slot>
			</div>
		</div>
	</teleport>
</template>
<style lang="scss">
.popup {
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
		outline: none;
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
}
</style>
