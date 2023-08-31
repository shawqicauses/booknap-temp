import React from "react"
import {NextPage} from "next"
import Footer from "../components/layout/footer"
import HotelPageContent from "../components/bookings/currant-booking"
import Sidebar from "../components/uis/sidebar"

const Booking: NextPage = function Booking() {
  return (
    <div>
      <div className="flex">
        <Sidebar />
        <HotelPageContent />
      </div>
      <Footer />
    </div>
  )
}

export default Booking
