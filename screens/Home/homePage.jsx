import React,{ useEffect,useState } from 'react';
import { SafeAreaView,Text,Image,View } from 'react-native'; 
import styles from './Styles';
import { Center} from 'native-base';
import UserController from '../../controller/getStudentId';
import { FontAwesome,Ionicons} from '@expo/vector-icons';

function HomePage({ navigation }) {
  const userUid = UserController.getUid();
  const [userAvatar, setUserAvatar] = useState({});

  useEffect(()=>{
    UserController.getINFO(userUid).then((res) => {
    setUserAvatar(res);
    }).catch((err) => {
      throw err;
    });
  });
  

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.topHomePage}>
          <View style={styles.topLeftRight}>
            <Image
              style={styles.avatar}
              source={{
                uri: userAvatar.avatar,
              }}
            />
            <View style={styles.topGreet}>
              <Text style={styles.topTextGreet}>早安,</Text>
              <Text style={styles.topTextName}>{userAvatar.name}</Text>
            </View>
          </View>
          <Center style={styles.topLeftRight}>
            <FontAwesome
              name="comment-o"
              size={25}
              color="#28527A"
            />
            <Ionicons
              name="settings-outline"
              size={25}
              style={{fontWeight:'bold'}}
              color="#28527A"
              onPress={()=>{navigation.navigate('settings', {
                userAvatar,
                });}}
            />
          </Center>
        </View>
    </SafeAreaView>
  );
}


export default HomePage;