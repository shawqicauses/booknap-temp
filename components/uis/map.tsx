import Decimal from "decimal.js"
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
import {MdLocalOffer} from "react-icons/md"
import {BiCurrentLocation, BiSolidUserCircle} from "react-icons/bi"
import {FiMinus, FiPlus} from "react-icons/fi"
import {useDisclosure} from "@nextui-org/react"
import {FaHotel} from "react-icons/fa"
import {Hotel, ICheckSitting} from "../../types"
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
  setZoom,
  moveTo,
  calculateRoute,
  setDirectionsResponse,
  directionsResponse
}: {
  pos: {lat: number; lng: number}
  setPos: Function
  userPos: IPosition
  setZoom: Function
  moveTo: Function
  calculateRoute: Function
  setDirectionsResponse: Function
  directionsResponse: any
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
        if (lat && lng) {
          calculateRoute()
        } else {
          moveTo(map, pos)
          setDirectionsResponse(null)
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, moveTo, router])

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
          moveTo(map, {
            lat: e.latLng?.lat() ?? pos.lat,
            lng: e.latLng?.lng() ?? pos.lng
          })
          if (directionsResponse) {
            router.push("/")
            setDirectionsResponse(null)
          }
        }
      )
      return () => {}
    }
  }, [
    handleCenterChanged,
    map,
    moveTo,
    pos.lat,
    pos.lng,
    setPos,
    setZoom,
    router,
    setDirectionsResponse,
    directionsResponse
  ])

  return (
    <MyButton
      color="white"
      size="navIcon"
      className="shadow-sm"
      isIconOnly
      onClick={() => {
        setPos(userPos)
        moveTo(map, userPos)
        if (directionsResponse) {
          router.push("/")
        }
        setZoom(0)
        setDirectionsResponse(null)
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
    <div className="absolute bottom-5 left-[50%] -translate-x-[50%] w-full flex justify-center gap-2">
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
          className="!text-sm"
          size="xl"
          startContent={<MdLocalOffer className="h-4 w-4 text-white" />}
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

const HotelMarker = function HotelMarker({
  hotelPos,
  handleClick,
  setPos
}: {
  hotelPos: Hotel
  handleClick: Function
  setPos: Function
}) {
  return (
    <OverlayViewF
      key={hotelPos.id}
      mapPaneName={OverlayView.FLOAT_PANE}
      position={{lat: Number(hotelPos.lat), lng: Number(hotelPos.lng)}}>
      <button
        type="button"
        className="relative flex justify-center items-center"
        onClick={() => {
          setPos({lat: Number(hotelPos.lat), lng: Number(hotelPos.lng)})
          handleClick()
        }}>
        <div className="absolute w-14 h-14 rounded-full bg-white p-2">
          <FaHotel className="w-full h-full text-black" />
          {hotelPos.is_booking ? (
            <div className="absolute z-10 top-0 right-0 rounded-full bg-white h-5 w-5">
              <BiSolidUserCircle className="h-5 w-5 z-10 text-green-500" />
            </div>
          ) : null}
        </div>
      </button>
    </OverlayViewF>
  )
}
const zoomLevelArray = [
  "156543.6375535059",
  "78271.81877675295",
  "39135.9093883765",
  "19567.95469418825",
  "9783.977347094125",
  "4891.988673547063",
  "2445.99433677353125",
  "1222.9971683867656",
  "611.4985841933828",
  "305.7492920966914",
  "152.8746460483457",
  "76.43732302417285",
  "38.21866151208643",
  "19.10933075604321",
  "9.554665378021605",
  "4.777332689010803",
  "2.3886663445054014",
  "1.1943331722527007",
  "0.5971665861263504",
  "0.2985832930631752",
  "0.1492916465315876",
  "0.0746458232657938",
  "0.0373229116328969"
]

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
  openBookingModal,
  checkSittings
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
  checkSittings: ICheckSitting | undefined
}) {
  const router = useRouter()
  const {isOpen, onOpen, onClose} = useDisclosure()
  const [hotel, setHotel] = useState<Hotel | null>(null)
  const [directionsResponse, setDirectionsResponse] =
    useState<google.maps.DirectionsResult | null>(null)
  const OnCloseModal = () => {
    onClose()
    setHotel(null)
  }

  const handleClick = (hotelPos: Hotel) => {
    setHotel(hotelPos)
    onOpen()
    setDirectionsResponse(null)
  }
  const {lat, lng} = router.query
  const calculateRoute = async () => {
    // eslint-disable-next-line no-undef
    if (lat && lng) {
      const directionsService = new google.maps.DirectionsService()
      const results = await directionsService.route({
        origin: userPos,
        destination: {lat: Number(lat), lng: Number(lng)},
        // eslint-disable-next-line no-undef
        travelMode: google.maps.TravelMode.DRIVING
      })
      setDirectionsResponse(results)
    }
  }

  const moveTo = useCallback(
    (map: google.maps.Map | null, position: IPosition) => {
      const bounds = new window.google.maps.LatLngBounds()
      bounds.extend(
        hotel ? {lat: Number(hotel.lat), lng: Number(hotel.lng)} : position
      )
      map?.fitBounds(bounds)
      if (myZoom !== 0) {
        map?.setZoom(18 - myZoom)
      }
    },
    [hotel, myZoom]
  )

  const maxArea = new Decimal(checkSittings?.result.max_area || 1)
  const minArea = new Decimal(checkSittings?.result.min_area || 1)

  // Calculate d using Decimal
  const d = maxArea.minus(minArea).dividedBy(5)
  const r = new Decimal(zoomLevelArray[16 - myZoom])

  // Calculate size using Decimal
  const size = d.dividedBy(r)

  return (
    <GoogleMap
      zoom={16 - myZoom}
      center={userPos}
      mapContainerClassName="w-full h-full"
      options={{
        disableDefaultUI: true,
        maxZoom: 18,
        minZoom: 13,
        scrollwheel: false
      }}
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
      <OverlayViewF
        position={userPos}
        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        zIndex={1000}>
        <div className="relative flex justify-center items-center">
          <div className="absolute w-5 h-5 flex items-center justify-center bg-my-primary rounded-full">
            <div className="relative">
              <div className="absolute -top-14 left-[50%] -translate-x-[50%] bg-my-primary text-white font-semi-bold px-4 py-1 text-medium rounded-lg z-10 shadow-base">
                ME
              </div>
              <div className="absolute -top-6 left-[50%] w-0 h-0 -translate-x-[50%] border-transparent border-t-my-primary  border-[15px]" />
            </div>
          </div>
        </div>
      </OverlayViewF>
      {hotels.map((hotelPos) => (
        <HotelMarker
          handleClick={() => {
            handleClick(hotelPos)
          }}
          hotelPos={hotelPos}
          setPos={setPos}
        />
      ))}
      <div className="absolute flex flex-col gap-2 right-3 top-3 z-20">
        <MyButton
          color="white"
          size="navIcon"
          className="shadow-sm"
          isIconOnly
          isDisabled={!!directionsResponse || myZoom === 4}
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
          isDisabled={!!directionsResponse || myZoom === 0}
          onClick={() => {
            setMyZoom((pre: number) => (pre < 1 ? pre : pre - 1))
          }}>
          <FiPlus className="h-5 w-5 text-gray-400" />
        </MyButton>
        <ResetButton
          pos={pos}
          setPos={setPos}
          userPos={userPos}
          setZoom={setMyZoom}
          moveTo={moveTo}
          calculateRoute={calculateRoute}
          setDirectionsResponse={setDirectionsResponse}
          directionsResponse={directionsResponse}
        />
      </div>
      <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] z-[1]">
        <div className="w-[0] h-[0] flex items-center relative justify-center">
          <div className=" absolute w-[10px] h-[10px] bg-black/40 rounded-full" />
          <div
            className=" absolute bg-black/10 rounded-full"
            style={{
              width: `${size.toString()}px`,
              height: `${size.toString()}px`
            }}
          />
          {myZoom > 0 ? (
            <div
              className=" absolute bg-black/10 rounded-full"
              style={{
                width: `${size.mul(2)}px`,
                height: `${size.mul(2)}px`
              }}
            />
          ) : null}
          {myZoom > 1 ? (
            <div
              className=" absolute bg-black/5 rounded-full"
              style={{
                width: `${size.mul(3)}px`,
                height: `${size.mul(3)}px`
              }}
            />
          ) : null}
          {myZoom > 2 ? (
            <div
              className=" absolute bg-black/5 rounded-full"
              style={{
                width: `${size.mul(4)}px`,
                height: `${size.mul(4)}px`
              }}
            />
          ) : null}
          {myZoom > 3 ? (
            <div
              className=" absolute bg-black/5 rounded-full"
              style={{
                width: `${size.mul(5)}px`,
                height: `${size.mul(5)}px`
              }}
            />
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
      {directionsResponse && (
        <DirectionsRenderer directions={directionsResponse} />
      )}
    </GoogleMap>
  )
}

export default React.memo(MyGoogleMap)
