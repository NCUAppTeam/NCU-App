import React, { useEffect, useState } from 'react';
import { Dimensions, View, Image } from 'react-native';
import Controller from '../../../controller/Home';

function Poster({ uri }) {
  const [style, setStyle] = useState({});

  useEffect(() => {
    Image.getSize(uri, (width, height) => {
      const windowWidth = Dimensions.get('window').width;
      const adjustedHeight = height * (windowWidth / width);
      setStyle({
        width: windowWidth,
        height: adjustedHeight,
        resizeMode: 'contain',
      });
    });
  }, []);

  return <Image style={style} source={{ uri }} />;
}

function AdsWidget() {
  const [contents, setContents] = useState([]);

  useEffect(() => {
    Controller.getAds()
      .then((res) => {
        setContents(res);
      });
  }, []);

  return (
    <View>
      {
        contents.map(({ id, data: { imageUrl } }) => (
          <Poster key={id} uri={imageUrl} />
        ))
      }
    </View>
  );
}

export default AdsWidget;
