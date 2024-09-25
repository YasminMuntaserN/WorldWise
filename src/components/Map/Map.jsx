import { useCities } from "../../contexts/citiesContext";
import styles from "./Map.module.css";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import { useGeolocation } from "../../hooks/useGeolocation";
import Button from "../Map/Map"
import useUrlPosition from "../../hooks/useUrlPosition";

function Map() {

  const [mapPosition, setMapPosition] = useState([40, 0]); // Default position
  const { cities } = useCities(); // Cities context data
  const {isLoading :isLoadingPosition ,   position:geolocationPosition,
    getPosition
  } = useGeolocation();
  const {mapLat,mapLng}=useUrlPosition();


  useEffect(function(){
    if (mapLat && mapLng) setMapPosition([mapLat, mapLng]); // Pass lat/lng as array
  }, [mapLat, mapLng]);

  useEffect(function(){
    if (geolocationPosition)
       setMapPosition([geolocationPosition.lat, geolocationPosition.lng]); // Pass lat/lng as array
  }, [geolocationPosition]);

  return (
    <div className={styles.mapContainer}>
      {!geolocationPosition &&  <Button type='position' onClick={getPosition}>
          {isLoadingPosition ? "Loading..." :"User Your Position "}
        </Button>
      }
      <MapContainer center={mapPosition} zoom={6} scrollWheelZoom={true} className={styles.map}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker position={[city.position.lat, city.position.lng]} key={city.id}>
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.name}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
        <DetectClick /> {/* Should be inside MapContainer */}
      </MapContainer>
    </div>
  );
}

// Define PropTypes for the ChangeCenter component
ChangeCenter.propTypes = {
  position: PropTypes.arrayOf(PropTypes.number).isRequired, // Expect position as an array of numbers
};

function ChangeCenter({ position }) {
  const map = useMap(); // Use Leaflet map instance
  map.setView(position); // Change map view based on new position
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
}

export default Map; 
