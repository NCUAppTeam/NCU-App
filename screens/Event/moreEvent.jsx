import React, { useState, useEffect } from 'react'
import {
  RefreshControl, Image
} from 'react-native'
import {
  FontAwesome5, AntDesign, Feather, Octicons
} from '@expo/vector-icons'
import {
  Divider, Box, FlatList, VStack, Pressable, HStack, Text, ZStack
} from 'native-base'
import styles from './style_folder/Styles_moreEvent'
import ActiveController from '../../controller/Active'
import MessageController from '../../controller/Message'

function ActivityCard (props) {
  const key = props.id
  const id = props.id
  const name = props.name
  const imageUri1 = props.imageUri1
  const place = props.place
  const startTimeWeekday = props.startTimeWeekday
  const navigation = props.navigation

  return (
    <Pressable
      border="1"
      borderRadius="md"
      key={key}
      width="45%"
      height="96%"
      mx={2}
      my={2}
      bg="white"
      shadow="2"
      onPress={() => {
        navigation.navigate('details', { Cd: id, prepage: 'list' })
      }}
    >
      <VStack divider={<Divider />}>
        <Image
          alt="eventPic"
          style={styles.pic}
          source={{
            uri: imageUri1
          }}
        />
        <VStack p={2}>
          <Text fontSize="xs" bold color="gray.600">
            {startTimeWeekday}
          </Text>
          <Text fontSize="md" bold color="primary.600">
            {name}
          </Text>
        </VStack>
      </VStack>
    </Pressable>
  )
}

function More ({ navigation, route }) {
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
    ActiveController.getEventActive().then((res) => {
      setActive(res)
    }).catch((err) => {
      throw err
    })
  }, [])

  const [refreshing, setRefreshing] = useState(false)
  const onRefresh = () => {
    setRefreshing(true)
    ActiveController.getEventActive().then((res) => {
      setActive(res)
    })
    MessageController.countUnreadMessage().then((num) => {
      setMessageNum(num)
    }).catch((err) => {
      throw err
    })
    setRefreshing(false)
  }

  return (
    <Box flex="1" style={styles.container} safeArea>
        <Box style={styles.headerContainer}>
          <Box style={styles.headerArrowBox}>
            <AntDesign
              name="arrowleft"
              size={28}
              color="#476685"
              onPress={() => { navigation.navigate('list') }}
            />
          </Box>
          <Box style={styles.nameheader}>
            <Text style={styles.name}>
              近期活動
            </Text>
          </Box>
          <Box style={styles.headerCommentView}>
            <ZStack size={25} ml={3} alignItems="center" justifyContent="center">
              <Box>
                <Octicons
                  name="dot-fill"
                  size={16}
                  color={Messagenum !== 0 ? '#EB6F6F' : 'transparent'}
                  style={{
                    transform: [{ translateX: 12 }, { translateY: -10 }]
                  }}
                />
              </Box>
              <Box>
                <FontAwesome5
                  name="comment"
                  size={25}
                  color="#476685"
                />
              </Box>
            </ZStack>
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
        <Box flex="1" style={styles.bodyContainer}>
          <FlatList
            numColumns={2}
            data={active}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            refreshControl={(
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
              )}
            renderItem={({ item }) => (
                  <ActivityCard
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    imageUri1={item.imageUri1}
                    place={item.place}
                    startTimeWeekday={item.startTimeWeekday}
                    navigation={navigation}
                  />
            )
            }
          />
        </Box>
    </Box>
  )
}

export default More
