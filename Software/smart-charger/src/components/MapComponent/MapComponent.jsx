import React, { useEffect, useRef, useState } from "react";
import {
  MapContainer,
  Marker,
  TileLayer,
  useMapEvents,
  Tooltip,
} from "react-leaflet";
import PropTypes from "prop-types";
import L from "leaflet";
import { reverseGeocode } from "../../utils/api/geocode";

import "./MapComponent.css";
import "leaflet/dist/leaflet.css";

const defaultCenter = [46.307834, 16.33836];
const defaultZoom = 18;

const AddMarkers = ({ markers }) => {
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    const fetchAddresses = async () => {
      const addressesPromises = markers.map(async (marker) => {
        return await reverseGeocode(marker.latitude, marker.longitude);
      });

      const addresses = await Promise.all(addressesPromises);
      setAddresses(addresses);
    };

    fetchAddresses();
  }, [markers]);

  const redIcon = new L.Icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  const greenIcon = new L.Icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  return (
    <>
      {markers.map((marker, index) => (
        <Marker
          key={index}
          position={[marker.latitude, marker.longitude]}
          icon={marker.active ? redIcon : greenIcon}
        >
          <Tooltip>
            {marker.name} <br /> {addresses[index] || "Address not available"}
          </Tooltip>
        </Marker>
      ))}
    </>
  );
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

  return marker ? <Marker position={marker} /> : null;
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
        maxZoom={18}
        minZoom={5}
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
