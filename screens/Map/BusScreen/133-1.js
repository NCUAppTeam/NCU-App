import React, { useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  Alert,
  TouchableOpacity,
  RefreshControl,
  ScrollView
} from 'react-native';
import BusController from '../../../controller/Bus';

const styles = StyleSheet.create({
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
function Bus133({ navigation }) {

  const [item, setItems] = useState([]);

  const [start, setStart] = useState(true);

  const [direction,setDirection] = useState(1);

  const [refreshing, setRefreshing] = useState(false);


  const onRefresh = () => {
      setRefreshing(true);
      BusController.route({id:133,dir:1}).then((res) => {
        setItems(res);
        console.log();
        setRefreshing(false);
      });
  };

  const onRefresh1 = () => {
    setRefreshing(true);
    BusController.route({id:133,dir:0}).then((res) => {
      setItems(res);
      setRefreshing(false);
    });
};

  useEffect(() => {
    if(start){
      setStart(false);
      if(direction==1)onRefresh();
      else onRefresh1();
    }
    var id;
    if(direction==1)id=setInterval(onRefresh,10000);
    else id=setInterval(onRefresh1,10000)
    return () => {
      clearInterval(id);
    }
  },[start]);

  return (
  <SafeAreaView style={styles.background} refreshControl={(<RefreshControl  refreshing={refreshing} onRefresh={onRefresh} />)}>
    <View>
      <Text style={{textAlign:'center', backgroundColor: '#28527A',color:'white', height:50,width:'100%',fontSize:20, textAlignVertical:'center', lineHeight: 50}}>
        133
      </Text>
      <TouchableOpacity
        onPress={() => {navigation.navigate('List133')}}
        style={{
          width: '25%',
          top:15,
          left:280,
          backgroundColor: '#FFE66F',
          position: 'absolute',
          right: 0,
        }}>
        <Text style={styles.title}>發車時刻表</Text>
      </TouchableOpacity>
    </View>
    

    <View>
      <View style={{flexDirection: 'row',height:50}}>
        <TouchableOpacity
          onPress={() => {setStart(true);setDirection(0)}}
          style={{ width: '50%', backgroundColor: 'white' }}>
          <Text style={{textAlign:'center', fontSize:20, textAlignVertical:'center', lineHeight: 50}}>
            往中央大學
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {setStart(true);setDirection(1)}}
          style={{ width: '50%', backgroundColor: 'white' }}>
          <Text style={{textAlign:'center', fontSize:20, textAlignVertical:'center', lineHeight: 50}}>
            往中壢公車站
          </Text>
        </TouchableOpacity>
      </View>
    </View>
    <Text style={{fontSize:1}}>{'\n'}</Text>
    <ScrollView>
    { item.map((data) => (
        <View>
          <View style={{flexDirection: 'row',height:50}}>
            <Text style={{textAlign: 'center',width: '50%', backgroundColor: 'white', fontSize:20, textAlignVertical:'center', lineHeight: 50}}>
              {data.time} 
            </Text>
            <Text style={ {width: '50%', backgroundColor: 'white', fontSize:20, textAlignVertical:'center', lineHeight: 50}}>{data.state}</Text>
  
          </View>
          <Separator />
        </View>
          
      ))}
    </ScrollView>
  </SafeAreaView>
);}

export default Bus133;