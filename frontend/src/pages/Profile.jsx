import { useLocation, useNavigate } from 'react-router-dom'

function Profile() {
  const navigate = useNavigate()
  const location = useLocation()
  const isDeliveryRoute = location.pathname.startsWith('/delivery')

  const handleLogout = () => {
    if (isDeliveryRoute) {
      localStorage.removeItem('umeed-delivery-auth')
      navigate('/delivery/auth', { replace: true })
      return
    }

    navigate('/retailer/auth', { replace: true })
  }

  return (
    <div className="bg-[#e9ddd6] pb-28">
      <header className="sticky top-0 z-30 flex h-[54px] items-center gap-2 bg-[#323232] px-3 text-white shadow-sm">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="grid h-8 w-8 place-items-center rounded-full text-[22px] font-light text-[#ddd0c8]"
          aria-label="Go back"
        >
          ‹
        </button>
        <h1 className="text-[17px] font-semibold">Profile</h1>
      </header>

      <section className="border-b border-[#bcaea6] bg-[#ddd0c8] px-3 py-3">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-sm font-medium text-[#323232]">{isDeliveryRoute ? 'Delivery Partner' : 'Retailer Account'}</p>
            <p className="mt-0.5 truncate text-xs text-[#5f5651]">
              {isDeliveryRoute ? 'delivery.partner@umeed.com' : 'retailer.partner@umeed.com'}
            </p>
          </div>
          <div className="grid h-11 w-11 place-items-center rounded-full bg-[#f8f4f1] text-sm font-bold text-[#323232]">
            {isDeliveryRoute ? 'DP' : 'UR'}
          </div>
        </div>
      </section>

      <section className="space-y-3 px-3 py-3">
        <article className="rounded-[14px] border border-[#cec0b7] bg-[#e9ddd6] p-3 shadow-[0_8px_18px_rgba(50,50,50,0.14)]">
          <h2 className="text-sm font-semibold text-[#1f1f1f]">Account Details</h2>
          <div className="mt-3 space-y-2 text-sm">
            <div className="flex items-center justify-between rounded-lg bg-[#efe5df] px-3 py-2">
              <span className="text-[#666]">{isDeliveryRoute ? 'Partner Name' : 'Store Name'}</span>
              <span className="text-right text-[13px] font-medium text-[#1f1f1f]">{isDeliveryRoute ? 'Umeed Delivery Partner' : 'Umeed Retail Store'}</span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-[#efe5df] px-3 py-2">
              <span className="text-[#666]">{isDeliveryRoute ? 'Partner ID' : 'Store ID'}</span>
              <span className="font-medium text-[#1f1f1f]">{isDeliveryRoute ? 'DP-44712' : 'RT-90817'}</span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-[#efe5df] px-3 py-2">
              <span className="text-[#666]">City</span>
              <span className="font-medium text-[#1f1f1f]">Lahore</span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-[#efe5df] px-3 py-2">
              <span className="text-[#666]">Tier</span>
              <span className="rounded-full bg-[#e6dad2] px-2 py-1 text-[11px] font-semibold text-[#323232]">Gold Partner</span>
            </div>
          </div>
        </article>

        <button
          type="button"
          onClick={handleLogout}
          className="w-full rounded-[12px] border border-[#323232] bg-[#323232] py-2.5 text-sm font-semibold text-[#ddd0c8]"
        >
          Logout
        </button>
      </section>
    </div>
  )
}

export default Profile
