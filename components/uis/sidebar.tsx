import React, {useState} from "react"
import IconSidebar from "../icon-sidebar"
import OffersSidebar from "../bookings/offers-list-sidebar"
import {useCurrentBookingOrder} from "../../stores/current-booking-order"
import {useAuth} from "../../stores/auth"
import BookingSidebar from "../bookings/bookings-list-sidebar"

const Sidebar = function Sidebar() {
  const [showOffersSidebar, setShowOffersSidebar] = useState<boolean>(true)
  const [showBookingsSidebar, setShowBookingsSidebar] = useState<boolean>(false)

  const {token} = useAuth()
  const {currentBooking} = useCurrentBookingOrder()

  if (token) {
    return (
      <div>
        <IconSidebar
          setShowOffersSidebar={setShowOffersSidebar}
          setShowBookingsSidebar={setShowBookingsSidebar}
          isBookingNow={!!currentBooking}
        />
        {currentBooking ? (
          <OffersSidebar
            show={showOffersSidebar}
            setShow={setShowOffersSidebar}
          />
        ) : null}
        <BookingSidebar
          show={showBookingsSidebar}
          setShow={setShowBookingsSidebar}
        />
      </div>
    )
  }
  return null
}

export default Sidebar
