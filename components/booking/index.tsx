/* eslint-disable import/no-unresolved */
import React, {useState} from "react"
import {Swiper, SwiperSlide} from "swiper/react"
import {Pagination, Autoplay} from "swiper/modules"
import Image from "next/image"
import {Rating} from "@mui/material"
import "swiper/css"
import "swiper/css/pagination"
import {Button, Tab, Tabs} from "@nextui-org/react"
import {AiFillStar} from "react-icons/ai"
import Booking from "./booking"
import RoomsDetails from "./rooms-details"
import About from "./about"
import Shop from "./shop"

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
const shopTabs = ["resturant", "clothes", "favorite"]

const HotelPageContent = function HotelPageContent() {
  const [tab, setTab] = useState(0)
  const [shopTab, setShopTab] = useState("resturant")
  const tabsContent = [
    <Booking />,
    <RoomsDetails />,
    <Shop tab={shopTab} />,
    <About />
  ]

  return (
    <div className="my-container mt-6">
      <div className="p-3 bg-gray-100 rounded-lg mb-5">
        <div className="relative mb-2">
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
            color={tab === 0 ? "primary" : "default"}
            radius="full"
            onClick={() => setTab(0)}>
            Booking
          </Button>
          <Button
            color={tab === 1 ? "primary" : "default"}
            radius="full"
            onClick={() => setTab(1)}>
            Rooms
          </Button>
          <Button
            color={tab === 2 ? "primary" : "default"}
            radius="full"
            onClick={() => setTab(2)}>
            Shop
          </Button>
          <Button
            color={tab === 3 ? "primary" : "default"}
            radius="full"
            onClick={() => setTab(3)}>
            About
          </Button>
        </div>
        {tab === 2 ? (
          <div className="flex flex-col w-full border-b-2 border-divider">
            <Tabs
              aria-label="Options"
              color="primary"
              variant="underlined"
              classNames={{
                tabList: "gap-6 relative rounded-none p-0 ",
                cursor: "w-full bg-[#2F5597]",
                tab: "px-2 h-12 text-md",
                tabContent: "group-data-[selected=true]:!text-black"
              }}
              onSelectionChange={(e) => setShopTab(e.toString())}>
              {shopTabs.map((st) => (
                <Tab
                  key={st.toLowerCase()}
                  title={
                    <div className="flex items-center space-x-2 capitalize">
                      <span>{st}</span>
                    </div>
                  }
                />
              ))}
            </Tabs>
          </div>
        ) : null}
      </div>
      {tabsContent[tab]}
    </div>
  )
}

export default HotelPageContent
