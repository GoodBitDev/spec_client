import mapboxgl from "mapbox-gl";

export const mag1 = ['<', ['get', 'mag'], 2];
export const mag2 = ['all', ['>=', ['get', 'mag'], 2], ['<', ['get', 'mag'], 3]];
export const mag3 = ['all', ['>=', ['get', 'mag'], 3], ['<', ['get', 'mag'], 4]];
export const mag4 = ['all', ['>=', ['get', 'mag'], 4], ['<', ['get', 'mag'], 5]];
export const mag5 = ['>=', ['get', 'mag'], 5];

const markers = {};
let markersOnScreen = {};

export const colors = ['#fed976', '#feb24c', '#fd8d3c', '#fc4e2a', '#e31a1c'];

export function updateMarkers(map: mapboxgl.Map) {
  const newMarkers = {};
  const features = map.querySourceFeatures('earthquakes');

// for every cluster on the screen, create an HTML marker for it (if we didn't yet),
// and add it to the map if it's not there already
  for (const feature of features) {
    const coords = feature.geometry.coordinates;
    const props = feature.properties;
    if (!props.cluster) continue;
    const id = props.cluster_id;

    let marker = markers[id];
    if (!marker) {
      const el = createDonutChart(props);
      marker = markers[id] = new mapboxgl.Marker({
        element: el
      }).setLngLat(coords);
    }
    newMarkers[id] = marker;

    if (!markersOnScreen[id]) marker.addTo(map);
  }
// for every marker we've added previously, remove those that are no longer visible
  for (const id in markersOnScreen) {
    if (!newMarkers[id]) markersOnScreen[id].remove();
  }
  markersOnScreen = newMarkers;
}




export function donutSegment(start: number, end: number, r: number, r0: number, color: string) {
  if (end - start === 1) end -= 0.00001;
  const a0 = 2 * Math.PI * (start - 0.25);
  const a1 = 2 * Math.PI * (end - 0.25);
  const x0 = Math.cos(a0),
      y0 = Math.sin(a0);
  const x1 = Math.cos(a1),
      y1 = Math.sin(a1);
  const largeArc = end - start > 0.5 ? 1 : 0;

// draw an SVG path
  return `<path d="M ${r + r0 * x0} ${r + r0 * y0} L ${r + r * x0} ${
      r + r * y0
  } A ${r} ${r} 0 ${largeArc} 1 ${r + r * x1} ${r + r * y1} L ${
      r + r0 * x1
  } ${r + r0 * y1} A ${r0} ${r0} 0 ${largeArc} 0 ${r + r0 * x0} ${
      r + r0 * y0
  }" fill="${color}" />`;
}

export const layer = {
  'id': 'earthquake_circle',
  'type': 'circle',
  'source': 'earthquakes',
  'filter': ['!=', 'cluster', true],
  'paint': {
    'circle-color': [
      'case',
      mag1,
      colors[0],
      mag2,
      colors[1],
      mag3,
      colors[2],
      mag4,
      colors[3],
      colors[4]
    ],
    'circle-opacity': 0.6,
    'circle-radius': 12
  }
}