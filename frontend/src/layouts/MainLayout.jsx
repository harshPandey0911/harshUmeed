import { Outlet, useLocation } from 'react-router-dom'
import BottomNav from '../components/BottomNav'

function MainLayout() {
  const location = useLocation()
  const isRetailerRoute = location.pathname.startsWith('/retailer')

  return (
    <div className={`min-h-dvh ${isRetailerRoute ? 'bg-[#ddd0c8]' : ''}`}>
      <main
        className={
          isRetailerRoute
            ? 'mx-auto min-h-dvh w-full max-w-md pb-[118px]'
            : 'screen-shell min-h-dvh pt-6 pb-[112px]'
        }
      >
        <div key={location.pathname} className="animate-[retailerPageFade_460ms_cubic-bezier(0.22,1,0.36,1)] will-change-transform">
          <Outlet />
        </div>
      </main>
      <BottomNav />
    </div>
  )
}

export default MainLayout
