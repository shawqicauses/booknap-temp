import {
  GoogleMap,
  OverlayView,
  OverlayViewF,
  DirectionsRenderer,
  useGoogleMap
} from "@react-google-maps/api"
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState
} from "react"
import {getGeocode, getDetails} from "use-places-autocomplete"
import {useRouter} from "next/router"
import {BiCurrentLocation} from "react-icons/bi"
import {FiMinus, FiPlus} from "react-icons/fi"
import {useDisclosure} from "@nextui-org/react"
import {FaHotel} from "react-icons/fa"
import {Hotel} from "../../types"
import MyButton from "./button"
import PlacesSuggestionInput from "./searchPlaces"
import HotelPageModal from "../modal/hotel-page-modal"

interface IPosition {
  lat: number
  lng: number
}
const ResetButton = function ResetButton({
  pos,
  setPos,
  userPos,
  setZoom
}: {
  pos: {lat: number; lng: number}
  setPos: Function
  userPos: IPosition
  setZoom: Function
}) {
  const map = useGoogleMap()
  const router = useRouter()
  const handleCenterChanged = useCallback(() => {
    const newCenter = map?.getCenter()
    if (pos.lat !== newCenter?.lat() && pos.lng !== newCenter?.lng()) {
      setPos({
        lat: newCenter?.lat(),
        lng: newCenter?.lng()
      })
    }
  }, [map, pos.lat, pos.lng, setPos])

  useEffect(() => {
    if (typeof window !== "undefined" && router.isReady) {
      const {lat, lng} = router.query
      if (map) {
        const bounds = new window.google.maps.LatLngBounds()
        if (lat && lng) {
          bounds.extend({lat: Number(lat), lng: Number(lng)})
        } else {
          bounds.extend(pos)
        }
        map.fitBounds(bounds)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map])

  useEffect(() => {
    if (map) {
      map.addListener("center_changed", handleCenterChanged)
      map.addListener(
        "click",
        (e: {latLng: {lat: () => any; lng: () => any}}) => {
          setPos({
            lat: e.latLng?.lat() ?? pos.lat,
            lng: e.latLng?.lng() ?? pos.lng
          })
          const bounds = new window.google.maps.LatLngBounds()
          bounds.extend({
            lat: e.latLng?.lat() ?? pos.lat,
            lng: e.latLng?.lng() ?? pos.lng
          })
          map.fitBounds(bounds)
          setZoom((pre: number) => pre)
        }
      )
      return () => {}
    }
  }, [handleCenterChanged, map, pos.lat, pos.lng, setPos, setZoom])
  return (
    <MyButton
      color="white"
      size="navIcon"
      className="shadow-sm"
      isIconOnly
      onClick={() => {
        setPos(userPos)
        // setMapCenter(userPos)
        const bounds = new window.google.maps.LatLngBounds()
        bounds.extend(userPos)
        map?.fitBounds(bounds)
        setZoom(1)
      }}>
      <BiCurrentLocation className="h-5 w-5 text-gray-400" />
    </MyButton>
  )
}
const SearchBar = function SearchBar({
  pos,
  setPos,
  destination,
  setDestination,
  isCurrentBooking,
  openBookingModal
}: {
  pos: IPosition
  setDestination: Dispatch<SetStateAction<string>>
  setPos: Dispatch<SetStateAction<IPosition | undefined>>
  destination: string
  isCurrentBooking: boolean
  openBookingModal: Function
}) {
  const map = useGoogleMap()

  return (
    <div className="absolute bottom-5 left-[50%] -translate-x-[50%] w-full flex justify-center gap-2 flex-wrap">
      <PlacesSuggestionInput
        setPosition={setPos}
        startValue={destination}
        setDestination={setDestination}
        setMapCenter={(placePos: IPosition) => {
          if (map) {
            const bounds = new window.google.maps.LatLngBounds()
            bounds.extend(placePos)
            map.fitBounds(bounds)
          }
        }}
      />
      <div>
        <MyButton
          color="primary"
          isDisabled={isCurrentBooking}
          className="!text-md"
          size="xl"
          onClick={() => {
            openBookingModal()
            getGeocode({
              location: pos
            })
              .then((value) => {
                return value[0].place_id
              })
              .then((res) => {
                getDetails({placeId: res}).then(
                  (data: string | google.maps.places.PlaceResult) => {
                    if (typeof data !== "string") {
                      if (data?.name) {
                        setDestination(`${data?.name}`)
                      } else if (data?.formatted_address) {
                        setDestination(`${data?.formatted_address}`)
                      } else if (typeof data === "object") {
                        if (data?.address_components) {
                          setDestination(
                            `${data?.address_components
                              .map((addres) => addres?.long_name)
                              .join(" ")}`
                          )
                        }
                      }
                    }
                  }
                )
              })
          }}>
          Book Now
        </MyButton>
      </div>
    </div>
  )
}

const MyGoogleMap = function MyGoogleMap({
  pos,
  setPos,
  userPos,
  hotels,
  myZoom,
  setDestination,
  setMyZoom,
  destination,
  isCurrentBooking,
  openBookingModal
}: {
  pos: IPosition
  setPos: Dispatch<SetStateAction<IPosition | undefined>>
  userPos: IPosition
  hotels: Array<Hotel>
  myZoom: number
  setDestination: Dispatch<SetStateAction<string>>
  setMyZoom: Function
  destination: string
  isCurrentBooking: boolean
  openBookingModal: Function
}) {
  const {isOpen, onOpen, onClose} = useDisclosure()
  const [hotel, setHotel] = useState<Hotel | null>(null)
  const OnCloseModal = () => {
    onClose()
    setHotel(null)
  }
  return (
    <GoogleMap
      zoom={18 - myZoom}
      center={userPos}
      mapContainerClassName="w-full h-full"
      options={{disableDefaultUI: true, maxZoom: 18, minZoom: 13}}
      onClick={(e) => {
        getGeocode({
          location: {
            lat: e.latLng?.lat() ?? pos.lat,
            lng: e.latLng?.lng() ?? pos.lng
          }
        })
          .then((value) => {
            return value[0].place_id
          })
          .then((res) => {
            getDetails({placeId: res}).then(
              (data: string | google.maps.places.PlaceResult) => {
                if (typeof data !== "string") {
                  if (data?.name) {
                    setDestination(`${data?.name}`)
                  } else if (data?.formatted_address) {
                    setDestination(`${data?.formatted_address}`)
                  } else if (typeof data === "object") {
                    if (data?.address_components) {
                      setDestination(
                        `${data?.address_components
                          .map((addres) => addres?.long_name)
                          .join(" ")}`
                      )
                    }
                  }
                }
              }
            )
          })
      }}>
      <DirectionsRenderer routeIndex={1} />
      <OverlayViewF
        position={userPos}
        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        zIndex={1000}>
        <div className="relative flex justify-center items-center">
          <div className="absolute w-10 h-10 flex items-center justify-center bg-blue-900 rounded-full">
            <span className="text-white">ME</span>
          </div>
        </div>
      </OverlayViewF>
      {hotels.map((hotelPos) => (
        <OverlayViewF
          key={hotelPos.id}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          position={{lat: Number(hotelPos.lat), lng: Number(hotelPos.lng)}}>
          <button
            type="button"
            className="relative flex justify-center items-center"
            onClick={() => {
              setHotel(hotelPos)
              onOpen()
            }}>
            <div className="absolute w-16 h-16 rounded-full bg-white p-2">
              <FaHotel className="w-full h-full text-black" />
              {hotelPos.is_booking ? (
                <div className="relative w-0 h-0">
                  <div className="absolute z-10 top-1 right-2">Hi</div>
                </div>
              ) : null}
            </div>
          </button>
        </OverlayViewF>
      ))}
      <div className="absolute flex flex-col gap-2 right-3 top-3 z-20">
        <MyButton
          color="white"
          size="navIcon"
          className="shadow-sm"
          isIconOnly
          onClick={() => {
            setMyZoom((pre: number) => (pre > 4 ? pre : pre + 1))
          }}>
          <FiMinus className="h-5 w-5 text-gray-400" />
        </MyButton>
        <MyButton
          color="white"
          size="navIcon"
          className="shadow-sm"
          isIconOnly
          onClick={() => {
            setMyZoom((pre: number) => (pre < 2 ? pre : pre - 1))
          }}>
          <FiPlus className="h-5 w-5 text-gray-400" />
        </MyButton>
        <ResetButton
          pos={pos}
          setPos={setPos}
          userPos={userPos}
          setZoom={setMyZoom}
        />
      </div>
      <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] z-[1]">
        <div className="w-[0] h-[0] flex items-center relative justify-center">
          <div className=" absolute w-[10px] h-[10px] bg-black/40 rounded-full" />
          <div className=" absolute w-[80px] h-[80px] bg-black/10 rounded-full" />
          {myZoom > 1 ? (
            <div className=" absolute w-[120px] h-[120px] bg-black/10 rounded-full" />
          ) : null}
          {myZoom > 2 ? (
            <div className=" absolute w-[160px] h-[160px] bg-black/5 rounded-full" />
          ) : null}
          {myZoom > 3 ? (
            <div className=" absolute w-[200px] h-[200px] bg-black/5 rounded-full" />
          ) : null}
          {myZoom > 4 ? (
            <div className=" absolute w-[240px] h-[240px] bg-black/5 rounded-full" />
          ) : null}
        </div>
      </div>
      <SearchBar
        pos={pos}
        isCurrentBooking={isCurrentBooking}
        destination={destination}
        openBookingModal={openBookingModal}
        setPos={setPos}
        setDestination={setDestination}
      />
      {hotel ? (
        <HotelPageModal isOpen={isOpen} onClose={OnCloseModal} hotel={hotel} />
      ) : null}
    </GoogleMap>
  )
}

export default React.memo(MyGoogleMap)
