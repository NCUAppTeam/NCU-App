import React from 'react'
import {
  ScrollView,
  Text,
  Box,
  Pressable,
  HStack,
  Icon,
  VStack,
  ZStack,
  Center
} from 'native-base'
import { Ionicons, FontAwesome } from '@expo/vector-icons';

function First({ navigation }) {
  const busLst = [
    {
      nameZH_TW: '中央-中壢火車站',
      name: 'toZhongli',
      availableBusList: ['132', '133']
    },
    {
      nameZH_TW: '中央-桃園高鐵站',
      name: 'toHSR',
      availableBusList: ['172', '173']
    },
    {
      nameZH_TW: '9025A',
      name: '9025A'
    },
    {
      nameZH_TW: '台聯大專車',
      name: 'UST'
    }
  ]
  const NavigationBar = () => (
    <ZStack width="100%" height="12%" bg="primary.600">
      <Center width="100%" height="100%">
        <Text fontSize="xl" color="white">公車動態</Text>
      </Center>

      <Box width="50px" height="100%" ml="15px">
        <Pressable height="100%" onPress={navigation.goBack} flex={1} justifyContent="center">
          <Icon size={18} color="white" name='chevron-left' as={FontAwesome} />
        </Pressable>
      </Box>


    </ZStack>
  )
  return (
    <Box safeArea>
      <NavigationBar />
      <ScrollView height="100%">

        <Box>
          {busLst.map((busInfo, index) => {
            console.log(busInfo)
            return (

              <Pressable
                onPress={() => navigation.navigate('BusDetailView', busInfo)}
              >
                <HStack height="100px" m={2} alignItems="center" bg="gray.200">
                  <Icon as={Ionicons} name="bus-outline" mx={5} size="9" color="primary.600" />

                  <VStack>
                    <Box>
                      <Text>
                        {busInfo.nameZH_TW}
                      </Text>
                    </Box>
                    {'availableBusList' in busInfo &&
                      <Box>
                        <HStack>
                          {busInfo.availableBusList.map((busName, index) => {
                            const firstBusColor = 'secondary.600'
                            const secondBusColor = 'secondary.100'
                            const busColor = (index === 0 ? firstBusColor : secondBusColor)
                            return (
                              <Box
                                alignSelf="flex-start"
                                _text={{
                                  fontSize: 'md',
                                  fontWeight: 'medium',
                                  color: 'warmGray.50',
                                  letterSpacing: 'lg'
                                }}
                                bg={busColor}
                                px="2px"
                              >
                                {busName}
                              </Box>)
                          })
                          }
                        </HStack>
                      </Box>}
                  </VStack>
                </HStack>
              </Pressable>

            )
          })}
        </Box>
      </ScrollView>
    </Box>
  )
}

export default First
