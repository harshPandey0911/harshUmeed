import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import useCart from '../hooks/useCart'

function formatCurrency(value) {
  return `₹${value.toLocaleString('en-IN')}`
}

function getSellerForItem(item, index) {
  const sellerPool = [
    {
      id: 'seller-a',
      name: 'Ratnashil Online service Pvt.Ltd',
      badge: 'PIKPART.com',
      color: 'text-[#ef7d00]',
    },
    {
      id: 'seller-b',
      name: 'Hero Seller',
      badge: 'Hero',
      color: 'text-[#e11d2f]',
    },
  ]

  const charTotal = item.id.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0)
  return sellerPool[(charTotal + index) % sellerPool.length]
}

function getMrp(price) {
  return Math.round(price * 1.8)
}

function Cart() {
  const navigate = useNavigate()
  const { cartItems, totalPrice, increaseQuantity, decreaseQuantity, removeItem } = useCart()

  const sellerGroups = useMemo(() => {
    return cartItems.reduce((groups, item, index) => {
      const seller = getSellerForItem(item, index)
      const existingGroup = groups.find((group) => group.id === seller.id)

      if (existingGroup) {
        existingGroup.items.push(item)
      } else {
        groups.push({ ...seller, items: [item] })
      }

      return groups
    }, [])
  }, [cartItems])

  const priceBreakup = useMemo(() => {
    const listPrice = cartItems.reduce((sum, item) => sum + getMrp(item.price) * item.quantity, 0)
    const discount = Math.max(listPrice - totalPrice, 0)
    const shipping = totalPrice > 0 ? Math.max(Math.round(totalPrice * 0.045), 45) : 0
    const totalPayable = totalPrice + shipping

    return {
      totalItems: cartItems.reduce((sum, item) => sum + item.quantity, 0),
      listPrice,
      discount,
      shipping,
      totalPayable,
    }
  }, [cartItems, totalPrice])

  return (
    <div className="-mx-4 min-h-dvh bg-[#e9ddd6] pb-28">
      <header className="sticky top-0 z-20 flex h-20 items-center gap-2 bg-[#323232] px-4 shadow-sm">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="grid h-9 w-9 place-items-center rounded-full text-[26px] font-light leading-none text-[#ddd0c8]"
          aria-label="Go back"
        >
          ‹
        </button>
        <h1 className="text-[22px] font-semibold text-white">Checkout</h1>
      </header>

      {cartItems.length === 0 ? (
        <section className="px-4 py-6">
          <article className="rounded-2xl bg-white p-5 text-center shadow-[0_4px_12px_rgba(15,23,42,0.08)]">
            <p className="text-sm font-semibold text-[#111827]">Your checkout is empty</p>
            <p className="mt-1 text-xs text-[#6b7280]">Add products from Home to continue.</p>
          </article>
        </section>
      ) : (
        <>
          <section className="bg-white px-4 py-4">
            <h2 className="text-[40px] leading-none text-[#111111]">Deliver to :</h2>
            <div className="mt-3 space-y-1 text-[#171717]">
              <div className="flex items-center gap-2">
                <p className="text-[40px] font-semibold">Smart Workshop</p>
                <span className="rounded-[3px] bg-[#e8e8e8] px-2 py-1 text-[40px] font-semibold text-[#6d6d6d]">HOME</span>
              </div>
              <p className="text-[34px]">Ramesh Sharma &nbsp; 959595526</p>
              <p className="text-[34px]">989, Sector-9 Faridabad Haryana 121006</p>
              <p className="text-[34px]">GISTIN - DDFDFDF4545DF5</p>
            </div>
          </section>

          <section className="space-y-4 px-3 py-4">
            {sellerGroups.map((group) => (
              <article key={group.id} className="space-y-3">
                <div className="flex items-center gap-2 px-1">
                  <span className="grid h-6 w-6 place-items-center rounded-md border border-slate-400 text-[12px]">⌂</span>
                  <h3 className="text-[14px] font-semibold text-[#222]">{group.name}</h3>
                </div>

                <div className="space-y-2">
                  {group.items.map((item) => {
                    const mrp = getMrp(item.price)
                    const discountPercent = Math.max(Math.round(((mrp - item.price) / mrp) * 100), 1)

                    return (
                      <div
                        key={item.id}
                        className="overflow-hidden rounded-xl border border-[#d8d8d8] bg-white shadow-[0_2px_6px_rgba(15,23,42,0.07)]"
                      >
                        <div className="inline-flex rounded-br-xl bg-[#efefef] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.02em]">
                          <span className={group.color}>{group.badge}</span>
                        </div>

                        <div className="grid grid-cols-[88px_1fr_auto] gap-3 px-3 pb-2">
                          <div className="h-[74px] w-[88px] overflow-hidden rounded-lg bg-[#f4f4f4]">
                            <img
                              src={item.image || 'https://via.placeholder.com/120'}
                              alt={item.name}
                              className="h-full w-full object-contain"
                              onError={(event) => {
                                event.currentTarget.onerror = null
                                event.currentTarget.src = 'https://via.placeholder.com/120'
                              }}
                            />
                          </div>

                          <div className="min-w-0 pt-0.5">
                            <p className="truncate text-[32px] font-semibold leading-6 text-[#151515]">{item.name}</p>
                            <p className="truncate text-[24px] font-semibold uppercase text-[#767676]">{item.id.slice(0, 11)}</p>

                            <div className="mt-1 flex items-center gap-2 text-[18px]">
                              <span className="text-[#afafaf] line-through">{formatCurrency(mrp)}</span>
                              <span className="font-bold text-[#151515]">{formatCurrency(item.price)}</span>
                              <span className="font-bold text-[#323232]">{discountPercent}% OFF</span>
                            </div>

                            <div className="mt-1 inline-flex items-center overflow-hidden rounded-[10px] bg-[#323232] text-white">
                              <button
                                type="button"
                                onClick={() => decreaseQuantity(item.id)}
                                className="grid h-8 w-8 place-items-center text-[28px] leading-none"
                                aria-label={`Decrease quantity of ${item.name}`}
                              >
                                −
                              </button>
                              <span className="min-w-9 bg-white px-1 text-center text-[24px] font-semibold text-[#323232]">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => increaseQuantity(item.id)}
                                className="grid h-8 w-8 place-items-center text-[24px] leading-none"
                                aria-label={`Increase quantity of ${item.name}`}
                              >
                                +
                              </button>
                            </div>
                          </div>

                          <div className="flex min-w-[78px] flex-col items-end justify-between py-1 text-right">
                            <p className="text-[34px] font-bold text-[#0f172a]">{formatCurrency(item.price * item.quantity)}</p>
                            <button
                              type="button"
                              onClick={() => removeItem(item.id)}
                              className="text-[11px] font-semibold text-rose-500"
                            >
                              Remove
                            </button>
                            <p className="text-[11px] text-[#9d9d9d]">Std. Delivery,04 Jun - 11 Jun</p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </article>
            ))}
          </section>

          <section className="px-3 pb-4">
            <article className="rounded-2xl border border-[#dadada] bg-white px-3 py-4 shadow-[0_2px_6px_rgba(15,23,42,0.06)]">
              <h2 className="text-[40px] font-semibold text-[#1c1c1c]">Price Details</h2>

              <div className="mt-3 space-y-0 text-[34px] text-[#252525]">
                <div className="flex items-center justify-between border-t border-[#ececec] py-2">
                  <p>{priceBreakup.totalItems} Items</p>
                  <p className="font-medium">{formatCurrency(priceBreakup.listPrice)}</p>
                </div>
                <div className="flex items-center justify-between border-t border-[#ececec] py-2">
                  <p>Discount</p>
                  <p className="font-medium">{formatCurrency(priceBreakup.discount)}</p>
                </div>
                <div className="flex items-center justify-between border-t border-[#ececec] py-2">
                  <p>Shipping(Inc. GST)</p>
                  <p className="font-medium">{formatCurrency(priceBreakup.shipping)}</p>
                </div>
                <div className="flex items-center justify-between border-t border-[#ececec] pt-2">
                  <p className="font-semibold">Total Payable</p>
                  <p className="font-semibold">{formatCurrency(priceBreakup.totalPayable)}</p>
                </div>
              </div>
            </article>
          </section>

          <div className="fixed inset-x-0 bottom-[72px] mx-auto w-full max-w-md px-0">
            <button type="button" className="w-full bg-[#323232] py-4 text-[36px] font-medium text-white">
              Pay Now
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default Cart
