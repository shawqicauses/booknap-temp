import {NextPage} from "next"
import HotelPageContent from "../../components/bookings/currant-booking"
import Footer from "../../components/layout/footer"
import Sidebar from "../../components/uis/sidebar"
import About from "../../components/bookings/currant-booking/about"
import Protected from "../../components/uis/protected"

const Booking: NextPage = function Booking() {
  return (
    <Protected>
      <div className="flex mb-10">
        <Sidebar />
        <div className="my-container">
          <HotelPageContent />
          <About />
        </div>
      </div>
      <Footer />
    </Protected>
  )
}

export default Booking
