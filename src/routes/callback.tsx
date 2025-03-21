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
      const code = urlParams.get('code');  // 取得 OAuth 授權碼

      if (!code) {
        console.error('授權碼缺失');
        window.location.href = '/' // 如果沒有授權碼，導回登入頁面
        return;
      }

      try {
        // 交換 access_token
        const response = await fetch('https://ncuapp.davidday.tw/oauth2/token', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            code,
            client_id: import.meta.env.VITE_NCU_PORTAL_CLIENT_ID,
            client_secret: import.meta.env.NCU_PORTAL_CLIENT_SECRET,
            redirect_uri: 'https://ncuappteam.github.io/callback',
            grant_type: 'authorization_code'
          })
        });

        const responseJson = await response.json();
        if (responseJson.access_token) {
          console.log('Access Token:', responseJson.access_token);
        } else {
          console.error('取得 access_token 失敗', responseJson);
        }

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
