import React, { useState, useEffect } from 'react';
import {
  Text, View, SafeAreaView, RefreshControl, Dimensions,
  ScrollView, TouchableOpacity, Image, Button, TouchableHighlight,
} from 'react-native';
import {
  Ionicons, FontAwesome5, AntDesign, Feather,
} from '@expo/vector-icons';
import { Card, TextInput, Title } from 'react-native-paper';
import {
  NativeBaseProvider, Box, Divider, VStack, HStack, FlatList,
} from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';
import styles from './style_folder/Styles_Message';
import ActiveController from '../../controller/Active';

function message({ route, navigation }) {
  const Cd = route.params;
  const prepage = JSON.stringify(Cd).slice(12, -2);
  const [data, setData] = useState({});
  const [getData, setGetData] = useState([]);
  useEffect(() => {

  }, []);

  const [attendeeINFO, setAttendeeInfo] = useState();
  useEffect(() => {
    ActiveController.getAllAttendees('hgt83cJhB6QnsUg1UxoF').then((res) => {
      setAttendeeInfo(res);
    }).catch((err) => {
      throw err;
    });
  }, []);

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);

    setRefreshing(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <NativeBaseProvider>
        <LinearGradient
          colors={['#1784B2', '#28527A']}
          start={[1, 2]}
          end={[1, 0]}
        >
          <Box style={styles.header}>
            <HStack style={{ flex: 1 }}>
              <Box style={styles.headerArrowBox}>
                <AntDesign
                  name="arrowleft"
                  size={28}
                  color="#fff"
                  onPress={() => { navigation.navigate(prepage); }}
                />
              </Box>
              <Box style={styles.title}>
                <FontAwesome5
                  name="comment"
                  size={25}
                  color="#fff"
                >
                  <Text>&ensp;私訊中心</Text>
                </FontAwesome5>
              </Box>
            </HStack>
          </Box>
        </LinearGradient>
        <Box style={styles.option}>
          <HStack>
            <TouchableOpacity>
              <Text style={styles.optionLeft}>拍賣私訊</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.optionRight}>揪人私訊</Text>
            </TouchableOpacity>
          </HStack>
        </Box>
        <Box style={{ flex: 1 }}>
          <TouchableOpacity
            onPress={() => { navigation.navigate('Send'); }}
          >
            <FlatList
              data={attendeeINFO}
              keyExtractor={(item) => item.studentID}
              refreshControl={(
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                />
                  )}
              renderItem={({ item }) => (
                <ScrollView>
                  <HStack style={styles.cardForMessage}>
                    <Image
                      style={styles.avatar}
                      source={{
                        uri: item.avatar,
                      }}
                    />
                    <VStack style={styles.messagePeople}>
                      <Text style={{ fontWeight: '700', fontSize: 18 }}>
                        {item.name}
                      </Text>
                      <HStack>
                        <Text style={{ textAlign: 'left', fontWeight: '400', fontSize: 10 }}>
                          {item.major}
                          {item.identity}
                        </Text>
                      </HStack>
                      <HStack>
                        <Text style={{ textAlign: 'left', fontWeight: '400', fontSize: 10 }}>
                          最新
                        </Text>
                      </HStack>
                    </VStack>
                  </HStack>
                </ScrollView>
              )}
            />
          </TouchableOpacity>
        </Box>
      </NativeBaseProvider>
    </SafeAreaView>
  );
}
export default message;
