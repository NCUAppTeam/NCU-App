import React, { useState, useEffect } from 'react';
import {
  Text, View, SafeAreaView, RefreshControl, Image,
} from 'react-native';
import { Title } from 'react-native-paper';
import {
  Ionicons, FontAwesome5, AntDesign, Feather,
} from '@expo/vector-icons';
import {
  NativeBaseProvider, Box, FlatList, VStack, Pressable,
} from 'native-base';
import styles from './style_folder/Styles_moreEvent';
import ActiveController from '../../controller/Active';

function more({ navigation, route }) {
  const [active, setActive] = useState([]);
  useEffect(() => {
    ActiveController.getEventActive().then((res) => {
      setActive(res);
    }).catch((err) => {
      throw err;
    });
  }, []);

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    ActiveController.getEventActive().then((res) => {
      setActive(res);
      setRefreshing(false);
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <NativeBaseProvider>
        <View style={styles.headerContainer}>
          <Box style={styles.headerArrowBox}>
            <AntDesign
              name="arrowleft"
              size={28}
              color="#28527A"
              onPress={() => { navigation.navigate('list'); }}
            />
          </Box>
          <View style={styles.nameheader}>
            <Text style={styles.name}>
              近期活動
            </Text>
          </View>
          <View style={styles.headerCommentView}>
            <FontAwesome5
              name="comment"
              size={25}
              color="#28527A"
              onPress={() => { navigation.navigate('message'); }}
            />
          </View>
          <View style={styles.headerPersonalView}>
            <Feather
              name="user"
              size={26}
              color="#28527A"
              onPress={() => { navigation.navigate('personal'); }}
            />
          </View>
        </View>
        <View style={styles.bodyContainer}>
          <FlatList
            numColumns={2}
            data={active}
            keyExtractor={(item) => item.id}
            refreshControl={(
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
              )}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => {
                  navigation.navigate('details', { Cd: item.id, prepage: 'more' });
                }}
              >
                <VStack style={styles.CardInMore}>
                  <Image
                    style={styles.pic}
                    source={{
                      uri: item.imageUri1,
                    }}
                  />
                  <Title style={styles.CardTitle}>
                    {item.name}
                  </Title>
                  <Box style={styles.CardStartTime}>
                    <AntDesign
                      name="clockcircleo"
                      size={12}
                      color="rgba(40, 82, 122, 0.65)"
                    />
                    <Text style={styles.CardTimeText}>
                      {'   '}
                      {item.startTimeWeekday}
                    </Text>
                  </Box>
                  <Box style={styles.CardPlace}>
                    <Ionicons
                      name="location-outline"
                      size={15}
                      color="rgba(40, 82, 122, 0.65)"
                    />
                    <Text style={styles.cardPlaceText}>
                      {'  '}
                      {item.place}
                    </Text>
                  </Box>
                </VStack>
              </Pressable>
            )}
          />
        </View>
      </NativeBaseProvider>
    </SafeAreaView>
  );
}

export default more;
