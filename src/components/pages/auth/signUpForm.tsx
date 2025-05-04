import { useNavigate } from '@tanstack/react-router';
import { useRef, useState } from "react";

import zxcvbn from "zxcvbn";
import UserController from '../../../backend/user/Controllers/UserController';
import UserFromPortal from '../../../backend/user/Entities/UserFromPortal';
import UserSignupData from '../../../backend/user/Entities/UserSignupData';

export default function SignUpForm({ userFromPortal, navigate }: { userFromPortal: UserFromPortal; navigate: ReturnType<typeof useNavigate> }) {
    const [formData, setFormData] = useState({
        nickname: '',
        password: '',
    })
    const passwordCRef = useRef<HTMLInputElement>(null);

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

        if (passwordCRef.current && passwordCRef.current.value !== formData.password) {
            alert('兩次輸入的密碼不一致');
            return;
        }

        setIsLoading(true)
        try {
            const signupData: UserSignupData = {
                name: userFromPortal.chineseName,
                email: userFromPortal.email,
                password: formData.password,
                username: trimmedNickname,
                studentId: userFromPortal.studentId,
            }
            const user = await addUser(signupData)
            if (!user) {
                alert('註冊失敗，請檢查您的資料並重試。')
                return
            }
            console.log('User created successfully:')
            console.log(window.location.href)

            navigate({ to: "/login", search: { redirect: "/" } })
        } catch (error) {
            console.log(error)
            console.error('註冊失敗:', error)
            alert('註冊失敗，請檢查您的資料後再試')
        } finally {
            setIsLoading(false)
        }
    }

    // send formData + userInfo to supabase
    async function addUser(userSignupData: UserSignupData) {
        const signupInstance = new UserSignupData(userSignupData)
        const userController = new UserController()
        const user = await userController.createUser(signupInstance);
        if (!user) {
            // Handle error case
            console.error("Failed to create user");
            alert('註冊失敗，請檢查您的資料並重試。')
            return null
        } else {
            // Success case - use the user object
            console.log("User created:", user);
            return user
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

    console.log('userInfo:', userFromPortal)

    return (
        <form onSubmit={handleSubmit} className="max-w-xl w-full bg-white mx-32 px-10 py-10 shadow-md rounded-lg">
            <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                    <h1 className="mt-2 text-lg font-bold text-gray-900">
                        歡迎，{userFromPortal.chineseName}
                    </h1>
                    <p className="mt-1 text-sm text-gray-600">
                        身分已經驗證，請填寫以下資訊以完成註冊
                    </p>

                    <div className="mt-6 space-y-4">
                        <div className="grid grid-cols-3 gap-4">
                            <div className="col-span-1">
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-900"
                                >
                                    姓名
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    value={userFromPortal.chineseName}
                                    readOnly
                                    className="px-2 py-1 mt-2 block w-full rounded-md bg-gray-100 text-gray-500 border border-gray-300 shadow-sm sm:text-sm cursor-not-allowed"
                                />
                            </div>

                            <div className="col-span-2">
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-900"
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={userFromPortal.email}
                                    readOnly
                                    className="px-2 py-1 mt-2 block w-full rounded-md bg-gray-100 text-gray-500 border border-gray-300 shadow-sm sm:text-sm cursor-not-allowed"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
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
                                    value={userFromPortal.studentId}
                                    readOnly
                                    className="px-2 py-1 mt-2 block w-full rounded-md bg-gray-100 text-gray-500 border border-gray-300 shadow-sm sm:text-sm cursor-not-allowed"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="academyRecords_name_grad"
                                    className="block text-sm font-medium text-gray-900"
                                >
                                    系級
                                </label>
                                <input
                                    type="text"
                                    id="academyRecords_name_grad"
                                    value={`${userFromPortal.academyRecords.name} ${userFromPortal.academyRecords.grad} 年級`}
                                    readOnly
                                    className="px-2 py-1 mt-2 block w-full rounded-md bg-gray-100 text-gray-500 border border-gray-300 shadow-sm sm:text-sm cursor-not-allowed"
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="nickname"
                                className="block text-sm font-medium text-gray-900"
                            >
                                暱稱<span className='text-red-400'>*</span>（在應用程式中顯示的用戶名）
                            </label>
                            <input
                                type="text"
                                name="nickname"
                                id="nickname"
                                value={formData.nickname}
                                onChange={handleChange}
                                className="px-2 py-1 mt-2 block w-full rounded-md border-gray-300 border shadow-sm sm:text-sm bg-white"
                                placeholder="Enter your nickname"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-900"
                            >
                                密碼<span className='text-red-400'>*</span>
                            </label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                autoComplete="new-password"
                                value={formData.password}
                                onChange={(e) => {
                                    handleChange(e)
                                    passwordCheck(e)
                                }}
                                className="px-2 py-1 mt-2 block w-full rounded-md border-gray-300 border shadow-sm sm:text-sm bg-white"
                                placeholder="Enter your password"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="passwordC"
                                className="block text-sm font-medium text-gray-900"
                            >
                                確認密碼<span className='text-red-400'>*</span>
                            </label>
                            <input
                                type="password"
                                autoComplete="new-password2"
                                ref={passwordCRef}
                                id="passwordC"
                                className="px-2 py-1 mt-2 block w-full rounded-md border-gray-300 border shadow-sm sm:text-sm bg-white"
                                placeholder="Enter your password again"
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
