import { Link, Navigate, useParams } from 'react-router-dom'
import Card from '../components/Card'
import Header from '../components/Header'
import { productCatalogById } from '../data/productCatalog'

function formatCurrency(value) {
  return `₹${value.toLocaleString('en-IN')}`
}

function ProductDetail() {
  const { id } = useParams()
  const product = productCatalogById[id]

  if (!product) {
    return <Navigate to="/retailer/orders" replace />
  }

  return (
    <div className="space-y-4 pb-2">
      <Header
        title="Product Details"
        subtitle="Catalog item information"
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
        <div className="grid place-items-center rounded-2xl bg-white p-4 ring-1 ring-slate-100">
          <img
            src={product.image}
            alt={product.name}
            className="h-[220px] w-full object-contain"
            onError={(event) => {
              event.currentTarget.onerror = null
              event.currentTarget.src = 'https://via.placeholder.com/150'
            }}
          />
        </div>

        <div className="mt-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#008f67]">{product.category}</p>
          <h2 className="mt-2 text-xl font-semibold text-[#111827]">{product.name}</h2>
          <p className="mt-2 text-2xl font-semibold text-[#008f67]">{formatCurrency(product.price)}</p>
        </div>
      </Card>
    </div>
  )
}

export default ProductDetail
