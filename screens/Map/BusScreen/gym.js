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
  container: {
    flex: 1,
    justifyContent: "flex-start",
    marginHorizontal: 16,
    backgroundColor: 'white',
  },
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
    marginVertical: 10,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
const Separator = () => <View style={styles.separator} />;
function Sg({ navigation }) {
  return (
  <SafeAreaView style={styles.background}>
    <View>
      <Text style={{ textAlign: 'center', backgroundColor: 'skyblue' }}>
        依仁堂
      </Text>
      <TouchableOpacity
        onPress={() =>navigation.navigate('Second')}
        style={{
          width: '10%',
          backgroundColor: 'skyblue',
          position: 'absolute',
          left: 20,
        }}>
        <Text style={styles.title}>返回</Text>
      </TouchableOpacity>
    </View>
    <Separator />

    <View>
      <View style={styles.fixToText}>
        <Text style={{ width: '50%', backgroundColor: 'white' ,textAlign: 'center'}}>
            公車
          </Text>
        
        
          <Text style={{ width: '50%', backgroundColor: 'white' ,textAlign: 'center'}}>
            到站時間
          </Text>
      </View>
    </View>
    <Separator />
    <View>
      <TouchableOpacity
        onPress={() => navigation.navigate('Bus132')}
        style={{ width: '100%', backgroundColor: 'white' }}>
        <Text style={{textAlign: 'left'}}>
             132                                         到達中            
        </Text>
      </TouchableOpacity>
    </View>
    <Separator />
    <View>
     <TouchableOpacity
        onPress={() => navigation.navigate('Bus172')}
        style={{ width: '100%', backgroundColor: 'white' }}>
        <Text style={{textAlign: 'left'}}>
             172                                         8分鐘             
        </Text>
      </TouchableOpacity>
    </View>
    <Separator />
    <View>
     <TouchableOpacity
        onPress={() => navigation.navigate('Bus9025A')}
        style={{ width: '100%', backgroundColor: 'white' }}>
        <Text style={{textAlign: 'left'}}>
             9025A                                    17:52            
        </Text>
      </TouchableOpacity>
    </View>
    <Separator />
    <View>
      <TouchableOpacity
        onPress={() => navigation.navigate('Bus133')}
        style={{ width: '100%', backgroundColor: 'white' }}>
        <Text style={{textAlign: 'left'}}>
            133                                         18:00            
        </Text>
      </TouchableOpacity>
    </View>
    <Separator />
    <View>
      <TouchableOpacity
        onPress={() => Alert.alert('沒有即時資料')}
        style={{ width: '100%', backgroundColor: 'white' }}>
        <Text style={{textAlign: 'left'}}>
             台聯大                                    18:00            
        </Text>
      </TouchableOpacity>
    </View>
    <Separator />
    <View>
      <TouchableOpacity
        onPress={() => navigation.navigate('Bus173')}
        style={{ width: '100%', backgroundColor: 'white' }}>
        <Text style={{textAlign: 'left'}}>
             173                                         末班已過             
        </Text>
      </TouchableOpacity>
    </View>
    <Separator />
  </SafeAreaView>
);
}
export default Sg;
