import React from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  Alert,
  TouchableOpacity,
} from 'react-native';

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-start",
    marginHorizontal: 16,
    backgroundColor: '#DCDCDC',
  },
  title: {
    textAlign: 'center',
  },
  fixToText: {
    flexDirection: 'row',
  },
  separator: {
    marginVertical: 1,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
const Separator = () => <View style={styles.separator} />;
function Bus9025A1({ navigation }) {
  return (
  <SafeAreaView style={styles.background}>
    <View>
      <Text style={{ textAlign: 'center', backgroundColor: 'skyblue' }}>
        9025A
      </Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('List9025A')}
        style={{
          width: '40%',
          backgroundColor: 'yellow',
          position: 'absolute',
          right: 0,
        }}>
        <Text style={styles.title}>發車時刻表</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>navigation.navigate('Home')}
        style={{
          width: '30%',
          backgroundColor: '',
          position: 'absolute',
          left: 0,
        }}>
        <Text style={styles.title}>返回</Text>
      </TouchableOpacity>
    </View>
    

    <View>
      <View style={styles.fixToText}>
        <TouchableOpacity
          onPress={() => Alert.alert('Left button pressed')}
          style={{ width: '50%', backgroundColor: 'white' }}>
          <Text style={styles.title}>
            往中央大學
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => Alert.alert('Left button pressed')}
          style={{ width: '50%', backgroundColor: 'white' }}>
          <Text style={styles.title}>
            往松山機場
          </Text>
        </TouchableOpacity>
      </View>
    </View>
    <Separator />
    <View style={styles.fixToText}>
      
        <Text style={{textAlign: 'center',width: '50%', backgroundColor: 'white' }}>
          16:00 
        </Text>
        <Text style={ {textAlign: 'center',width: '50%', backgroundColor: 'white' }}>中壢公車站</Text>

    </View>
    <Separator />
    <View style={styles.fixToText}>
      
        <Text style={{textAlign: 'center',width: '50%', backgroundColor: 'white' }}>
          16:00 
        </Text>
        <Text style={ {textAlign: 'center',width: '50%', backgroundColor: 'white' }}>第一銀行</Text>

    </View>
    <Separator />
    <View style={styles.fixToText}>
      
        <Text style={{textAlign: 'center',width: '50%', backgroundColor: 'white' }}>
          16:01
        </Text>
        <Text style={ {textAlign: 'center',width: '50%', backgroundColor: 'white' }}>第一市場</Text>

    </View>
    <Separator />
    <View style={styles.fixToText}>
      
        <Text style={{textAlign: 'center',width: '50%', backgroundColor: 'white' }}>
          16:02
        </Text>
        <Text style={ {textAlign: 'center',width: '50%', backgroundColor: 'white' }}>河川教育中心</Text>

    </View>
    <Separator />
    <View style={styles.fixToText}>
      
        <Text style={{textAlign: 'center',width: '50%', backgroundColor: 'white' }}>
          16:02
        </Text>
        <Text style={ {textAlign: 'center',width: '50%', backgroundColor: 'white' }}>舊社</Text>

    </View>
    <Separator />
    <View style={styles.fixToText}>
      
        <Text style={{textAlign: 'center',width: '50%', backgroundColor: 'white' }}>
          16:04 
        </Text>
        <Text style={ {textAlign: 'center',width: '50%', backgroundColor: 'white' }}>新民國中</Text>

    </View>
    <Separator />
    <View style={styles.fixToText}>
      
        <Text style={{textAlign: 'center',width: '50%', backgroundColor: 'white' }}>
          16:04 
        </Text>
        <Text style={ {textAlign: 'center',width: '50%', backgroundColor: 'white' }}>廣興</Text>

    </View>
    <Separator />
  </SafeAreaView>
);}

export default Bus9025A1;
