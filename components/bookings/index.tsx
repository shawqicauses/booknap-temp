import {useDisclosure} from "@nextui-org/react"
import React, {useEffect, useState} from "react"
import BookingDetailsModal from "../modal/booking-details-modal"
import useFetch from "../../hooks/use-fetch"
import LoadingDiv from "../uis/loading"
import {IBooking} from "../../types"
import BookingBox from "./booking-box"

export interface Result {
  data: IBooking[]
}
export interface IListBookingHotelRes {
  result: Result
}

const BookingsContent = function BookingsContent() {
  const {isOpen, onOpen, onClose} = useDisclosure()
  const [bookings, setBookings] = useState<IBooking[]>([])
  const {data} = useFetch<IListBookingHotelRes>("hotels/bookings")
  const [selectedBooking, setSelectedBooking] = useState<IBooking | null>(null)
  useEffect(() => {
    if (data) {
      setBookings(data.result.data)
    }
  }, [data])

  if (data) {
    return (
      <>
        <div className="mx-4 md:my-container grid grid-cols-1 lg:grid-cols-2 gap-2 my-10">
          {bookings
            .filter((booking) => booking.hotel)
            .map((booking) => (
              <BookingBox
                key={booking.id}
                {...booking}
                onOpen={() => {
                  setSelectedBooking(booking)
                  onOpen()
                }}
              />
            ))}
        </div>
        {selectedBooking ? (
          <BookingDetailsModal
            isOpen={isOpen}
            onClose={onClose}
            Booking={selectedBooking}
          />
        ) : null}
      </>
    )
  }
  return <LoadingDiv />
}

export default BookingsContent
