import Image from "next/image"
import Link from "next/link"
import {useRouter} from "next/router"
import React, {useState, useEffect} from "react"
import {FaRegImage, FaUsers} from "react-icons/fa"
import {FaLocationDot} from "react-icons/fa6"
import {LuMail} from "react-icons/lu"
import client from "../../../helpers/client"
import {Result, res} from "./index"

const About = function About() {
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
  return (
    <div className="flex flex-col gap-4 mb-10">
      <div className="bg-gray-100 dark:bg-mirage rounded-lg p-4">
        <div className="flex gap-4 mb-3">
          <FaUsers className="w-5 h-5 text-[#2F5597]" />
          <span className="heading-3 text-xl-2 dark:text-white">About Us</span>
        </div>
        <p className="body text-black dark:text-white">{result?.hotel.about}</p>
      </div>
      <div className="flex gap-4">
        <div className="bg-gray-100 dark:bg-mirage rounded-lg p-4 flex-grow-[2]">
          <div className="flex gap-4 items-center mb-3">
            <FaLocationDot className="w-5 h-5 text-[#2F5597]" />
            <span className="heading-3 text-xl-2 dark:text-white">
              Location
            </span>
          </div>
          <div className="flex justify-between">
            <span>{result?.hotel.country.en_name}</span>
            <Link
              href={`/?lat=${result?.hotel.lat}&lng=${result?.hotel.lng}`}
              className="text-blue-500">
              Open Map
            </Link>
          </div>
        </div>
        <div className="bg-gray-100 dark:bg-mirage rounded-lg p-4 flex-grow-[3]">
          <div className="flex gap-4 items-center mb-3">
            <LuMail className="w-5 h-5 text-[#2F5597]" />
            <span className="heading-3 text-xl-2 dark:text-white">Contact</span>
          </div>
          <div className="mb-4">mail@mail.com</div>
          <div className="flex justify-between items-center">
            <div className="flex gap-3">
              <span>Phone:</span>
              <a
                href={`https://wa.me/${result?.hotel.phone.replaceAll(
                  " ",
                  ""
                )}`}
                className="text-blue-500">
                {result?.hotel.phone}
              </a>
            </div>
            <div className="flex gap-3">
              <span>Website:</span>
              <Link
                href={result?.hotel.website || ""}
                className="text-blue-500">
                View Website
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-100 dark:bg-mirage rounded-lg p-4 h-auto">
        <div className="flex gap-4 mb-4">
          <FaRegImage className="w-5 h-5 text-[#2F5597]" />
          <span className="heading-3 text-xl-2 dark:text-white">Glairy</span>
        </div>
        <div className="grid grid-cols-4 grid-row-4 h-full gap-4">
          {result?.hotel.media.map(({id: imgId, src}, index) => (
            <div
              className={`relative h-full rounded-lg overflow-hidden ${
                index === 0 ? "row-span-2 col-span-2" : ""
              }`}
              key={imgId}>
              <Image src={src} alt="image" fill className="!relative" />
            </div>
          ))}
          {/* <div className="relative row-span-2 col-span-2 row-start-3 col-start-3 h-auto  rounded-lg overflow-hidden">
            <Image src={hotelData.video} alt="video" fill />
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default About
