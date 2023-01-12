import { createEffect, createStore } from "effector";


export const setMapPointsFx = createEffect(async (params: {}) => {
  return params;
});
export const $mapPoints = createStore({})
  .on(setMapPointsFx.doneData, (_, payload) => payload);
