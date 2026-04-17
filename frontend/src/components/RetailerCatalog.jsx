import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { productCatalog } from '../data/productCatalog'
import useCart from '../hooks/useCart'

function formatCurrency(value) {
  return `₹${value.toLocaleString('en-IN')}`
}

const fallbackImage = 'https://loremflickr.com/800/600/grocery,product,pack?lock=999'

const catalogMeta = {
  Grocery: { brand: 'Hero Splendor', moq: 50 },
  Oil: { brand: 'Passion Plus', moq: 90 },
  Masala: { brand: 'Hero Splendor', moq: 40 },
  Ghee: { brand: 'Hero Splendor', moq: 70 },
  Snacks: { brand: 'Passion Plus', moq: 50 },
}

const retailerDetails = {
  storeCode: 'RT-90817',
  storeName: 'Umeed Retail Store',
  city: 'Faridabad',
}

function RetailerCatalog({ title = 'Products', showSearch = false }) {
  const navigate = useNavigate()
  const { addToCart, totalItems, totalPrice } = useCart()
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [addedId, setAddedId] = useState(null)

  const categories = useMemo(() => ['All', ...new Set(productCatalog.map((item) => item.category))], [])

  const products = useMemo(() => {
    return productCatalog.filter((item) => {
      const categoryMatch = activeCategory === 'All' || item.category === activeCategory
      const queryMatch = !query.trim() || item.name.toLowerCase().includes(query.trim().toLowerCase())
      return categoryMatch && queryMatch
    })
  }, [activeCategory, query])

  const handleAdd = (product) => {
    addToCart(product)
    setAddedId(product.id)
    setTimeout(() => {
      setAddedId((prev) => (prev === product.id ? null : prev))
    }, 900)
  }

  return (
    <div className="pb-28">
      <header className="sticky top-0 z-30 flex h-[54px] items-center gap-2 bg-[#323232] px-3 text-white shadow-sm">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="grid h-8 w-8 place-items-center rounded-full text-[22px] font-light text-[#ddd0c8]"
          aria-label="Go back"
        >
          ‹
        </button>
        <h1 className="text-[17px] font-semibold">{title}</h1>
      </header>

      <section className="border-b border-[#bcaea6] bg-[#ddd0c8] px-3 py-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-[#323232]">Retailer Panel</p>
            <p className="mt-0.5 text-xs text-[#4b4541]">{retailerDetails.storeName}</p>
          </div>
          <div className="text-right">
            <div className="inline-flex items-center gap-1 rounded-sm border border-[#323232] bg-[#f8f4f1] px-2 py-1 text-xs font-medium text-[#323232]">
              {retailerDetails.storeCode}
              <span aria-hidden="true" className="text-[#323232]">
                ✎
              </span>
            </div>
            <p className="mt-1 text-xs text-[#4b4541]">{retailerDetails.city}</p>
          </div>
        </div>
      </section>

      {showSearch ? (
        <section className="bg-[#e9ddd6] px-3 pt-3">
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search catalog products"
            className="h-10 w-full rounded-lg border border-[#c7b8af] bg-[#f8f4f1] px-3 text-sm outline-none focus:border-[#323232]"
          />
        </section>
      ) : null}

      <section className="bg-[#e9ddd6] px-3 pb-3 pt-2">
        <div className="mb-2 flex items-center gap-2 overflow-x-auto pb-1">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`whitespace-nowrap rounded-full border px-3 py-1 text-xs font-semibold transition ${
                activeCategory === category
                  ? 'border-[#323232] bg-[#323232] text-white'
                  : 'border-[#bcaea6] bg-[#f8f4f1] text-[#4b4541]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-2">
          {products.map((product) => {
            const meta = catalogMeta[product.category] ?? { brand: 'Hero Splendor', moq: 50 }
            const mrp = Math.round(product.price * 1.4)

            return (
              <article
                key={product.id}
                className="relative rounded-[14px] border border-[#cec0b7] bg-[#e9ddd6] px-2 pb-3 pt-2 shadow-[0_8px_18px_rgba(50,50,50,0.14)]"
              >
                <div className="absolute left-0 top-0 h-8 w-8 rounded-br-[8px] rounded-tl-[12px] bg-[#323232] text-[8px] font-bold leading-[9px] text-white">
                  <span className="block px-1 pt-1">Flat</span>
                  <span className="block px-1">40%</span>
                  <span className="block px-1">off</span>
                </div>

                <p className="text-right text-[9px] font-semibold tracking-wide text-[#6f6864]">PIKPART</p>

                <div className="mx-auto mt-1 grid h-[88px] w-[88px] place-items-center overflow-hidden">
                  <img
                    src={product.image || fallbackImage}
                    alt={product.name}
                    className="h-full w-full object-contain"
                    onError={(event) => {
                      event.currentTarget.onerror = null
                      event.currentTarget.src = fallbackImage
                    }}
                  />
                </div>

                <p className="mt-1 text-[10px] font-semibold text-[#323232]">{meta.brand}</p>
                <p className="line-clamp-2 min-h-[32px] text-[13px] font-semibold leading-4 text-[#3f3a37]">{product.name}</p>

                <div className="mt-1 flex items-end justify-between gap-2">
                  <p className="text-[9px] text-[#827872]">MOQ - {meta.moq}</p>
                  <p className="text-[10px] text-[#5f5651]">
                    MRP <span className="text-[14px] font-bold text-[#222]">{formatCurrency(mrp)}</span>
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleAdd(product)}
                  className={`mt-2 h-7 w-full rounded-full text-[11px] font-semibold text-white transition ${
                    addedId === product.id ? 'bg-[#4a4a4a]' : 'bg-[#323232]'
                  }`}
                >
                  {addedId === product.id ? 'Added' : 'Add to Cart'}
                </button>
              </article>
            )
          })}
        </div>
      </section>

      {totalItems > 0 ? (
        <section className="fixed bottom-[62px] left-1/2 z-40 w-full max-w-md -translate-x-1/2 px-2">
          <div className="rounded-lg border border-[#bcaea6] bg-[#323232] p-1.5 text-white shadow-[0_10px_20px_rgba(50,50,50,0.3)]">
            <div className="flex items-center justify-between gap-2 rounded-md bg-white px-2 py-1 text-[#1c1c1c]">
              <div className="min-w-0">
                <p className="truncate text-[16px] font-bold text-[#323232]">
                  {totalItems} items | {formatCurrency(totalPrice)}
                </p>
                <p className="text-[16px] font-semibold text-[#4b4541]">Wholesale savings active</p>
              </div>
              <Link
                to="/retailer/cart"
                className="whitespace-nowrap rounded-lg border border-[#323232] bg-[#f8f4f1] px-3 py-1 text-[12px] font-bold text-[#323232]"
              >
                Go to Cart
              </Link>
            </div>
          </div>
        </section>
      ) : null}
    </div>
  )
}

export default RetailerCatalog