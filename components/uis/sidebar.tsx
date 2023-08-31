import React, {useContext, useState} from "react"
import IconSidebar from "../icon-sidebar"
import BookingSidebar from "../bookings/booking-sidebar"
import {Auth} from "../../stores/auth"
import {CurrentBookingOrder} from "../../stores/current-booking-order"

const Sidebar = function Sidebar() {
  const [showBookingSidebar, setShowBookingSidebar] = useState(true)
  const {token} = useContext(Auth)
  const {result} = useContext(CurrentBookingOrder)

  if (token) {
    return (
      <div>
        <IconSidebar
          setShowBookingSidebar={setShowBookingSidebar}
          isBookingNow={!!result}
        />
        {result ? (
          <BookingSidebar
            show={showBookingSidebar}
            setShow={setShowBookingSidebar}
          />
        ) : null}
      </div>
    )
  }
  return null
}

export default Sidebar
