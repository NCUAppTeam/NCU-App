import React from 'react'

import {
  View,
  Text
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Styles from '../Styles'
import { Box } from 'native-base'

function UST () {
  return (
    <Box safeArea style={Styles.background}>
      <View>
        <Text style={{
          textAlign: 'center', backgroundColor: '#476685', color: 'white', height: 50, width: '100%', fontSize: 20, textAlignVertical: 'center', lineHeight: 50
        }}
        >
          台聯大專車時刻表
        </Text>
      </View>
      <View>

        <Text style={{
          textAlign: 'center', fontSize: 20, textAlignVertical: 'center', lineHeight: 50
        }}
        >
          僅平日行駛
        </Text>

      </View>
      <View style={Styles.fixToText}>

        <Text style={{
          textAlign: 'center', width: '50%', fontSize: 20
        }}
        >
          往清大、交大
        </Text>
        <Text style={{
          textAlign: 'center', width: '50%', fontSize: 20
        }}
        >
          往政大
        </Text>

      </View>
      <ScrollView>

        <View style={Styles.fixToText}>

          <Text style={{
            textAlign: 'center', fontSize: 20, lineHeight: 50, backgroundColor: 'white', width: '50%'
          }}
          >
            07:50
          </Text>
          <Text style={{
            textAlign: 'center', fontSize: 20, lineHeight: 50, backgroundColor: 'white', width: '50%'
          }}
          >
            07:30
          </Text>
        </View>
        <View style={Styles.fixToText}>

          <Text style={{
            textAlign: 'center', fontSize: 20, lineHeight: 50, backgroundColor: 'white', width: '50%'
          }}
          >
            12:10
          </Text>
          <Text style={{
            textAlign: 'center', fontSize: 20, lineHeight: 50, backgroundColor: 'white', width: '50%'
          }}
          >
            11:30
          </Text>
        </View>
        <View style={Styles.fixToText}>

          <Text style={{
            textAlign: 'center', fontSize: 20, lineHeight: 50, backgroundColor: 'white', width: '50%'
          }}
          >
            20:10
          </Text>
          <Text style={{
            textAlign: 'center', fontSize: 20, lineHeight: 50, backgroundColor: 'white', width: '50%'
          }}
          >
            21:10
          </Text>
        </View>

      </ScrollView>

      <Text style={{ textAlign: 'center', backgroundColor: 'white', color: 'gray' }}>
        上次更新:2023/01/26
      </Text>

    </Box>
  )
}
export default UST
