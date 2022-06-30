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
function List133({ navigation }) {
  return (
  <SafeAreaView style={styles.background}>
    <View>
      <Text style={{textAlign:'center', backgroundColor: '#28527A',color:'white', height:50,width:'100%',fontSize:20, textAlignVertical:'center', lineHeight: 50}}>
        133公車時刻表
      </Text>
    </View>
    
     <Text style={{ textAlign: 'center',fontSize:20}}>
       往中央大學
      </Text>
    <View>
      <View style={styles.fixToText}>
       
          <Text style={{ textAlign: 'center',width: '50%', backgroundColor: 'white' ,fontSize:20}}>
           平日
          </Text>
          <Text style={{ textAlign: 'center',width: '50%', backgroundColor: 'white' ,fontSize:20}}>
            假日
          </Text>
        
      </View>
      <Separator />
      <View style={styles.fixToText}>
       
          <Text style={{ textAlign: 'center',width: '50%', backgroundColor: 'white' ,fontSize:20}}>
            06:30
          </Text>
          <Text style={{ textAlign: 'center',width: '50%', backgroundColor: 'white' ,fontSize:20}}>
            06:20
          </Text>   
      </View>
      <View style={styles.fixToText}>
       
          <Text style={{ textAlign: 'center',width: '50%', backgroundColor: 'white' ,fontSize:20}}>
            07:00
          </Text>
          <Text style={{ textAlign: 'center',width: '50%', backgroundColor: 'white' ,fontSize:20}}>
            07:00
          </Text>   
      </View>
      <View style={styles.fixToText}>
       
          <Text style={{ textAlign: 'center',width: '50%', backgroundColor: 'white' ,fontSize:20}}>
           08:00
          </Text>
          <Text style={{ textAlign: 'center',width: '50%', backgroundColor: 'white' ,fontSize:20}}>
            07:20
          </Text>   
      </View>
      <View style={styles.fixToText}>
       
          <Text style={{ textAlign: 'center',width: '50%', backgroundColor: 'white' ,fontSize:20}}>
            08:30
          </Text>
          <Text style={{ textAlign: 'center',width: '50%', backgroundColor: 'white' ,fontSize:20}}>
            08:00
          </Text>   
      </View>
      <View style={styles.fixToText}>
       
          <Text style={{ textAlign: 'center',width: '50%', backgroundColor: 'white' ,fontSize:20}}>
           09:00
          </Text>
          <Text style={{ textAlign: 'center',width: '50%', backgroundColor: 'white' ,fontSize:20}}>
            08:20
          </Text>   
      </View>
      <View style={styles.fixToText}>
       
          <Text style={{ textAlign: 'center',width: '50%', backgroundColor: 'white' ,fontSize:20}}>
            09:30
          </Text>
          <Text style={{ textAlign: 'center',width: '50%', backgroundColor: 'white' ,fontSize:20}}>
            09:00
          </Text>   
      </View>
      <View style={styles.fixToText}>
       
          <Text style={{ textAlign: 'center',width: '50%', backgroundColor: 'white' ,fontSize:20}}>
            10:00
          </Text>
          <Text style={{ textAlign: 'center',width: '50%', backgroundColor: 'white' ,fontSize:20}}>
            09:20
          </Text>   
      </View>
      <View style={styles.fixToText}>
       
          <Text style={{ textAlign: 'center',width: '50%', backgroundColor: 'white' ,fontSize:20}}>
            10:30
          </Text>
          <Text style={{ textAlign: 'center',width: '50%', backgroundColor: 'white' ,fontSize:20}}>
            10:00
          </Text>   
      </View>
      <View style={styles.fixToText}>
       
          <Text style={{ textAlign: 'center',width: '50%', backgroundColor: 'white' ,fontSize:20}}>
            11:00
          </Text>
          <Text style={{ textAlign: 'center',width: '50%', backgroundColor: 'white' ,fontSize:20}}>
            10:20
          </Text>   
      </View>
      <View style={styles.fixToText}>
       
          <Text style={{ textAlign: 'center',width: '50%', backgroundColor: 'white' ,fontSize:20}}>
            11:30
          </Text>
          <Text style={{ textAlign: 'center',width: '50%', backgroundColor: 'white' ,fontSize:20}}>
            11:00
          </Text>   
      </View>
      <View style={styles.fixToText}>
       
          <Text style={{ textAlign: 'center',width: '50%', backgroundColor: 'white' ,fontSize:20}}>
            12:00
          </Text>
          <Text style={{ textAlign: 'center',width: '50%', backgroundColor: 'white' ,fontSize:20}}>
            11:20
          </Text>   
      </View>
      <View style={styles.fixToText}>
       
          <Text style={{ textAlign: 'center',width: '50%', backgroundColor: 'white' ,fontSize:20}}>
            12:25
          </Text>
          <Text style={{ textAlign: 'center',width: '50%', backgroundColor: 'white' ,fontSize:20}}>
            12:00
          </Text>   
      </View>
    </View>
    
    <Text style={{ textAlign: 'center', backgroundColor: 'white' ,color:'gray'}}>
        上次更新:2022/03/10
      </Text>
    
  </SafeAreaView>
);}
export default List133;
