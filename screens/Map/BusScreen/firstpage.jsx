import React from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import {
  IconButton,
} from 'react-native-paper';
import Styles from '../Styles';

function First({ navigation }) {


  const buses = [
    {
      "nameZH_TW": "中央-中壢火車站", 
      "name": "toZhongli",
    },
    {
      "nameZH_TW": "中央-桃園高鐵站", 
      "name": "toHSR",
    },
    {
      "nameZH_TW": "9025A", 
      "name": "9025A",
    },
    {
      "nameZH_TW": "台聯大專車", 
      "name": "UST",
    }
    // '216': 'Bus216',
    // '5035': 'Bus5035'
  ];

  let busList = [];

  for (const [index, routeInfo] of Object.entries(buses)) {
    // console.log(routeInfo)
    busList.push((
        <TouchableOpacity
              onPress={() => navigation.navigate('BusDetailView', routeInfo)}
              style={{ width: '100%', backgroundColor: 'white' }}
            >
              <View>
                <Text style={{
                  textAlign: 'center', top: 15, fontSize: 28, color: '#476685',
                }}
                >
                  {routeInfo.nameZH_TW}
                </Text>
              </View>
              <Text style={{ fontSize: 10 }}>{'\n'}</Text>
            </TouchableOpacity>
      ))
  }

  return (
    <SafeAreaView style={Styles.background}>
      <ScrollView>
        <View>
          <Text style={{
            textAlign: 'center', backgroundColor: '#476685', color: 'white', height: 50, width: '100%', fontSize: 20, textAlignVertical: 'center', lineHeight: 50,
          }}
          >
            公車動態
          </Text>
          <IconButton
            onPress={() => navigation.navigate('地圖')}
            icon="close"
            size={20}
            style={{
              left: 320,
              top: 0,
              position: 'absolute',
            }}
          />
        </View>

        <Text style={{ fontSize: 5 }}>{'\n'}</Text>
        <View>
          {busList}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default First;
