import React, { useState, useEffect } from 'react'
import {
  View,
  SafeAreaView,
  Dimensions,
  Alert,
  Share
} from 'react-native'
import SvgQRCode from 'react-native-qrcode-svg'
import Dialog, { DialogContent } from 'react-native-popup-dialog'
import {
  Ionicons,
  FontAwesome5,
  AntDesign,
  MaterialCommunityIcons,
  Feather
} from '@expo/vector-icons'
import {
  Box,
  Divider,
  Center,
  HStack,
  VStack,
  NativeBaseProvider,
  ZStack,
  Pressable,
  Text,
  ScrollView,
  Image,
  Button
} from 'native-base'
import styles from './style_folder/Styles_showActivityDetails'
import ActiveController from '../../controller/Active'
import MessageController from '../../controller/Message'
import UserController from '../../controller/getStudentId'
import * as Linking from 'expo-linking'


const NavigationBar = (props) => (
  <ZStack width="100%" height="12%">
    <Center width="100%" height="100%">
      <Text fontSize="xl" color="primary.600">
        {props.gerne}
      </Text>
    </Center>

    <Box width="50px" height="100%" ml="15px">
      <Pressable
        height="100%"
        onPress={props.navigation.goBack}
        flex={1}
        justifyContent="center"
      >
        <AntDesign name="arrowleft" size={28} color="#476685" />
      </Pressable>
    </Box>
  </ZStack>
)

