import React, {useEffect, useState} from "react"
import IconSidebar from "../icon-sidebar"
import OffersSidebar from "../bookings/offers-list-sidebar"
import {useCurrentBookingOrder} from "../../stores/current-booking-order"
import BookingSidebar from "../bookings/bookings-list-sidebar"
import {useUser} from "../../stores/user"

const Sidebar = function Sidebar() {
  const [showOffersSidebar, setShowOffersSidebar] = useState<boolean>(false)
  const [showBookingsSidebar, setShowBookingsSidebar] = useState<boolean>(false)

  const {user} = useUser()
  const {currentBooking, ready} = useCurrentBookingOrder()
  const [offersNum, setOffersNum] = useState<number | null>(null)
  useEffect(() => {
    if (currentBooking && ready) {
      setShowOffersSidebar(true)
    }
  }, [ready, currentBooking])

  if (user) {
    return (
      <div>
        <IconSidebar
          setShowOffersSidebar={setShowOffersSidebar}
          setShowBookingsSidebar={setShowBookingsSidebar}
          isBookingNow={!!currentBooking}
          offersNum={offersNum || 0}
        />
        <OffersSidebar
          show={showOffersSidebar}
          setShow={setShowOffersSidebar}
          setOffersNum={setOffersNum}
        />
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
