import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { supabase } from '../utils/supabase'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/')({
  loader: async () => {
    const { data: todos, status } = await supabase.from('todos').select()
    return { todos, status }
  },
  component: Home,
})

function Home() {
  //   const { todos, status } = Route.useLoaderData();
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()

    const { data, error } = await supabase.auth.signInWithPassword({
      email: username,
      password: password,
    })

    if (error) {
      console.error('Login failed:', error.message)
      return
    }

    navigate({ to: '/overview' })
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