const Body = ({
  id,
  name,
  imageUri1,
  startTimeWeekday,
  endTimeWeekday,
  place,
  limitNum,
  cost,
  link,
  details,
  imageUri2,
  imageUri3,
  active,
  totalAttended
}) => {
  const [showDialog, setShowDialog] = useState(false)

  const [slideDot1, setSlideDot1] = useState(true)
  const [slideDot2, setSlideDot2] = useState(false)
  const [slideDot3, setSlideDot3] = useState(false)
  const whenScrolling = ({ nativeEvent }) => {
    const slide = Math.ceil(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
    )
    if (slide === 0) {
      setSlideDot1(true)
      setSlideDot2(false)
      setSlideDot3(false)
    } else if (slide === 1) {
      setSlideDot1(false)
      setSlideDot2(true)
      setSlideDot3(false)
    } else if (slide === 2) {
      setSlideDot1(false)
      setSlideDot2(false)
      setSlideDot3(true)
    }
  }

  console.log('startTimeWeekday', startTimeWeekday)
  let startTimeList = ['loading', 'loading', 'loading']
  if (startTimeWeekday) startTimeList = startTimeWeekday.split(' ')
  let endTimeList = ['loading', 'loading', 'loading']
  if (endTimeWeekday) endTimeList = endTimeWeekday.split(' ')

  // 開啟手機系統的分享選單
  const shareData = async () => {
    try {
      await Share.share({
        // 要分享的活動連結
        message: `ncu-app://activity/?id=${id}`
      })
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <Box>
      <ScrollView
        horizontal
        onScroll={whenScrolling}
        showsHorizontalScrollIndicator={false}
        style={{
          width: Dimensions.get('window').width / 2,
          alignSelf: 'center'
        }}
      >
        {imageUri1 && (
          <Image
            style={styles.bigpic}
            alt='event image 1'
            source={{
              uri: imageUri1
            }}
          />
        )}
        {imageUri2 && (
          <View
            style={
              imageUri3
                ? { marginLeft: 10 }
                : {
                    marginLeft: 10,
                    marginRight: Dimensions.get('window').width * 0.07
                  }
            }
          >
            <View>
              <Image
                style={styles.bigpic}
                alt='event image 2'
                source={{
                  uri: imageUri2
                }}
              />
            </View>
          </View>
        )}
        {imageUri3 && (
          <View style={{ marginLeft: 10 }}>
            <Image
              style={styles.bigpic}
              alt='event image 3'
              source={{
                uri: imageUri3
              }}
            />
          </View>
        )}
      </ScrollView>

      <Box
        style={{
          marginTop: 12,
          marginBottom: 18,
          justifyContent: 'center',
          flexDirection: 'row'
        }}
      >
        <MaterialCommunityIcons
          name="circle"
          size={5}
          style={
            slideDot1 === true ? styles.imageDotIsHere : styles.imageDotNoHere
          }
        />
        <MaterialCommunityIcons
          name="circle"
          size={5}
          style={
            slideDot2 === true ? styles.imageDotIsHere : styles.imageDotNoHere
          }
        />
        <MaterialCommunityIcons
          name="circle"
          size={5}
          style={
            slideDot3 === true ? styles.imageDotIsHere : styles.imageDotNoHere
          }
        />
      </Box>

      <VStack mx={4}>
        <HStack flex={1} mx={2}>
          <Text fontSize="3xl" color="primary.600" bold flex={9}>
            {name}
          </Text>
          <Box>
            <Ionicons
              name="share-social-outline"
              size={28}
              color="#476685"
              onPress={() => {
                setShowDialog(true)
              }}
            />

            <Dialog
              width={Dimensions.get('window').width * 0.8}
              height={370}
              visible={showDialog}
              onTouchOutside={() => {
                setShowDialog(false)
              }}
            >
              <DialogContent style={styles.shareBox}>
                <NativeBaseProvider>
                  <Box showsVerticalScrollIndicator={false} my={10}>
                      <Box>
                        <SvgQRCode value={active.id} />
                      </Box>
                      <Button mt={2} isExternal _text={{ fontSize: 20 }} onPress={() => {
                        shareData()
                      }}>
                      點我分享
                      </Button>
                  </Box>
                </NativeBaseProvider>
              </DialogContent>
            </Dialog>
          </Box>
        </HStack>
        <HStack my={3}>
          <Center mr={4} width={8}>
            <AntDesign name="clockcircleo" size={22} color="#476685" />
          </Center>
          {startTimeList[0] === endTimeList[0]
            ? (
            <VStack>
              <HStack>
                <Text bold>
                  {startTimeList[0]} {startTimeList[1]}
                </Text>
              </HStack>
              <HStack>
                <Text>
                  {startTimeList[2]} - {endTimeList[2]}
                </Text>
              </HStack>
            </VStack>
              )
            : (
            <VStack>
              <HStack>
                <Text bold>
                  {startTimeList[0]} {startTimeList[1]}
                </Text>
              </HStack>
              <HStack>
                <Text>
                  {startTimeList[2]} - {endTimeList[0]} {endTimeList[2]}
                </Text>
              </HStack>
            </VStack>
              )}
        </HStack>

        <HStack my={3}>
          <Center mr={4} width={8}>
            <Ionicons name="location-outline" size={28} color="#476685" />
          </Center>
          <Center>
            <Text>{place}</Text>
          </Center>
        </HStack>

        {link && (
          <Box>
            <HStack my={3}>
              <Center mr={4} width={8}>
                <MaterialCommunityIcons name="web" size={25} color="#476685" />
              </Center>
              <Center>
                <Text>{link}</Text>
              </Center>
            </HStack>
          </Box>
        )}

        <Divider />
        <HStack my={3}>
          <Box flex={1} alignItems="center">
            <HStack>
              <Center mr={4} width={8}>
                <Ionicons name="logo-usd" size={22} color="#476685" />
              </Center>
              <Center>
                <Text>{cost}</Text>
              </Center>
            </HStack>
          </Box>
          <Center>
            <Divider h={28} orientation="vertical" bg="#bfbebe" />
          </Center>
          <Box flex={1} alignItems="center">
            <HStack>
              <Center mr={4} width={8}>
                <Feather name="users" size={22} color="#476685" />
              </Center>
              <Center>
                {limitNum !== '0' && (
                  <Text
                    fontSize="md"
                    color={totalAttended >= limitNum ? 'red.400' : 'green.600'}
                    bold
                  >
                    {totalAttended} / {limitNum} 人
                  </Text>
                )}
                {limitNum === '0' && (
                  <Text fontSize="md" color="green.600">
                    {totalAttended} (無上限)
                  </Text>
                )}
              </Center>
            </HStack>
          </Box>
        </HStack>
        <Divider />
        <Box my={4} mx={2}>
          <Text my={2} fontSize="xl" bold>
            詳細資訊
          </Text>
          <Text>{details}</Text>
        </Box>
      </VStack>
    </Box>
  )
}

const HostDetail = ({
  uid,
  name,
  phone,
  email,
  avatar,
  userAvatar,
  active,
  navigation,
  SignUp,
  setSignUp,
  passedID
}) => {
  const user = UserController.getUid()
  return (
    <VStack mx={6} mb={10}>
      <Text my={2} fontSize="xl" bold>
        主辦人
      </Text>
      <HStack py={8}>
        <Center flex={1}>
          <Image
            width="72px"
            height="72px"
            borderRadius="36px"
            alt='host avatar'
            source={{
              uri: avatar
            }}
          />
        </Center>
        <VStack flex={1} space={3}>
          <HStack>
            <Feather name="user" size={20} color="#476685" />
            <Text mx={2} fontSize="sm">
              {name}
            </Text>
          </HStack>
          <HStack>
            <Feather name="phone" size={20} color="#476685" />
            <Text mx={2} fontSize="sm">
              {phone}
            </Text>
          </HStack>
          <HStack>
            <Feather name="mail" size={20} color="#476685" />
            <Text mx={2} fontSize="sm">
              {email}
            </Text>
          </HStack>
          <HStack>
            <FontAwesome5 name="comment" size={20} color="#476685" />

            <Text
              mx={2}
              fontSize="sm"
              underline
              onPress={() => {
                if (uid !== user) {
                  MessageController.addChatroom(uid, user).then((res) => {
                    navigation.navigate('send', {
                      userAvatar,
                      attendeeName: name,
                      attendeeAvatar: avatar,
                      chatroomId: res,
                      attendeeUid: uid,
                      userUid: user
                    })
                  })
                }
              }}
            >
              私訊主辦人
            </Text>
          </HStack>
        </VStack>
      </HStack>
      {user !== uid &&
        (Date.parse(active[0].endTimeInNum) > Date.now()
          ? (
          <Center>
            <Button
              width="130px"
              height="38px"
              borderRadius="30px"
              py="4px"
              bg="#476685"
              onPress={() => {
                if (!SignUp) {
                  Alert.alert(
                    '確認報名?',
                    '請盡可能確保能參加活動, 方便主辦方統計參與人數, 謝謝配合！',
                    [
                      { text: '我要反悔T~T' },
                      {
                        text: '確認報名',
                        onPress: () =>
                          ActiveController.signUp(passedID).then(() =>
                            setSignUp(true)
                          )
                      }
                    ]
                  )
                } else {
                  Alert.alert(
                    '確認取消報名?',
                    '如果時間上真的無法配合，那下次有機會再一起參加活動吧~~',
                    [
                      { text: '想想還是參加吧XD' },
                      {
                        text: '忍痛取消報名',
                        onPress: () =>
                          ActiveController.quitEvent(passedID).then(() =>
                            setSignUp(false)
                          )
                      }
                    ]
                  )
                }
              }}
            >
              <HStack space={2}>
                <Feather name="users" size={16} color="#FBEEAC" />
                <Text color="#FBEEAC" bold>
                  {SignUp ? '取消報名' : '報名候補'}
                </Text>
              </HStack>
            </Button>
          </Center>
            )
          : (
          <Center>
            <Button
              width="130px"
              height="38px"
              borderRadius="30px"
              py="4px"
              bg="#476685"
              isDisabled
            >
              <Text color="#FBEEAC" bold>
                報名時間已過
              </Text>
            </Button>
          </Center>
            ))}
    </VStack>
  )
}

function Detailscreen ({ route, navigation }) {
  const [totalAttended, setTotal] = useState()
  const [info, setInfo] = useState([])
  const [active, setActive] = useState([{}])
  const user = UserController.getUid()

  const [userAvatar, setUserAvatar] = useState()
  const Cd = route.params
  const passedID = JSON.stringify(Cd).slice(7, 27)

  const [SignUp, setSignUp] = useState()
  useEffect(() => {
    UserController.getINFO(user)
      .then((res) => {
        setUserAvatar(res.avatar)
      })
      .catch((err) => {
        throw err
      })
    ActiveController.getAttendedOrNot(passedID)
      .then((res) => {
        setSignUp(res)
      })
      .catch((err) => {
        throw err
      })
    ActiveController.getTotalOfAttendees(passedID)
      .then((res) => {
        setTotal(res)
      })
      .catch((err) => {
        throw err
      })
    ActiveController.getHostInfo(passedID)
      .then((res) => {
        setInfo(res)
      })
      .catch((err) => {
        throw err
      })
    ActiveController.getOneActive(passedID)
      .then((res) => {
        setActive(res)
      })
      .catch((err) => {
        throw err
      })
  }, [])

  return (
    <SafeAreaView style={styles.showActivityDetails_container}>
      <NavigationBar navigation={navigation} gerne={active[0].genre} />

      <ScrollView
        vertical
        showsVerticalScrollIndicator={false}
        style={{ flexDirection: 'column', marginTop: 8.5 }}
      >
        {active[0] && (
          <Body
            id={active[0].id}
            name={active[0].name}
            imageUri1={active[0].imageUri1}
            startTimeWeekday={active[0].startTimeWeekday}
            endTimeWeekday={active[0].endTimeWeekday}
            place={active[0].place}
            limitNum={active[0].limitNum}
            cost={active[0].cost}
            link={active[0].link}
            details={active[0].details}
            imageUri2={active[0].imageUri2}
            imageUri3={active[0].imageUri3}
            totalAttended={totalAttended}
            active={active}
          />
        )}

        {info[0] && (
          <HostDetail
            uid={info[0].uid}
            name={info[0].name}
            phone={info[0].phone}
            email={info[0].email}
            avatar={info[0].avatar}
            userAvatar={userAvatar}
            active={active}
            navigation={navigation}
            SignUp={SignUp}
            setSignUp={setSignUp}
            passedID={passedID}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

export default Detailscreen
