import React from 'react'
import { Box, Pressable, Text } from 'native-base'
import { WebView } from 'react-native-webview'

export function Calendar ({ navigation }) {
  return (
    <Box w={375} h={300} borderRadius={10} borderColor='#E5EBF1' safeArea>
      <Box marginBottom="2">
          <Text fontSize="lg" bold>本週校曆</Text>
      </Box>
      <WebView
          source={{ uri: 'https://calendar.google.com/calendar/embed?src=ncu.acad@gmail.com&ctz=Asia/Taipei' }}
      />
      <Box>
        <Pressable
          alignItems="flex-end">
            <Box
              w={131}
                h={28}
                marginTop={2}
                borderWidth={1}
                borderRadius={50}
                borderColor="#E5EBF1"
                backgroundColor="#FAFAFA"
                >
                <Text fontSize="sm" textAlign="center" onPress={() => { navigation.navigate('BigCal') }}>顯示完整校曆</Text>
            </Box>
        </Pressable>
      </Box>
    </Box>
  )
}

export default { Calendar }
