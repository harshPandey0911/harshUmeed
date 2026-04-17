export const productCatalog = [
  {
    id: 'gro-atta-01',
    category: 'Grocery',
    name: 'Sharbati Atta 10kg',
    price: 540,
    image: 'https://loremflickr.com/800/600/flour,bag?lock=101',
  },
  {
    id: 'gro-rice-01',
    category: 'Grocery',
    name: 'Premium Basmati Rice 25kg',
    price: 2340,
    image: 'https://loremflickr.com/800/600/basmati,rice,bag?lock=102',
  },
  {
    id: 'oil-01',
    category: 'Oil',
    name: 'Sunflower Oil 1L',
    price: 168,
    image: 'https://loremflickr.com/800/600/sunflower,oil,bottle?lock=103',
  },
  {
    id: 'oil-02',
    category: 'Oil',
    name: 'Refined Oil Tin 5L',
    price: 810,
    image: 'https://loremflickr.com/800/600/cooking,oil,tin?lock=104',
  },
  {
    id: 'mas-01',
    category: 'Masala',
    name: 'Red Chili Powder 500g',
    price: 210,
    image: 'https://loremflickr.com/800/600/chili,powder,spice?lock=105',
  },
  {
    id: 'mas-02',
    category: 'Masala',
    name: 'Turmeric Powder 500g',
    price: 180,
    image: 'https://loremflickr.com/800/600/turmeric,powder,spice?lock=106',
  },
  {
    id: 'ghe-01',
    category: 'Ghee',
    name: 'Cow Ghee 1L',
    price: 640,
    image: 'https://loremflickr.com/800/600/ghee,jar?lock=107',
  },
  {
    id: 'ghe-02',
    category: 'Ghee',
    name: 'Buffalo Ghee 1L',
    price: 690,
    image: 'https://loremflickr.com/800/600/desi,ghee,jar?lock=108',
  },
  {
    id: 'sna-01',
    category: 'Snacks',
    name: 'Masala Chips Combo',
    price: 220,
    image: 'https://loremflickr.com/800/600/potato,chips,packet?lock=109',
  },
  {
    id: 'sna-02',
    category: 'Snacks',
    name: 'Salted Peanut Pouch',
    price: 95,
    image: 'https://loremflickr.com/800/600/salted,peanuts,pack?lock=110',
  },
]

export const productCatalogById = productCatalog.reduce((accumulator, product) => {
  accumulator[product.id] = product
  return accumulator
}, {})
