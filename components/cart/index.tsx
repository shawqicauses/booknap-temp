import React from "react"
import ItemTabel from "./item-tabel"
import CheckoutCard from "./checkout-card"

const CartContent = function CartContent() {
  return (
    <div className="my-10 my-container flex gap-8 flex-col">
      <div className="p-5 bg-[#F5F5F5] rounded-lg mb-3">
        <ItemTabel />
      </div>
      <CheckoutCard />
    </div>
  )
}

export default CartContent
