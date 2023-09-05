import React, {useEffect, useState} from "react"
import {Spinner, useDisclosure} from "@nextui-org/react"
import {MdLocalOffer} from "react-icons/md"
import {BiTime} from "react-icons/bi"
import Image from "next/image"
import Rating from "@mui/material/Rating"
import {AiOutlineCheck} from "react-icons/ai"
import CancelModal from "../modal/cancel-modal"
import BookedModal from "../modal/booked-modal"
import BannedModal from "../modal/banned-modal"
import MyButton from "../uis/button"
import client from "../../helpers/client"
import {useCurrentBookingOrder} from "../../stores/current-booking-order"
import HotelPageModal from "../modal/hotel-page-modal"

export interface Room {
  type: number
  number: number
  name_ar: string
  name_en: string
}
export interface Booking {
  id: number
  date_from: string
  date_to: string
  children: number
  adults: number
  rooms: Room[]
  notes: string
  cancel: number
  canceled_at: null
  cancel_reason: number
  cancel_reason_other: null
  status: number
  country_id: number
  city_id: number
  offer_id: number
  hotel_id: number
  user_id: number
  created_at: string
  updated_at: string
  deleted_at: null
  ignore: number
  date_ignore: null
  lat: string
  lng: string
  distance: number
  rooms_no: number
}

export interface IData {
  id: number
  price: number
  status: number
  booking_id: number
  hotel_id: number
  user_id: number
  created_at: string
  updated_at: string
  deleted_at: string
  price_after_reject: number | null
  hotel: any
  booking: Booking
}
export interface Result {
  current_page: number
  data: IData[]
  from: number
  to: number
  total: number
}
export interface IGetOffersRes {
  success: boolean
  message: string
  result: Result
}
interface HotelOfferBoxProps {
  offer: IData
  openBookedModal: () => void
  clearCurrentBookingOrder: Function
  setShow: Function
  getOffers: () => void
}

// const hotelData = {
//   img: "/hotel-logo-about.png",
//   hotelName: "Hotel Name",
//   rating: 3,
//   mail: "No 53, 2Nd Avenue, The Houghton Apartments Gate 2, Houghton Estate",
//   phone: "+97 059 254 6772",
//   websiteLink: "https://google.com"
// }
// const swiperSlides = [
//   {
//     id: 1,
//     imgUrl: "/hotel-galary.jpg"
//   },
//   {
//     id: 2,
//     imgUrl: "/hotel-galary.jpg"
//   },
//   {
//     id: 3,
//     imgUrl: "/hotel-galary.jpg"
//   }
// ]

const HotelOfferBox = function HotelOfferBox({
  offer,
  openBookedModal,
  clearCurrentBookingOrder,
  setShow,
  getOffers
}: HotelOfferBoxProps) {
  const [reject, setReject] = useState(false)
  const {isOpen, onClose, onOpen} = useDisclosure()

  const handleBooked = () => {
    client(`hotels/bookings/offers/accept/${offer.id}`, {method: "GET"})?.then(
      (res) => {
        if (res.success) {
          setShow(false)
          setTimeout(() => {
            clearCurrentBookingOrder()
          }, 2000)
        }
      }
    )
    openBookedModal()
  }
  const handleReject = () => {
    setReject(true)
    client(`hotels/bookings/offers/reject/${offer.id}`, {
      method: "GET"
    })?.then(() => {
      getOffers()
    })
  }
  return (
    <>
      <div className="bg-white dark:bg-mirage p-2 rounded-lg shadow-base snap-center relative">
        {offer.price_after_reject ? (
          <div className="absolute top-0 left-0 bg-red-600 text-white text-sm px-3 py-1 rounded-br-large rounded-tl-large z-20">
            New Offer
          </div>
        ) : null}
        <div className="flex justify-between gap-2 mb-2">
          <div
            className="flex gap-2 cursor-pointer"
            onClick={onOpen}
            aria-hidden="true">
            <div className="!w-20 !h-20 overflow-hidden rounded-md">
              <Image
                src={offer.hotel.logo}
                alt={offer.hotel.name}
                fill
                className="!relative !inset-auto !w-20 !h-20"
              />
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="heading-3 dark:text-white">{offer.hotel.name}</h3>
              <Rating
                name="read-only"
                value={offer.hotel.stars}
                readOnly
                size="small"
                style={{color: "#2F5597"}}
              />
              {offer.booking.rooms
                .filter((room) => room.number > 0)
                .map((room) => (
                  <span className="label-gray">{room.name_en}</span>
                ))}
            </div>
          </div>
          <div className="flex flex-col gap-1 items-center">
            <span className="text-red-500 text-xl font-bold">
              {offer.price_after_reject
                ? offer.price_after_reject
                : offer.price}
              $
            </span>
            {offer.price_after_reject ? (
              <span className="line-through text-gray-400">{offer.price}$</span>
            ) : null}
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <MyButton
            size="sm"
            color="reject"
            className="!w-[72px]"
            isLoading={reject}
            onClick={handleReject}
            spinner={<Spinner size="md" />}>
            {!reject ? "reject" : ""}
          </MyButton>
          <MyButton
            size="sm"
            color="primary"
            onClick={handleBooked}
            disabled={reject}>
            Accept
          </MyButton>
        </div>
      </div>
      <HotelPageModal isOpen={isOpen} onClose={onClose} hotel={offer.hotel} />
    </>
  )
}

