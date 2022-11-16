import {createEffect, createStore} from "effector";
import mapboxgl from "mapbox-gl";

interface Properties {
  id: string;
  mag: number;
  time: number;
  felt: null;
  tsunami: number
}

interface Geometry {
  type: string;
  coordinates: [number, number, number]
}

export interface Feature {
  type: string;
  properties: Properties;
  geometry: Geometry;
}

export interface PointF {
  type: string;
  features: Feature[]
}

export const setMapFx = createEffect( (map: mapboxgl.Map | null) => {
  return map
})

export const $map = createStore<mapboxgl.Map | null>(null)
    .on(setMapFx.doneData, (state, payload) => payload)