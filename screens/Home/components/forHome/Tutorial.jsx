import React from 'react'
import { Box, FlatList, Text, Image, HStack, Heading, Stack, Center, ScrollView, Link } from 'native-base'
import ActiveController from '../../../../controller/Active'

export function Tutorial ({ card }) {
  return (
    <Box borderRadius={10} borderColor='#E5EBF1'>
      <Box marginBottom={2}>
          <Text fontSize="lg" bold>NCU-APP Corner 公告版</Text>
      </Box>
        <FlatList
          nestedScrollEnabled
          horizontal
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={card}
          keyExtractor={item => item.id}
          renderItem={({
            item
          }) => (
            <Box alignItems="center" p={2}>
              <Box rounded="lg" borderColor="coolGray.200" borderWidth="1">
                <Box style={{ aspectRatio: 1 }}>
                    <Image
                      style={{
                        width: 200,
                        height: 200,
                        borderRadius: 10
                      }}
                      source={{
                        uri: item.img
                      }} alt="image" />
                  <Center bg="cyan.800" _dark={{
                    bg: 'violet.400'
                  }} _text={{
                    color: 'warmGray.50',
                    fontWeight: '700',
                    fontSize: 'xs'
                  }} position="absolute" bottom="0" px="3" py="1.5">
                    {item.type}
                  </Center>
                </Box>
                <Stack pt="2" px="2" space={3}>
                  <Stack h={150} w={200} space={2}>
                    <Text fontSize="xs" color="coolGray.600" _dark={{
                      color: 'warmGray.200'
                    }} fontWeight="400">
                      updated at {`${ActiveController.toDateString(item.upload.toDate())}`}
                    </Text>
                    <Heading size="md" ml="-1">
                      {item.title}
                    </Heading>
                    <Text w={200} fontWeight="400">
                      {item.content}
                    </Text>
                    </Stack>

                  <HStack alignItems="center" space={4} justifyContent="flex-end">
                      <Link href={item.link} fontSize="xs" color="coolGray.600" _dark={{
                        color: 'warmGray.200'
                      }} fontWeight="400">
                          查看更多
                      </Link>
                  </HStack>
                </Stack>
              </Box>
            </Box>
          )}
        />

    </Box>
  )
}

export default { Tutorial }
