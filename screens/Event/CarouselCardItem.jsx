import React from 'react';
import { View, Image } from 'react-native';
import styles from './style_folder/Styles_showActivityDetails';

const CarouselCardItem = ({ item, index }) => (
  <View style={{ width: 300, height: 300 }} key={index}>
    <Image source={{ uri: item }} style={styles.bigpic} />
  </View>
);

export default CarouselCardItem;
