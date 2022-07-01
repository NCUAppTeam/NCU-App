import React, { useState, useEffect } from 'react';
import {
  Text, View, SafeAreaView, ScrollView, RefreshControl, Image, Dimensions,
} from 'react-native';
import {
  Title, Card, Searchbar,
} from 'react-native-paper';
import { Button } from 'react-native-elements';
import {
  Ionicons, FontAwesome5, AntDesign, Feather,
} from '@expo/vector-icons';
import {
  NativeBaseProvider, Box, Divider, ZStack,
} from 'native-base';
import styles from './style_folder/Styles_activityList';
import ActiveController from '../../controller/Active';

function list({ navigation }) {
  // const [searchQuery, setSearchQuery] = useState('');
  // const onChangeSearch = (query) => setSearchQuery(query);

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
        <View style={{ flexDirection: 'row', paddingBottom: 12, paddingHorizontal: Dimensions.get('window').width * 0.0592 }}>
          <View style={styles.SearchBarStyle}>
            <Searchbar
              returnKeyType="previous"
              placeholder="搜尋"
              style={styles.SearchBar}
              onPress={() => { navigation.navigate('search'); }}
            />
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
            flex: 1, justifyContent: 'center', alignItems: 'flex-end',
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
        {/* </View> */}
        <ScrollView
          style={{ flex: 1 }}
          refreshControl={(
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
      )}
        >
          <Box style={{ marginHorizontal: Dimensions.get('window').width * 0.0592 }}>
            <Text style={styles.more} onPress={() => { navigation.navigate('more'); }}>查看更多</Text>
            <Divider style={{ marginTop: 5 }} bg="#BFBFBF" /* my=margin-top and margin-bottom */ />
          </Box>
          <View style={{ height: 'auto', width: 'auto' }}>
            <ScrollView horizontal style={styles.horizontal}>
              <View style={{
                width: 'auto', marginRight: Dimensions.get('window').width * 0.0694, height: 246, flexDirection: 'row',
              }}
              >
                {active.map(({
                  id, name, imageUri1, place, startTimeWeekday,
                }) => (
                  <Card
                    key={id}
                    style={styles.Card2}
                    onPress={() => {
                      navigation.navigate('details', { Cd: id });
                    }}
                  >
                    <Card.Content>
                      <View style={{ flexDirection: 'column', margin: -15 }}>
                        <View style={{ aspectRatio: 1 }}>
                          <Image
                            style={styles.pic}
                            source={{
                              uri: imageUri1,
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
                            color="rgba(40, 82, 122, 0.65)"
                            style={{ justifyContent: 'center' }}
                          />
                          <Text style={styles.CardText}>
                            {'  '}
                            {startTimeWeekday}
                          </Text>
                        </View>
                        <View style={{ marginHorizontal: 5.5, flexDirection: 'row' }}>
                          <Ionicons
                            name="location-outline"
                            size={15}
                            color="rgba(40, 82, 122, 0.65)"
                          />
                          <Text style={{ fontSize: 12, color: 'rgba(40, 82, 122, 0.65)' }}>
                            {' '}
                            {place}
                          </Text>
                        </View>
                      </View>
                    </Card.Content>
                  </Card>
                ))}
              </View>
            </ScrollView>
          </View>
          <Box style={{ marginHorizontal: Dimensions.get('window').width * 0.0592 }}>
            <Text style={styles.more} onPress={() => { navigation.navigate('more'); }}>查看更多</Text>
            <Divider style={{ marginTop: 5 }} bg="#BFBFBF" /* my=margin-top and margin-bottom */ />
          </Box>
          <View style={{ height: 'auto', width: 'auto' }}>
            <ScrollView horizontal style={styles.horizontal}>
              <View style={{
                width: 'auto', marginRight: Dimensions.get('window').width * 0.0694, height: 246, flexDirection: 'row',
              }}
              >
                {active.map(({
                  id, name, imageUri1, place, startTimeWeekday,
                }) => (
                  <Card
                    key={id}
                    style={styles.Card2}
                    onPress={() => {
                      navigation.navigate('details', { Cd: id });
                    }}
                  >
                    <Card.Content>
                      <View style={{ flexDirection: 'column', margin: -15 }}>
                        <View style={{ aspectRatio: 1 }}>
                          <Image
                            style={styles.pic}
                            source={{
                              uri: imageUri1,
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
                            color="rgba(40, 82, 122, 0.65)"
                            style={{ justifyContent: 'center' }}
                          />
                          <Text style={styles.CardText}>
                            {'  '}
                            {startTimeWeekday}
                          </Text>
                        </View>
                        <View style={{ marginHorizontal: 5.5, flexDirection: 'row' }}>
                          <Ionicons
                            name="location-outline"
                            size={15}
                            color="rgba(40, 82, 122, 0.65)"
                          />
                          <Text style={{ fontSize: 12, color: 'rgba(40, 82, 122, 0.65)' }}>
                            {' '}
                            {place}
                          </Text>
                        </View>
                      </View>
                    </Card.Content>
                  </Card>
                ))}
              </View>
            </ScrollView>
          </View>
        </ScrollView>
        {/* <View>
          <Button
            style={styles.button}
            onPress={() => {
              ActiveController.deleteAllActive().then(() => { onRefresh(); });
            }}
            title="刪除所有活動"
            type="outline"
            icon={(
              <Ionicons
                name="remove"
                size={15}
                color="rgb(255, 100, 100)"
              />
          )}
          />
        </View> */}
      </NativeBaseProvider>
    </SafeAreaView>
  );
}

export default list;
