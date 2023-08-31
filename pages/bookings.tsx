import {NextPage} from "next"
import BookingsContent from "../components/bookings"
import Footer from "../components/layout/footer"

const Bookings: NextPage = function Bookings() {
  return (
    <div>
      <BookingsContent />
      <Footer />
    </div>
  )
}

export default Bookings
