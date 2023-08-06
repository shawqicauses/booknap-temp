import React, {useState} from "react"
import {MdLocalOffer} from "react-icons/md"
import {AiOutlineCheck} from "react-icons/ai"
import {BiTime} from "react-icons/bi"
import Image from "next/image"
import Rating from "@mui/material/Rating"
import {Button, useDisclosure} from "@nextui-org/react"
import CancelModal from "../modal/cancel-modal"
import BookedModal from "../modal/booked-modal"
import BannedModal from "../modal/banned-modal"

interface HotelOfferBoxProps {
  // eslint-disable-next-line react/no-unused-prop-types
  id: number
  logo: string
  name: string
  rating: number
  price: number
  handelBooked: () => void
}
const offers = [
  {id: 1, logo: "/hotel-logo.png", name: "Hotel Name", rating: 4, price: 150},
  {id: 2, logo: "/hotel-logo.png", name: "Hotel Name", rating: 3, price: 150},
  {id: 3, logo: "/hotel-logo.png", name: "Hotel Name", rating: 3, price: 150},
  {id: 4, logo: "/hotel-logo.png", name: "Hotel Name", rating: 5, price: 150}
]

const HotelOfferBox = function HotelOfferBox({
  logo,
  name,
  rating,
  price,
  handelBooked
}: HotelOfferBoxProps) {
  return (
    <div className="bg-white p-2 rounded-lg shadow-base snap-center">
      <div className="flex justify-between gap-2 mb-2">
        <div className="flex gap-2">
          <Image
            src={logo}
            alt={name}
            fill
            className="!relative !inset-auto !w-max"
          />
          <div className="flex flex-col gap-1">
            <h3>{name}</h3>
            <Rating
              name="read-only"
              value={rating}
              readOnly
              size="small"
              style={{color: "#2F5597"}}
            />
            <span className="label-gray">Grand</span>
          </div>
        </div>
        <span className="text-red-500 text-xl font-bold">{price}$</span>
      </div>
      <div className="flex justify-end gap-2">
        <Button>reject</Button>
        <Button color="primary" onClick={handelBooked}>
          Accept
        </Button>
      </div>
    </div>
  )
}

const BookingSidebar = function BookingSidebar() {
  const booked = useDisclosure()
  const cancel = useDisclosure()
  const banned = useDisclosure()
  const [filter, serFilter] = useState("Highest Rated")

  return (
    <div className="relative">
      <div className="absolute z-10 top-0 left-0 bottom-0 w-full md:w-1/2 lg:w-1/3 main-hight flex flex-col overflow-y-scroll hide-scrollbar">
        <div className=" bg-white flex justify-between  items-center p-2">
          <Button
            startContent={<MdLocalOffer className="h-5 w-5 text-gray-600" />}
            size="lg"
            radius="sm">
            Offers
          </Button>
          <span className="flex items-center gap-2">
            <BiTime className="h-5 w-5 text-gray-300" />
            12:15
          </span>
          <Button onClick={cancel.onOpen} className="!bg-white">
            Cancel
          </Button>
        </div>
        <div className="bg-gray-50 py-3 px-5 flex-1">
          <p className="py-3 px-6 border border-gray-200 body  rounded-lg mb-3">
            if you Don&apos;t like the offers you can reject The Offers
          </p>
          <div className="flex mb-3 gap-2 flex-wrap">
            <Button
              color={filter === "Highest Rated" ? "primary" : "default"}
              radius="sm"
              size="sm"
              startContent={
                filter === "Highest Rated" ? (
                  <AiOutlineCheck className="h-5 w-5" />
                ) : null
              }
              onClick={() => serFilter("Highest Rated")}
              disableAnimation>
              Highest Rated
            </Button>
            <Button
              color={filter === "Lowest Price" ? "primary" : "default"}
              radius="sm"
              size="sm"
              startContent={
                filter === "Lowest Price" ? (
                  <AiOutlineCheck className="h-5 w-5" />
                ) : null
              }
              onClick={() => serFilter("Lowest Price")}
              disableAnimation>
              Lowest Price
            </Button>
            <Button
              color={filter === "Highest Price" ? "primary" : "default"}
              radius="sm"
              size="sm"
              startContent={
                filter === "Highest Price" ? (
                  <AiOutlineCheck className="h-5 w-5" />
                ) : null
              }
              onClick={() => serFilter("Highest Price")}
              disableAnimation>
              Highest Price
            </Button>
          </div>
          <div className="flex flex-col relative gap-3">
            {offers.map((offer) => (
              <HotelOfferBox
                key={offer.id}
                {...offer}
                handelBooked={booked.onOpen}
              />
            ))}
          </div>
        </div>
      </div>
      <BookedModal isOpen={booked.isOpen} onClose={booked.onClose} />
      <CancelModal
        isOpen={cancel.isOpen}
        onClose={cancel.onClose}
        openBannedModal={banned.onOpen}
      />
      <BannedModal isOpen={banned.isOpen} onClose={banned.onClose} />
    </div>
  )
}

export default BookingSidebar
