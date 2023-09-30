/* eslint-disable camelcase */
import Image from "next/image"
import React, {useState} from "react"
import {useRouter} from "next/router"
import {HiOutlineShoppingCart} from "react-icons/hi2"
import {MdFavorite, MdFavoriteBorder} from "react-icons/md"
import MyButton from "../../uis/button"
import useFetch from "../../../hooks/use-fetch"
import LoadingDiv from "../../uis/loading"
import client from "../../../helpers/client"

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
  hotel_id: number
  is_favourite: number
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
  isFavorite: number
  handleClick: () => void
}) {
  const [favorite, setFavorite] = useState(!!isFavorite)
  const handleClickHere = () => {
    setFavorite((pre) => !pre)
    client("shopping/products/add-favorite", {
      method: "POST",
      body: JSON.stringify({shopping_product_id: id})
    })
  }

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
          <MyButton isIconOnly onClick={handleClickHere}>
            {favorite ? (
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

const Shop = function Shop({hotelId}: {hotelId: number}) {
  const router = useRouter()
  const id = Number(router.query.id)
  const shopTab = Number(router.query.shopTab)

  const {data: products} = useFetch<{data: {data: Product[]}}>(
    shopTab === -1
      ? `shopping/products/get-favorite?hotel_id=${hotelId}`
      : "shopping/products"
  )

  if (products && router.isReady) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-3 gap-y-5 h-auto mt-5 mb-10">
        {products.data.data
          .filter(
            (product) =>
              product.hotel_id === id &&
              (shopTab === -1 || product.shopping_category_id === shopTab)
          )
          .map(({id: productId, image, price, description, is_favourite}) => {
            return (
              <CardItem
                key={productId}
                id={productId}
                image={image}
                price={Number(price)}
                isFavorite={is_favourite}
                product={description}
                handleClick={() => {
                  router.push(`/${id}/shop/${productId}`)
                }}
              />
            )
          })}
      </div>
    )
  }
  return <LoadingDiv />
}

export default Shop
