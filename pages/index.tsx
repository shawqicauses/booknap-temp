import {useDisclosure} from "@nextui-org/react"
import type {NextPage} from "next"
import {Libraries, useLoadScript} from "@react-google-maps/api"
import {useEffect, useMemo, useState} from "react"
import {FiMinus, FiPlus} from "react-icons/fi"
import BookingModal from "../components/modal/booking-modal"
import MyGoogleMap from "../components/uis/map"
import Sidebar from "../components/uis/sidebar"
import LoadingDiv from "../components/uis/loading"
import useFetch from "../hooks/use-fetch"
import {IHotel} from "../types"
import MyButton from "../components/uis/button"

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
  const [myZoom, setMyZoom] = useState(1)
  const {isLoaded} = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries
  })

  const [userPos, setUserPos] = useState<IPosition>()
  const [pos, setPos] = useState<IPosition | undefined>({lat: 30, lng: 40})
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
      <div className="flex main-hight relative">
        <div className="absolute flex flex-col gap-2 right-3 top-3 z-20">
          <MyButton
            color="white"
            size="navIcon"
            className="shadow-sm"
            isIconOnly
            onClick={() => {
              setMyZoom((pre) => (pre > 4 ? pre : pre + 1))
            }}>
            <FiPlus className="h-5 w-5 text-gray-400" />
          </MyButton>
          <MyButton
            color="white"
            size="navIcon"
            className="shadow-sm"
            isIconOnly
            onClick={() => {
              setMyZoom((pre) => (pre < 2 ? pre : pre - 1))
            }}>
            <FiMinus className="h-5 w-5 text-gray-400" />
          </MyButton>
        </div>
        <Sidebar />
        {!isLoaded || !userPos ? (
          <LoadingDiv />
        ) : (
          <MyGoogleMap
            pos={pos!}
            userPos={userPos ?? {lat: 30, lng: 30}}
            MyZoom={myZoom}
            hotels={hotels}
            handleClick={onOpen}
          />
        )}
      </div>
      <BookingModal
        isOpen={isOpen}
        onClose={onClose}
        setPos={setPos}
        myZoom={myZoom}
      />
    </main>
  )
}

export default MyHome
