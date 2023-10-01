import React from "react"
import {useCart} from "../../stores/cart"
import MyButton from "../uis/button"

const CheckoutCard = function CheckoutCard() {
  const {total, handleCheckOut} = useCart()

  return (
    <div className="bg-gray-100 dark:bg-mirage max-w-lg p-7 flex gap-5 flex-col rounded-lg">
      <h3 className="heading-2 dark:text-white">Cart Totals</h3>
      <div className="flex justify-between items-center text-[#707070] text-lg font-normal">
        <span>Subtotal</span> <span>{total || "0.00"}</span>
      </div>
      <div className="flex justify-between items-center font-semi-bold text-[#707070] heading-3">
        <span>Total</span> <span>{total || "0.00"}</span>
      </div>
      <MyButton
        color="primary"
        radius="sm"
        fullWidth
        size="xl"
        onClick={handleCheckOut}>
        Proceed To Checkout
      </MyButton>
    </div>
  )
}

export default CheckoutCard
