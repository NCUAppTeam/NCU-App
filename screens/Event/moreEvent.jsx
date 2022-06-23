import React, { useState, useEffect } from 'react';
import {
  Text, View, SafeAreaView, RefreshControl, Image, Dimensions,
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

function more({ navigation }) {
  const [active, setActive] = useState([]);
  useEffect(() => {
    ActiveController.getAllActive().then((res) => {
      setActive(res);
    }).catch((err) => {
      throw err;
    });
  }, []);

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    ActiveController.getAllActive().then((res) => {
      setActive(res);
      setRefreshing(false);
    });
  };

  return (
    <SafeAreaView style={[styles.container, { marginHorizontal: Dimensions.get('window').width * 0.07 }]}>
      <NativeBaseProvider>
        <View style={{ flexDirection: 'column' }}>
          <View style={{ flexDirection: 'row' }}>
            <Box style={{
              flex: 0.8, justifyContent: 'center', alignItems: 'flex-start',
            }}
            >
              <AntDesign
                name="arrowleft"
                size={28}
                color="#28527A"
                style={{ justifyContent: 'center' }}
                onPress={() => { navigation.navigate('list'); }}
              />
            </Box>
            <View style={styles.nameheader}>
              <Text style={styles.name}>
                近期揪人
              </Text>
            </View>
            <View style={{
              flex: 1, justifyContent: 'center', alignItems: 'flex-end',
            }}
            >
              <FontAwesome5
                name="comment"
                size={25}
                color="#28527A"
              />
            </View>
            <View style={{
              flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginLeft: 10,
            }}
            >
              <Feather
                name="user"
                size={26}
                color="#28527A"
                onPress={() => { navigation.navigate('personal'); }}
              />
            </View>
          </View>
        </View>
        <View style={{ flex: 1, justifyContent: 'space-evenly', alignItems: 'flex-start' }}>
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
              <Pressable onPress={() => { navigation.navigate('details', { Cd: item.id }); }}>
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
                  <Box style={styles.CardDetails}>
                    <AntDesign
                      name="clockcircleo"
                      size={12}
                      style={{ justifyContent: 'center', color: 'rgba(40, 82, 122, 0.65)' }}
                    />
                    <Text style={styles.CardText}>
                      {'   '}
                      {item.startNoYr}
                    </Text>
                    {/* <Text style={styles.CardText}>
                      {' ~ '}
                      {item.endNoYr}
                    </Text> */}
                  </Box>
                  <Box style={{ marginLeft: 6, flexDirection: 'row' }}>
                    <Ionicons
                      name="location-outline"
                      size={15}
                      color="rgba(40, 82, 122, 0.65)"
                    />
                    <Text style={{ fontSize: 12, color: 'rgba(40, 82, 122, 0.65)' }}>
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
