import Image from "next/image"
import React, {useState} from "react"
import {HiOutlineShoppingCart} from "react-icons/hi2"
import {MdFavorite, MdFavoriteBorder} from "react-icons/md"
import {useContent} from "../../../stores/cart"
import {IItem} from "../../../types"
import MyButton from "../../uis/button"
import {Counter} from "../../modal/booking-modal"

const itemList = [
  {
    id: 1,
    image: "/user-profile.jpg",
    product: "Wkd-Thvb T-Shirt Men Cotton T Shirt...",
    price: 19.99,
    isFavorite: true,
    inCart: false
  },
  {
    id: 2,
    image: "/user-profile.jpg",
    product: "Wkd-Thvb T-Shirt Men Cotton T Shirt...",
    price: 29.99,
    isFavorite: false,
    inCart: true
  },
  {
    id: 3,
    image: "/user-profile.jpg",
    product: "Wkd-Thvb T-Shirt Men Cotton T Shirt...",
    price: 14.99,
    isFavorite: true,
    inCart: false
  }
]

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
    <div className="p-3 h-auto bg-gray-100 rounded-lg" key={id}>
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

const Resturant = function Resturant() {
  const {cart, addItemToCart, deleteItem} = useContent()

  return (
    <>
      {itemList.map((item) => {
        const inCart =
          cart.find((cartItem: IItem) => cartItem.id === item.id) !== undefined
        return (
          <CardItem
            key={item.id}
            {...item}
            inCart={inCart}
            handleClick={() => {
              if (inCart) {
                deleteItem(item.id)
              } else {
                addItemToCart({...item, quantity: 1})
              }
            }}
          />
        )
      })}
    </>
  )
}
const Clothes = function Clothes() {
  const {cart, addItemToCart, deleteItem} = useContent()

  return (
    <>
      {itemList.map((item) => {
        const inCart =
          cart.find((cartItem: IItem) => cartItem.id === item.id) !== undefined
        return (
          <CardItem
            key={item.id}
            {...item}
            inCart={inCart}
            handleClick={() => {
              if (inCart) {
                deleteItem(item.id)
              } else {
                addItemToCart({...item, quantity: 1})
              }
            }}
          />
        )
      })}
    </>
  )
}
const Favorite = function Favorite() {
  const {cart, addItemToCart, deleteItem} = useContent()

  return (
    <>
      {itemList.map((item) => {
        const inCart =
          cart.find((cartItem: IItem) => cartItem.id === item.id) !== undefined
        return (
          <CardItem
            key={item.id}
            {...item}
            inCart={inCart}
            handleClick={() => {
              if (inCart) {
                deleteItem(item.id)
              } else {
                addItemToCart({...item, quantity: 1})
              }
            }}
          />
        )
      })}
    </>
  )
}
const sizes = ["s", "m", "l", "xl"]
const ItemPage = function ItemPage() {
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setISFavorite] = useState(false)
  const [size, setSize] = useState("m")

  return (
    <div className="flex gap-5 flex-col lg:flex-row mt-5 mb-10">
      <div className="flex flex-1">
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
      <div className="flex gap-5 flex-col">
        <h2 className="heading-2">Lorem Ipsum Dolor Sit Amet</h2>
        <p>Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing Elitr.</p>
        <div>
          <h3 className="body mb-2">Options</h3>
          <div className="flex gap-2 ">
            {sizes.map((s) => (
              <MyButton
                size="smSquare"
                onClick={() => setSize(s)}
                className={size === s ? "border !border-blue-600" : ""}>
                {s.toUpperCase()}
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
            <span className="text-blue-700 heading-2">${quantity * 50}</span>
          </div>
        </div>
        <div>
          <MyButton color="primary" radius="sm" fullWidth size="xl">
            Add To Cart
          </MyButton>
        </div>
      </div>
    </div>
  )
}

const Shop = function Shop({tab}: {tab: string}) {
  const currontShop = {
    resturant: <Resturant />,
    clothes: <Clothes />,
    favorite: <Favorite />,
    itemPage: <ItemPage />
  }[tab]

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-3 gap-y-5 h-auto">
        {currontShop}
      </div>
      {/* <ItemPage /> */}
    </>
  )
}

export default Shop
