import Image from "next/image"
import React from "react"
import {HiOutlineShoppingCart} from "react-icons/hi2"
import {MdFavorite, MdFavoriteBorder} from "react-icons/md"
import {useCart} from "../../../stores/cart"
import {IItem} from "../../../types"
import MyButton from "../../uis/button"
import useFetch from "../../../hooks/use-fetch"
import LoadingDiv from "../../uis/loading"

export interface Product {
  id: number
  shopping_category_id: null
  name: string
  description: string
  price: string
  discount_price: string
  color: string
  on_sale: number
  quantity: number
  featured: number
  in_stock: number
  created_at: string
  updated_at: string
  deleted_at: null
  image: string
}

const CardItem = function CardItem({
  id,
  image,
  product,
  price,
  isFavorite,
  inCart,
  handleClick
}: {
  id: number
  image: string
  product: string
  price: number
  isFavorite: boolean
  inCart: boolean
  handleClick: () => void
}) {
  return (
    <div className="p-3 h-auto bg-gray-100 dark:bg-mirage rounded-lg" key={id}>
      <div className="relative h-auto rounded-lg overflow-hidden">
        <Image src={image} alt={product} fill className="!relative" />
      </div>
      <h3 className="text-lg leading-none my-2 capitalize">{product}</h3>
      <div className="flex justify-between">
        <span className="text-xl font-bold text-red-500 items-center">
          ${price}
        </span>
        <div className="flex gap-2">
          <MyButton isIconOnly>
            {isFavorite ? (
              <MdFavorite className="w-5 h-5 text-red-500" />
            ) : (
              <MdFavoriteBorder className="w-5 h-5 text-red-500" />
            )}
          </MyButton>
          <MyButton
            color={inCart ? "primary" : "default"}
            isIconOnly
            onClick={handleClick}>
            <HiOutlineShoppingCart className="h-5 w-5" />
          </MyButton>
        </div>
      </div>
    </div>
  )
}

const Shop = function Shop({tab}: {tab: string}) {
  const {data: products} = useFetch<Product[]>("shopping/products")
  const {cart, addItemToCart, deleteItem} = useCart()

  if (products) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-3 gap-y-5 h-auto mt-5 mb-10">
        {products.map(({id, image, price, description}) => {
          const inCart =
            cart.find((cartItem: IItem) => cartItem.id === id) !== undefined
          return (
            <CardItem
              key={id}
              id={id}
              image={image}
              price={Number(price)}
              isFavorite
              product={description}
              inCart={inCart}
              handleClick={() => {}}
            />
          )
        })}
      </div>
    )
  }
  return <LoadingDiv />
}

export default Shop
