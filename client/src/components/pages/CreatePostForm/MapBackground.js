import React, { useEffect } from "react";
import ReactMapboxGl, { Feature, Layer, Marker } from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

function MapBackground(props) {
  const { dataLoaded, coordinates } = props;
  const API_KEY =
    "pk.eyJ1Ijoiam9yZGFuZHQyMiIsImEiOiJjbTc3MDAxdG0weXczMmxwdGc5dTZtcmUwIn0.iMOnqeVwdZI8QCY61Lm2Cw";
  const Map = ReactMapboxGl({
    accessToken: API_KEY,
  });

  return (
    <Map
      style="mapbox://styles/mapbox/satellite-v9"
      containerStyle={{
        height: "100%",
        width: "100%",
      }}
      zoom={coordinates}
    >
      {dataLoaded ? (
        <Layer type="symbol" id="marker" layout={{ "icon-image": "marker-15" }}>
          <Feature coordinates={coordinates} />
        </Layer>
      ) : (
        <Marker latitude={37.7749} longitude={-122.4194} anchor="bottom">
          <div style={{ fontSize: "20px" }}>📍</div>
        </Marker>
      )}
    </Map>
  );
}

export default React.memo(MapBackground);
