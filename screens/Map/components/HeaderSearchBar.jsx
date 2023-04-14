import React from 'react';
import {
  TextInput,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Animated,
} from 'react-native';
import { Icon, NativeBaseProvider } from 'native-base';
import { Ionicons } from '@expo/vector-icons/';
import Styles, { colorDarkBlue } from '../Styles';

export default function HeaderSearchBar({
  searchResultsViewFadeAnim,
  searchResultsViewZIndexAnim,
  setSearchBarHeight,
  cancelBtnFadeAnim,
  selectedMarker,
  textInputValue,
  setTextInputValue,
}) {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <NativeBaseProvider>
        <View
          onLayout={(event) => {
            const { layout } = event.nativeEvent;
            setSearchBarHeight(layout.height);
          }}
          style={Styles.headerSearchBarContainer}
        >
          <Animated.View
            style={Styles.headerSearchBarView}
          >
            <Icon
              as={Ionicons}
              name="search-outline"
              size="6"
              color={colorDarkBlue}
            />
            <TextInput
              style={Styles.headerSearchBarTextInput}
              placeholder="搜尋"
              placeholderTextColor={colorDarkBlue}
              value={textInputValue}
              onChangeText={(text) => {
                setTextInputValue(text);
              }}
              onFocus={() => {
                Animated.timing(searchResultsViewFadeAnim, {
                  toValue: 1,
                  duration: 150,
                  useNativeDriver: true,
                }).start();
                Animated.timing(searchResultsViewZIndexAnim, {
                  toValue: 10000,
                  duration: 150,
                  useNativeDriver: true,
                }).start();
                Animated.timing(cancelBtnFadeAnim, {
                  toValue: 1,
                  duration: 150,
                  useNativeDriver: true,
                }).start();
              }}
            />
            <Animated.View style={{ opacity: cancelBtnFadeAnim }}>
              <TouchableOpacity
                onPress={() => {
                  Keyboard.dismiss();
                  if (selectedMarker === '') {
                    setTextInputValue('');
                  } else {
                    setTextInputValue(selectedMarker);
                  }
                  Animated.timing(searchResultsViewFadeAnim, {
                    toValue: 0,
                    duration: 150,
                    useNativeDriver: true,
                  }).start();
                  Animated.timing(searchResultsViewZIndexAnim, {
                    toValue: -1,
                    duration: 150,
                    useNativeDriver: true,
                  }).start();
                  Animated.timing(cancelBtnFadeAnim, {
                    toValue: 0,
                    duration: 150,
                    useNativeDriver: true,
                  }).start();
                }}
              >
                <Text style={{ color: 'primary.600', fontSize: 18 }}>取消</Text>
              </TouchableOpacity>
            </Animated.View>

          </Animated.View>

          {/* two left buttons */}
          {/* <TouchableOpacity style={{marginHorizontal:4}}>
          <Icon
              as={Ionicons}
              name="chatbubble-outline"
              size="6"
              color="primary.600"
            />
          </TouchableOpacity>
          <TouchableOpacity>
          <Icon
              as={Ionicons}
              name="person-outline"
              size="6"
              color="primary.600"
            />
          </TouchableOpacity> */}
        </View>
      </NativeBaseProvider>
    </TouchableWithoutFeedback>
  );
}
