import {Spinner, useDisclosure} from "@nextui-org/react"
import type {NextPage} from "next"
import {useLoadScript} from "@react-google-maps/api"
import {useEffect, useState} from "react"
import {useQuery} from "@tanstack/react-query"
import BookingModal from "../components/modal/booking-modal"
import MyGoogleMap from "../components/uis/map"
import Sidebar from "../components/uis/sidebar"

interface IPostion {
  lat: number
  lng: number
}
const MyHome: NextPage = function MyHome() {
  const {isLoading, isError, isFetched, data} = useQuery({
    queryKey: ["hotelsMapList"],
    queryFn: async () => {
      const response = await fetch(
        "https://booknap-api.wpgooal.com/api/hotels/front/map-list/31/30/35"
      )
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
      return response.json()
    }
  })

  const {isOpen, onOpen, onClose} = useDisclosure()
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  const {isLoaded} = useLoadScript({googleMapsApiKey: apiKey || ""})
  const [pos, setPos] = useState<IPostion>()
  const [hotels, setHotels] = useState<Array<IPostion>>([])
  useEffect(() => {
    if (!isLoading && !isError && isFetched) {
      setHotels([...(data?.result?.data ?? []), {lat: 30, lng: 40}])
    }
  }, [isFetched, isLoading, isError, data?.result?.data])

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
        {!isLoaded || isLoading ? (
          <div className="w-full h-full my-flex">
            <Spinner size="lg" />
          </div>
        ) : (
          <MyGoogleMap
            pos={{lat: 30, lng: 40}}
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
