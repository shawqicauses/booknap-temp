import React from "react"
import Footer from "../components/footer"
import HotelPageContent from "../components/booking"
import Sidebar from "../components/sidebar"

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
