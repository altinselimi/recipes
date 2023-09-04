import { mount, flushPromises } from "@vue/test-utils";
import { expect, test, beforeEach, afterEach } from "vitest";
import Popup from "./Popup.vue";
import sinon from "sinon";
import { createTestingPinia } from "@pinia/testing";

beforeEach(() => {
  // create teleport target
  const popupEl = document.createElement("div");
  popupEl.setAttribute("id", "popup");
  document.body?.appendChild(popupEl);
});

afterEach(() => {
  document.body.innerHTML = "";
});

const getPopupComponentWrapper = () => {
  return mount(Popup, {
    props: {
      modelValue: true,
    },
    slots: {
      default: `<div class="popup-text-content" tabindex="0">Hello from modal</div>`,
    },
    global: {
      plugins: [createTestingPinia({ createSpy: sinon.spy })],
    },
  });
};

test("Popup renders correctly", async () => {
  const wrapper = getPopupComponentWrapper();
  expect(
    document.body.querySelector("#popup div.popup-text-content"),
  ).toBeTruthy();
});

test("Popup renders text", async () => {
  const wrapper = getPopupComponentWrapper();
  expect(
    document.body.querySelector("#popup div.popup-text-content").innerText,
  ).toEqual("Hello from modal");
});

test("Popup adds prevent-overflow to body", async () => {
  const wrapper = getPopupComponentWrapper();
  expect(document.body.getAttribute("class")).toContain("prevent-overflow");
});
