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
  const [isRemember, setIsRemember] = useState(false);
  const [isError, setIsError] = useState(false);
  const { redirect: redirectUrl } = Route.useSearch()

  const CLIENT_ID = import.meta.env.VITE_NCU_PORTAL_CLIENT_ID;
  const REDIRECT_URI = 'http://localhost:5173/callback';
  const supportedURL = 'https://github.com/NCUAppTeam/Legacy-website./blob/main/PRIVACY.md'

  const handlePortalSignup = () => {
    const oauthURL = `https://portal.ncu.edu.tw/oauth2/authorization?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=chinese-name student-id email`;
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
          className='flex flex-col h-fit items-center justify-center px-5 gap-4'
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
            className='w-full h-12 rounded-xl bg-white border border-gray-400 focus:border focus:border-black px-6 text-black font-bold placeholder:text-gray-300 text-base'
            placeholder={Labels.password}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* <IsRememberSection isRemember={isRemember} setIsRemember={setIsRemember} /> */}

          {
            isError
              ? (
                <span className='text-red-500 font-bold text-base lg:text-lg'>
                  {isError ? Labels.wrongAccountOrPassword : ''}
                </span>
              )
              : <></>
          }

          <button
            className="w-full h-12 rounded-md bg-[#28527A] hover:bg-[#3A6A9A] text-white font-bold border-0"
            type='submit'
          >
            {Labels.login}
          </button>
          <button
            type='button'
            className="w-full h-12 rounded-md bg-[#E5EBF1] hover:bg-[#D4DDE5] text-[#28527A] font-bold border-0"
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

  static readonly account = '註冊時的信箱';
  static readonly password = '密碼';
  static readonly remember = '保持我的登入狀態';
  static readonly login = '登入';
  static readonly signUp = 'NCU Portal 快速註冊';
  static readonly wrongAccountOrPassword = '帳號或密碼錯誤';
}

function IsRememberSection({ isRemember, setIsRemember }: { isRemember: boolean, setIsRemember: React.Dispatch<React.SetStateAction<boolean>> }) {
  return (
    <div className='flex flex-row items-center gap-4'>
      {/* The style of the checkbox is refered from https://www.material-tailwind.com/docs/html/checkbox */}
      <label htmlFor='remember' className='flex items-center cursor-pointer relative'>
        <input
          type='checkbox'
          className='peer size-5 cursor-pointer transition-all appearance-none rounded bg-white border-2 border-gray-600 checked:bg-cyan-500 checked:border-cyan-500' id='remember'
          checked={isRemember}
          onChange={(e) => setIsRemember(e.target.checked)}
        />
        <span className='absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
          <svg xmlns='http://www.w3.org/2000/svg' className='h-3.5 w-3.5' viewBox='0 0 20 20' fill='currentColor' stroke='currentColor' strokeWidth='1' aria-hidden="true">
            <path fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clipRule='evenodd'></path>
          </svg>
        </span>
      </label>
      <label htmlFor='remember' className='text-white font-bold text-2xl'>
        {Labels.remember}
      </label>
    </div>
  );
}
