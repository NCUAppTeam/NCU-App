import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, Button, Dimensions } from 'react-native'
import Dialog, { DialogContent } from 'react-native-popup-dialog'
import {
  Box, NativeBaseProvider, Pressable
} from 'native-base'
import { BarCodeScanner } from 'expo-barcode-scanner'
import styles from './style_folder/Styles_share'

function Share ({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null)
  const [scanned, setScanned] = useState(false)
  const [showDialog, setShowDialog] = useState(false)
  const [activeId, setActiveId] = useState('')

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync()
      setHasPermission(status === 'granted')
    }

    getBarCodeScannerPermissions()
  }, [])

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true)
    setShowDialog(true)
    setActiveId(data)
  }

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>
  }

  return (
    <View style={{
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center'
    }}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      <Dialog
        width={Dimensions.get('window').width * 0.8}
        height={150}
        visible={showDialog}
        onTouchOutside={() => {
          setShowDialog(false)
        }}
        >
        <DialogContent style={styles.shareBox}>
            <NativeBaseProvider>
                <Box>
                    <Text style={styles.DialogTitle}>
                        確認前往此活動?
                    </Text>
                </Box>
                <Box style={styles.SocialApp}>
                <Pressable
                    style={{
                      width: 100,
                      margin: 20,
                      backgroundColor: '#D6DBDF',
                      height: 60,
                      justifyContent: 'center',
                      borderRadius: 20
                    }}
                    onPress={() => {
                      setShowDialog(false)
                      setScanned(false)
                    }}
                >
                    <Text style={{ alignSelf: 'center' }}>
                    返回掃描
                    </Text>
                </Pressable>
                <Pressable
                    style={{
                      width: 100,
                      margin: 20,
                      backgroundColor: '#85C1E9',
                      height: 60,
                      justifyContent: 'center',
                      borderRadius: 20
                    }}
                    onPress={() => {
                      setShowDialog(false)
                      navigation.navigate('details', { Cd: activeId, prepage: 'share' })
                    }}
                >
                    <Text style={{ alignSelf: 'center' }}>
                    確認
                    </Text>
                </Pressable>
                </Box>
            </NativeBaseProvider>
        </DialogContent>
      </Dialog>
    </View>
  )
}
export default Share
