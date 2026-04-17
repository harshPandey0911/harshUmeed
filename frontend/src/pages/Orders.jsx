import { Link, useNavigate } from 'react-router-dom'
import { orderItems } from '../data/orders'

function formatCurrency(value) {
  return `₹${value.toLocaleString('en-IN')}`
}

function getStatusClasses(status) {
  if (status === 'Delivered') {
    return 'bg-[#e6dad2] text-[#323232]'
  }

  if (status === 'Out for delivery') {
    return 'bg-[#e6dad2] text-[#323232]'
  }

  return 'bg-[#e6dad2] text-[#323232]'
}

function Orders() {
  const navigate = useNavigate()

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
        <h1 className="text-[17px] font-semibold">Orders</h1>
      </header>

      <section className="border-b border-[#bcaea6] bg-[#ddd0c8] px-3 py-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-[#323232]">Retailer Orders</p>
            <p className="mt-0.5 text-xs text-[#5f5651]">Track all your wholesale orders</p>
          </div>
          <div className="rounded-md border border-[#323232] bg-[#f8f4f1] px-2 py-1 text-[11px] font-semibold text-[#323232]">
            {orderItems.length} items
          </div>
        </div>
      </section>

      <div className="space-y-2 px-3 py-3">
        {orderItems.map((item) => (
          <Link key={item.id} to={`/retailer/order/${item.id}`} className="block transition active:scale-[0.99]">
            <article className="flex items-center gap-3 rounded-[14px] border border-[#cec0b7] bg-[#e9ddd6] p-3 shadow-[0_8px_18px_rgba(50,50,50,0.14)]">
              <div className="h-[58px] w-[58px] shrink-0 overflow-hidden rounded-xl bg-[#efe5df] ring-1 ring-[#d2c5bd]">
                <img src={item.product.image} alt={item.product.name} className="h-full w-full object-contain" loading="lazy" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-semibold text-[#323232]">{item.product.name}</p>
                <div className="mt-1 flex items-center gap-2 text-[11px] text-[#5f5651]">
                  <span className={`rounded-full px-2 py-1 font-semibold ${getStatusClasses(item.status)}`}>{item.status}</span>
                  <span>{item.date}</span>
                </div>
                <p className="mt-1 text-[11px] text-[#6b625d]">Order ID: {item.orderId}</p>
              </div>

              <div className="shrink-0 text-right">
                <p className="text-[13px] font-semibold text-[#323232]">{formatCurrency(item.product.price * item.product.quantity)}</p>
                <p className="mt-1 text-[11px] text-[#6b625d]">x{item.product.quantity}</p>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Orders
