/* eslint-disable camelcase */
import Image from "next/image"
import React, {useCallback, useEffect, useState} from "react"
import {useRouter} from "next/router"
import {HiOutlineShoppingCart} from "react-icons/hi2"
import {MdFavorite, MdFavoriteBorder} from "react-icons/md"
import {useDisclosure} from "@nextui-org/react"
import MyButton from "../../uis/button"
import LoadingDiv from "../../uis/loading"
import client from "../../../helpers/client"
import ItemModal from "../../modal/item-modal"
import {Product} from "../../../types"
import {useCart} from "../../../stores/cart"
import {useAuth} from "../../../stores/auth"

const CardItem = function CardItem({
  id,
  image,
  product,
  price,
  isFavorite,
  handleClick,
  showDetails
}: {
  id: number
  image: string
  product: string
  price: number
  isFavorite: number
  handleClick: () => void
  showDetails: () => void
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
      <div
        onClick={() => {
          showDetails()
        }}
        className="cursor-pointer"
        aria-hidden="true">
        <div className="relative w-52 h-52 border-2 border-[#dddddd] dark:border-waikawa-gray rounded-lg overflow-hidden mx-auto">
          <Image src={image} alt={product} fill className="!relative" />
        </div>
        <h3 className="text-base text-gray-500 leading-none my-2 capitalize line-clamp-2 h-8">
          {product}
        </h3>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-xl font-bold text-red-500 items-center">${price}</span>
        <div className="flex gap-2">
          <MyButton isIconOnly className="bg-[#E3E3E3]" onClick={handleClickHere}>
            {favorite ? (
              <MdFavorite className="w-5 h-5 text-red-500" />
            ) : (
              <MdFavoriteBorder className="w-5 h-5 text-[#B9B9B9]" />
            )}
          </MyButton>
          <MyButton isIconOnly className="bg-[#E3E3E3]" onClick={handleClick}>
            <HiOutlineShoppingCart className="w-5 h-5 text-[#B9B9B9]" />
          </MyButton>
        </div>
      </div>
    </div>
  )
}

const Shop = function Shop({hotelId}: {hotelId: number | null}) {
  const router = useRouter()
  const shopTab = Number(router.query.shopTab)
  const [currentProductId, setCurrentProductId] = useState<number | null>()
  const {isOpen, onOpen, onClose} = useDisclosure()
  const token = useAuth()
  const [products, setProducts] = useState<{data: {data: Product[]}} | null>(null)

  const fetchProducts = useCallback(async () => {
    if (router.isReady && token.ready && token.token && hotelId) {
      const response: {data: {data: Product[]}} = await client(
        shopTab === -1 ? `shopping/products/get-favorite?hotel_id=${hotelId}` : "shopping/products"
      )
      setProducts(response)
    }
  }, [hotelId, router.isReady, shopTab, token.ready, token.token])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  useEffect(() => {
    if (shopTab) {
      setProducts(null)
    }
  }, [shopTab])

  const {addItemToCart} = useCart()
  return products && router.isReady ? (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-3 gap-y-5 h-auto mt-5 mb-10">
        {products.data.data
          .filter(
            (product) =>
              product.hotel_id === hotelId &&
              (shopTab === -1 || product.shopping_category_id === shopTab)
          )
          .map((product) => {
            const {id: productId, image, price, description, is_favourite} = product
            return (
              <CardItem
                key={productId}
                id={productId}
                image={image}
                price={Number(price)}
                isFavorite={is_favourite}
                product={description}
                handleClick={() => {
                  addItemToCart(product, 1)
                }}
                showDetails={() => {
                  onOpen()
                  setCurrentProductId(productId)
                }}
              />
            )
          })}
      </div>
      {currentProductId ? (
        <ItemModal itemId={currentProductId} isOpen={isOpen} onClose={onClose} />
      ) : null}
    </>
  ) : (
    <LoadingDiv />
  )
}

export default Shop
