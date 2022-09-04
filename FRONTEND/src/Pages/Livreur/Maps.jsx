import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

function Maps() {
  const adress = "20 rue Joseph Delon, 92160";

  const [center, setCenter] = useState();

  useEffect(() => {
    const apiUrl =
      "https://maps.googleapis.com/maps/api/geocode/json?address=" +
      adress +
      "&key=Google API Key";
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setCenter({lat : data.results[0].geometry.location.lat , lng : data.results[0].geometry.location.lng}));
  }, []);

  const containerStyle = {
    width: "400px",
    height: "400px",
  };

  return (
    <div>
      <LoadScript googleMapsApiKey="Google API Key">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={20}
        ></GoogleMap>
      </LoadScript>
    </div>
  );
}

export default Maps;
