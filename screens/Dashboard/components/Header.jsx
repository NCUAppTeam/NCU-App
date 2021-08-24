import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Avatar, IconButton, Title } from 'react-native-paper';
import ProfileController from '../../../controller/Profile';

function Header({ navigation, hideSetting }) {
  const [avatar, setAvatar] = useState();
  const [name, setName] = useState('');

  useEffect(() => {
    ProfileController.getCurrentUserProfile()
      .then((doc) => {
        setName(doc.displayName);
        setAvatar(doc.photoURL);
      });
  }, []);

  return (
    <View style={{ flexDirection: 'row', padding: 16 }}>
      <Avatar.Image style={{ marginRight: 16 }} size={48} source={{ uri: avatar }} />
      <Title style={{ marginRight: 'auto' }}>{`您好, ${name}`}</Title>
      { !hideSetting && (
        <IconButton
          icon="cog"
          size={24}
          onPress={() => navigation.navigate('設定頁面')}
        />
      )}
    </View>
  );
}

export default Header;
