import React from "react";
import { Box, ZStack, VStack, Text, HStack, Center, Circle } from "native-base";

function SingleRouteCell({ item, index, data, selectedBusList, availableBusList }) {
  const firstBusColor = "secondary.600";
  const secondBusColor = "secondary.100";
  const busColor = (item.bus[0].name === availableBusList[0] ? firstBusColor : secondBusColor);
  const renderLine = (item) => {
    let lineList = [];
    // upper line
    if (index !== 0) {
      lineList.push(
        <Box
          bg={busColor}
          maxW="4px"
          height="32px"
          width="4px"
        ></Box>
      );
    }
    // down line
    if (index !== data.length - 1) {
      lineList.push(
        <Box
          bg={busColor}
          mt="32px"
          maxW="4px"
          height="32px"
          width="4px"
        ></Box>
      );
    }
    return lineList;
  };

  return (
    <Box bg="white" height="64px" width="100%">
      <HStack height="100%" width="100%">
        <ZStack width="23%" height="100%" mx="5px">
          <ZStack width="100%" height="100%" alignItems="center">
            {renderLine(item)}
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
        <VStack mt="16px" width="40%" height="100%">
          {item.type === 0 ? (
            <Text bold>{item.stop}</Text>
          ) : (
            <Text color="gray.500">{item.stop}</Text>
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
            {item.bus[0].name}
          </Box>
        </VStack>
        <Center m={2}>
          <Text>{item.bus[0].time}</Text>
        </Center>
      </HStack>
    </Box>
  );
}

function DoubleRouteCell({ item, index, data, selectedBusList, availableBusList }) {
  const firstBusColor = "secondary.600";
  const secondBusColor = "secondary.100";
  const busColor = (item.bus[0].name === availableBusList[0] ? firstBusColor : secondBusColor);
  // console.log(selectedBusList);
  const renderLine = (item) => {
    let lineList = [];
    if (item.type !== 0) {
      return (
        <Box
          bg="secondary.600"
          maxW="4px"
          height="64px"
          width="4px"
          mr="29px" // 要把線的寬度的一半算進去
        ></Box>
      );
    }
    // upper line
    if (index !== 0 && data[index - 1].type !== 0) {
      lineList.push(
        <Box
          bg="secondary.600"
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
    } else if (index !== 0) {
      lineList.push(
        <Box
          bg="secondary.600"
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
    if (index !== data.length - 1 && data[index + 1].type !== 0) {
      lineList.push(
        <Box
          bg="secondary.600"
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
    } else if (index !== data.length - 1) {
      lineList.push(
        <Box
          bg="secondary.600"
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

  const renderLine2 = (item) => {
    let lineList = [];
    if (item.type !== 0) {
      return (
        <Box width="100%">
          <Box
            bg="secondary.100"
            maxW="4px"
            height="64px"
            width="4px"
            ml="29px" // 要把線的寬度的一半算進去
          ></Box>
        </Box>
      );
    }
    // upper line
    if (index !== 0 && data[index - 1].type !== 0) {
      lineList.push(
        <Box
          bg="secondary.100"
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
    } else if (index !== 0) {
      lineList.push(
        <Box bg="secondary.100" maxW="4px" height="32px" width="4px"></Box>
      );
    }
    // down line
    if (index !== data.length - 1 && data[index + 1].type !== 0) {
      lineList.push(
        <Box
          bg="secondary.100"
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
    } else if (index !== data.length - 1) {
      lineList.push(
        <Box
          bg="secondary.100"
          mt="32px"
          maxW="4px"
          height="32px"
          width="4px"
        ></Box>
      );
    }
    return lineList;
  };

  return (
    <Box bg="white" height="64px" width="100%">
      <HStack height="100%" width="100%">
        <ZStack width="23%" height="100%" mx="5px">
          <HStack height="100%" width="100%">
            <ZStack
              width="50%"
              height="100%"
              display="flex"
              flexDirection="row-reverse"
              alignItems="center"
            >
              {renderLine(item)}
              {item.type === 1 && item.pass.indexOf(selectedBusList[0]) !== -1 && (
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
              {renderLine2(item)}
              <Box height="100%" justifyContent="center" ml="11px">
                {item.type === 1 && item.pass.indexOf(selectedBusList[1]) !== -1 && (
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
            {item.type === 0 && (
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
        <VStack mt="16px" width="40%" height="100%">
          {item.type === 0 ? (
            <Text bold>{item.stop}</Text>
          ) : (
            <Text color="gray.500">{item.stop}</Text>
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
            {item.bus[0].name}
          </Box>
        </VStack>
        <Center m={2}>
          <Text>{item.bus[0].time}</Text>
        </Center>
      </HStack>
    </Box>
  );
}

export default function BusDetailViewCell({ item, index, data, selectedBusList, availableBusList }) {
  availableBusList.sort();
  if (selectedBusList.length == 0) {

  }
  else if (selectedBusList.length == 1) {
    return (
      <SingleRouteCell
        item={item}
        index={index}
        data={data}
        selectedBusList={selectedBusList}
        availableBusList={availableBusList}
      />
    );
  } else {
    return (
      <DoubleRouteCell
        item={item}
        index={index}
        data={data}
        selectedBusList={selectedBusList}
        availableBusList={availableBusList}
      />
    );
  }
}
