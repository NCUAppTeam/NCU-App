import { createFileRoute, useNavigate, useRouterState } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import UserFromPortal from '../backend/user/Entities/UserFromPortal';
import SignUpForm from '../components/pages/auth/signUpForm';

export const Route = createFileRoute('/signup')({
  component: SignUpPage,
})

function SignUpPage() {
  const navigate = useNavigate();
  const state = useRouterState({ select: (s) => s.location.state })
  const [portalData, setPortalData] = useState<UserFromPortal>()

  useEffect(() => {
    if (!state.post?.portalData) {
      navigate({ to: '/' })
    } else {
      const parsedData = JSON.parse(state.post.portalData);
      setPortalData({
        chineseName: parsedData.chineseName,
        email: parsedData.email,
        studentId: parsedData.studentId,
        gender: parsedData.gender,
        academyRecords: {
          name: parsedData.academyRecords.name,
          grad: parsedData.academyRecords.grad,
          studySystemNo: parsedData.academyRecords.studySystemNo,
        },
      });
    }
  }
    , [state.post?.portalData, navigate])

  return (
    <div className="flex flex-col h-screen justify-center items-center">
      {portalData ?
        (<SignUpForm userFromPortal={portalData} navigate={navigate} />) :

        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Something Went Wrong! Please Contact ncuappteam@gmail.com</h1>
          <p className="mt-2 text-sm text-gray-600">
            無法取得使用者資訊，請重新登入或聯絡ncuappteam@gmail.com
          </p>
        </div>
      }
    </div>
  )
}