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
        if(import.meta.env.VITE_NCU_PORTAL_CLIENT_ID){
          console.log(import.meta.env.VITE_NCU_PORTAL_CLIENT_ID)
        }
        const body = new URLSearchParams({
          client_id: import.meta.env.VITE_NCU_PORTAL_CLIENT_ID,
          client_secret: import.meta.env.VITE_NCU_PORTAL_CLIENT_SECRET,
          code: code,
          redirect_uri: 'https://ncuappteam.github.io/callback',
          grant_type: 'authorization_code',
        });

        const tokenResponse = await fetch('https://portal.ncu.edu.tw/oauth2/token', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
          },
          body: body.toString(),
        });
        console.log('tokenResponse:', tokenResponse);

        if (!tokenResponse.ok) {
          throw new Error(`交換 access_token 失敗: ${tokenResponse.status}`);
        }

        const tokenData = await tokenResponse.json();
        const accessToken = tokenData.access_token;

        // 使用 access_token 取得使用者資訊
        const userInfoResponse = await fetch('https://portal.ncu.edu.tw/oauth2/userinfo', {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        if (!userInfoResponse.ok) {
          throw new Error('獲取使用者資訊失敗');
        }

        const userInfo = await userInfoResponse.json();
        console.log('使用者資訊:', userInfo);

        // 這裡可以將 userInfo 存入全域狀態或 localStorage
        localStorage.setItem('user', JSON.stringify(userInfo));

        // 跳轉到首頁或其他頁面
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
