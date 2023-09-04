import { mount } from "@vue/test-utils";
import { expect, test } from "vitest";
import MealIcon from "./MealIcon.vue";

test("MealIcon can be imported", async () => {
  expect(MealIcon).toBeTruthy();
});

test("MealIcon renders correct icon", async () => {
  const wrapper = mount(MealIcon, {
    props: {
      type: "beef",
    },
  });
  expect(wrapper.html()).toContain("lucide-beef-icon");
});

test("MealIcon does not render anything when an icon cannot be found", async () => {
  const wrapper = mount(MealIcon, {
    props: {
      type: "inexistent",
    },
  });
  expect(wrapper.html()).toMatch("");
});
