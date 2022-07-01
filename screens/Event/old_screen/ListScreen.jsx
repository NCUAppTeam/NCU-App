import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, ScrollView } from 'react-native';
import { FAB } from 'react-native-paper';
import Search from './components/Searchbar';
import EventCard from './components/EventCard';
import EventController from '../../controller/Event';
import styles from './Styles';

export default function HomeScreen({ navigation }) {
  const [refresh, setRefresh] = useState(true);
  const [events, setEvents] = useState([]);
  const [fabVisible, setFABVisible] = useState(false);

  useEffect(() => {
    EventController.isUserPrvilleged()
      .then((res) => {
        setFABVisible(res);
      });
    EventController.getAllEvents()
      .then((res) => {
        setEvents(res);
      });
    setRefresh(false);
  }, [refresh]);

  const searchFilter = async (text) => {
    const searchResult = await EventController.searchEvents(text);
    setEvents(searchResult);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Search onChange={searchFilter} />
      <ScrollView>
        <View style={styles.row}>
          {events.map((event) => (
            <EventCard
              key={event.id}
              navigation={navigation}
              event={event}
            />
          ))}
        </View>
      </ScrollView>
      {
        fabVisible && (
        <FAB
          style={styles.fab}
          icon="list"
          onPress={() => navigation.navigate('我的活動', { onRefresh: () => setRefresh(true) })}
        />
        )
      }
    </SafeAreaView>
  );
}
