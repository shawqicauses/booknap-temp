import React, {
  createContext,
  useContext,
  useReducer,
  useMemo,
  useEffect,
  useCallback,
  useState
} from "react"
import {IItem} from "../types"

interface Action {
  type: string
  item?: IItem
  items?: Array<IItem>
}
const Context = createContext<{
  cart: IItem[]
  ready: boolean
  addItemToCart: Function
  updateItemQuantity: Function
  deleteItem: Function
}>({
  cart: [],
  ready: false,
  addItemToCart: () => {},
  updateItemQuantity: () => {},
  deleteItem: () => {}
})

const CartProvider = function CartProvider({
  children
}: {
  children: React.ReactElement
}) {
  const initState: Array<IItem> = []

  const reducer = (state: Array<IItem>, action: Action): Array<IItem> => {
    switch (action.type) {
      case "setItems":
        return action.items || []
      case "addItem":
        return [...state, action.item!]
      case "updateItemQuantity":
        return state.map((item) =>
          item.id === action.item!.id
            ? {...item, quantity: action.item!.quantity}
            : item
        )
      case "deleteItem":
        return state.filter((item) => item.id !== action.item!.id)
      default:
        return state
    }
  }
  const [ready, setReady] = useState<boolean>(false)
  const [cart, dispatch] = useReducer(reducer, initState)

  const addItemToCart = useCallback((item: IItem) => {
    dispatch({type: "addItem", item})
  }, [])

  const updateItemQuantity = useCallback((id: number, quantity: number) => {
    dispatch({
      type: "updateItemQuantity",
      item: {id, quantity}
    })
  }, [])

  const deleteItem = useCallback((id: number) => {
    dispatch({type: "deleteItem", item: {id}})
  }, [])

  useEffect(() => {
    if (typeof window !== "undefined") {
      const cartStored = JSON.parse(localStorage.getItem("CART") || "[]")
      if (cartStored) {
        dispatch({type: "setItems", items: cartStored})
        setReady(true)
      }
    }
  }, [])
  useEffect(() => {
    if (typeof window !== "undefined" && ready) {
      localStorage.setItem("CART", JSON.stringify(cart))
    }
  }, [cart, ready])

  const exposed = useMemo(
    () => ({cart, ready, addItemToCart, updateItemQuantity, deleteItem}),
    [cart, ready, addItemToCart, updateItemQuantity, deleteItem]
  )
  return <Context.Provider value={exposed}>{children}</Context.Provider>
}

const useContent = () => {
  const content = useContext(Context)
  if (!content) throw new Error("Context must be used within a Provider")
  return content
}

export {CartProvider, useContent}
