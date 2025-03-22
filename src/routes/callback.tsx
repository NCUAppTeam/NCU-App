import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

export const Route = createFileRoute('/callback')({
  component: Callback,
})

function Callback() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    async function handleOAuthCallback() {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');  // 取得 OAuth 授權碼

      if (!code) {
        console.error('授權碼缺失');
        window.location.href = '/'; // 如果沒有授權碼，導回登入頁面
        return;
      }

      try {
        // 交換 access_token
        const tokenResponse = await fetch('https://ncuapp.davidday.tw/oauth2/token', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            code,
            client_id: import.meta.env.VITE_NCU_PORTAL_CLIENT_ID,
            client_secret: import.meta.env.VITE_NCU_PORTAL_CLIENT_SECRET,
            redirect_uri: 'https://ncuappteam.github.io/callback',
            grant_type: 'authorization_code'
          })
        });

        const tokenData = await tokenResponse.json();
        if (!tokenData.access_token) {
          console.error('取得 access_token 失敗', tokenData);
          return;
        }
        
        // 取得使用者資訊
        const userResponse = await fetch('https://ncuapp.davidday.tw/oauth2/userinfo', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${tokenData.access_token}`,
            'Accept': 'application/json'
          }
        });

        const userData = await userResponse.json();
        console.log('使用者資訊:', userData);
        setUserInfo(userData);

        navigate({ to: '/' }); // 取得資料後導航到首頁
      } catch (error) {
        console.error('OAuth 登入失敗:', error);
        navigate({ to: '/' });
      }
    }

    handleOAuthCallback();
  }, [navigate]);

  return (
    <div>
      <h2>正在處理登入...</h2>
      {userInfo && (
        <div>
          <h3>使用者資訊：</h3>
          <pre>{JSON.stringify(userInfo, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default Callback;
