import React from 'react';
import { ScrollView } from 'react-native';
import { DataTable } from 'react-native-paper';
import { BusInfo } from './components/BusData';

function BusScreen({ route }) {
  const { busId } = route.params;

  const keys = Object.keys(BusInfo[busId]);
  const indexs = [];
  Object.values(BusInfo[busId]).forEach((arr) => {
    for (let i = indexs.length; i < arr.length; i += 1) indexs.push(i);
  });

  return (
    <ScrollView>
      <DataTable>
        <DataTable.Header>
          {
            keys.map((name) => (
              <DataTable.Title key={name}>{name}</DataTable.Title>
            ))
          }
        </DataTable.Header>
        {
          indexs.map((idx) => (
            <DataTable.Row key={idx}>
              {
                keys.map((name) => (
                  <DataTable.Cell key={name}>{BusInfo[busId][name][idx]}</DataTable.Cell>
                ))
              }
            </DataTable.Row>
          ))
        }
      </DataTable>
    </ScrollView>
  );
}

export default BusScreen;
