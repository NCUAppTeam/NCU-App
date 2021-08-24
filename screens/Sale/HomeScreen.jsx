import React, { useState, useEffect } from 'react';
import {
  SafeAreaView, ScrollView, RefreshControl,
} from 'react-native';
import {
  Card, FAB, Title, Paragraph, Chip, Searchbar,
} from 'react-native-paper';
import styles from './Styles';
import SalesController from '../../controller/Sales';

function HomeScreen({ navigation }) {
  const [picked, setPicked] = useState(undefined);
  const [tags, setTags] = useState([]);
  const [searchbarText, setSearchbarText] = useState('');
  const [items, setItems] = useState([]);
  const handleSearch = (text) => {
    setSearchbarText(text);
    if (text !== '') {
      SalesController.querySearch(text, picked).then((res) => {
        setItems(res);
      }).catch((err) => {
        throw err;
      });
    }
  };
  useEffect(() => {
    SalesController.getAllTag().then((res) => {
      setTags(res);
    }).catch((err) => {
      throw err;
    });
  }, []);
  useEffect(() => {
    SalesController.getHomePageItem().then((res) => {
      setItems(res);
    }).catch((err) => {
      throw err;
    });
  }, []);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    SalesController.getHomePageItem().then((res) => {
      setItems(res);
      setPicked({});
      setSearchbarText('');
      setRefreshing(false);
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <Searchbar
        value={searchbarText}
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
                SalesController.getHomePageItem().then((res) => {
                  setItems(res);
                }).catch((err) => {
                  throw err;
                });
              } else {
                setPicked(tag.name);
                SalesController.getHomePageItem(tag.id).then((res) => {
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
        { items.map((element) => (
          <Card key={element.name} style={{ flex: 1, padding: 10, margin: 4 }} onPress={() => navigation.navigate('商品詳細資訊', { element })}>
            <Card.Content>
              <Title>
                {element.name}
              </Title>
              <Paragraph>
                {`NT$ ${element.price}`}
              </Paragraph>
            </Card.Content>
            <Card.Cover source={{ uri: element.imageUrl }} />
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
