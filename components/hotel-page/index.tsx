/* eslint-disable import/no-unresolved */
import React, {useState} from "react"
import {Swiper, SwiperSlide} from "swiper/react"
import {Pagination, Autoplay} from "swiper/modules"
import Image from "next/image"
import {Rating} from "@mui/material"
import "swiper/css"
import "swiper/css/pagination"
import {AiFillStar} from "react-icons/ai"
import Button from "../button"
import Booking from "./booking"

const swiperSlides = [
  {
    id: 1,
    imgUrl: "/about-slide.png"
  },
  {
    id: 2,
    imgUrl: "/about-slide.png"
  },
  {
    id: 3,
    imgUrl: "/about-slide.png"
  }
]

const hotelData = {
  img: "/hotel-logo-about.png",
  hotelName: "Hotel Name",
  rating: 3
}
const tabsContent = [<Booking />, <div />, <div />]

const HotelPageContent = function HotelPageContent() {
  const [tab, setTab] = useState(0)
  return (
    <div className="my-container mt-3">
      <div className="p-3 bg-gray-200 rounded-lg mb-6">
        <div className="relative mb-2">
          <div className="flex gap-3 absolute bottom-3 left-4 z-30">
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
            pagination={{
              clickable: true
              // bulletActiveClass: "swiper-pagination-bullet-custom-active",
              // bulletClass: "swiper-pagination-bullet-custom"
            }}
            modules={[Autoplay, Pagination]}
            className=" rounded-lg overflow-x-hidden">
            {swiperSlides.map((swiperSlide) => (
              <SwiperSlide key={swiperSlide.id}>
                <div className="relative w-full ">
                  <Image
                    src={swiperSlide.imgUrl}
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
          <Button
            text="Booking"
            style={{
              type: tab === 0 ? "button-primary" : "button",
              other: `py-1 ${tab !== 0 ? "!text-gray-400" : ""} rounded-full`
            }}
            handleClick={() => setTab(0)}
          />
          <Button
            text="Booking"
            style={{
              type: tab === 1 ? "button-primary" : "button",
              other: `py-1 ${tab !== 1 ? "!text-gray-400" : ""} rounded-full`
            }}
            handleClick={() => setTab(1)}
          />
          <Button
            text="Booking"
            style={{
              type: tab === 2 ? "button-primary" : "button",
              other: `py-1 ${tab !== 2 ? "!text-gray-400" : ""} rounded-full`
            }}
            handleClick={() => setTab(2)}
          />
        </div>
      </div>
      {tabsContent[tab]}
    </div>
  )
}

export default HotelPageContent
