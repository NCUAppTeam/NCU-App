import React from "react";
import { Box, ZStack, VStack, Text, HStack, Center, Circle } from "native-base";

function SingleRouteCell(props) {
  const firstBusColor = "secondary.600";
  const secondBusColor = "secondary.100";
  const busColor = (props.currentStation.bus[0].name === props.availableBusList[0] ? firstBusColor : secondBusColor);

  const RouteGraph = () => (
    <ZStack width="23%" height="100%" mx="5px">
      <ZStack width="100%" height="100%" alignItems="center">
        {!props.isFirstStation && (<Box
          bg={busColor}
          height="32px"
          width="4px"
        ></Box>)}
        {!props.isLastStation && (<Box
          bg={busColor}
          mt="32px"
          height="32px"
          width="4px"
        ></Box>)}
      </ZStack>

      <Center width="100%" height="100%">
        <Box
          width="20px"
          height="20px"
          borderRadius="10px"
          borderWidth="2px"
          bg="white"
        ></Box>
      </Center>
    </ZStack>
  )

  return (
    <Box bg="white" height="64px" width="100%">
      <HStack height="100%" width="100%">
        <RouteGraph />
        <VStack mt="16px" width="40%" height="100%">
          {props.currentStation.isCombined === 0 ? (
            <Text bold>{props.currentStation.stop}</Text>
          ) : (
            <Text color="gray.500">{props.currentStation.stop}</Text>
          )}

          <Box
            alignSelf="flex-start"
            _text={{
              fontSize: "md",
              fontWeight: "medium",
              color: "warmGray.50",
              letterSpacing: "lg",
            }}
            bg={busColor}
            px="2px"
          >
            {props.currentStation.bus[0].name}
          </Box>
        </VStack>
        <Center m={2}>
          <Text>{props.currentStation.bus[0].time}</Text>
        </Center>
      </HStack>
    </Box>
  );
}

