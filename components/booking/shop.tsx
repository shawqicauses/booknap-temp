import {Button} from "@nextui-org/react"
import Image from "next/image"
import React from "react"
import {HiOutlineShoppingCart} from "react-icons/hi2"
import {MdFavorite, MdFavoriteBorder} from "react-icons/md"

const itemList = [
  {
    id: 1,
    image: "/user-profile.jpg",
    name: "Wkd-Thvb T-Shirt Men Cotton T Shirt...",
    price: 19.99,
    isFavorite: true,
    inCart: false
  },
  {
    id: 2,
    image: "/user-profile.jpg",
    name: "Wkd-Thvb T-Shirt Men Cotton T Shirt...",
    price: 29.99,
    isFavorite: false,
    inCart: true
  },
  {
    id: 3,
    image: "/user-profile.jpg",
    name: "Wkd-Thvb T-Shirt Men Cotton T Shirt...",
    price: 14.99,
    isFavorite: true,
    inCart: false
  }
]

const CardItem = function CardItem({
  id,
  image,
  name,
  price,
  isFavorite,
  inCart
}: {
  id: number
  image: string
  name: string
  price: number
  isFavorite: boolean
  inCart: boolean
}) {
  return (
    <div className="p-3 h-auto bg-gray-100 rounded-lg" key={id}>
      <div className="relative h-auto rounded-lg overflow-hidden">
        <Image src={image} alt={name} fill className="!relative" />
      </div>
      <h3 className="text-lg leading-none my-2 capitalize">{name}</h3>
      <div className="flex justify-between">
        <span className="text-xl font-bold text-red-500 items-center">
          ${price}
        </span>
        <div className="flex gap-2">
          <Button isIconOnly>
            {isFavorite ? (
              <MdFavorite className="w-5 h-5 text-red-500" />
            ) : (
              <MdFavoriteBorder className="w-5 h-5 text-red-500" />
            )}
          </Button>
          <Button color={inCart ? "primary" : "default"} isIconOnly>
            <HiOutlineShoppingCart className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}

const Resturant = function Resturant() {
  return (
    <>
      {itemList.map((item) => (
        <CardItem key={item.id} {...item} />
      ))}
    </>
  )
}
const Clothes = function Clothes() {
  return (
    <>
      {itemList.map((item) => (
        <CardItem key={item.id} {...item} />
      ))}
    </>
  )
}
const Favorite = function Favorite() {
  return (
    <>
      1
      {itemList.map((item) => (
        <CardItem key={item.id} {...item} />
      ))}
    </>
  )
}

const Shop = function Shop({tab}: {tab: string}) {
  const currontShop = {
    resturant: <Resturant />,
    clothes: <Clothes />,
    favorite: <Favorite />
  }[tab]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-3 gap-y-5 h-auto">
      {currontShop}
    </div>
  )
}

export default Shop
