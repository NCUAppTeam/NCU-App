import React from 'react'
import { Box, Text } from 'native-base'

export function Tutorial ({ navigation }) {
  return (
    <Box w={375} h={300} borderRadius={10} borderColor='#E5EBF1'>
      <Box marginBottom={2}>
          <Text fontSize="lg" bold>使用教學</Text>
      </Box>
      <Box w={375} h={300} backgroundColor={'#FFFFFF'}>

      </Box>
    </Box>
  )
}

export default { Tutorial }
