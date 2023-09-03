/* eslint-disable import/no-unresolved */
import React, {useEffect, useState} from "react"
import {
  Link,
  Modal,
  ModalBody,
  ModalContent,
  Spinner,
  useDisclosure
} from "@nextui-org/react"
import {FaUsers} from "react-icons/fa"
import {MdLocalOffer} from "react-icons/md"
import {AiFillStar, AiOutlineCheck} from "react-icons/ai"
import {BiTime} from "react-icons/bi"
import {LuMail} from "react-icons/lu"
import Image from "next/image"
import Rating from "@mui/material/Rating"
import {Swiper, SwiperSlide} from "swiper/react"
import {Autoplay} from "swiper/modules"
import "swiper/css"
import "swiper/css/pagination"
import {noPadding} from "../uis/modal-styles"

import CancelModal from "../modal/cancel-modal"
import BookedModal from "../modal/booked-modal"
import BannedModal from "../modal/banned-modal"
import MyButton from "../uis/button"
import client from "../../helpers/client"
import {useCurrentBookingOrder} from "../../stores/current-booking-order"

interface HotelOfferBoxProps {
  offer: any
  openBookedModal: () => void
  clearCurrentBookingOrder: Function
  setShow: Function
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

const hotelData = {
  img: "/hotel-logo-about.png",
  hotelName: "Hotel Name",
  rating: 3,
  mail: "No 53, 2Nd Avenue, The Houghton Apartments Gate 2, Houghton Estate",
  phone: "+97 059 254 6772",
  websiteLink: "https://google.com"
}
const swiperSlides = [
  {
    id: 1,
    imgUrl: "/hotel-galary.jpg"
  },
  {
    id: 2,
    imgUrl: "/hotel-galary.jpg"
  },
  {
    id: 3,
    imgUrl: "/hotel-galary.jpg"
  }
]

const HotelPageModal = function HotelPageModal({
  isOpen,
  onClose
}: {
  isOpen: boolean
  onClose: () => void
}) {
  return (
    <Modal
      backdrop="opaque"
      isOpen={isOpen}
      onClose={onClose}
      radius="lg"
      classNames={noPadding}>
      <ModalContent>
        <ModalBody>
          <div>
            <div className="relative w-auto">
              <div className="flex gap-3 absolute bottom-3 left-4 z-10">
                <Image
                  src={hotelData.img}
                  alt={hotelData.hotelName}
                  className="!relative !w-20 !h-20 object-contain"
                  fill
                />
                <div>
                  <h2 className="heading-2 mb-3 text-white">
                    {hotelData.hotelName}
                  </h2>
                  <Rating
                    value={hotelData.rating}
                    className="text-blue-700"
                    readOnly
                    icon={<AiFillStar className="text-inherit text-blue-700" />}
                    emptyIcon={
                      <AiFillStar className="text-inherit !text-gray-400" />
                    }
                  />
                </div>
              </div>
              <Swiper
                slidesPerView={1}
                autoplay={{
                  delay: 3000,
                  pauseOnMouseEnter: true,
                  disableOnInteraction: false
                }}
                modules={[Autoplay]}>
                {swiperSlides.map(({id, imgUrl}) => (
                  <SwiperSlide key={id}>
                    <div className="relative w-full h-auto">
                      <Image
                        src={imgUrl}
                        alt="Web Application"
                        fill
                        className="!relative object-contain"
                      />
                      <div className="absolute bottom-0 left-0 z-10 bg-gradient-to-t from-black w-full h-full" />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="bg-white p-4">
              <div className="flex gap-4">
                <FaUsers className="w-5 h-5 text-[#2F5597]" />
                <span className="heading-3 text-xl-2">About Us</span>
              </div>
              <p className="body-sm text-black">
                The Houghton Hotel was founded out of a love for hospitality,
                distinguished service, and design and architecture, and is
                powered by our passion for people. Here, casual comfort and
                unsurpassed luxury become one
              </p>
            </div>
            <div className="bg-white p-4 body-sm text-black">
              <div className="flex gap-4 items-center mb-2">
                <LuMail className="w-5 h-5 text-[#2F5597]" />
                <span className="heading-3 text-xl-2">Contact</span>
              </div>
              <div className="mb-4">{hotelData.mail}</div>
              <div className="flex flex-col gap-1">
                <div className="flex justify-between gap-3">
                  <span>Phone:</span>
                  <a
                    href={`https://wa.me/${hotelData.phone.replaceAll(
                      " ",
                      ""
                    )}`}
                    className="text-blue-500">
                    {hotelData.phone}
                  </a>
                </div>
                <div className="flex justify-between gap-3">
                  <span>Website:</span>
                  <Link href={hotelData.websiteLink} className="text-blue-500">
                    View Website
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

const HotelOfferBox = function HotelOfferBox({
  offer,
  openBookedModal,
  clearCurrentBookingOrder,
  setShow
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
    })?.then((res) => {
      console.log(res)
    })
  }
  return (
    <>
      <div className="bg-white dark:bg-mirage p-2 rounded-lg shadow-base snap-center relative">
        {/* {isNewOffer ? (
          <div className="absolute top-0 left-0 bg-red-600 text-white text-sm px-3 py-1 rounded-br-large rounded-tl-large z-20">
            New Offer
          </div>
        ) : null} */}
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
              <span className="label-gray">Grand</span>
            </div>
          </div>
          <div className="flex flex-col gap-1 items-center">
            <span className="text-red-500 text-xl font-bold">
              {offer.price}$
            </span>
            {/* {isNewOffer && oldPrice ? (
              <span className="line-through text-gray-400">{oldPrice}$</span>
            ) : null} */}
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
      <HotelPageModal isOpen={isOpen} onClose={onClose} />
    </>
  )
}

// const offers = [
//   {
//     id: 1,
//     isNewOffer: true,
//     oldPrice: 150,
//     logo: "/hotel-logo.png",
//     name: "Hotel Name",
//     rating: 4,
//     price: 130
//   },
//   {id: 2, logo: "/hotel-logo.png", name: "Hotel Name", rating: 3, price: 150},
//   {id: 3, logo: "/hotel-logo.png", name: "Hotel Name", rating: 3, price: 150},
//   {id: 4, logo: "/hotel-logo.png", name: "Hotel Name", rating: 5, price: 150}
// ]
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
  const [filter, serFilter] = useState("Highest Rated")
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

  useEffect(() => {
    const getOffers = async () => {
      const res: IGetOffersRes = await client(
        "hotels/bookings/offers/guest-index",
        {
          method: "GET"
        }
      )
      setOffers(res.result.data)
    }
    getOffers()
  }, [time.minutes])

  return (
    <div className="relative h-full">
      <div
        className={`fixed my-transition z-20 left-0 bottom-0 ${
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
            {String(time.minutes).padStart(2, "0")}:
            {String(time.seconds).padStart(2, "0")}
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
              color={filter === "Highest Rated" ? "primary" : "white"}
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
            </MyButton>
            <MyButton
              color={filter === "Lowest Price" ? "primary" : "white"}
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
            </MyButton>
            <MyButton
              color={filter === "Highest Price" ? "primary" : "white"}
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
            </MyButton>
          </div>
          <div className="flex flex-col relative gap-3">
            {offers.map((offer: any) => (
              <HotelOfferBox
                key={offer.id}
                offer={offer}
                setShow={setShow}
                openBookedModal={booked.onOpen}
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
        openBannedModal={banned.onOpen}
      />
      <BannedModal isOpen={banned.isOpen} onClose={banned.onClose} />
    </div>
  )
}

export default OffersSidebar
