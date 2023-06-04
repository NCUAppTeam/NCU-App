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
      key={id}
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
                <Text flex={10} fontSize="md" bold color="primary.600">
                  近期揪人
                </Text>
                <Pressable
                  flexDirection="column-reverse"
                  onPress={() => {
                    navigation.navigate('moreHang')
                  }}
                >
                  <Text fontSize="xs" color="primary.600">
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
                    // marginRight: Dimensions.get("window").width * 0.0694,
                    flexDirection: 'row'
                  }}
                >
                  {active1.map(
                    ({ id, name, imageUri1, place, startTimeWeekday }) => (
                      <ActivityCard
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
          <Box>
            <Box style={{ flex: 1 }}>
              <Box style={styles.more}>
                <Box style={{ width: '100%' }}>
                  <HStack style={{ flexDirection: 'row' }}>
                    <Text style={styles.title}>熱門活動</Text>
                    <Text
                      style={styles.showMore}
                      onPress={() => {
                        navigation.navigate('more')
                      }}
                    >
                      顯示更多
                    </Text>
                  </HStack>
                </Box>
                <Divider
                  style={{ marginTop: 5 }}
                  bg="#BFBFBF" /* my=margin-top and margin-bottom */
                />
              </Box>
              <Box style={styles.cardArea}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <Box
                    style={{
                      marginRight: Dimensions.get('window').width * 0.0694,
                      flexDirection: 'row'
                    }}
                  >
                    {active2.map(
                      ({ id, name, imageUri1, place, startTimeWeekday }) => (
                        <Card
                          key={id}
                          style={styles.Card}
                          onPress={() => {
                            navigation.navigate('details', {
                              Cd: id,
                              prepage: 'list'
                            })
                          }}
                        >
                          <Card.Content>
                            <Box
                              style={{ flexDirection: 'column', margin: -15 }}
                            >
                              <Box style={{ aspectRatio: 1 }}>
                                <Image
                                  alt="EventPic"
                                  style={styles.pic}
                                  source={{
                                    uri: imageUri1
                                  }}
                                />
                              </Box>
                              <Title style={styles.CardTitle}>{name}</Title>
                              <Box style={styles.CardDetails}>
                                <AntDesign
                                  name="clockcircleo"
                                  size={12}
                                  color="rgba(40, 82, 122, 0.65)"
                                  style={{
                                    alignSelf: 'center',
                                    marginLeft: 1
                                  }}
                                />
                                <Text style={styles.CardText}>
                                  {'  '}
                                  {startTimeWeekday}
                                </Text>
                              </Box>
                              <Box style={styles.CardDetails}>
                                <Ionicons
                                  name="location-outline"
                                  size={15}
                                  color="rgba(40, 82, 122, 0.65)"
                                  style={{ alignSelf: 'center' }}
                                />
                                <Text style={styles.CardText}> {place}</Text>
                              </Box>
                            </Box>
                          </Card.Content>
                        </Card>
                      )
                    )}
                  </Box>
                </ScrollView>
              </Box>
            </Box>
          </Box>
        </ScrollView>
      </Box>
    </Box>
  )
}

export default List
