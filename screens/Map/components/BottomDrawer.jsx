import React, { useMemo } from 'react';
import {
  View, Text, TouchableOpacity,
} from 'react-native';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { Icon } from 'native-base';
import { Entypo } from '@expo/vector-icons';
import getDirections from 'react-native-google-maps-directions';

export default function BottomDrawer({
  snapPoints,
  sheetRef,
  userLocation,
  selectedMarker,
  getTwoPointsDistance,
  bottomDrawerState,
  handleSheetChanges,
}) {
  const handleGetDirections = () => {
    const data = {
      source: {
        latitude: userLocation.latitude,
        longitude: userLocation.long,
      },
      destination: {
        latitude: selectedMarker.latitude,
        longitude: selectedMarker.longitude,
      },
      params: [
        {
          key: 'travelmode',
          value: 'walking',
        },
        {
          key: 'dir_action',
          value: 'navigate',
        },
      ],
    };
    getDirections(data);
  };

  const dummyData = useMemo(
    () => Array(50)
      .fill(0)
      .map((_, index) => `index-${index}`),
    [],
  );
  return (
    <>
      <BottomSheet
        ref={sheetRef}
        index={-1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        handleIndicatorStyle={{ backgroundColor: bottomDrawerState === 2 ? '#E5EBF1' : '#c4c4c4', width: '8%', borderRadius: 50 }}
        handleStyle={{
          backgroundColor: '#E5EBF1',
          borderTopRightRadius: bottomDrawerState === 2 ? 0 : 15,
          borderTopLeftRadius: bottomDrawerState === 2 ? 0 : 15,
          height: 20,
        }}
      >
        <View style={{
          backgroundColor: '#E5EBF1',
          width: '100%',
          height: 60,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        >
          <Text style={{ paddingLeft: 20 }}>
            {getTwoPointsDistance(selectedMarker.latitude, selectedMarker.longitude)}
            公尺
          </Text>
          <View style={{
            alignItems: 'center', position: 'absolute', left: 0, width: '100%',
          }}
          >
            <Text
              numberOfLines={1}
              style={{
                color: '#28527A',
                fontSize: 23,
                fontWeight: '700',
                width: '47%',
                textAlign: 'center',
              }}
            >
              {selectedMarker.name}
            </Text>
          </View>
          <TouchableOpacity
            activeOpacity={0}
            style={{ paddingRight: 20 }}
            onPress={handleGetDirections}
          >
            <View style={{ alignItems: 'center' }}>
              <Icon as={Entypo} name="direction" size="25px" color="#000" />
              <Text style={{ marginTop: 3 }}>導航路線</Text>
            </View>
          </TouchableOpacity>
        </View>

        <BottomSheetScrollView>
          {dummyData.map((item) => (
            <View
              key={item}
              style={{
                padding: 6,
                margin: 6,
                backgroundColor: '#eee',
              }}
            >
              <Text>{item}</Text>
            </View>
          ))}
        </BottomSheetScrollView>
      </BottomSheet>
    </>
  );
}
