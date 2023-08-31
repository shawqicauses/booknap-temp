import Image from "next/image"
import Link from "next/link"
import React from "react"
import {FaRegImage, FaUsers} from "react-icons/fa"
import {FaLocationDot} from "react-icons/fa6"
import {LuMail} from "react-icons/lu"

const hotelData = {
  about:
    "Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing Elitr, Sed Diam Nonumy Eirmod Tempor Invidunt Ut Labore Et Dolore Magna Aliquyam Erat, Sed Diam Voluptua. At Vero Eos Et Accusam Et Justo Duo Dolores Et Ea Rebum. Stet Clita Kasd Gubergren, No Sea Takimata Sanctus Est Lorem Ipsum Dolor Sit Amet. Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing",
  locationOnMap: {lat: 30, lng: 40},
  mail: "No 53, 2Nd Avenue, The Houghton Apartments Gate 2, Houghton Estate",
  country: "Saudi Arabia",
  phone: "+97 059 254 6772",
  websiteLink: "https://google.com",
  images: [
    {id: 1, src: "/hotel-galary.jpg"},
    {id: 2, src: "/hotel-galary.jpg"},
    {id: 3, src: "/hotel-galary.jpg"},
    {id: 4, src: "/hotel-galary.jpg"},
    {id: 5, src: "/hotel-galary.jpg"},
    {id: 6, src: "/hotel-galary.jpg"},
    {id: 7, src: "/hotel-galary.jpg"},
    {id: 8, src: "/hotel-galary.jpg"},
    {id: 9, src: "/hotel-galary.jpg"}
  ],
  video: "/hotel-galary.jpg"
}

const About = function About() {
  return (
    <div className="flex flex-col gap-4 mb-10">
      <div className="bg-gray-100 dark:bg-[#1A2230] rounded-lg p-4">
        <div className="flex gap-4 mb-3">
          <FaUsers className="w-5 h-5 text-[#2F5597]" />
          <span className="heading-3 text-xl-2 dark:text-white">About Us</span>
        </div>
        <p className="body text-black dark:text-white">{hotelData.about}</p>
      </div>
      <div className="flex gap-4">
        <div className="bg-gray-100 dark:bg-[#1A2230] rounded-lg p-4 flex-grow-[2]">
          <div className="flex gap-4 items-center mb-3">
            <FaLocationDot className="w-5 h-5 text-[#2F5597]" />
            <span className="heading-3 text-xl-2 dark:text-white">
              Location
            </span>
          </div>
          <div className="flex justify-between">
            <span>{hotelData.country}</span>
            <Link
              href={`/?lat=${hotelData.locationOnMap.lat}&lng=${hotelData.locationOnMap.lng}`}
              className="text-blue-500">
              Open Map
            </Link>
          </div>
        </div>
        <div className="bg-gray-100 dark:bg-[#1A2230] rounded-lg p-4 flex-grow-[3]">
          <div className="flex gap-4 items-center mb-3">
            <LuMail className="w-5 h-5 text-[#2F5597]" />
            <span className="heading-3 text-xl-2 dark:text-white">Contact</span>
          </div>
          <div className="mb-4">{hotelData.mail}</div>
          <div className="flex justify-between items-center">
            <div className="flex gap-3">
              <span>Phone:</span>
              <a
                href={`https://wa.me/${hotelData.phone.replaceAll(" ", "")}`}
                className="text-blue-500">
                {hotelData.phone}
              </a>
            </div>
            <div className="flex gap-3">
              <span>Website:</span>
              <Link href={hotelData.websiteLink} className="text-blue-500">
                View Website
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-100 dark:bg-[#1A2230] rounded-lg p-4 h-auto">
        <div className="flex gap-4 mb-4">
          <FaRegImage className="w-5 h-5 text-[#2F5597]" />
          <span className="heading-3 text-xl-2 dark:text-white">Glairy</span>
        </div>
        <div className="grid grid-cols-4 grid-row-4 h-full gap-4">
          {hotelData.images.map(({id, src}, index) => (
            <div
              className={`relative h-full rounded-lg overflow-hidden ${
                index === 0 ? "row-span-2 col-span-2" : ""
              }`}
              key={id}>
              <Image src={src} alt="image" fill className="!relative" />
            </div>
          ))}
          <div className="relative row-span-2 col-span-2 row-start-3 col-start-3 h-auto  rounded-lg overflow-hidden">
            <Image src={hotelData.video} alt="video" fill />
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
