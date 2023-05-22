import React, { useState, useEffect } from "react";
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
  Icon,
  Button,
  Circle,
  Container,
} from "native-base";
import { TabView } from "react-native-tab-view";
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import BusController from "../../../controller/Bus";
import BusDetailViewCell from "./BusDetailViewCell";

const testData = [
  {
    alert: 0,
    type: 0, // 0 合併, 1 分岔
    pass: ["132", "133"],
    bus: [
      // 最近五班車
      {
        name: "133",
        time: "14:00",
      },
      {
        name: "132",
        time: "15:00",
      },
    ],
    stop: "loading",
  },
];

function BusSelector({
  navigation,
  availableBusList,
  selectedBusList,
  setSelectedBusList,
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
            setSelectedBusList(values || []);
          }}
        >
          {availableBusList.map((busName, index) => {
            if (index === 0) {
              return (
                <Checkbox value={busName} m="1">
                  <Box
                    alignSelf="flex-start"
                    _text={{
                      fontSize: "md",
                      fontWeight: "medium",
                      color: "warmGray.50",
                      letterSpacing: "lg",
                    }}
                    bg="accent1.600"
                    px="2px"
                  >
                    {busName}
                  </Box>
                </Checkbox>
              );
            } else {
              return (
                <Checkbox value={busName} m="1">
                <Box
                    alignSelf="flex-start"
                    _text={{
                      fontSize: "md",
                      fontWeight: "medium",
                      color: "warmGray.50",
                      letterSpacing: "lg",
                    }}
                    bg="accent2.600"
                    px="2px"
                  >
                    {busName}
                  </Box>
                </Checkbox>
              );
            }
          })}
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
          navigation.navigate("BusTimeTable");
        }}
      >
        <Center flex={1} bg="#FFE66F">
          <Text>發車時刻表</Text>
        </Center>
      </Pressable>
    </HStack>
  );
}

function TimeTableRoute({ direction, selectedBusList, availableBusList }) {
  const [data, setData] = useState(testData); // useState([{}])
  // const [refreshing, setRefreshing] = useState(true);
  const [timerCount, setTimerCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimerCount((timerCount) => timerCount + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const onRefresh = () => {
    BusController({ buses: selectedBusList, dir: direction }).then((res) => {
      setData(res); // using testData
      setTimerCount(0);
      console.log("hahaha");
    });
  };
  useEffect(() => {
    onRefresh();
    const id = setInterval(onRefresh, 10000);
    return () => {
      clearInterval(id);
    };
  }, [selectedBusList]);

  return (
    <Box width="100%" height="100%">
      <ScrollView width="100%" height="94%">
        <Center flex={1}>
          <VStack width="100%" flex={1}>
            {data.map((item, index) => {
              const isFirstStation = (index===0)
              const isLastStation=(index===data.length-1)
              const isPrevCombined = (!isFirstStation && data[index].isCombined == false && data[index-1].isCombined == true)
              const isNextCombined = (!isLastStation && data[index].isCombined == false && data[index+1].isCombined == true)
              
              return (
                <BusDetailViewCell
                  currentStation={item}
                  isFirstStation={isFirstStation}
                  isLastStation={isLastStation}
                  isPrevCombined={isPrevCombined}
                  isNextCombined={isNextCombined}
                  availableBusList={availableBusList}
                  selectedBusList={selectedBusList}
                  key={index}
                />
              );
            })}
          </VStack>
        </Center>
      </ScrollView>
      <Box>
        <Text>{timerCount}秒前更新</Text>
      </Box>
    </Box>
  );
}

const renderScene = ({ route }, selectedBusList, availableBusList) => {
  switch (route.key) {
    case "first":
      return (
        <TimeTableRoute
          direction={1}
          selectedBusList={selectedBusList}
          availableBusList={availableBusList}
        />
      );
    case "second":
      return (
        <TimeTableRoute
          direction={0}
          selectedBusList={selectedBusList}
          availableBusList={availableBusList}
        />
      );
    default:
      return null;
  }
};
const renderTabBar = (props, index, setIndex) => {
  const inputRange = props.navigationState.routes.map((x, i) => i);
  return (
    <Box flexDirection="row">
      {props.navigationState.routes.map((route, i) => {
        const borderColor = index === i ? "#476685" : "coolGray.200";
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
                setIndex(i);
              }}
            >
              <Text>{route.title}</Text>
            </Pressable>
          </Box>
        );
      })}
    </Box>
  );
};

function BusTimeTableTabView({ navigation, routeInfo }) {
  let availableBusList = [];
  if (routeInfo.name === "toZhongli") availableBusList = ["132", "133"];
  else if (routeInfo.name === "toHSR") availableBusList = ["172", "173"];
  else availableBusList = [routeInfo.name];

  const [selectedBusList, setSelectedBusList] =
    React.useState(availableBusList);
  const [index, setIndex] = React.useState(0); // TabBar index (can't change valuable name)
  const destination = {
    route0: "往中央大學",
    route1: "",
  };
  switch (routeInfo.name) {
    case "toZhongli":
      destination.route1 = "往中壢公車站";
      break;
    case "toHSR":
      destination.route1 = "往桃園高鐵站";
      break;
    case "9025A":
      destination.route1 = "松山機場";
      break;
    default:
      destination.route1 = "unknown";
  }
  const [routes] = React.useState([
    {
      key: "first",
      title: destination.route0,
    },
    {
      key: "second",
      title: destination.route1,
    },
  ]);


  const NavigationBar = () => (
    <ZStack width="100%" height="12%" bg="primary.600">
      <Center width="100%" height="100%">
        <Text fontSize="xl" color="white"> {routeInfo.nameZH_TW}</Text>
      </Center>

      <Box width="50px" height="100%" ml="15px">
        <Pressable height="100%" onPress={navigation.goBack} flex={1} justifyContent="center">
          <Icon size={18} color="white" name='chevron-left' as={FontAwesome} />
        </Pressable>
      </Box>


    </ZStack>
  )

  return (
    <Box flex={1}>
      <NavigationBar/>
      <BusSelector
        navigation={navigation}
        availableBusList={availableBusList}
        selectedBusList={selectedBusList}
        setSelectedBusList={setSelectedBusList}
      />
      <TabView
        navigationState={{ index, routes }}
        renderScene={(props) =>
          renderScene(props, selectedBusList, availableBusList)
        }
        renderTabBar={(props) => renderTabBar(props, index, setIndex)}
        onIndexChange={setIndex}
        style={{ marginTop: StatusBar.currentHeight }}
      />
    </Box>
  );
}

export default function ({ route, navigation }) {
  return (
    <Box flex={1} safeArea>
      <BusTimeTableTabView navigation={navigation} routeInfo={route.params} />
    </Box>
  );
}
