import { initnotify, getToken, notify } from 'expo-push-notification-helper';
import { Alert } from 'react-native';

export default async function sentNotification(title, body) {
  // this will also automatically create three channels for your app,
  // “default”, “reminders”, “chat-messages”.
  await initnotify().then(async (data) => {
    if (data) {
      notify(await getToken(), title, body, 'default');
    } else {
      Alert.alert('please grant this app notification permission in settings.');
    }
  });
}
