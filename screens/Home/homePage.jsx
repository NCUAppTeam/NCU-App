import React, { useState, useEffect } from 'react'
import { Image, RefreshControl } from 'react-native'
import { Box, ScrollView } from 'native-base'
import { HomeHeader } from './components/forHome/HomeHeader'
import { Calendar } from './components/forHome/Calender'
import { EventCard } from './components/forHome/EventCard'
import { Tutorial } from './components/forHome/Tutorial'
import ActiveController from '../../controller/Active'

import styles from './styles_folder/Styles'

function HomePage ({ navigation }) {
  const [refreshing, setRefreshing] = useState(false)
  const onRefresh = async () => {
    setRefreshing(true)
    setRefreshing(false)
  }
  return (
      <Box style={styles.container}>
        <HomeHeader navigation={navigation} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={(
            <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        )}
        >
          <Calendar navigation={navigation} />
          <EventCard navigation={navigation} />
          <Tutorial navigation={navigation} />
        </ScrollView>
      </Box>

  )
}

export default HomePage
