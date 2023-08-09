import {useDisclosure} from "@nextui-org/react"
import type {NextPage} from "next"
import {useLoadScript} from "@react-google-maps/api"
import {useEffect, useState} from "react"
import BookingModal from "../components/modal/booking-modal"
import MyGoogleMap from "../components/map"
import Sidebar from "../components/sidebar"

interface IPostion {
  lat: number
  lng: number
}
const MyHome: NextPage = function MyHome() {
  const {isOpen, onOpen, onClose} = useDisclosure()
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  const {isLoaded} = useLoadScript({googleMapsApiKey: apiKey || ""})
  const [pos, setPos] = useState<IPostion>()

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          setPos({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
        }
      )
    }
  }, [])
  return (
    <main className="main-hight">
      <div className="flex main-hight">
        <Sidebar />
        {!isLoaded ? (
          <div>Loading ...</div>
        ) : (
          <MyGoogleMap
            pos={pos ?? {lat: 30, lng: 40}}
            setPos={setPos}
            handleClick={onOpen}
          />
        )}
      </div>
      <BookingModal isOpen={isOpen} onClose={onClose} />
    </main>
  )
}

export default MyHome
