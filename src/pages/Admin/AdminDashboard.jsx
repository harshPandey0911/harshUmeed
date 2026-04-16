import { Link } from 'react-router-dom'

const kpiCards = [
  { title: 'Total Revenue', value: 'Rs 45,231', delta: '+12.5%', icon: '' },
  { title: 'Total Orders', value: '451', delta: '+5.2%', icon: '' },
  { title: 'Active Retailers', value: '2,543', delta: '+8.1%', icon: '' },
  { title: 'Avg Revenue', value: 'Rs 1,240', delta: '+3.8%', icon: '' },
]

const recentOrders = [
  { id: '1001', retailer: 'Sharma Retail', amount: 'Rs 2,450', status: 'Completed', date: '2 hours ago' },
  { id: '1002', retailer: 'Patel Store', amount: 'Rs 1,850', status: 'Pending', date: '4 hours ago' },
  { id: '1003', retailer: 'Gupta Enterprises', amount: 'Rs 3,200', status: 'Completed', date: '6 hours ago' },
  { id: '1004', retailer: 'Kumar Distribution', amount: 'Rs 950', status: 'Pending', date: '8 hours ago' },
]

const quickModules = [
  { title: 'Retailer Management', path: '/admin/retailers', icon: '' },
  { title: 'Delivery Partners', path: '/admin/delivery-partners', icon: '' },
  { title: 'Product Pricing', path: '/admin/products-pricing', icon: '' },
  { title: 'Order Management', path: '/admin/order-management', icon: '' },
  { title: 'Commission', path: '/admin/commission', icon: '' },
  { title: 'Cashback & Voucher', path: '/admin/cashback-voucher', icon: '' },
  { title: 'Wallet System', path: '/admin/wallet-system', icon: '' },
  { title: 'Payments & Reports', path: '/admin/payments-reports', icon: '' },
]

function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* KPI Cards Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpiCards.map((card) => (
          <div key={card.title} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-gray-600">{card.title}</p>
                <p className="mt-2 text-xl font-semibold text-gray-700">{card.value}</p>
              </div>
              <span className="text-2xl">{card.icon}</span>
            </div>
            <p className="mt-3 inline-block rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-700">{card.delta}</p>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Revenue Trend */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-base font-semibold text-gray-700">Revenue Trend</h2>
          <p className="mt-1 text-sm text-gray-600">Last 7 days performance</p>
          <div className="mt-6">
            <svg viewBox="0 0 680 260" className="h-56 w-full" aria-hidden="true">
              <defs>
                <linearGradient id="gradientFill" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#2563eb', stopOpacity: 0.1 }} />
                  <stop offset="100%" style={{ stopColor: '#2563eb', stopOpacity: 0 }} />
                </linearGradient>
              </defs>
              {/* Grid lines */}
              {[20, 120, 220, 320, 420, 520, 640].map((x) => (
                <line key={`grid-${x}`} x1={x} y1="10" x2={x} y2="230" stroke="#e5e7eb" strokeWidth="1" />
              ))}
              {/* Main line */}
              <polyline points="20,220 120,170 220,185 320,130 420,85 520,65 640,58" fill="none" stroke="#2563eb" strokeWidth="3" strokeLinejoin="round" />
              {/* Points */}
              {[
                [20, 220],
                [120, 170],
                [220, 185],
                [320, 130],
                [420, 85],
                [520, 65],
                [640, 58],
              ].map(([x, y], idx) => (
                <circle key={`point-${idx}`} cx={x} cy={y} r="5" fill="#2563eb" stroke="#ffffff" strokeWidth="2" />
              ))}
            </svg>
          </div>
        </div>

        {/* Top Retailers */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-base font-semibold text-gray-700">Top Retailers</h2>
          <p className="mt-1 text-sm text-gray-600">By monthly sales volume</p>
          <div className="mt-6 space-y-4">
            {[
              { name: 'Sharma Retail', sales: 'Rs 45,231', progress: 92 },
              { name: 'Patel Store', sales: 'Rs 38,450', progress: 78 },
              { name: 'Gupta Enterprises', sales: 'Rs 32,120', progress: 65 },
            ].map((retailer, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-700">{retailer.name}</p>
                  <p className="text-sm font-semibold text-gray-700">{retailer.sales}</p>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-200">
                  <div className="h-2 rounded-full bg-blue-500" style={{ width: `${retailer.progress}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-semibold text-gray-700">Recent Orders</h2>
            <p className="mt-1 text-sm text-gray-600">Latest transactions from retailers</p>
          </div>
          <button className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            View All
          </button>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-4 py-3 font-semibold text-gray-700">Order ID</th>
                <th className="px-4 py-3 font-semibold text-gray-700">Retailer</th>
                <th className="px-4 py-3 font-semibold text-gray-700">Amount</th>
                <th className="px-4 py-3 font-semibold text-gray-700">Status</th>
                <th className="px-4 py-3 font-semibold text-gray-700">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-700">{order.id}</td>
                  <td className="px-4 py-3 text-gray-700">{order.retailer}</td>
                  <td className="px-4 py-3 font-semibold text-gray-700">{order.amount}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                      order.status === 'Completed'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Management Control Center */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-base font-semibold text-gray-700">Management Control Center</h2>
          <p className="mt-1 text-sm text-gray-600">Quick access to key management modules</p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {quickModules.map((module) => (
            <Link
              key={module.title}
              to={module.path}
              className="group rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-center text-sm font-medium text-gray-700 transition hover:bg-white hover:border-gray-400"
            >
              <p className="text-lg mb-1">{module.icon}</p>
              {module.title}
            </Link>
          ))}
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="text-base font-semibold text-gray-700">Incentive & Target System</h3>
          <ul className="mt-4 space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-blue-500"></span>
              Monthly target setup with slabs from Rs 2L to Rs 5L
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-blue-500"></span>
              Performance tracking against assigned target
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-blue-500"></span>
              Gift point management and expiry controls
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-blue-500"></span>
              Rewards and gift distribution approval workflow
            </li>
          </ul>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="text-base font-semibold text-gray-700">Network Commission Engine</h3>
          <ul className="mt-4 space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-blue-500"></span>
              Multi-level referral tree view with role-based expansion
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-blue-500"></span>
              Commission distribution logic for 3-level and unlimited models
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-blue-500"></span>
              Role-based split policy with live formula preview
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-blue-500"></span>
              Payout transparency through downloadable reports
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
