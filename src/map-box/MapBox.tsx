import React from 'react';
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import {setMapFx} from "./store";

interface MapboxMapProps {
  initialOptions?: Omit<mapboxgl.MapboxOptions, "container">;

  onCreated?(map: mapboxgl.Map): void;

  onLoaded?(map: mapboxgl.Map): void;

  onRemoved?(): void;
}

function MapboxMap({
                     initialOptions = {},
                     onCreated,
                     onLoaded,
                     onRemoved,
                   }: MapboxMapProps) {
  const mapNode = React.useRef(null);

  React.useEffect(() => {
    const node = mapNode.current;

    if (typeof window === "undefined" || node === null) return;

    const mapboxMap = new mapboxgl.Map({
      container: node,
      accessToken: "pk.eyJ1IjoiZXBpY3R5cGUiLCJhIjoiY2w5MmoyY2U2MTIxNDN1cW1iOHE2aGE0ZiJ9.dhQ3e61dUVT7FYdXGIHXEg",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [37.3855235, 55.582026],
      zoom: 9,
      ...initialOptions,
    });

    setMapFx(mapboxMap);
    if (onCreated) onCreated(mapboxMap);

    if (onLoaded) mapboxMap.once("load", () => onLoaded(mapboxMap));

    return () => {
      mapboxMap.remove();
      setMapFx(null);
      if (onRemoved) onRemoved();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={mapNode} className='absolute left-0 right-0 top-0 bottom-0 h-full w-full'/>;
}

export default MapboxMap;
