import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';


export const Route = createFileRoute('/callback')({
  component: Callback,
})

function Callback() {
  const navigate = useNavigate()

  useEffect(() => {
    async function handleOAuthCallback() {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
  
      if (!code) {
          console.error('授權碼缺失');
          window.location.href = '/';
          return;
      }
  
      try {
          // 交換 access_token
          const tokenResponse = await fetch('http://localhost:3001/api/oauth/token', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ code }),
          });
  
          if (!tokenResponse.ok) {
              throw new Error(`交換 access_token 失敗: ${tokenResponse.status}`);
          }
  
          const tokenData = await tokenResponse.json();
          const accessToken = tokenData.access_token;
  
          console.log('Token:', tokenData);
  
          // 使用 access_token 取得使用者資訊
          const userInfoResponse = await fetch('https://portal.ncu.edu.tw/oauth2/userinfo', {
              headers: { Authorization: `Bearer ${accessToken}` },
          });
  
          if (!userInfoResponse.ok) {
              throw new Error('獲取使用者資訊失敗');
          }
  
          const userInfo = await userInfoResponse.json();
          console.log('使用者資訊:', userInfo);
  
          // 儲存使用者資訊
          localStorage.setItem('user', JSON.stringify(userInfo));
  
          // 導向首頁
          navigate({ to: '/' });
      } catch (error) {
          console.error('OAuth 登入失敗:', error);
          navigate({ to: '/' });
      }
  }  

    handleOAuthCallback();
  }, [navigate]);

  return <div>正在處理登入...</div>;
}

export default Callback;
