import * as React from 'react';
import { View, SafeAreaView } from 'react-native';
import { Searchbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './style_folder/Styles_search';

const bar = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = (query) => setSearchQuery(query);

  return (
    <SafeAreaView>
      <View style={{ flexDirection: 'row' }}>
        <View style={{
          flex: 1, justifyContent: 'center', alignItems: 'flex-start',
        }}
        >
          <Icon
            name="navicon"
            size={28}
            color="darkblue"
          />
        </View>
        <View style={styles.SearchBar}>
          <Searchbar
            returnKeyType="previous"
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={searchQuery}
          />
        </View>
        <View style={{
          flex: 1, justifyContent: 'center', alignItems: 'flex-end',
        }}
        >
          <Icon
            name="user-o"
            size={30}
            color="darkblue"
            type="outline"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default bar;
