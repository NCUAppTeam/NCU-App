import React, { useState, useEffect } from 'react'
import {
  Box,
  ZStack,
  VStack,
  Text,
  HStack,
  Checkbox,
  WarningOutlineIcon,
  Pressable,
  Center,
  ScrollView,
  StatusBar,
  Circle,
  Container
} from 'native-base'
import { TabView } from 'react-native-tab-view'
import BusController from '../../../controller/Bus'
import BusDetailViewCell from './BusDetailViewCell'

const testData = [
  {
    alert: 0,
    type: 0, // 0 合併, 1 分岔
    pass: ['132', '133'],
    bus: [ // 最近五班車
      {
        name: '133',
        time: '14:00'
      },
      {
        name: '132',
        time: '15:00'
      }
    ],
    stop: '中壢公車站'
  },
  {
    alert: 0,
    type: 0,
    pass: ['132', '133'],
    bus: [ // 進五班車
      {
        name: '133',
        time: '14:00'
      },
      {
        name: '132',
        time: '15:00'
      }
    ],
    stop: '第一銀行'
  },
  {
    alert: 0,
    type: 1,
    pass: ['132'],
    bus: [ // 進五班車
      {
        name: '132',
        time: '15:00'
      }
    ],
    stop: '第一市場'
  },
  {
    alert: 0,
    type: 1,
    pass: ['132'],
    bus: [ // 進五班車
      {
        name: '132',
        time: '15:00'
      }
    ],
    stop: '舊社'
  },
  {
    alert: 0,
    type: 1,
    pass: ['133'],
    bus: [ // 進五班車
      {
        name: '133',
        time: '15:00'
      }
    ],
    stop: '新明國中(民族路)'
  },
  {
    alert: 0,
    type: 0,
    pass: ['132', '133'],
    bus: [ // 進五班車
      {
        name: '133',
        time: '14:00'
      },
      {
        name: '132',
        time: '15:00'
      }
    ],
    stop: '廣興'
  },
  {
    alert: 0,
    type: 0,
    pass: ['132', '133'],
    bus: [ // 進五班車
      {
        name: '133',
        time: '14:00'
      },
      {
        name: '132',
        time: '15:00'
      }
    ],
    stop: '仁愛新村'
  }
]

function BusSelector ({
  navigation,
  availableBusList,
  selectedBusList,
  setSelectedBusList
}) {
  return (
    <HStack>
      <Box width="80%" alignItems="center">
        <Checkbox.Group
          width="100%"
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          mt="2"
          px="25%"
          colorScheme="gray"
          defaultValue={availableBusList}
          accessibilityLabel="choose multiple items"
          onChange={(values) => {
            setSelectedBusList(values || [])
          }}
        >
          {availableBusList.map((busName) => (
            <Checkbox value={busName} m="1">
              {busName}
            </Checkbox>
          ))}
        </Checkbox.Group>
        {selectedBusList.length === 0 && (
          <HStack space={2}>
            <WarningOutlineIcon size="xs" mt={1} color="red" />
            <Text color="red">請選擇公車班次</Text>
          </HStack>
        )}
      </Box>

      <Pressable
        onPress={() => {
          // navigation.navigate("BusTimeTable");
        }}
      >
        <Center flex={1} bg="#FFE66F">
          <Text>發車時刻表</Text>
        </Center>
      </Pressable>
    </HStack>
  )
}

function TimeTableRoute ({ direction, selectedBusList, availableBusList }) {
  const [data, setData] = useState(testData) // useState([{}])
  // const [refreshing, setRefreshing] = useState(true);
  const onRefresh = () => {
    BusController({ buses: selectedBusList, dir: direction }).then((res) => {
      setData(testData) // using testData
    })
  }
  useEffect(() => {
    onRefresh()
    const id = setInterval(onRefresh, 10000)
    return () => {
      clearInterval(id)
    }
  }, [selectedBusList])

  return (
    <ScrollView width="100%" height="100%">
      <Center flex={1}>
        <VStack width="100%" flex={1}>
          {data.map((item, index) => {
            return <BusDetailViewCell item={item} index={index} data={data} selectedBusList={selectedBusList} availableBusList={availableBusList}/>
          })}
        </VStack>
      </Center>
    </ScrollView>
  )
}

const renderScene = ({ route }, selectedBusList, availableBusList) => {
  switch (route.key) {
    case 'first':
      return <TimeTableRoute direction={1} selectedBusList={selectedBusList} availableBusList={availableBusList}/>
    case 'second':
      return <TimeTableRoute direction={0} selectedBusList={selectedBusList} availableBusList={availableBusList}/>
    default:
      return null
  }
}
const renderTabBar = (props, index, setIndex) => {
  const inputRange = props.navigationState.routes.map((x, i) => i)
  return (
    <Box flexDirection="row">
      {props.navigationState.routes.map((route, i) => {
        const borderColor = index === i ? '#476685' : 'coolGray.200'
        return (
          <Box
            borderBottomWidth="3"
            borderColor={borderColor}
            flex={1}
            alignItems="center"
            p="3"
            cursor="pointer"
          >
            <Pressable
              onPress={() => {
                setIndex(i)
              }}
            >
              <Text>{route.title}</Text>
            </Pressable>
          </Box>
        )
      })}
    </Box>
  )
}

function BusTimeTableTabView ({ navigation, routeInfo }) {
  let availableBusList = []
  if (routeInfo.name === 'toZhongli') availableBusList = ['132', '133']
  else if (routeInfo.name === 'toHSR') availableBusList = ['172', '173']
  else availableBusList = [routeInfo.name]

  const [selectedBusList, setSelectedBusList] =
    React.useState(availableBusList)
  const [index, setIndex] = React.useState(0) // TabBar index (can't change valuable name)
  const destination = {
    route0: '往中央大學',
    route1: ''
  }
  switch (routeInfo.name) {
    case 'toZhongli':
      destination.route1 = '往中壢公車站'
      break
    case 'toHSR':
      destination.route1 = '往桃園高鐵站'
      break
    case '9025A':
      destination.route1 = '松山機場'
      break
    default:
      destination.route1 = 'unknown'
  }
  const [routes] = React.useState([
    {
      key: 'first',
      title: destination.route0
    },
    {
      key: 'second',
      title: destination.route1
    }
  ])

  return (
    <Box flex={1}>
      <ZStack h="50px" bg="#476685">
        <Box width="100%" alignItems="center">
          <Text fontSize="3xl" color="white">
            {routeInfo.nameZH_TW}
          </Text>
        </Box>
      </ZStack>
      <BusSelector
        navigation={navigation}
        availableBusList={availableBusList}
        selectedBusList={selectedBusList}
        setSelectedBusList={setSelectedBusList}
      />
      <TabView
        navigationState={{ index, routes }}
        renderScene={(props) => renderScene(props, selectedBusList, availableBusList)}
        renderTabBar={(props) => renderTabBar(props, index, setIndex)}
        onIndexChange={setIndex}
        style={{ marginTop: StatusBar.currentHeight }}
      />
    </Box>
  )
}

export default function ({ route, navigation }) {
  return (
    <Box flex={1} safeArea>
      <BusTimeTableTabView navigation={navigation} routeInfo={route.params} />
    </Box>
  )
}
