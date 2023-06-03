import React, { useState, useEffect } from 'react'
import { Image, RefreshControl } from 'react-native'
import {
  Title, Card
} from 'react-native-paper'
import {
  Ionicons, AntDesign, Feather
} from '@expo/vector-icons'
import { Box, Text, FlatList } from 'native-base'
import styles from '../../styles_folder/Styles_EventCard'
import ActiveController from '../../../../controller/Active'

export function EventCard ({ navigation }) {
  const [showNow, setShowNow] = useState([])
  const [refreshing, setRefreshing] = useState(false)
  const onRefresh = async () => {
    setRefreshing(true)
    ActiveController.getParticipatedActive().then((res) => {
      setShowNow(res)
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
  }, [])
  return (
    <Box w={375} h={200} borderRadius={10} borderColor='#E5EBF1' safeArea>
      <Box>
          <Text fontSize="lg" bold>你參加的活動(Swipe Right)</Text>
      </Box>
      <FlatList
        nestedScrollEnabled
        horizontal
        data={showNow}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        style={{ marginBottom: 10, alignSelf: 'center' }}
        refreshControl={(
            <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        )}
        renderItem={({ item }) => (
            <Box style={{ flexDirection: 'column' }}>
                <Card
                  key={item.id}
                  style={styles.cardManage}
                >
                  <Card.Content style={{ padding: 0 }}>
                    <Box style={{ flexDirection: 'row', margin: -15 }}>
                      <Box style={{ aspectRatio: 1 }}>
                        <Image
                          style={styles.cardManagepic}
                          source={{
                            uri: item.imageUri1
                          }}
                        />
                      </Box>
                      <Box style={{ flexDirection: 'column' }}>
                        <Title style={styles.cardManageTitle}>
                          {item.name}
                        </Title>
                        <Box style={styles.cardManageDetails}>
                          <AntDesign
                            name="clockcircleo"
                            size={15}
                            style={{ alignSelf: 'center' }}
                          />
                          <Text style={styles.cardManageText}>
                            {'   開始 ：'}
                            {item.startTimeInNum}
                          </Text>
                        </Box>
                        <Box style={styles.cardManageLocation}>
                          <Ionicons
                            name="location-outline"
                            size={17}
                            color="black"
                            style={{ alignSelf: 'center' }}
                          />
                          <Text style={styles.cardManageTextLocation}>
                            {'  '}
                            {item.place}
                          </Text>
                        </Box>
                        <Box style={styles.cardManageDetails}>
                          <Feather
                            name="users"
                            size={16}
                            color="black"
                            style={{ alignSelf: 'center' }}
                          />
                          {item.limitNum !== '0' && (
                            <Text style={styles.cardManageText}>
                              {'   '}
                              {item.num}
                              {' / '}
                              {item.limitNum}
                              人
                            </Text>
                          )}
                          {item.limitNum === '0' && (
                            <Text style={styles.cardManageText}>
                              {'   '}
                              {item.num}
                              &ensp;
                              (無上限)
                            </Text>
                          )}

                        </Box>
                      </Box>
                    </Box>
                  </Card.Content>
                </Card>
              </Box>
        )}
          />
    </Box>
  )
}

export default { EventCard }
