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

  return cart && cart.length > 0 ? (
    <table className="table-fixed border-collapse w-full">
      <thead>
        <tr className="border-2 dark:border-b-[#232F42] dark:border-t-[#232F42] border-l-transparent  border-r-transparent">
          {columns.map(({key, label}) => (
            <th key={key} className="p-4">
              {label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {cart.map(({id, product, quantity}) =>
          product ? (
            <tr key={id}>
              <td className="p-2 border-2 dark:border-[#232F42]  border-l-transparent dark:border-l-transparent">
                <div className="relative max-w-40  max-h-40 m-auto rounded-lg overflow-hidden">
                  {product?.image ? (
                    <Image
                      src={product?.image}
                      alt={product?.name || "Product name"}
                      className="!relative h-full object-contain"
                      fill
                    />
                  ) : null}
                </div>
              </td>
              <td className="text-center border-2 dark:border-[#232F42]"> {product?.name}</td>
              <td className="text-center border-2 dark:border-[#232F42]"> {product?.price}</td>
              <td className="border-2 dark:border-[#232F42]">
                <div className="flex justify-center">
                  <Counter
                    value={quantity}
                    handleClickMinus={() => {
                      if (quantity > 1) {
                        updateItemQuantity(id, quantity - 1)
                      }
                    }}
                    handleClickPlus={() => updateItemQuantity(id, quantity + 1)}
                  />
                </div>
              </td>
              <td className="text-center border-2 dark:border-[#232F42]">
                {(quantity * Number(product?.price)).toFixed(2)}
              </td>
              <td className="text-center border-2 dark:border-[#232F42] border-r-transparent dark:border-r-transparent">
                <MyButton isIconOnly onClick={() => deleteItem(id)} className="bg-transparent">
                  <TbTrashXFilled className="h-8 w-8 text-[#B9B9B9] dark:text-waikawa-gray" />
                </MyButton>
              </td>
            </tr>
          ) : null
        )}
      </tbody>
    </table>
  ) : null
}
export default ItemTable
