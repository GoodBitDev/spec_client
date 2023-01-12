import { createEvent, createStore } from "effector";

export const setTokenToStore = createEvent<string>();

export const $token = createStore("")
.on(setTokenToStore, (_, payload) => payload)
