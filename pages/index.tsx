import type {NextPage} from "next"
import BookingModal from "../components/booking-modal/booking-modal"

const MyHome: NextPage = function MyHome() {
  return (
    <main className="h-screen">
      <BookingModal />
      <iframe
        title="map"
        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d27207.61226059946!2d34.4457216!3d31.525491099999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1690191191393!5m2!1sen!2s"
        className="w-full h-full"
        style={{border: "0"}}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </main>
  )
}

export default MyHome
