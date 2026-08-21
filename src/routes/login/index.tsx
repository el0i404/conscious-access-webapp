import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router'
import { supabase } from '../../lib/supabase'
import { useState } from 'react'

export const Route = createFileRoute('/login/')({
  loader: async () => {
    const { data: todos, status } = await supabase.from('todos').select()
    return { todos, status }
  },

  beforeLoad: ({ context }) => {
    if (context.user) {
      throw redirect({
        to: '/overview',
      })
    }
  },
  component: Home,
})

function Home() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()

    const { data, error } = await supabase.auth.signInWithPassword({
      email: username,
      password: password,
    })

    console.log('data', data)

    if (error) {
      console.error('Login failed:', error.message)
      return
    }

    await navigate({ to: '/overview' })
  }

  return (
    <div className="p-8 app-background">
      <form
        className="flex flex-col border border-red-500 p-4 gap-3 w-80"
        onSubmit={handleLogin}
      >
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="cursor-pointer" type="submit" onClick={handleLogin}>
          LOGIN
        </button>
      </form>
    </div>
  )
}
