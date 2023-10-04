import React, {createContext, useContext, useMemo, useEffect, useCallback, useState} from "react"
import {useAuth} from "./auth"
import client from "../helpers/client"

export interface Product {
  id: number
  shopping_category_id?: string | null
  name?: string
  description?: string
  price?: string
  discount_price?: string
  color?: string
  on_sale?: number
  quantity?: number
  featured?: number
  in_stock?: number
  created_at?: string
  updated_at?: string
  deleted_at?: null
  image?: string
}

export interface CardProduct {
  id: string
  user_id: number
  order_id: number
  shopping_product_id: number
  quantity: number
  options: null
  deleted_at: null
  created_at: string
  updated_at: string
  product?: Product
}

const Context = createContext<{
  cart: CardProduct[]
  cartReady: boolean
  addItemToCart: Function
  updateItemQuantity: Function
  deleteItem: Function
  getTotal: Function
  total: string
  handleCheckOut: Function
  handleChangeBookingID: Function
}>({
  cart: [],
  cartReady: false,
  addItemToCart: () => {},
  updateItemQuantity: () => {},
  deleteItem: () => {},
  getTotal: () => {},
  total: "",
  handleCheckOut: () => {},
  handleChangeBookingID: () => {}
})

const CartProvider = function CartProvider({children}: {children: React.ReactElement}) {
  const {token, ready} = useAuth()
  const [cartReady, setCartReady] = useState<boolean>(false)
  const [total, setTotal] = useState<string>("0.00")
  const [cart, setCart] = useState<CardProduct[]>([])
  const [bookingId, setBookingId] = useState<number | null>()

  const getTotal = useCallback(() => {
    setTotal(
      cart
        .reduce((pre, cartItem) => pre + cartItem.quantity * Number(cartItem.product?.price), 0)
        .toFixed(2)
    )
  }, [cart])

  const handleChangeBookingID = useCallback((id: number) => {
    setBookingId(id)
  }, [])

  const getCardItems = useCallback(() => {
    if (bookingId && ready && token) {
      client(`shopping/show/carts?booking_id=${bookingId}`)
        ?.then((res: {data: Array<CardProduct>}) => {
          setCart(res.data)
          setCartReady(true)
        })
        .catch(() => {})
    }
  }, [bookingId, ready, token])

  useEffect(() => {
    if (ready && token) {
      getCardItems()
    }
  }, [token, ready, getCardItems])

  const addItemToCart = useCallback(
    (product: Product, quantity: number) => {
      if (bookingId && ready && token) {
        client(`shopping/carts/${product.id}`, {
          method: "POST",
          body: JSON.stringify({booking_id: bookingId, quantity: quantity})
        })
          ?.then(() => {
            getCardItems()
          })
          .catch(() => {})
      }
    },
    [bookingId, getCardItems, ready, token]
  )

  const updateItemQuantity = useCallback((id: number, quantity: number) => {
    setCart((preCart) => [
      ...preCart.filter((itemCart) => Number(itemCart.id) !== id),
      {
        ...preCart.filter((itemCart) => Number(itemCart.id) === id)[0],
        quantity: quantity
      }
    ])
  }, [])

  const deleteItem = useCallback(
    (id: number) => {
      if (bookingId && ready && token) {
        client(`shopping/carts/delete/${id}`, {
          method: "POST",
          body: JSON.stringify({booking_id: bookingId})
        })
          ?.then(() => {
            getCardItems()
          })
          .catch(() => {})
      }
    },
    [bookingId, getCardItems, ready, token]
  )

  const handleCheckOut = useCallback(() => {
    if (bookingId) {
      client("shopping/cart/create/order", {
        method: "POST",
        body: JSON.stringify({
          booking_id: bookingId,
          carts: cart.map((itemCart) => ({
            id: itemCart.id,
            qty: itemCart.quantity
          }))
        })
      })
        ?.then(() => {
          getCardItems()
        })
        .catch(() => {})
    }
  }, [bookingId, getCardItems, cart])

  useEffect(() => {
    if (typeof window !== "undefined") {
      getTotal()
    }
  }, [cartReady, getTotal])

  const exposed = useMemo(
    () => ({
      cart,
      cartReady,
      addItemToCart,
      updateItemQuantity,
      deleteItem,
      getTotal,
      total,
      handleCheckOut,
      handleChangeBookingID
    }),
    [
      cart,
      cartReady,
      addItemToCart,
      updateItemQuantity,
      deleteItem,
      getTotal,
      total,
      handleCheckOut,
      handleChangeBookingID
    ]
  )
  return <Context.Provider value={exposed}>{children}</Context.Provider>
}

const useCart = () => {
  const content = useContext(Context)
  if (!content) throw new Error("useCart must be used within a CartProvider")
  return content
}

export {useCart, CartProvider}
