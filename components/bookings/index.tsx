/* eslint-disable no-nested-ternary */
import {Pagination, useDisclosure} from "@nextui-org/react"
import React, {useEffect, useState} from "react"
import {useRouter} from "next/router"
import BookingDetailsModal from "../modal/booking-details-modal"
import useFetch from "../../hooks/use-fetch"
import LoadingDiv from "../uis/loading"
import {IBooking} from "../../types"
import BookingBox from "./booking-box"
import State from "../state"

export interface Result {
  data: IBooking[]
  last_page: number
}
export interface IListBookingHotelRes {
  result: Result
}

const BookingsList = function BookingsList({
  setSelectedBooking,
  onOpen,
  loading,
  setLoading
}: {
  setSelectedBooking: Function
  onOpen: () => void
  loading: boolean
  setLoading: Function
}) {
  const router = useRouter()
  const {page} = router.query
  const {data} = useFetch<IListBookingHotelRes>(
    router.isReady ? `hotels/bookings?status=1&is_active=0&page=${page || 1}` : ""
  )
  const [bookings, setBookings] = useState<IBooking[]>([])

  useEffect(() => {
    if (data) {
      setBookings(data.result.data)
      if (data.result.last_page < Number(page)) {
        router.push("/bookings/?page=1")
      } else {
        setLoading(false)
      }
    }
  }, [data, page, router, setLoading])

  return (
    <>
      {loading || !data ? (
        <LoadingDiv />
      ) : bookings.filter((booking) => booking.hotel).length ? (
        <div className="mx-4 md:my-container grid grid-cols-1 lg:grid-cols-2 gap-2 my-5">
          {bookings
            .sort((a, b) => new Date(b.date_from).getTime() - new Date(a.date_from).getTime())
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
      ) : (
        <State image="/no-booking.svg" title="No Bookings" description="You have no Booking" />
      )}
      <span />
    </>
  )
}

const BookingsContent = function BookingsContent() {
  const router = useRouter()
  const {isOpen, onOpen, onClose} = useDisclosure()
  const page = Number(router.query.page)
  const [numberOfPages, setNumberOfPages] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)

  const {data} = useFetch<IListBookingHotelRes>(`hotels/bookings?status=1&is_active=0`)
  const [selectedBooking, setSelectedBooking] = useState<IBooking | null>(null)
  useEffect(() => {
    if (data) {
      setNumberOfPages(data.result.last_page)
    }
  }, [data])

  if (data) {
    return (
      <>
        <div className="my-container my-5">
          <div className="text-center bg-gray-100 dark:bg-mirage p-4 pt-8 bg-[url('/mask.png')] mb-6">
            <h1 className="heading-1 text-my-primary mb-4">My Bookings</h1>
          </div>
        </div>
        <BookingsList
          onOpen={onOpen}
          setSelectedBooking={setSelectedBooking}
          loading={loading}
          setLoading={setLoading}
        />
        {numberOfPages > 0 && data.result.data.length > 0 ? (
          <div className="my-container flex justify-center p-2 z-0 relative">
            <Pagination
              total={numberOfPages || 1}
              initialPage={1}
              page={page}
              onChange={(num: number) => {
                router.push(`/bookings/?page=${num}`)
                setLoading(true)
              }}
              color="primary"
              aria-label="Pagination"
            />
          </div>
        ) : null}
        {selectedBooking ? (
          <BookingDetailsModal isOpen={isOpen} onClose={onClose} Booking={selectedBooking} />
        ) : null}
      </>
    )
  }
  return <LoadingDiv />
}

export default BookingsContent
