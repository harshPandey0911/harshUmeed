import { useMemo, useState } from 'react'
import { CartContext } from './cartContextObject'

function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id)

      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        )
      }

      return [...prev, { id: product.id, name: product.name, price: product.price, quantity: 1 }]
    })
  }

  const increaseQuantity = (id) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item)),
    )
  }

  const decreaseQuantity = (id) => {
    setCartItems((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item))
        .filter((item) => item.quantity > 0),
    )
  }

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  const totals = useMemo(() => {
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)
    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

    return { totalItems, totalPrice }
  }, [cartItems])

  const value = {
    cartItems,
    totalItems: totals.totalItems,
    totalPrice: totals.totalPrice,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export { CartProvider }
