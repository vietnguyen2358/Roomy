import React from "react";
import ReactMapboxGl, { Feature, Layer } from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

function MapBackground() {
  const Map = ReactMapboxGl({
    accessToken:
      "pk.eyJ1Ijoiam9yZGFuZHQyMiIsImEiOiJjbTc3MDAxdG0weXczMmxwdGc5dTZtcmUwIn0.iMOnqeVwdZI8QCY61Lm2Cw",
  });

  return (
    <Map
      style="mapbox://styles/mapbox/streets-v9"
      containerStyle={{
        height: "100%",
        width: "100%",
      }}
    >
      <Layer type="symbol" id="marker" layout={{ "icon-image": "marker-15" }}>
        <Feature coordinates={[37.354107, -121.955238]} />
      </Layer>
    </Map>
  );
}

export default React.memo(MapBackground);
