import { ScrollView } from 'react-native';
import { Chip } from 'react-native-paper';
import React, { useState, useEffect } from 'react';
import SalesController from '../../../controller/Sales';

function ScrollableTag() {
  const [picked, setPicked] = useState({});
  const [tags, setTags] = useState([]);
  useEffect(() => {
    SalesController.getAllTag().then((res) => {
      setTags(res);
    }).catch((err) => {
      throw err;
    });
  }, []);
  return (
    <ScrollView
      style={{ flexDirection: 'row', marginTop: 10 }}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {
        tags.map((tag) => (
          <Chip
            key={tag.icon.toString()}
            icon={tag.icon}
            selected={picked[tag.id]}
            onPress={() => {
              setPicked({ [tag.id]: true });
            }}
          >
            {tag.name}
          </Chip>
        ))
    }
    </ScrollView>
  );
}
export default ScrollableTag;
