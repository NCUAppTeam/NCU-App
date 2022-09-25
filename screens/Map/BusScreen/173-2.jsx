import React from 'react';
import {
  View,
  SafeAreaView,
  Text,
} from 'react-native';
import Styles from '../Styles';

const Separator = () => <View style={Styles.separator} />;
function List173() {
  return (
    <SafeAreaView style={Styles.background}>
      <View>
        <Text style={{
          textAlign: 'center', backgroundColor: '#28527A', color: 'white', height: 50, width: '100%', fontSize: 20, textAlignVertical: 'center', lineHeight: 50,
        }}
        >
          172公車時刻表
        </Text>
      </View>

      <Text style={{ textAlign: 'center', fontSize: 20 }}>
        往中央大學
      </Text>
      <View>
        <View style={Styles.fixToText}>

          <Text style={{
            textAlign: 'center', width: '50%', backgroundColor: 'white', fontSize: 20,
          }}
          >
            平日
          </Text>
          <Text style={{
            textAlign: 'center', width: '50%', backgroundColor: 'white', fontSize: 20,
          }}
          >
            假日
          </Text>

        </View>
        <Separator />
        <View style={Styles.fixToText}>

          <Text style={{
            textAlign: 'center', width: '50%', backgroundColor: 'white', fontSize: 20,
          }}
          >
            06:30
          </Text>
          <Text style={{
            textAlign: 'center', width: '50%', backgroundColor: 'white', fontSize: 20,
          }}
          >
            06:20
          </Text>
        </View>
        <View style={Styles.fixToText}>

          <Text style={{
            textAlign: 'center', width: '50%', backgroundColor: 'white', fontSize: 20,
          }}
          >
            07:00
          </Text>
          <Text style={{
            textAlign: 'center', width: '50%', backgroundColor: 'white', fontSize: 20,
          }}
          >
            07:00
          </Text>
        </View>
        <View style={Styles.fixToText}>

          <Text style={{
            textAlign: 'center', width: '50%', backgroundColor: 'white', fontSize: 20,
          }}
          >
            08:00
          </Text>
          <Text style={{
            textAlign: 'center', width: '50%', backgroundColor: 'white', fontSize: 20,
          }}
          >
            07:20
          </Text>
        </View>
        <View style={Styles.fixToText}>

          <Text style={{
            textAlign: 'center', width: '50%', backgroundColor: 'white', fontSize: 20,
          }}
          >
            08:30
          </Text>
          <Text style={{
            textAlign: 'center', width: '50%', backgroundColor: 'white', fontSize: 20,
          }}
          >
            08:00
          </Text>
        </View>
        <View style={Styles.fixToText}>

          <Text style={{
            textAlign: 'center', width: '50%', backgroundColor: 'white', fontSize: 20,
          }}
          >
            09:00
          </Text>
          <Text style={{
            textAlign: 'center', width: '50%', backgroundColor: 'white', fontSize: 20,
          }}
          >
            08:20
          </Text>
        </View>
        <View style={Styles.fixToText}>

          <Text style={{
            textAlign: 'center', width: '50%', backgroundColor: 'white', fontSize: 20,
          }}
          >
            09:30
          </Text>
          <Text style={{
            textAlign: 'center', width: '50%', backgroundColor: 'white', fontSize: 20,
          }}
          >
            09:00
          </Text>
        </View>
        <View style={Styles.fixToText}>

          <Text style={{
            textAlign: 'center', width: '50%', backgroundColor: 'white', fontSize: 20,
          }}
          >
            10:00
          </Text>
          <Text style={{
            textAlign: 'center', width: '50%', backgroundColor: 'white', fontSize: 20,
          }}
          >
            09:20
          </Text>
        </View>
        <View style={Styles.fixToText}>

          <Text style={{
            textAlign: 'center', width: '50%', backgroundColor: 'white', fontSize: 20,
          }}
          >
            10:30
          </Text>
          <Text style={{
            textAlign: 'center', width: '50%', backgroundColor: 'white', fontSize: 20,
          }}
          >
            10:00
          </Text>
        </View>
        <View style={Styles.fixToText}>

          <Text style={{
            textAlign: 'center', width: '50%', backgroundColor: 'white', fontSize: 20,
          }}
          >
            11:00
          </Text>
          <Text style={{
            textAlign: 'center', width: '50%', backgroundColor: 'white', fontSize: 20,
          }}
          >
            10:20
          </Text>
        </View>
        <View style={Styles.fixToText}>

          <Text style={{
            textAlign: 'center', width: '50%', backgroundColor: 'white', fontSize: 20,
          }}
          >
            11:30
          </Text>
          <Text style={{
            textAlign: 'center', width: '50%', backgroundColor: 'white', fontSize: 20,
          }}
          >
            11:00
          </Text>
        </View>
        <View style={Styles.fixToText}>

          <Text style={{
            textAlign: 'center', width: '50%', backgroundColor: 'white', fontSize: 20,
          }}
          >
            12:00
          </Text>
          <Text style={{
            textAlign: 'center', width: '50%', backgroundColor: 'white', fontSize: 20,
          }}
          >
            11:20
          </Text>
        </View>
        <View style={Styles.fixToText}>

          <Text style={{
            textAlign: 'center', width: '50%', backgroundColor: 'white', fontSize: 20,
          }}
          >
            12:25
          </Text>
          <Text style={{
            textAlign: 'center', width: '50%', backgroundColor: 'white', fontSize: 20,
          }}
          >
            12:00
          </Text>
        </View>
      </View>

      <Text style={{ textAlign: 'center', backgroundColor: 'white', color: 'gray' }}>
        上次更新:2022/03/10
      </Text>

    </SafeAreaView>
  );
}
export default List173;
