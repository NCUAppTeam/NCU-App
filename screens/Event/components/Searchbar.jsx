import * as React from 'react';
import { Searchbar } from 'react-native-paper';

function MyComponent({ onChange }) {
  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <Searchbar
      placeholder="Search"
      onChange={setSearchQuery}
      onEndEditing={(text) => {
        onChange(text);
      }}
      value={searchQuery}
    />
  );
}

export default MyComponent;
