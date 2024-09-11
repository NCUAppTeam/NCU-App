import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { supabase } from '../utils/supabase'

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
  const { redirect: redirectUrl } = Route.useSearch()

  async function login() {
    const { data: { session }, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error !== null) {
      throw error
    }

    if (session !== null) {
      window.location.href = redirectUrl
    }
  }

  return (
    <div>
      <label>Email: </label>
      <input className='border' type="email" onChange={(e) => { setEmail(e.target.value) }} />
      <label>Password:</label>
      <input className='border' type="password" onChange={(e) => { setPassword(e.target.value) }} />
      <button onClick={login}>Login</button>
    </div>
  )

}
