import { Link } from 'react-router-dom'
import Card from '../../components/Card'
import Header from '../../components/Header'
import {
  deliveryOrders,
  calculateNetEarning,
  formatCurrency,
} from '../../data/deliveryData'

function metricValue(label, value) {
  return (
    <article className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-3">
      <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-emerald-700">{label}</p>
      <p className="mt-1 text-lg font-semibold text-emerald-900">{value}</p>
    </article>
  )
}

function DeliveryHome() {
  const assignedCount = deliveryOrders.filter((item) => item.status === 'Assigned' && item.decision === 'Pending').length
  const activeCount = deliveryOrders.filter((item) => item.status === 'Picked').length
  const deliveredCount = deliveryOrders.filter((item) => item.status === 'Delivered').length

  const deliveredEarnings = deliveryOrders
    .filter((item) => item.status === 'Delivered' && item.decision === 'Accepted')
    .reduce((sum, item) => sum + calculateNetEarning(item), 0)

  return (
    <div className="space-y-4">
      <Header title="Delivery Dashboard" subtitle="Orders, earnings, and targets at one place" />

      <section className="brand-gradient rounded-2xl p-5 text-white shadow-[0_10px_24px_rgba(0,168,119,0.24)]">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#d6f5ea]">Today Snapshot</p>
        <p className="mt-2 text-[28px] font-semibold leading-none tracking-[-0.01em]">{formatCurrency(deliveredEarnings)}</p>
        <p className="mt-2 text-xs text-[#d6f5ea]">Net earning from completed drops</p>

        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
          <div className="rounded-2xl bg-white/15 p-2.5">
            <p className="text-[11px] text-[#d6f5ea]">Assigned</p>
            <p className="mt-1 text-sm font-semibold text-white">{assignedCount}</p>
          </div>
          <div className="rounded-2xl bg-white/15 p-2.5">
            <p className="text-[11px] text-[#d6f5ea]">Picked</p>
            <p className="mt-1 text-sm font-semibold text-white">{activeCount}</p>
          </div>
          <div className="rounded-2xl bg-white/15 p-2.5">
            <p className="text-[11px] text-[#d6f5ea]">Delivered</p>
            <p className="mt-1 text-sm font-semibold text-white">{deliveredCount}</p>
          </div>
        </div>
      </section>

      <Card>
        <h3 className="section-title">Quick Access</h3>
        <p className="section-subtitle mt-1">Use these sections to complete your daily run</p>

        <div className="mt-4 grid gap-2 sm:grid-cols-3">
          <Link to="/delivery/orders" className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-800">
            Manage Orders
          </Link>
          <Link to="/delivery/earnings" className="rounded-xl border border-emerald-200 bg-white px-3 py-2 text-sm font-semibold text-emerald-700">
            Earnings & Commission
          </Link>
          <Link to="/delivery/performance" className="rounded-xl border border-emerald-200 bg-white px-3 py-2 text-sm font-semibold text-emerald-700">
            Performance Tracker
          </Link>
        </div>
      </Card>

      <Card>
        <h3 className="section-title">Performance Highlights</h3>
        <div className="mt-4 grid gap-2 sm:grid-cols-3">
          {metricValue('Daily Target', 'Rs 1,800')}
          {metricValue('Target Achieved', `${Math.min(100, Math.round((deliveredEarnings / 1800) * 100))}%`)}
          {metricValue('This Month', 'Rs 31,420')}
        </div>
      </Card>
    </div>
  )
}

export default DeliveryHome
