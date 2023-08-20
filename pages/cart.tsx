import React from "react"
import Footer from "../components/layout/footer"
import Sidebar from "../components/uis/sidebar"
import CartContent from "../components/cart"

const Cart = function Cart() {
  return (
    <div>
      <div className="flex bg-white">
        <Sidebar />
        <CartContent />
      </div>
      <Footer />
    </div>
  )
}

export default Cart
