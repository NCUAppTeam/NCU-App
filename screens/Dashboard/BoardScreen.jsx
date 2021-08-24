import React, { useState } from 'react';
import {
  SafeAreaView, View, RefreshControl, ScrollView,
} from 'react-native';
import Header from './components/Header';
import WeatherWidget from './components/Weather';
import NetFlowWidget from './components/NetFlow';
import AdsWidget from './components/Ads';
import styles from './Styles';

function BoardScreen({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={(
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
      )}
      >
        <Header navigation={navigation} />
        <View style={styles.container}>
          <WeatherWidget refresh={refreshing} />
          <NetFlowWidget refresh={refreshing} />
          <AdsWidget />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default BoardScreen;
