import React, { useState, useEffect } from 'react';
import {
  Text, View, SafeAreaView, RefreshControl, Image,
} from 'react-native';
import {
  Title, Card,
} from 'react-native-paper';
import { Button } from 'react-native-elements';
// import Icon from 'react-native-vector-icons/FontAwesome';
import { Ionicons, FontAwesome5, AntDesign } from '@expo/vector-icons';
import {
  NativeBaseProvider, Box, HStack, FlatList, VStack,
} from 'native-base';
import styles from './Styles';
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
    <SafeAreaView style={styles.container}>
      <NativeBaseProvider>
        <View style={{ flex: 0.1, flexDirection: 'column' }}>
          <View style={{ flexDirection: 'row' }}>
            <Box style={{
              flex: 0.8, justifyContent: 'center', alignItems: 'flex-start',
            }}
            >
              <AntDesign
                name="arrowleft"
                size={28}
                color="darkblue"
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
                color="darkblue"
              />
            </View>
            <View style={{
              flex: 1, justifyContent: 'center', alignItems: 'flex-end',
            }}
            >
              <FontAwesome5
                name="user"
                size={24}
                color="darkblue"
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
              <VStack style={styles.CardInMore}>
                <Image
                  style={styles.pic}
                  source={{
                    uri: item.imageUri,
                  }}
                />
                <Title style={styles.CardTitle}>
                  {item.name}
                </Title>
                <Box style={styles.CardDetails}>
                  <AntDesign
                    name="clockcircleo"
                    size={12}
                    style={{ justifyContent: 'center' }}
                  />
                  <Text style={styles.CardText}>
                    {'   '}
                    {item.startNoYr}
                  </Text>
                  <Text style={styles.CardText}>
                    {' ~ '}
                    {item.endNoYr}
                  </Text>
                </Box>
                <Box style={{ marginHorizontal: 8, flexDirection: 'row' }}>
                  <Ionicons
                    name="location-outline"
                    size={15}
                    color="black"
                  />
                  <Text style={{ fontSize: 12 }}>
                    {'  '}
                    {item.place}
                  </Text>
                </Box>
              </VStack>
            )}
          />
        </View>
      </NativeBaseProvider>
    </SafeAreaView>
  );
}

export default more;