const OffersSidebar = function OffersSidebar({
  show,
  setShow
}: {
  show: boolean
  setShow: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const booked = useDisclosure()
  const cancel = useDisclosure()
  const banned = useDisclosure()
  const [offers, setOffers] = useState<IData[]>([])
  const [filter, serFilter] = useState(1)
  const {currentBooking, clearCurrentBookingOrder} = useCurrentBookingOrder()
  const [time, setTime] = useState({minutes: 20, seconds: 0})

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime()
      const diff = now - new Date(currentBooking?.created_at!).getTime()
      if (diff >= 1200000) {
        clearInterval(interval)
        setShow(false)
        clearCurrentBookingOrder()
      } else {
        const minutes = 19 - Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = 59 - Math.floor((diff % (1000 * 60)) / 1000)
        setTime({minutes, seconds})
      }
    }, 1000)
    return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentBooking, clearCurrentBookingOrder])
  const getOffers = async () => {
    const res: IGetOffersRes = await client(
      "hotels/bookings/offers/guest-index",
      {
        method: "GET"
      }
    )
    setOffers(res.result.data)
  }
  useEffect(() => {
    getOffers()
  }, [time.minutes])

  const sortOffers = (type: number) => {
    switch (type) {
      case 1:
        return offers.sort((a, b) => a.hotel.stars - b.hotel.stars)
      case 2:
        return offers.sort((a, b) => a.price - b.price)
      case 3:
        return offers.sort((a, b) => b.price - a.price)
      default:
        return offers
    }
  }
  return (
    <div className="relative h-full">
      <div
        className={`fixed my-transition z-20 left-0 bottom-0 shadow-md ${
          show ? "" : "-translate-x-full"
        } max-w-min main-hight flex flex-col overflow-y-scroll hide-scrollbar h-full`}>
        <div className=" bg-white dark:bg-blue-charcoal flex justify-between  items-center p-2">
          <MyButton
            startContent={<MdLocalOffer className="h-5 w-5 text-gray-600" />}
            size="xl"
            radius="sm"
            color="offer"
            onClick={() => setShow(false)}>
            Offers
          </MyButton>
          <span className="flex items-center gap-2">
            <BiTime className="h-5 w-5 text-gray-300" />
            {String(time.minutes || 20).padStart(2, "0")}:
            {String(time.seconds || 0).padStart(2, "0")}
          </span>
          <MyButton color="transparent" onClick={cancel.onOpen}>
            Cancel
          </MyButton>
        </div>
        <div className="bg-gray-100 dark:bg-blue-charcoal py-3 px-5 flex-1">
          <p className="py-3 px-6 border-gray-300 border-1.5 body text-black dark:text-white  rounded-lg mb-3">
            if you Don&apos;t like the offers you can reject The Offers
          </p>
          <div className="flex mb-3 gap-2  w-auto">
            <MyButton
              color={filter === 1 ? "primary" : "white"}
              radius="sm"
              size="sm"
              startContent={
                filter === 1 ? <AiOutlineCheck className="h-5 w-5" /> : null
              }
              onClick={() => serFilter(1)}
              disableAnimation>
              Highest Rated
            </MyButton>
            <MyButton
              color={filter === 2 ? "primary" : "white"}
              radius="sm"
              size="sm"
              startContent={
                filter === 2 ? <AiOutlineCheck className="h-5 w-5" /> : null
              }
              onClick={() => serFilter(2)}
              disableAnimation>
              Lowest Price
            </MyButton>
            <MyButton
              color={filter === 3 ? "primary" : "white"}
              radius="sm"
              size="sm"
              startContent={
                filter === 3 ? <AiOutlineCheck className="h-5 w-5" /> : null
              }
              onClick={() => serFilter(3)}
              disableAnimation>
              Highest Price
            </MyButton>
          </div>
          <div className="flex flex-col relative gap-3">
            {sortOffers(filter).map((offer: any) => (
              <HotelOfferBox
                key={offer.id}
                offer={offer}
                setShow={setShow}
                openBookedModal={booked.onOpen}
                getOffers={getOffers}
                clearCurrentBookingOrder={clearCurrentBookingOrder}
              />
            ))}
          </div>
        </div>
      </div>
      <BookedModal isOpen={booked.isOpen} onClose={booked.onClose} />
      <CancelModal
        isOpen={cancel.isOpen}
        onClose={cancel.onClose}
        setShow={setShow}
        openBannedModal={banned.onOpen}
      />
      <BannedModal isOpen={banned.isOpen} onClose={banned.onClose} />
    </div>
  )
}

export default OffersSidebar
