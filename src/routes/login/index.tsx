import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { supabase } from '../../lib/supabase'

export const Route = createFileRoute('/login/')({
  beforeLoad: ({ context }) => {
    if (context.user) {
      throw redirect({
        to: '/overview',
      })
    }
  },

  component: LoginPage,
})

function LoginPage() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()

    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    await navigate({
      to: '/overview',
    })
  }

  return (
    <div className="flex min-h-dvh items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo / Brand */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-900 text-xl font-bold text-white shadow-lg shadow-zinc-900/20">
            A
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
            Welcome back
          </h1>

          <p className="mt-2 text-sm text-zinc-500">
            Sign in to continue to your account
          </p>
        </div>

        {/* Card */}
        <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-xl shadow-zinc-200/50 sm:p-8">
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-zinc-700"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-zinc-900 focus:bg-white focus:ring-4 focus:ring-zinc-900/10"
              />
            </div>

            {/* Password */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-zinc-700"
                >
                  Password
                </label>

                <button
                  type="button"
                  className="text-xs font-medium text-zinc-500 transition hover:text-zinc-900"
                >
                  Forgot password?
                </button>
              </div>

              <input
                id="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-zinc-900 focus:bg-white focus:ring-4 focus:ring-zinc-900/10"
              />
            </div>

            {/* Error */}
            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center rounded-xl bg-zinc-900 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-zinc-900/20 transition hover:bg-zinc-800 focus:outline-none focus:ring-4 focus:ring-zinc-900/20 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Signing in...
                </span>
              ) : (
                'Sign in'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-zinc-200" />
            <span className="text-xs text-zinc-400">OR</span>
            <div className="h-px flex-1 bg-zinc-200" />
          </div>

          {/* Sign up */}
          <p className="text-center text-sm text-zinc-500">
            Don't have an account?{' '}
            <button
              type="button"
              className="font-semibold text-zinc-900 hover:underline"
            >
              Create one
            </button>
          </p>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-zinc-400">
          By continuing, you agree to our Terms and Privacy Policy.
        </p>
      </div>
    </div>
  )
}
