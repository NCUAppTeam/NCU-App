import React, { useEffect, useState } from 'react'
import { Box } from 'native-base'
import { HomeHeader } from './components/HomeHeader'
import { Calendar } from './components/Calender'
import styles from './Styles'

function HomePage ({ navigation }) {
  return (
    <Box style={styles.container}>
      <HomeHeader navigation={navigation} />
      <Box h={100}>
        <Calendar/>
      </Box>
    </Box>
  )
}

export default HomePage
