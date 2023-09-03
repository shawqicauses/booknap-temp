import BookingsContent from "../components/bookings"
import Footer from "../components/layout/footer"
import Protected from "../components/uis/protected"

const Bookings = function Bookings() {
  return (
    <Protected>
      <BookingsContent />
      <Footer />
    </Protected>
  )
}

export default Bookings
