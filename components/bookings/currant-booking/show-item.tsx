/* eslint-disable camelcase */
import Image from "next/image"
import {useState} from "react"
import {useRouter} from "next/router"
import {MdFavorite, MdFavoriteBorder} from "react-icons/md"
import MyButton from "../../uis/button"
import {Counter} from "../../modal/booking-modal"
import useFetch from "../../../hooks/use-fetch"
import LoadingDiv from "../../uis/loading"
import {Product} from "./shop"
import {useCart} from "../../../stores/cart"

const ItemPage = function ItemPage() {
  const router = useRouter()
  const id = Number(router.query.itemId)
  const {addItemToCart} = useCart()

  const {data: product} = useFetch<{data: Product}>(
    id && !Number.isNaN(id) ? `shopping/products/${id}` : ""
  )
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setISFavorite] = useState(false)
  const [size, setSize] = useState(0)

  const handleAddItem = () => {
    if (product) {
      addItemToCart(product.data, quantity)
    }
  }

  if (product) {
    return (
      <div className="flex gap-5 flex-col lg:flex-row mt-5 mb-10">
        <div className="flex flex-1 lg:max-w-[60%] w-full">
          <div className="flex flex-col w-52 gap-2 items-center">
            <div className="relative w-full h-1/3 rounded-lg overflow-hidden">
              <Image
                src="/user-profile.jpg"
                alt="w"
                fill
                className="relative h-full object-contain"
              />
            </div>
            <div className="relative w-full h-1/3 rounded-lg overflow-hidden">
              <Image
                src="/user-profile.jpg"
                alt="w"
                fill
                className="relative w-full h-full object-contain"
              />
            </div>
            <div className="relative w-full h-1/3 rounded-lg overflow-hidden">
              <Image
                src="/user-profile.jpg"
                alt="w"
                fill
                className="relative w-full h-full object-contain"
              />
            </div>
          </div>
          <div className="relative  w-[490px]  h-[490px] flex-1 rounded-lg overflow-hidden">
            <MyButton
              isIconOnly
              className="absolute top-2 right-2 z-10 bg-opacity-50 "
              onClick={() => setISFavorite((pre) => !pre)}>
              {isFavorite ? (
                <MdFavorite className="w-5 h-5 text-red-500" />
              ) : (
                <MdFavoriteBorder className="w-5 h-5 text-white" />
              )}
            </MyButton>
            <Image
              src="/user-profile.jpg"
              alt="w"
              fill
              className="relative w-full h-full "
            />
          </div>
        </div>
        <div className="flex gap-5 flex-col justify-center">
          <h2 className="heading-2">{product.data.name}</h2>
          <p>{product.data.description}</p>
          <div>
            <h3 className="body mb-2">Options</h3>
            <div className="flex gap-2">
              {product?.data?.product_features[1]?.values?.map(
                ({id: sizeId, name_en}) => (
                  <MyButton
                    key={sizeId}
                    size="smSquare"
                    onClick={() => setSize(sizeId)}
                    className={
                      size === sizeId ? "border !border-blue-600" : ""
                    }>
                    {name_en}
                  </MyButton>
                )
              )}
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
              <span className="text-blue-700 heading-2">
                ${quantity * Number(product.data.price)}
              </span>
            </div>
          </div>
          <div>
            <MyButton
              color="primary"
              radius="sm"
              fullWidth
              size="xl"
              onClick={handleAddItem}>
              Add To Cart
            </MyButton>
          </div>
        </div>
      </div>
    )
  }
  return <LoadingDiv />
}
export default ItemPage
