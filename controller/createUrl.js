import { Linking } from 'react-native';

async function useInitialURL() {
  // Get the deep link used to open the app
  const initialUrl = await Linking.getInitialURL();

  console.log(initialUrl);
  return initialUrl;
}

export default {
  useInitialURL,
};
