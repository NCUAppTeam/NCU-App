import React, { useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  Text,
  Alert,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {
  IconButton
} from 'react-native-paper';
import BusController from '../../../controller/Bus';

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-start",
    marginHorizontal: 16,
  },
});
function Second({ navigation }) {
    const [item, setItems] = useState([]);
  
    const [start, setStart] = useState(true);
  
    const [refreshing, setRefreshing] = useState(false);
  
  
    const onRefresh = () => {
        setRefreshing(true);
        BusController.second().then((res) => {
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
    <ScrollView>
    <View style={{flexDirection:'row'}}>
      <Text style={{textAlign:'center', backgroundColor: '#28527A',color:'white', height:50,width:'100%',fontSize:20, textAlignVertical:'center', lineHeight: 50}}>
        公車動態
      </Text>
      <IconButton
        onPress={() =>navigation.navigate('地圖')}
        icon="times"
        size={20}
        style={{
          left:320,
          top:0,
          position:'absolute'
          }}/>
    </View>
    
    <View>
      <View style={{flexDirection: 'row', height:50}}>
        <TouchableOpacity
          onPress={() => navigation.navigate('依班次')}
          style={{ width: '50%', backgroundColor: 'white' }}>
          <Text style={{textAlign:'center', fontSize:20, textAlignVertical:'center', lineHeight: 50}}>
            依班次
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>navigation.navigate('依站牌')}
          style={{ width: '50%', backgroundColor: 'white' }}>
          <Text style={{textAlign:'center', fontSize:20, textAlignVertical:'center', lineHeight: 50}}>
            依站牌
          </Text>
        </TouchableOpacity>
      </View>
    </View>
    <Text style={{fontSize:5}}>{'\n'}</Text>
    {item.map((res)=>(
      <View>
        <View>
        <TouchableOpacity
          onPress={() => navigation.navigate(res.state)}
          style={{ width: '100%', backgroundColor: 'white' }}>
          <View style={{flexDirection:'row'}}>
            <View style={{width:160}}>
              <Text style={{left:20,top:50,fontSize:22,color:'#28527A'}}>
                {res.state}
              </Text>
            </View>
            <View>
              <Text style={{left:20,fontSize:20,top:40}}>
                {res.route1} | {res.time1}
              </Text>
              <Text style={{left:20,fontSize:20,top:50}}>{res.route2} | {res.time2}</Text>
            </View>
          </View>
          <View>
          <IconButton
            onPress={() => Alert.alert('Left button pressed')}
            size={20}
            icon="heart"
            style={{
              left:320,
              }}/>
          <IconButton
            onPress={() => Alert.alert('Left button pressed')}
            size={20}
            icon="plus"
            style={{
              left:320,
              }}/>
        </View>
        </TouchableOpacity>
        </View>
      <Text style={{fontSize:5}}>{'\n'}</Text>
    </View>
    ))}
    </ScrollView>
  </SafeAreaView>
);}

export default Second;
