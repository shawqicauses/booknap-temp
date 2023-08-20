import React from "react"
import Footer from "../components/layout/footer"
import HotelPageContent from "../components/bookings/currant-booking"
import Sidebar from "../components/uis/sidebar"

const Booking = function Booking() {
  return (
    <>
      <div className="flex bg-white">
        <Sidebar />
        <HotelPageContent />
      </div>
      <Footer />
    </>
  )
}

export default Booking
