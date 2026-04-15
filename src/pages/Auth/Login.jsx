import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!form.email.trim() || !form.password.trim()) {
      return
    }

    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      navigate('/retailer/home')
    }, 500)
  }

  return (
    <div className="screen-shell flex min-h-dvh flex-col overflow-x-hidden pb-8 pt-4">
      <section className="brand-gradient rounded-2xl px-5 pb-12 pt-9 text-white shadow-[0_10px_24px_rgba(0,168,119,0.24)]">
        <p className="text-xs uppercase tracking-[0.22em] text-[#d6f5ea]">Retailer Portal</p>
        <h1 className="mt-2 text-[30px] font-semibold leading-tight tracking-[-0.01em]">Umeed Retailers</h1>
        <p className="mt-2 max-w-[24ch] text-sm leading-relaxed text-[#d6f5ea]">
          Login to place wholesale orders, track deliveries, and manage your store wallet.
        </p>
      </section>

      <section className="card-surface -mt-8 p-5">
        <h2 className="text-lg font-semibold text-slate-900">Welcome Back</h2>
        <p className="mt-1 text-sm text-slate-500">Sign in to continue</p>

        <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="mb-2 block text-xs font-medium text-slate-600">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="owner@shop.com"
              value={form.email}
              onChange={handleChange}
              className="input-field"
              autoComplete="email"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-xs font-medium text-slate-600">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              className="input-field"
              autoComplete="current-password"
              required
            />
          </div>

          <button type="submit" className="primary-btn" disabled={submitting}>
            {submitting ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-slate-500">
          New retailer?{' '}
          <Link to="/retailer/signup" className="font-semibold text-[#008f67] underline-offset-2 hover:underline">
            Create account
          </Link>
        </p>
      </section>
    </div>
  )
}

export default Login
