/* eslint-disable react/no-array-index-key */
/* eslint-disable react/destructuring-assignment */
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Animated,
} from 'react-native';
import React, { useState, useRef } from 'react';
import { Icon } from 'native-base';
import MarkersCategories from '../assets/MarkersCategories';

export default function CategorySlider(props) {
  const [selectedBtn, setSelectedBtn] = useState('');

  const showAllBtnFadeAnim = useRef(new Animated.Value(0)).current;
  const showAllBtnMoveAnim = useRef(new Animated.Value(-100)).current;

  return (
    <View>
      <View
        style={{
          backgroundColor: '#fff',
          paddingVertical: 10,
          paddingLeft: 0,
          shadowColor: '#000000',
          shadowOpacity: 0.02,
          shadowOffset: {
            width: 0,
            height: 9,
          },
          // marginTop:10
        }}
      >
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {MarkersCategories.map((type, index) => (
            <TouchableOpacity
              activeOpacity={1}
              style={{ alignItems: 'center', width: 80 }}
              key={index}
              onPress={() => {
                setSelectedBtn(type.title);
                props.setMarkerShowType(type.title);
                Animated.timing(showAllBtnFadeAnim, {
                  toValue: 1,
                  duration: 150,
                  useNativeDriver: true,
                }).start();
                Animated.timing(showAllBtnMoveAnim, {
                  toValue: 0,
                  duration: 150,
                  useNativeDriver: true,
                }).start();
              }}
            >
              <View style={{ marginBottom: 8, paddingTop: 8 }}>
                <Icon
                  as={type.icon}
                  name={type.iconName}
                  size="35"
                  color={
                      type.title === selectedBtn || selectedBtn === ''
                        ? 'black'
                        : '#e5e5e5'
                    }
                />
              </View>
              <Text
                style={{
                  color:
                      type.title === selectedBtn || selectedBtn === ''
                        ? 'black'
                        : '#e5e5e5',
                }}
              >
                {type.title}
              </Text>
            </TouchableOpacity>
          ))}

          {/* event red dot */}
          {/* <View
            style={{
              backgroundColor: 'red',
              height: 12,
              width: 12,
              borderRadius: 50,
              position: 'absolute',
              zIndex: 1000,
              right: -3,
              top: -5,
            }}
          />
          <View
            style={{
              backgroundColor: 'white',
              height: 16,
              width: 16,
              borderRadius: 50,
              position: 'absolute',
              zIndex: 100,
              right: -5,
              top: -7,
            }}
          /> */}
        </ScrollView>
      </View>
      <Animated.View
        style={{
          alignItems: 'center',
          display: 'flex',
          zIndex: -1,
          opacity: showAllBtnFadeAnim,
          transform: [{ translateY: showAllBtnMoveAnim }],
        }}
      >
        <TouchableOpacity
          style={{
            alignItems: 'center',
            backgroundColor: 'white',
            borderRadius: 50,
            marginTop: 10,
            paddingVertical: 10,
            width: '30%',
          }}
          activeOpacity={1}
          onPress={() => {
            setSelectedBtn('');
            props.setMarkerShowType('');
            Animated.timing(showAllBtnFadeAnim, {
              toValue: 0,
              duration: 150,
              useNativeDriver: true,
            }).start();
            Animated.timing(showAllBtnMoveAnim, {
              toValue: -100,
              duration: 150,
              useNativeDriver: true,
            }).start();
          }}
        >
          <Text>顯示全部</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}
