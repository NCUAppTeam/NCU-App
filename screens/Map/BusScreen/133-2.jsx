import React, { useState } from 'react';

import {
  View,
  SafeAreaView,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Styles from '../Styles';

function List133() {
  const [workDay, setWorkDay] = useState(true);
  return (
    <SafeAreaView style={Styles.background}>
      <View>
        <Text style={{
          textAlign: 'center', backgroundColor: 'primary.600', color: 'white', height: 50, width: '100%', fontSize: 20, textAlignVertical: 'center', lineHeight: 50,
        }}
        >
          133公車時刻表
        </Text>
      </View>
      <View>
        <View style={{ flexDirection: 'row', height: 50 }}>
          <TouchableOpacity
            onPress={() => { setWorkDay(true); }}
            style={{ width: '50%', backgroundColor: 'white' }}
          >
            <Text style={{
              textAlign: 'center', fontSize: 20, textAlignVertical: 'center', lineHeight: 50,
            }}
            >
              平日
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => { setWorkDay(false); }}
            style={{ width: '50%', backgroundColor: 'white' }}
          >
            <Text style={{
              textAlign: 'center', fontSize: 20, textAlignVertical: 'center', lineHeight: 50,
            }}
            >
              假日
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={{ textAlign: 'center', fontSize: 20 }}>
        往中央大學
      </Text>
      <ScrollView>
        {workDay
          && (
          <View>
            <Text style={{
              textAlign: 'center', width: '100%', backgroundColor: 'white', fontSize: 20, textAlignVertical: 'center', lineHeight: 50,
            }}
            >
              07:40
            </Text>
            <Text style={{
              textAlign: 'center', width: '100%', backgroundColor: 'white', fontSize: 20, textAlignVertical: 'center', lineHeight: 50,
            }}
            >
              08:40
            </Text>
            <Text style={{
              textAlign: 'center', width: '100%', backgroundColor: 'white', fontSize: 20, textAlignVertical: 'center', lineHeight: 50,
            }}
            >
              09:40
            </Text>
            <Text style={{
              textAlign: 'center', width: '100%', backgroundColor: 'white', fontSize: 20, textAlignVertical: 'center', lineHeight: 50,
            }}
            >
              10:40
            </Text>
            <Text style={{
              textAlign: 'center', width: '100%', backgroundColor: 'white', fontSize: 20, textAlignVertical: 'center', lineHeight: 50,
            }}
            >
              15:40
            </Text>
            <Text style={{
              textAlign: 'center', width: '100%', backgroundColor: 'white', fontSize: 20, textAlignVertical: 'center', lineHeight: 50,
            }}
            >
              16:40
            </Text>
          </View>
          )}
        {!workDay
          && (
            <View>
              <Text style={{
                textAlign: 'center', width: '100%', backgroundColor: 'white', fontSize: 20, textAlignVertical: 'center', lineHeight: 50,
              }}
              >
                10:30
              </Text>
              <Text style={{
                textAlign: 'center', width: '100%', backgroundColor: 'white', fontSize: 20, textAlignVertical: 'center', lineHeight: 50,
              }}
              >
                11:30
              </Text>
              <Text style={{
                textAlign: 'center', width: '100%', backgroundColor: 'white', fontSize: 20, textAlignVertical: 'center', lineHeight: 50,
              }}
              >
                14:30
              </Text>
              <Text style={{
                textAlign: 'center', width: '100%', backgroundColor: 'white', fontSize: 20, textAlignVertical: 'center', lineHeight: 50,
              }}
              >
                15:30
              </Text>
            </View>
          )}

        <Text style={{ textAlign: 'center', backgroundColor: 'white', color: 'gray' }}>
          上次更新:2023/01/26
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
export default List133;
