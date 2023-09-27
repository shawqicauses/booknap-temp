import React from "react"
import Footer from "../components/layout/footer"
import CartContent from "../components/cart"
import Protected from "../components/uis/protected"

const Cart = function Cart() {
  return (
    <Protected>
      <CartContent />
      <Footer />
    </Protected>
  )
}

export default Cart
