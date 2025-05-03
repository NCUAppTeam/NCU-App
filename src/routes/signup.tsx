import { createFileRoute, useNavigate, useRouterState } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import SignUpForm from '../components/pages/auth/signUpForm';

export const Route = createFileRoute('/signup')({
  component: SignUpPage,
})

function SignUpPage() {
  const navigate = useNavigate();
  const state = useRouterState({ select: (s) => s.location.state })
  const [userData, setUserData] = useState<UserInfo>()


  interface UserInfo {
    chineseName: string
    email: string
    studentId: string
  }

  useEffect(() => {
    if (!state.post?.userData) {
      navigate({ to: '/' })
    } else {
      setUserData(JSON.parse(state.post.userData))
    }
  }
    , [state.post?.userData, navigate])

  return (
    <div className="flex flex-col h-screen justify-center items-center">
      {userData ?
        (<SignUpForm userInfo={userData} navigate={navigate} />) :

        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Something Went Wrong! Please Contact ncuappteam@gmail.com</h1>
          <p className="mt-2 text-sm text-gray-600">
            無法取得使用者資訊，請重新登入
          </p>
        </div>
      }
    </div>
  )
}