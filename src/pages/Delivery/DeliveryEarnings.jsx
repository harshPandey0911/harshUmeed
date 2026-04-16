import Card from '../../components/Card'
import Header from '../../components/Header'
import {
  deliveryOrders,
  calculateCommission,
  calculateDeliveryCharge,
  calculateNetEarning,
  getCommissionRate,
  formatCurrency,
} from '../../data/deliveryData'

function DeliveryEarnings() {
  const settledOrders = deliveryOrders.filter((item) => item.status === 'Delivered' && item.decision === 'Accepted')

  const totals = settledOrders.reduce(
    (acc, order) => {
      const deliveryCharge = calculateDeliveryCharge(order.distanceKm)
      const commission = calculateCommission(order.orderValue)
      const net = calculateNetEarning(order)

      return {
        deliveryCharge: acc.deliveryCharge + deliveryCharge,
        commission: acc.commission + commission,
        net: acc.net + net,
      }
    },
    { deliveryCharge: 0, commission: 0, net: 0 },
  )

  return (
    <div className="space-y-4">
      <Header title="Earnings" subtitle="Delivery charges and commission tracking" />

      <section className="brand-gradient rounded-2xl p-5 text-white shadow-[0_10px_24px_rgba(0,168,119,0.24)]">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#d6f5ea]">Net Payout</p>
        <p className="mt-2 text-[30px] font-semibold leading-none tracking-[-0.01em]">{formatCurrency(totals.net)}</p>
        <p className="mt-2 text-xs text-[#d6f5ea]">Formula: (Rs 5/km delivery charge) - (2% or 1% commission)</p>
      </section>

      <div className="grid grid-cols-3 gap-2">
        <Card className="p-3">
          <p className="text-[11px] uppercase tracking-wide text-slate-500">Delivery Charges</p>
          <p className="mt-1 text-base font-semibold text-emerald-700">{formatCurrency(totals.deliveryCharge)}</p>
        </Card>
        <Card className="p-3">
          <p className="text-[11px] uppercase tracking-wide text-slate-500">Commission</p>
          <p className="mt-1 text-base font-semibold text-rose-600">-{formatCurrency(totals.commission).replace('Rs ', 'Rs ')}</p>
        </Card>
        <Card className="p-3">
          <p className="text-[11px] uppercase tracking-wide text-slate-500">Settled Orders</p>
          <p className="mt-1 text-base font-semibold text-slate-800">{settledOrders.length}</p>
        </Card>
      </div>

      <Card>
        <h3 className="section-title">Commission Tracking</h3>
        <p className="section-subtitle mt-1">2% on orders up to Rs 2,000 and 1% above Rs 2,000</p>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="border-b border-emerald-100 bg-emerald-50">
              <tr>
                <th className="px-3 py-2.5 font-semibold text-emerald-800">Order</th>
                <th className="px-3 py-2.5 font-semibold text-emerald-800">Distance</th>
                <th className="px-3 py-2.5 font-semibold text-emerald-800">Delivery Charge</th>
                <th className="px-3 py-2.5 font-semibold text-emerald-800">Commission</th>
                <th className="px-3 py-2.5 font-semibold text-emerald-800">Net</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-100">
              {settledOrders.map((order) => {
                const deliveryCharge = calculateDeliveryCharge(order.distanceKm)
                const commission = calculateCommission(order.orderValue)
                const net = calculateNetEarning(order)
                const commissionRate = getCommissionRate(order.orderValue)

                return (
                  <tr key={order.id}>
                    <td className="px-3 py-3 text-slate-700">{order.orderId}</td>
                    <td className="px-3 py-3 text-slate-700">{order.distanceKm} km</td>
                    <td className="px-3 py-3 font-medium text-emerald-700">{formatCurrency(deliveryCharge)}</td>
                    <td className="px-3 py-3 text-rose-600">-{formatCurrency(commission)} ({Math.round(commissionRate * 100)}%)</td>
                    <td className="px-3 py-3 font-semibold text-slate-800">{formatCurrency(net)}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}

export default DeliveryEarnings
