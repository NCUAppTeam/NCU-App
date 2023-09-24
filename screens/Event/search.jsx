import React, { useState, useEffect } from 'react'

import {
  Ionicons, FontAwesome5, FontAwesome, AntDesign, MaterialCommunityIcons, MaterialIcons
} from '@expo/vector-icons'
import {
  Box, ZStack, FlatList, Pressable, Icon, Input, Center, Text
} from 'native-base'

import styles from './style_folder/Styles_search'
import ActiveController from '../../controller/Active'

function CategoryItem ({ item, navigation }) {
  return (
    <Box
      flex={1}
      space={2}
      my={3}
      mx={2}
      height="130px"
      bg={{
        linearGradient: {
          colors: ['#D2E6EA26', '#0A6B7E26'],
          start: [0, 0],
          end: [1, 1]
        }
      }}
      rounded="xl"

    >
      <Pressable
        onPress={() => {
          navigation.navigate('genre', { GenreName: item.name })
        }}
      >

        <ZStack height="100%" alignItems="center" justifyContent="center">
          {(item.name === '揪人共乘') && (
            <FontAwesome name="taxi" size={80} color="#ccc8c8" />
          )}
          {(item.name === '揪人運動') && (
            <MaterialIcons name="sports-volleyball" size={100} color="#ccc8c8" />
          )}
          {(item.name === '揪人遊戲') && (
            <Ionicons name="ios-game-controller" size={100} color="#ccc8c8" />
          )}
          {(item.name === '校園活動') && (
            <FontAwesome5 name="school" size={80} color="#ccc8c8" />
          )}
          {(item.name === '社團活動') && (
            <MaterialCommunityIcons name="drama-masks" size={100} color="#ccc8c8" style={{ marginTop: -15 }}/>
          )}
          {(item.name === '系上活動') && (
            <FontAwesome5 name="trophy" size={80} color="#ccc8c8" />
          )}
          <Text bold fontSize={'lg'} color={'#023b78'} textAlign="center">
            {item.name}
          </Text>

        </ZStack>

      </Pressable>
    </Box>
  )
}
function CategoryList ({ navigation }) {
  const renderItem = ({ item }) => (
    <CategoryItem item={item} navigation={navigation} />
  )
  const genreName = [{ id: 0, name: '揪人共乘' }, { id: 1, name: '校園活動' }, { id: 2, name: '揪人運動' }, { id: 3, name: '系上活動' }, { id: 4, name: '揪人遊戲' }, { id: 5, name: '社團活動' }]

  return (
    <FlatList
      numColumns={2}
      data={genreName}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      renderItem={renderItem}
    />
  )
}

function Search ({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [data, setData] = useState({})
  useEffect(() => {
    ActiveController.fuseSearchName(searchQuery).then((res) => {
      setData(res)
      console.log(res)
    }).then().catch((err) => {
      throw err
    })
  }, [])
  return (
    <Box safeArea flex={1} flexGrow={1}>
      <Center m={4} >
        <Input
          placeholder="搜尋"
          size="lg"
          variant="filled"
          height="40px"
          borderRadius="10"
          bg="#E5EBF1"
          py="1"
          px="2"
          InputLeftElement={<Icon ml="2" size="6" as={AntDesign} name="search1" color="#476685" />}
          value={searchQuery}
          onChangeText={(text) => {
            setSearchQuery(text)
            ActiveController.fuseSearchName(text).then((query) => {
              setData(query)
            })
          }}
          _focus={{ backgroundColor: '#E5EBF1' }}
          InputRightElement={
            <Text mr="4" color="#476685" onPress={() => navigation.navigate('list')}>取消</Text>
            }
            autoFocus
        />
      </Center>

      {searchQuery === '' && (
      <Box mx={4} flex={1}>
        <CategoryList navigation={navigation} />
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
                  navigation.navigate('details', { Cd: item.item.id, prepage: 'search' })
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
  )
}

export default Search
