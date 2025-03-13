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
      console.log('code:', code);

      if (!code) {
        console.error('授權碼缺失');
        window.location.href = '/' // 如果沒有授權碼，導回登入頁面
        return;
      }

      try {
        // 交換 access_token
        const headers: Headers = new Headers();
        const client_id = import.meta.env.VITE_NCU_PORTAL_CLIENT_ID;
        const client_secret = import.meta.env.VITE_NCU_PORTAL_CLIENT_SECRET;
        const authHeader = btoa(`${client_id}:${client_secret}`);
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('Authorization', `Basic ${authHeader}`);

        const body = new URLSearchParams({
          code: code,
          redirect_uri: 'http://ncuappteam.github.io/callback',
          grant_type: 'authorization_code',
        });
        const request: RequestInfo = new Request('https://ncuappteam.github.io/oauth2/token', {
          // We need to set the `method` to `POST` and assign the headers
          method: 'POST',
          headers: headers,
          // Convert the user object to JSON and pass it as the body
          body: body.toString(),
        })

        // const tokenResponse = await fetch('', {
        //   method: 'POST',
        //   headers: headers,
        //   body: body.toString(),
        // });
        const responseData = await fetch(request);
        console.log('responseData:', responseData);
        if (responseData) {
          // localStorage.setItem('accessToken', accessToken);
          console.log('accessToken:', responseData.json());
        }
        else {
          console.error('取得 access_token 失敗');
        }

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
