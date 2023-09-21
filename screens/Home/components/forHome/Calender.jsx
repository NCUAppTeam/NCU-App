import React,{useEffect,useState} from 'react'
import { Box, Pressable, Text } from 'native-base'
import { WebView } from 'react-native-webview'
import homeController from '../../../../controller/Home'

export function Calendar ({ navigation }) {
  const [link, setLink] = useState()
  useEffect(() => {
    homeController.getCalender().then((res) => {
      setLink(res)
    })
  }, [])
  //
  return (
    <Box flex="1" h={400} borderRadius={10} borderColor='#E5EBF1' safeArea>
      <Box marginBottom="2">
          <Text fontSize="lg" bold>本週校曆</Text>
      </Box>
      <WebView
          source={{ uri: link }}
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
