import Card from '../components/Card'
import Header from '../components/Header'

const products = [
  { name: 'Refined Oil Tin 5L', stock: '42 tins', price: 'Rs. 810' },
  { name: 'Instant Noodles Box', stock: '105 boxes', price: 'Rs. 378' },
  { name: 'Digestive Biscuit Pack', stock: '260 packs', price: 'Rs. 128' },
  { name: 'Tea Premix Jar', stock: '74 jars', price: 'Rs. 290' },
]

function Products() {
  return (
    <div>
      <Header title="Products" subtitle="Browse catalog and inventory" />

      <Card className="mb-4">
        <input type="search" placeholder="Search catalog products" className="input-field" />
      </Card>

      <div className="space-y-3">
        {products.map((product) => (
          <Card key={product.name} className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-slate-900">{product.name}</p>
              <p className="mt-1 text-xs text-slate-500">In stock: {product.stock}</p>
            </div>
            <p className="text-sm font-semibold text-[#008f67]">{product.price}</p>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Products
