import React, { useEffect, useState } from 'react';
import {
  SafeAreaView, View, ScrollView,
} from 'react-native';
import {
  Title, Text, Button,
} from 'react-native-paper';
import { getActivityInfo, createAttendance, deleteAttendance } from '../../controller/Activity';

function DetailScreen({ route, navigation }) {
  const { activityId, onGoBack } = route.params;
  const [activity, setActivity] = useState({
    attendees: [],
  });

  const fetchData = () => {
    getActivityInfo(activityId)
      .then((data) => {
        setActivity({
          ...data,
          timeString: data.time.toDate().toLocaleString(),
        });
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{ margin: 8 }}>
          <View style={{ backgroundColor: 'white', padding: 16 }}>
            <Title>{activity.name}</Title>
            <Text>{`$${activity.price}`}</Text>
          </View>
          <View style={{ padding: 10 }}>
            <Text>
              時間:
              {'\n'}
              {activity.timeString}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', flex: 1, padding: 10 }}>
            <Text style={{ fontSize: 16, flex: 1 }}>
              {`條件: ${activity.qualification}`}
            </Text>
          </View>
          <View style={{ padding: 8 }}>
            <Text>
              {`現在人數/人數限制: ${activity.attendees.length} / ${activity.numberLimit}`}
            </Text>
          </View>
          <View style={{ padding: 10 }}>
            <Text style={{ flex: 1 }}>
              {`主揪: ${activity.user}`}
            </Text>
            <Text style={{ marginTop: 8 }}>
              詳細資訊:
              {'\n'}
              {activity.details}
            </Text>
          </View>
        </View>
        <View style={{
          flexDirection: 'row', padding: 10, flex: 1, justifyContent: 'center',
        }}
        >
          <Button
            color="#046FD2"
            mode="contained"
            onPress={() => {
              createAttendance(activity.id);
              onGoBack();
              navigation.goBack();
            }}
          >
            加入
          </Button>
          <Button
            color="#046FD2"
            mode="contained"
            style={{ marginLeft: 8 }}
            onPress={() => {
              deleteAttendance(activity.id);
              onGoBack();
              navigation.goBack();
            }}
          >
            取消加入
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default DetailScreen;
