import Image from "next/image"
import React from "react"
import {useRouter} from "next/router"
import {HiOutlineShoppingCart} from "react-icons/hi2"
import {MdFavorite, MdFavoriteBorder} from "react-icons/md"
import MyButton from "../../uis/button"
import useFetch from "../../../hooks/use-fetch"
import LoadingDiv from "../../uis/loading"

interface product_feature {
  id: number
  shopping_product_id: number
  name_en: string
  name_ar: string
  created_at: string
  updated_at: string
  deleted_at: null
  hotel_id: number
  values: Array<{
    id: number
    feature_id: number
    name_ar: string
    name_en: string
    created_at: string
    updated_at: string
    product_id: number
    hotel_id: number
    deleted_at: null
  }>
}
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
  product_features: Array<product_feature>
}

const CardItem = function CardItem({
  id,
  image,
  product,
  price,
  isFavorite,
  handleClick
}: {
  id: number
  image: string
  product: string
  price: number
  isFavorite: boolean
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
          <MyButton color="default" isIconOnly onClick={handleClick}>
            <HiOutlineShoppingCart className="h-5 w-5" />
          </MyButton>
        </div>
      </div>
    </div>
  )
}

const Shop = function Shop({tab}: {tab: string}) {
  const {data: products} = useFetch<{data: {data: Product[]}}>(
    "shopping/products"
  )
  const router = useRouter()
  const id = Number(router.query.id)

  if (products) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-3 gap-y-5 h-auto mt-5 mb-10">
        {products.data.data.map(
          ({id: productId, image, price, description}) => {
            return (
              <CardItem
                key={productId}
                id={productId}
                image={image}
                price={Number(price)}
                isFavorite
                product={description}
                handleClick={() => {
                  router.push(`/${id}/shop/${productId}`)
                }}
              />
            )
          }
        )}
      </div>
    )
  }
  return <LoadingDiv />
}

export default Shop
