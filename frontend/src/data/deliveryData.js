export const deliveryOrders = [
  {
    id: 'DLV-4101',
    orderId: 'ORD-4101',
    customerName: 'Nadeem Traders',
    customerPhone: '+91 98900 11223',
    address: 'MI Road, Jaipur',
    distanceKm: 6.2,
    orderValue: 3200,
    status: 'Assigned',
    decision: 'Pending',
    eta: '25 mins',
  },
  {
    id: 'DLV-4102',
    orderId: 'ORD-4102',
    customerName: 'City Mart',
    customerPhone: '+91 98110 88654',
    address: 'Bapu Nagar, Jaipur',
    distanceKm: 3.8,
    orderValue: 1480,
    status: 'Assigned',
    decision: 'Pending',
    eta: '18 mins',
  },
  {
    id: 'DLV-4103',
    orderId: 'ORD-4103',
    customerName: 'Rana Super Store',
    customerPhone: '+91 99011 22331',
    address: 'Malviya Nagar, Jaipur',
    distanceKm: 8.5,
    orderValue: 5400,
    status: 'Picked',
    decision: 'Accepted',
    eta: '35 mins',
  },
  {
    id: 'DLV-4104',
    orderId: 'ORD-4104',
    customerName: 'Sharma Kirana',
    customerPhone: '+91 98765 43210',
    address: 'Vaishali Nagar, Jaipur',
    distanceKm: 5.1,
    orderValue: 2100,
    status: 'Delivered',
    decision: 'Accepted',
    eta: 'Completed',
  },
  {
    id: 'DLV-4105',
    orderId: 'ORD-4105',
    customerName: 'Aman Retail Hub',
    customerPhone: '+91 97000 12121',
    address: 'Mansarovar, Jaipur',
    distanceKm: 10.4,
    orderValue: 6900,
    status: 'Delivered',
    decision: 'Accepted',
    eta: 'Completed',
  },
]

export function getCommissionRate(orderValue) {
  return orderValue <= 2000 ? 0.02 : 0.01
}

export function calculateDeliveryCharge(distanceKm) {
  return distanceKm * 5
}

export function calculateCommission(orderValue) {
  return orderValue * getCommissionRate(orderValue)
}

export function calculateNetEarning(order) {
  const deliveryCharge = calculateDeliveryCharge(order.distanceKm)
  const commission = calculateCommission(order.orderValue)
  return deliveryCharge - commission
}

export function formatCurrency(value) {
  return `Rs ${Math.round(value).toLocaleString('en-IN')}`
}
