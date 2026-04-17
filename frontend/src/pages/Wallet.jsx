import { useNavigate } from 'react-router-dom'

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
        <h1 className="text-[17px] font-semibold">Wallet</h1>
      </header>

      <section className="border-b border-[#bcaea6] bg-[#ddd0c8] px-3 py-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-[#323232]">Retailer Wallet</p>
            <p className="mt-0.5 text-xs text-[#5f5651]">Umeed Retail Store</p>
          </div>
          <div className="text-right">
            <p className="text-[22px] font-semibold text-[#323232]">{walletBalances.total}</p>
            <p className="text-xs text-[#5f5651]">Updated 2 min ago</p>
          </div>
        </div>
      </section>

      <section className="space-y-3 px-3 py-3">
        <article className="rounded-[14px] border border-[#cec0b7] bg-[#e9ddd6] p-3 shadow-[0_8px_18px_rgba(50,50,50,0.14)]">
          <h3 className="text-sm font-semibold text-[#1f1f1f]">Balance Summary</h3>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <div className="rounded-xl bg-[#efe5df] p-3">
              <p className="text-[11px] text-[#5f5651]">Cashback Balance</p>
              <p className="mt-1 text-base font-semibold text-[#1c1c1c]">{walletBalances.cashback}</p>
            </div>
            <div className="rounded-xl bg-[#efe5df] p-3">
              <p className="text-[11px] text-[#666]">Voucher Balance</p>
              <p className="mt-1 text-base font-semibold text-[#1c1c1c]">{walletBalances.vouchers}</p>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-3 gap-2">
            <div className="rounded-lg border border-[#d2c5bd] bg-[#efe5df] p-2">
              <p className="text-[10px] text-[#5f5651]">Earned</p>
              <p className="mt-1 text-xs font-semibold text-[#1b1b1b]">{cashbackStats.earned}</p>
            </div>
            <div className="rounded-lg border border-[#d2c5bd] bg-[#efe5df] p-2">
              <p className="text-[10px] text-[#5f5651]">Used</p>
              <p className="mt-1 text-xs font-semibold text-[#1b1b1b]">{cashbackStats.used}</p>
            </div>
            <div className="rounded-lg border border-[#d2c5bd] bg-[#efe5df] p-2">
              <p className="text-[10px] text-[#5f5651]">Remaining</p>
              <p className="mt-1 text-xs font-semibold text-[#1b1b1b]">{cashbackStats.remaining}</p>
            </div>
          </div>
        </article>

        <article className="rounded-[14px] border border-[#cec0b7] bg-[#e9ddd6] p-3 shadow-[0_8px_18px_rgba(50,50,50,0.14)]">
          <h3 className="text-sm font-semibold text-[#1f1f1f]">Available Vouchers</h3>
          <p className="mt-0.5 text-xs text-[#727272]">Apply on eligible wholesale orders</p>

          <div className="mt-3 space-y-2">
            {vouchers.map((voucher) => (
              <article key={`${voucher.discount}-${voucher.expiry}`} className="rounded-xl border border-[#d2c5bd] bg-[#efe5df] p-2.5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[13px] font-semibold text-[#1c1c1c]">{voucher.discount}</p>
                    <p className="mt-0.5 text-xs text-[#666]">{voucher.minOrder}</p>
                  </div>
                  <button
                    type="button"
                    className="rounded-full bg-[#323232] px-3 py-1 text-[10px] font-semibold text-white"
                  >
                    Use
                  </button>
                </div>

                <div className="mt-2 flex flex-wrap items-center gap-2 text-[10px] text-[#6d6d6d]">
                  <span className="rounded-full bg-[#e4d7cf] px-2 py-0.5">{voucher.category}</span>
                  <span>{voucher.expiry}</span>
                </div>
              </article>
            ))}
          </div>
        </article>

        <article className="rounded-[14px] border border-[#cec0b7] bg-[#e9ddd6] p-3 shadow-[0_8px_18px_rgba(50,50,50,0.14)]">
          <h3 className="text-sm font-semibold text-[#1f1f1f]">Recent Transactions</h3>
          <div className="mt-2 space-y-2">
            {transactions.map((item) => (
              <article key={`${item.title}-${item.date}`} className="flex items-center justify-between rounded-xl bg-[#efe5df] px-3 py-2">
                <div className="min-w-0 pr-3">
                  <p className="truncate text-xs font-medium text-[#1f1f1f]">{item.title}</p>
                  <p className="mt-0.5 text-[11px] text-[#757575]">{item.date}</p>
                </div>
                <span className={`text-xs font-semibold ${item.type === 'credit' ? 'text-[#323232]' : 'text-[#a64b4b]'}`}>
                  {item.amount}
                </span>
              </article>
            ))}
          </div>
        </article>
      </section>
    </div>
  )
}

export default Wallet
