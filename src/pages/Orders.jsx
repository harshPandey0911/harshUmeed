import Header from '../components/Header'
import { Link } from 'react-router-dom'
import { orderItems } from '../data/orders'

function formatCurrency(value) {
  return `₹${value.toLocaleString('en-IN')}`
}

function getStatusClasses(status) {
  if (status === 'Delivered') {
    return 'bg-emerald-50 text-emerald-700'
  }

  if (status === 'Out for delivery') {
    return 'bg-blue-50 text-blue-700'
  }

  return 'bg-amber-50 text-amber-700'
}

function Orders() {
  return (
    <div className="space-y-3 pb-2">
      <Header title="Orders" subtitle="Track all your wholesale orders" />

      <div className="space-y-3">
        {orderItems.map((item) => (
          <Link key={item.id} to={`/retailer/order/${item.id}`} className="block transition active:scale-[0.99]">
            <article className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-[0_8px_22px_rgba(17,24,39,0.08)] ring-1 ring-slate-200/70">
              <div className="h-[60px] w-[60px] shrink-0 overflow-hidden rounded-2xl bg-white ring-1 ring-slate-100">
                <img src={item.product.image} alt={item.product.name} className="h-full w-full object-contain" loading="lazy" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-[#111827]">{item.product.name}</p>
                <div className="mt-1 flex items-center gap-2 text-xs text-[#6b7280]">
                  <span className={`rounded-full px-2 py-1 font-semibold ${getStatusClasses(item.status)}`}>{item.status}</span>
                  <span>{item.date}</span>
                </div>
                <p className="mt-1 text-xs text-[#6b7280]">Order ID: {item.orderId}</p>
              </div>

              <div className="shrink-0 text-right">
                <p className="text-sm font-semibold text-[#111827]">{formatCurrency(item.product.price * item.product.quantity)}</p>
                <p className="mt-1 text-xs text-[#6b7280]">x{item.product.quantity}</p>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Orders
