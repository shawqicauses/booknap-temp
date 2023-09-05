import React from "react"
import ItemTable from "./item-table"
import CheckoutCard from "./checkout-card"
import {useCart} from "../../stores/cart"

const CartContent = function CartContent() {
  const {cart} = useCart()
  return (
    <div className="my-10 my-container flex gap-8 flex-col">
      {cart.length > 0 ? (
        <>
          <div className="p-5 bg-[#F5F5F5] dark:bg-mirage rounded-lg mb-3">
            <ItemTable />
          </div>
          <CheckoutCard />
        </>
      ) : (
        <div className="min-h-[400px] flex justify-center items-center heading-3 dark:text-white">
          NO items in the Cart
        </div>
      )}
    </div>
  )
}

export default CartContent
