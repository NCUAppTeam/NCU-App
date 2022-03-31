import React, { useState, useEffect } from 'react';
import {
  Text, View, SafeAreaView, ScrollView, RefreshControl, Image,
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

function list({ navigation }) {
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
        <View style={{ flex: 0.15, flexDirection: 'column' }}>
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.SearchBar}>
              <Searchbar
                returnKeyType="previous"
                placeholder="Search"
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
                color="darkblue"
                onPress={() => { navigation.navigate('list'); }}
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
        <Box><Text style={styles.more} onPress={() => { navigation.navigate('more'); }}>查看更多</Text></Box>
        <ScrollView
          style={{ flex: 1 }}
          refreshControl={(
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
      )}
        >
          <Divider my={2} bg="#bfbebe" /* my=margin-top and margin-bottom */ />
          <View style={{ flex: 1 }}>
            <ScrollView horizontal>
              {active.map(({
                id, name, imageUri, startTime, startNoYr, endTime, endNoYr, place,
                cost, limitNum, genre, link, hostName, hostPhone, hostMail, details,
              }) => (
                <Card
                  key={id}
                  style={styles.Card2}
                  onPress={() => {
                    navigation.navigate('details', { Cd: id });
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
              ))}
            </ScrollView>
          </View>
          <Box><Text style={styles.more} onPress={() => { navigation.navigate('more'); }}>查看更多</Text></Box>
          <Divider my={2} bg="#bfbebe" /* my=margin-top and margin-bottom */ />
          <View style={{ flex: 1 }}>
            <ScrollView horizontal>
              {active.map(({
                id, name, imageUri, startTime, startNoYr, endTime, endNoYr, place,
                cost, limitNum, genre, link, hostName, hostPhone, hostMail, details,
              }) => (
                <Card
                  key={id}
                  style={styles.Card2}
                  onPress={() => {
                    navigation.navigate('details', { Cd: id });
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
              ))}
            </ScrollView>
          </View>
          <Box><Text style={styles.more} onPress={() => { navigation.navigate('more'); }}>查看更多</Text></Box>
          <Divider my={2} bg="#bfbebe" /* my=margin-top and margin-bottom */ />
          <View style={{ flex: 1 }}>
            <ScrollView horizontal>
              {active.map(({
                id, name, imageUri, startTime, startNoYr, endTime, endNoYr, place,
                cost, limitNum, genre, link, hostName, hostPhone, hostMail, details,
              }) => (
                <Card
                  key={id}
                  style={styles.Card2}
                  onPress={() => {
                    navigation.navigate('details', { Cd: id });
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
              ))}
            </ScrollView>
          </View>
        </ScrollView>

        <View>
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
        </View>
      </NativeBaseProvider>
    </SafeAreaView>
  );
}

export default list;
