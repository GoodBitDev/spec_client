import type {NextPage} from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import mapboxgl, {Marker} from 'mapbox-gl'
import {useEffect, useRef, useState} from "react";
import 'mapbox-gl/dist/mapbox-gl.css';
// @ts-ignore
import MapboxLanguage from '@mapbox/mapbox-gl-language';

import data from './kiev.json';
import mosc from './moscowreg.json';
import nor from './north.json';
import all from './allinone.json'

mapboxgl.accessToken = "pk.eyJ1IjoiZXBpY3R5cGUiLCJhIjoiY2w5MmoyY2U2MTIxNDN1cW1iOHE2aGE0ZiJ9.dhQ3e61dUVT7FYdXGIHXEg"

const markers = {};
let markersOnScreen = {};

const Home: NextPage = () => {
  const mapContainer = useRef(null);
  const popup = useRef(null);
  const mark = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(30.315877);
  const [lat, setLat] = useState(59.939099);
  const [zoom, setZoom] = useState(12);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom,
    })


    // map.current.scrollZoom.disable()

    const point = new mapboxgl.Point(lng, lat);

    const marker = new mapboxgl.Marker({element: mark.current})
        .setLngLat([lng, lat])
        .setPopup(new mapboxgl.Popup().setDOMContent(popup.current))
        .addTo(map.current);

    const language = new MapboxLanguage();
    map.current.addControl(language);
  });

  useEffect(() => {
    map.current.on('load', () => {

      all.map((source, index) => {
        map.current.addSource(`kiev ${index}`, {
          type: "geojson",
          data: source
        })

        console.log(source)

        map.current.addLayer({
          'id': `maine ${index}`,
          'type': 'fill',
          'source': `kiev ${index}`, // reference the data source
          'layout': {},
          'paint': {
            'fill-color': 'rgba(239, 32, 32, 0.7)', // blue color fill
          }
        })

        map.current.addLayer({
          'id': `outline ${index}`,
          'type': 'line',
          'source': `kiev ${index}`,
          'layout': {},
          'paint': {
            'line-color': '#FFFFFF',
            'line-width': 1,
          }
        });

      })


      // map.current.addSource("kiev", {
      //   type: "geojson",
      //   data: mosc
      // })

      // map.current.addSource("nor", {
      //   type: "geojson",
      //   data: nor
      // })

      // map.current.addLayer({
      //   'id': 'maine',
      //   'type': 'fill',
      //   'source': 'kiev', // reference the data source
      //   'layout': {},
      //   'paint': {
      //     'fill-color': 'rgba(239, 32, 32, 0.7)', // blue color fill
      //   }
      // })
      //
      //
      // map.current.addLayer({
      //   'id': 'outline',
      //   'type': 'line',
      //   'source': 'kiev',
      //   'layout': {},
      //   'paint': {
      //     'line-color': '#FFFFFF',
      //     'line-width': 1,
      //   }
      // });


    })
  }, [])

  useEffect(() => {
    map.current.setCenter([lng, lat])
  }, [lng, lat])

  const changeCenter = (lng: number, lat: number) => {
    setLng(lng);
    setLat(lat)
  }

  // filters for classifying earthquakes into five categories based on magnitude
  const mag1 = ['<', ['get', 'mag'], 2];
  const mag2 = ['all', ['>=', ['get', 'mag'], 2], ['<', ['get', 'mag'], 3]];
  const mag3 = ['all', ['>=', ['get', 'mag'], 3], ['<', ['get', 'mag'], 4]];
  const mag4 = ['all', ['>=', ['get', 'mag'], 4], ['<', ['get', 'mag'], 5]];
  const mag5 = ['>=', ['get', 'mag'], 5];

  const colors = ['#fed976', '#feb24c', '#fd8d3c', '#fc4e2a', '#e31a1c'];

  const onClick = () => {
    map.current.addSource(`bratsk`, {
      type: "geojson",
      data: 'https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson',
      cluster: true,
      clusterRadius: 80,
      clusterProperties: {
        // keep separate counts for each magnitude category in a cluster
        'mag1': ['+', ['case', mag1, 1, 0]],
        'mag2': ['+', ['case', mag2, 1, 0]],
        'mag3': ['+', ['case', mag3, 1, 0]],
        'mag4': ['+', ['case', mag4, 1, 0]],
        'mag5': ['+', ['case', mag5, 1, 0]]
      }
    })

    map.current.addLayer({
      'id': `maine`,
      'type': 'fill',
      'source': `bratsk`, // reference the data source
      'layout': {},
      'paint': {
        'fill-color': 'rgba(239, 32, 32, 0.7)', // blue color fill
      }
    })

    map.current.addLayer({
      'id': `outline`,
      'type': 'symbol',
      'source': 'bratsk',
      'filter': ['!=', 'cluster', true],
      'layout': {
        'text-field': [
          'number-format',
          ['get', 'mag'],
          {'min-fraction-digits': 1, 'max-fraction-digits': 1}
        ],
        'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
        'text-size': 10
      },
      'paint': {
        'text-color': [
          'case',
          ['<', ['get', 'mag'], 3],
          'black',
          'white'
        ]
      }
    });


  }

  function donutSegment(start, end, r, r0, color) {
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

  function createDonutChart(props) {
    const offsets = [];
    const counts = [
      props.mag1,
      props.mag2,
      props.mag3,
      props.mag4,
      props.mag5
    ];
    let total = 0;
    for (const count of counts) {
      offsets.push(total);
      total += count;
    }
    const fontSize =
        total >= 1000 ? 22 : total >= 100 ? 20 : total >= 10 ? 18 : 16;
    const r =
        total >= 1000 ? 50 : total >= 100 ? 32 : total >= 10 ? 24 : 18;
    const r0 = Math.round(r * 0.6);
    const w = r * 2;

    let html = `<div>
<svg width="${w}" height="${w}" viewbox="0 0 ${w} ${w}" text-anchor="middle" style="font: ${fontSize}px sans-serif; display: block">`;

    for (let i = 0; i < counts.length; i++) {
      html += donutSegment(
          offsets[i] / total,
          (offsets[i] + counts[i]) / total,
          r,
          r0,
          colors[i]
      );
    }
    html += `<circle cx="${r}" cy="${r}" r="${r0}" fill="white" />
<text dominant-baseline="central" transform="translate(${r}, ${r})">
${total.toLocaleString()}
</text>
</svg>
</div>`;

    const el = document.createElement('div');
    el.innerHTML = html;
    return el.firstChild;
  }

  function updateMarkers() {
    const newMarkers = {};
    const features = map.current.querySourceFeatures('bratsk');

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
        }).setLngLat(coords).setPopup(new mapboxgl.Popup().setDOMContent(popup.current).setText(coords)).addTo(map.current)
      }
      newMarkers[id] = marker;

      if (!markersOnScreen[id]) marker.addTo(map.current);
    }
