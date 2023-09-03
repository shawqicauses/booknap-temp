import React, {
  createContext,
  useContext,
  useReducer,
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
// export interface Test {
//   massage: string
//   data: Datum[]
// }

// export interface Datum {
//   id: string
//   user_id: number
//   order_id: number
//   shopping_product_id: number
//   quantity: number
//   options: null
//   deleted_at: null
//   created_at: string
//   updated_at: string
// }
interface Action {
  type: string
  product?: Product
  items?: Array<Product>
}
const Context = createContext<{
  cart: Product[]
  cartReady: boolean
  addItemToCart: Function
  updateItemQuantity: Function
  deleteItem: Function
}>({
  cart: [],
  cartReady: false,
  addItemToCart: () => {},
  updateItemQuantity: () => {},
  deleteItem: () => {}
})

const CartProvider = function CartProvider({
  children
}: {
  children: React.ReactElement
}) {
  const initState: Array<Product> = []

  const reducer = (state: Array<Product>, action: Action): Array<Product> => {
    switch (action.type) {
      case "setItems":
        return action.items || []
      case "addItem":
        return [...state, action.product!]
      case "updateItemQuantity":
        return state.map((product) =>
          product.id === action.product!.id
            ? {...product, quantity: action.product!.quantity}
            : product
        )
      case "deleteItem":
        return state.filter((product) => product.id !== action.product!.id)
      default:
        return state
    }
  }
  const {token, ready} = useAuth()
  const [cartReady, setCartReady] = useState<boolean>(false)
  const [cart, dispatch] = useReducer(reducer, initState)

  useEffect(() => {
    if (ready && token) {
      // client("")
    }
  }, [token, ready])
  const addItemToCart = useCallback(async (product: Product) => {
    dispatch({type: "addItem", product})
  }, [])

  const updateItemQuantity = useCallback((id: number, quantity: number) => {
    dispatch({
      type: "updateItemQuantity",
      product: {id, quantity}
    })
  }, [])

  const deleteItem = useCallback((id: number) => {
    dispatch({type: "deleteItem", product: {id}})
  }, [])

  useEffect(() => {
    if (typeof window !== "undefined") {
      const cartStored = JSON.parse(localStorage.getItem("CART") || "[]")
      if (cartStored) {
        dispatch({type: "setItems", items: cartStored})
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
    () => ({cart, cartReady, addItemToCart, updateItemQuantity, deleteItem}),
    [cart, cartReady, addItemToCart, updateItemQuantity, deleteItem]
  )
  return <Context.Provider value={exposed}>{children}</Context.Provider>
}

const useCart = () => {
  const content = useContext(Context)
  if (!content) throw new Error("useCart must be used within a CartProvider")
  return content
}

export {useCart, CartProvider}
