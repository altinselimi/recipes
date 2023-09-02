<script setup>
import { computed } from "vue";
import {
	Vegan as VeganIcon,
	Beef as BeefIcon,
	Drumstick as ChickenIcon,
	CakeSlice as DessertIcon,
	UtensilsCrossed as UtensilsIcon,
	Shell as ShellIcon,
	Fish as FishIcon,
	Salad as SaladIcon,
	EggFried as EggIcon,
	Sandwich as SandwichIcon,
	Soup as SoupIcon,
	Croissant as CroissantIcon,
} from "lucide-vue-next";
const props = defineProps(["type"]);
const iconPerMealType = {
	vegetarian: VeganIcon,
	vegan: VeganIcon,
	beef: BeefIcon,
	lamb: BeefIcon,
	chicken: ChickenIcon,
	dessert: DessertIcon,
	miscellaneous: UtensilsIcon,
	pasta: ShellIcon,
	pork: BeefIcon,
	seafood: FishIcon,
	side: EggIcon,
	starter: SoupIcon,
	breakfast: SandwichIcon,
	goat: BeefIcon,
};
const icon = iconPerMealType[props.type];
</script>
<template>
	<component :is="icon" />
</template>
