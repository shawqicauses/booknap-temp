import {NextPage} from "next"
import HotelPageContent from "../../components/bookings/currant-booking"
import Footer from "../../components/layout/footer"
import Sidebar from "../../components/uis/sidebar"
import Booking from "../../components/bookings/currant-booking/booking"
import Protected from "../../components/uis/protected"

const BookingData: NextPage = function BookingData() {
  return (
    <Protected>
      <div className="flex">
        <Sidebar />
        <div className="my-container">
          <HotelPageContent />
          <Booking />
        </div>
      </div>
      <Footer />
    </Protected>
  )
}

export default BookingData
