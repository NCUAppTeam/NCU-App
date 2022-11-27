import React, { useState, useEffect } from 'react';
import { Agenda } from 'react-native-calendars';
import {
  StyleSheet, SafeAreaView, View, TouchableOpacity,
} from 'react-native';
import {
  Title, Caption, FAB, Headline, Subheading,
} from 'react-native-paper';
import CalendarController from '../../controller/Calendar';

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 30,
  },
  emptyText: {
    paddingTop: 32,
    textAlign: 'center',
  },
  daycontainer: {
    flex: 1,
    paddingTop: 40,
  },
});

function getFormattedDate(datetime) {
  const year = datetime.getFullYear();
  let month = datetime.getMonth() + 1;
  if (month < 10) month = `0${month}`;
  let date = datetime.getDate();
  if (date < 10) date = `0${date}`;
  return `${year}-${month}-${date}`;
}

function AgendaScreen({ navigation }) {
  const [refresh, setRefresh] = useState(true);

  const [agendaItems, setAgendaItems] = useState({});

  useEffect(() => {
    CalendarController.getUserCalendar()
      .then((events) => {
        const formatted = {};
        events.forEach((event) => {
          const date = getFormattedDate(event.data.startTime.toDate());
          const field = {
            event,
            day: date,
          };
          if (formatted[date] === undefined) {
            formatted[date] = [field];
          } else {
            formatted[date].push(field);
          }
        });
        setAgendaItems(formatted);
      });
    setRefresh(false);
  }, [refresh]);

  const handleEventSelection = (event) => {
    navigation.navigate('行程詳細資料', {
      id: event.id,
      data: event.data,
      onRefresh: () => setRefresh(true),
    });
  };

  const renderItem = () => function ({ event }) {
    const {
      data: {
        name, startTime, endTime, location,
      },
    } = event;
    const startTimeStr = startTime.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const endTimeStr = endTime.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return (
      <TouchableOpacity onPress={() => handleEventSelection(event)}>
        <View style={styles.item}>
          <Caption>{`${startTimeStr}-${endTimeStr}`}</Caption>
          <Headline />
          <Subheading>{location}</Subheading>
        </View>
      </TouchableOpacity>
    );
  };

  const renderEmptyDate = () => (
    <Title style={styles.emptyText}>今天沒事喔!</Title>
  );

  const [seletedDate, setSeletedDate] = useState(new Date());
  return (
    <SafeAreaView style={styles.daycontainer}>
      <Agenda
        renderItem={renderItem(navigation)}
        renderEmptyDate={renderEmptyDate}
        renderEmptyData={renderEmptyDate}
        rowHasChanged={(r1, r2) => r1.name !== r2.name}
        markingType="custom"
        pastScrollRange={100}
        futureScrollRange={100}
        onDayPress={(day) => setSeletedDate(new Date(day.timestamp))}
        monthFormat="yyyy/MM"
        hideExtraDays={false}
        selected={seletedDate}
        items={agendaItems}
      />
      <FAB
        icon="plus"
        onPress={() => navigation.navigate('編輯行程', { onRefresh: () => setRefresh(true) })}
        style={{
          position: 'absolute',
          margin: 15,
          right: 0,
          bottom: 0,
        }}
      />
    </SafeAreaView>
  );
}

export default AgendaScreen;
