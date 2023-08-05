"use client"

import React, {useMemo} from "react"

const booking = {
  startDate: "2023-07-28",
  startTime: "12:00:00",
  endDate: "2023-08-02",
  endTime: "12:00:00",
  noOfRoom: 1,
  noOfAdults: 1,
  noOfChildren: 2
}

const calc = (date1: string | number | Date, date2: string | number | Date) => {
  const startDate = new Date(date1)
  const endDate = new Date(date2)
  const timeDifference = endDate - startDate
  const daysDifference = timeDifference / (1000 * 60 * 60 * 24)
  return parseInt(`${daysDifference}`, 10)
}

const calc2 = (date1: string, time1: string, date2: string, time2: string) => {
  const startDate = new Date(`${date1} ${time1}`)
  const endDate = new Date(`${date2} ${time2}`)
  const timeDifference = endDate - startDate
  const daysDifference = timeDifference / (1000 * 60 * 60 * 24)
  return daysDifference.toFixed(2)
}

const calcStyle = (index: number, completedDays: string) => {
  const progress = index + 1 <= parseFloat(completedDays) ? "100%" : "0%"
  const inProgress =
    parseFloat(completedDays) > index &&
    !(parseFloat(completedDays) >= index + 1)
      ? `${completedDays.split(".")[1]}%`
      : null
  return {
    width: inProgress || progress
  }
}

const Booking = function Booking() {
  const current = new Date()
  const [currentDate, currentTime] = current.toISOString().split("T")
  const totalDays = useMemo(() => calc(booking.startDate, booking.endDate), [])
  const completedDays = useMemo(
    () => calc2(booking.startDate, booking.startTime, currentDate, currentTime),
    [currentDate, currentTime]
  )
  if (typeof window !== "undefined") {
    return (
      <div>
        <div className="p-3 bg-gray-200 flex gap-2">
          {Array.from({length: totalDays}).map((_, index) => {
            return (
              <div
                key={index}
                className="bg-gray-100 h-2 w-full relative rounded-full overflow-hidden">
                <span
                  style={calcStyle(index, completedDays)}
                  className="bg-red-600 h-full absolute top-0 left-0"
                />
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default Booking
