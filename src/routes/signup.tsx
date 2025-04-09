import { createFileRoute, useRouterState } from '@tanstack/react-router'
import { useState } from 'react'
import zxcvbn from 'zxcvbn'; //記得要先安裝zxcvbn，輸入 npm install zxcvbn
export const Route = createFileRoute('/signup')({
  component: SignUpPage,
})

function SignUpPage() {
  // 模擬從 OAuth 獲取的使用者資訊
  const state = useRouterState({ select: (s) => s.location.state })
  const userInfo = state.post?.userData
    ? JSON.parse(state.post.userData)
    : {
      chineseName: 'NCU APP Developer',
      email: '111@gmail.com',
      studentId: '110110110',
    }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <SignUpForm userInfo={userInfo} />
    </div>
  )
}
interface UserInfo {
  chineseName: string
  email: string
  studentId: string
}

function SignUpForm({ userInfo }: { userInfo: UserInfo }) {
  const [formData, setFormData] = useState({
    nickname: '',
    password: '',
  })

  const [passwordStrength, setPasswordStrength] = useState(0)

  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const passwordCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const result = zxcvbn(e.target.value)
    setPasswordStrength(result.score)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const trimmedNickname = formData.nickname.trim()

    if (!trimmedNickname) {
      alert('暱稱不能為空，且不能只包含空白字符')
      return
    }

    if (trimmedNickname.length > 10) {
      alert('暱稱長度最多為 10 個字元')
      return
    }

    if (!formData.password) {
      alert('密碼不能為空')
      return
    }
    if (formData.password.length < 8) {
      alert('密碼長度至少為 8 個字元')
      return
    }
    if (formData.password.length > 20) {
      alert('密碼長度最多為 20 個字元')
      return
    }
    if (!/^[A-Za-z\d]+$/.test(formData.password)) {
      alert('密碼只能包含英文字母和數字，不能有特殊符號')
      return
    }
    if (!/(?=.*[A-Za-z])(?=.*\d)/.test(formData.password)) {
      alert('密碼必須包含至少一個英文字母和一個數字')
      return
    }

    console.log('Submitted Data:', {
      nickname: trimmedNickname,
      password: formData.password,
    })
    // 加上 API 請求來提交「nickname」和「password」
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000)) // 🔥 假裝等待伺服器回應
      console.log('Submitted Data:', {
        nickname: trimmedNickname,
        password: formData.password,
      })
      alert('註冊成功！')
    } catch (error) {
      console.error('註冊失敗:', error)
      alert('伺服器錯誤，請稍後再試')
    } finally {
      setIsLoading(false) // 🔥 關閉 Loading
    }
  }

  // 密碼強度顯示顏色
  const strengthColors = [
    'bg-red-500',
    'bg-orange-500',
    'bg-yellow-500',
    'bg-green-500',
    'bg-blue-500',
  ]

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h1 className="mt-2 text-lg font-bold text-gray-900">
            歡迎，{userInfo.chineseName}
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            身分已經驗證，請填寫以下資訊以完成註冊
          </p>

          <div className="mt-6 space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-900"
              >
                姓名
              </label>
              <input
                type="text"
                id="name"
                value={userInfo.chineseName}
                readOnly
                className="mt-2 block w-full rounded-md bg-gray-100 text-gray-500 border border-gray-300 shadow-sm sm:text-sm cursor-not-allowed"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-900"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={userInfo.email}
                readOnly
                className="mt-2 block w-full rounded-md bg-gray-100 text-gray-500 border border-gray-300 shadow-sm sm:text-sm cursor-not-allowed"
              />
            </div>

            <div>
              <label
                htmlFor="studentId"
                className="block text-sm font-medium text-gray-900"
              >
                學號
              </label>
              <input
                type="text"
                id="studentId"
                value={userInfo.studentId}
                readOnly
                className="mt-2 block w-full rounded-md bg-gray-100 text-gray-500 border border-gray-300 shadow-sm sm:text-sm cursor-not-allowed"
              />
            </div>

            <div>
              <label
                htmlFor="nickname"
                className="block text-sm font-medium text-gray-900"
              >
                暱稱（在應用程式中顯示的用戶名）
              </label>
              <input
                type="text"
                name="nickname"
                id="nickname"
                value={formData.nickname}
                onChange={handleChange}
                required
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-600 focus:ring-indigo-600 sm:text-sm"
                placeholder="Enter your nickname"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-900"
              >
                密碼
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={(e) => {
                  handleChange(e)
                  passwordCheck(e)
                }}
                required
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-600 focus:ring-indigo-600 sm:text-sm"
                placeholder="Enter your password"
              />
            </div>

            <div className="mt-2 w-full h-3 bg-gray-200 rounded-full">
              <div
                className={`h-full rounded-full ${strengthColors[passwordStrength]}`}
                style={{ width: `${(passwordStrength + 1) * 20}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="text-sm font-semibold text-gray-900"
          disabled={isLoading}
        >
          取消
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          disabled={isLoading}
        >
          {isLoading ? '處理中...' : '送出'}
        </button>
      </div>
    </form>
  )
}
