import React from 'react';

import {
  View,
  SafeAreaView,
  Text,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Styles from '../Styles';

function UST() {
  return (
    <SafeAreaView style={Styles.background}>
      <View>
        <Text style={{
          textAlign: 'center', backgroundColor: '#28527A', color: 'white', width: '100%', fontSize: 20, textAlignVertical: 'center', lineHeight: 50,
        }}
        >
          台聯大專車時刻表
        </Text>
      </View>
      <View>

        <Text style={{
          textAlign: 'center', fontSize: 20, textAlignVertical: 'center', lineHeight: 50,
        }}
        >
          僅平日行駛
        </Text>

      </View>
      <View style={Styles.fixToText}>

        <Text style={{
          textAlign: 'center', width: '50%', fontSize: 20,
        }}
        >
          往清大、交大
        </Text>
        <Text style={{
          textAlign: 'center', width: '50%', fontSize: 20,
        }}
        >
          往政大
        </Text>

      </View>
      <ScrollView>

        <View style={Styles.fixToText}>

          <Text style={{
            textAlign: 'center', fontSize: 20, lineHeight: 50, backgroundColor: 'white', width: '50%',
          }}
          >
            07:50
          </Text>
          <Text style={{
            textAlign: 'center', fontSize: 20, lineHeight: 50, backgroundColor: 'white', width: '50%',
          }}
          >
            07:30
          </Text>
        </View>
        <View style={Styles.fixToText}>

          <Text style={{
            textAlign: 'center', fontSize: 20, lineHeight: 50, backgroundColor: 'white', width: '50%',
          }}
          >
            12:10
          </Text>
          <Text style={{
            textAlign: 'center', fontSize: 20, lineHeight: 50, backgroundColor: 'white', width: '50%',
          }}
          >
            11:30
          </Text>
        </View>
        <View style={Styles.fixToText}>

          <Text style={{
            textAlign: 'center', fontSize: 20, lineHeight: 50, backgroundColor: 'white', width: '50%',
          }}
          >
            20:10
          </Text>
          <Text style={{
            textAlign: 'center', fontSize: 20, lineHeight: 50, backgroundColor: 'white', width: '50%',
          }}
          >
            21:10
          </Text>
        </View>

      </ScrollView>

      <Text style={{ textAlign: 'center', backgroundColor: 'white', color: 'gray' }}>
        上次更新:2023/01/26
      </Text>

    </SafeAreaView>
  );
}
export default UST;
