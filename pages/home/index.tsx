import React, {useEffect, useRef, useState} from 'react';
import {YMaps, Map, Polygon, Circle, GeoObject, ObjectManager} from "@pbe/react-yandex-maps";
import Head from 'next/head';

const Home = () => {
  const map = useRef(null);
  const [lng, setLng] = useState(30.315877);
  const [lat, setLat] = useState(59.939099);

  return (
      <>
        <div>
          <YMaps>
            <div>My awesome application with maps!</div>
            <Map onLoad={(api) => {
            }} defaultState={{center: [lat, lng], zoom: 9}} style={{width: "1000px", height: "500px"}}>
              <GeoObject geometry={{
                type: 'LineString',
                coordinates: [
                  [37.867472, 55.823703],
                  [37.868511, 55.823919],
                  [37.87046, 55.824271],
                  [37.871728, 55.82465],
                  [37.872441, 55.824851],
                  [37.873601, 55.825184],
                  [37.874402, 55.825244],
                  [37.874879, 55.825267],
                  [37.875665, 55.825342],
                  [37.876002, 55.824903],
                  [37.873097, 55.823794],
                  [37.868942, 55.82287],
                  [37.869207, 55.822363],
                  [37.868322, 55.822211],
                  [37.867472, 55.823703]
                ]
              }} options={{
                geodesic: true,
                strokeWidth: 5,
                strokeColor: '#F008'
              }} />
            </Map>
          </YMaps>
        </div>
      </>
  );
};

export default Home