import { defineStore } from "pinia";

export const useUiStateStore = defineStore("uiStateStore", {
	state: () => ({
		isPopupOpen: false,
	}),
});
