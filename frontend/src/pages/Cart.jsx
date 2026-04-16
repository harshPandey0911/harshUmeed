import Card from '../components/Card'
import Header from '../components/Header'
import useCart from '../hooks/useCart'

function formatCurrency(value) {
  return `₹${value.toLocaleString('en-IN')}`
}

function Cart() {
  const { cartItems, totalPrice, increaseQuantity, decreaseQuantity, removeItem } = useCart()

  return (
    <div className="space-y-4 pb-2">
      <Header title="Cart" subtitle="Review items before checkout" />

      {cartItems.length === 0 ? (
        <Card className="p-5 text-center">
          <p className="text-sm font-medium text-[#111827]">Your cart is empty</p>
          <p className="mt-1 text-xs text-[#6b7280]">Add products from Home to create your order.</p>
        </Card>
      ) : (
        <>
          <Card className="p-4">
            <h3 className="section-title">Cart Items</h3>
            <div className="mt-3 space-y-3">
              {cartItems.map((item) => (
                <article key={item.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-[#111827]">{item.name}</p>
                      <p className="mt-1 text-xs text-[#6b7280]">{formatCurrency(item.price)} each</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="rounded-full border border-rose-200 px-2 py-1 text-[11px] font-semibold text-rose-600 transition hover:bg-rose-50"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => decreaseQuantity(item.id)}
                        className="h-7 w-7 rounded-full border border-slate-300 bg-white text-sm font-semibold text-slate-700 transition active:scale-95"
                        aria-label={`Decrease quantity of ${item.name}`}
                      >
                        -
                      </button>
                      <span className="min-w-6 text-center text-sm font-semibold text-[#111827]">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => increaseQuantity(item.id)}
                        className="h-7 w-7 rounded-full border border-slate-300 bg-white text-sm font-semibold text-slate-700 transition active:scale-95"
                        aria-label={`Increase quantity of ${item.name}`}
                      >
                        +
                      </button>
                    </div>

                    <p className="text-sm font-semibold text-[#008f67]">{formatCurrency(item.price * item.quantity)}</p>
                  </div>
                </article>
              ))}
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-[#6b7280]">Total Price</p>
              <p className="text-lg font-semibold tracking-[-0.01em] text-[#111827]">{formatCurrency(totalPrice)}</p>
            </div>
            <button type="button" className="primary-btn mt-4">
              Proceed to Checkout
            </button>
          </Card>
        </>
      )}
    </div>
  )
}

export default Cart
