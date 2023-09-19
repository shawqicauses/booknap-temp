import {GoogleMap, OverlayView, OverlayViewF} from "@react-google-maps/api"
import React, {Dispatch, SetStateAction} from "react"
import {getGeocode, getDetails} from "use-places-autocomplete"
import {FaHotel} from "react-icons/fa"
import {IHotel} from "../../types"

interface IPosition {
  lat: number
  lng: number
}

const MyGoogleMap = function MyGoogleMap({
  pos,
  setPos,
  userPos,
  hotels,
  MyZoom,
  setDestination
}: {
  pos: IPosition
  setPos: Dispatch<SetStateAction<IPosition | undefined>>
  userPos: IPosition
  hotels: Array<IHotel>
  MyZoom: number
  setDestination: Dispatch<SetStateAction<string>>
}) {
  return (
    <GoogleMap
      zoom={18 - MyZoom}
      center={pos}
      mapContainerClassName="w-full h-full"
      options={{disableDefaultUI: true, maxZoom: 18, minZoom: 13}}
      onClick={(e) => {
        setPos({
          lat: e.latLng?.lat() ?? pos.lat,
          lng: e.latLng?.lng() ?? pos.lng
        })
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
        position={pos}
        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
        <div className="w-[0] h-[0] flex items-center relative justify-center">
          <div className=" absolute w-[10px] h-[10px] bg-black/40 rounded-full" />
          <div className=" absolute w-[80px] h-[80px] bg-black/10 rounded-full" />
          {MyZoom > 1 ? (
            <div className=" absolute w-[120px] h-[120px] bg-black/10 rounded-full" />
          ) : null}
          {MyZoom > 2 ? (
            <div className=" absolute w-[160px] h-[160px] bg-black/5 rounded-full" />
          ) : null}
          {MyZoom > 3 ? (
            <div className=" absolute w-[200px] h-[200px] bg-black/5 rounded-full" />
          ) : null}
          {MyZoom > 4 ? (
            <div className=" absolute w-[240px] h-[240px] bg-black/5 rounded-full" />
          ) : null}
        </div>
      </OverlayViewF>
      <OverlayViewF
        position={userPos}
        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
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
          <div className="relative flex justify-center items-center">
            <div className="absolute w-16 h-16 rounded-full bg-white p-2">
              <FaHotel className="w-full h-full text-black" />
              {hotelPos.is_booking ? (
                <div className="relative w-0 h-0">
                  <div className="absolute z-10 top-1 right-2">Hi</div>
                </div>
              ) : null}
            </div>
          </div>
        </OverlayViewF>
      ))}
    </GoogleMap>
  )
}

export default React.memo(MyGoogleMap)
