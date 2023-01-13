import { AxiosResponse } from "axios";
import { createEffect, createStore } from "effector";


export const setMapPointsFx = createEffect(async (params: AxiosResponse<any, any>) => {
  return params;
});
export const $mapPoints = createStore({})
  .on(setMapPointsFx.doneData, (_, payload) => payload);
