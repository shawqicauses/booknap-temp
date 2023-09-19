import Image from "next/image"
import React from "react"
import {TbTrashXFilled} from "react-icons/tb"
import {Counter} from "../modal/booking-modal"
import MyButton from "../uis/button"
import {useCart} from "../../stores/cart"

const columns = [
  {
    key: "image",
    label: "Image"
  },
  {
    key: "product",
    label: "Product"
  },
  {
    key: "price",
    label: "Unit Price"
  },
  {
    key: "quantity",
    label: "Quantity"
  },
  {
    key: "total",
    label: "Total"
  },
  {
    key: "Remove",
    label: "Remove"
  }
]

const ItemTable = function ItemTable() {
  const {cart, updateItemQuantity, deleteItem} = useCart()

  if (cart) {
    return (
      <table className="table-fixed border-collapse w-full">
        <thead>
          <tr className="border-2  border-l-transparent  border-r-transparent">
            {columns.map(({key, label}) => (
              <th key={key} className="p-4">
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {cart.map(({id, product, quantity}) => (
            <tr key={id}>
              <td className="p-2 border-2 border-l-transparent">
                <div className="relative max-w-40  max-h-40 m-auto rounded-lg overflow-hidden">
                  <Image
                    src={product?.image!}
                    alt={product?.name!}
                    className="!relative h-full object-contain"
                    fill
                  />
                </div>
              </td>
              <td className="text-center border-2"> {product?.name!}</td>
              <td className="text-center border-2"> {product?.price!}</td>
              <td className="border-2">
                <div className="flex justify-center">
                  <Counter
                    value={quantity!}
                    handleClickMinus={() => {
                      if (quantity! > 1) {
                        updateItemQuantity(id!, quantity! - 1)
                      }
                    }}
                    handleClickPlus={() =>
                      updateItemQuantity(id!, quantity! + 1)
                    }
                  />
                </div>
              </td>
              <td className="text-center border-2">
                {(quantity! * Number(product?.price!)).toFixed(2)}
              </td>
              <td className="text-center border-2 border-r-transparent ">
                <MyButton
                  isIconOnly
                  onClick={() => deleteItem(id)}
                  className="bg-transparent">
                  <TbTrashXFilled className="h-8 w-8 text-[#B9B9B9]" />
                </MyButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
  return null
}
export default ItemTable