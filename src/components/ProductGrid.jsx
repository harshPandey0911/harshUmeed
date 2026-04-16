function ProductGrid({ title, products, onAdd, addedId, formatCurrency }) {
  const defaultImage = 'https://via.placeholder.com/150'

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between px-1">
        <h3 className="section-title">{title}</h3>
        <span className="text-xs text-[#6b7280]">{products.length} items</span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {products.map((product) => (
          <article
            key={product.id}
            className="rounded-2xl bg-white p-3 shadow-[0_8px_22px_rgba(17,24,39,0.08)] ring-1 ring-slate-200/70"
          >
            <div className="mb-3 grid h-[120px] place-items-center overflow-hidden rounded-2xl bg-white">
              <img
                src={product.image || defaultImage}
                alt={product.name}
                className="h-full w-full object-contain"
                loading="lazy"
                onError={(event) => {
                  event.currentTarget.onerror = null
                  event.currentTarget.src = defaultImage
                }}
              />
            </div>

            <p className="line-clamp-2 min-h-10 text-sm font-semibold text-[#111827]">{product.name}</p>
            <p className="mt-1 text-base font-semibold tracking-[-0.01em] text-[#008f67]">{formatCurrency(product.price)}</p>

            {product.tag ? (
              <span className="mt-2 inline-flex rounded-full bg-amber-100 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-amber-700">
                {product.tag}
              </span>
            ) : null}

            <button
              type="button"
              onClick={() => onAdd(product)}
              className={`mt-3 w-full rounded-full border px-3 py-2 text-xs font-semibold transition active:scale-95 ${
                addedId === product.id
                  ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                  : 'border-[#bde9dc] bg-[#e6f7f2] text-[#008f67] hover:bg-[#d8f2e9]'
              }`}
            >
              {addedId === product.id ? 'Added' : 'Add'}
            </button>
          </article>
        ))}
      </div>
    </section>
  )
}

export default ProductGrid
