import React, { useState, useEffect } from 'react';
import {
  View, ScrollView,
} from 'react-native';
import {
  Searchbar, List,
} from 'react-native-paper';
import MapController from '../../controller/Map';
import styles from './Styles';

const MapList = ({ route, navigation }) => {
  const { setPinId, updatePin } = route.params;
  const [originalData, setOriginalData] = useState([]);
  const [listData, setListData] = useState([]);
  const handleSearch = (text) => {
    const listArr = [];
    if (text !== '') {
      originalData.forEach((data) => {
        const { chineseName } = data;
        if (chineseName.includes(text)) {
          listArr.push(data);
        }
      });
      originalData.forEach((data) => {
        const { units } = data;
        if (units.includes(text)) {
          let exist = 0;
          for (let i = 0; i < listArr.length; i += 1) {
            if (listArr[i] === data) {
              exist = 1;
              break;
            }
          }
          if (exist === 0) listArr.push(data);
        }
      });
    }
    setListData(listArr);
  };
  const handleSelection = (row) => {
    updatePin(row.index);
    setPinId(row.index);
    navigation.goBack();
  };
  useEffect(() => {
    MapController.queryBuilding()
      .then((response) => {
        setOriginalData(response);
      });
    const id = setInterval(() => {
      MapController.queryBuilding()
        .then((response) => {
          setOriginalData(response);
        });
    }, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <View>
      <Searchbar
        style={styles.searchBar}
        autoFocus
        onChangeText={(result) => handleSearch(result)}
        placeholder="搜尋"
      />
      <ScrollView style={styles.list}>
        {listData.map((row) => (
          <List.Item
            key={row.chineseName}
            title={row.chineseName}
            titleStyle={styles.listTitle}
            description={row.distance}
            right={(props) => (
              <List.Icon
                {...props}
                icon="arrow-up"
                style={[styles.icon, {
                  transform: [{ rotate: `${row.degree}deg` }],
                }]}
              />
            )}
            onPress={() => handleSelection(row)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default MapList;
