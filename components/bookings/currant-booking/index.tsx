/* eslint-disable import/no-unresolved */
import React, {ReactNode, useEffect, useState} from "react"
import {Swiper, SwiperSlide} from "swiper/react"
import {Pagination, Autoplay} from "swiper/modules"
import Image from "next/image"
import {Rating} from "@mui/material"
import "swiper/css"
import "swiper/css/pagination"
import {useRouter} from "next/router"
import {AiFillStar} from "react-icons/ai"
import MyButton from "../../uis/button"
import LoadingDiv from "../../uis/loading"
import client from "../../../helpers/client"

export interface Hotel {
  id: number
  name: string
  about: string
  features: string
  logo: string
  banner: null
  lat: string
  lng: string
  address: string
  phone: string
  website: string
  stars: number
  country_id: number
  city_id: number
  user_id: number
  created_at: string
  updated_at: string
  deleted_at: null
  bot_service: number
  date_start_service: null
  date_end_service: null
  date_stop_service: null
  country: {
    id: number
    name: string
    en_name: string
    ar_name: string
  }
  media: any[]
}

export interface Offer {
  id: number
  price: number
  status: number
  booking_id: number
  hotel_id: number
  user_id: number
  created_at: string
  updated_at: string
  deleted_at: null
  rejected_offers: number
  rated: number
}

export interface Room {
  type: number
  number: number
}

export interface RoomDetails {
  id: number
  name_ar: string
  type: 1
  bed: 2
  features: {
    f1: true
    f2: false
    f3: true
  }
  number: number
  hotel_id: number
  user_id: number
  created_at: string
  updated_at: string
  deleted_at: null
  amount: number
  name_en: string
  details_ar: string
  details_en: string
}
export interface Result {
  id: number
  date_from: string
  date_to: string
  children: number
  adults: number
  rooms: Room[]
  notes: null
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
  rooms_no: null
  offers: Offer[]
  hotel: Hotel
  rooms_details: Array<RoomDetails>
}

export interface res {
  success: boolean
  message: string
  result: Result
}

const HotelPageContent = function HotelPageContent({
  children
}: {
  children?: ReactNode
}) {
  const router = useRouter()
  const id = Number(router.query.id)
  const [result, setResult] = useState<Result>()

  useEffect(() => {
    if (id > -1) {
      client(`hotels/bookings/show/${id}`)?.then((response: res) => {
        setResult(response.result)
      })
    }
  }, [id])

  if (result) {
    return (
      <div className="mb-10">
        <div className="p-3 bg-gray-100 dark:bg-mirage rounded-lg my-container my-6">
          <div className="relative mb-2 min-h-[100px]">
            <div className="flex gap-3 absolute bottom-3 left-4 z-10">
              <div className="relative h-full">
                <Image
                  src={result.hotel.logo}
                  alt={result.hotel.name}
                  className="!relative !w-20"
                  fill
                />
              </div>
              <div>
                <h2 className="heading-2 mb-3 dark:text-white">
                  {result.hotel.name}
                </h2>
                <Rating
                  value={result.hotel.stars}
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
              pagination={{
                clickable: true
                // bulletActiveClass: "swiper-pagination-bullet-custom-active",
                // bulletClass: "swiper-pagination-bullet-custom"
              }}
              modules={[Autoplay, Pagination]}
              className=" rounded-lg overflow-x-hidden">
              {result.hotel.media.map(({id: imgId, imgUrl}) => (
                <SwiperSlide key={imgId}>
                  <div className="relative w-full ">
                    <Image
                      src={imgUrl}
                      alt="Web Application"
                      fill
                      className="!relative !inset-auto !rounded-lg w-full object-contain"
                    />
                    <div className="absolute bottom-0 left-0 z-10 bg-gradient-to-t from-black w-full h-full" />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="bg-gray-300 w-fit rounded-full flex gap-1">
            <MyButton
              color={router.pathname === `/[id]` ? "primary" : "default"}
              radius="full"
              onClick={() => {
                router.push(`/${id}`)
              }}>
              Booking
            </MyButton>
            <MyButton
              color={router.pathname === `/[id]/rooms` ? "primary" : "default"}
              radius="full"
              onClick={() => {
                router.push(`/${id}/rooms`)
              }}>
              Rooms
            </MyButton>
            <MyButton
              color={router.pathname.includes("shop") ? "primary" : "default"}
              radius="full"
              onClick={() => {
                router.push(`/${id}/shop`)
              }}>
              Shop
            </MyButton>
            <MyButton
              color={router.pathname === `/[id]/about` ? "primary" : "default"}
              radius="full"
              onClick={() => {
                router.push(`/${id}/about`)
              }}>
              About
            </MyButton>
          </div>
          {children}
        </div>
      </div>
    )
  }
  return <LoadingDiv />
}
HotelPageContent.defaultProps = {
  children: null
}

export default HotelPageContent
