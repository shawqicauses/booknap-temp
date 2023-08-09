import React, {createContext, useContext, useState, useMemo} from "react"

const Context = createContext({})

const CartProvider = function CartProvider({
  children
}: {
  children: React.ReactElement
}) {
  const [content, setContent] = useState([])
  const exposed = useMemo(() => ({content, setContent}), [content])
  return <Context.Provider value={exposed}>{children}</Context.Provider>
}

const useContent = () => {
  const content = useContext(Context)
  if (!content) throw new Error("Context must be used within a Provider")
  return content
}
export {CartProvider, useContent}
