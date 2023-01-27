/* eslint-disable react/no-array-index-key */
import React, {
  useState, useRef, useEffect, useMemo, useCallback,
} from 'react';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import {
  View,
  Animated,
  Text,
} from 'react-native';
import { Icon, NativeBaseProvider } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { StatusBar } from 'expo-status-bar';
import HeaderSearchBar from './components/HeaderSearchBar';
import CategorySlider from './components/CategorySlider';
import BusButton from './components/BusButton';
import MapStyle from './assets/MapStyle';
import BuildingsInfo from './assets/BuildingsInfo';
import CustomMarkerView from './components/CustomMarkerView';
import SearchResults from './components/SearchResults';
import BottomDrawer from './components/BottomDrawer';
import Styles from './Styles';

export default function MapScreen({ navigation }) {
  const [userLocation, setUserLocation] = useState({
    latitude: 24.9682806,
    longitude: 121.1928889,
  });

  // bottom sheet
  const [bottomDrawerState, setBottomDrawerState] = useState(-1);
  const sheetRef = useRef(null);

  const snapPoints = useMemo(() => ['15%', '40%', '95%'], []);

  const handleSheetChanges = useCallback((index) => {
    setBottomDrawerState(index);
  }, []);

  const handleSnapPress = useCallback((index) => {
    sheetRef.current?.snapToIndex(index);
  }, []);
  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
    setBottomDrawerState(-1);
  }, []);
  //= ===============================================================

  const [markerShowType, setMarkerShowType] = useState('');
  const [selectedMarker, setSelectedMarker] = useState({ name: '' });
  const [bottomDrawerShow, setBottomDrawerShow] = useState(false);

  const searchResultsViewFadeAnim = useRef(new Animated.Value(0)).current;
  const searchResultsViewZIndexAnim = useRef(new Animated.Value(-1)).current;
  const cancelBtnFadeAnim = useRef(new Animated.Value(0)).current;

  const [screenHeight, setScreenHeight] = useState(0);
  const [searchBarHeight, setSearchBarHeight] = useState(0);
  const [textInputValue, setTextInputValue] = useState('');

  const mapView = useRef(null);
  const changeCenter = (newCenterLatitude, newCenterLongitude) => {
    mapView.current.animateToRegion({
      latitude: newCenterLatitude + 0.00045,
      longitude: newCenterLongitude,
      latitudeDelta: 0.001,
      longitudeDelta: 0.001,
    }, 200);
  };

  const getTwoPointsDistance = (buildingLat, buildingLon) => {
    const userLocLat = (userLocation.latitude * Math.PI) / 180;
    const userLocLon = (userLocation.longitude * Math.PI) / 180;
    const destinationLat = (buildingLat * Math.PI) / 180;
    const destinationLon = (buildingLon * Math.PI) / 180;

    // Haversine formula
    const dlon = destinationLon - userLocLon;
    const dlat = destinationLat - userLocLat;
    const a = Math.sin(dlat / 2) ** 2
                 + Math.cos(userLocLat) * Math.cos(destinationLat)
                 * Math.sin(dlon / 2) ** 2;

    const c = 2 * Math.asin(Math.sqrt(a));

    const r = 6371;

    // calculate the result
    return ((c * r * 1000).toFixed(0));
  };
  useEffect(() => {
    (async () => {
      await Location.requestForegroundPermissionsAsync();
      const location = await Location.getCurrentPositionAsync();
      setUserLocation({ latitude: location.coords.latitude, longitude: location.coords.longitude });
      // changeCenter(location.coords.latitude, location.coords.longitude);

      Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
        },
        (currentLocation) => {
          setUserLocation({
            latitude: currentLocation.coords.latitude,
            longitude: currentLocation.coords.longitude,
          });
        },
      );
    })();
  }, []);

  return (
    <NativeBaseProvider>
      <View
        style={Styles.flex}
        onLayout={(event) => {
          const { layout } = event.nativeEvent;
          setScreenHeight(layout.height);
        }}
      >
        <MapView
          ref={mapView}
          provider={PROVIDER_GOOGLE}
          customMapStyle={MapStyle}
          style={Styles.flex}
          camera={{
            center: {
              latitude: 24.9682806,
              longitude: 121.1928889,
            },
            altitude: 3000,
            heading: 0,
            pitch: 0,
            zoom: 16,
          }}
          pitchEnabled={false}
          onPress={(e) => {
            if (e.nativeEvent.action === undefined) {
              handleClosePress();
              setSelectedMarker({ name: '' });
              setTextInputValue('');
            }
          }}
        >
          {BuildingsInfo.filter(
            (obj) => obj.type === markerShowType || markerShowType === '',
          ).map((marker, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
              onPress={() => {
                setSelectedMarker({
                  name: marker.name,
                  latitude: marker.latitude,
                  longitude: marker.longitude,
                });
                setTextInputValue(marker.name);
                handleSnapPress(1);
                changeCenter(marker.latitude - 0.0006, marker.longitude);
              }}
            >
              <CustomMarkerView
                type={marker.type}
                name={marker.name}
                color={marker.color}
                selectedMarker={selectedMarker.name}
              />
            </Marker>
          ))}
          <Marker coordinate={{
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
          }}
          >
            <View style={{ alignItems: 'center' }}>
              <Icon as={MaterialCommunityIcons} name="human-handsup" size={10} color="#E30000" />
              <Text style={{ color: '#E30000' }}>現在位置</Text>
            </View>
          </Marker>
        </MapView>
        <View style={{ position: 'absolute', width: '100%' }}>
          <HeaderSearchBar
            searchResultsViewFadeAnim={searchResultsViewFadeAnim}
            searchResultsViewZIndexAnim={searchResultsViewZIndexAnim}
            cancelBtnFadeAnim={cancelBtnFadeAnim}
            searchBarHeight={searchBarHeight}
            setSearchBarHeight={setSearchBarHeight}
            selectedMarker={selectedMarker.name}
            textInputValue={textInputValue}
            setTextInputValue={setTextInputValue}
          />
          <CategorySlider
            setMarkerShowType={setMarkerShowType}
          />
          <BusButton bottomDrawerShow={bottomDrawerShow} navigation={navigation} />

        </View>

        <BottomDrawer
          bottomDrawerShow={bottomDrawerShow}
          sheetRef={sheetRef}
          snapPoints={snapPoints}
          selectedMarker={selectedMarker}
          getTwoPointsDistance={getTwoPointsDistance}
          userLocation={userLocation}
          bottomDrawerState={bottomDrawerState}
          handleSheetChanges={handleSheetChanges}
        />

        <SearchResults
          screenHeight={screenHeight}
          searchBarHeight={searchBarHeight}
          searchResultsViewFadeAnim={searchResultsViewFadeAnim}
          searchResultsViewZIndexAnim={searchResultsViewZIndexAnim}
          cancelBtnFadeAnim={cancelBtnFadeAnim}
          textInputValue={textInputValue}
          setTextInputValue={setTextInputValue}
          setSelectedMarker={setSelectedMarker}
          changeCenter={changeCenter}
          setBottomDrawerShow={setBottomDrawerShow}
          getTwoPointsDistance={getTwoPointsDistance}
          handleSnapPress={handleSnapPress}
        />
      </View>
      <StatusBar backgroundColor="white" />
    </NativeBaseProvider>
  );
}
