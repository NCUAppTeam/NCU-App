import React, { useState, useEffect } from 'react';
import {
  Text, View, SafeAreaView, ScrollView, RefreshControl, Image, PixelRatio,
} from 'react-native';
import {
  Title, Card, Searchbar, Chip,
} from 'react-native-paper';
import { Button } from 'react-native-elements';
// import Icon from 'react-native-vector-icons/FontAwesome';
import { Ionicons, FontAwesome5, AntDesign } from '@expo/vector-icons';
import {
  List, ListItem, NativeBaseProvider, Box, Divider,
} from 'native-base';
import styles from './Styles';
import ActiveController from '../../controller/Active';

function more({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const onChangeSearch = (query) => setSearchQuery(query);

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
        <ScrollView
          style={{ flex: 1 }}
          refreshControl={(
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
      )}
        >
          <View style={{ flex: 1 }}>
            {active.map(({
              id, name, imageUri, startTime, startNoYr, endTime, endNoYr, place,
              cost, limitNum, genre, link, host, details,
              contact1, contact2, contact3,
            }) => (
              <View style={{ flexDirection: 'row' }}>
                <Card
                  key={id}
                  style={styles.Card1}
                  onPress={() => {
                    navigation.navigate('details', {
                      Name: name,
                      ImageUri: imageUri,
                      StartTime: startTime,
                      EndTime: endTime,
                      Place: place,
                      Cost: cost,
                      LimitNum: limitNum,
                      Genre: genre,
                      Link: link,
                      Host: host,
                      Details: details,
                      Contact1: contact1,
                      Contact2: contact2,
                      Contact3: contact3,
                    });
                  }}
                >
                  <Card.Content style={{ padding: 0 }}>
                    <View style={{ flexDirection: 'column', margin: -15 }}>
                      <View style={{ aspectRatio: 1 }}>
                        <Image
                          style={styles.pic}
                          source={{
                            uri: imageUri,
                          }}
                        />
                      </View>
                      <Title style={styles.CardTitle}>
                        {name}
                      </Title>
                      <View style={styles.CardDetails}>
                        <AntDesign
                          name="clockcircleo"
                          size={12}
                          style={{ justifyContent: 'center' }}
                        />
                        <Text style={styles.CardText}>
                          {'   '}
                          {startNoYr}
                        </Text>
                        <Text style={styles.CardText}>
                          {' ~ '}
                          {endNoYr}
                        </Text>
                      </View>
                      <View style={{ marginHorizontal: 8, flexDirection: 'row' }}>
                        <Ionicons
                          name="location-outline"
                          size={15}
                          color="black"
                        />
                        <Text style={{ fontSize: 12 }}>
                          {'  '}
                          {place}
                        </Text>
                      </View>
                    </View>
                  </Card.Content>
                </Card>
              </View>
            ))}
          </View>
        </ScrollView>
      </NativeBaseProvider>
    </SafeAreaView>
  );
}

export default more;
