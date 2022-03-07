import React, { useState, useEffect } from 'react';
import {
  SafeAreaView, ScrollView, RefreshControl, View, Text, TouchableOpacity
} from 'react-native';
import {
  Card, FAB, Title, Paragraph, Chip, Searchbar, IconButton
} from 'react-native-paper';
import styles from './Styles';
import SalesController from '../../controller/Sales';
import { LinearGradient } from 'expo-linear-gradient';

function HomeScreen({ navigation }) {
  const [picked, setPicked] = useState(undefined);
  const [tags, setTags] = useState([]);
  const [searchbarText, setSearchbarText] = useState('');
  const [items, setItems] = useState([]);
  const [pressedAcquire, setPressedAcquire] = useState(true);
  const [pressedSell, setPressedSell] = useState(false);
  const [pressedRent, setPressedRent] = useState(false);

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

  const AcquireStatus = () => {
    setPressedAcquire(true);
    setPressedSell(false);
    setPressedRent(false);
  };

  const SellStatus = () => {
    setPressedAcquire(false);
    setPressedSell(true);
    setPressedRent(false);
  };

  const RentStatus = () => {
    setPressedAcquire(false);
    setPressedSell(false);
    setPressedRent(true);
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
      <View style={styles.searchbar}>    
        <Searchbar
          value={searchbarText}
          onChangeText={(result) => handleSearch(result)}
          placeholder="搜尋"
          style={styles.search}
        />
        <IconButton
            icon="comment"
            style={styles.heart}
            title=""
            onPress={() => console.log("press")}
            color="#28527A"
          />
        <IconButton
          icon="user"
          style={styles.heart}
          title=""
          onPress={() => navigation.navigate('個人管理頁面', { onGoBack: onRefresh })}
          color="#28527A"
        />
      </View>
      <ScrollView
        style={styles.scrollView}
        refreshControl={(
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        )}
      >
      <View style={styles.buttonTagContainer}>
        <TouchableOpacity onPress={AcquireStatus}>
          { pressedAcquire ? 
            <LinearGradient
              // Button Linear Gradient
              colors={['#28527A', '#28527A', '#0288D1']}
              style={styles.buttonTagPressed}>
              <Text style={{color: "#FBEEAC", textAlign: "center", fontSize: 16, marginTop: 10,}}>收購</Text>
            </LinearGradient> : 
            <View style={styles.textContainer}>
              <Text style={styles.tagText}>收購</Text>
            </View>
          }
        </TouchableOpacity>

        <TouchableOpacity onPress={SellStatus}>
          { pressedSell? 
            <LinearGradient
              // Button Linear Gradient
              colors={['#28527A', '#28527A', '#0288D1']}
              style={styles.buttonTagPressed}>
              <Text style={{color: "#FBEEAC", textAlign: "center", fontSize: 16, marginTop: 10,}}>出售</Text>
            </LinearGradient> : 
            <View style={styles.textContainer}>
              <Text style={styles.tagText}>出售</Text>
            </View>
          }
        </TouchableOpacity>

        <TouchableOpacity onPress={RentStatus}>
          { pressedRent ? 
            <LinearGradient
              // Button Linear Gradient
              colors={['#28527A', '#28527A', '#0288D1']}
              style={styles.buttonTagPressed}>
              <Text style={{color: "#FBEEAC", textAlign: "center", fontSize: 16, marginTop: 10,}}>租借</Text>
            </LinearGradient> : 
            <View style={styles.textContainer}>
              <Text style={styles.tagText}>租借</Text>
            </View>
          }
        </TouchableOpacity>
        </View>
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
