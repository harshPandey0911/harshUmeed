import { Link, Navigate, useParams } from 'react-router-dom'
import Card from '../components/Card'
import Header from '../components/Header'
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

function OrderDetail() {
  const { id } = useParams()
  const item = orderItems.find((entry) => entry.id === id)

  if (!item) {
    return <Navigate to="/retailer/orders" replace />
  }

  const subtotal = item.product.price * item.product.quantity
  const total = subtotal + item.deliveryCharge

  return (
    <div className="space-y-4 pb-2">
      <Header
        title="Order Details"
        subtitle="Track itemized order and payment info"
        action={
          <Link
            to="/retailer/orders"
            className="rounded-full border border-[#bde9dc] bg-[#e6f7f2] px-3 py-2 text-xs font-semibold text-[#008f67]"
          >
            Back
          </Link>
        }
      />

      <Card className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-[#111827]">{item.orderId}</p>
            <p className="mt-1 text-xs text-[#6b7280]">Placed on {item.date}</p>
          </div>
          <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${getStatusClasses(item.status)}`}>
            {item.status}
          </span>
        </div>
      </Card>

      <Card className="p-4">
        <h3 className="section-title">Payment Info</h3>
        <div className="mt-3 space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-[#6b7280]">Payment method</span>
            <span className="font-medium text-[#111827]">{item.paymentType === 'COD' ? 'Cash on Delivery' : 'Online'}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#6b7280]">Payment status</span>
            <span className={`font-semibold ${item.paymentStatus === 'Paid' ? 'text-emerald-600' : 'text-amber-600'}`}>
              {item.paymentStatus}
            </span>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <h3 className="section-title">Product</h3>
        <div className="mt-3 flex items-center gap-3 rounded-2xl bg-slate-50 p-3">
          <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-white">
            <img src={item.product.image} alt={item.product.name} className="h-full w-full object-contain" loading="lazy" />
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-[#111827]">{item.product.name}</p>
            <p className="mt-1 text-xs text-[#6b7280]">Qty: {item.product.quantity}</p>
          </div>

          <p className="text-sm font-semibold text-[#008f67]">{formatCurrency(subtotal)}</p>
        </div>
      </Card>

      <Card className="p-4">
        <h3 className="section-title">Price Breakdown</h3>
        <div className="mt-3 space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-[#6b7280]">Subtotal</span>
            <span className="font-medium text-[#111827]">{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#6b7280]">Delivery charge</span>
            <span className="font-medium text-[#111827]">{formatCurrency(item.deliveryCharge)}</span>
          </div>
          <div className="mt-2 flex items-center justify-between border-t border-slate-200 pt-3">
            <span className="font-semibold text-[#111827]">Total amount</span>
            <span className="text-lg font-semibold text-[#111827]">{formatCurrency(total)}</span>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default OrderDetail