function DoubleRouteCell(props) {
  const firstBusColor = "accent1.600";
  const secondBusColor = "accent2.600";
  const busColor = (props.currentStation.bus[0].name === props.availableBusList[0] ? firstBusColor : secondBusColor);
  const renderLine = () => {
    let lineList = [];
    if (props.currentStation.isCombined !== 0) {
      return (
        <Box
          bg={firstBusColor}
          maxW="4px"
          height="64px"
          width="4px"
          mr="29px" // 要把線的寬度的一半算進去
        ></Box>
      );
    }
    // upper line
    if (props.isPrevCombined) {
      lineList.push(
        <Box
          bg={firstBusColor}
          height="46px"
          width="4px"
          style={{
            transform: [
              { translateX: -14 },
              { translateY: -16 },
              { rotate: "-45deg" },
            ],
          }}
        ></Box>
      );
    } else if (!props.isFirstStation) {
      lineList.push(
        <Box
          bg={firstBusColor}
          maxW="4px"
          height="32px"
          width="4px"
          style={{
            transform: [{ translateY: -16 }],
          }}
        ></Box>
      );
    }
    // down line
    if (props.isNextCombined) {
      lineList.push(
        <Box
          bg={firstBusColor}
          height="46px"
          width="4px"
          style={{
            transform: [
              { translateX: -14 },
              { translateY: 16 },
              { rotate: "45deg" },
            ],
          }}
        ></Box>
      );
    } else if (!props.isLastStation) {
      lineList.push(
        <Box
          bg={firstBusColor}
          mt="32px"
          maxW="4px"
          height="32px"
          width="4px"
          style={{
            transform: [{ translateY: 16 }],
          }}
        ></Box>
      );
    }
    return lineList;
  };

  const renderLine2 = () => {
    let lineList = [];
    if (props.currentStation.isCombined) {
      return (
        <Box width="100%">
          <Box
            bg={secondBusColor}
            height="64px"
            width="4px"
            ml="29px" // 要把線的寬度的一半算進去
          ></Box>
        </Box>
      );
    }
    // upper line
    if (props.isPrevCombined) {
      lineList.push(
        <Box
          bg={secondBusColor}
          height="46px"
          width="4px"
          style={{
            transform: [
              { translateX: 14 },
              { translateY: -7 },
              { rotate: "45deg" },
            ],
          }}
        ></Box>
      );
    } else if (!props.isFirstStation) {
      lineList.push(
        <Box bg={secondBusColor} maxW="4px" height="32px" width="4px"></Box>
      );
    }
    // down line
    if (props.isNextCombined) {
      lineList.push(
        <Box
          bg={secondBusColor}
          height="46px"
          width="4px"
          style={{
            transform: [
              { translateX: 14 },
              { translateY: 25 },
              { rotate: "-45deg" },
            ],
          }}
        ></Box>
      );
    } else if (!props.isLastStation) {
      lineList.push(
        <Box
          bg={secondBusColor}
          mt="32px"
          maxW="4px"
          height="32px"
          width="4px"
        ></Box>
      );
    }
    return lineList;
  };

  const RouteGraph = () => (
    <ZStack width="23%" height="100%" mx="5px">
          <HStack height="100%" width="100%">
            <ZStack
              width="50%"
              height="100%"
              display="flex"
              flexDirection="row-reverse"
              alignItems="center"
            >
              {renderLine()}
              {props.currentStation.isCombined === 1 && props.currentStation.pass.indexOf(props.selectedBusList[0]) !== -1 && (
                <Box
                  width="20px"
                  height="20px"
                  borderRadius="10px"
                  borderWidth="2px"
                  bg="white"
                  mr="31px"
                  style={{
                    transform: [{ translateX: 10 }],
                  }}
                ></Box>
              )}
            </ZStack>
            <ZStack width="50%" height="100%">
              {renderLine2()}
              <Box height="100%" justifyContent="center" ml="11px">
                {props.currentStation.isCombined === 1 && props.currentStation.pass.indexOf(props.selectedBusList[1]) !== -1 && (
                  <Box
                    width="20px"
                    height="20px"
                    borderRadius="10px"
                    borderWidth="2px"
                    bg="white"
                    style={{
                      transform: [{ translateX: 10 }],
                    }}
                  ></Box>
                )}
              </Box>
            </ZStack>
          </HStack>
          <Center width="100%" height="100%">
            {props.currentStation.isCombined === 0 && (
              <Box
                width="20px"
                height="20px"
                borderRadius="10px"
                borderWidth="2px"
                bg="white"
              ></Box>
            )}
          </Center>
        </ZStack>
  )

  return (
    <Box bg="white" height="64px" width="100%">
      <HStack height="100%" width="100%">
        <RouteGraph/>
        <VStack mt="16px" width="40%" height="100%">
          {props.currentStation.isCombined === 0 
          ? <Text bold>{props.currentStation.stop}</Text>
          : <Text color="gray.500">{props.currentStation.stop}</Text>
          }
          <Box
            alignSelf="flex-start"
            _text={{
              fontSize: "md",
              fontWeight: "medium",
              color: "warmGray.50",
              letterSpacing: "lg",
            }}
            bg={busColor}
            px="2px"
          >
            {props.currentStation.bus[0].name}
          </Box>
        </VStack>
        <Center m={2}>
          <Text>{props.currentStation.bus[0].time}</Text>
        </Center>
      </HStack>
    </Box>
  );
}
export default function BusDetailViewCell(props) {
  props.availableBusList.sort();
  console.log("rerendering");
  if (props.selectedBusList.length == 0) {

  }
  else if (props.selectedBusList.length == 1) {
    return (
      <SingleRouteCell
        currentStation={props.currentStation}
        isFirstStation={props.isFirstStation}
        isLastStation={props.isLastStation}
        availableBusList={props.availableBusList}
        selectedBusList={props.selectedBusList}
      />
    );
  } else {
    return (
      <DoubleRouteCell
        currentStation={props.currentStation}
        isFirstStation={props.isFirstStation}
        isLastStation={props.isLastStation}
        isPrevCombined={props.isPrevCombined}
        isNextCombined={props.isNextCombined}
        availableBusList={props.availableBusList}
        selectedBusList={props.selectedBusList}
      />
    );
  }
}
