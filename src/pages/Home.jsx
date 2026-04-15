import { useState } from 'react'
import Header from '../components/Header'
import { Link } from 'react-router-dom'
import useCart from '../hooks/useCart'

const categories = ['Grocery', 'Oil', 'Masala', 'Ghee', 'Snacks']

function makePlaceholder(label, bg = '#E9F7F2', fg = '#008f67') {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="300" height="220" viewBox="0 0 300 220">
      <rect width="100%" height="100%" fill="${bg}" />
      <text x="50%" y="52%" text-anchor="middle" dominant-baseline="middle"
        font-family="Arial, sans-serif" font-size="24" font-weight="700" fill="${fg}">${label}</text>
    </svg>
  `

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}

// ✅ WORKING IMAGES (NO FAIL)
const categoryImages = {
  Grocery: makePlaceholder('Atta'),
  Rice: makePlaceholder('Rice'),
  Oil: makePlaceholder('Oil'),
  Masala: makePlaceholder('Masala'),
  Ghee: makePlaceholder('Ghee'),
  Snacks: makePlaceholder('Snacks'),
}

const defaultImage = makePlaceholder('Product')

// ✅ PRODUCTS
const products = [
  { id: '1', category: 'Grocery', name: 'Sharbati Atta 10kg', price: 540, image: categoryImages.Grocery },
  { id: '2', category: 'Grocery', name: 'Basmati Rice 25kg', price: 2340, image: categoryImages.Rice },
  { id: '3', category: 'Oil', name: 'Sunflower Oil 1L', price: 168, image: categoryImages.Oil },
  { id: '4', category: 'Oil', name: 'Refined Oil 5L', price: 810, image: categoryImages.Oil },
  { id: '5', category: 'Masala', name: 'Red Chili Powder', price: 210, image: categoryImages.Masala },
  { id: '6', category: 'Masala', name: 'Turmeric Powder', price: 180, image: categoryImages.Masala },
  { id: '7', category: 'Ghee', name: 'Cow Ghee 1L', price: 640, image: categoryImages.Ghee },
  { id: '8', category: 'Ghee', name: 'Buffalo Ghee 1L', price: 690, image: categoryImages.Ghee },
  { id: '9', category: 'Snacks', name: 'Masala Chips', price: 220, image: categoryImages.Snacks },
  { id: '10', category: 'Snacks', name: 'Peanut Pouch', price: 95, image: categoryImages.Snacks },
]

// ✅ CART ICON
function CartIcon({ totalItems }) {
  return (
    <Link to="/retailer/cart" className="relative grid h-10 w-10 place-items-center rounded-xl bg-white shadow">
      🛒
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 bg-[#00A877] text-white text-xs px-1 rounded-full">
          {totalItems}
        </span>
      )}
    </Link>
  )
}

// ✅ PRODUCT CARD (FIXED)
function ProductCard({ product, onAdd, addedId }) {
  return (
    <div className="bg-white p-3 rounded-xl shadow-sm flex flex-col justify-between h-full">

      {/* IMAGE */}
      <img
        src={product.image}
        alt={product.name}
        onError={(e) => {
          e.currentTarget.onerror = null
          e.currentTarget.src = defaultImage
        }}
        className="w-full h-28 object-contain bg-gray-100 rounded-lg"
      />

      {/* CONTENT */}
      <div className="mt-2 flex flex-col flex-1 justify-between">
        <div>
          <h3 className="text-sm font-medium line-clamp-2">
            {product.name}
          </h3>

          <p className="text-[#008f67] font-semibold mt-1">
            ₹{product.price}
          </p>
        </div>

        {/* BUTTON FIXED BOTTOM */}
        <button
          onClick={() => onAdd(product)}
          className={`mt-2 w-full py-1.5 rounded-full text-sm font-medium transition ${
            addedId === product.id
              ? 'bg-[#d4f3e8] text-[#007a59]'
              : 'bg-[#e6f7f2] text-[#008f67]'
          }`}
        >
          {addedId === product.id ? 'Added' : 'Add'}
        </button>
      </div>

    </div>
  )
}

// ✅ MAIN PAGE
function Home() {
  const { addToCart, totalItems } = useCart()
  const [addedId, setAddedId] = useState(null)

  const handleAdd = (product) => {
    addToCart(product)
    setAddedId(product.id)
    setTimeout(() => {
      setAddedId((prev) => (prev === product.id ? null : prev))
    }, 1000)
  }

  const grouped = categories.map((cat) => ({
    category: cat,
    items: products.filter((p) => p.category === cat),
  }))

  return (
    <div className="pb-20 px-3">

      <Header
        title="Umeed Retailers"
        subtitle="Wholesale ordering platform"
        action={<CartIcon totalItems={totalItems} />}
      />

      {/* HERO */}
      <div className="bg-gradient-to-r from-[#00A877] to-[#008f67] text-white p-4 rounded-xl mb-4">
        <h2 className="font-semibold text-lg">Restock faster</h2>
        <p className="text-sm opacity-90">Order products easily</p>
      </div>

      {/* PRODUCTS */}
      {grouped.map((section) => (
        <div key={section.category} className="mb-5">
          <h2 className="font-semibold mb-2">{section.category}</h2>

          <div className="grid grid-cols-2 gap-3">
            {section.items.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAdd={handleAdd}
                addedId={addedId}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Home