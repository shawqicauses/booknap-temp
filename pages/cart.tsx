import React from "react"
import Footer from "../components/layout/footer"
import Sidebar from "../components/uis/sidebar"
import CartContent from "../components/cart"
import Protected from "../components/uis/protected"

const Cart = function Cart() {
  return (
    <Protected>
      <div className="flex">
        <Sidebar />
        <CartContent />
      </div>
      <Footer />
    </Protected>
  )
}

export default Cart
