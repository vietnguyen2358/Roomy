import React, { useState, useEffect } from "react";
import ReactMapboxGl from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const Map = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_KEY,
});

function MapBackground({ coordinates, springAPI }) {
  const defaultCoordinates = [-122.4194, 37.7749]; // Bay Area

  // State to track map center & zoom
  const [mapCenter, setMapCenter] = useState(defaultCoordinates);
  const [mapZoom, setMapZoom] = useState([8]); // Start with zoom 8

  useEffect(() => {
    if (coordinates?.length && coordinates[0] !== 0 && coordinates[1] !== 0) {
      setMapCenter(coordinates); // Update center
      setMapZoom([22]); // Zoom in when valid coordinates are provided
    }
  }, [coordinates]); // Runs only when coordinates change

  return (
    <Map
      style="mapbox://styles/mapbox/satellite-v9"
      containerStyle={{
        height: "100%",
        width: "100%",
      }}
      center={mapCenter}
      zoom={mapZoom} // Dynamic zoom level
      onZoomEnd={() =>
        springAPI.start({ from: { opacity: 0 }, to: { opacity: 1 } })
      }
    />
  );
}

export default React.memo(MapBackground);
