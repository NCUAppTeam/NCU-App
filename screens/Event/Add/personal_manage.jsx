import React from 'react';
import {
  Text, Platform, View, SafeAreaView, TextInput,
  ScrollView, TouchableOpacity, Alert, Dimensions, Image,
} from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
import { Ionicons, FontAwesome5, AntDesign } from '@expo/vector-icons';
import {
  NativeBaseProvider, Box, Divider, Heading,
} from 'native-base';
import styles from '../Styles';

function personal({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <NativeBaseProvider>
        <View style={{ flex: 0.1, flexDirection: 'column' }}>
          <View style={{ flexDirection: 'row' }}>
            <Box style={{
              flex: 0.8, justifyContent: 'center', alignItems: 'flex-start',
            }}
            >
              <AntDesign
                name="arrowleft"
                size={28}
                color="darkblue"
                style={{ justifyContent: 'center' }}
                onPress={() => { navigation.navigate('list'); }}
              />
            </Box>
            <View style={styles.nameheader}>
              <Text style={styles.personalHeader}>
                活動 - 個人頁面
              </Text>
            </View>
            <View style={{
              flex: 1, justifyContent: 'center', alignItems: 'flex-end',
            }}
            >
              <FontAwesome5
                name="comment"
                size={25}
                color="darkblue"
                onPress={() => { navigation.navigate('list'); }}
              />
            </View>
          </View>
        </View>
        <ScrollView style={{ flex: 1 }}>
          <Box style={styles.choose}>
            <TouchableOpacity
              style={styles.roundbutton}
              onPress={() => navigation.navigate('add')}
            >
              <Text style={styles.roundbuttonText}>
                新增活動
              </Text>
            </TouchableOpacity>
          </Box>
          <Box style={styles.choose}>
            <TouchableOpacity
              style={styles.roundbutton}
              onPress={() => navigation.navigate('list')}
            >
              <Text style={styles.roundbuttonText}>
                管理活動
              </Text>
            </TouchableOpacity>
          </Box>
          <Box style={styles.choose}>
            <TouchableOpacity
              style={styles.roundbutton}
              onPress={() => navigation.navigate('list')}
            >
              <Text style={styles.roundbuttonText}>
                活動紀錄
              </Text>
            </TouchableOpacity>
          </Box>
        </ScrollView>
      </NativeBaseProvider>
    </SafeAreaView>
  );
}

export default personal;
