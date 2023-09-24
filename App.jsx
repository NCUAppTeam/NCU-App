import React from 'react'
import { NativeBaseProvider } from 'native-base'
import { LinearGradient } from 'expo-linear-gradient'
import { RootNavigator, navigate } from './navigation/RootNavigator'
import { AuthenticatedUserProvider } from './providers'
import { BaseTheme } from './theme/index'
import * as Linking from 'expo-linking'

const config = {
  dependencies: {
    'linear-gradient': LinearGradient
  }
}

//  處理收到 url 的事件
function handleIncomingLink (url) {
  if (!url) return

  const { hostname, path, queryParams } = Linking.parse(url)

  // 如果路徑不包含 "activity"，跳過
  if (!path.includes('activity')) return

  // 如果缺少活動 ID 參數，跳過
  if (!('id' in queryParams)) return

  // 在打開活動詳細頁之前，先初始化活動列表
  navigate('活動', { screen: 'list' })

  // 直接 navigate 到活動 details 頁面，因為是 nested navigator，所以多了一個 screen 參數
  navigate('活動', { screen: 'details', params: { Cd: queryParams.id, prepage: 'list' } })
}

// 決定透過URL初始化應用時，要等多久（單位：毫秒）才轉畫面 (navigate)
const APP_INIT_NAVIGATE_DELAY = 2000

export default function App () {
  // 處理 Linking 進來的 URL
  const url = Linking.useURL()
  Linking.addEventListener('url', () => handleIncomingLink(url)) // 透過 listener 處理後續的 url 事件

  // 應用還沒打開，點 url 後才啟動
  // 這裡給它設 2 秒延遲，否則可能會吃不到
  setTimeout(() => { handleIncomingLink(url) }, APP_INIT_NAVIGATE_DELAY)

  return (
    <NativeBaseProvider theme={BaseTheme} config={config}>
      <AuthenticatedUserProvider>
        <RootNavigator />
      </AuthenticatedUserProvider>
    </NativeBaseProvider>
  )
}
