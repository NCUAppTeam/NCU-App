import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import {
  Card, Title, Paragraph, Button, FAB,
} from 'react-native-paper';
import EventController from '../../controller/Event';

const styles = StyleSheet.create({
  card: {
    margin: 8,
  },
  fab: {
    position: 'absolute',
    margin: 15,
    right: 0,
    bottom: 0,
  },
});

function MyEventScreen({ navigation }) {
  const [events, setEvents] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    EventController.getUserEvents()
      .then((res) => {
        setEvents(res);
      });
    setRefresh(false);
  }, [refresh]);

  const onEdit = (id, data) => {
    navigation.navigate('編輯活動', { id, data, onRefresh: () => setRefresh(true) });
  };

  const onDelete = (id) => {
    EventController.deleteEvent(id);
    setRefresh(true);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        {
          events.map(({ id, data }) => (
            <Card key={id} style={styles.card}>
              <Card.Content>
                <Title>{data.name}</Title>
                <Paragraph>
                  { `開始時間 : ${data.startTime.toDate().toLocaleString()}\n` }
                  { `結束時間 : ${data.endTime.toDate().toLocaleString()}\n` }
                  {`地點 : ${data.location}\n`}
                  {`條件 : ${data.qualification}\n`}
                  {`內容 : ${data.content} \n`}
                </Paragraph>
              </Card.Content>
              <Card.Actions>
                <Button onPress={() => onEdit(id, data)}>Edit</Button>
                <Button onPress={() => onDelete(id)}>Delete</Button>
              </Card.Actions>
            </Card>
          ))
        }
      </ScrollView>

      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate('編輯活動', { onRefresh: () => setRefresh(true) })}
      />
    </SafeAreaView>
  );
}

export default MyEventScreen;
