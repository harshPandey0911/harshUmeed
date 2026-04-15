import Card from '../components/Card'
import Header from '../components/Header'

const walletBalances = {
  total: '₹18,760',
  cashback: '₹2,140',
  vouchers: '₹980',
}

const cashbackStats = {
  earned: '₹4,120',
  used: '₹1,980',
  remaining: '₹2,140',
}

const vouchers = [
  {
    discount: '₹200 OFF',
    minOrder: 'Min. order ₹2,000',
    expiry: 'Expires on 28 Apr 2026',
    category: 'Grocery only',
  },
  {
    discount: '12% OFF',
    minOrder: 'Min. order ₹3,500',
    expiry: 'Expires on 02 May 2026',
    category: 'Snacks only',
  },
  {
    discount: '₹500 OFF',
    minOrder: 'Min. order ₹5,000',
    expiry: 'Expires on 10 May 2026',
    category: 'Oil & essentials',
  },
]

const transactions = [
  { title: 'Order Payment - ORD-3012', date: '15 Apr 2026, 10:42 AM', amount: '- ₹12,450', type: 'debit' },
  { title: 'Cashback Earned', date: '14 Apr 2026, 07:12 PM', amount: '+ ₹320', type: 'credit' },
  { title: 'Refund - ORD-2950', date: '13 Apr 2026, 03:26 PM', amount: '+ ₹1,200', type: 'credit' },
  { title: 'Voucher Redemption', date: '12 Apr 2026, 01:08 PM', amount: '- ₹200', type: 'debit' },
]

function Wallet() {
  return (
    <div className="space-y-4">
      <Header title="Wallet" subtitle="Manage credits and payments" />

      <section className="brand-gradient rounded-2xl p-5 text-white shadow-[0_10px_24px_rgba(0,168,119,0.24)]">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#d6f5ea]">Wallet Balance</p>
        <p className="mt-2 text-[30px] font-semibold leading-none tracking-[-0.01em]">{walletBalances.total}</p>
        <p className="mt-2 text-xs text-[#d6f5ea]">Updated 2 minutes ago</p>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <div className="rounded-2xl bg-white/14 p-3">
            <p className="text-[11px] text-[#d6f5ea]">Cashback Balance</p>
            <p className="mt-1 text-base font-semibold">{walletBalances.cashback}</p>
          </div>
          <div className="rounded-2xl bg-white/14 p-3">
            <p className="text-[11px] text-[#d6f5ea]">Voucher Balance</p>
            <p className="mt-1 text-base font-semibold">{walletBalances.vouchers}</p>
          </div>
        </div>
      </section>

      <Card className="p-4">
        <h3 className="section-title">Cashback Summary</h3>
        <p className="section-subtitle mt-1">Track earned vs used cashback</p>

        <div className="mt-4 grid grid-cols-3 gap-2">
          <div className="rounded-2xl bg-emerald-50 p-3">
            <p className="text-[11px] text-emerald-700">Earned</p>
            <p className="mt-1 text-sm font-semibold text-emerald-800">{cashbackStats.earned}</p>
          </div>
          <div className="rounded-2xl bg-rose-50 p-3">
            <p className="text-[11px] text-rose-700">Used</p>
            <p className="mt-1 text-sm font-semibold text-rose-800">{cashbackStats.used}</p>
          </div>
          <div className="rounded-2xl bg-[#e6f7f2] p-3">
            <p className="text-[11px] text-[#008f67]">Remaining</p>
            <p className="mt-1 text-sm font-semibold text-[#007a59]">{cashbackStats.remaining}</p>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <h3 className="section-title">Available Vouchers</h3>
            <p className="section-subtitle mt-1">Apply on eligible wholesale orders</p>
          </div>
        </div>

        <div className="space-y-3">
          {vouchers.map((voucher) => (
            <article key={`${voucher.discount}-${voucher.expiry}`} className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-[#111827]">{voucher.discount}</p>
                  <p className="mt-1 text-xs text-[#6b7280]">{voucher.minOrder}</p>
                </div>
                <button
                  type="button"
                  className="rounded-full border border-[#bde9dc] bg-white px-3 py-1.5 text-xs font-semibold text-[#008f67] transition hover:bg-[#e6f7f2]"
                >
                  Use Now
                </button>
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] text-slate-600">
                <span className="rounded-full bg-slate-200 px-2 py-1">{voucher.category}</span>
                <span>{voucher.expiry}</span>
              </div>
            </article>
          ))}
        </div>
      </Card>

      <Card className="p-4">
        <h3 className="section-title">Recent Transactions</h3>
        <p className="section-subtitle mt-1">Order, cashback, and refund activity</p>

        <div className="mt-4 space-y-3">
          {transactions.map((item) => (
            <article key={`${item.title}-${item.date}`} className="flex items-center justify-between rounded-2xl bg-slate-50 px-3 py-3">
              <div className="min-w-0 pr-3">
                <p className="truncate text-sm font-medium text-[#111827]">{item.title}</p>
                <p className="mt-1 text-xs text-[#6b7280]">{item.date}</p>
              </div>
              <span className={`text-sm font-semibold ${item.type === 'credit' ? 'text-emerald-600' : 'text-rose-600'}`}>
                {item.amount}
              </span>
            </article>
          ))}
        </div>
      </Card>
    </div>
  )
}

export default Wallet
