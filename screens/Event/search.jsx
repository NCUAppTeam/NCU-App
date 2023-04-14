import React, { useState, useEffect } from 'react';
import {
  SafeAreaView, TextInput,
} from 'react-native';
import { Title } from 'react-native-paper';
import {
  Ionicons, FontAwesome5, FontAwesome, AntDesign, MaterialCommunityIcons, MaterialIcons,
} from '@expo/vector-icons';
import {
  NativeBaseProvider, Box, HStack, VStack, ZStack, FlatList, Pressable, Icon, Input, Center, Text
} from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';
import styles from './style_folder/Styles_search';
import ActiveController from '../../controller/Active';

function Search({ navigation }) {
  const genreName = [{ id: 0, name: '揪人共乘' }, { id: 1, name: '校園活動' }, { id: 2, name: '揪人運動' }, { id: 3, name: '系上活動' }, { id: 4, name: '揪人遊戲' }, { id: 5, name: '社團活動' }];
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState({});
  useEffect(() => {
    ActiveController.fuseSearchName(searchQuery).then((res) => {
      setData(res);
      console.log(res);
    }).then().catch((err) => {
      throw err;
    });
  }, []);
  return (
    <Box safeArea>
        <Center>
          <Input placeholder="搜尋" size="lg" m="2" mt="4" variant="filled" width="90%" height="40px"borderRadius="10" bg="#E5EBF1" py="1" px="2"
            InputLeftElement={<Icon  ml="2" size="6"  as={AntDesign} name="search1" color="#476685" ></Icon>} 
            isFocused="true"
            value={searchQuery}
            onChangeText={(text) => {
              setSearchQuery(text);
              ActiveController.fuseSearchName(text).then((query) => {
                setData(query);
              });
            }}  
            _focus={{backgroundColor: "#E5EBF1"}}
            
            InputRightElement={
                <Text mr="4" color="#476685" onPress={() => navigation.navigate('list')}>取消</Text>
            }
          />
        </Center>

        {searchQuery === '' && (
        <Box style={styles.btnArea}>
          <FlatList

            numColumns={2}
            data={genreName}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <Box flex="1">
                <LinearGradient
                  colors={['#D2E6EA26', '#8AC4D026', '#0A6B7E26']}
                  start={[0.6, 0.0]}
                  end={[0.5, 0.8]}
                  style={styles.genrebutton}
                >
                  <Pressable
                    onPress={() => {
                      navigation.navigate('genre', { GenreName: item.name });
                    }}
                  >
                    <ZStack>
                      {(item.name === '揪人共乘') && (
                      <Box>
                        <FontAwesome name="taxi" size={80} color="#ccc8c8" style={styles.icon} />
                      </Box>
                      )}
                      {(item.name === '揪人運動') && (
                      <Box>
                        <MaterialIcons name="sports-volleyball" size={100} color="#ccc8c8" style={styles.icon3} />
                      </Box>
                      )}
                      {(item.name === '揪人遊戲') && (
                      <Box>
                        <Ionicons name="ios-game-controller" size={100} color="#ccc8c8" style={styles.icon3} />
                      </Box>
                      )}
                      {(item.name === '校園活動') && (
                      <Box>
                        <FontAwesome5 name="school" size={80} color="#ccc8c8" style={styles.icon} />
                      </Box>
                      )}
                      {(item.name === '社團活動') && (
                      <Box>
                        <MaterialCommunityIcons name="drama-masks" size={100} color="#ccc8c8" style={styles.icon2} />
                      </Box>
                      )}
                      {(item.name === '系上活動') && (
                      <Box>
                        <FontAwesome5 name="trophy" size={80} color="#ccc8c8" style={styles.icon} />
                      </Box>
                      )}
                      <Title style={styles.genreTitle}>
                        {item.name}
                      </Title>
                    </ZStack>
                  </Pressable>
                </LinearGradient>
              </Box>
            )}
          />
        </Box>
        )}
        {searchQuery !== '' && (
          <Box style={styles.keywordArea}>
            <FlatList
              data={data}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <Box>
                  <Pressable
                    style={styles.keywordBox}
                    onPress={() => {
                      navigation.navigate('details', { Cd: item.item.id, prepage: 'search' });
                    }}
                  >
                    <Text style={styles.keywordBoxText}>{item.item.name}</Text>
                  </Pressable>
                </Box>
              )}
            />
          </Box>
        )}

      
    </Box>
  );
}

export default Search;
