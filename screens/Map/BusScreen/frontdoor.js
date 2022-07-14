import React, { useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  Alert,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import BusController from '../../../controller/Bus';

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
  },
  title: {
    textAlign: 'center',
  },
  fixToText: {
    flexDirection: 'row',
  },
  separator: {
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
const Separator = () => <View style={styles.separator} />;
function Frontdoor({ navigation }) {

  const [item, setItems] = useState([]);

  const [start, setStart] = useState(true);

  const [refreshing, setRefreshing] = useState(false);


  const onRefresh = () => {
      setRefreshing(true);
      BusController.state({id:1351}).then((res) => {
        setItems(res);
        setRefreshing(false);
      });
  };

  useEffect(() => {
    if(start){
      setStart(false);
      onRefresh();
    }
    var id;
    id=setInterval(onRefresh,10000)
    return () => {
      clearInterval(id);
    }
  },[start]);
  return (
    <SafeAreaView style={styles.background} refreshControl={(<RefreshControl  refreshing={refreshing} onRefresh={onRefresh} />)}>
    <View>
    <Text style={{textAlign:'center', backgroundColor: '#28527A',color:'white', height:50,width:'100%',fontSize:20, textAlignVertical:'center', lineHeight: 50}}>
        中央大學正門
      </Text>
    </View>
    <Text style={{fontSize:1}}>{'\n'}</Text>

    <View>
      <View style={{flexDirection:'row'}}>
        <Text style={{ width: '50%',textAlign: 'center',fontSize:20}}>
            公車
          </Text>
        
        
          <Text style={{ width: '50%',textAlign: 'center',fontSize:20}}>
            到站時間
          </Text>
      </View>
    </View>
    <Separator />
    { item.map((data) => (
        <View>
        <View style={{flexDirection: 'row',height:50}}>
          <Text style={{textAlign: 'center',width: '50%', backgroundColor: 'white', fontSize:20, textAlignVertical:'center', lineHeight: 50}}>
            {data.route} 
          </Text>
          <Text style={{textAlign: 'center',width: '50%', backgroundColor: 'white', fontSize:20, textAlignVertical:'center', lineHeight: 50}}>{data.time}</Text>

        </View>
        <Separator />
        </View>
          
      ))}
    <Separator />
  </SafeAreaView>
);
}
export default Frontdoor;