import BookingsContent from "../components/bookings"
import Protected from "../components/uis/protected"

const Bookings = function Bookings() {
  return (
    <Protected>
      <BookingsContent />
    </Protected>
  )
}

export default Bookings
