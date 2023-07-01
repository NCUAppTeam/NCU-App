import React from 'react'
import { NativeBaseProvider } from 'native-base'
import { LinearGradient } from 'expo-linear-gradient'
import { RootNavigator, navigate } from './navigation/RootNavigator'
import { AuthenticatedUserProvider } from './providers'
import { BaseTheme } from './theme/index'
import * as Linking from 'expo-linking';

const config = {
  dependencies: {
    'linear-gradient': LinearGradient
  }
}

//  處理收到 url 的事件
function handleIncomingLink(url) {
    if (!url) return

    const { hostname, path, queryParams } = Linking.parse(url);

    // 直接 navigate 到活動 details 頁面，因為是 nested navigator，所以多了一個 screen 參數
    navigate('活動', { screen: 'details', params: {Cd: queryParams.id, prepage: 'list'} })

    console.log(
        `Linked to app with hostname: ${hostname}, path: ${path} and data: ${JSON.stringify(
            queryParams
        )}`
    );
}


export default function App () {
  // 處理 Linking 進來的 URL
  const url = Linking.useURL();
  handleIncomingLink(url)  // 處理第一次收到 url 時
  Linking.addEventListener('url', () => handleIncomingLink(url))  // 透過 listener 處理後續的 url 事件

  return (
    <NativeBaseProvider theme={BaseTheme} config={config}>
      <AuthenticatedUserProvider>
        <RootNavigator />
      </AuthenticatedUserProvider>
    </NativeBaseProvider>
  )
}
