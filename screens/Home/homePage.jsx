import React, { useState, useEffect } from 'react'
import { RefreshControl } from 'react-native'
import { Box, ScrollView } from 'native-base'
import { HomeHeader } from './components/forHome/HomeHeader'
import { Calendar } from './components/forHome/Calender'
import { EventCard } from './components/forHome/EventCard'
import { Tutorial } from './components/forHome/Tutorial'
import ActiveController from '../../controller/Active'
import homeController from '../../controller/Home'

import styles from './styles_folder/Styles'

function HomePage ({ navigation }) {
  const [showNow, setShowNow] = useState([])
  const [refreshing, setRefreshing] = useState(false)
  const [card, setCard] = useState()

  const onRefresh = async () => {
    setRefreshing(true)
    ActiveController.getParticipatedActive().then((res) => {
      setShowNow(res)
    }).catch((err) => {
      throw err
    })
    homeController.getTutorial().then((res) => {
      setCard(res)
      console.log(res)
    }).catch((err) => {
      throw err
    })
    setRefreshing(false)
  }

  useEffect(() => {
    ActiveController.getParticipatedActive().then((res) => {
      setShowNow(res)
    }).catch((err) => {
      throw err
    })
    homeController.getTutorial().then((res) => {
      setCard(res)
    }).catch((err) => {
      throw err
    })
  }, [])
  return (
      <Box safeArea style={styles.container}>
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
          <EventCard showNow={showNow} />
          <Tutorial card={card}/>

        </ScrollView>

      </Box>

  )
}

export default HomePage
