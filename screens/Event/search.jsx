import React, { useState, useEffect } from 'react';
import {
  Text, Platform, View, SafeAreaView, TextInput,
  ScrollView, TouchableOpacity, Alert, Dimensions, Image,
} from 'react-native';
import {
  Searchbar,
} from 'react-native-paper';
// import Icon from 'react-native-vector-icons/FontAwesome';
import { Ionicons, FontAwesome5, AntDesign } from '@expo/vector-icons';
import {
  NativeBaseProvider, Box, Divider, Heading,
} from 'native-base';
import styles from './style_folder/Styles_search';

function Search({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const onChangeSearch = (query) => setSearchQuery(query);
  return (
    <SafeAreaView style={styles.container}>
      <NativeBaseProvider>
        <View style={{ flex: 0.15, flexDirection: 'column' }}>
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.SearchBar}>
              <Searchbar
                returnKeyType="previous"
                placeholder="Search"
                onChangeText={onChangeSearch}
                value={searchQuery}
              />
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
            <View style={{
              flex: 1, justifyContent: 'center', alignItems: 'flex-end',
            }}
            >
              <FontAwesome5
                name="user"
                size={24}
                color="darkblue"
                onPress={() => { navigation.navigate('personal'); }}
              />
            </View>
          </View>
        </View>

        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Box style={{ flexDirection: 'row' }}>
            <Box style={styles.choose}>
              <TouchableOpacity
                style={styles.genrebutton}
                onPress={() => navigation.navigate('add')}
              >
                <Text style={styles.searchBtn}>
                  揪人共乘
                </Text>
              </TouchableOpacity>
            </Box>
            <Box style={styles.choose}>
              <TouchableOpacity
                style={styles.genrebutton}
                onPress={() => navigation.navigate('add')}
              >
                <Text style={styles.searchBtn}>
                  校園活動
                </Text>
              </TouchableOpacity>
            </Box>
          </Box>
          <Box style={{ flexDirection: 'row' }}>
            <Box style={styles.choose}>
              <TouchableOpacity
                style={styles.genrebutton}
                onPress={() => navigation.navigate('add')}
              >
                <Text style={styles.searchBtn}>
                  揪人運動
                </Text>
              </TouchableOpacity>
            </Box>
            <Box style={styles.choose}>
              <TouchableOpacity
                style={styles.genrebutton}
                onPress={() => navigation.navigate('add')}
              >
                <Text style={styles.searchBtn}>
                  系上活動
                </Text>
              </TouchableOpacity>
            </Box>
          </Box>
          <Box style={{ flexDirection: 'row' }}>
            <Box style={styles.choose}>
              <TouchableOpacity
                style={styles.genrebutton}
                onPress={() => navigation.navigate('add')}
              >
                <Text style={styles.searchBtn}>
                  揪人遊戲
                </Text>
              </TouchableOpacity>
            </Box>
            <Box style={styles.choose}>
              <TouchableOpacity
                style={styles.genrebutton}
                onPress={() => navigation.navigate('add')}
              >
                <Text style={styles.searchBtn}>
                  社團活動
                </Text>
              </TouchableOpacity>
            </Box>
          </Box>
        </View>
      </NativeBaseProvider>
    </SafeAreaView>
  );
}

export default Search;
