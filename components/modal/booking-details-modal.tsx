import {Rating} from "@mui/material"
import {Modal, ModalBody, ModalContent} from "@nextui-org/react"
import {AiFillStar} from "react-icons/ai"
import Image from "next/image"
import React from "react"
import {IBooking} from "../../types"
import {type3} from "../uis/modal-styles"

const bookingData = {
  hotelName: "Grand Hotel",
  hotelRating: 4,
  hotelLogo: "/user-profile.jpg",
  bookingId: "abc123",
  startDay: "2023-08-10",
  endDay: "2023-08-15",
  endTime: "12:00",
  noAdults: 2,
  noChildern: 1,
  grandRoom: 1,
  price: 180
}

const BookingDetailsModal = function BookingDetailsModal({
  isOpen,
  onClose,
  Booking
}: {
  isOpen: boolean
  onClose: () => void
  Booking: IBooking
}) {
  return (
    <Modal size="lg" classNames={type3} isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalBody>
          <div className="p-10">
            <div className="my-flex-between py-2 text-sm">
              <span className="bg-gray-100 dark:bg-mirage rounded-lg inline-block px-2 py-1 ">
                Order {Booking.id}
              </span>
              <span className="bg-gray-100 dark:bg-mirage rounded-lg inline-block px-2 py-1">
                {Booking.date_to}
              </span>
            </div>
            {Booking.hotel ? (
              <div className="flex gap-3 rounded-lg py-2">
                <div className="relative h-20 w-20 rounded-lg overflow-hidden">
                  <Image src={Booking.hotel?.logo} alt={Booking.hotel?.name} fill />
                </div>
                <div>
                  <h3 className="heading-main-3 text-white">{bookingData.hotelName}</h3>
                  <Rating
                    name="read-only"
                    value={Booking.hotel?.stars}
                    className="text-blue-700"
                    readOnly
                    style={{color: "#2F5597"}}
                    size="small"
                    icon={<AiFillStar className="text-inherit" />}
                    emptyIcon={<AiFillStar className="text-inherit" />}
                  />
                </div>
              </div>
            ) : null}
            <div>
              <div className="my-flex-between py-2 border-b-1 border-gray-200">
                <span>From:</span>
                <span>{Booking.date_from}</span>
              </div>
              <div className="my-flex-between py-2 border-b-1 border-gray-200">
                <span>To:</span>
                <span>{Booking.date_to}</span>
              </div>
              <div className="my-flex-between py-2 border-b-1 border-gray-200">
                <span>Grand Room:</span>
                <span>{bookingData.grandRoom}</span>
              </div>
              <div className="my-flex-between py-2 border-b-1 border-gray-200">
                <span>Adults:</span>
                <span>{Booking.adults}</span>
              </div>
              <div className="my-flex-between py-2 border-b-1 border-gray-200">
                <span>Children:</span>
                <span>{Booking.children}</span>
              </div>
              <div className="my-flex-between py-2  font-semi-bold text-medium">
                <span>Price:</span>
                <span className="text-red-500">{Booking.rooms_no}$</span>
              </div>
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default BookingDetailsModal
