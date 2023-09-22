import React, { useState, useEffect } from 'react'
import {
  Text, RefreshControl, Image
} from 'react-native'
import { Title } from 'react-native-paper'
import {
  Ionicons, FontAwesome5, AntDesign, Feather, Octicons
} from '@expo/vector-icons'
import {
  NativeBaseProvider, Box, FlatList, VStack, Pressable, HStack
} from 'native-base'
import styles from './style_folder/Styles_moreEvent'
import ActiveController from '../../controller/Active'
import MessageController from '../../controller/Message'
import { BaseTheme } from '../../theme'

function Genre ({ navigation, route }) {
  const { GenreName } = route.params
  const [Messagenum, setMessageNum] = useState(0)
  useEffect(() => {
    MessageController.countUnreadMessage().then((num) => {
      setMessageNum(num)
    }).catch((err) => {
      throw err
    })
  }, [])
  const [active, setActive] = useState([])
  useEffect(() => {
    ActiveController.getGenreActive(GenreName).then((res) => {
      setActive(res)
    }).catch((err) => {
      throw err
    })
  }, [])

  const [refreshing, setRefreshing] = useState(false)
  const onRefresh = () => {
    setRefreshing(true)
    ActiveController.getGenreActive(GenreName).then((res) => {
      setActive(res)
    }).catch((err) => {
      throw err
    })
    MessageController.countUnreadMessage().then((num) => {
      setMessageNum(num)
    }).catch((err) => {
      throw err
    })
    setRefreshing(false)
  }

  return (
    <Box safeArea style={styles.container}>
        <Box style={styles.headerContainer}>
          <Box style={styles.headerArrowBox}>
            <AntDesign
              name="arrowleft"
              size={28}
              color="#476685"
              onPress={() => { navigation.navigate('search') }}
            />
          </Box>
          <Box style={styles.nameheader}>
            <Text style={styles.name}>
              {GenreName}
            </Text>
          </Box>
          <Box style={styles.headerCommentView}>
            <HStack>
              <FontAwesome5
                name="comment"
                size={25}
                color="#476685"
                onPress={() => { navigation.navigate('message') }}
              />
              <Octicons name="dot-fill" size={16} color={Messagenum !== 0 ? '#EB6F6F' : 'transparent'} style={styles.readDot} />
            </HStack>
          </Box>
          <Box style={styles.headerPersonalView}>
            <Feather
              name="user"
              size={26}
              color="#476685"
              onPress={() => { navigation.navigate('personal') }}
            />
          </Box>
        </Box>
        <Box style={styles.bodyContainer}>
          <FlatList
            numColumns={2}
            data={active}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            refreshControl={(
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
              )}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => {
                  navigation.navigate('details', { Cd: item.id, prepage: 'more' })
                }}
              >
                <VStack style={styles.CardInMore}>
                  <Image
                    style={styles.pic}
                    source={{
                      uri: item.imageUri1
                    }}
                  />
                  <Title style={styles.CardTitle}>
                    {item.name}
                  </Title>
                  <Box style={styles.CardStartTime}>
                    <AntDesign
                      name="clockcircleo"
                      size={12}
                      color="rgba(40, 82, 122, 0.65)"
                    />
                    <Text style={styles.CardTimeText}>
                      {'   '}
                      {item.startTimeWeekday}
                    </Text>
                  </Box>
                  <Box style={styles.CardPlace}>
                    <Ionicons
                      name="location-outline"
                      size={15}
                      color="rgba(40, 82, 122, 0.65)"
                    />
                    <Text style={styles.cardPlaceText}>
                      {'  '}
                      {item.place}
                    </Text>
                  </Box>
                </VStack>
              </Pressable>
            )}
          />
        </Box>

    </Box>
  )
}

export default Genre
