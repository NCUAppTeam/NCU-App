import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
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
  const CLIENT_ID = "xxClientId"; // client id
  const REDIRECT_URI = "/sign_up"; // redirect uri
  const AUTH_URL = `https://portal.ncu.edu.tw/oauth2/authorization?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=id identifier chinese-name email`;
  
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
    <form
      className='flex flex-col h-screen items-center justify-center px-5 gap-4 bg-gradient-to-b from-[#d9d9d9] to-[#6ccae8]'
      onSubmit={login}
    >
      <input
        type='text'
        className='w-full h-14 rounded-full bg-white border border-black focus:border focus:border-black px-6 text-black font-bold text-xl placeholder:text-gray-300'
        placeholder={Labels.account}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type='password'
        className='w-full h-14 rounded-full bg-white border border-black focus:border focus:border-black px-6 text-black font-bold text-xl placeholder:text-gray-300'
        placeholder={Labels.password}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
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
      {
        isError
          ? (
            <span className='text-red-500 font-bold text-2xl'>
              {isError ? Labels.wrongAccountOrPassword : ''}
            </span>
          )
          : <></>
      }
      <button
        type='submit'
        className='w-full h-20 rounded-md bg-green-600 text-white font-extrabold text-5xl'
      >
        {Labels.login}
      </button>
      <button
          type='button'
          className='w-full h-14 bg-blue-500 text-white font-bold text-xl rounded-md'
          onClick={() => (window.location.href = AUTH_URL)}
        >
          {Labels.signUp}
      </button>
    </form>
  )
}

class Labels {
  private constructor() { }

  static readonly account = '信箱或手機號碼';
  static readonly password = '密碼';
  static readonly remember = '保持我的登入狀態';
  static readonly login = '登入';
  static readonly signUp = '以中大portal註冊帳號';
  static readonly wrongAccountOrPassword = '帳號或密碼錯誤';
}
