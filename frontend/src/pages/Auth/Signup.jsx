import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      password: form.password,
    }

    if (!payload.name || !payload.email || !payload.password) {
      return
    }

    setSubmitting(true)

    setTimeout(() => {
      setSubmitting(false)
      setForm({ name: '', email: '', password: '' })
      navigate('/retailer/home')
    }, 500)
  }

  return (
    <div className="relative flex min-h-dvh items-center justify-center overflow-hidden px-2 py-4 sm:px-4 sm:py-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,#f2e8e1_0%,#ddd0c8_42%,#c4b4aa_100%)]" />
      <div className="absolute -left-24 top-20 h-64 w-64 rounded-full bg-[#323232]/14 blur-3xl" />
      <div className="absolute -right-24 bottom-6 h-64 w-64 rounded-full bg-[#4d4540]/16 blur-3xl" />

      <section className="relative z-10 w-full max-w-[340px] rounded-[30px] border border-[#9c8f87] bg-[#ddd0c8]/84 px-3 pb-7 pt-7 text-[#323232] shadow-[0_20px_55px_rgba(50,50,50,0.32)] backdrop-blur-md sm:max-w-md sm:rounded-[42px] sm:px-6 sm:pb-12 sm:pt-10">
        <p className="text-center text-[30px] font-semibold tracking-[0.08em] text-[#323232] sm:text-[50px]">UMEED</p>
        <h1 className="mt-3 text-center text-[26px] font-medium text-[#323232] sm:mt-6 sm:text-[43px]">Create Account</h1>

        <form className="mt-5 space-y-3.5 sm:mt-8 sm:space-y-5" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="mb-1.5 block text-[13px] text-[#4c4540] sm:text-[16px]">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Store owner name"
              value={form.name}
              onChange={handleChange}
              className="h-11 w-full rounded-[12px] border border-[#9f9189] bg-[#efe5df] px-3.5 text-[16px] text-[#323232] outline-none placeholder:text-[#7b706a] focus:border-[#323232] sm:h-14 sm:rounded-[15px] sm:px-4 sm:text-[22px]"
              autoComplete="name"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-1.5 block text-[13px] text-[#4c4540] sm:text-[16px]">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="example@gmail.com"
              value={form.email}
              onChange={handleChange}
              className="h-11 w-full rounded-[12px] border border-[#9f9189] bg-[#efe5df] px-3.5 text-[16px] text-[#323232] outline-none placeholder:text-[#7b706a] focus:border-[#323232] sm:h-14 sm:rounded-[15px] sm:px-4 sm:text-[22px]"
              autoComplete="email"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-1.5 block text-[13px] text-[#4c4540] sm:text-[16px]">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Create a strong password"
              value={form.password}
              onChange={handleChange}
              className="h-11 w-full rounded-[12px] border border-[#9f9189] bg-[#efe5df] px-3.5 text-[16px] text-[#323232] outline-none placeholder:text-[#7b706a] focus:border-[#323232] sm:h-14 sm:rounded-[15px] sm:px-4 sm:text-[22px]"
              autoComplete="new-password"
              required
            />
          </div>

          <button
            type="submit"
            className="mt-1 h-11 w-full rounded-[12px] border border-[#323232] bg-gradient-to-r from-[#323232] to-[#46403b] text-[18px] font-semibold tracking-[0.04em] text-[#f2ebe6] shadow-[0_10px_24px_rgba(50,50,50,0.35)] sm:h-14 sm:rounded-[15px] sm:text-[24px] sm:tracking-[0.06em]"
            disabled={submitting}
          >
            {submitting ? 'Creating...' : 'Sign Up'}
          </button>
        </form>

        <p className="mt-7 text-center text-[15px] text-[#4c4540] sm:mt-14 sm:text-[18px]">
          Already have an account ?{' '}
          <Link to="/retailer/auth" className="font-semibold text-[#323232] underline-offset-4 hover:underline">
            Login
          </Link>
        </p>
      </section>
    </div>
  )
}

export default Signup
