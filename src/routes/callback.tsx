import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';
import AcornLoading from '../components/pages/home/AcornLoading';

export const Route = createFileRoute('/callback')({
  component: Callback,
})

const rootPath = import.meta.env.VITE_ROOT_PATH;
const serverPath = import.meta.env.VITE_SERVER_PATH;

function Callback() {
  const navigate = useNavigate();

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
        const tokenResponse = await fetch(`${serverPath}/oauth2/token`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            code,
            client_id: import.meta.env.VITE_NCU_PORTAL_CLIENT_ID,
            client_secret: import.meta.env.VITE_NCU_PORTAL_CLIENT_SECRET,
            redirect_uri: `${rootPath}/callback`,
            grant_type: 'authorization_code'
          })
        });

        const tokenData = await tokenResponse.json();

        if (!tokenData.access_token) {
          console.error('取得 access_token 失敗', tokenData);
          return;
        }

        // 取得使用者資訊
        const userResponse = await fetch(`${serverPath}/oauth2/userinfo`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${tokenData.access_token}`,
            'Accept': 'application/json'
          }
        });

        const userData = await userResponse.json();
        const stringifyData: string = JSON.stringify(userData);

        navigate({ to: '/signup', state: { post: { userData: stringifyData } } }) // 導向註冊頁面，並傳遞使用者資訊
      } catch (error) {
        console.error('OAuth 登入失敗:', error);
        navigate({ to: '/' });
      }
    }

    handleOAuthCallback();
  }, [navigate]);

  return (
    <div className='w-full lg:w-2/3 mx-auto flex flex-col lg:flex-row justify-center'>
      <AcornLoading />
    </div>
  );
}

export default Callback;