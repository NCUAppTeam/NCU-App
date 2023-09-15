/* eslint-disable react/no-array-index-key */
/* eslint-disable react/destructuring-assignment */
import { View, Text } from 'react-native'
import React from 'react'
import { Icon } from 'native-base'
import MarkersCategories from '../assets/MarkersCategories'

export default function CustomMarkerView (props) {
  return (
    <View style={{ alignItems: 'center' }}>
      {MarkersCategories.filter((obj) => obj.title === props.type).map(
        (val, index) => (
          <>
            <View
              key={index}
              style={{
                backgroundColor: props.name === props.selectedMarker || props.selectedMarker === '' ? val.color : 'rgba(0, 0, 0, 0.4)',
                width: 27,
                height: 27,
                justifyContent: 'center',
                alignItems: 'center',
                paddingLeft: props.type === '行政處室' ? 3 : 0,
                borderRadius: 50,
                borderColor: val.border,
                borderWidth: 1,
                marginBottom: 5
              }}
            >
              <Icon key={index} as={val.icon} name={val.iconName} size={4} color="white" />
            </View>
            <Text style={{ color: val.border, display: props.name === props.selectedMarker ? 'flex' : 'none' }}>{props.name}</Text>
          </>
        )
      )}
    </View>
  )
}
