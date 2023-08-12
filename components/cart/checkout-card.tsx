import React, {useMemo} from "react"
import {useContent} from "../../stores/cart"
import MyButton from "../button"

const CheckoutCard = function CheckoutCard() {
  const {cart} = useContent()
  const tatle = useMemo(
    () =>
      cart.reduce(
        (pre, current) => {
          return {
            ...pre,
            price: pre.price! + current.price! * current.quantity!
          }
        },
        {id: 0, price: 0}
      ),
    [cart]
  )

  return (
    <div className="bg-[#F5F5F5] max-w-lg p-7 flex gap-5 flex-col rounded-lg">
      <h3 className="heading-2">Cart Totals</h3>
      <div className="flex justify-between items-center text-[#707070] text-lg font-normal">
        <span>Subtotal</span> <span>{tatle.price}</span>
      </div>
      <div className="flex justify-between items-center font-semi-bold text-[#707070] heading-3">
        <span>Total</span> <span>{tatle.price}</span>
      </div>
      <MyButton color="primary" radius="sm" fullWidth size="xl">
        Proceed To Checkout
      </MyButton>
    </div>
  )
}

export default CheckoutCard
