import React from "react"
import {NextPage} from "next"
import Footer from "../components/layout/footer"
import Sidebar from "../components/uis/sidebar"
import CartContent from "../components/cart"

const Cart: NextPage = function Cart() {
  return (
    <div>
      <div className="flex">
        <Sidebar />
        <CartContent />
      </div>
      <Footer />
    </div>
  )
}

export default Cart
