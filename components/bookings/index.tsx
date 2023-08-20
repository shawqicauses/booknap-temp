import {Rating} from "@mui/material"
import {useDisclosure} from "@nextui-org/react"
import Image from "next/image"
import React from "react"
import {useRouter} from "next/navigation"
import BookingDetailsModal from "../modal/booking-details-modal"
import MyButton from "../uis/button"

interface Ibooking {
  hotelName: string
  hotelRating: number
  hotelLogo: string
  bookingId: string
  startDay: string
  endDay: string
  noAdults: number
  noChildern: number
  noRoom: number
  state: "done" | "inProgress" | "coming"
}

const bookings: Ibooking[] = [
  {
    hotelName: "Luxury Resort",
    hotelRating: 5,
    hotelLogo: "/user-profile.jpg",
    bookingId: "xyz789",
    startDay: "2023-09-20",
    endDay: "2023-09-25",
    noAdults: 3,
    noChildern: 2,
    noRoom: 2,
    state: "inProgress"
  },
  {
    hotelName: "Cozy Inn",
    hotelRating: 3,
    hotelLogo: "/user-profile.jpg",
    bookingId: "def456",
    startDay: "2023-10-05",
    endDay: "2023-10-07",
    noAdults: 1,
    noChildern: 0,
    noRoom: 1,
    state: "coming"
  },
  {
    hotelName: "Grand Hotel",
    hotelRating: 4,
    hotelLogo: "/user-profile.jpg",
    bookingId: "abc123",
    startDay: "2023-08-10",
    endDay: "2023-08-15",
    noAdults: 2,
    noChildern: 1,
    noRoom: 1,
    state: "done"
  },
  {
    hotelName: "Grand Hotel",
    hotelRating: 4,
    hotelLogo: "/user-profile.jpg",
    bookingId: "abc124",
    startDay: "2023-08-10",
    endDay: "2023-08-15",
    noAdults: 2,
    noChildern: 1,
    noRoom: 1,
    state: "done"
  }
]
interface Istates {
  done: "default"
  inProgress: "success"
  coming: "primary"
}
const states: Istates = {
  done: "default",
  inProgress: "success",
  coming: "primary"
}

const BookingsContent = function BookingsContent() {
  const {isOpen, onOpen, onClose} = useDisclosure()
  const rout = useRouter()
  return (
    <>
      <div className="mx-4 md:my-container grid grid-cols-1 lg:grid-cols-2 gap-2 my-10">
        {bookings.map(
          ({
            bookingId,
            hotelLogo,
            hotelName,
            hotelRating,
            startDay,
            endDay,
            noAdults,
            noChildern,
            noRoom,
            state
          }) => (
            <div
              key={bookingId}
              className="flex bg-gray-100 p-3 gap-3 rounded-lg">
              <div className="relative h-20 w-20 rounded-lg overflow-hidden">
                <Image src={hotelLogo} alt={hotelName} fill />
              </div>
              <div>
                <h3 className="heading-3">{hotelName}</h3>
                <Rating value={hotelRating} />
                <p className="body-sm">{`${startDay} To ${endDay} - ${noAdults} Adults - ${noChildern} Childern - ${noRoom} Room`}</p>
              </div>
              <div className="flex-1 flex justify-end">
                <MyButton
                  color={states[state]}
                  onClick={() => {
                    if (state !== "inProgress") {
                      onOpen()
                    } else {
                      rout.push("/booking")
                    }
                  }}>
                  {bookingId}
                </MyButton>
              </div>
            </div>
          )
        )}
      </div>
      <BookingDetailsModal isOpen={isOpen} onClose={onClose} />
    </>
  )
}

export default BookingsContent
