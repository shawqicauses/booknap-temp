import {useDisclosure} from "@nextui-org/react"
import type {NextPage} from "next"
import {useLoadScript} from "@react-google-maps/api"
import BookingModal from "../components/booking-modal/booking-modal"
import BookingSidebar from "../components/booking-sidebar/booking-sidebar"
import MyGoogleMap from "../components/map"

const MyHome: NextPage = function MyHome() {
  const {isOpen, onOpen, onClose} = useDisclosure()
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

  const {isLoaded} = useLoadScript({googleMapsApiKey: apiKey || ""})

  return (
    <main className="main-hight">
      <BookingModal isOpen={isOpen} onClose={onClose} />
      <BookingSidebar />
      {/* <iframe
        title="map"
        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d27207.61226059946!2d34.4457216!3d31.525491099999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1690191191393!5m2!1sen!2s"
        className="w-full h-full !border-none !border-[0] "
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      /> */}
      {!isLoaded ? (
        <div>Loading ...</div>
      ) : (
        <MyGoogleMap lat={21.42216} lng={52.08427} handleClick={onOpen} />
      )}
    </main>
  )
}

export default MyHome
