import React from 'react'
import { Box } from 'native-base'
import { HomeHeader } from './components/HomeHeader'
import { Calendar } from './components/Calender'
import styles from './Styles'

function HomePage ({ navigation }) {
  return (
    <Box style={styles.container}>
      <HomeHeader navigation={navigation} />
      <Calendar navigation={navigation} />
    </Box>
  )
}

export default HomePage
