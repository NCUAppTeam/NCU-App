import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, ScrollView } from 'react-native';
import {
  Text,
} from 'react-native-paper';
import styles from './Styles';
import SalesController from '../../controller/Sales';

function AddScreen({ route }) {
  const { element } = route.params;
  const [commentData, setCommentData] = useState([]);
  useEffect(() => {
    SalesController.getItemComment(element.id).then((res) => {
      setCommentData(res);
    }).catch((err) => {
      throw err;
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={{ padding: 10 }}>
          <Text style={{ fontSize: 25 }}>
            所有回應
          </Text>
          {commentData.map(({
            id, content, commenterName, dateString,
          }) => (
            <View key={id} style={{ padding: 10, margin: 5, backgroundColor: '#fff' }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ color: '#999', margin: 5, fontSize: 15 }}>
                  {commenterName}
                </Text>
                <Text style={{ color: '#999', margin: 5, fontSize: 10 }}>
                  {dateString}
                </Text>
              </View>
              <View>
                <Text style={{
                  marginTop: 10, marginLeft: 20, marginRight: 20, fontSize: 15,
                }}
                >
                  {content}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
export default AddScreen;
