import Image from "next/image"
import React from "react"
import {TbTrashXFilled} from "react-icons/tb"
import {Counter} from "../modal/booking-modal"
import MyButton from "../button"
import {useContent} from "../../stores/cart"

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

const ItemTabel = function ItemTabel() {
  const {cart, updateItemQuantity, deleteItem, ready} = useContent()

  if (ready) {
    return (
      <table className="table-fixed border-collapse w-full">
        <thead>
          {columns.map(({key, label}) => (
            <th
              key={key}
              className="p-4 border-2  border-l-transparent  border-r-transparent">
              {label}
            </th>
          ))}
        </thead>
        <tbody>
          {cart.map(({id, image, product, price, quantity}) => (
            <tr key={id}>
              <td className="p-2 border-2 border-l-transparent">
                <div className="relative w-40 h-40 m-auto rounded-lg overflow-hidden">
                  <Image
                    src={image!}
                    alt={product!}
                    className="relative h-full object-contain"
                    fill
                  />
                </div>
              </td>
              <td className="text-center border-2"> {product}</td>
              <td className="text-center border-2"> {price}</td>
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
                {(quantity! * price!).toFixed(2)}
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
export default ItemTabel
