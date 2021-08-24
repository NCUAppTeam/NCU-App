import React from 'react';
import { View } from 'react-native';
import {
  Card, Title, Paragraph,
} from 'react-native-paper';
import styles from '../Styles';

function EventCard({ navigation, event }) {
  return (
    <View style={styles.col}>
      <Card
        onPress={() => {
          navigation.navigate('活動詳細資料', {
            event,
          });
        }}
      >
        <Card.Content>
          <Title>{event.data.name}</Title>
          <Paragraph>{event.data.info}</Paragraph>
        </Card.Content>
      </Card>
    </View>
  );
}

export default EventCard;
