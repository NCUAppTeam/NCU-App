import React, { useState } from 'react';

import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Styles from '../Styles';

function Separator() {
  return <View style={Styles.separator} />;
}
function List173() {
  const [workDay, setWorkDay] = useState(true);
  return (
    <SafeAreaView style={Styles.background}>
      <View>
        <Text style={{
          textAlign: 'center', backgroundColor: 'primary.600', color: 'white', height: 50, width: '100%', fontSize: 20, textAlignVertical: 'center', lineHeight: 50,
        }}
        >
          173公車時刻表
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
      <View style={Styles.fixToText}>

        <Text style={{
          textAlign: 'center', width: '50%', fontSize: 20,
        }}
        >
          往桃園高鐵站
        </Text>
        <Text style={{
          textAlign: 'center', width: '50%', fontSize: 20,
        }}
        >
          往中央大學
        </Text>

      </View>
      <Separator />
      <ScrollView>
        {workDay
          && (
          <View>
            <View style={Styles.fixToText}>

              <Text style={{
                textAlign: 'center', fontSize: 20, lineHeight: 50, backgroundColor: 'white', width: '50%',
              }}
              >
                08:50
              </Text>
              <Text style={{
                textAlign: 'center', fontSize: 20, lineHeight: 50, backgroundColor: 'white', width: '50%',
              }}
              >
                09:20
              </Text>
            </View>
            <View style={Styles.fixToText}>

              <Text style={{
                textAlign: 'center', fontSize: 20, lineHeight: 50, backgroundColor: 'white', width: '50%',
              }}
              >
                10:50
              </Text>
              <Text style={{
                textAlign: 'center', fontSize: 20, lineHeight: 50, backgroundColor: 'white', width: '50%',
              }}
              >
                11:20
              </Text>
            </View>
            <View style={Styles.fixToText}>

              <Text style={{
                textAlign: 'center', fontSize: 20, lineHeight: 50, backgroundColor: 'white', width: '50%',
              }}
              >
                13:30
              </Text>
              <Text style={{
                textAlign: 'center', fontSize: 20, lineHeight: 50, backgroundColor: 'white', width: '50%',
              }}
              >
                14:00
              </Text>
            </View>
            <View style={Styles.fixToText}>

              <Text style={{
                textAlign: 'center', fontSize: 20, lineHeight: 50, backgroundColor: 'white', width: '50%',
              }}
              >
                15:40
              </Text>
              <Text style={{
                textAlign: 'center', fontSize: 20, lineHeight: 50, backgroundColor: 'white', width: '50%',
              }}
              >
                16:10
              </Text>
            </View>
            <View style={Styles.fixToText}>

              <Text style={{
                textAlign: 'center', fontSize: 20, lineHeight: 50, backgroundColor: 'white', width: '50%',
              }}
              >
                17:50
              </Text>
              <Text style={{
                textAlign: 'center', fontSize: 20, lineHeight: 50, backgroundColor: 'white', width: '50%',
              }}
              >
                18:20
              </Text>
            </View>
          </View>
          )}
        {!workDay
          && (
          <View>
            <View style={Styles.fixToText}>

              <Text style={{
                textAlign: 'center', fontSize: 20, lineHeight: 50, backgroundColor: 'white', width: '50%',
              }}
              >
                10:30
              </Text>
              <Text style={{
                textAlign: 'center', fontSize: 20, lineHeight: 50, backgroundColor: 'white', width: '50%',
              }}
              >
                11:00
              </Text>
            </View>
            <View style={Styles.fixToText}>

              <Text style={{
                textAlign: 'center', fontSize: 20, lineHeight: 50, backgroundColor: 'white', width: '50%',
              }}
              >
                12:30
              </Text>
              <Text style={{
                textAlign: 'center', fontSize: 20, lineHeight: 50, backgroundColor: 'white', width: '50%',
              }}
              >
                13:00
              </Text>
            </View>
            <View style={Styles.fixToText}>

              <Text style={{
                textAlign: 'center', fontSize: 20, lineHeight: 50, backgroundColor: 'white', width: '50%',
              }}
              >
                15:40
              </Text>
              <Text style={{
                textAlign: 'center', fontSize: 20, lineHeight: 50, backgroundColor: 'white', width: '50%',
              }}
              >
                16:10
              </Text>
            </View>
            <View style={Styles.fixToText}>

              <Text style={{
                textAlign: 'center', fontSize: 20, lineHeight: 50, backgroundColor: 'white', width: '50%',
              }}
              >
                17:50
              </Text>
              <Text style={{
                textAlign: 'center', fontSize: 20, lineHeight: 50, backgroundColor: 'white', width: '50%',
              }}
              >
                18:20
              </Text>
            </View>
          </View>
          )}
      </ScrollView>

      <Text style={{ textAlign: 'center', backgroundColor: 'white', color: 'gray' }}>
        上次更新:2023/01/26
      </Text>

    </SafeAreaView>
  );
}
export default List173;
