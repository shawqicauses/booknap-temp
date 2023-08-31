import {useDisclosure} from "@nextui-org/react"
import type {NextPage} from "next"
import {Libraries, useLoadScript} from "@react-google-maps/api"
import {useEffect, useMemo, useState} from "react"
import BookingModal from "../components/modal/booking-modal"
import MyGoogleMap from "../components/uis/map"
import Sidebar from "../components/uis/sidebar"
import LoadingDiv from "../components/uis/loading"
import useFetch from "../hooks/use-fetch"
import {IHotel} from "../types"

export interface Result {
  data: IHotel[]
  total: number
}
export interface IMapHotelsRes {
  success: boolean
  message: string
  result: Result
}

interface IPosition {
  lat: number
  lng: number
}
const MyHome: NextPage = function MyHome() {
  const {data: respond} = useFetch<IMapHotelsRes>(
    "hotels/front/map-list/31.522816/34.4489984/1000"
  )

  const {isOpen, onOpen, onClose} = useDisclosure()
  const libraries: Libraries = useMemo(() => ["places", "geocoding"], [])

  const {isLoaded} = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries
  })

  const [userPos, setUserPos] = useState<IPosition>()
  const [pos, setPos] = useState<IPosition>()
  const [hotels, setHotels] = useState<Array<IHotel>>([])

  useEffect(() => {
    if (respond) {
      setHotels(respond.result.data)
    }
  }, [respond])

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          setUserPos({
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
        {!isLoaded || !userPos ? (
          <LoadingDiv />
        ) : (
          <MyGoogleMap
            pos={{lat: 30, lng: 40}}
            center={userPos ?? {lat: 30, lng: 30}}
            setPos={setPos}
            hotels={hotels}
            handleClick={onOpen}
          />
        )}
      </div>
      <BookingModal isOpen={isOpen} onClose={onClose} />
    </main>
  )
}

export default MyHome
