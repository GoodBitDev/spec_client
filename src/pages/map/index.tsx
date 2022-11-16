import React, {useEffect, useRef, useState} from 'react';
import {$map} from "../../map-box/store";
import {useStore} from "effector-react";
import all from '../../allinone.json'
// import mapboxgl, {Marker} from "mapbox-gl";
import pin from '../../pin.svg';
// import dynamic from 'next/dynamic'

import MapBox from "../../map-box/MapBox";
import mapboxgl from "mapbox-gl";
// const MapBox = dynamic(() =>
//     import('../../map-box/MapBox')
// )

// const markers: any = {};
// let markersOnScreen: any = {};

const Map = () => {
  const mark = useRef(null);
  const popup = useRef(null)
  const [render, setRender] = useState(0);
  const map = useStore($map);

  useEffect(() => {
    if (!map?.loaded()) {
      map?.on("load", () => {

        map?.loadImage(
            'pin.png',
            (error, result) => {
              if (error) alert(error);

              // @ts-ignore
              map?.addImage('pin', result);
            }
        )
        // map?.addSource(`moscow`, {
        //   type: "geojson",
        //   // @ts-ignore
        //   data: data
        // });
        //
        // map?.addLayer({
        //   id: `maine`,
        //   type: 'fill',
        //   source: `moscow`,
        //   paint: {
        //     "fill-color": "rgba(106, 88, 144, 0.7)",
        //   }
        // });
        //
        // map?.addLayer({
        //   id: `outline`,
        //   type: 'line',
        //   source: `moscow`,
        //   paint: {
        //     "line-color": '#FFFFFF',
        //     "line-width": 1
        //   }
        // });
        //
        // map?.on('click', 'moscow', (e) => {
        //
        //   new mapboxgl.Popup()
        //       .setLngLat([37.3855235, 55.582026])
        //       .setHTML('<h1>Hello</h1>')
        //       .setDOMContent(popup.current)
        //       .addTo(map);
        // });


        map?.addSource('earthquakes', {
          type: "geojson",
          data: 'https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson',
          // data: shop,
          cluster: true,
          clusterRadius: 80,
          clusterProperties: {
            sum: ["+", ['get', 'mag']],
            max: ["max", ['get', 'mag']],
            maxCount: ["max", ["+", ['get', 'mag']]]
          }
        })

        map?.addLayer({
          id: 'clusters',
          type: 'circle',
          // type: 'heatmap',
          source: 'earthquakes',
          // filter: ['get', 'mag'],
          paint: {
            'circle-color': [
              // 'rgba',
              // // 'rgba',
              // ['/', ['*', ['get', 'point_count'], 100], ['get', 'max']],
              // ['-', 100, ['/', ['*', ['get', 'point_count'], 1], ['get', 'max']]],
              // // 0,
              // 0,
              // 0.7

              "step",
              ["get", "sum"],
              "rgba(46, 181, 106, 0.7)",
              2,
              "rgba(241, 140, 97, 0.7)",
              5,
              "rgba(239, 32, 32, 0.7)"

            ],
            'circle-radius': [
              'step',
              ['get', 'point_count'],
              20,
              100,
              30,
              750,
              40
            ],
            "circle-blur": 0.6
            // 'heatmap-weight': [
            //   'interpolate',
            //   ['linear'],
            //   ['get', 'mag'],
            //   0,
            //   0,
            //   6,
            //   1
            // ],
// Increase the heatmap color weight weight by zoom level
// heatmap-intensity is a multiplier on top of heatmap-weight
//             'heatmap-intensity': [
//               'interpolate',
//               ['linear'],
//               ['zoom'],
//               0,
//               1,
//               9,
//               3
//             ],
// Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
// Begin color ramp at 0-stop with a 0-transparancy color
// to create a blur-like effect.
//             'heatmap-color': [
//               'interpolate',
//               ['linear'],
//               ['heatmap-density'],
//               0,
//               'rgba(33,102,172,0)',
//               0.2,
//               'rgb(103,169,207)',
//               0.4,
//               'rgb(209,229,240)',
//               0.6,
//               'rgb(253,219,199)',
//               0.8,
//               'rgb(239,138,98)',
//               1,
//               'rgb(178,24,43)'
//             ],
// Adjust the heatmap radius by zoom level
//             'heatmap-radius': [
//               'interpolate',
//               ['linear'],
//               ['zoom'],
//               0,
//               2,
//               9,
//               20
//             ],
// Transition from heatmap to circle layer by zoom level
//             'heatmap-opacity': [
//               'interpolate',
//               ['linear'],
//               ['zoom'],
//               7,
//               1,
//               9,
//               0
//             ]

          }
        });

//         map.addLayer(
//             {
//               'id': 'earthquakes-point',
//               'type': 'circle',
//               'source': 'earthquakes',
//               'minzoom': 7,
//               'paint': {
// // Size circle radius by earthquake magnitude and zoom level
//                 'circle-radius': [
//                   'interpolate',
//                   ['linear'],
//                   ['zoom'],
//                   7,
//                   ['interpolate', ['linear'], ['get', 'mag'], 1, 1, 6, 4],
//                   16,
//                   ['interpolate', ['linear'], ['get', 'mag'], 1, 5, 6, 50]
//                 ],
// // Color circle by earthquake magnitude
//                 'circle-color': [
//                   'interpolate',
//                   ['linear'],
//                   ['get', 'mag'],
//                   1,
//                   'rgba(46, 181, 106, 0.7)',
//                   3,
//                   'rgba(255, 141, 51, 0.7)',
//                   6,
//                   'rgba(239, 32, 32, 0.7)'
//                 ],
//                 'circle-stroke-color': 'white',
//                 'circle-stroke-width': 1,
// // Transition from heatmap to circle layer by zoom level
//                 'circle-opacity': [
//                   'interpolate',
//                   ['linear'],
//                   ['zoom'],
//                   7,
//                   0,
//                   8,
//                   1
//                 ]
//               }
//             },
//             'waterway-label'
//         );

        map?.addLayer({
          id: 'cluster-count',
          type: 'symbol',
          source: 'earthquakes',
          filter: ['has', 'point_count'],
          layout: {
            'text-field': [
              'number-format',
              ['number', ['get', 'point_count'], 0],
              {'min-fraction-digits': 0, 'max-fraction-digits': 0}
            ],
            'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
            'text-size': 12,
          },
          paint: {
            "text-color": "#000000",
          }
        });

        map?.addLayer({
          id: 'unclustered-point',
          // type: 'symbol',
          type: 'symbol',
          source: 'earthquakes',
          filter: ['!', ['has', 'point_count']],
          layout: {
            "icon-image": 'pin',
            "icon-size": 0.5,
            "icon-allow-overlap": true
          },
          // paint: {
          //   "circle-color": [
          //     "step",
          //     ["get", "mag"],
          //     "rgba(46, 181, 106, 0.7)",
          //     2,
          //     "rgba(241, 140, 97, 0.7)",
          //     4,
          //     "rgba(239, 32, 32, 0.7)"
          //   ],
          //   "circle-radius": 20
          //
          // }
        });


        // map?.addLayer({
        //   id: 'unclustered-circle',
        //   type: 'circle',
        //   source: 'earthquakes',
        //   filter: ['!', ['has', 'point_count']],
        //   paint: {
        //     "circle-radius": 20,
        //     "circle-color": "#00F00F"
        //   }
        // });

        map.on('click', 'unclustered-point', (e) => {
          // @ts-ignore
          const coordinates = e.features[0].geometry.coordinates.slice();
          // @ts-ignore
          const mag = e.features[0].properties.mag;
          // @ts-ignore
          // @ts-ignore
          const tsunami = e.features[0].properties.tsunami === 1 ? 'yes' : 'no';

// Ensure that if the map is zoomed out such that
// multiple copies of the feature are visible, the
// popup appears over the copy being pointed to.
          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
          }

          const popupM = new mapboxgl.Popup();

          popupM.addClassName(`
          [&_.mapboxgl-popup-content]:p-2.5
          [&_.mapboxgl-popup-content]:rounded-xs
          [&_.popup-title]:text-xs
          [&_.popup-title]:font-medium
          [&_.popup-text]:text-xxs
          `)

          popupM.setLngLat(coordinates);
          popupM.setHTML(`<span class="popup-title">magnitude: ${mag}</span><br><span class="popup-text">Was there a tsunami?: ${tsunami}</span>`)
          popupM.addTo(map)

          // new mapboxgl.Popup()
          //   .addClassName()
          //     .setLngLat(coordinates)
          //     .setHTML(
          //         `<div className="px-5"></div>`
          //     )
          //   .a
          //     .addTo(map);
        });


        all.map((source, index) => {
          map?.addSource(`kiev ${index}`, {
            type: "geojson",
            // @ts-ignore
            data: source
          });

          map?.addLayer({
            id: `maine ${index}`,
            type: 'fill',
            source: `kiev ${index}`,
            paint: {
              "fill-color": source.color,
            }
          });

          map?.addLayer({
            id: `outline ${index}`,
            type: 'line',
            source: `kiev ${index}`,
            paint: {
              "line-color": '#FFFFFF',
              "line-width": 1
            }
          });


        })

      });
    }
  });

  // const onClick = () => {
  //   map?.addSource('earthquakes', {
  //     type: "geojson",
  //     data: 'https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson',
  //     // data: shop,
  //     cluster: true,
  //     clusterRadius: 80,
  //   })
  //
  //   map?.addLayer({
  //     id: 'clusters',
  //     type: 'circle',
  //     source: 'earthquakes',
  //     // filter: ['get', 'mag'],
  //     paint: {
  //       'circle-color': [
  //         'rgb',
  //         0,
  //         ["/", ["*", ['number', ['get', 'mag']], 100], 5],
  //         0
  //       ],
  //       'circle-radius': [
  //         'step',
  //         ['get', 'point_count'],
  //         20,
  //         100,
  //         30,
  //         750,
  //         40
  //       ]
  //     }
  //   });
  //
  //   map?.addLayer({
  //     id: 'cluster-count',
  //     type: 'symbol',
  //     source: 'earthquakes',
  //     filter: ['has', 'point_count'],
  //     layout: {
  //       'text-field': '{point_count_abbreviated}',
  //       'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
  //       'text-size': 12
  //     },
  //     'paint': {
  //       'text-color': [
  //         'case',
  //         ['<', ['get', 'mag'], 3],
  //         'black',
  //         'white'
  //       ]
  //     }
  //   });
  //
  //   map?.addLayer({
  //     id: 'unclustered-point',
  //     type: 'symbol',
  //     source: 'earthquakes',
  //     filter: ['!', ['has', 'point_count']],
  //     layout: {
  //       "icon-image": 'pin',
  //       "icon-size": 0.5
  //     }
  //   });
  // }


  return (
      <div className='absolute top-0 left-0 bottom-0 right-0'>
        <div className='w-full h-full'>
          <MapBox/>
        </div>
        <div ref={mark}/>
        <div ref={popup}/>
        <button>CLICK</button>
        <button onClick={() => setRender(prevState => prevState + 1)}>{render}</button>
      </div>
  );
};

export default Map
