/* eslint-disable react/no-array-index-key */
import {
  Text, View, Animated, TouchableOpacity, Keyboard,
} from 'react-native';
import React from 'react';
import { Icon } from 'native-base';
import { Entypo } from '@expo/vector-icons';
import BuildingsInfo from '../assets/BuildingsInfo';

export default function SearchResults({
  screenHeight,
  searchBarHeight,
  searchResultsViewFadeAnim,
  searchResultsViewZIndexAnim,
  cancelBtnFadeAnim,
  textInputValue,
  setSelectedMarker,
  changeCenter,
  setBottomDrawerShow,
  setTextInputValue,
  estimateDistance,
  setEstimateDistance,
  getTwoPointsDistance,
  userLocation,
  selectedMarker,
}) {
  return (
    <Animated.ScrollView
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
      style={{
        position: 'absolute',
        width: '100%',
        backgroundColor: 'white',
        bottom: 0,
        height: screenHeight - searchBarHeight,
        zIndex: searchResultsViewZIndexAnim,
        opacity: searchResultsViewFadeAnim,
        borderTopColor: '#e5e5e5',
        borderTopWidth: 1,
      }}
    >
      {BuildingsInfo
        .filter((obj) => {
          if (textInputValue === '' || textInputValue === ' ') { return 0; }
          return obj.units.includes(textInputValue) || obj.name.includes(textInputValue);
        })
        .map((val, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              Keyboard.dismiss();
              setSelectedMarker({
                name: val.name,
                latitude: val.latitude,
                longitude: val.longitude,
              });
              setTextInputValue(val.name);
              changeCenter(val.latitude - 0.0006, val.longitude);
              setBottomDrawerShow(true);
              Animated.timing(searchResultsViewFadeAnim, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
              }).start();
              Animated.timing(searchResultsViewZIndexAnim, {
                toValue: -1,
                duration: 200,
                useNativeDriver: true,
              }).start();
              Animated.timing(cancelBtnFadeAnim, {
                toValue: 0,
                duration: 150,
                useNativeDriver: true,
              }).start();
            }}
            style={{ paddingVertical: 20 }}
          >
            <View style={{
              flexDirection: 'row', marginHorizontal: 30, alignItems: 'center', justifyContent: 'space-between',
            }}
            >
              <Text style={{ fontSize: 15 }}>{val.name}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ color: '#a3a3a3', fontSize: 15, marginRight: 14 }}>
                  {getTwoPointsDistance(val.latitude, val.longitude)}
                  公尺
                </Text>
                <Icon as={Entypo} name="direction" size={19} color="#a3a3a3" />
              </View>
            </View>
          </TouchableOpacity>
        ))}
    </Animated.ScrollView>
  );
}