// for every marker we've added previously, remove those that are no longer visible
    for (const id in markersOnScreen) {
      if (!newMarkers[id]) markersOnScreen[id].remove();
    }
    markersOnScreen = newMarkers;
  }

  useEffect(() => {
    if (map.current.getSource('bratsk')) {
      map.current.on('render', () => {
        if (!map.current.isSourceLoaded('bratsk')) return;
        updateMarkers();
      });
    }
  })

  return (
      <div style={{}}>
        <div ref={mapContainer} style={{
          height: "800px",
          width: "100%"
        }}/>
        <div ref={popup}>Hello world !</div>
        <ul>
          <li>
            <button onClick={() => changeCenter(60.597452, 56.838008)}>1</button>
          </li>
          <li>
            <button onClick={() => changeCenter(30.315877, 59.939099)}>1</button>
          </li>
          <li>
            <button>1</button>
          </li>
          <li>
            <button onClick={onClick}>1</button>
          </li>
        </ul>
        <div ref={mark} style={{
          height: "231px",
          width: "231px",
          borderRadius: "50%",
          background: "linear-gradient(156.53deg, rgba(216, 69, 31, 0.7) 42.01%, rgba(58, 51, 216, 0.7) 91.09%)"
        }}/>
      </div>
  )
}

export default Home
