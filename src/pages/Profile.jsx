import Card from '../components/Card'
import Header from '../components/Header'
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
    <div>
      <Header title="Profile" subtitle={isDeliveryRoute ? 'Delivery partner account details' : 'Retailer account details'} />

      <Card className="mb-4">
        <div className="flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-2xl brand-gradient text-sm font-bold text-white">
            {isDeliveryRoute ? 'DP' : 'UR'}
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">{isDeliveryRoute ? 'Umeed Delivery Partner' : 'Umeed Retail Store'}</p>
            <p className="text-xs text-slate-500">{isDeliveryRoute ? 'delivery.partner@umeed.com' : 'retailer.partner@umeed.com'}</p>
          </div>
        </div>
      </Card>

      <Card>
        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-slate-500">{isDeliveryRoute ? 'Partner ID' : 'Store ID'}</span>
            <span className="font-medium text-slate-900">{isDeliveryRoute ? 'DP-44712' : 'RT-90817'}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500">City</span>
            <span className="font-medium text-slate-900">Lahore</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Tier</span>
            <span className="rounded-full bg-amber-100 px-2 py-1 text-[11px] font-semibold text-amber-700">Gold Partner</span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="mt-5 w-full rounded-xl border border-[#bde9dc] bg-[#e6f7f2] px-4 py-2.5 text-sm font-semibold text-[#008f67] transition hover:bg-[#d8f2e9]"
        >
          Logout
        </button>
      </Card>
    </div>
  )
}

export default Profile
