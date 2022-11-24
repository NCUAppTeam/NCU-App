import React,{ useState,useEffect }  from 'react';
import {
  Text, View, SafeAreaView,RefreshControl,
  ScrollView, TouchableOpacity, Image, Button,
} from 'react-native';
import {
  Ionicons, FontAwesome5, AntDesign, Feather,
} from '@expo/vector-icons';
import styles from './style_folder/Styles_manage';
import ActiveController from '../../controller/Active';
import { Card, TextInput } from 'react-native-paper';

function message({ navigation }) {
  const [data, setData] = useState({});
  const [getData, setGetData] = useState([]);
  useEffect(() => {
    if(data.from==undefined && data.to==undefined){
      data.from="110303987";
      data.to="110303876";
    }
    ActiveController.getMessage(data.from,data.to).then((res) => {
      setGetData(res);
    }).then().catch((err) => {
      throw err;
    });
  }, []);

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    if(data.from==undefined && data.to==undefined){
      data.from="110303987";
      data.to="110303876";
    }
    ActiveController.getMessage(data.from,data.to).then((res) => {
      setGetData(res);
    }).then().catch((err) => {
      throw err;
    });
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView Vertical
      style={{ flex: 1 }}
      refreshControl={(
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
  )}>
      <View style={{margin: 50,borderWidth:1 }}>
        <Text>from</Text>
        <TextInput
          placeholder="學號"
          value={data.from}
          onChangeText={(text) => setData({ ...data, from: text })}
          selectionColor="#ccc"
        />
        <Text>to</Text>
        <TextInput
          placeholder="學號"
          value={data.to}
          onChangeText={(text) => setData({ ...data, to: text })}
          selectionColor="#ccc"
        />
        <Text>message</Text>
        <TextInput
          value={data.message}
          onChangeText={(text) => setData({ ...data, message: text })}
          selectionColor="#ccc"
        />
        <Button
          title='傳送'
          onPress={()=>{
            data.uploadTime = new Date();
            ActiveController.addMessage(data);
          }}
        />
      </View>
      <View>
        
          <View>
          {getData.map(({
            id, from,to,message,
          }) => (
            <Card
              key={id}>
              <Card.Content>
              <Text>
                from:{from}
              </Text>
              <Text>
                to:{to}
              </Text>
              <Text>
                message:{message}
              </Text>
              </Card.Content>
            </Card>
          ))}
          </View>
          <Button
            title='讀取'
            onPress={()=>{
              ActiveController.getMessage(110303987,110303876);
            }}
          />
        
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}
export default message;
