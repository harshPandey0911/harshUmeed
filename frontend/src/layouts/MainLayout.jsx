import { Outlet, useLocation } from 'react-router-dom'
import BottomNav from '../components/BottomNav'

function MainLayout() {
  const location = useLocation()

  return (
    <div className="min-h-dvh">
      <main className="screen-shell min-h-dvh pt-6 pb-[112px]">
        <div key={location.pathname} className="animate-[retailerPageFade_460ms_cubic-bezier(0.22,1,0.36,1)] will-change-transform">
          <Outlet />
        </div>
      </main>
      <BottomNav />
    </div>
  )
}

export default MainLayout
