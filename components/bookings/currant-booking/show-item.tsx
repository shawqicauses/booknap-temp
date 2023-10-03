/* eslint-disable camelcase */
import Image from "next/image"
import {useEffect, useState} from "react"
import {MdFavorite, MdFavoriteBorder} from "react-icons/md"
import MyButton from "../../uis/button"
import {Counter} from "../../modal/booking-modal"
import useFetch from "../../../hooks/use-fetch"
import LoadingDiv from "../../uis/loading"
import {useCart} from "../../../stores/cart"
import client from "../../../helpers/client"
import {Product} from "../../../types"

const ItemPage = function ItemPage({id}: {id: number}) {
  const {addItemToCart} = useCart()
  const {data: product} = useFetch<{data: Product}>(
    id && !Number.isNaN(id) ? `shopping/products/${id}` : ""
  )
  const [quantity, setQuantity] = useState(1)
  const [size, setSize] = useState(0)
  const [favorite, setFavorite] = useState<boolean>(false)

  const handleClickHere = () => {
    setFavorite((pre) => !pre)
    client("shopping/products/add-favorite", {
      method: "POST",
      body: JSON.stringify({shopping_product_id: id})
    })
  }

  const handleAddItem = () => {
    if (product) {
      addItemToCart(product.data, quantity)
    }
  }

  useEffect(() => {
    if (product) {
      setFavorite(!!product?.data.is_favourite)
    }
  }, [product])

  return product ? (
    <div className="flex gap-5 flex-col md:flex-row m-5">
      <div className="relative h-[500px] w-[500px] rounded-lg overflow-hidden">
        <MyButton
          isIconOnly
          className="absolute top-2 right-2 z-10 bg-opacity-50 "
          onClick={handleClickHere}>
          {favorite ? (
            <MdFavorite className="w-5 h-5 text-red-500" />
          ) : (
            <MdFavoriteBorder className="w-5 h-5 text-white" />
          )}
        </MyButton>
        <Image src={product.data.image} alt="w" fill className="relative w-full h-full " />
      </div>
      <div className="flex gap-5 flex-col justify-center">
        <h2 className="heading-2 text-black dark:text-white">{product.data.name}</h2>
        <p>{product.data.description}</p>
        <div>
          <h3 className="body mb-2">Options</h3>
          <div className="flex gap-2">
            {product?.data?.product_features[1]?.values?.map(({id: sizeId, name_en}) => (
              <MyButton
                key={sizeId}
                size="smSquare"
                onClick={() => setSize(sizeId)}
                className={size === sizeId ? "border !border-blue-600" : ""}>
                {name_en}
              </MyButton>
            ))}
          </div>
        </div>
        <div>
          <h3 className="body mb-2">Quantity</h3>
          <div className="flex gap-10">
            <Counter
              value={quantity}
              handleClickMinus={() => {
                if (quantity > 1) {
                  setQuantity((pre) => pre - 1)
                }
              }}
              handleClickPlus={() => setQuantity((pre) => pre + 1)}
            />
            <span className="text-red-600 heading-2">${quantity * Number(product.data.price)}</span>
          </div>
        </div>
        <div>
          <MyButton color="primary" radius="sm" fullWidth size="xl" onClick={handleAddItem}>
            Add To Cart
          </MyButton>
        </div>
      </div>
    </div>
  ) : (
    <LoadingDiv />
  )
}

export default ItemPage
