import React, { useState, useEffect } from 'react';
import {
  SafeAreaView, ScrollView, RefreshControl,
} from 'react-native';
import {
  Card, FAB, Title, Text, Chip, Searchbar,
} from 'react-native-paper';
import styles from './Styles';
import {
  getAllactivities, getTags, getTagActivities, querySearch,
} from '../../controller/Activity';

function HomeScreen({ navigation }) {
  const [item, setItems] = useState([]);
  const [picked, setPicked] = useState(undefined);
  const [tags, setTags] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text !== '') {
      querySearch(text, picked).then((res) => {
        setItems(res);
      }).catch((err) => {
        throw err;
      });
    }
  };
  useEffect(() => {
    getTags().then((res) => {
      setTags(res);
    }).catch((err) => {
      throw err;
    });
    getAllactivities().then((res) => {
      setItems(res);
    }).catch((err) => {
      throw err;
    });
  }, []);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    getAllactivities().then((res) => {
      setItems(res);
      setPicked({});
      setSearchQuery('');
      setRefreshing(false);
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <Searchbar
        value={searchQuery}
        onChangeText={(result) => handleSearch(result)}
        placeholder="搜尋"
      />
      <ScrollView
        style={styles.scrollView}
        refreshControl={(
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
      )}
      >
        <ScrollView style={{ flexDirection: 'row', marginTop: 10 }} horizontal showsHorizontalScrollIndicator={false}>
          {
          tags.map((tag) => (
            <Chip
              key={tag.name}
              icon={tag.icon}
              selected={picked === tag.name}
              onPress={() => {
                if (tag.name === picked) {
                  setPicked(undefined);
                  getAllactivities().then((res) => {
                    setItems(res);
                  }).catch((err) => {
                    throw err;
                  });
                } else {
                  setPicked(tag.name);
                  getTagActivities(tag.id).then((res) => {
                    setItems(res);
                  }).catch((err) => {
                    throw err;
                  });
                }
              }}
            >
              {tag.name}
            </Chip>
          ))
        }
        </ScrollView>
        { item.map(({
          id, name, price, time, attendees, numberLimit,
        }) => (
          <Card
            key={id}
            style={{ flex: 1, padding: 10, margin: 4 }}
            onPress={() => navigation.navigate('活動詳細資訊', { onGoBack: onRefresh, activityId: id })}
          >
            <Card.Content>
              <Title>{name}</Title>
              <Text>{`價錢:${price}`}</Text>
              <Text>{`時間:\n${time.toDate().toLocaleString()}`}</Text>
              <Text style={{ textAlign: 'right' }}>{`${attendees.length}/${numberLimit}`}</Text>

            </Card.Content>
          </Card>
        ))}
      </ScrollView>
      <FAB
        style={styles.fab}
        medium
        icon="address-book"
        onPress={() => navigation.navigate('個人管理頁面', { onGoBack: onRefresh })}
      />
    </SafeAreaView>
  );
}

export default HomeScreen;
