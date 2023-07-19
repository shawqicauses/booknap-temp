import type {NextPage} from "next"
import BookingModal from "../components/booking-modal/booking-modal"

const MyHome: NextPage = function MyHome() {
  return (
    <main>
      <BookingModal />
    </main>
  )
}

export default MyHome
