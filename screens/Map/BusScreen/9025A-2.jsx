import React, { useState } from 'react';

import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Styles from '../Styles';

const Separator = () => <View style={Styles.separator} />;
function List9025A() {
  const [workDay, setWorkDay] = useState(true);
  return (
    <SafeAreaView style={Styles.background}>
      <View>
        <Text style={{
          textAlign: 'center', backgroundColor: '#28527A', color: 'white', height: 50, width: '100%', fontSize: 20, textAlignVertical: 'center', lineHeight: 50,
        }}
        >
          9025A公車時刻表
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
          往松山
        </Text>
        <Text style={{
          textAlign: 'center', width: '50%', fontSize: 20,
        }}
        >
          往中壢
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
                12:00
              </Text>
              <Text style={{
                textAlign: 'center', fontSize: 20, lineHeight: 50, backgroundColor: 'white', width: '50%',
              }}
              >
                06:37
              </Text>
            </View>
            <View style={Styles.fixToText}>

              <Text style={{
                textAlign: 'center', fontSize: 20, lineHeight: 50, backgroundColor: 'white', width: '50%',
              }}
              >
                16:00
              </Text>
              <Text style={{
                textAlign: 'center', fontSize: 20, lineHeight: 50, backgroundColor: 'white', width: '50%',
              }}
              >
                07:10
              </Text>
            </View>
            <View style={Styles.fixToText}>

              <Text style={{
                textAlign: 'center', fontSize: 20, lineHeight: 50, backgroundColor: 'white', width: '50%',
              }}
              >
                17:00
              </Text>
              <Text style={{
                textAlign: 'center', fontSize: 20, lineHeight: 50, backgroundColor: 'white', width: '50%',
              }}
              >
                07:50
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
                12:30
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
                07:00
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
                07:17
              </Text>
              <Text style={{
                textAlign: 'center', fontSize: 20, lineHeight: 50, backgroundColor: 'white', width: '50%',
              }}
              >
                17:00
              </Text>
            </View>
            <View style={Styles.fixToText}>

              <Text style={{
                textAlign: 'center', fontSize: 20, lineHeight: 50, backgroundColor: 'white', width: '50%',
              }}
              >
                07:30
              </Text>
              <Text style={{
                textAlign: 'center', fontSize: 20, lineHeight: 50, backgroundColor: 'white', width: '50%',
              }}
              >
                18:10
              </Text>
            </View>
            <View style={Styles.fixToText}>

              <Text style={{
                textAlign: 'center', fontSize: 20, lineHeight: 50, backgroundColor: 'white', width: '50%',
              }}
              >
                18:00
              </Text>
              <Text style={{
                textAlign: 'center', fontSize: 20, lineHeight: 50, backgroundColor: 'white', width: '50%',
              }}
              >
                19:00
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
export default List9025A;
