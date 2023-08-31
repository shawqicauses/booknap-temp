import {GoogleMap, MarkerF} from "@react-google-maps/api"
import React, {Dispatch, SetStateAction, useMemo} from "react"
import {IHotel} from "../../types"

interface IPosition {
  lat: number
  lng: number
}

const MyGoogleMap = function MyGoogleMap({
  pos,
  center,
  setPos,
  handleClick,
  hotels
}: {
  pos: IPosition
  center: IPosition
  setPos: Dispatch<SetStateAction<IPosition | undefined>>
  handleClick: () => void
  hotels: Array<IHotel>
}) {
  const user = useMemo(() => center, [center])

  return (
    <GoogleMap
      zoom={10}
      center={center}
      mapContainerClassName="w-full h-full"
      onClick={(e) => {
        handleClick()
        setPos({
          lat: e.latLng?.lat() ?? pos.lat,
          lng: e.latLng?.lng() ?? pos.lng
        })
      }}>
      <MarkerF position={{lat: 30, lng: 40}} visible />
      <MarkerF position={user} visible />
      {hotels.map((hotelPos) => (
        <MarkerF
          key={hotelPos.id}
          visible
          position={{lat: Number(hotelPos.lat), lng: Number(hotelPos.lng)}}
        />
      ))}
    </GoogleMap>
  )
}

export default React.memo(MyGoogleMap)
