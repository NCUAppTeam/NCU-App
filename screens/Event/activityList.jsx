import React, { useState, useEffect } from 'react'
import { RefreshControl, Dimensions } from 'react-native'
import { Title, Card } from 'react-native-paper'
import { Ionicons, AntDesign } from '@expo/vector-icons'
import {
  Box,
  Divider,
  HStack,
  Text,
  VStack,
  Button,
  Pressable,
  ScrollView,
  Image
} from 'native-base'
import styles from './style_folder/Styles_activityList'
import ActiveController from '../../controller/Active'
import { SearchHeader } from './components/SearchHeader'

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
      width="180px"
      height="100%"
      mx={2}
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

function List ({ navigation }) {
  const [active1, setActive1] = useState([])
  const [active2, setActive2] = useState([])
  const [refreshing, setRefreshing] = useState(false)
  const onRefresh = () => {
    setRefreshing(true)
    ActiveController.getHangOutActive()
      .then((res) => {
        setActive1(res)
      })
      .then()
      .catch((err) => {
        throw err
      })
    ActiveController.getEventActive()
      .then((res) => {
        setActive2(res)
      })
      .catch((err) => {
        throw err
      })
    setRefreshing(false)
  }

  useEffect(() => {
    const focusHandler = navigation.addListener('focus', () => {
      onRefresh()
    })
    return focusHandler
  }, [navigation])
  return (
    <Box style={styles.container} safeArea>
      <SearchHeader navigation={navigation} />

      <Box style={styles.body}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <VStack>
            <VStack mx={4} my={2}>
              <HStack style={{ flexDirection: 'row' }}>
                <Text flex={10} fontSize="xl" bold color="primary.600">
                  近期揪人
                </Text>
                <Pressable
                  flexDirection="column-reverse"
                  onPress={() => {
                    navigation.navigate('moreHang')
                  }}
                >
                  <Text fontSize="md" color="primary.600">
                    顯示更多
                  </Text>
                </Pressable>
              </HStack>
              <Divider
                width="100%"
                bg="#BFBFBF" /* my=margin-top and margin-bottom */
              />
            </VStack>
            <Box>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <Box
                  m={2}
                  pb={4}
                  style={{
                    flexDirection: 'row'
                  }}
                >
                  {active1.map(
                    ({ id, name, imageUri1, place, startTimeWeekday }) => (
                      <ActivityCard
                        key={id}
                        id={id}
                        name={name}
                        imageUri1={imageUri1}
                        place={place}
                        startTimeWeekday={startTimeWeekday}
                        navigation={navigation}
                      />
                    )
                  )}
                </Box>
              </ScrollView>
            </Box>
          </VStack>
          <VStack>
            <VStack mx={4} my={2}>
              <HStack style={{ flexDirection: 'row' }}>
                <Text flex={10} fontSize="xl" bold color="primary.600">
                  近期活動
                </Text>
                <Pressable
                  flexDirection="column-reverse"
                  onPress={() => {
                    navigation.navigate('more')
                  }}
                >
                  <Text fontSize="md" color="primary.600">
                    顯示更多
                  </Text>
                </Pressable>
              </HStack>
              <Divider
                width="100%"
                bg="#BFBFBF" /* my=margin-top and margin-bottom */
              />
            </VStack>
            <Box>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <Box
                  m={2}
                  pb={4}
                  style={{
                    flexDirection: 'row'
                  }}
                >
                  {active2.map(
                    ({ id, name, imageUri1, place, startTimeWeekday }) => (
                      <ActivityCard
                        key={id}
                        id={id}
                        name={name}
                        imageUri1={imageUri1}
                        place={place}
                        startTimeWeekday={startTimeWeekday}
                        navigation={navigation}
                      />
                    )
                  )}
                </Box>
              </ScrollView>
            </Box>
          </VStack>
        </ScrollView>
      </Box>
    </Box>
  )
}

export default List
