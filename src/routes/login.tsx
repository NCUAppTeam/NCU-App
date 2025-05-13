import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import logo from '../assets/logo.png';
import { supabase } from '../utils/supabase';

export const Route = createFileRoute('/login')({
  component: LoginPage,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      redirect: (search.redirect as string) || '/',
    }
  },
})

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  // const [isRemember, setIsRemember] = useState(false);
  const [isError, setIsError] = useState(false);
  const { redirect: redirectUrl } = Route.useSearch()

  const CLIENT_ID = import.meta.env.VITE_NCU_PORTAL_CLIENT_ID;
  const rootPath = import.meta.env.VITE_ROOT_PATH;

  const REDIRECT_URI = `${rootPath}/callback`;
  const supportedURL = 'https://github.com/NCUAppTeam/Legacy-website./blob/main/PRIVACY.md'


  const handlePortalSignup = () => {
    const oauthURL = `https://portal.ncu.edu.tw/oauth2/authorization?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=chinese-name student-id email academy-records gender`;
    window.location.href = oauthURL;
  };

  async function login(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const { data: { session }, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error !== null) {
      setPassword('');
      setIsError(true);
    }

    if (session !== null) {
      window.location.href = redirectUrl
    }
  }

  return (
    <div className="flex flex-col h-screen justify-center items-center" >
      <div className="flex flex-col items-center justify-center py-4">
        <img
          className='size-24'
          src={logo}
          alt={'NCU-APP LOGO'} />
        <h3 className='font-bold text-center my-4 text-sm sm:text-base md:text-lg lg:text-2xl'>歡迎來到 <span className='text-[#1784B2] font-bold'>NCU App</span></h3>

        <form
          className='flex flex-col h-fit items-center justify-center px-5'
          onSubmit={login}
        >
          <input
            type='text'
            className='w-full lg:w-80 h-12 rounded-xl bg-white border border-gray-400 focus:border focus:border-black px-6 text-black font-bold placeholder:text-gray-300'
            placeholder={Labels.account}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type='password'
            className='mt-4 w-full h-12 rounded-xl bg-white border border-gray-400 focus:border focus:border-black px-6 text-black font-bold placeholder:text-gray-300 text-base'
            placeholder={Labels.password}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* <IsRememberSection isRemember={isRemember} setIsRemember={setIsRemember} text={Labels.remember} /> */}

          {
            isError
              ? (
                <span className='w-full flex justify-start text-red-500 text-xs lg:text-sm -translaste-y-10'>
                  {isError ? Labels.wrongAccountOrPassword : ''}
                </span>
              )
              : <></>
          }

          <button
            className="mt-4 w-full h-12 rounded-md bg-[#28527A] hover:bg-[#3A6A9A] text-white font-bold border-0"
            type='submit'
          >
            {Labels.login}
          </button>
          <button
            type='button'
            className="mt-4 w-full h-12 rounded-md bg-[#E5EBF1] hover:bg-[#D4DDE5] text-[#28527A] font-bold border-0"
            onClick={handlePortalSignup}
          >
            {Labels.signUp}
          </button>

        </form>

        <a className='underline underline-offset-2 text-base lg:text-lg text-center mt-8' href={supportedURL}>隱私權政策</a>

      </div>
    </div>
  )
}

class Labels {
  private constructor() { }

  static readonly account = '註冊使用信箱';
  static readonly password = '密碼';
  static readonly remember = '保持我的登入狀態';
  static readonly login = '登入';
  static readonly signUp = 'NCU Portal 快速註冊';
  static readonly wrongAccountOrPassword = '帳號或密碼錯誤，請確認後再登入';
}
