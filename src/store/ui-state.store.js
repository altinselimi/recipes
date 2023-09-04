import { defineStore } from "pinia";

export const useUiStateStore = defineStore("uiStateStore", {
	persist: true,
	state: () => ({
		isPopupOpen: false,
	}),
});
