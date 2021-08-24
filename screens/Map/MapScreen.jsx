import React, { useEffect, useState, useLayoutEffect } from 'react';
import {
  View, Text,
} from 'react-native';
import {
  FAB, Modal, Button, IconButton,
} from 'react-native-paper';
import AwesomeIcon from '@expo/vector-icons/FontAwesome5';
import MapController from '../../controller/Map';
import MapComponent from './components/MapComponent';
import { BusNumbers } from './components/BusData';
import styles from './Styles';

function MapScreen({ navigation }) {
  const [busVisible, setBusVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [openFAB, setOpenFAB] = useState(false);
  const [pinId, setPinId] = useState();
  const [pin, setPin] = useState();

  const onStateChange = ({ open }) => { setOpenFAB(open); };

  const updatePin = (index) => {
    MapController.getBuilding(index)
      .then((response) => {
        setPin(response);
      });
  };

  useEffect(() => {
    const id = setInterval(() => {
      if (pinId) updatePin(pinId);
    }, 500);
    return () => clearInterval(id);
  }, [pinId]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          icon="search"
          color="gray"
          size={20}
          onPress={() => navigation.navigate('搜尋', { setPinId, updatePin })}
        />
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <MapComponent busVisible={busVisible} />
      {pin
          && (
          <View style={styles.pointerPosition}>
            <Text style={styles.pointer}>
              {`${pin.chineseName}  ${pin.distance}  `}
            </Text>
            <View style={styles.icon}>
              <AwesomeIcon
                name="arrow-up"
                size={24}
                color="white"
                style={{ transform: [{ rotate: `${pin.degree}deg` }] }}
              />
            </View>
          </View>
          )}
      <Modal
        visible={modalVisible}
        onDismiss={() => setModalVisible(false)}
        contentContainerStyle={styles.modalView}
      >
        <Text>請選擇欲查詢的公車</Text>
        {
            BusNumbers.map((busId) => (
              <Button
                key={busId}
                icon="bus"
                mode="contained"
                onPress={() => navigation.navigate('公車時刻表', { busId })}
                style={styles.openButton}
              >
                {busId}
              </Button>
            ))
          }
      </Modal>
      <FAB
        style={styles.fab1}
        open={openFAB}
        icon="bus"
        onPress={() => setBusVisible(!busVisible)}
        onStateChange={onStateChange}
      />
      <FAB
        style={styles.fab2}
        open={openFAB}
        icon="clock"
        onPress={() => setModalVisible(true)}
        onStateChange={onStateChange}
      />
    </View>
  );
}

export default MapScreen;
