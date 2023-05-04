import React, { useState, useEffect } from "react";
import { Animated } from 'react-native'
import { Box, Container, FormControl, WarningOutlineIcon, FlatList, ZStack, Heading, Avatar, HStack, VStack, Text, Spacer, Center, Pressable, StatusBar, Checkbox, useColorModeValue, NativeBaseProvider } from "native-base";
import { TabView, SceneMap } from 'react-native-tab-view';
import BusController from '../../../controller/Bus';

const TimeTableRoute = ({ direction, busInfo }) => {
  const [data, setData] = useState([{}]);
  // const [refreshing, setRefreshing] = useState(true);

  const onRefresh = () => {
    BusController({ buses: busInfo, dir: direction }).then((res) => {
      setData(res);
    });
  };
  useEffect(() => {
    onRefresh();
    let id = setInterval(onRefresh, 10000);
    return () => {
      clearInterval(id);
    };
  }, [busInfo]);


  return <Center flex={1}>
    <FlatList width="100%" data={data} renderItem={(
      { item }
    ) => {
      return <Box borderBottomWidth="1" bg="white" borderColor="black" pl={["0", "4"]} pr={["0", "5"]} >
        <HStack>
          <Text style={{
            textAlign: 'center', width: '40%', fontSize: 20, textAlignVertical: 'center', lineHeight: 50,
          }}
          >
            {item.time}
          </Text>
          <Center m={2}>
            <Text>{item.bus}</Text>
          </Center>
          <Text style={{
            width: '50%', fontSize: 20, textAlignVertical: 'center', lineHeight: 50,
          }}
          >
            {item.stop}
          </Text>
        </HStack>
      </Box>
    }} />
  </Center>;
}

const renderScene = ({ route }, busInfo) => {
  // console.log(busInfo)

  switch (route.key) {
    case 'first':
      return <TimeTableRoute direction={1} busInfo={busInfo} />;
    case 'second':
      return <TimeTableRoute direction={0} busInfo={busInfo} />;
    default:
      return null;
  }
}



const Example = ({ navigation, routeInfo }) => {
  let busList = []
  if (routeInfo.name == 'toZhongli') busList = ['132', '133']
  else if (routeInfo.name == 'toHSR') busList = ['172', '173']
  else busList = [routeInfo.name]
  const [groupValues, setGroupValues] = React.useState(busList);

  const BusSelector = () => {
    return <HStack><Box width="80%" alignItems="center">

      <Checkbox.Group width="100%" display="flex" flexDirection="row" justifyContent="space-between" mt="2" px="25%" colorScheme="gray" defaultValue={groupValues} accessibilityLabel="choose multiple items" onChange={values => {
        setGroupValues(values || []);
      }}>
        {busList.map((busName) => {
          return <Checkbox value={busName} m="1">
            {busName}
          </Checkbox>
        })}
      </Checkbox.Group>
      {groupValues.length == 0 &&
        <HStack space={2}>
          <WarningOutlineIcon size="xs" mt={1} color="red" />
          <Text color="red">You must select at least three methods</Text>
        </HStack>}


    </Box>

      <Pressable
        onPress={() => { navigation.navigate('BusTimeTable'); }}
      >
        <Center flex={1}bg="#FFE66F">
          <Text>發車時刻表</Text>
        </Center>
      </Pressable>

    </HStack>;
  };

  console.log("routeInfo", routeInfo)
  let destination = {
    'route0': '往中央大學',
    'route1': ''
  }
  switch (routeInfo.name) {
    case 'toZhongli':
      destination.route1 = '往中壢公車站'
      break;
    case 'toHSR':
      destination.route1 = '往桃園高鐵站'
      break;
    case '9025A':
      destination.route1 = '松山機場'
    default:
      destination.route1 = 'unknown'
  }
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([{
    key: 'first',
    title: destination.route0
  }, {
    key: 'second',
    title: destination.route1
  }]);

  const renderTabBar = props => {
    const inputRange = props.navigationState.routes.map((x, i) => i);
    return <Box flexDirection="row">
      {props.navigationState.routes.map((route, i) => {
        const opacity = props.position.interpolate({
          inputRange,
          outputRange: inputRange.map(inputIndex => inputIndex === i ? 1 : 0.5)
        });
        const color = index === i ? '#476685' : '#000';
        const borderColor = index === i ? '#476685' : 'coolGray.200';
        return <Box borderBottomWidth="3" borderColor={borderColor} flex={1} alignItems="center" p="3" cursor="pointer">
          <Pressable onPress={() => {
            console.log(i);
            setIndex(i);
          }}>
            <Animated.Text style={{ color }}>
              {route.title}
            </Animated.Text>
          </Pressable>
        </Box>;
      })}
    </Box>;
  };


  return <Box flex={1}>
    <ZStack h="50px" bg='#476685'>
      <Box width="100%" alignItems="center">
        <Text fontSize="3xl" color="white">{routeInfo.nameZH_TW}</Text>
      </Box>

    </ZStack>
    <BusSelector />
    <TabView navigationState={{ index, routes }} renderScene={(props) => renderScene(props, groupValues)} renderTabBar={renderTabBar} onIndexChange={setIndex} style={{ marginTop: StatusBar.currentHeight }} />;
  </Box>;
};



export default ({ route, navigation }) => {
  return (
    <NativeBaseProvider>
      <Box flex={1} safeArea>
        <Example navigation={navigation} routeInfo={route.params} />
      </Box>
    </NativeBaseProvider>
  );
};
