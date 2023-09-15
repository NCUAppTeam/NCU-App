/* eslint-disable react/no-array-index-key */
import React from 'react'
import {
  View, Text, TouchableOpacity
} from 'react-native'
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet'
import { Icon } from 'native-base'
import { Entypo } from '@expo/vector-icons'
import getDirections from 'react-native-google-maps-directions'
import BuildingsInfo from '../assets/BuildingsInfo'

export default function BottomDrawer ({
  snapPoints,
  sheetRef,
  userLocation,
  selectedMarker,
  getTwoPointsDistance,
  bottomDrawerState,
  handleSheetChanges
}) {
  const handleGetDirections = () => {
    const data = {
      source: {
        latitude: userLocation.latitude,
        longitude: userLocation.long
      },
      destination: {
        latitude: selectedMarker.latitude,
        longitude: selectedMarker.longitude
      },
      params: [
        {
          key: 'travelmode',
          value: 'walking'
        },
        {
          key: 'dir_action',
          value: 'navigate'
        }
      ]
    }
    getDirections(data)
  }

  return (
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
        height: 20
      }}
    >
      <View style={{
        backgroundColor: '#E5EBF1',
        width: '100%',
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
      >
        <Text style={{ paddingLeft: 20 }}>
          {getTwoPointsDistance(selectedMarker.latitude, selectedMarker.longitude)}
          公尺
        </Text>
        <View style={{
          alignItems: 'center', position: 'absolute', left: 0, width: '100%'
        }}
        >
          <Text
            numberOfLines={1}
            style={{
              color: '#476685',
              fontSize: 23,
              fontWeight: '700',
              width: '47%',
              textAlign: 'center'
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
        <View style={{ paddingHorizontal: 25, paddingVertical: 20 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 15, marginBottom: 10 }}>開放時間</Text>
          {BuildingsInfo.filter((val) => val.name === selectedMarker.name).map((element) => (
            element.opentime.map((time, index) => (
              <Text key={index} style={{ fontSize: 15, marginBottom: 10 }}>{time}</Text>
            ))
          ))}
          <Text style={{ fontWeight: 'bold', fontSize: 15, marginBottom: 10 }}>建築物資訊</Text>
          {BuildingsInfo.filter((val) => val.name === selectedMarker.name).map((e) => (
              <Text key={e.index} style={{ fontSize: 15, marginBottom: 10 }}>{e.units}</Text>
          ))}
        </View>
      </BottomSheetScrollView>
    </BottomSheet>
  )
}
