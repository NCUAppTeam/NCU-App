import React,{useEffect,useState} from 'react'
import { Image} from 'react-native'
import { Box, Text } from 'native-base'
import homeController from '../../../../controller/Home'

export function Tutorial ({ navigation }) {
  const [image, setImage] = useState()
  useEffect(() => {
    homeController.getTutorial().then((res) => {
      setImage(res)
    })
  }, [])
  return (
    <Box flex="1" h={300} borderRadius={10} borderColor='#E5EBF1'>
      <Box marginBottom={2}>
          <Text fontSize="lg" bold>使用教學</Text>
      </Box>
      <Box w={375} h={300} backgroundColor={'#FFFFFF'}>
      <Image
            resizeMode='contain'
            style={{width:300,height:300}}
            source={{
              uri: image
            }}/>
      </Box>
    </Box>
  )
}

export default { Tutorial }
