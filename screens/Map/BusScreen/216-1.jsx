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

const Separator = () => <View style={Styles.separator} />;
function Bus216({ navigation }) {
  const [item, setItems] = useState([]);

  const [start, setStart] = useState(true);

  const [direction, setDirection] = useState(1);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    BusController.route({ id: 216, dir: 0 }).then((res) => {
      setItems(res);
      setRefreshing(false);
    });
  };

  const onRefresh1 = () => {
    setRefreshing(true);
    BusController.route({ id: 216, dir: 1 }).then((res) => {
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
          textAlign: 'center', backgroundColor: '#28527A', color: 'white', height: 50, width: '100%', fontSize: 20, textAlignVertical: 'center', lineHeight: 50,
        }}
        >
          216
        </Text>
        <TouchableOpacity
          onPress={() => { navigation.navigate('List216'); }}
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
        <View style={{ flexDirection: 'row', height: 50 }}>
          <TouchableOpacity
            onPress={() => { setStart(true); setDirection(0); }}
            style={{ width: '50%', backgroundColor: 'white' }}
          >
            <Text style={{
              textAlign: 'center', fontSize: 20, textAlignVertical: 'center', lineHeight: 50,
            }}
            >
              往八德區公所
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => { setStart(true); setDirection(1); }}
            style={{ width: '50%', backgroundColor: 'white' }}
          >
            <Text style={{
              textAlign: 'center', fontSize: 20, textAlignVertical: 'center', lineHeight: 50,
            }}
            >
              往平鎮區公所
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
                textAlign: 'center', width: '40%', backgroundColor: 'white', fontSize: 20, textAlignVertical: 'center', lineHeight: 50,
              }}
              >
                {data.time}
              </Text>
              <Text style={{
                width: '60%', backgroundColor: 'white', fontSize: 20, textAlignVertical: 'center', lineHeight: 50,
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

export default Bus216;
