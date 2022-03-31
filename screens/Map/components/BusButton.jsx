import { View, TouchableOpacity } from 'react-native';
import React from 'react';
import { Icon } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

export default function BusButton({ bottomDrawerShow, navigation }) {
  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.8}
        style={{
          backgroundColor: '#1784B2',
          position: 'absolute',
          width: 56,
          height: 56,
          bottom: 10,
          right: 10,
          borderRadius: 50,
          alignItems: 'center',
          justifyContent: 'center',
          shadowColor: '#000000',
          shadowOpacity: 0.4,
          shadowOffset: {
            width: 0,
            height: 1.3,
          },
          shadowRadius: 1.3,
          display: bottomDrawerShow ? 'none' : 'flex',
        }}
        onPress={() => navigation.navigate('公車')}
      >
        <Icon as={Ionicons} name="bus-outline" size="9" color="#fbeeac" />
      </TouchableOpacity>
    </View>
  );
}
