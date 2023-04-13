import React, { useState, useEffect } from 'react';
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
} from 'react-native';
import BusController from '../../../controller/Bus';
import Styles from '../Styles';

function Separator() {
  return <View style={Styles.separator} />;
}
function Bus132({ navigation }) {
  const [item, setItems] = useState([]);

  const [start, setStart] = useState(true);

  const [direction, setDirection] = useState(0);

  const [refreshing, setRefreshing] = useState(false);

  const [selection, setSelection] = useState(0);

  const onRefresh = () => {
    setRefreshing(true);
    setSelection(1);
    BusController.route({ id: 132, dir: 1 }).then((res) => {
      setItems(res);
      setRefreshing(false);
    });
  };

  const onRefresh1 = () => {
    setRefreshing(true);
    setSelection(0);
    BusController.route({ id: 132, dir: 0 }).then((res) => {
      setItems(res);
      setRefreshing(false);
    });
  };

  useEffect(() => {
    if (start) {
      setStart(false);
      if (direction === 1)onRefresh();
      else onRefresh1();
    }
    let id;
    if (direction === 1)id = setInterval(onRefresh, 10000);
    else id = setInterval(onRefresh1, 10000);
    return () => {
      clearInterval(id);
    };
  }, [start]);

  return (
    <SafeAreaView
      style={Styles.background}
      refreshControl={(<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />)}
    >
      <View>
        <Text style={{
          textAlign: 'center', backgroundColor: '#28527A', color: 'white', width: '100%', fontSize: 20, textAlignVertical: 'center', lineHeight: 50,
        }}
        >
          132
        </Text>
        <TouchableOpacity
          onPress={() => { navigation.navigate('List132'); }}
          style={{
            width: '25%',
            top: 15,
            left: 280,
            backgroundColor: '#FFE66F',
            position: 'absolute',
            right: 0,
          }}
        >
          <Text style={Styles.title}>發車時刻表</Text>
        </TouchableOpacity>
      </View>

      <View>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            onPress={() => { setStart(true); setDirection(0); }}
            style={{ width: '50%', backgroundColor: 'white' }}
          >
            <Text style={{
              textAlign: 'center', fontSize: 20, textAlignVertical: 'center', lineHeight: 50, color: selection === 0 ? 'black' : '#BFBFBF', borderBottomWidth: selection === 0 ? 3 : 0, marginHorizontal: selection === 0 ? 15 : 0,
            }}
            >
              往中央大學
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => { setStart(true); setDirection(1); }}
            style={{ width: '50%', backgroundColor: 'white' }}
          >
            <Text style={{
              textAlign: 'center', fontSize: 20, textAlignVertical: 'center', lineHeight: 50, color: selection === 1 ? 'black' : '#BFBFBF', borderBottomWidth: selection === 1 ? 3 : 0, marginHorizontal: selection === 1 ? 15 : 0,
            }}
            >
              往中壢公車站
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={{ fontSize: 1 }}>{'\n'}</Text>
      <ScrollView>
        { item.map((data) => (
          <View>
            <View style={{ flexDirection: 'row', height: 50 }}>
              <Text style={{
                textAlign: 'center', width: '50%', backgroundColor: 'white', fontSize: 20, textAlignVertical: 'center', lineHeight: 50,
              }}
              >
                {data.time}
              </Text>
              <Text style={{
                width: '50%', backgroundColor: 'white', fontSize: 20, textAlignVertical: 'center', lineHeight: 50,
              }}
              >
                {data.state}
              </Text>

            </View>
            <Separator />
          </View>

        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

export default Bus132;
