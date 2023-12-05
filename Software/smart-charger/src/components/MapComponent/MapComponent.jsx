import React, { useRef, useState } from "react";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import PropTypes from "prop-types";

import "./MapComponent.css";
import "leaflet/dist/leaflet.css";

const defaultCenter = [46.307834, 16.33836];
const defaultZoom = 18;

const AddMarkers = ({ markers }) => {
  console.log(markers);
};

const ClickMarker = ({ setMarkerLocation }) => {
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

const MapComponent = ({
  setMarkerLocation,
  clickMarker,
  markers,
  biggerMap,
}) => {
  const mapRef = useRef();

  const mapStyle = {
    width: biggerMap ? "100%" : "50vw",
    height: biggerMap ? "90vh" : "50vh",
  };

  return (
    <div>
      <MapContainer
        ref={mapRef}
        center={defaultCenter}
        zoom={defaultZoom}
        style={mapStyle}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {clickMarker && <ClickMarker setMarkerLocation={setMarkerLocation} />}
        {markers && <AddMarkers markers={markers} />}
      </MapContainer>
    </div>
  );
};

MapComponent.propTypes = {
  setMarkerLocation: PropTypes.func,
  clickMarker: PropTypes.bool,
  markers: PropTypes.array,
  biggerMap: PropTypes.bool,
};

export default MapComponent;
