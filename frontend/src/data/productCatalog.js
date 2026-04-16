export const productCatalog = [
  {
    id: 'gro-atta-01',
    category: 'Grocery',
    name: 'Sharbati Atta 10kg',
    price: 540,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c',
  },
  {
    id: 'gro-rice-01',
    category: 'Grocery',
    name: 'Premium Basmati Rice 25kg',
    price: 2340,
    image: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc',
  },
  {
    id: 'oil-01',
    category: 'Oil',
    name: 'Sunflower Oil 1L',
    price: 168,
    image: 'https://images.unsplash.com/photo-1585238342028-4e2f2c7d7c5c',
  },
  {
    id: 'oil-02',
    category: 'Oil',
    name: 'Refined Oil Tin 5L',
    price: 810,
    image: 'https://images.unsplash.com/photo-1585238342028-4e2f2c7d7c5c',
  },
  {
    id: 'mas-01',
    category: 'Masala',
    name: 'Red Chili Powder 500g',
    price: 210,
    image: 'https://images.unsplash.com/photo-1604908811897-2f5b0b2c6c0e',
  },
  {
    id: 'mas-02',
    category: 'Masala',
    name: 'Turmeric Powder 500g',
    price: 180,
    image: 'https://images.unsplash.com/photo-1604908811897-2f5b0b2c6c0e',
  },
  {
    id: 'ghe-01',
    category: 'Ghee',
    name: 'Cow Ghee 1L',
    price: 640,
    image: 'https://images.unsplash.com/photo-1625944525533-473f1b3c5d5f',
  },
  {
    id: 'ghe-02',
    category: 'Ghee',
    name: 'Buffalo Ghee 1L',
    price: 690,
    image: 'https://images.unsplash.com/photo-1625944525533-473f1b3c5d5f',
  },
  {
    id: 'sna-01',
    category: 'Snacks',
    name: 'Masala Chips Combo',
    price: 220,
    image: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087',
  },
  {
    id: 'sna-02',
    category: 'Snacks',
    name: 'Salted Peanut Pouch',
    price: 95,
    image: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087',
  },
]

export const productCatalogById = productCatalog.reduce((accumulator, product) => {
  accumulator[product.id] = product
  return accumulator
}, {})
