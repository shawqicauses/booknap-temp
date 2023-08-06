import {Rating} from "@mui/material"
import {Modal, ModalBody, ModalContent} from "@nextui-org/react"
import Image from "next/image"
import React from "react"

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
  onClose
}: {
  isOpen: boolean
  onClose: () => void
}) {
  return (
    <Modal
      size="xl"
      isOpen={isOpen}
      onClose={onClose}
      className="bg-gray-100"
      scrollBehavior="inside">
      <ModalContent>
        <ModalBody>
          <div className="p-10">
            <div className="my-flex-between py-2 text-sm">
              <span className="bg-white rounded-full inline-block px-2 py-1 ">
                Order {bookingData.bookingId}
              </span>
              <span className="bg-white rounded-full inline-block px-2 py-1">
                {bookingData.endDay}
              </span>
            </div>
            <div
              key={bookingData.bookingId}
              className="flex gap-3 rounded-lg py-2">
              <div className="relative h-20 w-20 rounded-lg overflow-hidden">
                <Image
                  src={bookingData.hotelLogo}
                  alt={bookingData.hotelName}
                  fill
                />
              </div>
              <div>
                <h3 className="heading-3">{bookingData.hotelName}</h3>
                <Rating value={bookingData.hotelRating} readOnly />
              </div>
            </div>
            <div>
              <div className="my-flex-between py-2 border-b-1 border-gray-200">
                <span>From:</span>
                <span>{bookingData.startDay}</span>
              </div>
              <div className="my-flex-between py-2 border-b-1 border-gray-200">
                <span>To:</span>
                <span>{bookingData.startDay}</span>
              </div>
              <div className="my-flex-between py-2 border-b-1 border-gray-200">
                <span>Time:</span>
                <span>{bookingData.endTime}</span>
              </div>
              <div className="my-flex-between py-2 border-b-1 border-gray-200">
                <span>Grand Room:</span>
                <span>{bookingData.grandRoom}</span>
              </div>
              <div className="my-flex-between py-2 border-b-1 border-gray-200">
                <span>Adults:</span>
                <span>{bookingData.noAdults}</span>
              </div>
              <div className="my-flex-between py-2 border-b-1 border-gray-200">
                <span>Childern:</span>
                <span>{bookingData.noChildern}</span>
              </div>
              <div className="my-flex-between py-2  font-semi-bold text-medium">
                <span>Price:</span>
                <span className="text-red-500">{bookingData.price}$</span>
              </div>
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default BookingDetailsModal
