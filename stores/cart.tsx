import React, {
  createContext,
  useContext,
  useMemo,
  useEffect,
  useCallback,
  useState
} from "react"
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
}>({
  cart: [],
  cartReady: false,
  addItemToCart: () => {},
  updateItemQuantity: () => {},
  deleteItem: () => {},
  getTotal: () => {},
  total: "",
  handleCheckOut: () => {}
})

const CartProvider = function CartProvider({
  children
}: {
  children: React.ReactElement
}) {
  const {token, ready} = useAuth()
  const [cartReady, setCartReady] = useState<boolean>(false)
  const [total, setTotal] = useState<string>("0.00")
  const [cart, setCart] = useState<CardProduct[]>([])

  const getTotal = useCallback(() => {
    client("shopping/cart/total")?.then((res: {total: string[]}) => {
      setTotal(res.total[0])
    })
  }, [])
  const getCardItems = useCallback(() => {
    client("shopping/show/carts")?.then((res: {data: Array<CardProduct>}) => {
      setCart(res.data)
      getTotal()
    })
  }, [getTotal])

  useEffect(() => {
    if (ready && token) {
      getCardItems()
    }
  }, [token, ready, getCardItems])

  const addItemToCart = useCallback(
    (product: Product, quantity: number) => {
      client(`shopping/carts/${product.id}`, {
        method: "POST",
        body: JSON.stringify({quantity: quantity})
      })?.then(() => {
        getTotal()
        getCardItems()
      })
    },
    [getTotal, getCardItems]
  )

  const updateItemQuantity = useCallback(
    (id: number, quantity: number) => {
      client(`shopping/carts/update/${id}`, {
        method: "POST",
        body: JSON.stringify({quantity: quantity})
      })?.then(() => {
        getTotal()
        getCardItems()
      })
    },
    [getTotal, getCardItems]
  )

  const deleteItem = useCallback(
    (id: number) => {
      client(`shopping/carts/delete/${id}`, {
        method: "POST"
      })?.then(() => {
        getTotal()
        getCardItems()
      })
    },
    [getTotal, getCardItems]
  )
  const handleCheckOut = useCallback(() => {
    client("shopping/cart/create/order", {method: "POST"})?.then(() => {
      getTotal()
      getCardItems()
    })
  }, [getTotal, getCardItems])

  useEffect(() => {
    if (typeof window !== "undefined") {
      const cartStored = JSON.parse(localStorage.getItem("CART") || "[]")
      if (cartStored) {
        setCartReady(true)
      }
    }
  }, [])
  useEffect(() => {
    if (typeof window !== "undefined" && cartReady) {
      localStorage.setItem("CART", JSON.stringify(cart))
    }
  }, [cart, cartReady])

  const exposed = useMemo(
    () => ({
      cart,
      cartReady,
      addItemToCart,
      updateItemQuantity,
      deleteItem,
      getTotal,
      total,
      handleCheckOut
    }),
    [
      cart,
      cartReady,
      addItemToCart,
      updateItemQuantity,
      deleteItem,
      getTotal,
      total,
      handleCheckOut
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
