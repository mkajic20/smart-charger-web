import React, { useEffect, useRef, useState } from "react";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import PropTypes from "prop-types";

import "./MapComponent.css";
import "leaflet/dist/leaflet.css";

const defaultCenter = [46.307834, 16.33836];
const defaultZoom = 18;

const SetMarker = ({ setMarkerLocation }) => {
  const [marker, setMarker] = useState(null);

  const handleMapClick = (e) => {
    const newMarker = e.latlng;
    setMarker(newMarker);
    setMarkerLocation(newMarker);
  };

  useMapEvents({
    click: handleMapClick,
  });

  return marker ? <Marker position={marker}></Marker> : null;
};

const MapComponent = ({ setMarkerLocation }) => {
  const mapRef = useRef();

  return (
    <div>
      <MapContainer ref={mapRef} center={defaultCenter} zoom={defaultZoom}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <SetMarker setMarkerLocation={setMarkerLocation} />
      </MapContainer>
    </div>
  );
};

MapComponent.propTypes = {
  setMarkerLocation: PropTypes.func,
};

export default MapComponent;
