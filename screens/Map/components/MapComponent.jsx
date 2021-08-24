import React, { useState, useEffect } from 'react';
import {
  Image, Platform, Keyboard,
} from 'react-native';
import MapView, { Geojson, Marker } from 'react-native-maps';
import MapController from '../../../controller/Map';
import PlaceData from './PlaceData';
import styles from '../Styles';
import BusIcon from '../../../assets/MapIcon/bus.png';
import BuildingIcon from '../../../assets/MapIcon/building.png';
import RestaurantIcon from '../../../assets/MapIcon/restaurant.png';
import BadmintonIcon from '../../../assets/MapIcon/badminton.png';
import VolleyballIcon from '../../../assets/MapIcon/volleyball.png';

const icons = {
  building: BuildingIcon,
  restaurant: RestaurantIcon,
  badminton: BadmintonIcon,
  volleyball: VolleyballIcon,
};

const MapComponent = ({ busVisible }) => {
  const [markers, setMarkers] = useState([]);
  const [busPositions, setBusPositions] = useState([]);
  useEffect(() => {
    MapController.queryAllBuilding()
      .then((response) => {
        setMarkers(response);
      });
  }, []);
  useEffect(() => {
    MapController.getAllBus()
      .then((response) => {
        setBusPositions(response);
      });
    const id = setInterval(() => {
      MapController.getAllBus()
        .then((response) => {
          setBusPositions(response);
        });
    }, 30000);
    return () => clearInterval(id);
  }, []);

  return (
    <MapView
      onPress={() => Keyboard.dismiss()}
      onRegionChange={() => Keyboard.dismiss()}
      style={styles.map}
      initialCamera={{
        center: {
          latitude: 24.9682806,
          longitude: 121.1928889,
        },
        altitude: 2000,
        pitch: 45,
        heading: 0,
        zoom: 16,
      }}
    >
      {busVisible
        && busPositions.map(({
          busId, longitude, latitude, routeName,
        }) => (
          <Marker
            key={busId}
            coordinate={{
              latitude,
              longitude,
            }}
            title={routeName}
            description={busId}
          >
            <Image source={BusIcon} style={{ width: 25, height: 25 }} />
          </Marker>
        ))}
      {markers.map((marker) => (
        <Marker
          key={marker.chineseName}
          coordinate={marker}
          title={marker.chineseName}
        >
          <Image source={icons[marker.image]} style={{ width: 25, height: 25 }} />
        </Marker>
      ))}
      {Platform.OS === 'ios'
        && (
        <Geojson
          geojson={PlaceData}
          strokeColor="gray"
          strokeWidth={0.5}
        />
        )}
    </MapView>
  );
};

export default MapComponent;
