import {Progress} from "@nextui-org/react"
import {HiMiniClipboardDocumentList} from "react-icons/hi2"
import React, {useEffect, useMemo, useState} from "react"
import {AiTwotoneCalendar} from "react-icons/ai"
import Image from "next/image"
import MyButton from "../button"

interface IItem {
  id: string
  itemImage: string
  description: string
  price: number
}
interface IOrder {
  id: string
  date: string
  items: IItem[]
}
interface IBooking {
  startDate: string
  startTime: string
  endDate: string
  endTime: string
  noOfRoom: number
  noOfAdults: number
  noOfChildren: number
  orders: IOrder[]
}

const booking: IBooking = {
  startDate: "2023-08-10",
  startTime: "12:00:00",
  endDate: "2023-08-15",
  endTime: "12:00:00",
  noOfRoom: 1,
  noOfAdults: 1,
  noOfChildren: 2,
  orders: [
    {
      id: "#123",
      date: "16/05/2023",
      items: [
        {
          id: "123",
          itemImage: "/user-profile.jpg",
          description:
            "Wkd-Thvb T-Shirt Men Cotton T Shirt Full Sleeve Tshirt Men...",
          price: 35
        }
      ]
    },
    {
      id: "#1243",
      date: "16/05/2023",
      items: [
        {
          id: "12213",
          itemImage: "/user-profile.jpg",
          description: "Polo T-Shirt With Welt Pocket",
          price: 35
        },
        {
          id: "456341",
          itemImage: "/user-profile.jpg",
          description:
            "Web Ad Cotton T-Shirt For Boys Regular Fit Formal And...",
          price: 20
        }
      ]
    }
  ]
}

const calc = (date1: string | number | Date, date2: string | number | Date) => {
  const startDate = new Date(date1)
  const endDate = new Date(date2)
  const timeDifference = endDate.valueOf() - startDate.valueOf()
  const daysDifference = timeDifference / (1000 * 60 * 60 * 24)
  return parseInt(`${daysDifference}`, 10)
}

const calc2 = (date1: string, time1: string, date2: string, time2: string) => {
  const startDate = new Date(`${date1} ${time1}`)
  const endDate = new Date(`${date2} ${time2}`)
  const timeDifference = endDate.valueOf() - startDate.valueOf()
  const daysDifference = timeDifference / (1000 * 60 * 60 * 24)
  return daysDifference.toFixed(2)
}

const calcStyle = (index: number, completedDays: string) => {
  const progress = index + 1 <= parseFloat(completedDays) ? 100 : 0
  const inProgress =
    parseFloat(completedDays) > index &&
    !(parseFloat(completedDays) >= index + 1)
      ? parseInt(completedDays.split(".")[1], 10)
      : null
  return inProgress || progress
}

const Booking = function Booking() {
  const [showChild, setShowChild] = useState(false)
  const current = new Date()
  const [currentDate, currentTime] = current.toISOString().split("T")
  const totalDays = useMemo(() => calc(booking.startDate, booking.endDate), [])
  const completedDays = useMemo(
    () => calc2(booking.startDate, booking.startTime, currentDate, currentTime),
    [currentDate, currentTime]
  )
  useEffect(() => {
    setShowChild(true)
  }, [])

  if (!showChild) {
    return null
  }
  return (
    <>
      <div className="p-3 bg-gray-100 rounded-lg my-4">
        <div className="flex gap-2 mb-4">
          {Array.from({length: totalDays}).map((_, index) => {
            return (
              <Progress
                size="sm"
                color="danger"
                key={Math.random()}
                aria-label="Loading..."
                value={calcStyle(index, completedDays)}
                className="max-w-md"
              />
            )
          })}
        </div>
        <div className="flex gap-3 md:gap-10 flex-wrap">
          <div className="flex gap-3 items-center">
            <AiTwotoneCalendar className="h-5 w-5 text-gray-400" />
            <p className="flex gap-2">
              {booking.startDate}
              <span className="font-semi-bold">To</span>
              {booking.endDate}
            </p>
          </div>
          <div className="flex gap-3 items-center">
            <HiMiniClipboardDocumentList className="h-5 w-5 text-gray-400" />
            <p className="flex gap-1">
              <span>{booking.noOfAdults} Adults</span>
              <span>- {booking.noOfChildren} Children</span>
              <span>- {booking.noOfRoom} Room</span>
            </p>
          </div>
          <div className="flex flex-1 justify-end">
            <MyButton disableAnimation>Renewal</MyButton>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 items-start gap-4 my-4 min-h-[400px]">
        {booking.orders.map((order) => (
          <div className="bg-gray-100 rounded-lg p-3" key={order.id}>
            <div className="my-flex-between py-2 text-gray-400">
              <span className=" inline-block px-2 py-1 font-semi-bold">
                Order {order.id}
              </span>
              <span className="inline-block px-2 py-1">{order.date}</span>
            </div>
            <div className="divide-y-2">
              {order.items.map(({id, itemImage, description, price}) => (
                <div key={id} className="flex p-1 py-3 gap-3">
                  <div className="relative h-20 w-20 rounded-lg overflow-hidden">
                    <Image src={itemImage} alt={`item ${id}`} fill />
                  </div>
                  <div>
                    <p className="body-sm">{description}</p>
                  </div>
                  <div className="flex-1 flex justify-end">
                    <span className="text-red-500 font-semi-bold text-xl">
                      {price}$
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default Booking
