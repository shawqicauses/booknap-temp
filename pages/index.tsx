import {useDisclosure} from "@nextui-org/react"
import type {NextPage} from "next"
import {Libraries, useLoadScript} from "@react-google-maps/api"
import {useEffect, useMemo, useState} from "react"
import BookingModal from "../components/modal/booking-modal"
import MyGoogleMap from "../components/uis/map"
import LoadingDiv from "../components/uis/loading"
import useFetch from "../hooks/use-fetch"
import {Hotel, ICheckSitting} from "../types"
import {useCurrentBookingOrder} from "../stores/current-booking-order"
import "leaflet/dist/leaflet.css"
import RatingModal from "../components/modal/rating-modal"
import {useAuth} from "../stores/auth"
import {useUser} from "../stores/user"

export interface IMapHotelsRes {
  success: boolean
  message: string
  result: Hotel[]
}

interface IPosition {
  lat: number
  lng: number
}
const MyHome: NextPage = function MyHome() {
  const {data: respond} = useFetch<IMapHotelsRes>(
    "hotels/front/map-list/31.522816/34.4489984/10000000"
  )
  const {data: checkSittings} = useFetch<ICheckSitting>("check-setting")

  const {isOpen, onOpen, onClose} = useDisclosure()
  const ratingModal = useDisclosure()

  const libraries: Libraries = useMemo(() => ["places", "geocoding"], [])
  const [destination, setDestination] = useState("")
  const [myZoom, setMyZoom] = useState(0)
  const {isLoaded} = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries
  })
  const {token, ready: tokenReady} = useAuth()
  const [userPos, setUserPos] = useState<IPosition>()
  const [pos, setPos] = useState<IPosition | undefined>()
  const [hotels, setHotels] = useState<Array<Hotel>>([])
  const {currentBooking} = useCurrentBookingOrder()
  const {hotelRating, ready} = useUser()

  useEffect(() => {
    if (respond) {
      setHotels(respond.result)
    }
  }, [respond])

  useEffect(() => {
    if (ready && tokenReady && hotelRating) {
      ratingModal.onOpen()
    }
  }, [ratingModal, hotelRating, ready, tokenReady])

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
        setUserPos({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        })
        setPos({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        })
      })
    }
  }, [])

  useEffect(() => {
    if (token && hotelRating) {
      ratingModal.onOpen()
    }
  }, [token, hotelRating, ratingModal])

  return (
    <main className="main-hight">
      {!isLoaded || !userPos ? (
        <LoadingDiv />
      ) : (
        <>
          <MyGoogleMap
            pos={pos || {lat: 30, lng: 40}}
            setPos={setPos}
            userPos={userPos ?? {lat: 30, lng: 30}}
            myZoom={myZoom}
            setMyZoom={setMyZoom}
            hotels={hotels}
            setDestination={setDestination}
            destination={destination}
            isCurrentBooking={!!currentBooking}
            openBookingModal={onOpen}
            checkSittings={checkSittings}
          />
          <BookingModal
            isOpen={isOpen}
            onClose={onClose}
            pos={pos || {lat: 30, lng: 40}}
            setPos={setPos}
            destination={destination}
            myZoom={myZoom}
            checkSittings={checkSittings}
          />

          <RatingModal isOpen={ratingModal.isOpen} onClose={ratingModal.onClose} />
        </>
      )}
    </main>
  )
}

export default MyHome
