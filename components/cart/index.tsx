import React from "react"
import ItemTable from "./item-table"
import CheckoutCard from "./checkout-card"

const CartContent = function CartContent() {
  return (
    <div className="my-10 my-container flex gap-8 flex-col">
      <div className="p-5 bg-[#F5F5F5] dark:bg-mirage rounded-lg mb-3">
        <ItemTable />
      </div>
      <CheckoutCard />
    </div>
  )
}

export default CartContent
