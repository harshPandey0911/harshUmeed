export const ordersData = [
  {
    id: 'ORD-3012',
    date: '15 Apr 2026',
    status: 'Out for delivery',
    paymentType: 'Online',
    paymentStatus: 'Paid',
    deliveryCharge: 120,
    products: [
      {
        id: 'gro-atta-01',
        name: 'Sharbati Atta 10kg',
        image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c',
        price: 540,
        quantity: 3,
      },
      {
        id: 'oil-01',
        name: 'Sunflower Oil 1L',
        image: 'https://images.unsplash.com/photo-1585238342028-4e2f2c7d7c5c',
        price: 168,
        quantity: 8,
      },
      {
        id: 'sna-01',
        name: 'Masala Chips Combo',
        image: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087',
        price: 220,
        quantity: 6,
      },
    ],
  },
  {
    id: 'ORD-2980',
    date: '12 Apr 2026',
    status: 'Packed',
    paymentType: 'COD',
    paymentStatus: 'Pending',
    deliveryCharge: 90,
    products: [
      {
        id: 'gro-rice-01',
        name: 'Premium Basmati Rice 25kg',
        image: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc',
        price: 2340,
        quantity: 2,
      },
      {
        id: 'mas-01',
        name: 'Red Chili Powder 500g',
        image: 'https://images.unsplash.com/photo-1604908811897-2f5b0b2c6c0e',
        price: 210,
        quantity: 10,
      },
      {
        id: 'ghe-01',
        name: 'Cow Ghee 1L',
        image: 'https://images.unsplash.com/photo-1625944525533-473f1b3c5d5f',
        price: 640,
        quantity: 4,
      },
    ],
  },
  {
    id: 'ORD-2941',
    date: '07 Apr 2026',
    status: 'Delivered',
    paymentType: 'Online',
    paymentStatus: 'Paid',
    deliveryCharge: 0,
    products: [
      {
        id: 'oil-02',
        name: 'Canola Oil 5L',
        image: 'https://images.unsplash.com/photo-1585238342028-4e2f2c7d7c5c',
        price: 810,
        quantity: 3,
      },
      {
        id: 'mas-02',
        name: 'Turmeric Powder 500g',
        image: 'https://images.unsplash.com/photo-1604908811897-2f5b0b2c6c0e',
        price: 180,
        quantity: 12,
      },
      {
        id: 'sna-02',
        name: 'Salted Peanut Pouch',
        image: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087',
        price: 95,
        quantity: 15,
      },
    ],
  },
]

export const orderItems = ordersData.flatMap((order) =>
  order.products.map((product, index) => ({
    id: `${order.id}-${product.id}-${index}`,
    orderId: order.id,
    date: order.date,
    status: order.status,
    paymentType: order.paymentType,
    paymentStatus: order.paymentStatus,
    deliveryCharge: order.deliveryCharge,
    product,
  })),
)
